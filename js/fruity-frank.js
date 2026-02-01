// ============================================================
// FRUITY FRANK ENGINE - Style Amstrad CPC authentique
// Inspiré du jeu original Fruity Frank
// ============================================================

// ===== CONFIGURATION DE LA GRILLE =====
const FRANK_CONFIG = {
    GRID_WIDTH: 20,      // Largeur de la grille en tiles
    GRID_HEIGHT: 15,     // Hauteur de la grille en tiles
    TILE_SIZE: 40,       // Taille d'une tile en pixels

    // Vitesses de mouvement (pixels par frame)
    FRANK_SPEED: 4,      // Vitesse ajustée pour le grid
    ENEMY_SPEED: 2,

    // Timers
    APPLE_SHAKE_DURATION: 45,    // Plus long pour laisser le temps de passer (Gameplay Amstrad)
    MONSTER_SPAWN_INTERVAL: 240, // Spawn un peu plus rapide

    // Couleurs Amstrad CPC authentiques (Base) + Palette Moderne (Remaster)
    COLORS: {
        BG: '#1a0505',
        WALL_MAIN: '#c0392b',
        WALL_SHADOW: '#922b21',
        DIRT_MAIN: '#27ae60',
        DIRT_HIGHLIGHT: '#2ecc71',
        PLAYER_MAIN: '#f1c40f',
        PLAYER_SHADOW: '#d4ac0d',
        ENEMY_MAIN: '#8e44ad',
        ENEMY_GLOW: '#9b59b6',
        APPLE_MAIN: '#e74c3c',
        APPLE_SHINE: '#ff7675',
        BLACK: '#000000',
        BRICK_RED: '#c0392b',
        BRICK_DARK: '#922b21',
        BRICK_MORTAR: '#4a0d0d',
        DIRT_GREEN: '#27ae60',
        DIRT_DARK: '#145a32',
        DIRT_LEAF: '#2ecc71',
        YELLOW: '#f1c40f',
        YELLOW_DARK: '#d4ac0d',
        PURPLE: '#8e44ad',
        PURPLE_DARK: '#6c3483',
        CHERRY_RED: '#e74c3c',
        CHERRY_DARK: '#c0392b',
        BANANA_YELLOW: '#f9e79f',
        BANANA_DARK: '#f7dc6f',
        STRAWBERRY_RED: '#ff3366',
        STRAWBERRY_DARK: '#cc0033',
        ORANGE: '#ff8800',
        ORANGE_DARK: '#cc6600',
        WHITE: '#ffffff',
        STEM_GREEN: '#2ecc71',
        STEM_BROWN: '#6d4c41'
    }
};

// ===== TYPES DE TILES =====
const TILE = {
    EMPTY: 0,           // Vide (noir) - tunnel creusé
    DIRT: 1,            // Terre/feuillage vert
    WALL: 2,            // Mur de briques rouges
    APPLE: 3,           // Pomme (écrase les ennemis)
    CHERRY: 4,          // Cerise à collecter
    STRAWBERRY: 5,      // Fraise à collecter
    BANANA: 6,          // Banane à collecter
    NEST: 7,            // Nid des monstres
    ORANGE: 8           // Orange à collecter
};

// ===== ÉTAT DU JEU FRUITY FRANK =====
const frankState = {
    grid: [],

    // Frank (le joueur) - personnage jaune rond
    frank: {
        gridX: 1,
        gridY: 1,
        pixelX: 0,
        pixelY: 0,
        targetX: 1,
        targetY: 1,
        moving: false,
        direction: 'right',
        facingRight: true,
        animFrame: 0,
        dead: false,
        mouthOpen: true,
        nextDirection: null
    },

    // Pommes avec physique
    apples: [],

    // Monstres violets
    monsters: [],

    // Pépin (projectile) - UN SEUL à la fois comme dans le jeu original
    seed: null,
    seedCooldown: 0,

    // Score et progression
    score: 0,
    fruitsCollected: 0,
    fruitsTotal: 0,

    // Nid
    nest: { gridX: 10, gridY: 7 },
    spawnTimer: 0,

    // Particules maison (remaster)
    particles: [],

    // Animation
    frameTick: 0,

    // Niveau actif
    initialized: false
};

// ===== NIVEAU PRÉDÉFINI (Design style Amstrad CPC) =====
// Légende: W=Mur, D=Terre, .=Vide, A=Pomme, C=Cerise, S=Fraise, B=Banane, O=Orange, N=Nid, F=Frank spawn
// IMPORTANT: Les pommes (A) doivent TOUJOURS être au-dessus de la terre (D) pour ne pas tomber au départ!
const FRUITY_FRANK_LEVEL = [
    "WWWWWWWWWWWWWWWWWWWW",
    "WC..S..B..C..B..S.CW",
    "WDDDDDDDDDDDDDDDDDDW",
    "W.A.DDD.A..A.DDD.A.W",
    "WDDDDDDDDDDDDDDDDDOW",
    "WS.DDDC....CDDDD.S.W",
    "WDDDDD......DDDDDDDW",
    "WO.DDD..N..DDD.O.DDW",
    "WDDDDD......DDDDDDDW",
    "WS.DDDC....CDDDD.S.W",
    "WDDDDDDDDDDDDDDDDDOW",
    "W.A.DDD.A..A.DDD.A.W",
    "WDDDDDDDDDDDDDDDDDDW",
    "WC..S..B.F.B..S..C.W",
    "WWWWWWWWWWWWWWWWWWWW"
];

// Position de spawn initiale (sauvegardée pour le respawn)
let spawnPoint = { x: 1, y: 1 };

