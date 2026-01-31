// ============================================================
// FRUITY FRANK ENGINE - Style Amstrad CPC authentique
// Inspiré du jeu original Fruity Frank
// ============================================================

// ===== CONFIGURATION DE LA GRILLE =====
const FRANK_CONFIG = {
    GRID_WIDTH: 20,      // Largeur de la grille en tiles
    GRID_HEIGHT: 15,     // Hauteur de la grille en tiles
    TILE_SIZE: 32,       // Taille d'une tile en pixels

    // Vitesses de mouvement
    FRANK_SPEED: 3,      // Vitesse de Frank
    ENEMY_SPEED: 1.5,    // Vitesse des monstres

    // Timers
    APPLE_SHAKE_DURATION: 40,   // Frames de tremblement avant chute
    MONSTER_SPAWN_INTERVAL: 300, // Spawn d'ennemi (5 sec)

    // Couleurs Amstrad CPC authentiques
    COLORS: {
        BLACK: '#000000',
        BRICK_RED: '#CC0000',
        BRICK_DARK: '#880000',
        BRICK_MORTAR: '#553333',
        DIRT_GREEN: '#00AA00',
        DIRT_DARK: '#006600',
        DIRT_LEAF: '#00CC00',
        YELLOW: '#FFCC00',
        YELLOW_DARK: '#CC9900',
        PURPLE: '#AA00AA',
        PURPLE_DARK: '#660066',
        CHERRY_RED: '#FF0000',
        CHERRY_DARK: '#AA0000',
        BANANA_YELLOW: '#FFFF00',
        BANANA_DARK: '#CCAA00',
        STRAWBERRY_RED: '#FF3366',
        STRAWBERRY_DARK: '#CC0033',
        WHITE: '#FFFFFF',
        STEM_GREEN: '#00AA00',
        STEM_BROWN: '#884422'
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
    NEST: 7             // Nid des monstres
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
        mouthOpen: true
    },

    // Pommes avec physique
    apples: [],

    // Monstres violets
    monsters: [],

    // Score et progression
    score: 0,
    fruitsCollected: 0,
    fruitsTotal: 0,

    // Nid
    nest: { gridX: 10, gridY: 7 },
    spawnTimer: 0,

    // Animation
    frameTick: 0,

    // Niveau actif
    initialized: false
};

// ===== NIVEAU PRÉDÉFINI (Design style Amstrad CPC) =====
const FRUITY_FRANK_LEVEL = [
    "WWWWWWWWWWWWWWWWWWWW",
    "W......C.....C.....W",
    "W.DD.DDDDDD.DDDD.D.W",
    "W.DD.D....D.D..D.D.W",
    "W.DD.D.AA.D.D..D.D.W",
    "W....D.AA.D....D...W",
    "W.DDDD....DDDDDD.DDW",
    "WS...D..N...D....S.W",
    "W.DDDD......DDDD.DDW",
    "W....D.AA.D....D...W",
    "W.DD.D.AA.D.D..D.D.W",
    "W.DD.D....D.D..D.D.W",
    "W.DD.DDDDDD.DDDD.D.W",
    "WF.....B.....B....FW",
    "WWWWWWWWWWWWWWWWWWWW"
];
// Légende: W=Mur, D=Terre, .=Vide, A=Pomme, C=Cerise, S=Fraise, B=Banane, N=Nid, F=Frank spawn

