// ============================================================
// L'AVENTURE DE LÉO - CONFIGURATION
// ============================================================

const CONFIG = {
    TIME_STEP: 1000 / 60,
    GRAVITY: 0.8,
    FRICTION: 0.85,
    MAX_FALL_SPEED: 15,
    TOTAL_LEVELS: 9,
    MAX_LIVES: 10,

    // Critères pour les étoiles
    STARS: {
        TIME_GOLD: [60, 80, 100, 90, 110, 120, 150, 140, 200], // Temps en secondes pour 3 étoiles par niveau
        TIME_SILVER: [90, 120, 150, 130, 160, 180, 210, 200, 300], // Temps pour 2 étoiles
        MIN_COINS_PERCENT: 0.7 // Collecter 70% des pièces pour étoile bonus
    },

    // Power-ups durées (en frames)
    POWERUP_DURATION: {
        SHIELD: 300,      // 5 secondes
        SUPER_JUMP: 450,  // 7.5 secondes
        MAGNET: 360,      // 6 secondes
        STAR: 420         // 7 secondes (invincibilité)
    }
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
    screenShake: 0,

    // Nouvelles fonctionnalités pour améliorer le jeu de Léo
    levelStars: {},          // Étoiles gagnées par niveau {1: 3, 2: 2, ...}
    totalStars: 0,           // Total d'étoiles collectées
    maxCoinsInLevel: 0,      // Nombre max de pièces dans le niveau actuel
    badges: {},              // Badges débloqués
    coinsForNextLife: 0,     // Compteur de pièces pour vie bonus

    // Sous-niveaux (pour portail Nether niveau 5!)
    inSubLevel: false,       // True si dans un sous-niveau
    subLevelData: null,      // Données du sous-niveau actuel
    mainLevelData: null,     // Données du niveau principal (sauvegardées)
    netherKeyCollected: false, // Clé du Nether collectée
    mainPlayerPos: null,     // Position du joueur dans le monde principal

    // Power-ups actifs
    powerups: {
        shield: 0,           // Timer du bouclier
        superJump: 0,        // Timer du super saut
        magnet: 0,           // Timer de l'aimant
        star: 0              // Timer de l'étoile (invincibilité)
    },

    // Système de checkpoints (pour éviter de recommencer au début)
    lastCheckpoint: null,    // Dernière position de checkpoint {x, y}
    checkpointDistance: 400  // Distance en pixels entre checkpoints
};

// Contrôles
const keys = { 
    right: false, 
    left: false, 
    up: false, 
    down: false, 
    jump: false 
};
