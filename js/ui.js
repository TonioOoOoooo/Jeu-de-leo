// ============================================================
// L'AVENTURE DE LÉO - INTERFACE UTILISATEUR
// ============================================================

// ===== HUD =====
function updateHud() {
    let hearts = "";
    for (let i = 0; i < state.lives; i++) hearts += "❤️";
    // Afficher les cœurs noirs perdus (max basé sur difficulté)
    const maxLives = state.difficulty <= 0.5 ? 10 : state.difficulty <= 0.7 ? 7 : state.difficulty <= 1.2 ? 4 : 2;
    for (let i = state.lives; i < maxLives; i++) hearts += "🖤";
    document.getElementById('hearts').textContent = hearts;

    // Afficher l'indicateur de série si > 1
    const streakEl = document.getElementById('streak-indicator');
    const streakCount = document.getElementById('streak-count');
    if (streakEl && state.stats && state.stats.currentStreak >= 2) {
        streakEl.style.display = 'block';
        if (streakCount) streakCount.textContent = state.stats.currentStreak;
    } else if (streakEl) {
        streakEl.style.display = 'none';
    }

    const keyDisplay = document.getElementById('key-display');
    if (state.hasKey) {
        keyDisplay.style.display = 'inline';
        keyDisplay.textContent = '🗝️ CLÉ !';
    } else if (currentLevelData && currentLevelData.keyItem) {
        keyDisplay.style.display = 'inline';
        keyDisplay.textContent = '🗝️ →';
    } else {
        keyDisplay.style.display = 'none';
    }

    // Indicateur spécial pour le Nether
    const levelDisplay = document.getElementById('level-display');
    if (state.level === 5 && state.inSubLevel) {
        levelDisplay.textContent = '🔥 NETHER';
        levelDisplay.style.color = '#ff4400';
    } else {
        levelDisplay.textContent = `NIVEAU ${state.level}`;
        levelDisplay.style.color = '#fff';
    }
}

function updateCoinsDisplay() {
    document.getElementById('coins-display').textContent = `🪙 ${state.coins}`;
}

function updateStarsDisplay() {
    document.getElementById('stars-display').textContent = `⭐ ${state.totalStars}`;
}