// ===== INITIALISATION =====
function initFruityFrankGrid() {
    frankState.grid = [];
    frankState.apples = [];
    frankState.monsters = [];
    frankState.spawnTimer = 0;
    frankState.frameTick = 0;
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
                case 'N':
                    frankState.grid[y][x] = TILE.NEST;
                    frankState.nest = { gridX: x, gridY: y };
                    break;
                case 'F':
                    frankState.grid[y][x] = TILE.EMPTY;
                    frankStartX = x;
                    frankStartY = y;
                    break;
                default:
                    frankState.grid[y][x] = TILE.EMPTY;
            }
        }
    }

    // Initialiser Frank
    frankState.frank.gridX = frankStartX;
    frankState.frank.gridY = frankStartY;
    frankState.frank.targetX = frankStartX;
    frankState.frank.targetY = frankStartY;
    frankState.frank.pixelX = frankStartX * FRANK_CONFIG.TILE_SIZE;
    frankState.frank.pixelY = frankStartY * FRANK_CONFIG.TILE_SIZE;
    frankState.frank.moving = false;
    frankState.frank.dead = false;
    frankState.frank.animFrame = 0;

    // Spawn initial de monstres
    spawnMonster();
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
        direction: ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)],
        animFrame: 0,
        canDig: Math.random() > 0.5 // 50% des monstres peuvent creuser
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

    // Mouvement de Frank
    updateFrankMovement();

    // Physique des pommes
    updateApples();

    // Update des monstres
    updateMonsters();

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

        // Lecture des touches
        if (keys.up && canFrankMove(frank.gridX, frank.gridY - 1)) {
            nextY--;
            frank.direction = 'up';
        } else if (keys.down && canFrankMove(frank.gridX, frank.gridY + 1)) {
            nextY++;
            frank.direction = 'down';
        } else if (keys.left && canFrankMove(frank.gridX - 1, frank.gridY)) {
            nextX--;
            frank.direction = 'left';
            frank.facingRight = false;
        } else if (keys.right && canFrankMove(frank.gridX + 1, frank.gridY)) {
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
            } else if (tile === TILE.CHERRY || tile === TILE.STRAWBERRY || tile === TILE.BANANA) {
                // Collecter fruit
                frankState.grid[frank.gridY][frank.gridX] = TILE.EMPTY;
                frankState.fruitsCollected++;
                frankState.score += 100;
                if (typeof AudioSystem !== 'undefined') AudioSystem.play('powerup');
                if (typeof ParticleSystem !== 'undefined') {
                    ParticleSystem.emit(
                        frank.pixelX + tileSize / 2,
                        frank.pixelY + tileSize / 2,
                        'coin', 15
                    );
                }
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

    // Frank peut traverser: EMPTY, DIRT, CHERRY, STRAWBERRY, BANANA
    // Frank NE PEUT PAS traverser: WALL, APPLE, NEST
    return tile !== TILE.WALL && tile !== TILE.APPLE && tile !== TILE.NEST;
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
                        if (typeof ParticleSystem !== 'undefined') {
                            ParticleSystem.emit(
                                monster.pixelX + tileSize / 2,
                                monster.pixelY + tileSize / 2,
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
                if (apple.shakeTimer <= 0) {
                    // Commencer la chute
                    apple.shaking = false;
                    apple.falling = true;
                    apple.fallSpeed = 1;
                    frankState.grid[apple.gridY][apple.gridX] = TILE.EMPTY;
                }
            }
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

        // IA simple: se diriger vers Frank
        const dx = frank.gridX - Math.round(monster.gridX);
        const dy = frank.gridY - Math.round(monster.gridY);

        // Changer de direction occasionnellement ou si bloqué
        if (Math.random() < 0.02) {
            if (Math.abs(dx) > Math.abs(dy)) {
                monster.direction = dx > 0 ? 'right' : 'left';
            } else {
                monster.direction = dy > 0 ? 'down' : 'up';
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
    if (typeof ParticleSystem !== 'undefined') {
        ParticleSystem.emit(
            frankState.frank.pixelX + FRANK_CONFIG.TILE_SIZE / 2,
            frankState.frank.pixelY + FRANK_CONFIG.TILE_SIZE / 2,
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
                initFruityFrankGrid();
            }
        }
    }, 1000);
}

// ===== DESSIN =====
function drawFruityFrank(ctx, offsetX, offsetY) {
    const tileSize = FRANK_CONFIG.TILE_SIZE;
    const colors = FRANK_CONFIG.COLORS;

    // Fond noir
    ctx.fillStyle = colors.BLACK;
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

    // Dessiner Frank
    if (!frankState.frank.dead) {
        drawFrank(ctx, offsetX, offsetY, tileSize);
    }

    // UI
    drawFruityFrankUI(ctx, offsetX, offsetY);
}

// ===== DESSIN: MUR DE BRIQUES ROUGES =====
function drawBrickWall(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;

    // Fond mortier
    ctx.fillStyle = colors.BRICK_MORTAR;
    ctx.fillRect(px, py, size, size);

    // Briques
    const brickH = size / 4;
    const brickW = size / 2;

    for (let row = 0; row < 4; row++) {
        const offsetBrick = (row % 2) * (brickW / 2);

        for (let col = -1; col < 3; col++) {
            const bx = px + col * brickW + offsetBrick;
            const by = py + row * brickH;

            if (bx >= px && bx < px + size) {
                // Brique principale
                ctx.fillStyle = colors.BRICK_RED;
                ctx.fillRect(
                    Math.max(bx + 1, px),
                    by + 1,
                    Math.min(brickW - 2, px + size - bx - 1),
                    brickH - 2
                );

                // Ombre brique
                ctx.fillStyle = colors.BRICK_DARK;
                ctx.fillRect(
                    Math.max(bx + 1, px),
                    by + brickH - 3,
                    Math.min(brickW - 2, px + size - bx - 1),
                    2
                );
            }
        }
    }
}

// ===== DESSIN: TERRE/FEUILLAGE VERT =====
function drawDirt(ctx, px, py, size, gridX, gridY) {
    const colors = FRANK_CONFIG.COLORS;

    // Fond vert foncé
    ctx.fillStyle = colors.DIRT_DARK;
    ctx.fillRect(px, py, size, size);

    // Motif de feuilles/buissons
    const leafSize = 6;
    const pattern = (gridX + gridY) % 3;

    for (let ly = 0; ly < size; ly += leafSize) {
        for (let lx = 0; lx < size; lx += leafSize) {
            const offset = ((lx + ly + pattern) % 2) * 2;

            // Feuille claire
            ctx.fillStyle = colors.DIRT_GREEN;
            ctx.beginPath();
            ctx.arc(px + lx + leafSize/2 + offset, py + ly + leafSize/2, leafSize/2 - 1, 0, Math.PI * 2);
            ctx.fill();

            // Reflet
            if ((lx + ly) % 12 === 0) {
                ctx.fillStyle = colors.DIRT_LEAF;
                ctx.beginPath();
                ctx.arc(px + lx + leafSize/2 + offset - 1, py + ly + leafSize/2 - 1, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    // Bordure légère
    ctx.strokeStyle = colors.DIRT_DARK;
    ctx.lineWidth = 1;
    ctx.strokeRect(px, py, size, size);
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

// ===== DESSIN: POMME =====
function drawApple(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;
    const cx = px + size / 2;
    const cy = py + size / 2;

    // Corps de la pomme
    ctx.fillStyle = colors.CHERRY_RED;
    ctx.beginPath();
    ctx.arc(cx, cy + 2, 12, 0, Math.PI * 2);
    ctx.fill();

    // Ombre
    ctx.fillStyle = colors.CHERRY_DARK;
    ctx.beginPath();
    ctx.arc(cx + 2, cy + 5, 10, 0, Math.PI);
    ctx.fill();

    // Queue
    ctx.strokeStyle = colors.STEM_BROWN;
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

    // Reflet
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.arc(cx - 4, cy - 2, 3, 0, Math.PI * 2);
    ctx.fill();
}

// ===== DESSIN: NID =====
function drawNest(ctx, px, py, size) {
    const colors = FRANK_CONFIG.COLORS;
    const cx = px + size / 2;
    const cy = py + size / 2;

    // Fond sombre
    ctx.fillStyle = '#330033';
    ctx.fillRect(px, py, size, size);

    // Cercle violet pulsant
    const pulse = Math.sin(frankState.frameTick * 0.1) * 0.2 + 0.8;
    ctx.fillStyle = colors.PURPLE;
    ctx.beginPath();
    ctx.arc(cx, cy, 12 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Centre noir
    ctx.fillStyle = colors.BLACK;
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    // Effet de portail
    ctx.strokeStyle = colors.PURPLE_DARK;
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
        const angle = (frankState.frameTick * 0.05) + (i * Math.PI / 2);
        ctx.beginPath();
        ctx.arc(cx, cy, 10, angle, angle + 0.5);
        ctx.stroke();
    }
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

    // Corps jaune principal (cercle)
    ctx.fillStyle = colors.YELLOW;
    ctx.beginPath();
    ctx.arc(cx, cy, 13, 0, Math.PI * 2);
    ctx.fill();

    // Ombre corps
    ctx.fillStyle = colors.YELLOW_DARK;
    ctx.beginPath();
    ctx.arc(cx + 2, cy + 2, 12, 0, Math.PI);
    ctx.fill();

    // Bouche (ouverte/fermée selon animation)
    if (frank.mouthOpen && frank.moving) {
        // Bouche ouverte style Pac-Man
        ctx.fillStyle = colors.BLACK;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, 13, 0.3, -0.3, true);
        ctx.lineTo(cx, cy);
        ctx.fill();
    } else {
        // Bouche fermée (sourire)
        ctx.strokeStyle = colors.BLACK;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx + 4, cy + 2, 5, 0.2, Math.PI - 0.2);
        ctx.stroke();
    }

    // Oeil
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.arc(cx + 2, cy - 4, 5, 0, Math.PI * 2);
    ctx.fill();

    // Pupille
    ctx.fillStyle = colors.BLACK;
    ctx.beginPath();
    ctx.arc(cx + 4, cy - 4, 2, 0, Math.PI * 2);
    ctx.fill();

    // Reflet oeil
    ctx.fillStyle = colors.WHITE;
    ctx.beginPath();
    ctx.arc(cx + 1, cy - 5, 1, 0, Math.PI * 2);
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

    // Barre supérieure
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(offsetX, offsetY - 50, FRANK_CONFIG.GRID_WIDTH * tileSize, 45);

    // Score
    ctx.fillStyle = colors.YELLOW;
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${frankState.score}`, offsetX + 10, offsetY - 22);

    // Fruits restants
    ctx.fillStyle = colors.CHERRY_RED;
    ctx.fillText(`FRUITS: ${frankState.fruitsCollected}/${frankState.fruitsTotal}`,
        offsetX + 200, offsetY - 22);

    // Vies
    if (typeof state !== 'undefined') {
        ctx.fillStyle = colors.YELLOW;
        ctx.fillText(`VIES: ${state.lives}`, offsetX + 420, offsetY - 22);
    }

    // Instructions
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '12px "Courier New", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('Fleches: Deplacer | Collecter tous les fruits!',
        offsetX + FRANK_CONFIG.GRID_WIDTH * tileSize - 10, offsetY - 22);
}

// ===== GESTION DES TOUCHES =====
function handleFruityFrankInput(e, pressed) {
    // Géré par le système de touches global (keys.up, keys.down, etc.)
}
