// ============================================================
// L'AVENTURE DE LÉO - LOGIQUE PRINCIPALE
// ============================================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentLevelData = null;

// ===== INITIALISATION =====
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function init() {
    resize();
    AudioSystem.init();
    checkSavedGame();
    createProgressBar();
    window.addEventListener('resize', resize);
    setupControls();
    if (typeof updateSoundButton === 'function') {
        updateSoundButton();
    }

    // Charger les données sauvegardées
    loadStats();
    loadBadges();
    loadCustomization();

    // Initialiser l'état des toggles
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.classList.toggle('active', state.soundEnabled);
    }
    const timerToggle = document.getElementById('timer-toggle');
    if (timerToggle) {
        timerToggle.classList.toggle('active', state.timerEnabled);
    }

    const startButtons = document.querySelectorAll('[data-start]');
    startButtons.forEach(button => {
        button.addEventListener('click', () => {
            startGame(button.dataset.start);
        });
    });

    // Event listeners pour la personnalisation des couleurs
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.playerColor = btn.dataset.color;
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            updateCustomizationPreview();
            AudioSystem.play('coin');
        });
    });

    // Event listeners pour le choix du compagnon
    document.querySelectorAll('.companion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.companion.type = btn.dataset.companion;
            state.companion.name = btn.dataset.name;
            document.querySelectorAll('.companion-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            updateCustomizationPreview();
            AudioSystem.play('coin');
        });
    });
}

function checkSavedGame() {
    try {
        const saved = localStorage.getItem('leo_save');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.level > 1) {
                document.getElementById('saved-game').style.display = 'block';
                document.getElementById('saved-info').textContent = 
                    `Niveau ${data.level} - ${data.totalCoins} pièces - ${data.difficulty === 1 ? 'Facile' : data.difficulty > 1.3 ? 'Dur' : 'Moyen'}`;
            }
        }
    } catch(e) {}
}

function saveGame() {
    try {
        localStorage.setItem('leo_save', JSON.stringify({
            level: state.level,
            totalCoins: state.totalCoins,
            difficulty: state.difficulty
        }));
    } catch(e) {}
}

function createProgressBar() {
    const bar = document.getElementById('progress-bar');
    bar.innerHTML = '';
    for (let i = 1; i <= CONFIG.TOTAL_LEVELS; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        dot.textContent = i;
        dot.id = `progress-${i}`;
        bar.appendChild(dot);
    }
}

function updateProgressBar() {
    for (let i = 1; i <= CONFIG.TOTAL_LEVELS; i++) {
        const dot = document.getElementById(`progress-${i}`);
        dot.classList.remove('completed', 'current');
        if (i < state.level) dot.classList.add('completed');
        else if (i === state.level) dot.classList.add('current');
    }
}

// ===== CONTRÔLES =====
function setupControls() {
    window.addEventListener('keydown', e => handleKey(e, true));
    window.addEventListener('keyup', e => handleKey(e, false));
    
    // Touch mobile
    const bindTouch = (id, keyName, isJump = false) => {
        const el = document.getElementById(id);
        if (!el) return;
        
        const start = (e) => {
            e.preventDefault();
            keys[keyName] = true;
            if (isJump) doJump();
        };
        const end = (e) => {
            e.preventDefault();
            keys[keyName] = false;
        };
        
        el.addEventListener('touchstart', start, { passive: false });
        el.addEventListener('touchend', end, { passive: false });
        el.addEventListener('touchcancel', end, { passive: false });
        el.addEventListener('mousedown', start);
        el.addEventListener('mouseup', end);
        el.addEventListener('mouseleave', end);
    };
    
    bindTouch('btn-left', 'left');
    bindTouch('btn-right', 'right');
    bindTouch('btn-climb', 'up');
    bindTouch('btn-jump', 'jump', true);
}

function handleKey(e, pressed) {
    const k = e.key.toLowerCase();
    const code = e.code;

    // Niveau Fruity Frank : gestion du tir
    if (currentLevelData && currentLevelData.fruityFrank) {
        handleFruityFrankInput(e, pressed);
    }

    // AZERTY : A = gauche, Z = droite
    // QWERTY : Q = gauche, D = droite
    // Flèches : toujours supportées
    if (k === 'a' || k === 'arrowleft' || k === 'q') keys.left = pressed;
    if (k === 'z' || k === 'arrowright' || k === 'd') keys.right = pressed;
    if (k === 'arrowup' || k === 'w') keys.up = pressed;
    if (k === 'arrowdown' || k === 's') keys.down = pressed;
    
    // Saut avec ESPACE ou FLÈCHE HAUT
    if (pressed && (k === ' ' || code === 'Space' || k === 'arrowup')) {
        // Si message affiché, continuer
        const msgBox = document.getElementById('message-box');
        if (msgBox.style.display === 'block') {
            e.preventDefault();
            nextLevelAction();
            return;
        }

        if (state.current === GameState.PLAYING) {
            // Si flèche haut et on touche une échelle, ne pas sauter (on grimpe à la place)
            if (k === 'arrowup' && isTouchingLadder()) {
                return;
            }
            e.preventDefault();
            doJump();
        }
    }
    
    // Pause avec ÉCHAP
    if (pressed && k === 'escape') {
        togglePause();
    }
    
    // === CHEATS ===
    // Touche numérique 1-9 pour changer de niveau
    if (pressed && ['1','2','3','4','5','6','7','8','9'].includes(e.key)) {
        state.cheatsUsed = true;
        jumpToLevel(parseInt(e.key));
    }
    
    // Touche + (pavé numérique ou clavier) pour niveau suivant
    if (pressed && (code === 'NumpadAdd' || k === '+')) {
        state.cheatsUsed = true;
        jumpToLevel(state.level + 1);
    }

    // Touche - (pavé numérique ou clavier) pour niveau précédent
    if (pressed && (code === 'NumpadSubtract' || k === '-')) {
        state.cheatsUsed = true;
        jumpToLevel(state.level - 1);
    }

    // Touche = ou Entrée (pavé numérique) pour ajouter une vie
    if (pressed && (code === 'Equal' || code === 'NumpadEqual' || code === 'NumpadEnter' || k === '=' || k === 'enter')) {
        state.cheatsUsed = true;
        if (state.lives < CONFIG.MAX_LIVES) {
            state.lives++;
            updateHud();
            AudioSystem.play('life');
            ParticleSystem.emit(player.x + player.w/2, player.y, 'life', 10);
        }
    }
}

function jumpToLevel(targetLevel) {
    // Permettre niveau 11 (Fruity Frank) comme niveau bonus secret
    const maxLevel = LEVELS[11] ? 11 : CONFIG.TOTAL_LEVELS;
    const nextLevel = Math.max(1, Math.min(maxLevel, targetLevel));
    state.level = nextLevel;
    if (state.current === GameState.MENU) {
        startGame('easy');
        return;
    }

    initLevel(state.level);
    updateProgressBar();
    state.current = GameState.PLAYING;
}

function doJump() {
    AudioSystem.resume();

    const jumpForce = player.getJumpForce();
    const maxJumps = player.getMaxJumps();

    if (player.grounded || player.climbing) {
        player.vy = -jumpForce;
        player.grounded = false;
        player.climbing = false;
        player.jumpCount = 1;
        AudioSystem.play('jump');
        ParticleSystem.emit(player.x + player.w / 2, player.y + player.h, 'dust', 5);

        // Statistiques
        state.stats.totalJumps++;
    } else if (player.jumpCount < maxJumps) {
        player.vy = -jumpForce * 0.9;
        player.jumpCount++;
        AudioSystem.play('jump');

        // Statistiques
        state.stats.totalJumps++;

        // Effet spécial pour le triple saut !
        if (player.jumpCount === 3 && state.powerups.superJump > 0) {
            ParticleSystem.emit(player.x + player.w / 2, player.y + player.h / 2, 'sparkle', 15);
        }
    }

    updateJumpIndicator();
}

function updateJumpIndicator() {
    const maxJumps = player.getMaxJumps();
    const jumpsLeft = maxJumps - player.jumpCount;
    document.getElementById('jump1').classList.toggle('available', jumpsLeft >= 1 || player.grounded);
    document.getElementById('jump2').classList.toggle('available', jumpsLeft >= 2 || player.grounded);

    // Indicateur du 3ème saut (super saut)
    const jump3 = document.getElementById('jump3');
    if (jump3) {
        jump3.style.display = maxJumps >= 3 ? 'block' : 'none';
        jump3.classList.toggle('available', jumpsLeft >= 3 || player.grounded);
    }
}