// ===== INITIALISATION =====
function initFruityFrankGrid() {
    frankState.grid = [];
    frankState.apples = [];
    frankState.monsters = [];
    frankState.seed = null;
    frankState.seedCooldown = 0;
    frankState.spawnTimer = 0;
    frankState.frameTick = 0;
    frankState.particles = [];
    frankState.score = 0;
    frankState.fruitsCollected = 0;
    frankState.fruitsTotal = 0;
    frankState.initialized = true;

    let frankStartX = 1;
    let frankStartY = 1;

    // Parser le niveau
    for (let y = 0; y < FRANK_CONFIG.GRID_HEIGHT; y++) {
        frankState.grid[y] = [];
        const row = FRUITY_FRANK_LEVEL[y] || "";

        for (let x = 0; x < FRANK_CONFIG.GRID_WIDTH; x++) {
            const char = row[x] || 'W';

            switch (char) {
                case 'W':
                    frankState.grid[y][x] = TILE.WALL;
                    break;
                case 'D':
                    frankState.grid[y][x] = TILE.DIRT;
                    break;
                case '.':
                    frankState.grid[y][x] = TILE.EMPTY;
                    break;
                case 'A':
                    frankState.grid[y][x] = TILE.APPLE;
                    frankState.apples.push({
                        gridX: x,
                        gridY: y,
                        pixelY: y * FRANK_CONFIG.TILE_SIZE,
                        shaking: false,
                        shakeTimer: 0,
                        falling: false,
                        fallSpeed: 0
                    });
                    break;
                case 'C':
                    frankState.grid[y][x] = TILE.CHERRY;
                    frankState.fruitsTotal++;
                    break;
                case 'S':
                    frankState.grid[y][x] = TILE.STRAWBERRY;
                    frankState.fruitsTotal++;
                    break;
                case 'B':
                    frankState.grid[y][x] = TILE.BANANA;
                    frankState.fruitsTotal++;
                    break;
                case 'O':
                    frankState.grid[y][x] = TILE.ORANGE;
                    frankState.fruitsTotal++;
                    break;
                case 'N':
                    frankState.grid[y][x] = TILE.NEST;
                    frankState.nest = { gridX: x, gridY: y };
                    break;
                case 'F': // Point de départ de Frank
                    frankState.grid[y][x] = TILE.EMPTY;
                    frankStartX = x;
                    frankStartY = y;
                    break;
                default:
                    frankState.grid[y][x] = TILE.EMPTY;
            }
        }
    }

    spawnPoint = { x: frankStartX, y: frankStartY };
    resetPlayerAndMonsters();
}

// ===== RESPAWN SANS RESET DE LA GRILLE (Gameplay Arcade) =====
function resetPlayerAndMonsters() {
    // Initialiser Frank
    frankState.frank.gridX = spawnPoint.x;
    frankState.frank.gridY = spawnPoint.y;
    frankState.frank.targetX = spawnPoint.x;
    frankState.frank.targetY = spawnPoint.y;
    frankState.frank.pixelX = spawnPoint.x * FRANK_CONFIG.TILE_SIZE;
    frankState.frank.pixelY = spawnPoint.y * FRANK_CONFIG.TILE_SIZE;
    frankState.frank.moving = false;
    frankState.frank.dead = false;
    frankState.frank.animFrame = 0;
    frankState.frank.nextDirection = null;

    // Reset des monstres (On vide la liste et on en remet un neuf)
    frankState.monsters = [];
    frankState.spawnTimer = FRANK_CONFIG.MONSTER_SPAWN_INTERVAL - 60; // Spawn rapide du premier
    spawnMonster();
}

// ===== SPAWN MONSTRE =====
function spawnMonster() {
    if (frankState.monsters.length >= 6) return; // Max 6 monstres

    const nest = frankState.nest;
    frankState.monsters.push({
        gridX: nest.gridX,
        gridY: nest.gridY,
        pixelX: nest.gridX * FRANK_CONFIG.TILE_SIZE,
        pixelY: nest.gridY * FRANK_CONFIG.TILE_SIZE,
        // Le monstre sort du nid dans une direction valide
        direction: 'up',
        animFrame: 0,
        active: true, // Force l'activation
        canDig: Math.random() > 0.7 // Moins de monstres creuseurs pour équilibrer
    });
}

// ===== UPDATE PRINCIPAL =====
function updateFruityFrank() {
    if (!frankState.initialized) {
        initFruityFrankGrid();
        return false;
    }

    if (frankState.frank.dead) return false;

    frankState.frameTick++;

    // Animation de la bouche
    if (frankState.frameTick % 8 === 0) {
        frankState.frank.mouthOpen = !frankState.frank.mouthOpen;
    }

    // Cooldown du pépin
    if (frankState.seedCooldown > 0) {
        frankState.seedCooldown--;
    }

    // Mouvement de Frank
    updateFrankMovement();

    // Physique des pommes
    updateApples();

    // Update du pépin (projectile)
    updateSeed();

    // Update des monstres
    updateMonsters();

    // Particules maison
    updateFruityParticles();

    // Spawn de monstres
    frankState.spawnTimer++;
    if (frankState.spawnTimer >= FRANK_CONFIG.MONSTER_SPAWN_INTERVAL) {
        frankState.spawnTimer = 0;
        spawnMonster();
    }

    // Vérifier victoire
    if (frankState.fruitsCollected >= frankState.fruitsTotal && frankState.fruitsTotal > 0) {
        return true; // Niveau gagné!
    }

    return false;
}

// ===== MOUVEMENT DE FRANK =====
function updateFrankMovement() {
    const frank = frankState.frank;
    const tileSize = FRANK_CONFIG.TILE_SIZE;

    if (!frank.moving) {
        // Synchroniser position
        frank.pixelX = frank.gridX * tileSize;
        frank.pixelY = frank.gridY * tileSize;

        let nextX = frank.gridX;
        let nextY = frank.gridY;

        // Lecture des touches (avec possibilité de pousser les pommes)
        if (keys.up && canFrankMoveOrPush(frank.gridX, frank.gridY - 1, 0, -1)) {
            nextY--;
            frank.direction = 'up';
        } else if (keys.down && canFrankMoveOrPush(frank.gridX, frank.gridY + 1, 0, 1)) {
            nextY++;
            frank.direction = 'down';
        } else if (keys.left && canFrankMoveOrPush(frank.gridX - 1, frank.gridY, -1, 0)) {
            nextX--;
            frank.direction = 'left';
            frank.facingRight = false;
        } else if (keys.right && canFrankMoveOrPush(frank.gridX + 1, frank.gridY, 1, 0)) {
            nextX++;
            frank.direction = 'right';
            frank.facingRight = true;
        }

        if (nextX !== frank.gridX || nextY !== frank.gridY) {
            frank.targetX = nextX;
            frank.targetY = nextY;
            frank.moving = true;
        }
    }

    if (frank.moving) {
        const dx = (frank.targetX * tileSize) - frank.pixelX;
        const dy = (frank.targetY * tileSize) - frank.pixelY;
        const speed = FRANK_CONFIG.FRANK_SPEED;

        if (dx !== 0) {
            frank.pixelX += Math.sign(dx) * Math.min(speed, Math.abs(dx));
        }
        if (dy !== 0) {
            frank.pixelY += Math.sign(dy) * Math.min(speed, Math.abs(dy));
        }

        frank.animFrame++;

        // Arrivé à destination?
        if (frank.pixelX === frank.targetX * tileSize &&
            frank.pixelY === frank.targetY * tileSize) {
            frank.gridX = frank.targetX;
            frank.gridY = frank.targetY;
            frank.moving = false;

            // Interagir avec la tile
            const tile = frankState.grid[frank.gridY][frank.gridX];

            if (tile === TILE.DIRT) {
                // Creuser
                frankState.grid[frank.gridY][frank.gridX] = TILE.EMPTY;
                frankState.score += 5;
                if (typeof AudioSystem !== 'undefined') AudioSystem.play('coin');
                // Particules de terre !
                createFruityParticles(frank.pixelX + tileSize / 2, frank.pixelY + tileSize / 2, 'dirt');
            } else if ([TILE.CHERRY, TILE.STRAWBERRY, TILE.BANANA, TILE.ORANGE].includes(tile)) {
                // Collecter fruit
                frankState.grid[frank.gridY][frank.gridX] = TILE.EMPTY;
                frankState.fruitsCollected++;
                frankState.score += 100;
                if (typeof AudioSystem !== 'undefined') AudioSystem.play('powerup');
                createFruityParticles(frank.pixelX + tileSize / 2, frank.pixelY + tileSize / 2, 'sparkle');
            }
        }
    }
}

