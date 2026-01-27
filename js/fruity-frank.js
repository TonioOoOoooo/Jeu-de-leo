// ============================================================
// FRUITY FRANK ENGINE - Moteur de jeu type Boulder Dash/Mr. Do!
// Inspiré de l'Amstrad CPC
// ============================================================

// ===== CONFIGURATION DE LA GRILLE =====
const FRANK_CONFIG = {
    GRID_WIDTH: 15,      // Largeur de la grille en tiles
    GRID_HEIGHT: 13,     // Hauteur de la grille en tiles
    TILE_SIZE: 40,       // Taille d'une tile en pixels

    // Vitesses de mouvement (en pixels par frame)
    FRANK_SPEED: 2,      // Vitesse de Frank sur la grille

    // Timers
    APPLE_SHAKE_DURATION: 30,  // Frames de tremblement avant chute (0.5 sec)
    SEED_COOLDOWN: 120,         // Cooldown du pépin (2 sec)
    MONSTER_SPAWN_INTERVAL: 180, // Spawn d'ennemi toutes les 3 sec

    // Vitesses des ennemis
    ENEMY_SPEED_SLOW: 1,        // Nez (jaune) - lent
    ENEMY_SPEED_MEDIUM: 1.5,    // Aubergine - moyen
    ENEMY_SPEED_FAST: 2.5,      // Fraise - rapide

    // Couleurs Amstrad CPC Mode 0
    COLORS: {
        BLACK: '#000000',       // Fond
        PINK: '#FF6EB4',        // Frank peau
        RED: '#FF0000',         // Frank chapeau / Pommes
        BLUE: '#0000FF',        // Frank habit
        GREEN: '#00FF00',       // Terre type 1
        BROWN: '#8B4513',       // Terre type 2
        YELLOW: '#FFFF00',      // Nez (ennemi jaune)
        PURPLE: '#800080',      // Aubergine
        BRIGHT_RED: '#FF3333',  // Fraise
        WHITE: '#FFFFFF',       // Reflets
        CYAN: '#00FFFF',        // UI
        GOLD: '#FFD700'         // Cadre
    }
};

// ===== TYPES DE TILES =====
const TILE = {
    EMPTY: 0,           // Vide (noir)
    DIRT: 1,            // Terre pleine (ralentit ennemis, bloque pommes)
    PATH: 2,            // Chemin creusé (noir, pommes peuvent tomber)
    WALL: 3,            // Mur indestructible
    APPLE: 4,           // Pomme
    FRUIT: 5,           // Fruit à collecter
    NEST: 6             // Nid (spawn des monstres)
};

// ===== TYPES D'ENNEMIS =====
const ENEMY_TYPE = {
    NEZ: 'nez',                 // Jaune - Mouvement aléatoire
    AUBERGINE: 'aubergine',     // Violet - Suiveur/creuseur
    FRAISE: 'fraise',           // Rouge - Direct/rapide
    LETTER_B: 'letter_b',       // Lettre B
    LETTER_O: 'letter_o',       // Lettre O
    LETTER_N: 'letter_n',       // Lettre N
    LETTER_U: 'letter_u',       // Lettre U
    LETTER_S: 'letter_s'        // Lettre S
};

// ===== ÉTAT DU JEU FRUITY FRANK =====
const frankState = {
    // Grille de jeu (15x13)
    grid: [],

    // Frank (le joueur)
    frank: {
        gridX: 1,           // Position X dans la grille
        gridY: 11,          // Position Y dans la grille
        pixelX: 0,          // Position pixel (pour l'interpolation)
        pixelY: 0,
        targetX: 1,         // Destination actuelle
        targetY: 11,
        moving: false,
        direction: 'right', // 'up', 'down', 'left', 'right'
        facingRight: true,
        animFrame: 0,
        dead: false
    },

    // Pommes avec physique Boulder Dash
    apples: [],

    // Ennemis
    enemies: [],

    // Projectile (Pépin) - UN SEUL à la fois!
    seed: null,
    seedAvailable: true,
    seedCooldown: 0,

    // Lettres BONUS collectées
    bonusLetters: {
        B: false,
        O: false,
        N: false,
        U: false,
        S: false
    },

    // Nid (spawn point)
    nest: { gridX: 7, gridY: 6 },
    spawnTimer: 0,

    // Score
    score: 0,
    fruitsCollected: 0,
    fruitsTotal: 0,

    // Timer d'animation globale
    frameTick: 0
};