// ===== DÉMARRAGE DU JEU =====
function startGame(difficulty) {
    AudioSystem.resume();

    // Sauvegarder le nom de la difficulté
    state.difficultyName = difficulty;

    // Difficultés nettement différenciées (ajout du mode TRÈS FACILE !)
    if (difficulty === 'very_easy') {
        state.difficulty = 0.4;  // Très facile : ennemis très très lents
        state.lives = 10;        // 10 vies !
        state.companion.enabled = true;
    } else if (difficulty === 'easy') {
        state.difficulty = 0.7;
        state.lives = 7;
        state.companion.enabled = true;
    } else if (difficulty === 'medium') {
        state.difficulty = 1.2;
        state.lives = 4;
        state.companion.enabled = false;
    } else {
        state.difficulty = 1.8;
        state.lives = 2;
        state.companion.enabled = false;
    }

    // Afficher le compagnon avec un délai (après la fermeture de l'écran de démarrage)
    if (state.companion.enabled) {
        setTimeout(() => {
            const playerName = state.playerName || 'Léo';
            showCompanionTip('Salut ' + playerName + ' ! Je suis là pour t\'aider ! 🌟');
        }, 1500);
    }

    // Incrémenter les stats
    state.stats.gamesPlayed++;
    state.stats.currentStreak = 0;
    saveStats();

    state.coins = 0;
    state.totalCoins = 0;
    state.score = 0;
    state.cheatsUsed = false;
    
    document.getElementById('start-screen').style.display = 'none';
    
    initLevel(state.level);
    state.current = GameState.PLAYING;
    
    updateHud();
    updateProgressBar();
    
    // Tutoriel au niveau 1 (disparaît après 3 secondes)
    if (state.level === 1 && !state.tutorialShown) {
        document.getElementById('tutorial').style.display = 'block';
        state.tutorialShown = true;
        // Fermer automatiquement après 3 secondes
        setTimeout(() => {
            closeTutorial();
        }, 3000);
    }
    
    state.lastTime = 0;
    state.accumulator = 0;
    
    if (state.animationId) cancelAnimationFrame(state.animationId);
    requestAnimationFrame(gameLoop);
}

function continueSavedGame() {
    try {
        const saved = JSON.parse(localStorage.getItem('leo_save'));
        state.level = saved.level;
        state.totalCoins = saved.totalCoins;
        state.difficulty = saved.difficulty;
        const diff = state.difficulty === 1 ? 'easy' : state.difficulty > 1.3 ? 'hard' : 'medium';
        startGame(diff);
    } catch(e) {
        startGame('easy');
    }
}

function closeTutorial() {
    document.getElementById('tutorial').style.display = 'none';
}

function nextTutorialStep(step) {
    // Cacher toutes les étapes
    document.querySelectorAll('.tutorial-step').forEach(s => s.classList.remove('active'));
    // Montrer l'étape suivante
    const nextStep = document.getElementById(`tutorial-step-${step}`);
    if (nextStep) {
        nextStep.classList.add('active');
        AudioSystem.play('coin');
    }
}
window.nextTutorialStep = nextTutorialStep;

// ===== INITIALISATION DU NIVEAU =====
function initLevel(levelNum) {
    const levelDef = LEVELS[levelNum];
    if (!levelDef) return;

    // Niveau Fruity Frank : moteur spécial grid-based
    if (levelDef.fruityFrankLevel) {
        initFruityFrankGrid();
        currentLevelData = { fruityFrank: true }; // Marquer comme niveau Fruity Frank
        document.getElementById('level-display').textContent = `NIVEAU ${levelNum}`;
        document.body.style.backgroundColor = levelDef.bgColor;
        updateHud();
        return;
    }

    currentLevelData = levelDef.setup(canvas.width, canvas.height);
    
    // Reset joueur
    player.reset(levelDef.playerStart.x, levelDef.playerStart.y);
    
    // Reset état niveau
    state.hasKey = false;
    state.levelTime = 0;
    state.invincibilityTimer = 0;
    state.teleportTimer = 0;
    state.screenShake = 0; // IMPORTANT : Reset screen shake !
    state.coins = 0;
    // Compter TOUTES les pièces (normales + spéciales du niveau BombJack)
    state.maxCoinsInLevel = currentLevelData.coins.length + (currentLevelData.specialCoins ? currentLevelData.specialCoins.length : 0);

    // Reset sous-niveaux (pour niveau 5)
    state.inSubLevel = false;
    state.netherKeyCollected = false;
    state.mainLevelData = null;
    state.mainPlayerPos = null;

    // Reset power-ups
    state.powerups = {
        shield: 0,
        superJump: 0,
        magnet: 0,
        star: 0
    };

    // Reset checkpoint (nouveau niveau = recommencer au début)
    state.lastCheckpoint = null;

    // Reset BombJack (niveau 9)
    state.bombJackSequence = [];
    state.bombJackNextExpected = 1;
    state.bombJackPerfect = true;

    // Niveau 9 : Pouvoir de vol permanent ! (comme dans BombJack original)
    if (levelNum === 9 && levelDef.bombJackLevel) {
        state.powerups.superJump = 99999; // Vol permanent pour ce niveau !
    }

    ParticleSystem.clear();
    
    // UI
    document.getElementById('key-display').style.display = 'none';
    document.getElementById('level-display').textContent = `NIVEAU ${levelNum}`;
    document.body.style.backgroundColor = levelDef.bgColor;
    
    updateCoinsDisplay();
    updateHud();
}

// ===== BOUCLE DE JEU =====
function gameLoop(timestamp) {
    if (state.current === GameState.MENU) return;
    
    if (!state.lastTime) state.lastTime = timestamp;
    let deltaTime = timestamp - state.lastTime;
    state.lastTime = timestamp;
    
    if (deltaTime > 100) deltaTime = 100;
    state.accumulator += deltaTime;
    
    while (state.accumulator >= CONFIG.TIME_STEP) {
        if (state.current === GameState.PLAYING) {
            update();
        }
        state.accumulator -= CONFIG.TIME_STEP;
    }
    
    draw();
    
    state.animationId = requestAnimationFrame(gameLoop);
}

// ===== UPDATE =====
function update() {
    if (!currentLevelData) return;

    // Niveau Fruity Frank : moteur spécial
    if (currentLevelData.fruityFrank) {
        const completed = updateFruityFrank();
        if (completed) {
            levelWin();
        }
        return;
    }

    state.frameTick++;
    if (state.invincibilityTimer > 0) state.invincibilityTimer--;
    if (state.teleportTimer > 0) state.teleportTimer--;
    if (state.screenShake > 0) state.screenShake--;
    if (state.keyHintCooldown > 0) state.keyHintCooldown--;
    if (state.secretHintCooldown > 0) state.secretHintCooldown--;
    if (state.encouragementCooldown > 0) state.encouragementCooldown--;

    // Mise à jour des power-ups (sauf bouclier qui ne se consomme que sur coup)
    // BOUCLIER : permanent jusqu'à prendre un coup !
    if (state.powerups.superJump > 0) state.powerups.superJump--;
    if (state.powerups.magnet > 0) state.powerups.magnet--;
    if (state.powerups.star > 0) state.powerups.star--;
    
    if (state.timerEnabled) {
        state.levelTime += CONFIG.TIME_STEP;
        updateTimerDisplay();
    }
    
    // Boss level special update
    if (LEVELS[state.level].isBoss && currentLevelData.boss) {
        updateBoss();
    }
    
    // Projectiles du niveau 7 - tirés par les archers !
    if (state.level === 7 && currentLevelData.archers && state.frameTick % 120 === 0) {
        // Chaque archer tire à son tour
        const archerIndex = Math.floor((state.frameTick / 120) % currentLevelData.archers.length);
        const archer = currentLevelData.archers[archerIndex];
        if (archer) {
            // Tirer une flèche vers le joueur
            const dx = player.x - archer.x;
            const dy = player.y - archer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const speed = 5 * state.difficulty;

            currentLevelData.projectiles.push({
                x: archer.x + archer.w / 2,
                y: archer.y + archer.h / 2,
                w: 40, h: 8,
                vx: (dx / dist) * speed,
                vy: (dy / dist) * speed,
                type: 'arrow',
                fromArcher: archerIndex
            });

            // Animation de tir
            archer.shooting = true;
            setTimeout(() => { archer.shooting = false; }, 300);
        }
    }
    
    updateProjectiles();
    updateEnemies();
    updatePlatforms();
    updateHazards();
    updatePortals();
    updateFireBars();
    updateHints();
    updatePlayer();
    updateCheckpoint(); // Sauvegarder automatiquement la position du joueur
    checkCollisions();
    
    ParticleSystem.update();
    updateJumpIndicator();
}