// ===== FRANK PEUT-IL SE DÉPLACER? =====
function canFrankMove(gridX, gridY) {
    if (gridX < 0 || gridX >= FRANK_CONFIG.GRID_WIDTH ||
        gridY < 0 || gridY >= FRANK_CONFIG.GRID_HEIGHT) {
        return false;
    }

    const tile = frankState.grid[gridY][gridX];

    // Frank peut traverser: EMPTY, DIRT, CHERRY, STRAWBERRY, BANANA, ORANGE
    // Frank NE PEUT PAS traverser: WALL, APPLE, NEST
    return tile !== TILE.WALL && tile !== TILE.APPLE && tile !== TILE.NEST;
}

// ===== FRANK PEUT SE DÉPLACER OU POUSSER UNE POMME? =====
function canFrankMoveOrPush(gridX, gridY, dirX, dirY) {
    // D'abord vérifier si le mouvement simple est possible
    if (canFrankMove(gridX, gridY)) {
        return true;
    }

    // Si c'est une pomme, vérifier si on peut la pousser
    if (gridX >= 0 && gridX < FRANK_CONFIG.GRID_WIDTH &&
        gridY >= 0 && gridY < FRANK_CONFIG.GRID_HEIGHT) {

        const tile = frankState.grid[gridY][gridX];

        if (tile === TILE.APPLE) {
            // Position derrière la pomme
            const behindX = gridX + dirX;
            const behindY = gridY + dirY;

            // Vérifier si l'espace derrière est libre (vide seulement, pas terre)
            if (behindX >= 0 && behindX < FRANK_CONFIG.GRID_WIDTH &&
                behindY >= 0 && behindY < FRANK_CONFIG.GRID_HEIGHT) {

                const tileBehind = frankState.grid[behindY][behindX];

                // On peut pousser si l'espace derrière est vide
                if (tileBehind === TILE.EMPTY) {
                    // Pousser la pomme!
                    pushApple(gridX, gridY, behindX, behindY);
                    return true;
                }
            }
        }
    }

    return false;
}

// ===== POUSSER UNE POMME =====
function pushApple(fromX, fromY, toX, toY) {
    // Trouver la pomme dans la liste
    const apple = frankState.apples.find(a => a.gridX === fromX && a.gridY === fromY && !a.falling);

    if (apple) {
        // Déplacer la pomme
        frankState.grid[fromY][fromX] = TILE.EMPTY;
        apple.gridX = toX;
        apple.gridY = toY;
        apple.pixelY = toY * FRANK_CONFIG.TILE_SIZE;
        frankState.grid[toY][toX] = TILE.APPLE;

        if (typeof AudioSystem !== 'undefined') AudioSystem.play('jump');

        // Vérifier si la pomme doit tomber après avoir été poussée
        const belowY = toY + 1;
        if (belowY < FRANK_CONFIG.GRID_HEIGHT) {
            const tileBelow = frankState.grid[belowY][toX];
            if (tileBelow === TILE.EMPTY) {
                // La pomme va tomber!
                apple.shaking = true;
                apple.shakeTimer = 15; // Tremblement court avant chute
            }
        }
    }
}

