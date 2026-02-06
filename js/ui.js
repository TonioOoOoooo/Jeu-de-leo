// ============================================================
// L'AVENTURE DE LÉO - INTERFACE UTILISATEUR
// ============================================================

// ===== HUD =====
function updateKeyIndicator() {
    const keyDisplay = document.getElementById('key-display');
    if (!keyDisplay) return;

    let nextText = '';
    let shouldShow = false;

    if (state.hasKey) {
        shouldShow = true;
        nextText = '🗝️ CLÉ !';
    } else if (typeof currentLevelData !== 'undefined' && currentLevelData && currentLevelData.keyItem) {
        shouldShow = true;

        const playerCx = (typeof player !== 'undefined' && player)
            ? (player.x + player.w / 2)
            : 0;
        const keyCx = currentLevelData.keyItem.x + currentLevelData.keyItem.w / 2;
        const dx = keyCx - playerCx;
        const dead = 10;
        const arrow = dx < -dead ? '←' : dx > dead ? '→' : '•';
        nextText = arrow === '•' ? '🗝️ PROCHE' : `🗝️ ${arrow}`;
    }

    if (keyDisplay.dataset.lastText === nextText && ((keyDisplay.style.display !== 'none') === shouldShow)) return;
    keyDisplay.dataset.lastText = nextText;

    keyDisplay.style.display = shouldShow ? 'inline' : 'none';
    if (shouldShow) keyDisplay.textContent = nextText;
}

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

    updateKeyIndicator();

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
    const el = document.getElementById('coins-display');
    if (!el) return;

    const total = Number.isFinite(state.maxCoinsInLevel) ? state.maxCoinsInLevel : 0;
    if (total > 0) {
        const done = state.coins >= total;
        el.textContent = done ? `🪙 ${state.coins}/${total} ✅` : `🪙 ${state.coins}/${total}`;
    } else {
        el.textContent = `🪙 ${state.coins}`;
    }
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
    state.invincibilityTimer = 0; // Reset pour éviter le bug du héros invisible
    state.screenShake = 0;
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

    if (state.current === GameState.GAME_OVER) {
        showHallOfFame();
        return;
    }

    if (state.level >= CONFIG.TOTAL_LEVELS) {
        showGameSummary();
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

    document.body.classList.remove('is-playing');
    document.body.classList.remove('is-paused');
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

        document.body.classList.add('is-paused');
    } else if (state.current === GameState.PAUSED) {
        resumeGame();
    }
}

function resumeGame() {
    // Reset les touches pour éviter les mouvements bloqués
    if (typeof resetKeys === 'function') resetKeys();

    state.current = GameState.PLAYING;
    document.getElementById('pause-screen').style.display = 'none';

    document.body.classList.remove('is-paused');
    state.lastTime = 0;
}

function restartLevel() {
    // Reset les touches pour éviter les mouvements bloqués
    if (typeof resetKeys === 'function') resetKeys();

    document.getElementById('pause-screen').style.display = 'none';
    document.getElementById('message-box').style.display = 'none';
    document.body.classList.remove('is-paused');

    // Réinitialiser les vies selon la difficulté
    const maxLives = state.difficulty <= 0.5 ? 10 : state.difficulty <= 0.7 ? 7 : state.difficulty <= 1.2 ? 4 : 2;
    state.lives = maxLives;
    state.coins = 0;
    state.invincibilityTimer = 0; // Reset pour éviter le bug du héros invisible
    state.screenShake = 0;
    updateHud();
    initLevel(state.level);
    state.current = GameState.PLAYING;
    state.lastTime = 0;
}

function quitToMenu() {
    // Reset les touches pour éviter les mouvements bloqués
    if (typeof resetKeys === 'function') resetKeys();

    document.getElementById('pause-screen').style.display = 'none';
    state.current = GameState.MENU;
    state.level = 1; // Retour au niveau 1
    document.getElementById('start-screen').style.display = 'flex';

    document.body.classList.remove('is-playing');
    document.body.classList.remove('is-paused');
    if (state.animationId) cancelAnimationFrame(state.animationId);
}

// ===== SETTINGS PANEL =====
function openSettings() {
    document.getElementById('settings-panel').classList.add('open');
    document.getElementById('settings-overlay').classList.add('open');
}

function closeSettings() {
    document.getElementById('settings-panel').classList.remove('open');
    document.getElementById('settings-overlay').classList.remove('open');
}