function updateHints() {
    if (!currentLevelData) return;

    if (!state.hasKey && currentLevelData.keyItem && state.keyHintCooldown === 0) {
        const dx = (player.x + player.w / 2) - (currentLevelData.keyItem.x + currentLevelData.keyItem.w / 2);
        const dy = (player.y + player.h / 2) - (currentLevelData.keyItem.y + currentLevelData.keyItem.h / 2);
        const distance = Math.hypot(dx, dy);
        if (distance < 220) {
            AudioSystem.play('key');
            state.keyHintCooldown = 180;
        }
    }

    if (currentLevelData.coins && state.secretHintCooldown === 0) {
        const secretCoin = currentLevelData.coins.find(coin => coin.secret);
        if (secretCoin) {
            const dx = (player.x + player.w / 2) - (secretCoin.x + secretCoin.w / 2);
            const dy = (player.y + player.h / 2) - (secretCoin.y + secretCoin.h / 2);
            const distance = Math.hypot(dx, dy);
            if (distance < 200) {
                AudioSystem.play('powerup');
                state.secretHintCooldown = 240;
            }
        }
    }
}

// Vérifie si le joueur touche une échelle
function isTouchingLadder() {
    if (!currentLevelData || !currentLevelData.ladders) return false;
    for (const l of currentLevelData.ladders) {
        if (player.x + player.w > l.x && player.x < l.x + l.w &&
            player.y + player.h > l.y - 10 && player.y < l.y + l.h + 20) {
            return true;
        }
    }
    return false;
}

function updatePlayer() {
    const prevY = player.y;

    // Échelles
    const touchingLadder = isTouchingLadder();
    
    if (touchingLadder && (keys.up || keys.down)) {
        player.climbing = true;
        player.jumpCount = 0;
        player.currentPlatform = null;
    }
    if (!touchingLadder) player.climbing = false;
    
    if (player.climbing) {
        player.vy = 0;
        player.vx = 0;
        if (keys.up) player.y -= 4;
        if (keys.down) player.y += 4;
        if (keys.left) player.x -= 2;
        if (keys.right) player.x += 2;
    } else {
        // Mouvement horizontal
        if (keys.right) {
            player.vx += 1.2;
            player.facingRight = true;
        }
        if (keys.left) {
            player.vx -= 1.2;
            player.facingRight = false;
        }
        
        player.vx *= CONFIG.FRICTION;
        
        const maxSpeed = player.baseSpeed * Math.min(state.difficulty, 1.2);
        player.vx = Math.max(-maxSpeed, Math.min(maxSpeed, player.vx));
        
        player.x += player.vx;
        
        // Gravité
        const gravity = CONFIG.GRAVITY * (state.difficulty <= 0.7 ? 0.85 : 1);
        player.vy += gravity;
        player.vy = Math.min(player.vy, CONFIG.MAX_FALL_SPEED);
        player.y += player.vy;
    }
    
    // Collisions plateformes
    player.grounded = false;
    let onPlatform = false;
    
    for (const p of currentLevelData.platforms) {
        if (p.type === 'slide_visual' || p.type === 'castle' || p.type === 'sonic_goal') continue;
        
        if (player.x + player.w > p.x + 5 && player.x < p.x + p.w - 5) {
            const feetNow = player.y + player.h;
            const feetBefore = prevY + player.h;
            const tolerance = (p.type === 'moving' && p.vy < 0) ? 15 - p.vy : 15;
            
            if (player.vy >= 0 && feetBefore <= p.y + tolerance && feetNow >= p.y) {
                // Ressort
                if (p.type === 'spring') {
                    player.vy = -22;
                    AudioSystem.play('jump');
                    continue;
                }
                
                // Speed pad
                if (p.type === 'speed_pad') {
                    player.vx = player.vx > 0 ? 15 : -15;
                }
                
                player.y = p.y - player.h;
                player.vy = 0;
                player.grounded = true;
                player.jumpCount = 0;
                player.currentPlatform = p;
                onPlatform = true;
                
                if (p.type === 'slide') {
                    player.vx += 4;
                }
            }
        }
    }
    
    if (!onPlatform) player.currentPlatform = null;
    
    // Limites écran
    if (player.x < 0) {
        player.x = 0;
        player.vx = 0;
    }
}

// ===== SYSTÈME DE CHECKPOINTS =====
function isPositionSafe(x, y) {
    // Vérifie si une position est sécurisée (pas au-dessus du vide)
    if (!currentLevelData || !currentLevelData.hazards) return true;

    // Vérifier s'il y a une plateforme en dessous
    let hasPlatformBelow = false;
    for (const p of currentLevelData.platforms) {
        // Plateforme en dessous du joueur (dans les 200 pixels)
        if (x + player.w > p.x && x < p.x + p.w && y + player.h <= p.y && y + player.h + 200 > p.y) {
            hasPlatformBelow = true;
            break;
        }
    }

    // Vérifier s'il y a un vide/lave directement en dessous
    for (const h of currentLevelData.hazards) {
        if (h.type === 'void' || h.type === 'lava_floor') {
            // Si le checkpoint est au-dessus du vide sans plateforme en dessous, c'est dangereux
            if (x + player.w > h.x && x < h.x + h.w && y < h.y && !hasPlatformBelow) {
                return false;
            }
        }
    }

    return true;
}

function updateCheckpoint() {
    // Sauvegarder automatiquement la position du joueur tous les X pixels
    // Pour éviter de recommencer au tout début quand on meurt !

    // Si pas encore de checkpoint, créer le premier à la position de départ
    if (!state.lastCheckpoint) {
        const levelDef = LEVELS[state.level];
        state.lastCheckpoint = {
            x: levelDef.playerStart.x,
            y: levelDef.playerStart.y
        };
        return;
    }

    // Conditions pour sauvegarder un checkpoint :
    // 1. Le joueur a progressé vers la droite
    // 2. Le joueur est au sol (pas en l'air)
    // 3. La position est sécurisée (pas au-dessus du vide)
    if (player.x > state.lastCheckpoint.x + state.checkpointDistance &&
        player.grounded &&
        isPositionSafe(player.x, player.y)) {

        // Sauvegarder nouveau checkpoint (invisible pour le joueur)
        state.lastCheckpoint = {
            x: player.x,
            y: player.y
        };
        // Petit effet visuel subtil pour indiquer le checkpoint
        ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 3);
    }
}

function updateEnemies() {
    for (const e of currentLevelData.enemies) {
        if (e.patrolEnd) {
            e.x += e.dir * (e.speed || 2);
            if (e.x > e.patrolEnd) { e.x = e.patrolEnd; e.dir = -1; }
            if (e.x < e.patrolStart) { e.x = e.patrolStart; e.dir = 1; }
        }
    }
}

function updatePlatforms() {
    for (const p of currentLevelData.platforms) {
        if (p.type === 'moving') {
            if (p.vx) {
                p.x += p.vx;
                if (p.x > p.maxX || p.x < p.minX) p.vx *= -1;
            }
            if (p.vy) {
                p.y += p.vy;
                if (p.y > p.maxY || p.y < p.minY) p.vy *= -1;
            }
            
            // Déplacer le joueur avec la plateforme
            if (player.grounded && player.currentPlatform === p) {
                player.x += p.vx || 0;
                player.y += p.vy || 0;
            }
        }
    }
}

function updateHazards() {
    for (const h of currentLevelData.hazards) {
        if (h.type === 'knight') {
            if (!h.dir) h.dir = 1;
            h.y += h.dir * h.speed;
            if (h.y > h.maxY) h.dir = -1;
            if (h.y < h.minY) h.dir = 1;
        }
    }
}