// ===== PHYSIQUE DES POMMES =====
function updateApples() {
    const tileSize = FRANK_CONFIG.TILE_SIZE;

    for (let i = frankState.apples.length - 1; i >= 0; i--) {
        const apple = frankState.apples[i];

        if (apple.falling) {
            // Accélérer la chute
            apple.fallSpeed = Math.min(apple.fallSpeed + 0.5, 8);
            apple.pixelY += apple.fallSpeed;

            const nextGridY = Math.floor((apple.pixelY + tileSize) / tileSize);

            // Vérifier collision avec sol/obstacle
            if (nextGridY >= FRANK_CONFIG.GRID_HEIGHT - 1 ||
                frankState.grid[nextGridY][apple.gridX] === TILE.WALL ||
                frankState.grid[nextGridY][apple.gridX] === TILE.DIRT ||
                frankState.grid[nextGridY][apple.gridX] === TILE.APPLE) {

                // Arrêter la chute
                apple.falling = false;
                apple.fallSpeed = 0;
                apple.gridY = nextGridY - 1;
                apple.pixelY = apple.gridY * tileSize;
                frankState.grid[apple.gridY][apple.gridX] = TILE.APPLE;
                if (typeof AudioSystem !== 'undefined') AudioSystem.play('jump');
                // Effet de rebond/poussière à l'atterrissage
                if (typeof ParticleSystem !== 'undefined' && typeof canvas !== 'undefined') {
                    const offsetX = (canvas.width - FRANK_CONFIG.GRID_WIDTH * FRANK_CONFIG.TILE_SIZE) / 2;
                    const offsetY = (canvas.height - FRANK_CONFIG.GRID_HEIGHT * FRANK_CONFIG.TILE_SIZE) / 2 + 50;
                    ParticleSystem.emit(
                        offsetX + apple.gridX * tileSize + tileSize / 2,
                        offsetY + apple.pixelY + tileSize,
                        'dust', 8
                    );
                }
            } else {
                // Mettre à jour position grille
                const oldGridY = apple.gridY;
                apple.gridY = Math.floor(apple.pixelY / tileSize);

                if (oldGridY !== apple.gridY) {
                    frankState.grid[oldGridY][apple.gridX] = TILE.EMPTY;
                }

                // Vérifier écrasement de monstre
                for (let j = frankState.monsters.length - 1; j >= 0; j--) {
                    const monster = frankState.monsters[j];
                    if (Math.floor(monster.gridX) === apple.gridX &&
                        Math.floor(monster.gridY) === apple.gridY) {
                        // Écraser le monstre!
                        frankState.monsters.splice(j, 1);
                        frankState.score += 200;
                        if (typeof AudioSystem !== 'undefined') AudioSystem.play('boss_hit');
                        if (typeof ParticleSystem !== 'undefined' && typeof canvas !== 'undefined') {
                            const offsetX = (canvas.width - FRANK_CONFIG.GRID_WIDTH * FRANK_CONFIG.TILE_SIZE) / 2;
                            const offsetY = (canvas.height - FRANK_CONFIG.GRID_HEIGHT * FRANK_CONFIG.TILE_SIZE) / 2 + 50;
                            ParticleSystem.emit(
                                offsetX + monster.pixelX + tileSize / 2,
                                offsetY + monster.pixelY + tileSize / 2,
                                'damage', 20
                            );
                        }
                    }
                }

                // Vérifier écrasement de Frank
                if (frankState.frank.gridX === apple.gridX &&
                    frankState.frank.gridY === apple.gridY) {
                    frankDeath();
                }
            }
        } else {
            // Vérifier si la pomme doit tomber
            const belowY = apple.gridY + 1;
            if (belowY < FRANK_CONFIG.GRID_HEIGHT) {
                const tileBelow = frankState.grid[belowY][apple.gridX];

                if (tileBelow === TILE.EMPTY) {
                    // Le sol a été creusé!
                    if (!apple.shaking) {
                        apple.shaking = true;
                        apple.shakeTimer = FRANK_CONFIG.APPLE_SHAKE_DURATION;
                    }
                }
            }

            if (apple.shaking) {
                apple.shakeTimer--;
                if (apple.shakeTimer <= 0 && !checkCollisionWithFrank(apple.gridX, apple.gridY)) {
                    // Commencer la chute
                    // NE TOMBE PAS SI FRANK EST DESSOUS (Protection "Casque")
                    // Sauf si la pomme tombe déjà d'en haut
                    apple.shaking = false;
                    apple.falling = true;
                    apple.fallSpeed = 2; // Chute plus franche
                    frankState.grid[apple.gridY][apple.gridX] = TILE.EMPTY;
                }
            }
        }
    }
}

function checkCollisionWithFrank(gx, gy) {
    // Vérifie si Frank est exactement sur cette case (pour bloquer la chute initiale)
    // Dans Fruity Frank, on peut "porter" la pomme si on est juste dessous
    return (Math.round(frankState.frank.gridX) === gx && Math.round(frankState.frank.gridY) === gy + 1);
}

// ===== SYSTÈME DE PÉPIN (PROJECTILE) =====
function shootSeed() {
    // Ne peut pas tirer si un pépin est déjà actif ou en cooldown
    if (frankState.seed !== null || frankState.seedCooldown > 0) {
        return;
    }

    const frank = frankState.frank;
    const tileSize = FRANK_CONFIG.TILE_SIZE;

    // Créer le pépin dans la direction où Frank regarde
    let vx = 0, vy = 0;
    const speed = 6;

    switch (frank.direction) {
        case 'up': vy = -speed; break;
        case 'down': vy = speed; break;
        case 'left': vx = -speed; break;
        case 'right': vx = speed; break;
    }

    frankState.seed = {
        x: frank.pixelX + tileSize / 2,
        y: frank.pixelY + tileSize / 2,
        vx: vx,
        vy: vy
    };

    if (typeof AudioSystem !== 'undefined') AudioSystem.play('jump');
}

function updateSeed() {
    if (!frankState.seed) return;

    const seed = frankState.seed;
    const tileSize = FRANK_CONFIG.TILE_SIZE;

    // Déplacer le pépin
    seed.x += seed.vx;
    seed.y += seed.vy;

    // Position dans la grille
    const gridX = Math.floor(seed.x / tileSize);
    const gridY = Math.floor(seed.y / tileSize);

    // Vérifier les limites
    if (gridX < 0 || gridX >= FRANK_CONFIG.GRID_WIDTH ||
        gridY < 0 || gridY >= FRANK_CONFIG.GRID_HEIGHT) {
        // Pépin sorti de l'écran
        frankState.seed = null;
        frankState.seedCooldown = 60; // 1 seconde de cooldown
        return;
    }

    // Vérifier collision avec mur ou terre
    const tile = frankState.grid[gridY][gridX];
    if (tile === TILE.WALL || tile === TILE.DIRT) {
        // Pépin touche un obstacle
        frankState.seed = null;
        frankState.seedCooldown = 60;
        return;
    }

    // Vérifier collision avec le nid (pépin perdu)
    if (tile === TILE.NEST) {
        frankState.seed = null;
        frankState.seedCooldown = 90; // Plus long cooldown si perdu dans le nid
        return;
    }

    // Vérifier collision avec monstres
    for (let i = frankState.monsters.length - 1; i >= 0; i--) {
        const monster = frankState.monsters[i];
        const mx = monster.pixelX + tileSize / 2;
        const my = monster.pixelY + tileSize / 2;

        const dist = Math.sqrt((seed.x - mx) ** 2 + (seed.y - my) ** 2);

        if (dist < tileSize * 0.6) {
            // Touché! Tuer le monstre
            frankState.monsters.splice(i, 1);
            frankState.score += 100; // Points pour tir

            if (typeof AudioSystem !== 'undefined') AudioSystem.play('boss_hit');
            if (typeof ParticleSystem !== 'undefined' && typeof canvas !== 'undefined') {
                const offsetX = (canvas.width - FRANK_CONFIG.GRID_WIDTH * FRANK_CONFIG.TILE_SIZE) / 2;
                const offsetY = (canvas.height - FRANK_CONFIG.GRID_HEIGHT * FRANK_CONFIG.TILE_SIZE) / 2 + 50;
                ParticleSystem.emit(
                    offsetX + monster.pixelX + tileSize / 2,
                    offsetY + monster.pixelY + tileSize / 2,
                    'damage', 20
                );
            }

            // Pépin disparaît après avoir touché
            frankState.seed = null;
            frankState.seedCooldown = 60;
            return;
        }
    }
}