// ===== OPTIONS =====
function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    AudioSystem.enabled = state.soundEnabled;
    const toggle = document.getElementById('sound-toggle');
    if (toggle) {
        toggle.classList.toggle('active', state.soundEnabled);
    }
}

function toggleTimer() {
    state.timerEnabled = !state.timerEnabled;
    document.getElementById('timer-toggle').classList.toggle('active', state.timerEnabled);
    document.getElementById('timer-display').style.display = state.timerEnabled ? 'block' : 'none';
}

function toggleFullscreen() {
    const toggle = document.getElementById('fullscreen-toggle');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            if (toggle) toggle.classList.add('active');
        }).catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            if (toggle) toggle.classList.remove('active');
        });
    }
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
    if (state.level === 11 && !state.badges['boss_defeated']) {
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

// ===== ÉCRAN RÉCAPITULATIF DE FIN DE JEU =====
function showGameSummary() {
    const screen = document.getElementById('game-summary');
    if (!screen) { showHallOfFame(); return; }

    screen.style.display = 'flex';
    screen.style.opacity = '1';

    // Reset toutes les sections
    const sections = ['summary-coins-section', 'summary-stars-section',
                      'summary-badges-section', 'summary-stats-section', 'summary-btn-section'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.opacity = '0';
    });

    let delay = 300;

    // --- 1. ANIMATION DES PIÈCES (compteur qui monte avec son) ---
    setTimeout(() => {
        const coinsSection = document.getElementById('summary-coins-section');
        if (coinsSection) coinsSection.style.opacity = '1';

        const counterEl = document.getElementById('summary-coins-counter');
        const targetCoins = state.totalCoins;
        let currentCoins = 0;
        const steps = Math.min(targetCoins, 40);
        const increment = Math.max(1, Math.floor(targetCoins / steps));
        let stepIndex = 0;

        const coinInterval = setInterval(() => {
            currentCoins = Math.min(currentCoins + increment, targetCoins);
            if (counterEl) counterEl.textContent = currentCoins;

            // Son de pièce qui monte en fréquence
            if (AudioSystem && AudioSystem.ctx && AudioSystem.enabled) {
                try {
                    const osc = AudioSystem.ctx.createOscillator();
                    const gain = AudioSystem.ctx.createGain();
                    osc.connect(gain);
                    gain.connect(AudioSystem.ctx.destination);
                    const now = AudioSystem.ctx.currentTime;
                    const freq = 600 + (stepIndex / steps) * 800;
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now);
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                    osc.start(now);
                    osc.stop(now + 0.08);
                } catch(e) {}
            }
            stepIndex++;

            if (currentCoins >= targetCoins) {
                clearInterval(coinInterval);
                if (counterEl) counterEl.textContent = targetCoins;
                // Son final
                AudioSystem.play('powerup');
            }
        }, 50);
    }, delay);
    delay += 2200;

    // --- 2. ÉTOILES PAR NIVEAU ---
    setTimeout(() => {
        const starsSection = document.getElementById('summary-stars-section');
        if (starsSection) starsSection.style.opacity = '1';

        const grid = document.getElementById('summary-stars-grid');
        if (grid) {
            grid.innerHTML = '';
            for (let lvl = 1; lvl <= CONFIG.TOTAL_LEVELS; lvl++) {
                const stars = state.levelStars[lvl] || 0;
                const div = document.createElement('div');
                div.style.cssText = 'background: rgba(255,255,255,0.1); border-radius: 10px; padding: 6px 10px; min-width: 60px;';
                div.innerHTML = `<div style="font-size: 12px; color: rgba(255,255,255,0.6);">Niv ${lvl}</div>` +
                    `<div style="font-size: 18px;">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>`;
                grid.appendChild(div);

                // Apparition progressive
                div.style.opacity = '0';
                div.style.transform = 'scale(0.5)';
                div.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    div.style.opacity = '1';
                    div.style.transform = 'scale(1)';
                }, lvl * 150);
            }
        }
        const totalEl = document.getElementById('summary-stars-total');
        if (totalEl) {
            totalEl.textContent = `Total : ${state.totalStars} / ${CONFIG.TOTAL_LEVELS * 3} ⭐`;
        }

        AudioSystem.play('cheer');
    }, delay);
    delay += CONFIG.TOTAL_LEVELS * 150 + 800;

    // --- 3. BADGES ---
    setTimeout(() => {
        const badgesSection = document.getElementById('summary-badges-section');
        if (badgesSection) badgesSection.style.opacity = '1';

        const badgesList = document.getElementById('summary-badges-list');
        if (badgesList) {
            badgesList.innerHTML = '';
            const allBadges = [
                { id: 'first_level', icon: '🎮', title: 'Premier pas' },
                { id: 'perfect_level', icon: '⭐', title: 'Perfection' },
                { id: 'coin_collector', icon: '🪙', title: 'Collectionneur' },
                { id: 'coin_master', icon: '💰', title: 'Riche !' },
                { id: 'halfway', icon: '🏃', title: 'À mi-chemin' },
                { id: 'boss_defeated', icon: '⚔️', title: 'Vainqueur' },
                { id: 'all_stars', icon: '🌟', title: 'Maître du jeu' },
                { id: 'no_death', icon: '🛡️', title: 'Invincible' },
                { id: 'speed_runner', icon: '⚡', title: 'Éclair' },
                { id: 'streak_3', icon: '🔥', title: 'En feu !' },
                { id: 'persistent', icon: '💪', title: 'Persévérant' },
                { id: 'explorer', icon: '🗺️', title: 'Explorateur' }
            ];
            let badgeCount = 0;
            allBadges.forEach((badge, i) => {
                const unlocked = state.badges[badge.id];
                if (unlocked) badgeCount++;
                const div = document.createElement('div');
                div.style.cssText = `background: ${unlocked ? 'rgba(241,196,15,0.2)' : 'rgba(255,255,255,0.05)'}; border: 2px solid ${unlocked ? '#f1c40f' : 'rgba(255,255,255,0.1)'}; border-radius: 10px; padding: 6px 10px; min-width: 50px; opacity: ${unlocked ? 1 : 0.3};`;
                div.innerHTML = `<div style="font-size: 22px;">${badge.icon}</div><div style="font-size: 10px; color: ${unlocked ? 'white' : 'rgba(255,255,255,0.4)'};">${badge.title}</div>`;
                badgesList.appendChild(div);
            });

            // Ajouter compteur
            const countDiv = document.createElement('p');
            countDiv.style.cssText = 'width: 100%; text-align: center; color: #f1c40f; font-size: 16px; margin-top: 5px;';
            countDiv.textContent = `${badgeCount} / ${allBadges.length} débloqués`;
            badgesList.appendChild(countDiv);
        }
    }, delay);
    delay += 800;

    // --- 4. STATISTIQUES ---
    setTimeout(() => {
        const statsSection = document.getElementById('summary-stats-section');
        if (statsSection) statsSection.style.opacity = '1';

        const statsList = document.getElementById('summary-stats-list');
        if (statsList) {
            statsList.innerHTML = '';
            const statsData = [
                { icon: '💀', label: 'Morts', value: state.stats.totalDeaths },
                { icon: '🦘', label: 'Sauts', value: state.stats.totalJumps },
                { icon: '🔥', label: 'Meilleure série', value: state.stats.bestStreak + ' niveaux' },
                { icon: '⭐', label: 'Niveaux parfaits', value: state.stats.perfectLevels }
            ];
            statsData.forEach(s => {
                const div = document.createElement('div');
                div.style.cssText = 'background: rgba(255,255,255,0.1); border-radius: 10px; padding: 8px 14px;';
                div.innerHTML = `<span style="font-size: 20px;">${s.icon}</span> <span>${s.label} : <strong>${s.value}</strong></span>`;
                statsList.appendChild(div);
            });
        }
    }, delay);
    delay += 600;

    // --- 5. BOUTON CONTINUER ---
    setTimeout(() => {
        const btnSection = document.getElementById('summary-btn-section');
        if (btnSection) btnSection.style.opacity = '1';
        AudioSystem.play('victory');
    }, delay);
}

function closeSummaryAndShowHallOfFame() {
    const screen = document.getElementById('game-summary');
    if (screen) screen.style.display = 'none';
    showHallOfFame();
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
window.toggleFullscreen = toggleFullscreen;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.submitHallOfFame = submitHallOfFame;
window.returnToMenu = returnToMenu;
window.closeSummaryAndShowHallOfFame = closeSummaryAndShowHallOfFame;