function updatePortals() {
    if (state.teleportTimer > 0) return;

    // Détection spéciale pour le tuyau underground (Niveau 4)
    // Le joueur doit être sur un tuyau ET appuyer sur BAS
    if (state.level === 4 && !state.inSubLevel && keys.down && player.grounded) {
        // Vérifier si le joueur est sur une plateforme de type 'pipe'
        if (player.currentPlatform && player.currentPlatform.type === 'pipe') {
            // Vérifier que c'est le BON tuyau (le premier, pas le deuxième)
            if (player.currentPlatform.x === 450) {
                enterUnderground();
                return;
            }
        }
    }

    for (const p of currentLevelData.portals) {
        if (checkCollision(player, p)) {
            // Portail spécial vers le Nether !
            if (p.isNetherPortal && state.level === 5) {
                enterNether();
                return;
            }

            // Portail de retour depuis le Nether
            if (p.isReturnPortal && state.level === 5 && state.inSubLevel) {
                exitNether();
                return;
            }

            // Portail de retour depuis le sous-sol
            if (p.isReturnPortal && state.level === 4 && state.inSubLevel) {
                if (keys.up) {
                    exitUnderground();
                    return;
                } else {
                    // Message pour indiquer d'appuyer sur HAUT
                    if (state.frameTick % 60 === 0) {
                        showMessage('↑ SORTIE ↑', 'Appuie sur HAUT pour sortir !', 1500);
                    }
                    continue; // IMPORTANT: Ne pas activer ce portail sans appuyer sur HAUT!
                }
            }

            // Portail normal
            player.x = p.destX;
            player.y = p.destY;
            player.vx = 0;
            player.vy = 0;
            state.teleportTimer = 60;
            ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 20);
            AudioSystem.play('key');
            break;
        }
    }
}

// ===== SYSTÈME DE PORTAIL NETHER =====
function enterNether() {
    AudioSystem.play('victory'); // Son spécial
    ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'boss', 50);

    // Sauvegarder l'état du monde principal
    state.mainLevelData = currentLevelData;
    state.mainPlayerPos = { x: player.x, y: player.y };
    state.inSubLevel = true;

    // Charger le Nether
    const netherLevel = LEVELS[5].setupNether(canvas.width, canvas.height);
    currentLevelData = netherLevel;

    // Téléporter le joueur au début du Nether
    player.reset(50, canvas.height - 200);
    player.vx = 0;
    player.vy = 0;

    state.teleportTimer = 60;

    // Changer le fond pour le Nether!
    document.body.style.backgroundColor = '#5C0000';

    // Message d'entrée
    showMessage('🔥 NETHER !', 'Trouve la clé et reviens !', 3000);
}

function exitNether() {
    // On doit avoir la clé du Nether pour sortir!
    if (!state.netherKeyCollected) {
        ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'damage', 10);
        return; // Impossible de sortir sans la clé!
    }

    AudioSystem.play('victory'); // Son spécial
    ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 50);

    // Restaurer le monde principal
    currentLevelData = state.mainLevelData;
    state.inSubLevel = false;

    // Créer le portail de retour dans le monde principal
    const returnPos = currentLevelData.returnPortalPos;
    if (returnPos && !currentLevelData.portals.find(p => p.isReturnFromNether)) {
        currentLevelData.portals.push({
            x: returnPos.x,
            y: returnPos.y,
            w: 60,
            h: 100,
            color: '#8B00FF',
            destX: returnPos.x + 80,
            destY: returnPos.y + 50,
            isReturnFromNether: true
        });
    }

    // Téléporter le joueur à côté du portail de retour
    if (returnPos) {
        player.x = returnPos.x + 80;
        player.y = returnPos.y + 50;
    }

    player.vx = 0;
    player.vy = 0;
    state.teleportTimer = 60;
    state.hasKey = true; // On a maintenant la clé pour la sortie finale !

    // Restaurer le fond normal
    document.body.style.backgroundColor = LEVELS[5].bgColor;

    // Message de retour
    showMessage('✅ RETOUR !', 'Tu as la clé du Nether !', 3000);
}

// ===== SOUS-SOL (NIVEAU 4) =====
function enterUnderground() {
    AudioSystem.play('jump'); // Son de tuyau
    ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 30);

    // Sauvegarder l'état du monde principal
    state.mainLevelData = currentLevelData;
    state.mainPlayerPos = { x: player.x, y: player.y };
    state.inSubLevel = true;

    // Charger le sous-sol
    const undergroundLevel = LEVELS[4].setupUnderground(canvas.width, canvas.height);
    currentLevelData = undergroundLevel;

    // Calculer la position exacte de la plateforme d'arrivée
    const unit = canvas.height / 10;
    const groundY = canvas.height - unit;
    const platformY = groundY - 20;

    // Téléporter le joueur DIRECTEMENT sur la plateforme d'arrivée
    player.x = 100;
    player.y = platformY - player.h - 5; // 5px au-dessus pour sécurité
    player.vx = 0;
    player.vy = 0;
    player.grounded = false; // Laisse la physique le poser

    state.teleportTimer = 60;

    // Changer le fond pour le sous-sol (sombre)
    document.body.style.backgroundColor = '#1a1a1a';

    // Message d'entrée
    showMessage('🍄 SOUS-SOL SECRET !', 'Trouve la clé pour ouvrir le drapeau !', 3000);
}

function exitUnderground() {
    // On peut sortir librement ! La clé sert pour le niveau principal
    AudioSystem.play('jump'); // Son de tuyau
    ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 30);

    // Sauvegarder si on a la clé du sous-sol
    const hasUndergroundKey = state.hasKey;

    // Restaurer le monde principal
    currentLevelData = state.mainLevelData;
    state.inSubLevel = false;

    // Restaurer la clé pour le niveau principal
    state.hasKey = hasUndergroundKey;
    if (hasUndergroundKey) {
        document.getElementById('key-display').style.display = 'inline';
        showMessage('✅ CLÉ TROUVÉE !', 'Tu peux maintenant finir le niveau !', 3000);
    }

    // Créer le portail de retour dans le monde principal
    const returnPos = currentLevelData.returnPortalPos;
    if (returnPos && !currentLevelData.portals.find(p => p.isReturnFromUnderground)) {
        currentLevelData.portals.push({
            x: returnPos.x,
            y: returnPos.y,
            w: 60,
            h: 100,
            color: '#00FF00',
            destX: returnPos.x + 80,
            destY: returnPos.y + 50,
            isReturnFromUnderground: true,
            isPipe: true
        });
    }

    // Téléporter le joueur à côté du portail de retour
    if (returnPos) {
        player.x = returnPos.x + 80;
        player.y = returnPos.y + 50;
    }

    player.vx = 0;
    player.vy = 0;
    state.teleportTimer = 60;

    // Restaurer le fond normal
    document.body.style.backgroundColor = LEVELS[4].bgColor;

    // Message de retour avec bonus !
    showMessage('✅ RETOUR !', 'Bonus de pièces collecté !', 3000);
}

function updateFireBars() {
    for (const fb of currentLevelData.fireBars) {
        fb.angle += fb.speed;
    }
}

function updateProjectiles() {
    for (let i = currentLevelData.projectiles.length - 1; i >= 0; i--) {
        const p = currentLevelData.projectiles[i];
        
        // Mouvement - supporte speed OU vx/vy
        if (p.vx !== undefined) {
            p.x += p.vx;
            p.y += p.vy;
            // Gravité pour les bombes
            if (p.type === 'boss_bomb') {
                p.vy += 0.15;
            }
        } else {
            p.x += p.speed;
        }
        
        // Supprimer si hors écran
        if (p.x < -100 || p.x > canvas.width + 3000 || p.y > canvas.height + 100 || p.y < -100) {
            currentLevelData.projectiles.splice(i, 1);
        }
    }
}

