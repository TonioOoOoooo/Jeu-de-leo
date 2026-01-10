// ============================================================
// L'AVENTURE DE LÉO - INTERFACE UTILISATEUR
// ============================================================

// ===== HUD =====
function updateHud() {
    let hearts = "";
    for (let i = 0; i < state.lives; i++) hearts += "❤️";
    for (let i = state.lives; i < 3; i++) hearts += "🖤";
    document.getElementById('hearts').textContent = hearts;
}

function updateCoinsDisplay() {
    document.getElementById('coins-display').textContent = `🪙 ${state.coins}`;
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
    saveGame();
    
    const isFinalLevel = state.level >= CONFIG.TOTAL_LEVELS;
    
    document.getElementById('msg-title').textContent = 
        isFinalLevel ? "🏆 VICTOIRE TOTALE !" : `NIVEAU ${state.level} RÉUSSI !`;
    document.getElementById('msg-title').style.color = isFinalLevel ? "gold" : "#27ae60";
    
    document.getElementById('msg-text').textContent = 
        isFinalLevel ? "Tu as vaincu le boss et terminé le jeu !" : "Prêt pour la suite ?";
    
    document.getElementById('msg-coins').textContent = 
        `Pièces : ${state.coins} | Total : ${state.totalCoins}`;
    
    document.getElementById('msg-btn').textContent = 
        isFinalLevel ? "🎉 Rejouer" : "Continuer ▶";
    
    document.getElementById('msg-hint').textContent = "(ESPACE pour continuer)";
    document.getElementById('message-box').style.display = "block";
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
        // Retour au menu
        state.level = 1;
        state.current = GameState.MENU;
        document.getElementById('start-screen').style.display = 'flex';
        if (state.animationId) cancelAnimationFrame(state.animationId);
        return;
    }
    
    // Transition vers niveau suivant
    showTransition(state.level + 1, () => {
        state.level++;
        initLevel(state.level);
        updateProgressBar();
        state.current = GameState.PLAYING;
        state.lastTime = 0;
        state.accumulator = 0;
    });
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
    document.getElementById('sound-toggle').classList.toggle('active', state.soundEnabled);
}

function toggleTimer() {
    state.timerEnabled = !state.timerEnabled;
    document.getElementById('timer-toggle').classList.toggle('active', state.timerEnabled);
    document.getElementById('timer-display').style.display = state.timerEnabled ? 'block' : 'none';
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
