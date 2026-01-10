// ============================================================
// L'AVENTURE DE LÉO - CONFIGURATION
// ============================================================

const CONFIG = {
    TIME_STEP: 1000 / 60,
    GRAVITY: 0.8,
    FRICTION: 0.85,
    MAX_FALL_SPEED: 15,
    TOTAL_LEVELS: 9,
    MAX_LIVES: 10
};

// État global du jeu
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    TRANSITIONING: 'transitioning',
    GAME_OVER: 'game_over',
    VICTORY: 'victory'
};

// État courant
const state = {
    current: GameState.MENU,
    level: 1,
    lives: 3,
    coins: 0,
    totalCoins: 0,
    hasKey: false,
    difficulty: 1,
    soundEnabled: true,
    timerEnabled: false,
    levelTime: 0,
    invincibilityTimer: 0,
    teleportTimer: 0,
    frameTick: 0,
    lastTime: 0,
    accumulator: 0,
    animationId: null,
    tutorialShown: false,
    screenShake: 0
};

// Contrôles
const keys = { 
    right: false, 
    left: false, 
    up: false, 
    down: false, 
    jump: false 
};