// ===== MONSTRES =====
function updateMonsters() {
    const tileSize = FRANK_CONFIG.TILE_SIZE;
    const frank = frankState.frank;

    for (let i = frankState.monsters.length - 1; i >= 0; i--) {
        const monster = frankState.monsters[i];

        // Collision avec Frank
        const distX = Math.abs(monster.pixelX - frank.pixelX);
        const distY = Math.abs(monster.pixelY - frank.pixelY);

        if (distX < tileSize * 0.7 && distY < tileSize * 0.7) {
            frankDeath();
            return;
        }

        monster.animFrame++;

        // IA SIMPLE ET EFFICACE (Pas de "Frozen")
        const isAligned = (monster.pixelX % tileSize === 0) && (monster.pixelY % tileSize === 0);
        
        if (isAligned) {
            monster.gridX = monster.pixelX / tileSize;
            monster.gridY = monster.pixelY / tileSize;
            
            // Logique de poursuite simplifiée
            const dx = frank.gridX - monster.gridX;
            const dy = frank.gridY - monster.gridY;
            
            // Choix de direction : Poursuite ou Aléatoire
            let desiredDir = null;
            
            // 50% chance de tracker le joueur si aligné
            if (Math.random() < 0.5) {
                if (Math.abs(dx) > Math.abs(dy)) desiredDir = dx > 0 ? 'right' : 'left';
                else desiredDir = dy > 0 ? 'down' : 'up';
            }
            
            // Essayer la direction désirée, sinon aléatoire valide
            const possibleDirs = [];
            if (canMonsterMove(monster.gridX + 1, monster.gridY, monster.canDig)) possibleDirs.push('right');
            if (canMonsterMove(monster.gridX - 1, monster.gridY, monster.canDig)) possibleDirs.push('left');
            if (canMonsterMove(monster.gridX, monster.gridY + 1, monster.canDig)) possibleDirs.push('down');
            if (canMonsterMove(monster.gridX, monster.gridY - 1, monster.canDig)) possibleDirs.push('up');
            
            if (possibleDirs.length > 0) {
                if (possibleDirs.includes(desiredDir)) monster.direction = desiredDir;
                else monster.direction = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
            } else {
                // Cul de sac : demi-tour
                if (monster.direction === 'up') monster.direction = 'down';
                else if (monster.direction === 'down') monster.direction = 'up';
                else if (monster.direction === 'left') monster.direction = 'right';
                else if (monster.direction === 'right') monster.direction = 'left';
            }
        }

        // Calculer prochaine position
        let nextX = monster.pixelX;
        let nextY = monster.pixelY;
        const speed = FRANK_CONFIG.ENEMY_SPEED;

        switch (monster.direction) {
            case 'up': nextY -= speed; break;
            case 'down': nextY += speed; break;
            case 'left': nextX -= speed; break;
            case 'right': nextX += speed; break;
        }

        const gridNextX = Math.floor((nextX + tileSize / 2) / tileSize);
        const gridNextY = Math.floor((nextY + tileSize / 2) / tileSize);

        // Vérifier si le mouvement est valide
        if (canMonsterMove(gridNextX, gridNextY, monster.canDig)) {
            monster.pixelX = nextX;
            monster.pixelY = nextY;
            monster.gridX = gridNextX;
            monster.gridY = gridNextY;

            // Si peut creuser, creuser
            if (monster.canDig && frankState.grid[gridNextY] &&
                frankState.grid[gridNextY][gridNextX] === TILE.DIRT) {
                frankState.grid[gridNextY][gridNextX] = TILE.EMPTY;
            }
        } else {
            // Bloqué: changer de direction
            const dirs = ['up', 'down', 'left', 'right'];
            monster.direction = dirs[Math.floor(Math.random() * dirs.length)];
        }
    }
}

function createFruityParticles(x, y, type) {
    for (let i = 0; i < 8; i++) {
        frankState.particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 4, // Moins violent
            vy: (Math.random() - 0.5) * 4,
            life: 1.0,
            color: type === 'dirt' ? '#27ae60' : (type === 'explosion' ? '#e74c3c' : '#f1c40f'),
            size: Math.random() * 3 + 1 // Plus petit pour ne pas confondre avec des items
        });
    }
}

function updateFruityParticles() {
    for (let i = frankState.particles.length - 1; i >= 0; i--) {
        const p = frankState.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.1; // Disparition plus rapide (10 frames)
        if (p.life <= 0) frankState.particles.splice(i, 1);
    }
}