function updateTimerDisplay() {
    const seconds = Math.floor(state.levelTime / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timer-display').textContent = 
        `⏱️ ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ===== FIN DE NIVEAU =====
function levelWin() {
    state.current = GameState.TRANSITIONING;
    AudioSystem.play('victory');

    // 🎁 BONUS VIE SI 100% DES PIÈCES COLLECTÉES !
    let perfectCoinsBonus = false;
    if (state.maxCoinsInLevel > 0 && state.coins === state.maxCoinsInLevel) {
        state.lives++;
        perfectCoinsBonus = true;
        AudioSystem.play('powerup');
        updateHud();
        // Particules de célébration !
        ParticleSystem.emit(canvas.width / 2, canvas.height / 2, 'confetti', 50);
    }

    // Calculer les étoiles gagnées !
    const stars = calculateStars();
    state.levelStars[state.level] = Math.max(state.levelStars[state.level] || 0, stars);
    state.totalStars = Object.values(state.levelStars).reduce((a, b) => a + b, 0);

    // === STATISTIQUES ===
    state.stats.currentStreak++;
    if (state.stats.currentStreak > state.stats.bestStreak) {
        state.stats.bestStreak = state.stats.currentStreak;
    }
    if (stars === 3) {
        state.stats.perfectLevels++;
    }

    // Badges de série
    if (state.stats.currentStreak >= 3 && !state.badges['streak_3']) {
        state.badges['streak_3'] = true;
        setTimeout(() => showBadgeNotification({ title: '🔥 En feu !', desc: '3 niveaux sans mourir !' }), 2000);
    }

    // Mettre à jour l'affichage des étoiles
    updateStarsDisplay();

    // Vérifier les badges
    checkBadges();

    // Sauvegarder les stats
    if (typeof saveStats === 'function') saveStats();
    if (typeof saveBadges === 'function') saveBadges();
    saveGame();

    // Message du compagnon si activé
    if (state.companion && state.companion.enabled) {
        setTimeout(() => {
            if (typeof showCompanionTip === 'function') {
                const tips = ['Bravo ' + (state.playerName || 'Léo') + ' ! 🎉', 'Tu es génial ! 🌟', 'Super travail ! 💪'];
                showCompanionTip(tips[Math.floor(Math.random() * tips.length)]);
            }
        }, 1000);
    }

    const isFinalLevel = state.level >= CONFIG.TOTAL_LEVELS;

    // Messages encourageants selon les étoiles !
    const starMessages = [
        "Continue comme ça !",
        "Très bien ! 🌟",
        "Super ! 🌟🌟",
        "PARFAIT ! 🌟🌟🌟"
    ];

    document.getElementById('msg-title').textContent =
        isFinalLevel ? "🏆 VICTOIRE TOTALE !" : `NIVEAU ${state.level} RÉUSSI !`;
    document.getElementById('msg-title').style.color = isFinalLevel ? "gold" : "#27ae60";

    document.getElementById('msg-text').textContent =
        isFinalLevel ? "Tu as vaincu le boss et terminé le jeu !" : starMessages[stars];

    const starsDisplay = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    const perfectMessage = perfectCoinsBonus ? '\n💚 100% DES PIÈCES ! +1 VIE !' : '';
    document.getElementById('msg-coins').textContent =
        `${starsDisplay}\nPièces : ${state.coins}/${state.maxCoinsInLevel} | Total : ${state.totalCoins}${perfectMessage}`;

    document.getElementById('msg-btn').textContent =
        isFinalLevel ? "🎉 Rejouer" : "Continuer ▶";

    document.getElementById('msg-hint').textContent = "(ESPACE pour continuer)";
    document.getElementById('message-box').style.display = "block";

    // CONFETTIS ! 🎉
    createConfetti(stars);

    // Sons de célébration !
    if (stars >= 3) {
        AudioSystem.play('cheer');
    }
}

function calculateStars() {
    let stars = 1; // Au moins 1 étoile pour avoir terminé

    const levelIndex = state.level - 1;
    const timeInSeconds = state.levelTime / 1000;

    // Étoile bonus pour le temps
    if (CONFIG.STARS.TIME_GOLD[levelIndex] && timeInSeconds <= CONFIG.STARS.TIME_GOLD[levelIndex]) {
        stars = 3;
    } else if (CONFIG.STARS.TIME_SILVER[levelIndex] && timeInSeconds <= CONFIG.STARS.TIME_SILVER[levelIndex]) {
        stars = 2;
    }

    // Étoile bonus si on a collecté beaucoup de pièces
    if (state.maxCoinsInLevel > 0) {
        const coinPercent = state.coins / state.maxCoinsInLevel;
        if (coinPercent >= CONFIG.STARS.MIN_COINS_PERCENT && stars < 3) {
            stars = Math.min(3, stars + 1);
        }
    }

    return stars;
}

function gameOver(reason) {
    state.current = GameState.GAME_OVER;
    AudioSystem.play('death');
    
    document.getElementById('msg-title').textContent = "💀 GAME OVER";
    document.getElementById('msg-title').style.color = "#e74c3c";
    document.getElementById('msg-text').textContent = reason || "Plus de vies...";
    document.getElementById('msg-coins').textContent = `Pièces collectées : ${state.totalCoins}`;
    document.getElementById('msg-btn').textContent = "Recommencer";
    document.getElementById('msg-hint').textContent = "(ESPACE pour rejouer)";
    document.getElementById('message-box').style.display = "block";
}

function nextLevelAction() {
    document.getElementById('message-box').style.display = 'none';

    if (state.level >= CONFIG.TOTAL_LEVELS || state.current === GameState.GAME_OVER) {
        showHallOfFame();
        return;
    }

    // Quiz bonus (aléatoire en mode facile) avant la transition
    const proceedToNextLevel = () => {
        showTransition(state.level + 1, () => {
            state.level++;
            initLevel(state.level);
            updateProgressBar();
            state.current = GameState.PLAYING;
            state.lastTime = 0;
            state.accumulator = 0;
        });
    };

    // Utiliser le mini-jeu math si disponible
    if (typeof maybeShowMathGame === 'function') {
        maybeShowMathGame(proceedToNextLevel);
    } else {
        proceedToNextLevel();
    }
}

function getScoreMultiplier() {
    if (state.difficulty <= 0.7) return 1;
    if (state.difficulty <= 1.2) return 1.5;
    return 2;
}

function calculateFinalScore() {
    const multiplier = getScoreMultiplier();
    const baseScore = state.totalCoins * 100 + state.totalStars * 500;
    return Math.round(baseScore * multiplier);
}

function loadHallOfFame() {
    try {
        const data = JSON.parse(localStorage.getItem('leo_hall_of_fame') || '[]');
        if (Array.isArray(data)) return data;
    } catch (e) {}
    return [];
}

function saveHallOfFame(entries) {
    localStorage.setItem('leo_hall_of_fame', JSON.stringify(entries));
}

function isHighScore(score, entries) {
    if (entries.length < 10) return true;
    return entries.some(entry => score > entry.score);
}

function renderHallOfFame(entries) {
    const list = document.getElementById('hall-list');
    list.innerHTML = '';
    if (!entries.length) {
        const li = document.createElement('li');
        li.textContent = 'Aucun score enregistré pour le moment.';
        list.appendChild(li);
        return;
    }
    entries.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name} — ${entry.score}`;
        list.appendChild(li);
    });
}

