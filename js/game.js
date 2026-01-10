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
    
    // AZERTY : A = gauche, Z = droite
    // QWERTY : Q = gauche, D = droite
    // Flèches : toujours supportées
    if (k === 'a' || k === 'arrowleft' || k === 'q') keys.left = pressed;
    if (k === 'z' || k === 'arrowright' || k === 'd') keys.right = pressed;
    if (k === 'arrowup' || k === 'w') keys.up = pressed;
    if (k === 'arrowdown' || k === 's') keys.down = pressed;
    
    // Saut avec ESPACE
    if (pressed && (k === ' ' || code === 'Space')) {
        e.preventDefault();
        
        // Si message affiché, continuer
        const msgBox = document.getElementById('message-box');
        if (msgBox.style.display === 'block') {
            nextLevelAction();
            return;
        }
        
        if (state.current === GameState.PLAYING) {
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
        state.level = parseInt(e.key);
        if (state.current === GameState.MENU) {
            startGame('easy');
        } else {
            initLevel(state.level);
            updateProgressBar();
            state.current = GameState.PLAYING;
        }
    }
    
    // Touche + (pavé numérique ou clavier) pour ajouter une vie
    if (pressed && (code === 'NumpadAdd' || k === '+' || code === 'Equal')) {
        if (state.lives < CONFIG.MAX_LIVES) {
            state.lives++;
            updateHud();
            AudioSystem.play('life');
            ParticleSystem.emit(player.x + player.w/2, player.y, 'life', 10);
        }
    }
}

function doJump() {
    AudioSystem.resume();
    
    if (player.grounded || player.climbing) {
        player.vy = -player.jumpForce;
        player.grounded = false;
        player.climbing = false;
        player.jumpCount = 1;
        AudioSystem.play('jump');
        ParticleSystem.emit(player.x + player.w / 2, player.y + player.h, 'dust', 5);
    } else if (player.jumpCount < player.maxJumps) {
        player.vy = -player.jumpForce * 0.9;
        player.jumpCount++;
        AudioSystem.play('jump');
    }
    
    updateJumpIndicator();
}

function updateJumpIndicator() {
    const jumpsLeft = player.maxJumps - player.jumpCount;
    document.getElementById('jump1').classList.toggle('available', jumpsLeft >= 1 || player.grounded);
    document.getElementById('jump2').classList.toggle('available', jumpsLeft >= 2 || player.grounded);
}