function drawFruityParticles(ctx, offsetX, offsetY) {
    for (const p of frankState.particles) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(offsetX + p.x, offsetY + p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function canMonsterMove(gridX, gridY, canDig) {
    if (gridX < 0 || gridX >= FRANK_CONFIG.GRID_WIDTH ||
        gridY < 0 || gridY >= FRANK_CONFIG.GRID_HEIGHT) {
        return false;
    }

    const tile = frankState.grid[gridY][gridX];

    if (tile === TILE.WALL || tile === TILE.APPLE || tile === TILE.NEST) {
        return false;
    }

    if (tile === TILE.DIRT && !canDig) {
        return false;
    }

    return true;
}

// ===== MORT DE FRANK =====
function frankDeath() {
    if (frankState.frank.dead) return;

    frankState.frank.dead = true;
    if (typeof AudioSystem !== 'undefined') AudioSystem.play('hurt');
    if (typeof ParticleSystem !== 'undefined' && typeof canvas !== 'undefined') {
        const offsetX = (canvas.width - FRANK_CONFIG.GRID_WIDTH * FRANK_CONFIG.TILE_SIZE) / 2;
        const offsetY = (canvas.height - FRANK_CONFIG.GRID_HEIGHT * FRANK_CONFIG.TILE_SIZE) / 2 + 50;
        ParticleSystem.emit(
            offsetX + frankState.frank.pixelX + FRANK_CONFIG.TILE_SIZE / 2,
            offsetY + frankState.frank.pixelY + FRANK_CONFIG.TILE_SIZE / 2,
            'damage', 30
        );
    }

    setTimeout(() => {
        if (typeof state !== 'undefined') {
            state.lives--;
            if (typeof updateHud === 'function') updateHud();

            if (state.lives <= 0) {
                if (typeof gameOver === 'function') gameOver("Oh non! Fruity Frank a perdu!");
            } else {
                resetPlayerAndMonsters(); // On garde la grille, on reset juste les acteurs !
            }
        }
    }, 1000);
}

// ===== DESSIN =====
function drawFruityFrank(ctx, offsetX, offsetY) {
    const tileSize = FRANK_CONFIG.TILE_SIZE;
    const colors = FRANK_CONFIG.COLORS;

    // Fond Moderne avec vignettage
    const bgGrad = ctx.createRadialGradient(
        offsetX + (FRANK_CONFIG.GRID_WIDTH * tileSize) / 2,
        offsetY + (FRANK_CONFIG.GRID_HEIGHT * tileSize) / 2,
        100,
        offsetX + (FRANK_CONFIG.GRID_WIDTH * tileSize) / 2,
        offsetY + (FRANK_CONFIG.GRID_HEIGHT * tileSize) / 2,
        600
    );
    bgGrad.addColorStop(0, '#2c0a1a'); // Centre prune
    bgGrad.addColorStop(1, '#0a0005'); // Bords noirs
    ctx.fillStyle = bgGrad;
    
    // Cadre néon
    ctx.fillRect(offsetX - 5, offsetY - 5, FRANK_CONFIG.GRID_WIDTH * tileSize + 10, FRANK_CONFIG.GRID_HEIGHT * tileSize + 10);
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 3;
    ctx.strokeRect(offsetX - 2, offsetY - 2, FRANK_CONFIG.GRID_WIDTH * tileSize + 4, FRANK_CONFIG.GRID_HEIGHT * tileSize + 4);

    // Rendu du contenu
    ctx.fillRect(offsetX, offsetY,
        FRANK_CONFIG.GRID_WIDTH * tileSize,
        FRANK_CONFIG.GRID_HEIGHT * tileSize);

    // Dessiner la grille
    for (let y = 0; y < FRANK_CONFIG.GRID_HEIGHT; y++) {
        for (let x = 0; x < FRANK_CONFIG.GRID_WIDTH; x++) {
            const tile = frankState.grid[y][x];
            const px = offsetX + x * tileSize;
            const py = offsetY + y * tileSize;

            switch (tile) {
                case TILE.WALL:
                    drawBrickWall(ctx, px, py, tileSize);
                    break;

                case TILE.DIRT:
                    drawDirt(ctx, px, py, tileSize, x, y);
                    break;

                case TILE.CHERRY:
                    drawCherry(ctx, px, py, tileSize);
                    break;

                case TILE.STRAWBERRY:
                    drawStrawberry(ctx, px, py, tileSize);
                    break;

                case TILE.BANANA:
                    drawBanana(ctx, px, py, tileSize);
                    break;

                case TILE.ORANGE:
                    drawOrange(ctx, px, py, tileSize);
                    break;

                case TILE.NEST:
                    drawNest(ctx, px, py, tileSize);
                    break;
            }
        }
    }

    // Dessiner les pommes
    for (const apple of frankState.apples) {
        let px = offsetX + apple.gridX * tileSize;
        let py = offsetY + apple.pixelY;

        // Effet de tremblement
        if (apple.shaking) {
            const shake = Math.sin(frankState.frameTick * 0.8) * 3;
            px += shake;
        }

        drawApple(ctx, px, py, tileSize);
    }

    // Dessiner les monstres
    for (const monster of frankState.monsters) {
        const px = offsetX + monster.pixelX;
        const py = offsetY + monster.pixelY;
        drawMonster(ctx, px, py, tileSize, monster.animFrame, monster.canDig);
    }

    // Dessiner le pépin (projectile)
    if (frankState.seed) {
        drawSeed(ctx, offsetX + frankState.seed.x, offsetY + frankState.seed.y);
    }

    // Dessiner Frank
    if (!frankState.frank.dead) {
        drawFrank(ctx, offsetX, offsetY, tileSize);
    }

    // Particules maison
    drawFruityParticles(ctx, offsetX, offsetY);

    // UI
    drawFruityFrankUI(ctx, offsetX, offsetY);
}

// ===== DESSIN: MUR DE BRIQUES ROUGES =====
function drawBrickWall(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;
    // Style "Brique Néon"
    ctx.fillStyle = '#4a0d0d'; // Fond brique sombre
    ctx.fillRect(px, py, size, size);
    
    ctx.fillStyle = colors.WALL_MAIN;
    // Briques arrondies
    const pad = 2;
    ctx.fillRect(px + pad, py + pad, size - pad * 2, size / 2 - pad * 2);
    ctx.fillRect(px + pad, py + size / 2 + pad, size - pad * 2, size / 2 - pad * 2);
    
    // Reflet brillant
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(px + pad + 2, py + pad + 2, size - 10, 2);
    ctx.fillRect(px + pad + 2, py + size / 2 + pad + 2, size - 10, 2);
}

// ===== DESSIN: TERRE/FEUILLAGE VERT =====
function drawDirt(ctx, px, py, size, gridX, gridY) {
    const colors = FRANK_CONFIG.COLORS;

    // Style "Organique"
    // On ne dessine pas un carré plein, mais des "touffes"
    ctx.fillStyle = colors.DIRT_MAIN;
    ctx.beginPath();
    // Forme centrale
    ctx.arc(px + size / 2, py + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Détails feuilles claires
    ctx.fillStyle = colors.DIRT_HIGHLIGHT;
    ctx.beginPath();
    ctx.arc(px + size / 2 - 5, py + size / 2 - 5, 6, 0, Math.PI * 2);
    ctx.arc(px + size / 2 + 6, py + size / 2 + 2, 5, 0, Math.PI * 2);
    ctx.fill();
}

// ===== DESSIN: CERISE =====
function drawCherry(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;
    const cx = px + size / 2;
    const cy = py + size / 2;

    // Tiges
    ctx.strokeStyle = colors.STEM_GREEN;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8);
    ctx.quadraticCurveTo(cx - 5, cy - 14, cx - 8, cy - 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8);
    ctx.quadraticCurveTo(cx + 5, cy - 14, cx + 8, cy - 4);
    ctx.stroke();

    // Cerises (deux boules)
    const cherryR = 6;

    // Cerise gauche
    ctx.fillStyle = colors.CHERRY_RED;
    ctx.beginPath();
    ctx.arc(cx - 6, cy + 4, cherryR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.CHERRY_DARK;
    ctx.beginPath();
    ctx.arc(cx - 6, cy + 6, cherryR - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.arc(cx - 8, cy + 2, 2, 0, Math.PI * 2);
    ctx.fill();

    // Cerise droite
    ctx.fillStyle = colors.CHERRY_RED;
    ctx.beginPath();
    ctx.arc(cx + 6, cy + 4, cherryR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.CHERRY_DARK;
    ctx.beginPath();
    ctx.arc(cx + 6, cy + 6, cherryR - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.arc(cx + 4, cy + 2, 2, 0, Math.PI * 2);
    ctx.fill();
}

// ===== DESSIN: FRAISE =====
function drawStrawberry(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;
    const cx = px + size / 2;
    const cy = py + size / 2;

    // Corps de la fraise (triangle arrondi)
    ctx.fillStyle = colors.STRAWBERRY_RED;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 10);
    ctx.quadraticCurveTo(cx - 10, cy, cx - 8, cy - 6);
    ctx.quadraticCurveTo(cx, cy - 10, cx + 8, cy - 6);
    ctx.quadraticCurveTo(cx + 10, cy, cx, cy + 10);
    ctx.fill();

    // Feuilles
    ctx.fillStyle = colors.STEM_GREEN;
    ctx.beginPath();
    ctx.ellipse(cx - 4, cy - 8, 4, 3, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 4, cy - 8, 4, 3, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, cy - 10, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Graines (points jaunes)
    ctx.fillStyle = colors.BANANA_YELLOW;
    const seeds = [
        {x: -3, y: -2}, {x: 3, y: -2},
        {x: -5, y: 2}, {x: 0, y: 2}, {x: 5, y: 2},
        {x: -3, y: 6}, {x: 3, y: 6}
    ];
    for (const seed of seeds) {
        ctx.beginPath();
        ctx.arc(cx + seed.x, cy + seed.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Reflet
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath();
    ctx.ellipse(cx - 4, cy - 3, 3, 4, -0.5, 0, Math.PI * 2);
    ctx.fill();
}

// ===== DESSIN: BANANE =====
function drawBanana(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;
    const cx = px + size / 2;
    const cy = py + size / 2;

    // Corps de la banane (courbe)
    ctx.fillStyle = colors.BANANA_YELLOW;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 4);
    ctx.quadraticCurveTo(cx - 8, cy - 8, cx + 2, cy - 8);
    ctx.quadraticCurveTo(cx + 10, cy - 6, cx + 10, cy);
    ctx.quadraticCurveTo(cx + 8, cy + 4, cx, cy + 6);
    ctx.quadraticCurveTo(cx - 6, cy + 6, cx - 10, cy + 4);
    ctx.fill();

    // Ombre
    ctx.fillStyle = colors.BANANA_DARK;
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy + 4);
    ctx.quadraticCurveTo(cx - 4, cy + 6, cx, cy + 6);
    ctx.quadraticCurveTo(cx - 4, cy + 2, cx - 8, cy + 4);
    ctx.fill();

    // Extrémités marron
    ctx.fillStyle = colors.STEM_BROWN;
    ctx.beginPath();
    ctx.arc(cx - 10, cy + 4, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 10, cy, 2, 0, Math.PI * 2);
    ctx.fill();

    // Reflet
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.ellipse(cx - 2, cy - 4, 5, 2, -0.3, 0, Math.PI * 2);
    ctx.fill();
}

// ===== DESSIN: ORANGE =====
function drawOrange(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;
    const cx = px + size / 2;
    const cy = py + size / 2;

    // Corps de l'orange
    ctx.fillStyle = colors.ORANGE;
    ctx.beginPath();
    ctx.arc(cx, cy, 11, 0, Math.PI * 2);
    ctx.fill();

    // Ombre
    ctx.fillStyle = colors.ORANGE_DARK;
    ctx.beginPath();
    ctx.arc(cx + 2, cy + 3, 9, 0, Math.PI);
    ctx.fill();

    // Texture (petits points)
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const dotX = cx + Math.cos(angle) * 6;
        const dotY = cy + Math.sin(angle) * 6;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 1, 0, Math.PI * 2);
        ctx.fill();
    }

    // Feuille
    ctx.fillStyle = colors.STEM_GREEN;
    ctx.beginPath();
    ctx.ellipse(cx, cy - 10, 4, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Reflet
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.arc(cx - 4, cy - 3, 3, 0, Math.PI * 2);
    ctx.fill();
}

// ===== DESSIN: POMME =====
function drawApple(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;
    const cx = px + size / 2;
    const cy = py + size / 2;

    // Ombre portée
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 12, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Corps (Dégradé radial pour effet 3D)
    const grad = ctx.createRadialGradient(cx - 5, cy - 5, 2, cx, cy, 15);
    grad.addColorStop(0, colors.APPLE_SHINE);
    grad.addColorStop(1, colors.APPLE_MAIN);
    ctx.fillStyle = grad;
    
    ctx.beginPath();
    ctx.arc(cx, cy + 2, 12, 0, Math.PI * 2);
    ctx.fill();

    // Reflet blanc pur "Cartoon"
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(cx - 6, cy - 4, 4, 6, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Queue
    ctx.strokeStyle = "#6d4c41";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8);
    ctx.lineTo(cx + 2, cy - 13);
    ctx.stroke();

    // Feuille
    ctx.fillStyle = colors.STEM_GREEN;
    ctx.beginPath();
    ctx.ellipse(cx + 5, cy - 10, 4, 2, 0.5, 0, Math.PI * 2);
    ctx.fill();

}

// ===== DESSIN: NID =====
function drawNest(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;
    const cx = px + size / 2;
    const cy = py + size / 2;

    // Cercle violet pulsant
    const pulse = Math.sin(frankState.frameTick * 0.1) * 3 + 15;
    
    // Glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#d2527f';
    ctx.fillStyle = '#8e44ad';
    
    ctx.beginPath();
    ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Spirale
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
        const angle = frankState.frameTick * 0.1 + i;
        const r = i * 1.5;
        ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
    }
    ctx.stroke();
}

// ===== DESSIN: MONSTRE VIOLET =====
function drawMonster(ctx, px, py, size, animFrame, canDig) {
    const colors = FRANK_CONFIG.COLORS;
    const cx = px + size / 2;
    const cy = py + size / 2;

    // Animation de flottement
    const bounce = Math.sin(animFrame * 0.15) * 2;

    // Corps blob violet
    ctx.fillStyle = canDig ? '#CC00CC' : colors.PURPLE;
    ctx.beginPath();

    // Forme blob ondulée
    const wobble = Math.sin(animFrame * 0.2) * 2;
    ctx.moveTo(cx - 10, cy + 5 + bounce);
    ctx.quadraticCurveTo(cx - 12 + wobble, cy - 5, cx - 6, cy - 10 + bounce);
    ctx.quadraticCurveTo(cx, cy - 14, cx + 6, cy - 10 + bounce);
    ctx.quadraticCurveTo(cx + 12 - wobble, cy - 5, cx + 10, cy + 5 + bounce);
    ctx.quadraticCurveTo(cx + 8, cy + 10, cx, cy + 10 + bounce);
    ctx.quadraticCurveTo(cx - 8, cy + 10, cx - 10, cy + 5 + bounce);
    ctx.fill();

    // Ombre
    ctx.fillStyle = colors.PURPLE_DARK;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 8 + bounce, 8, 4, 0, 0, Math.PI);
    ctx.fill();

    // Yeux blancs
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.arc(cx - 4, cy - 3 + bounce, 4, 0, Math.PI * 2);
    ctx.arc(cx + 4, cy - 3 + bounce, 4, 0, Math.PI * 2);
    ctx.fill();

    // Pupilles (suivent Frank)
    const dx = frankState.frank.pixelX - px;
    const dy = frankState.frank.pixelY - py;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const lookX = dist > 0 ? (dx / dist) * 2 : 0;
    const lookY = dist > 0 ? (dy / dist) * 1 : 0;

    ctx.fillStyle = colors.BLACK;
    ctx.beginPath();
    ctx.arc(cx - 4 + lookX, cy - 3 + bounce + lookY, 2, 0, Math.PI * 2);
    ctx.arc(cx + 4 + lookX, cy - 3 + bounce + lookY, 2, 0, Math.PI * 2);
    ctx.fill();

    // Bouche méchante
    ctx.strokeStyle = colors.BLACK;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy + 4 + bounce, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Dents
    ctx.fillStyle = colors.WHITE;
    ctx.fillRect(cx - 3, cy + 4 + bounce, 2, 3);
    ctx.fillRect(cx + 1, cy + 4 + bounce, 2, 3);
}

// ===== DESSIN: PÉPIN (Projectile) =====
function drawSeed(ctx, x, y) {
    const colors = FRANK_CONFIG.COLORS;

    // Pépin marron avec effet de rotation
    const rotation = frankState.frameTick * 0.3;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Corps du pépin (ovale marron)
    ctx.fillStyle = colors.STEM_BROWN;
    ctx.beginPath();
    ctx.ellipse(0, 0, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Reflet
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.ellipse(-2, -1, 2, 1, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Effet de traînée
    ctx.fillStyle = 'rgba(136, 68, 34, 0.3)';
    ctx.beginPath();
    ctx.arc(x - frankState.seed.vx * 0.5, y - frankState.seed.vy * 0.5, 4, 0, Math.PI * 2);
    ctx.fill();
}

// ===== DESSIN: FRANK (Personnage jaune rond) =====
function drawFrank(ctx, offsetX, offsetY, size) {
    const frank = frankState.frank;
    const colors = FRANK_CONFIG.COLORS;

    const px = offsetX + frank.pixelX;
    const py = offsetY + frank.pixelY;
    const cx = px + size / 2;
    const cy = py + size / 2;

    ctx.save();

    // Flip horizontal si regarde à gauche
    if (!frank.facingRight) {
        ctx.translate(cx, 0);
        ctx.scale(-1, 1);
        ctx.translate(-cx, 0);
    }

    // Effet de respiration
    const breath = Math.sin(frankState.frameTick * 0.2) * 1;

    // Corps jaune avec dégradé
    const grad = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, 14);
    grad.addColorStop(0, '#ffeaa7');
    grad.addColorStop(1, '#f1c40f');
    ctx.fillStyle = grad;
    
    ctx.beginPath();
    ctx.arc(cx, cy, 13 + breath, 0, Math.PI * 2);
    ctx.fill();
    
    // Bordure cartoon
    ctx.strokeStyle = '#b7950b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Nez rouge (Le fameux nez de Fruity Frank !)
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(cx + 10, cy + 2, 4, 0, Math.PI * 2);
    ctx.fill();

    // Bouche (ouverte/fermée selon animation)
    if (frank.mouthOpen && frank.moving) {
        ctx.fillStyle = '#2d3436';
        ctx.beginPath();
        ctx.arc(cx + 5, cy + 6, 4, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.strokeStyle = '#2d3436';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx + 4, cy + 5, 4, 0.2, Math.PI - 0.2);
        ctx.stroke();
    }

    // Oeil (Grand et cartoon)
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.ellipse(cx + 2, cy - 5, 5, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupille
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx + 4, cy - 5, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Reflet
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.arc(cx + 3, cy - 7, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Joue rose
    ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
    ctx.beginPath();
    ctx.arc(cx + 8, cy + 2, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// ===== UI =====
function drawFruityFrankUI(ctx, offsetX, offsetY) {
    const colors = FRANK_CONFIG.COLORS;
    const tileSize = FRANK_CONFIG.TILE_SIZE;

    // Barre supérieure moderne
    const w = FRANK_CONFIG.GRID_WIDTH * FRANK_CONFIG.TILE_SIZE;
    
    ctx.fillStyle = 'rgba(20, 20, 30, 0.9)';
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(offsetX, offsetY - 55, w, 50, 10);
    } else {
        ctx.rect(offsetX, offsetY - 55, w, 50);
    }
    ctx.fill();
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Score avec icône
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 24px "Fredoka One", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`🏆 ${frankState.score}`, offsetX + 20, offsetY - 20);

    // Fruits restants
    ctx.fillStyle = '#e74c3c';
    ctx.fillText(`🍒 ${frankState.fruitsCollected}/${frankState.fruitsTotal}`,
        offsetX + w / 2 - 60, offsetY - 20);

    // Vies
    if (typeof state !== 'undefined') {
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`❤️ ${state.lives}`, offsetX + w - 100, offsetY - 20);
    }

    // Indicateur de pépin (prêt ou en cooldown)
    const seedReady = frankState.seed === null && frankState.seedCooldown === 0;
    ctx.fillStyle = seedReady ? '#00FF00' : '#FF0000';
    ctx.beginPath();
    ctx.arc(offsetX + FRANK_CONFIG.GRID_WIDTH * tileSize - 30, offsetY - 30, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.WHITE;
    ctx.font = 'bold 10px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('TIR', offsetX + FRANK_CONFIG.GRID_WIDTH * tileSize - 30, offsetY - 15);

    // Instructions
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '12px "Courier New", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('Fleches: Deplacer | ESPACE: Tirer',
        offsetX + FRANK_CONFIG.GRID_WIDTH * tileSize - 60, offsetY - 22);
}

// ===== GESTION DES TOUCHES =====
function handleFruityFrankInput(e, pressed) {
    // Barre d'espace pour tirer le pépin
    if (pressed && (e.key === ' ' || e.code === 'Space')) {
        shootSeed();
        e.preventDefault();
    }
}