function updateBoss() {
    const boss = currentLevelData.boss;
    if (!boss || boss.hp <= 0) return;

    boss.attackTimer++;
    if (boss.invincible > 0) boss.invincible--;

    // Flottement
    boss.floatY += boss.floatDir * 0.5;
    if (boss.floatY > 20) boss.floatDir = -1;
    if (boss.floatY < -20) boss.floatDir = 1;

    // Calcul de la phase basée sur HP (VERSION FACILE : seulement 2 phases!)
    if (boss.hp <= 2) boss.phase = 2;
    else boss.phase = 1;

    const arenaStart = 2350;
    const arenaWidth = 700;

    // === PHASE 1 : Tirs lents et prévisibles (FACILE!) ===
    if (boss.phase === 1) {
        // Mouvement LENT horizontal
        boss.x += boss.dir * 1.2;
        if (boss.x > arenaStart + arenaWidth - 150) boss.dir = -1;
        if (boss.x < arenaStart + 50) boss.dir = 1;

        // Tir toutes les 150 frames (au lieu de 90 = beaucoup plus lent!)
        if (boss.attackTimer % 150 === 0) {
            currentLevelData.projectiles.push({
                x: boss.x + boss.w / 2 - 15,
                y: boss.y + boss.h,
                w: 30, h: 30,
                vx: 0, vy: 3.5, // Plus lent (était 5)
                type: 'boss_bomb'
            });
            AudioSystem.play('boss_hit');
        }
    }

    // === PHASE 2 : Un peu plus rapide mais SIMPLE (FACILE!) ===
    else if (boss.phase === 2) {
        // Mouvement plus rapide mais prévisible
        boss.x += boss.dir * 2;
        if (boss.x > arenaStart + arenaWidth - 150) boss.dir = -1;
        if (boss.x < arenaStart + 50) boss.dir = 1;

        // Tir simple toutes les 100 frames (au lieu de patterns complexes)
        if (boss.attackTimer % 100 === 0) {
            currentLevelData.projectiles.push({
                x: boss.x + boss.w / 2 - 15,
                y: boss.y + boss.h,
                w: 30, h: 30,
                vx: 0, vy: 4, // Plus lent
                type: 'boss_bomb'
            });
            AudioSystem.play('boss_hit');
        }

        // Tir en éventail SIMPLE toutes les 180 frames (au lieu de 100)
        if (boss.attackTimer % 180 === 0) {
            // Seulement 3 projectiles au lieu de multiples
            for (let angle = -20; angle <= 20; angle += 20) {
                const rad = (angle + 90) * Math.PI / 180;
                currentLevelData.projectiles.push({
                    x: boss.x + boss.w / 2,
                    y: boss.y + boss.h,
                    w: 20, h: 20,
                    vx: Math.cos(rad) * 2.5, // Beaucoup plus lent (était 4)
                    vy: Math.sin(rad) * 2.5,
                    type: 'boss_fire'
                });
            }
        }
    }

    // PAS DE PHASE 3 RAGE MODE pour enfant de 7 ans ! Trop difficile !
}

// ===== COLLISIONS =====
function checkCollision(a, b, tolerance = 0) {
    // Tolérance pour mode facile : réduit la hitbox des ennemis
    return a.x < b.x + b.w - tolerance && a.x + a.w > b.x + tolerance &&
           a.y < b.y + b.h - tolerance && a.y + a.h > b.y + tolerance;
}

function checkCollisions() {
    // Pièces (avec effet aimant !)
    for (let i = currentLevelData.coins.length - 1; i >= 0; i--) {
        const c = currentLevelData.coins[i];

        // Aimant à pièces : attire les pièces proches !
        if (state.powerups.magnet > 0) {
            const dx = (player.x + player.w/2) - (c.x + c.w/2);
            const dy = (player.y + player.h/2) - (c.y + c.h/2);
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 150) {
                c.x += dx * 0.15;
                c.y += dy * 0.15;
            }
        }

        if (checkCollision(player, c)) {
            currentLevelData.coins.splice(i, 1);
            const coinValue = c.value || 1; // Pièces secrètes peuvent valoir plus !
            state.coins += coinValue;
            state.totalCoins += coinValue;
            updateCoinsDisplay();

            // Son spécial pour pièces secrètes
            if (c.secret) {
                AudioSystem.play('powerup');
                ParticleSystem.emit(c.x + c.w/2, c.y + c.h/2, 'coin', 20);
                showMessage('💎 SECRET !', `+${coinValue} pièces !`, 1500);
            } else {
                AudioSystem.play('coin');
                ParticleSystem.emit(c.x + c.w/2, c.y + c.h/2, 'coin', 8);
            }
        }
    }

    // Pièces spéciales numérotées (BombJack - Niveau 9)
    if (currentLevelData.specialCoins) {
        for (let i = 0; i < currentLevelData.specialCoins.length; i++) {
            const sc = currentLevelData.specialCoins[i];
            if (sc.collected) continue;

            if (checkCollision(player, sc)) {
                // Vérifier si c'est dans l'ordre
                const isCorrectOrder = (sc.number === state.bombJackNextExpected);

                if (isCorrectOrder) {
                    // PARFAIT ! Dans l'ordre !
                    sc.collected = true;
                    state.bombJackSequence.push(sc.number);
                    state.bombJackNextExpected++;

                    // Bonus progressif pour chaque pièce dans l'ordre
                    const bonusCoins = sc.number * 2; // Pièce 1=2 coins, 2=4, 3=6, etc.
                    state.coins += bonusCoins;
                    state.totalCoins += bonusCoins;

                    AudioSystem.play('powerup');
                    ParticleSystem.emit(sc.x + sc.w/2, sc.y + sc.h/2, 'sparkle', 25);
                    showMessage(`💣 BOMBE ${sc.number} !`, `Ordre parfait ! +${bonusCoins} pièces`, 1800);

                    // Si c'était la dernière pièce dans l'ordre parfait = SUPER BONUS !
                    if (sc.number === currentLevelData.specialCoins.length && state.bombJackPerfect) {
                        const superBonus = 100;
                        state.coins += superBonus;
                        state.totalCoins += superBonus;
                        state.lives++; // Vie bonus !

                        AudioSystem.play('win');
                        ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'confetti', 80);
                        showMessage('🎉 ORDRE PARFAIT ! 🎉', `SUPER BONUS ! +${superBonus} pièces + 1 vie !`, 4000);
                        state.screenShake = 20;
                    }
                } else {
                    // Mauvais ordre ! On peut quand même la collecter mais pas de bonus
                    sc.collected = true;
                    state.bombJackPerfect = false; // Plus de super bonus possible

                    const regularCoins = 5; // Juste quelques pièces
                    state.coins += regularCoins;
                    state.totalCoins += regularCoins;

                    AudioSystem.play('coin');
                    ParticleSystem.emit(sc.x + sc.w/2, sc.y + sc.h/2, 'coin', 10);
                    showMessage('💣 Bombe collectée', `Pas dans l'ordre... +${regularCoins} pièces`, 1500);
                }

                updateCoinsDisplay();
                updateHud();
                break; // Une seule pièce à la fois
            }
        }
    }

    // Power-ups
    for (let i = currentLevelData.powerups.length - 1; i >= 0; i--) {
        const p = currentLevelData.powerups[i];
        if (checkCollision(player, p)) {
            currentLevelData.powerups.splice(i, 1);
            collectPowerup(p.type);
        }
    }
    
    // Clé
    if (!state.hasKey && currentLevelData.keyItem) {
        if (checkCollision(player, currentLevelData.keyItem)) {
            // Clé spéciale du Nether
            if (state.level === 5 && state.inSubLevel) {
                state.netherKeyCollected = true;
                currentLevelData.keyItem = null;
                AudioSystem.play('key');
                ParticleSystem.emit(player.x + player.w/2, player.y, 'sparkle', 30);
                showMessage('💎 CLÉ DU NETHER !', 'Retourne au portail vert !', 2500);
            } else {
                // Clé normale
                state.hasKey = true;
                currentLevelData.keyItem = null;
                updateHud();
                AudioSystem.play('key');
                ParticleSystem.emit(player.x + player.w/2, player.y, 'sparkle', 20);
            }
        }
    }
    
    // But
    if (currentLevelData.goal && checkCollision(player, currentLevelData.goal)) {
        const levelDef = LEVELS[state.level];

        // Niveau 9 (BombJack) : Nécessite TOUTES les bombes numérotées !
        if (state.level === 9 && currentLevelData.specialCoins) {
            const allCollected = currentLevelData.specialCoins.every(sc => sc.collected);
            if (!allCollected) {
                // Repousser le joueur
                if (player.x < currentLevelData.goal.x) player.x -= 5;
                showMessage('💣 PORTE VERROUILLÉE !', 'Collecte toutes les bombes numérotées !', 2000);
                return;
            }
        }

        // Vérifier si le niveau nécessite une clé
        const needsKey = levelDef.needsKey !== false && state.level !== 3 && state.level !== 7 && state.level !== 9;

        if (needsKey && !state.hasKey) {
            // Repousser le joueur
            if (player.x < currentLevelData.goal.x) player.x -= 5;

            // Message spécifique pour le niveau 4 (sous-sol)
            if (state.level === 4) {
                if (state.frameTick % 120 === 0) { // Toutes les 2 secondes
                    showMessage('🔒 PORTE VERROUILLÉE !', 'Cherche la clé dans le sous-sol ! (tuyau vert)', 2500);
                }
            }
            return;
        }
        
        // Niveau boss : pas de goal direct
        if (levelDef.isBoss) return;

        // Niveau 4 : Bonus selon hauteur du drapeau touché (comme Super Mario!)
        if (state.level === 4 && currentLevelData.goal.type === 'flag') {
            const goalTop = currentLevelData.goal.y;
            const goalBottom = currentLevelData.goal.y + currentLevelData.goal.h;
            const playerTouchY = player.y + player.h / 2; // Centre du joueur

            // Calculer à quelle hauteur (en %) le joueur a touché le drapeau
            const touchHeight = 1 - ((playerTouchY - goalTop) / (goalBottom - goalTop));
            const touchHeightPercent = Math.max(0, Math.min(100, Math.round(touchHeight * 100)));

            // Bonus de pièces selon la hauteur !
            let bonusCoins = 0;
            let bonusMessage = '';
            if (touchHeightPercent >= 90) {
                bonusCoins = 10;
                bonusMessage = '🌟 INCROYABLE ! TOP DU DRAPEAU !';
            } else if (touchHeightPercent >= 70) {
                bonusCoins = 7;
                bonusMessage = '🎯 EXCELLENT ! Très haut !';
            } else if (touchHeightPercent >= 50) {
                bonusCoins = 5;
                bonusMessage = '👍 BIEN ! Milieu du drapeau';
            } else if (touchHeightPercent >= 30) {
                bonusCoins = 3;
                bonusMessage = '👌 PAS MAL !';
            } else {
                bonusCoins = 1;
                bonusMessage = 'Tu peux faire mieux !';
            }

            state.coins += bonusCoins;
            state.totalCoins += bonusCoins;
            state.coinsForNextLife += bonusCoins;
            showMessage(bonusMessage, `+${bonusCoins} pièces bonus !`, 2500);
            ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'coin', bonusCoins * 3);
        }

        levelWin();
        return;
    }
    
    // Boss
    if (currentLevelData.boss && currentLevelData.boss.hp > 0) {
        const boss = currentLevelData.boss;
        const bossY = boss.y + (boss.floatY || 0);
        const bossHitbox = { x: boss.x, y: bossY, w: boss.w, h: boss.h };
        
        // Joueur saute sur le boss
        if (player.vy > 0 && boss.invincible === 0 &&
            player.x + player.w > boss.x && player.x < boss.x + boss.w &&
            player.y + player.h > bossY && player.y + player.h < bossY + 50) {
            
            boss.hp--;
            boss.invincible = 120; // Plus long (était 90) pour donner plus de temps à Léo
            player.vy = -14;
            state.screenShake = 15;
            AudioSystem.play('boss_hit');
            ParticleSystem.emit(boss.x + boss.w/2, bossY, 'boss', 20);
            
            if (boss.hp <= 0) {
                // Boss vaincu !
                state.screenShake = 30;
                // Explosion de particules
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        ParticleSystem.emit(boss.x + Math.random() * boss.w, bossY + Math.random() * boss.h, 'boss', 15);
                        AudioSystem.play('boss_hit');
                    }, i * 150);
                }
                setTimeout(() => {
                    levelWin();
                }, 800);
                return;
            }
        }
        // Boss touche le joueur (corps)
        else if (checkCollision(player, bossHitbox) && state.invincibilityTimer === 0) {
            takeDamage("Le boss t'a touché !");
        }
    }
    
    // Dangers
    if (state.invincibilityTimer === 0) {
        // Barres de feu
        for (const fb of currentLevelData.fireBars) {
            const endX = fb.cx + Math.cos(fb.angle) * fb.length;
            const endY = fb.cy + Math.sin(fb.angle) * fb.length;
            
            for (let i = 0; i <= 5; i++) {
                const px = fb.cx + (endX - fb.cx) * (i / 5);
                const py = fb.cy + (endY - fb.cy) * (i / 5);
                
                if (px > player.x && px < player.x + player.w &&
                    py > player.y && py < player.y + player.h) {
                    takeDamage("Brûlé !");
                    break;
                }
            }
        }
        
        // Projectiles
        for (let i = currentLevelData.projectiles.length - 1; i >= 0; i--) {
            if (checkCollision(player, currentLevelData.projectiles[i])) {
                takeDamage("Touché !");
                currentLevelData.projectiles.splice(i, 1);
            }
        }
        
        // Obstacles
        for (const h of currentLevelData.hazards) {
            if (checkCollision(player, h)) {
                if (h.type === 'void' || h.type === 'lava_floor') {
                    state.lives--;
                    updateHud();
                    AudioSystem.play('hurt');
                    
                    if (state.lives <= 0) {
                        gameOver("Tombé !");
                    } else {
                        respawnPlayer();
                    }
                    return; // Important : sortir après respawn
                } else {
                    takeDamage("Aïe !");
                }
            }
        }
        
        // Ennemis (hitbox plus tolérante en mode facile)
        const tolerance = state.difficulty <= 0.7 ? 15 : state.difficulty <= 1.2 ? 5 : 0;
        for (const e of currentLevelData.enemies) {
            if (checkCollision(player, e, tolerance)) {
                takeDamage("Monstre !");
            }
        }
    }
}