// ===== INITIALISATION DE LA GRILLE =====
function initFruityFrankGrid() {
    frankState.grid = [];
    frankState.apples = [];
    frankState.enemies = [];
    frankState.seed = null;
    frankState.seedAvailable = true;
    frankState.seedCooldown = 0;
    frankState.spawnTimer = 0;
    frankState.frameTick = 0;

    // Créer la grille vide
    for (let y = 0; y < FRANK_CONFIG.GRID_HEIGHT; y++) {
        frankState.grid[y] = [];
        for (let x = 0; x < FRANK_CONFIG.GRID_WIDTH; x++) {
            frankState.grid[y][x] = TILE.EMPTY;
        }
    }

    // Remplir avec de la terre (pattern type Fruity Frank)
    for (let y = 2; y < FRANK_CONFIG.GRID_HEIGHT - 1; y++) {
        for (let x = 1; x < FRANK_CONFIG.GRID_WIDTH - 1; x++) {
            // Laisser quelques chemins pré-creusés
            if (Math.random() > 0.7) {
                frankState.grid[y][x] = TILE.PATH;
            } else {
                frankState.grid[y][x] = TILE.DIRT;
            }
        }
    }

    // Murs externes
    for (let x = 0; x < FRANK_CONFIG.GRID_WIDTH; x++) {
        frankState.grid[0][x] = TILE.WALL;
        frankState.grid[FRANK_CONFIG.GRID_HEIGHT - 1][x] = TILE.WALL;
    }
    for (let y = 0; y < FRANK_CONFIG.GRID_HEIGHT; y++) {
        frankState.grid[y][0] = TILE.WALL;
        frankState.grid[y][FRANK_CONFIG.GRID_WIDTH - 1] = TILE.WALL;
    }

    // Créer le Nid au centre
    const nestX = Math.floor(FRANK_CONFIG.GRID_WIDTH / 2);
    const nestY = Math.floor(FRANK_CONFIG.GRID_HEIGHT / 2);
    frankState.nest = { gridX: nestX, gridY: nestY };
    frankState.grid[nestY][nestX] = TILE.NEST;

    // Zone autour du nid dégagée
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (nestY + dy >= 0 && nestY + dy < FRANK_CONFIG.GRID_HEIGHT &&
                nestX + dx >= 0 && nestX + dx < FRANK_CONFIG.GRID_WIDTH) {
                if (dx !== 0 || dy !== 0) {
                    frankState.grid[nestY + dy][nestX + dx] = TILE.PATH;
                }
            }
        }
    }

    // Placer Frank en bas à gauche
    frankState.frank.gridX = 1;
    frankState.frank.gridY = FRANK_CONFIG.GRID_HEIGHT - 2;
    frankState.frank.targetX = 1;
    frankState.frank.targetY = FRANK_CONFIG.GRID_HEIGHT - 2;
    frankState.frank.pixelX = 1 * FRANK_CONFIG.TILE_SIZE;
    frankState.frank.pixelY = (FRANK_CONFIG.GRID_HEIGHT - 2) * FRANK_CONFIG.TILE_SIZE;
    frankState.frank.moving = false;
    frankState.frank.dead = false;
    frankState.grid[frankState.frank.gridY][frankState.frank.gridX] = TILE.PATH;

    // Placer des pommes sur certaines tiles de terre
    for (let y = 2; y < FRANK_CONFIG.GRID_HEIGHT - 2; y++) {
        for (let x = 2; x < FRANK_CONFIG.GRID_WIDTH - 2; x++) {
            if (frankState.grid[y][x] === TILE.DIRT && Math.random() > 0.85) {
                // Placer une pomme au-dessus de la terre
                if (y > 1 && frankState.grid[y - 1][x] === TILE.PATH) {
                    frankState.apples.push({
                        gridX: x,
                        gridY: y - 1,
                        shaking: false,
                        shakeTimer: 0,
                        falling: false,
                        fallSpeed: 0
                    });
                    frankState.grid[y - 1][x] = TILE.APPLE;
                }
            }
        }
    }

    // Placer des fruits à collecter
    frankState.fruitsTotal = 0;
    frankState.fruitsCollected = 0;
    for (let i = 0; i < 10; i++) {
        const x = 2 + Math.floor(Math.random() * (FRANK_CONFIG.GRID_WIDTH - 4));
        const y = 2 + Math.floor(Math.random() * (FRANK_CONFIG.GRID_HEIGHT - 4));
        if (frankState.grid[y][x] === TILE.DIRT) {
            frankState.grid[y][x] = TILE.FRUIT;
            frankState.fruitsTotal++;
        }
    }

    // Spawn initial d'ennemis
    spawnEnemy(ENEMY_TYPE.NEZ);
    spawnEnemy(ENEMY_TYPE.AUBERGINE);
}

// ===== UPDATE FRUITY FRANK =====
function updateFruityFrank() {
    if (frankState.frank.dead) return;

    frankState.frameTick++;

    // Update cooldown du pépin
    if (frankState.seedCooldown > 0) {
        frankState.seedCooldown--;
        if (frankState.seedCooldown === 0) {
            frankState.seedAvailable = true;
        }
    }

    // Mouvement de Frank (grid-based avec snapping)
    updateFrankMovement();

    // Physique des pommes (Boulder Dash)
    updateApples();

    // Update des ennemis
    updateEnemies();

    // Update du projectile (pépin)
    updateSeed();

    // Spawn d'ennemis depuis le nid
    frankState.spawnTimer++;
    if (frankState.spawnTimer >= FRANK_CONFIG.MONSTER_SPAWN_INTERVAL) {
        frankState.spawnTimer = 0;
        const rand = Math.random();
        if (rand < 0.4) spawnEnemy(ENEMY_TYPE.NEZ);
        else if (rand < 0.7) spawnEnemy(ENEMY_TYPE.AUBERGINE);
        else spawnEnemy(ENEMY_TYPE.FRAISE);
    }

    // Vérifier victoire
    if (frankState.fruitsCollected >= frankState.fruitsTotal) {
        // Niveau complété!
        return true;
    }

    return false;
}