function showHallOfFame() {
    const screen = document.getElementById('hall-of-fame');
    const messageBox = document.getElementById('message-box');
    if (messageBox) messageBox.style.display = 'none';
    if (!screen) return;

    const score = calculateFinalScore();
    state.score = score;
    const entries = loadHallOfFame()
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

    document.getElementById('hall-score').textContent = `Score final : ${score}`;
    const hallForm = document.getElementById('hall-form');
    const hallMessage = document.getElementById('hall-message');
    const nameInput = document.getElementById('hall-name');
    if (nameInput) nameInput.value = '';

    if (state.cheatsUsed) {
        hallForm.style.display = 'none';
        hallMessage.textContent = 'Score non éligible (cheats utilisés).';
    } else if (isHighScore(score, entries)) {
        hallForm.style.display = 'block';
        hallMessage.textContent = 'Bravo ! Tu es dans le TOP 10.';
    } else {
        hallForm.style.display = 'none';
        hallMessage.textContent = 'Pas dans le TOP 10 cette fois.';
    }

    renderHallOfFame(entries);
    screen.style.display = 'flex';
    screen.style.opacity = '1';
}

function submitHallOfFame() {
    const nameInput = document.getElementById('hall-name');
    const hallForm = document.getElementById('hall-form');
    const hallMessage = document.getElementById('hall-message');
    if (!nameInput || !hallForm) return;

    const rawName = nameInput.value.trim();
    const name = rawName ? rawName.slice(0, 12).toUpperCase() : 'ANON';
    const entries = loadHallOfFame();
    entries.push({ name, score: state.score });
    entries.sort((a, b) => b.score - a.score);
    const topEntries = entries.slice(0, 10);
    saveHallOfFame(topEntries);
    renderHallOfFame(topEntries);
    hallForm.style.display = 'none';
    hallMessage.textContent = 'Score enregistré !';
}

function returnToMenu() {
    const hallScreen = document.getElementById('hall-of-fame');
    if (hallScreen) hallScreen.style.display = 'none';
    state.level = 1;
    state.current = GameState.MENU;
    document.getElementById('start-screen').style.display = 'flex';
    if (state.animationId) cancelAnimationFrame(state.animationId);
}