function takeDamage(reason) {
    if (state.invincibilityTimer > 0) return;

    // Étoile d'invincibilité : immunité totale !
    if (state.powerups.star > 0) {
        ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 15);
        return;
    }

    // Bouclier : absorbe le coup !
    if (state.powerups.shield > 0) {
        state.powerups.shield = 0;
        state.invincibilityTimer = 60;
        AudioSystem.play('coin'); // Son de blocage
        ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 20);
        showMessage('🛡️ BOUCLIER !', 'Le bouclier t\'a protégé !', 1500);
        return;
    }

    state.lives--;
    state.stats.totalDeaths++;
    state.stats.currentStreak = 0; // Reset de la série
    state.invincibilityTimer = state.difficulty <= 0.5 ? 150 : state.difficulty <= 0.7 ? 120 : 90; // Plus long pour très facile

    state.screenShake = 15;

    player.vy = -10;
    player.vx = player.facingRight ? -8 : 8;

    updateHud();
    AudioSystem.play('hurt');
    ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'damage', 12);

    // Messages d'encouragement variés
    if (state.encouragementCooldown === 0) {
        const encouragements = [
            { title: '💪 Courage !', text: 'Tu peux y arriver !' },
            { title: '🌟 Pas grave !', text: 'Réessaie, tu vas réussir !' },
            { title: '🎯 Continue !', text: 'Tu progresses bien !' },
            { title: '💖 Allez !', text: 'Je crois en toi !' }
        ];
        const msg = encouragements[Math.floor(Math.random() * encouragements.length)];
        showMessage(msg.title, msg.text, 1200);
        state.encouragementCooldown = 240;
    }

    // Conseil du compagnon en mode très facile
    if (state.companion.enabled && state.companion.lastTip < state.frameTick - 300) {
        setTimeout(() => {
            showCompanionTip(getRandomCompanionTip('death'));
        }, 1500);
        state.companion.lastTip = state.frameTick;
    }

    // Vibration mobile
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }

    if (state.lives <= 0) {
        gameOver(reason || "Plus de vies !");
    }
}

function respawnPlayer() {
    // Utiliser le checkpoint si disponible ET sécurisé, sinon position de départ
    let spawnPos;
    const levelStart = LEVELS[state.level].playerStart;

    // Vérifier si le checkpoint est valide et sécurisé
    if (state.lastCheckpoint && isPositionSafe(state.lastCheckpoint.x, state.lastCheckpoint.y)) {
        spawnPos = state.lastCheckpoint;
        showMessage('🔄 CHECKPOINT', 'Tu reprends près d\'ici !', 1500);
    } else {
        // Checkpoint invalide ou dangereux, retour au début du niveau
        spawnPos = levelStart;
        state.lastCheckpoint = { x: levelStart.x, y: levelStart.y }; // Reset le checkpoint
        showMessage('🔄 DÉBUT', 'On recommence au début !', 1500);
    }

    // Reset complet du joueur
    player.x = spawnPos.x;
    player.y = spawnPos.y;
    player.vx = 0;
    player.vy = 0;
    player.grounded = false;
    player.climbing = false;
    player.jumpCount = 0;
    player.currentPlatform = null;

    // Reset les touches pour éviter les mouvements bloqués
    resetKeys();

    // Invincibilité plus longue pour laisser le temps de se remettre
    state.invincibilityTimer = state.difficulty <= 0.5 ? 180 : state.difficulty <= 0.7 ? 150 : 120;

    // Particules au respawn
    ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 20);
}