// ===== MOUVEMENT DE FRANK (GRID-BASED) =====
function updateFrankMovement() {
    const frank = frankState.frank;

    // Si Frank ne bouge pas, vérifier les inputs pour la prochaine direction
    if (!frank.moving) {
        // Synchroniser les positions pixel avec la grille
        frank.pixelX = frank.gridX * FRANK_CONFIG.TILE_SIZE;
        frank.pixelY = frank.gridY * FRANK_CONFIG.TILE_SIZE;

        let nextX = frank.gridX;
        let nextY = frank.gridY;
        let newDir = frank.direction;

        // Priorité : essayer le mouvement demandé
        if (keys.up && canMove(frank.gridX, frank.gridY - 1)) {
            nextY--;
            newDir = 'up';
        } else if (keys.down && canMove(frank.gridX, frank.gridY + 1)) {
            nextY++;
            newDir = 'down';
        } else if (keys.left && canMove(frank.gridX - 1, frank.gridY)) {
            nextX--;
            newDir = 'left';
            frank.facingRight = false;
        } else if (keys.right && canMove(frank.gridX + 1, frank.gridY)) {
            nextX++;
            newDir = 'right';
            frank.facingRight = true;
        }

        // Si mouvement possible, démarrer
        if (nextX !== frank.gridX || nextY !== frank.gridY) {
            frank.targetX = nextX;
            frank.targetY = nextY;
            frank.moving = true;
            frank.direction = newDir;

            // Essayer de pousser une pomme si présente
            tryPushApple(frank.gridX, frank.gridY, nextX, nextY);
        }
    }

    // Si Frank bouge, interpoler vers la cible
    if (frank.moving) {
        const dx = frank.targetX - frank.gridX;
        const dy = frank.targetY - frank.gridY;

        const moveSpeed = FRANK_CONFIG.FRANK_SPEED;

        if (Math.abs(dx) > 0) {
            frank.pixelX += Math.sign(dx) * moveSpeed;
            if (Math.abs(frank.pixelX - frank.targetX * FRANK_CONFIG.TILE_SIZE) < moveSpeed) {
                frank.gridX = frank.targetX;
                frank.pixelX = frank.targetX * FRANK_CONFIG.TILE_SIZE;
                frank.moving = false;
            }
        } else if (Math.abs(dy) > 0) {
            frank.pixelY += Math.sign(dy) * moveSpeed;
            if (Math.abs(frank.pixelY - frank.targetY * FRANK_CONFIG.TILE_SIZE) < moveSpeed) {
                frank.gridY = frank.targetY;
                frank.pixelY = frank.targetY * FRANK_CONFIG.TILE_SIZE;
                frank.moving = false;
            }
        }

        // Arrivé à destination : creuser la terre!
        if (!frank.moving) {
            const tile = frankState.grid[frank.gridY][frank.gridX];

            if (tile === TILE.DIRT) {
                // Creuser = transformer en PATH et gagner 10 points
                frankState.grid[frank.gridY][frank.gridX] = TILE.PATH;
                frankState.score += 10;
                AudioSystem.play('coin');
            } else if (tile === TILE.FRUIT) {
                // Collecter fruit
                frankState.grid[frank.gridY][frank.gridX] = TILE.PATH;
                frankState.fruitsCollected++;
                frankState.score += 50;
                AudioSystem.play('coin');
                ParticleSystem.emit(
                    frank.gridX * FRANK_CONFIG.TILE_SIZE + FRANK_CONFIG.TILE_SIZE / 2,
                    frank.gridY * FRANK_CONFIG.TILE_SIZE + FRANK_CONFIG.TILE_SIZE / 2,
                    'coin', 10
                );
            }
        }
    }

    // Animation de marche
    if (frank.moving) {
        frank.animFrame++;
    }
}

// ===== VÉRIFIER SI FRANK PEUT SE DÉPLACER =====
function canMove(gridX, gridY) {
    if (gridX < 0 || gridX >= FRANK_CONFIG.GRID_WIDTH ||
        gridY < 0 || gridY >= FRANK_CONFIG.GRID_HEIGHT) {
        return false;
    }

    const tile = frankState.grid[gridY][gridX];

    // Frank peut marcher sur : PATH, DIRT, FRUIT
    // Frank NE PEUT PAS traverser : WALL, APPLE, NEST
    if (tile === TILE.WALL || tile === TILE.APPLE || tile === TILE.NEST) {
        return false;
    }

    return true;
}