function showTransition(levelNum, callback) {
    const screen = document.getElementById('transition-screen');
    const text = document.getElementById('transition-text');
    const levelDef = LEVELS[levelNum];
    
    text.textContent = levelDef.isBoss ? "⚔️ BOSS FINAL ⚔️" : `NIVEAU ${levelNum}`;
    text.style.textShadow = levelDef.isBoss ? "0 0 20px #9b59b6" : "none";
    
    screen.style.display = 'flex';
    screen.style.opacity = '0';
    
    setTimeout(() => { screen.style.opacity = '1'; }, 50);
    
    setTimeout(() => {
        screen.style.opacity = '0';
        setTimeout(() => {
            screen.style.display = 'none';
            callback();
        }, 500);
    }, 1500);
}

// ===== PAUSE =====
function togglePause() {
    if (state.current === GameState.PLAYING) {
        state.current = GameState.PAUSED;
        document.getElementById('pause-screen').style.display = 'flex';
        document.getElementById('pause-level').textContent = state.level;
    } else if (state.current === GameState.PAUSED) {
        resumeGame();
    }
}

function resumeGame() {
    state.current = GameState.PLAYING;
    document.getElementById('pause-screen').style.display = 'none';
    state.lastTime = 0;
}

function restartLevel() {
    document.getElementById('pause-screen').style.display = 'none';
    state.lives = 3;
    state.coins = 0;
    updateHud();
    initLevel(state.level);
    state.current = GameState.PLAYING;
    state.lastTime = 0;
}

function quitToMenu() {
    document.getElementById('pause-screen').style.display = 'none';
    state.current = GameState.MENU;
    document.getElementById('start-screen').style.display = 'flex';
    if (state.animationId) cancelAnimationFrame(state.animationId);
}

// ===== OPTIONS =====
function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    AudioSystem.enabled = state.soundEnabled;
    const toggle = document.getElementById('sound-toggle');
    if (toggle) {
        toggle.classList.toggle('active', state.soundEnabled);
    }
    updateSoundButton();
}

function toggleTimer() {
    state.timerEnabled = !state.timerEnabled;
    document.getElementById('timer-toggle').classList.toggle('active', state.timerEnabled);
    document.getElementById('timer-display').style.display = state.timerEnabled ? 'block' : 'none';
}

function updateSoundButton() {
    const button = document.getElementById('sound-button');
    if (!button) return;
    button.textContent = state.soundEnabled ? '🔊 Son: ON' : '🔇 Son: OFF';
    button.classList.toggle('off', !state.soundEnabled);
}