// ===== POWER-UPS =====
function collectPowerup(type) {
    AudioSystem.play('powerup'); // Son spécial pour power-up

    switch(type) {
        case 'shield':
            state.powerups.shield = CONFIG.POWERUP_DURATION.SHIELD;
            showMessage('🛡️ BOUCLIER !', 'Protégé contre 1 coup !', 2000);
            break;
        case 'super_jump':
            state.powerups.superJump = CONFIG.POWERUP_DURATION.SUPER_JUMP;
            showMessage('🚀 SUPER SAUT !', 'Saute encore plus haut !', 2000);
            break;
        case 'magnet':
            state.powerups.magnet = CONFIG.POWERUP_DURATION.MAGNET;
            showMessage('🧲 AIMANT !', 'Attire les pièces !', 2000);
            break;
        case 'star':
            state.powerups.star = CONFIG.POWERUP_DURATION.STAR;
            showMessage('⭐ INVINCIBLE !', 'Rien ne peut t\'arrêter !', 2000);
            break;
    }

    ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 30);
}

function showMessage(title, text, duration) {
    // Créer une notification temporaire en jeu
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        border: 4px solid gold;
        font-family: 'Patrick Hand', cursive;
        z-index: 50;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        animation: pulse 0.5s;
        pointer-events: none;
    `;
    notif.innerHTML = `
        <div style="font-size: 36px; font-weight: bold;">${title}</div>
        <div style="font-size: 20px; margin-top: 10px; color: rgba(255,255,255,0.9);">${text}</div>
    `;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'fadeOut 0.5s';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 500);
    }, duration);
}

// ===== SYSTÈME DE COMPAGNON VIRTUEL =====
function showCompanionTip(message) {
    if (!state.companion.enabled) return;

    const bubble = document.getElementById('companion-bubble');
    const icon = document.getElementById('companion-icon');
    const text = document.getElementById('companion-text');

    if (!bubble) return;

    // Définir l'icône selon le type de compagnon
    const companionIcons = {
        'cat': '🐱',
        'dog': '🐶',
        'bird': '🐦',
        'rabbit': '🐰',
        'dragon': '🐉',
        'unicorn': '🦄',
        'bear': '🐻',
        'fox': '🦊',
        'panda': '🐼',
        'lion': '🦁'
    };

    icon.textContent = companionIcons[state.companion.type] || '🐱';
    text.textContent = message;

    bubble.style.display = 'block';

    // Cacher après 4 secondes
    setTimeout(() => {
        bubble.style.display = 'none';
    }, 4000);
}

// Messages d'encouragement variés
const ENCOURAGEMENT_MESSAGES = [
    { title: '💪 Super !', text: 'Tu progresses bien !' },
    { title: '🌟 Bravo !', text: 'Continue comme ça !' },
    { title: '🎯 Bien joué !', text: 'Tu es sur la bonne voie !' },
    { title: '🚀 Génial !', text: 'Tu deviens un pro !' },
    { title: '⭐ Fantastique !', text: 'Tu es incroyable !' },
    { title: '🏆 Champion !', text: 'Rien ne peut t\'arrêter !' },
    { title: '💎 Magnifique !', text: 'Tu es le meilleur !' },
    { title: '🎉 Wouhou !', text: 'Tu assures grave !' }
];

const COMPANION_TIPS = {
    'start': [
        'Appuie sur ESPACE pour sauter !',
        'Tu peux faire un double saut !',
        'Utilise les flèches pour monter aux échelles !',
        'Cherche la clé pour ouvrir la porte !'
    ],
    'danger': [
        'Attention aux ennemis !',
        'Fais attention devant toi !',
        'Saute par-dessus les obstacles !',
        'Tu peux éviter ce piège !'
    ],
    'coin': [
        'Il y a des pièces par là !',
        'N\'oublie pas de collecter les pièces !',
        'Les pièces dorées valent plus !'
    ],
    'encouragement': [
        'Tu y es presque !',
        'Continue, tu vas y arriver !',
        'Je crois en toi !',
        'Tu es le meilleur !'
    ],
    'death': [
        'Ce n\'est pas grave, réessaie !',
        'Tu vas réussir cette fois !',
        'Courage, tu peux le faire !',
        'Allez, on recommence !'
    ]
};

function getRandomCompanionTip(category) {
    const tips = COMPANION_TIPS[category];
    if (!tips || tips.length === 0) return '';
    return tips[Math.floor(Math.random() * tips.length)];
}

function showRandomEncouragement() {
    if (state.encouragementCooldown > 0) return;

    const msg = ENCOURAGEMENT_MESSAGES[state.encouragementLevel % ENCOURAGEMENT_MESSAGES.length];
    state.encouragementLevel++;
    state.encouragementCooldown = 300; // Cooldown de 5 secondes

    // Afficher le message
    const popup = document.createElement('div');
    popup.className = 'encouragement-popup';
    popup.innerHTML = `
        <div style="font-size: 40px;">${msg.title}</div>
        <div style="font-size: 20px; margin-top: 10px;">${msg.text}</div>
    `;
    document.body.appendChild(popup);

    AudioSystem.play('powerup');

    setTimeout(() => {
        popup.style.animation = 'fadeOut 0.5s';
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}

// ===== SYSTÈME DE STATISTIQUES =====
function saveStats() {
    try {
        localStorage.setItem('leo_stats', JSON.stringify(state.stats));
    } catch(e) {}
}

function loadStats() {
    try {
        const saved = localStorage.getItem('leo_stats');
        if (saved) {
            const data = JSON.parse(saved);
            state.stats = { ...state.stats, ...data };
        }
    } catch(e) {}
}

// ===== PERSONNALISATION =====
function showCustomization() {
    document.getElementById('customization-screen').style.display = 'flex';
    updateCustomizationPreview();

    // Marquer les boutons sélectionnés
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.color === state.playerColor);
    });
    document.querySelectorAll('.companion-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.companion === state.companion.type);
    });
}

function closeCustomization() {
    document.getElementById('customization-screen').style.display = 'none';
    saveCustomization();
}

function updateCustomizationPreview() {
    const colorNames = {
        '#3498db': 'Bleu', '#e74c3c': 'Rouge', '#2ecc71': 'Vert',
        '#9b59b6': 'Violet', '#f39c12': 'Orange', '#1abc9c': 'Turquoise',
        '#e91e63': 'Rose', '#00bcd4': 'Cyan'
    };
    const companionIcons = { 'cat': '🐱', 'dog': '🐶', 'bird': '🐦', 'rabbit': '🐰', 'dragon': '🐉', 'unicorn': '🦄', 'bear': '🐻', 'fox': '🦊', 'panda': '🐼', 'lion': '🦁' };

    document.getElementById('preview-color').textContent = colorNames[state.playerColor] || 'Bleu';
    document.getElementById('preview-companion').textContent =
        (companionIcons[state.companion.type] || '🐱') + ' ' + state.companion.name;
}

function saveCustomization() {
    try {
        localStorage.setItem('leo_customization', JSON.stringify({
            playerColor: state.playerColor,
            companion: state.companion
        }));
    } catch(e) {}
}

function loadCustomization() {
    try {
        const saved = localStorage.getItem('leo_customization');
        if (saved) {
            const data = JSON.parse(saved);
            state.playerColor = data.playerColor || '#3498db';
            state.companion = { ...state.companion, ...data.companion };
        }
    } catch(e) {}
}

// ===== SYSTÈME DE BADGES AMÉLIORÉ =====
const ALL_BADGES = [
    { id: 'first_level', title: '🎮 Premier pas', desc: 'Termine le niveau 1', icon: '🎮' },
    { id: 'perfect_level', title: '⭐ Perfection', desc: '3 étoiles sur un niveau', icon: '⭐' },
    { id: 'coin_collector', title: '🪙 Collectionneur', desc: '50 pièces collectées', icon: '🪙' },
    { id: 'halfway', title: '🏃 À mi-chemin', desc: 'Atteins le niveau 5', icon: '🏃' },
    { id: 'boss_defeated', title: '⚔️ Vainqueur', desc: 'Bats le boss final', icon: '⚔️' },
    { id: 'all_stars', title: '🌟 Maître du jeu', desc: 'Toutes les étoiles', icon: '🌟' },
    { id: 'no_death', title: '🛡️ Invincible', desc: 'Niveau sans mourir', icon: '🛡️' },
    { id: 'speed_runner', title: '⚡ Éclair', desc: 'Niveau en moins de 30s', icon: '⚡' },
    { id: 'explorer', title: '🗺️ Explorateur', desc: 'Trouve un secret', icon: '🗺️' },
    { id: 'coin_master', title: '💰 Riche', desc: '200 pièces totales', icon: '💰' },
    { id: 'persistent', title: '💪 Persévérant', desc: '10 parties jouées', icon: '💪' },
    { id: 'streak_3', title: '🔥 En feu', desc: '3 niveaux sans mourir', icon: '🔥' }
];

function showBadges() {
    document.getElementById('badges-screen').style.display = 'flex';
    renderBadges();
}

function closeBadges() {
    document.getElementById('badges-screen').style.display = 'none';
}

function renderBadges() {
    const grid = document.getElementById('badges-grid');
    grid.innerHTML = '';

    ALL_BADGES.forEach(badge => {
        const isUnlocked = state.badges[badge.id];
        const div = document.createElement('div');
        div.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        div.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-title">${badge.title}</div>
            <div class="badge-desc">${isUnlocked ? badge.desc : '???'}</div>
        `;
        grid.appendChild(div);
    });
}