// ===== POUSSER UNE POMME =====
function tryPushApple(fromX, fromY, toX, toY) {
    const dx = toX - fromX;
    const dy = toY - fromY;

    // Vérifier s'il y a une pomme devant
    const appleX = toX;
    const appleY = toY;

    if (frankState.grid[appleY] && frankState.grid[appleY][appleX] === TILE.APPLE) {
        // Vérifier s'il y a du vide derrière la pomme
        const behindX = appleX + dx;
        const behindY = appleY + dy;

        if (behindX >= 0 && behindX < FRANK_CONFIG.GRID_WIDTH &&
            behindY >= 0 && behindY < FRANK_CONFIG.GRID_HEIGHT &&
            frankState.grid[behindY][behindX] === TILE.PATH) {

            // Pousser la pomme!
            const apple = frankState.apples.find(a => a.gridX === appleX && a.gridY === appleY);
            if (apple) {
                frankState.grid[appleY][appleX] = TILE.PATH;
                apple.gridX = behindX;
                apple.gridY = behindY;
                frankState.grid[behindY][behindX] = TILE.APPLE;
                AudioSystem.play('jump');
            }
        }
    }
}

// ===== PHYSIQUE DES POMMES (BOULDER DASH) =====
function updateApples() {
    for (let i = frankState.apples.length - 1; i >= 0; i--) {
        const apple = frankState.apples[i];

        if (apple.falling) {
            // Pomme en chute
            apple.fallSpeed += 0.5; // Gravité
            const maxSpeed = 8;
            apple.fallSpeed = Math.min(apple.fallSpeed, maxSpeed);

            // Descendre
            const nextY = apple.gridY + 1;

            if (nextY >= FRANK_CONFIG.GRID_HEIGHT - 1) {
                // Sol atteint - arrêter
                apple.falling = false;
                apple.fallSpeed = 0;
            } else {
                const tileBelow = frankState.grid[nextY][apple.gridX];

                if (tileBelow === TILE.PATH || tileBelow === TILE.EMPTY) {
                    // Continuer la chute
                    frankState.grid[apple.gridY][apple.gridX] = TILE.PATH;
                    apple.gridY = nextY;
                    frankState.grid[apple.gridY][apple.gridX] = TILE.APPLE;
                } else if (tileBelow === TILE.DIRT || tileBelow === TILE.WALL || tileBelow === TILE.APPLE) {
                    // Arrêt sur obstacle
                    apple.falling = false;
                    apple.fallSpeed = 0;
                } else {
                    // Vérifier écrasement d'ennemi
                    const enemy = frankState.enemies.find(e =>
                        Math.floor(e.gridX) === apple.gridX && Math.floor(e.gridY) === nextY
                    );
                    if (enemy) {
                        // Écraser l'ennemi!
                        killEnemy(enemy);
                        apple.falling = false;
                        apple.fallSpeed = 0;
                    }

                    // Vérifier écrasement de Frank
                    if (frankState.frank.gridX === apple.gridX && frankState.frank.gridY === nextY) {
                        frankDeath();
                    }
                }
            }
        } else {
            // Vérifier stabilité
            const belowY = apple.gridY + 1;
            if (belowY < FRANK_CONFIG.GRID_HEIGHT) {
                const tileBelow = frankState.grid[belowY][apple.gridX];

                if (tileBelow === TILE.PATH || tileBelow === TILE.EMPTY) {
                    // Sol creusé en-dessous : commencer à trembler!
                    if (!apple.shaking) {
                        apple.shaking = true;
                        apple.shakeTimer = FRANK_CONFIG.APPLE_SHAKE_DURATION;
                    }
                }
            }

            // Si tremblement actif
            if (apple.shaking) {
                apple.shakeTimer--;
                if (apple.shakeTimer <= 0) {
                    // Commencer la chute!
                    apple.shaking = false;
                    apple.falling = true;
                    apple.fallSpeed = 1;
                }
            }
        }
    }
}

// ===== ENNEMIS =====
function updateEnemies() {
    for (let i = frankState.enemies.length - 1; i >= 0; i--) {
        const enemy = frankState.enemies[i];

        // Collision avec Frank
        if (Math.floor(enemy.gridX) === frankState.frank.gridX &&
            Math.floor(enemy.gridY) === frankState.frank.gridY) {
            // Si c'est une lettre, la collecter
            if (enemy.type.startsWith('letter_')) {
                const letter = enemy.type.split('_')[1].toUpperCase();
                frankState.bonusLetters[letter] = true;
                frankState.score += 100;
                frankState.enemies.splice(i, 1);
                AudioSystem.play('powerup');
                continue;
            } else {
                // Mort de Frank
                frankDeath();
                return;
            }
        }

        // Mouvement selon le type
        switch (enemy.type) {
            case ENEMY_TYPE.NEZ:
                updateEnemyNez(enemy);
                break;
            case ENEMY_TYPE.AUBERGINE:
                updateEnemyAubergine(enemy);
                break;
            case ENEMY_TYPE.FRAISE:
                updateEnemyFraise(enemy);
                break;
            default:
                // Lettres : comportement comme aubergine
                updateEnemyAubergine(enemy);
                break;
        }
    }
}