// ===== DÉMARRAGE DU JEU =====
function startGame(difficulty) {
    AudioSystem.resume();
    
    state.difficulty = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.3 : 1.6;
    state.lives = 3;
    state.coins = 0;
    state.totalCoins = 0;
    
    document.getElementById('start-screen').style.display = 'none';
    
    initLevel(state.level);
    state.current = GameState.PLAYING;
    
    updateHud();
    updateProgressBar();
    
    // Tutoriel au niveau 1
    if (state.level === 1 && !state.tutorialShown) {
        document.getElementById('tutorial').style.display = 'block';
        state.tutorialShown = true;
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

// ===== INITIALISATION DU NIVEAU =====
function initLevel(levelNum) {
    const levelDef = LEVELS[levelNum];
    if (!levelDef) return;
    
    currentLevelData = levelDef.setup(canvas.width, canvas.height);
    
    // Reset joueur
    player.reset(levelDef.playerStart.x, levelDef.playerStart.y);
    
    // Reset état niveau
    state.hasKey = false;
    state.levelTime = 0;
    state.invincibilityTimer = 0;
    state.teleportTimer = 0;
    state.coins = 0;
    
    ParticleSystem.clear();
    
    // UI
    document.getElementById('key-display').style.display = 'none';
    document.getElementById('level-display').textContent = `NIVEAU ${levelNum}`;
    document.body.style.backgroundColor = levelDef.bgColor;
    
    updateCoinsDisplay();
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
    
    state.frameTick++;
    if (state.invincibilityTimer > 0) state.invincibilityTimer--;
    if (state.teleportTimer > 0) state.teleportTimer--;
    if (state.screenShake > 0) state.screenShake--;
    
    if (state.timerEnabled) {
        state.levelTime += CONFIG.TIME_STEP;
        updateTimerDisplay();
    }
    
    // Boss level special update
    if (LEVELS[state.level].isBoss && currentLevelData.boss) {
        updateBoss();
    }
    
    // Projectiles du niveau 7
    if (state.level === 7 && state.frameTick % 90 === 0) {
        currentLevelData.projectiles.push({
            x: canvas.width + 100,
            y: player.y + 10,
            w: 40, h: 10,
            speed: -6 * state.difficulty,
            type: 'arrow'
        });
    }
    
    updateProjectiles();
    updateEnemies();
    updatePlatforms();
    updateHazards();
    updatePortals();
    updateFireBars();
    updatePlayer();
    checkCollisions();
    
    ParticleSystem.update();
    updateJumpIndicator();
}

function updatePlayer() {
    const prevY = player.y;
    
    // Échelles
    let touchingLadder = false;
    for (const l of currentLevelData.ladders) {
        if (player.x + player.w > l.x && player.x < l.x + l.w &&
            player.y + player.h > l.y - 10 && player.y < l.y + l.h + 20) {
            touchingLadder = true;
            break;
        }
    }
    
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
        player.vy += CONFIG.GRAVITY;
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
    
    for (const p of currentLevelData.portals) {
        if (checkCollision(player, p)) {
            player.x = p.destX;
            player.y = p.destY;
            player.vx = 0;
            player.vy = 0;
            state.teleportTimer = 60;
            ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'sparkle', 20);
            break;
        }
    }
}

function updateFireBars() {
    for (const fb of currentLevelData.fireBars) {
        fb.angle += fb.speed;
    }
}

function updateProjectiles() {
    for (let i = currentLevelData.projectiles.length - 1; i >= 0; i--) {
        const p = currentLevelData.projectiles[i];
        p.x += p.speed;
        if (p.x < -100 || p.x > canvas.width + 100) {
            currentLevelData.projectiles.splice(i, 1);
        }
    }
}

function updateBoss() {
    const boss = currentLevelData.boss;
    if (!boss || boss.hp <= 0) return;
    
    boss.attackTimer++;
    if (boss.invincible > 0) boss.invincible--;
    
    // Patterns d'attaque
    if (boss.attackTimer % 120 === 0) {
        // Tir de projectile
        const projSpeed = boss.phase === 1 ? -6 : -8;
        currentLevelData.projectiles.push({
            x: boss.x,
            y: boss.y + boss.h / 2,
            w: 30, h: 30,
            speed: projSpeed * state.difficulty,
            type: 'boss_fire'
        });
        
        if (boss.phase >= 2 && boss.attackTimer % 240 === 0) {
            // Attaque supplémentaire
            currentLevelData.projectiles.push({
                x: boss.x,
                y: boss.y + 30,
                w: 20, h: 20,
                speed: -7 * state.difficulty,
                type: 'boss_fire'
            });
            currentLevelData.projectiles.push({
                x: boss.x,
                y: boss.y + boss.h - 30,
                w: 20, h: 20,
                speed: -7 * state.difficulty,
                type: 'boss_fire'
            });
        }
    }
    
    // Mouvement du boss
    if (boss.phase >= 2) {
        boss.x += Math.sin(state.frameTick * 0.02) * 2;
    }
}

// ===== COLLISIONS =====
function checkCollision(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
}

function checkCollisions() {
    // Pièces
    for (let i = currentLevelData.coins.length - 1; i >= 0; i--) {
        const c = currentLevelData.coins[i];
        if (checkCollision(player, c)) {
            currentLevelData.coins.splice(i, 1);
            state.coins++;
            state.totalCoins++;
            updateCoinsDisplay();
            AudioSystem.play('coin');
            ParticleSystem.emit(c.x + c.w/2, c.y + c.h/2, 'coin', 8);
        }
    }
    
    // Clé
    if (!state.hasKey && currentLevelData.keyItem) {
        if (checkCollision(player, currentLevelData.keyItem)) {
            state.hasKey = true;
            currentLevelData.keyItem = null;
            document.getElementById('key-display').style.display = 'inline';
            AudioSystem.play('key');
            ParticleSystem.emit(player.x + player.w/2, player.y, 'sparkle', 20);
        }
    }
    
    // But
    if (currentLevelData.goal && checkCollision(player, currentLevelData.goal)) {
        const levelDef = LEVELS[state.level];
        
        // Vérifier si le niveau nécessite une clé
        const needsKey = levelDef.needsKey !== false && state.level !== 3 && state.level !== 7 && state.level !== 9;
        
        if (needsKey && !state.hasKey) {
            // Repousser le joueur
            if (player.x < currentLevelData.goal.x) player.x -= 5;
            return;
        }
        
        // Niveau boss : pas de goal direct
        if (levelDef.isBoss) return;
        
        levelWin();
        return;
    }
    
    // Boss
    if (currentLevelData.boss && currentLevelData.boss.hp > 0) {
        const boss = currentLevelData.boss;
        
        // Joueur saute sur le boss
        if (player.vy > 0 && boss.invincible === 0 &&
            player.x + player.w > boss.x && player.x < boss.x + boss.w &&
            player.y + player.h > boss.y && player.y + player.h < boss.y + 40) {
            
            boss.hp--;
            boss.invincible = 60;
            player.vy = -12;
            state.screenShake = 10;
            AudioSystem.play('boss_hit');
            ParticleSystem.emit(boss.x + boss.w/2, boss.y, 'boss', 15);
            
            if (boss.hp <= boss.maxHp / 2) boss.phase = 2;
            
            if (boss.hp <= 0) {
                levelWin();
                return;
            }
        }
        // Boss touche le joueur
        else if (checkCollision(player, boss) && state.invincibilityTimer === 0) {
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
        
        // Ennemis
        for (const e of currentLevelData.enemies) {
            if (checkCollision(player, e)) {
                takeDamage("Monstre !");
            }
        }
    }
}

function takeDamage(reason) {
    if (state.invincibilityTimer > 0) return;
    
    state.lives--;
    state.invincibilityTimer = 90;
    state.screenShake = 15;
    
    player.vy = -10;
    player.vx = player.facingRight ? -8 : 8;
    
    updateHud();
    AudioSystem.play('hurt');
    ParticleSystem.emit(player.x + player.w/2, player.y + player.h/2, 'damage', 12);
    
    // Vibration mobile
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    
    if (state.lives <= 0) {
        gameOver(reason || "Plus de vies !");
    }
}

function respawnPlayer() {
    const start = LEVELS[state.level].playerStart;
    player.x = start.x;
    player.y = start.y;
    player.vx = 0;
    player.vy = 0;
    player.grounded = false;
    player.climbing = false;
    player.jumpCount = 0;
    player.currentPlatform = null;
    state.invincibilityTimer = 120; // Plus long pour laisser le temps de se remettre
}