// ===== SYSTÈME DE BADGES =====
function checkBadges() {
    const newBadges = [];

    // Badge : Premier niveau
    if (state.level >= 1 && !state.badges['first_level']) {
        state.badges['first_level'] = true;
        newBadges.push({ title: '🎮 Premier pas', desc: 'Niveau 1 terminé !' });
    }

    // Badge : 3 étoiles
    if (state.levelStars[state.level] === 3 && !state.badges['perfect_level']) {
        state.badges['perfect_level'] = true;
        newBadges.push({ title: '⭐ Perfection', desc: '3 étoiles sur un niveau !' });
    }

    // Badge : 50 pièces
    if (state.totalCoins >= 50 && !state.badges['coin_collector']) {
        state.badges['coin_collector'] = true;
        newBadges.push({ title: '🪙 Collectionneur', desc: '50 pièces collectées !' });
    }

    // Badge : 200 pièces
    if (state.totalCoins >= 200 && !state.badges['coin_master']) {
        state.badges['coin_master'] = true;
        newBadges.push({ title: '💰 Riche !', desc: '200 pièces totales !' });
    }

    // Badge : Niveau 5 atteint
    if (state.level >= 5 && !state.badges['halfway']) {
        state.badges['halfway'] = true;
        newBadges.push({ title: '🏃 À mi-chemin', desc: 'Niveau 5 atteint !' });
    }

    // Badge : Boss vaincu
    if (state.level === 10 && !state.badges['boss_defeated']) {
        state.badges['boss_defeated'] = true;
        newBadges.push({ title: '⚔️ Vainqueur', desc: 'Boss vaincu !' });
    }

    // Badge : Toutes les étoiles
    if (state.totalStars >= CONFIG.TOTAL_LEVELS * 3 && !state.badges['all_stars']) {
        state.badges['all_stars'] = true;
        newBadges.push({ title: '🌟 Maître du jeu', desc: 'Toutes les étoiles !' });
    }

    // Badge : Niveau sans mourir (si currentStreak > 0 après le premier niveau)
    if (state.stats && state.stats.currentStreak >= 1 && state.level > 1 && !state.badges['no_death']) {
        state.badges['no_death'] = true;
        newBadges.push({ title: '🛡️ Invincible', desc: 'Niveau sans mourir !' });
    }

    // Badge : Speed runner (niveau en moins de 30 secondes)
    if (state.levelTime < 30000 && !state.badges['speed_runner']) {
        state.badges['speed_runner'] = true;
        newBadges.push({ title: '⚡ Éclair', desc: 'Niveau en moins de 30s !' });
    }

    // Badge : Persévérant (10 parties)
    if (state.stats && state.stats.gamesPlayed >= 10 && !state.badges['persistent']) {
        state.badges['persistent'] = true;
        newBadges.push({ title: '💪 Persévérant', desc: '10 parties jouées !' });
    }

    // Afficher les nouveaux badges
    if (newBadges.length > 0) {
        setTimeout(() => {
            for (const badge of newBadges) {
                showBadgeNotification(badge);
            }
        }, 1500);
    }

    // Sauvegarder les badges
    if (typeof saveBadges === 'function') saveBadges();
}

function showBadgeNotification(badge) {
    // Créer une notification temporaire
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 15px;
        border: 3px solid gold;
        font-family: 'Patrick Hand', cursive;
        z-index: 100;
        animation: slideIn 0.5s;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    notif.innerHTML = `
        <div style="font-size: 24px; font-weight: bold;">${badge.title}</div>
        <div style="font-size: 16px; margin-top: 5px;">${badge.desc}</div>
    `;

    document.body.appendChild(notif);

    AudioSystem.play('victory');

    setTimeout(() => {
        notif.style.animation = 'slideOut 0.5s';
        setTimeout(() => notif.remove(), 500);
    }, 3000);
}

function createConfetti(stars) {
    // Plus d'étoiles = plus de confettis !
    const confettiCount = [30, 50, 100][stars - 1] || 30;

    // Créer des confettis en plusieurs vagues
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            for (let i = 0; i < confettiCount / 3; i++) {
                const x = Math.random() * canvas.width;
                const y = -50;
                ParticleSystem.emit(x, y, 'confetti', 1);
            }
        }, wave * 300);
    }

    // Confettis depuis les côtés pour 3 étoiles !
    if (stars === 3) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                ParticleSystem.emit(0, canvas.height * 0.3, 'confetti', 20);
                ParticleSystem.emit(canvas.width, canvas.height * 0.3, 'confetti', 20);
            }, i * 200);
        }
    }
}

// ===== EXPORTS GLOBAUX =====
window.startGame = startGame;
window.continueSavedGame = continueSavedGame;
window.closeTutorial = closeTutorial;
window.nextLevelAction = nextLevelAction;
window.togglePause = togglePause;
window.resumeGame = resumeGame;
window.restartLevel = restartLevel;
window.quitToMenu = quitToMenu;
window.toggleSound = toggleSound;
window.toggleTimer = toggleTimer;
window.submitHallOfFame = submitHallOfFame;
window.returnToMenu = returnToMenu;