// ===== IA TYPE 1 : NEZ (ALÉATOIRE) =====
function updateEnemyNez(enemy) {
    const speed = FRANK_CONFIG.ENEMY_SPEED_SLOW;

    // Si pas de direction ou bloqué, choisir une nouvelle direction
    if (!enemy.direction || Math.random() < 0.02) {
        const directions = ['up', 'down', 'left', 'right'];
        enemy.direction = directions[Math.floor(Math.random() * directions.length)];
    }

    // Essayer de bouger dans la direction
    let nextX = enemy.gridX;
    let nextY = enemy.gridY;

    switch (enemy.direction) {
        case 'up': nextY -= speed / FRANK_CONFIG.TILE_SIZE; break;
        case 'down': nextY += speed / FRANK_CONFIG.TILE_SIZE; break;
        case 'left': nextX -= speed / FRANK_CONFIG.TILE_SIZE; break;
        case 'right': nextX += speed / FRANK_CONFIG.TILE_SIZE; break;
    }

    // Vérifier si le mouvement est valide (seulement sur PATH)
    const gridNextX = Math.floor(nextX);
    const gridNextY = Math.floor(nextY);

    if (canEnemyMove(gridNextX, gridNextY, false)) {
        enemy.gridX = nextX;
        enemy.gridY = nextY;
    } else {
        // Bloqué : changer de direction
        const directions = ['up', 'down', 'left', 'right'];
        enemy.direction = directions[Math.floor(Math.random() * directions.length)];
    }
}

// ===== IA TYPE 2 : AUBERGINE (SUIVEUR/CREUSEUR) =====
function updateEnemyAubergine(enemy) {
    const speed = FRANK_CONFIG.ENEMY_SPEED_MEDIUM;

    // Calculer direction vers Frank (simple pathfinding)
    const dx = frankState.frank.gridX - Math.floor(enemy.gridX);
    const dy = frankState.frank.gridY - Math.floor(enemy.gridY);

    let moveX = 0;
    let moveY = 0;

    // Priorité : réduire la distance X ou Y la plus grande
    if (Math.abs(dx) > Math.abs(dy)) {
        moveX = Math.sign(dx);
    } else {
        moveY = Math.sign(dy);
    }

    let nextX = enemy.gridX + moveX * (speed / FRANK_CONFIG.TILE_SIZE);
    let nextY = enemy.gridY + moveY * (speed / FRANK_CONFIG.TILE_SIZE);

    const gridNextX = Math.floor(nextX);
    const gridNextY = Math.floor(nextY);

    // Aubergine peut creuser la terre (plus lent)
    if (canEnemyMove(gridNextX, gridNextY, true)) {
        enemy.gridX = nextX;
        enemy.gridY = nextY;
    }
}

// ===== IA TYPE 3 : FRAISE (DIRECT/RAPIDE) =====
function updateEnemyFraise(enemy) {
    const speed = FRANK_CONFIG.ENEMY_SPEED_FAST;

    // Viser directement Frank
    const dx = frankState.frank.gridX - Math.floor(enemy.gridX);
    const dy = frankState.frank.gridY - Math.floor(enemy.gridY);

    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
        const nextX = enemy.gridX + (dx / dist) * (speed / FRANK_CONFIG.TILE_SIZE);
        const nextY = enemy.gridY + (dy / dist) * (speed / FRANK_CONFIG.TILE_SIZE);

        const gridNextX = Math.floor(nextX);
        const gridNextY = Math.floor(nextY);

        if (canEnemyMove(gridNextX, gridNextY, false)) {
            enemy.gridX = nextX;
            enemy.gridY = nextY;
        }
    }
}

// ===== VÉRIFIER SI ENNEMI PEUT SE DÉPLACER =====
function canEnemyMove(gridX, gridY, canDigDirt) {
    if (gridX < 0 || gridX >= FRANK_CONFIG.GRID_WIDTH ||
        gridY < 0 || gridY >= FRANK_CONFIG.GRID_HEIGHT) {
        return false;
    }

    const tile = frankState.grid[gridY][gridX];

    if (tile === TILE.WALL || tile === TILE.APPLE || tile === TILE.NEST) {
        return false;
    }

    if (tile === TILE.DIRT && !canDigDirt) {
        return false;
    }

    return true;
}

// ===== SPAWN D'ENNEMI =====
function spawnEnemy(type) {
    const nest = frankState.nest;

    frankState.enemies.push({
        type: type,
        gridX: nest.gridX,
        gridY: nest.gridY,
        direction: null,
        animFrame: 0
    });
}