function saveBadges() {
    try {
        localStorage.setItem('leo_badges', JSON.stringify(state.badges));
    } catch(e) {}
}

function loadBadges() {
    try {
        const saved = localStorage.getItem('leo_badges');
        if (saved) {
            state.badges = JSON.parse(saved);
        }
    } catch(e) {}
}

// ===== STATISTIQUES SCREEN =====
function showStats() {
    document.getElementById('stats-screen').style.display = 'flex';
    renderStats();
}

function closeStats() {
    document.getElementById('stats-screen').style.display = 'none';
}

function renderStats() {
    const container = document.getElementById('stats-container');
    container.innerHTML = '';

    const statsToShow = [
        { icon: '🎮', value: state.stats.gamesPlayed, label: 'Parties jouées' },
        { icon: '🪙', value: state.totalCoins, label: 'Pièces totales' },
        { icon: '⭐', value: state.totalStars, label: 'Étoiles gagnées' },
        { icon: '🏆', value: state.stats.perfectLevels, label: 'Niveaux parfaits' },
        { icon: '🦘', value: state.stats.totalJumps, label: 'Sauts effectués' },
        { icon: '💀', value: state.stats.totalDeaths, label: 'Nombre de morts' },
        { icon: '🔥', value: state.stats.bestStreak, label: 'Meilleure série' },
        { icon: '🏅', value: Object.keys(state.badges).length, label: 'Badges débloqués' }
    ];

    statsToShow.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerHTML = `
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        container.appendChild(div);
    });
}

// ===== MINI-JEU DE MATHS =====
let currentMathAnswer = 0;
let mathGameCallback = null;

function showMathGame(callback) {
    mathGameCallback = callback;

    // Générer une question simple (addition ou soustraction)
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1, num2, answer;
    if (operation === '+') {
        num1 = Math.floor(Math.random() * 10) + 1; // 1-10
        num2 = Math.floor(Math.random() * 10) + 1; // 1-10
        answer = num1 + num2;
    } else {
        num1 = Math.floor(Math.random() * 10) + 5; // 5-14
        num2 = Math.floor(Math.random() * Math.min(num1, 10)) + 1; // 1-10 mais < num1
        answer = num1 - num2;
    }

    currentMathAnswer = answer;

    // Afficher la question
    document.getElementById('math-question').textContent = `${num1} ${operation} ${num2} = ?`;
    document.getElementById('math-result').textContent = '';

    // Générer les réponses (1 bonne + 3 fausses)
    const answers = [answer];
    while (answers.length < 4) {
        const wrongAnswer = answer + Math.floor(Math.random() * 7) - 3; // ±3
        if (wrongAnswer !== answer && wrongAnswer > 0 && !answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer);
        }
    }

    // Mélanger les réponses
    answers.sort(() => Math.random() - 0.5);

    // Créer les boutons
    const container = document.getElementById('math-answers');
    container.innerHTML = '';

    answers.forEach(ans => {
        const btn = document.createElement('button');
        btn.className = 'big-btn';
        btn.style.background = '#3498db';
        btn.style.minWidth = '80px';
        btn.textContent = ans;
        btn.onclick = () => checkMathAnswer(ans);
        container.appendChild(btn);
    });

    document.getElementById('math-game').style.display = 'flex';
}

function checkMathAnswer(answer) {
    const resultEl = document.getElementById('math-result');
    const answersEl = document.getElementById('math-answers');

    // Désactiver tous les boutons
    answersEl.querySelectorAll('button').forEach(btn => btn.disabled = true);

    if (answer === currentMathAnswer) {
        // Bonne réponse !
        resultEl.innerHTML = '✅ <span style="color: #27ae60;">BRAVO ! +5 pièces bonus !</span>';
        state.coins += 5;
        state.totalCoins += 5;
        AudioSystem.play('powerup');
        ParticleSystem.emit(window.innerWidth / 2, window.innerHeight / 2, 'coin', 20);

        // Badge explorateur (secret) si première fois
        if (!state.badges['explorer']) {
            state.badges['explorer'] = true;
            if (typeof saveBadges === 'function') saveBadges();
            setTimeout(() => {
                if (typeof showBadgeNotification === 'function') {
                    showBadgeNotification({ title: '🗺️ Explorateur', desc: 'Quiz bonus trouvé !' });
                }
            }, 1500);
        }
    } else {
        // Mauvaise réponse
        resultEl.innerHTML = `❌ <span style="color: #e74c3c;">C'était ${currentMathAnswer} !</span>`;
        AudioSystem.play('hurt');
    }

    // Fermer après 2 secondes
    setTimeout(() => {
        document.getElementById('math-game').style.display = 'none';
        if (mathGameCallback) {
            mathGameCallback();
            mathGameCallback = null;
        }
    }, 2000);
}

function skipMathGame() {
    document.getElementById('math-game').style.display = 'none';
    if (mathGameCallback) {
        mathGameCallback();
        mathGameCallback = null;
    }
}

// Déclencher le quiz math aléatoirement entre les niveaux (1 chance sur 3)
function maybeShowMathGame(callback) {
    // Ne montrer qu'en mode facile ou très facile
    if (state.difficulty > 0.8) {
        callback();
        return;
    }

    // 1 chance sur 3
    if (Math.random() < 0.33) {
        showMathGame(callback);
    } else {
        callback();
    }
}

// ===== PLEIN ÉCRAN =====
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Entrer en plein écran
        document.documentElement.requestFullscreen().then(() => {
            document.getElementById('fullscreen-button').textContent = '📺 Quitter plein écran';
        }).catch(err => {
            console.log('Erreur plein écran:', err);
        });
    } else {
        // Quitter le plein écran
        document.exitFullscreen().then(() => {
            document.getElementById('fullscreen-button').textContent = '📺 Plein écran';
        });
    }
}

// ===== RESET DES TOUCHES (corrige le bug de touches bloquées) =====
function resetKeys() {
    keys.left = false;
    keys.right = false;
    keys.up = false;
    keys.down = false;
    keys.jump = false;
}

// Appeler resetKeys quand la fenêtre perd le focus (empêche les touches bloquées)
window.addEventListener('blur', resetKeys);
window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        resetKeys();
    }
});

// Reset les touches quand on clique sur le canvas (au cas où)
document.addEventListener('mousedown', () => {
    // Ne pas reset si on est en train de jouer activement
    if (state.current !== GameState.PLAYING) {
        resetKeys();
    }
});

// ===== EXPORTS GLOBAUX POUR LES NOUVELLES FONCTIONS =====
window.showCustomization = showCustomization;
window.closeCustomization = closeCustomization;
window.showBadges = showBadges;
window.closeBadges = closeBadges;
window.showStats = showStats;
window.closeStats = closeStats;
window.skipMathGame = skipMathGame;
window.showMathGame = showMathGame;
window.maybeShowMathGame = maybeShowMathGame;
window.toggleFullscreen = toggleFullscreen;
window.resetKeys = resetKeys;