// ===== TUER UN ENNEMI =====
function killEnemy(enemy) {
    const index = frankState.enemies.indexOf(enemy);
    if (index !== -1) {
        frankState.enemies.splice(index, 1);
        frankState.score += 50;
        AudioSystem.play('boss_hit');
        ParticleSystem.emit(
            enemy.gridX * FRANK_CONFIG.TILE_SIZE + FRANK_CONFIG.TILE_SIZE / 2,
            enemy.gridY * FRANK_CONFIG.TILE_SIZE + FRANK_CONFIG.TILE_SIZE / 2,
            'damage', 15
        );
    }
}

// ===== SYSTÈME DE PÉPIN (PROJECTILE) =====
function shootSeed() {
    if (!frankState.seedAvailable) return;

    const frank = frankState.frank;

    // Créer le pépin
    frankState.seed = {
        gridX: frank.gridX,
        gridY: frank.gridY,
        vx: 0,
        vy: 0,
        speed: 4
    };

    // Direction selon la direction de Frank
    switch (frank.direction) {
        case 'up':
            frankState.seed.vy = -frankState.seed.speed;
            break;
        case 'down':
            frankState.seed.vy = frankState.seed.speed;
            break;
        case 'left':
            frankState.seed.vx = -frankState.seed.speed;
            break;
        case 'right':
            frankState.seed.vx = frankState.seed.speed;
            break;
    }

    frankState.seedAvailable = false;
    AudioSystem.play('jump');
}

function updateSeed() {
    if (!frankState.seed) return;

    const seed = frankState.seed;
    seed.gridX += seed.vx / FRANK_CONFIG.TILE_SIZE;
    seed.gridY += seed.vy / FRANK_CONFIG.TILE_SIZE;

    const gridX = Math.floor(seed.gridX);
    const gridY = Math.floor(seed.gridY);

    // Vérifier collision avec mur ou pomme
    if (gridX < 0 || gridX >= FRANK_CONFIG.GRID_WIDTH ||
        gridY < 0 || gridY >= FRANK_CONFIG.GRID_HEIGHT ||
        frankState.grid[gridY][gridX] === TILE.WALL ||
        frankState.grid[gridY][gridX] === TILE.APPLE ||
        frankState.grid[gridY][gridX] === TILE.DIRT) {
        // Pépin disparaît et revient après cooldown
        frankState.seed = null;
        frankState.seedCooldown = FRANK_CONFIG.SEED_COOLDOWN;
        return;
    }

    // Vérifier collision avec ennemi
    for (let i = frankState.enemies.length - 1; i >= 0; i--) {
        const enemy = frankState.enemies[i];
        if (Math.floor(enemy.gridX) === gridX && Math.floor(enemy.gridY) === gridY) {
            killEnemy(enemy);
            frankState.seed = null;
            frankState.seedCooldown = FRANK_CONFIG.SEED_COOLDOWN;
            return;
        }
    }
}

// ===== MORT DE FRANK =====
function frankDeath() {
    frankState.frank.dead = true;
    AudioSystem.play('hurt');
    ParticleSystem.emit(
        frankState.frank.gridX * FRANK_CONFIG.TILE_SIZE + FRANK_CONFIG.TILE_SIZE / 2,
        frankState.frank.gridY * FRANK_CONFIG.TILE_SIZE + FRANK_CONFIG.TILE_SIZE / 2,
        'damage', 30
    );

    // Perdre une vie et respawn
    setTimeout(() => {
        state.lives--;
        updateHud();

        if (state.lives <= 0) {
            gameOver("Frank est mort!");
        } else {
            // Respawn
            initFruityFrankGrid();
        }
    }, 1000);
}

// ===== DESSINER FRUITY FRANK =====
function drawFruityFrank(ctx, offsetX, offsetY) {
    const tileSize = FRANK_CONFIG.TILE_SIZE;

    // Dessiner la grille
    for (let y = 0; y < FRANK_CONFIG.GRID_HEIGHT; y++) {
        for (let x = 0; x < FRANK_CONFIG.GRID_WIDTH; x++) {
            const tile = frankState.grid[y][x];
            const px = offsetX + x * tileSize;
            const py = offsetY + y * tileSize;

            switch (tile) {
                case TILE.EMPTY:
                case TILE.PATH:
                    // Noir (déjà le fond)
                    break;

                case TILE.DIRT:
                    // Terre (alternance vert/marron selon position)
                    ctx.fillStyle = (x + y) % 2 === 0 ? FRANK_CONFIG.COLORS.GREEN : FRANK_CONFIG.COLORS.BROWN;
                    ctx.fillRect(px, py, tileSize, tileSize);
                    // Motif de points pour effet texture
                    ctx.fillStyle = 'rgba(0,0,0,0.3)';
                    for (let i = 0; i < 3; i++) {
                        ctx.fillRect(px + 5 + i * 10, py + 5, 3, 3);
                        ctx.fillRect(px + 10 + i * 10, py + 15, 3, 3);
                    }
                    break;

                case TILE.WALL:
                    // Mur (bleu)
                    ctx.fillStyle = FRANK_CONFIG.COLORS.BLUE;
                    ctx.fillRect(px, py, tileSize, tileSize);
                    ctx.strokeStyle = FRANK_CONFIG.COLORS.CYAN;
                    ctx.lineWidth = 2;
                    ctx.strokeRect(px + 2, py + 2, tileSize - 4, tileSize - 4);
                    break;

                case TILE.FRUIT:
                    // Fruit (cerise rouge)
                    ctx.fillStyle = FRANK_CONFIG.COLORS.RED;
                    ctx.beginPath();
                    ctx.arc(px + tileSize / 2, py + tileSize / 2, 8, 0, Math.PI * 2);
                    ctx.fill();
                    // Reflet blanc
                    ctx.fillStyle = FRANK_CONFIG.COLORS.WHITE;
                    ctx.beginPath();
                    ctx.arc(px + tileSize / 2 - 3, py + tileSize / 2 - 3, 3, 0, Math.PI * 2);
                    ctx.fill();
                    break;

                case TILE.NEST:
                    // Nid (jaune avec motif)
                    ctx.fillStyle = FRANK_CONFIG.COLORS.YELLOW;
                    ctx.fillRect(px, py, tileSize, tileSize);
                    ctx.fillStyle = FRANK_CONFIG.COLORS.BLACK;
                    ctx.font = '20px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('🏠', px + tileSize / 2, py + tileSize / 2);
                    break;
            }
        }
    }

    // Dessiner les pommes
    for (const apple of frankState.apples) {
        let px = offsetX + apple.gridX * tileSize;
        let py = offsetY + apple.gridY * tileSize;

        // Effet de tremblement
        if (apple.shaking) {
            const shake = Math.sin(frankState.frameTick * 0.5) * 2;
            px += shake;
        }

        // Pomme rouge
        ctx.fillStyle = FRANK_CONFIG.COLORS.RED;
        ctx.beginPath();
        ctx.arc(px + tileSize / 2, py + tileSize / 2, 12, 0, Math.PI * 2);
        ctx.fill();

        // Reflet blanc
        ctx.fillStyle = FRANK_CONFIG.COLORS.WHITE;
        ctx.beginPath();
        ctx.arc(px + tileSize / 2 - 4, py + tileSize / 2 - 4, 4, 0, Math.PI * 2);
        ctx.fill();

        // Queue
        ctx.strokeStyle = FRANK_CONFIG.COLORS.BROWN;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px + tileSize / 2, py + tileSize / 2 - 12);
        ctx.lineTo(px + tileSize / 2 + 3, py + tileSize / 2 - 16);
        ctx.stroke();
    }

    // Dessiner les ennemis
    for (const enemy of frankState.enemies) {
        const px = offsetX + enemy.gridX * tileSize;
        const py = offsetY + enemy.gridY * tileSize;

        let color = FRANK_CONFIG.COLORS.YELLOW;
        let label = '';

        switch (enemy.type) {
            case ENEMY_TYPE.NEZ:
                color = FRANK_CONFIG.COLORS.YELLOW;
                break;
            case ENEMY_TYPE.AUBERGINE:
                color = FRANK_CONFIG.COLORS.PURPLE;
                break;
            case ENEMY_TYPE.FRAISE:
                color = FRANK_CONFIG.COLORS.BRIGHT_RED;
                break;
            case ENEMY_TYPE.LETTER_B:
                color = FRANK_CONFIG.COLORS.CYAN;
                label = 'B';
                break;
            case ENEMY_TYPE.LETTER_O:
                color = FRANK_CONFIG.COLORS.CYAN;
                label = 'O';
                break;
            case ENEMY_TYPE.LETTER_N:
                color = FRANK_CONFIG.COLORS.CYAN;
                label = 'N';
                break;
            case ENEMY_TYPE.LETTER_U:
                color = FRANK_CONFIG.COLORS.CYAN;
                label = 'U';
                break;
            case ENEMY_TYPE.LETTER_S:
                color = FRANK_CONFIG.COLORS.CYAN;
                label = 'S';
                break;
        }

        // Corps de l'ennemi
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px + tileSize / 2, py + tileSize / 2, 14, 0, Math.PI * 2);
        ctx.fill();

        // Si lettre, afficher
        if (label) {
            ctx.fillStyle = FRANK_CONFIG.COLORS.BLACK;
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, px + tileSize / 2, py + tileSize / 2);
        } else {
            // Yeux
            ctx.fillStyle = FRANK_CONFIG.COLORS.BLACK;
            ctx.beginPath();
            ctx.arc(px + tileSize / 2 - 5, py + tileSize / 2 - 3, 3, 0, Math.PI * 2);
            ctx.arc(px + tileSize / 2 + 5, py + tileSize / 2 - 3, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Dessiner le pépin
    if (frankState.seed) {
        const px = offsetX + frankState.seed.gridX * tileSize;
        const py = offsetY + frankState.seed.gridY * tileSize;

        ctx.fillStyle = FRANK_CONFIG.COLORS.BROWN;
        ctx.beginPath();
        ctx.arc(px + tileSize / 2, py + tileSize / 2, 6, 0, Math.PI * 2);
        ctx.fill();

        // Reflet
        ctx.fillStyle = FRANK_CONFIG.COLORS.WHITE;
        ctx.beginPath();
        ctx.arc(px + tileSize / 2 - 2, py + tileSize / 2 - 2, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Dessiner Frank
    drawFrank(ctx, offsetX, offsetY);

    // UI : Score et lettres BONUS
    ctx.fillStyle = FRANK_CONFIG.COLORS.GOLD;
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${frankState.score}`, offsetX + 10, offsetY - 40);
    ctx.fillText(`FRUITS: ${frankState.fruitsCollected}/${frankState.fruitsTotal}`, offsetX + 200, offsetY - 40);

    // Lettres BONUS
    const letters = ['B', 'O', 'N', 'U', 'S'];
    let bonusX = offsetX + 400;
    for (const letter of letters) {
        const collected = frankState.bonusLetters[letter];
        ctx.fillStyle = collected ? FRANK_CONFIG.COLORS.GOLD : 'rgba(255,215,0,0.3)';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(letter, bonusX, offsetY - 40);
        bonusX += 30;
    }

    // Indicateur de pépin
    ctx.fillStyle = frankState.seedAvailable ? FRANK_CONFIG.COLORS.GREEN : FRANK_CONFIG.COLORS.RED;
    ctx.beginPath();
    ctx.arc(offsetX + FRANK_CONFIG.GRID_WIDTH * tileSize - 30, offsetY - 40, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = FRANK_CONFIG.COLORS.WHITE;
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PÉPIN', offsetX + FRANK_CONFIG.GRID_WIDTH * tileSize - 30, offsetY - 55);
}

// ===== DESSINER FRANK =====
function drawFrank(ctx, offsetX, offsetY) {
    if (frankState.frank.dead) return;

    const frank = frankState.frank;
    const tileSize = FRANK_CONFIG.TILE_SIZE;

    // Position pixel (interpolée pendant le mouvement)
    let px, py;
    if (frank.moving) {
        px = offsetX + frank.pixelX;
        py = offsetY + frank.pixelY;
    } else {
        px = offsetX + frank.gridX * tileSize;
        py = offsetY + frank.gridY * tileSize;
    }

    const cx = px + tileSize / 2;
    const cy = py + tileSize / 2;

    ctx.save();

    // Flip horizontal si regarde à gauche
    if (!frank.facingRight) {
        ctx.translate(cx, 0);
        ctx.scale(-1, 1);
        ctx.translate(-cx, 0);
    }

    // Corps (bleu)
    ctx.fillStyle = FRANK_CONFIG.COLORS.BLUE;
    ctx.fillRect(cx - 8, cy - 5, 16, 18);

    // Tête (rose)
    ctx.fillStyle = FRANK_CONFIG.COLORS.PINK;
    ctx.beginPath();
    ctx.arc(cx, cy - 15, 10, 0, Math.PI * 2);
    ctx.fill();

    // Chapeau (rouge)
    ctx.fillStyle = FRANK_CONFIG.COLORS.RED;
    ctx.fillRect(cx - 10, cy - 22, 20, 8);
    ctx.fillRect(cx - 6, cy - 28, 12, 6);

    // Yeux
    ctx.fillStyle = FRANK_CONFIG.COLORS.BLACK;
    ctx.beginPath();
    ctx.arc(cx - 4, cy - 15, 2, 0, Math.PI * 2);
    ctx.arc(cx + 4, cy - 15, 2, 0, Math.PI * 2);
    ctx.fill();

    // Jambes (animation simple 2-frame)
    ctx.fillStyle = FRANK_CONFIG.COLORS.BLUE;
    if (frank.moving) {
        const leg = Math.floor(frank.animFrame / 10) % 2;
        if (leg === 0) {
            ctx.fillRect(cx - 7, cy + 13, 5, 8);
            ctx.fillRect(cx + 2, cy + 13, 5, 8);
        } else {
            ctx.fillRect(cx - 6, cy + 13, 5, 8);
            ctx.fillRect(cx + 1, cy + 13, 5, 8);
        }
    } else {
        ctx.fillRect(cx - 6, cy + 13, 5, 8);
        ctx.fillRect(cx + 1, cy + 13, 5, 8);
    }

    ctx.restore();
}

// ===== GESTION DES TOUCHES POUR TIRER =====
function handleFruityFrankInput(e, pressed) {
    if (state.level !== 11 || !LEVELS[11].fruityFrankLevel) return;

    // Barre d'espace pour tirer le pépin
    if (pressed && (e.key === ' ' || e.code === 'Space')) {
        shootSeed();
        e.preventDefault();
    }
}
