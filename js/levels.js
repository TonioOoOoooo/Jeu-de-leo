// ============================================================
// L'AVENTURE DE LÉO - DÉFINITION DES NIVEAUX
// ============================================================

const LEVELS = {
    1: {
        name: "La Prairie",
        bgColor: "#fffdf0",
        playerStart: { x: 50, y: 100 },
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();
            
            // Sol de départ
            level.platforms.push({ x: -100, y: unit * 2, w: 600, h: unit });
            
            // Pièces sur le départ
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: 150 + i * 50, y: unit * 2 - 50, w: 20, h: 20 });
            }
            
            // Plateforme avec pièges
            let trapX = 550, trapY = unit * 3;
            level.platforms.push({ x: trapX, y: trapY, w: unit * 4, h: unit });
            level.hazards.push({ x: trapX + 30, y: trapY - 25, w: 25, h: 25, type: 'spike' });
            level.hazards.push({ x: trapX + 130, y: trapY - 25, w: 25, h: 25, type: 'spike' });
            level.coins.push({ x: trapX + 80, y: trapY - 60, w: 20, h: 20 });
            
            if (state.difficulty > 1.2) {
                level.hazards.push({ x: trapX + 80, y: trapY - 25, w: 25, h: 25, type: 'spike' });
            }
            
            // Toboggan
            let slideX = trapX + unit * 4;
            level.platforms.push({ x: slideX, y: unit * 3, w: unit * 4, h: unit * 2.5, type: 'slide_visual' });
            for (let i = 0; i < 8; i++) {
                level.platforms.push({
                    x: slideX + (i * unit * 0.5),
                    y: unit * 3 + (i * unit * 0.3),
                    w: unit * 0.55,
                    h: unit * 0.4 + 40,
                    type: 'slide'
                });
            }
            
            // Zone zombie
            let zombiePlatX = slideX + unit * 4;
            let zombiePlatY = unit * 5;
            level.platforms.push({ x: zombiePlatX, y: zombiePlatY, w: unit * 8, h: unit });
            level.enemies.push({
                x: zombiePlatX + 200, y: zombiePlatY - 60,
                w: 50, h: 60, type: 'zombie',
                patrolStart: zombiePlatX + 50, patrolEnd: zombiePlatX + unit * 7,
                dir: 1, speed: 2 * state.difficulty
            });
            
            for (let i = 0; i < 5; i++) {
                level.coins.push({ x: zombiePlatX + 50 + i * 80, y: zombiePlatY - 50, w: 20, h: 20 });
            }
            
            // Échelle
            let ladderX = zombiePlatX + unit * 7;
            let floorY = h - unit * 1.5;
            level.ladders.push({ x: ladderX, y: zombiePlatY, w: 60, h: floorY - zombiePlatY });
            
            // Sol final
            level.platforms.push({ x: ladderX - 500, y: floorY, w: w + 1000, h: unit * 2 });
            
            // Coffre monstre
            level.enemies.push({
                x: ladderX - 200, y: floorY - 60,
                w: 60, h: 60, type: 'chest_monster',
                patrolStart: ladderX - 350, patrolEnd: ladderX - 100,
                dir: 1, speed: 2 * state.difficulty
            });
            
            if (state.difficulty > 1.2) {
                level.enemies.push({
                    x: ladderX + 100, y: floorY - 60,
                    w: 60, h: 60, type: 'chest_monster',
                    patrolStart: ladderX, patrolEnd: ladderX + 300,
                    dir: -1, speed: 2.5 * state.difficulty
                });
            }
            
            level.keyItem = { x: ladderX - 400, y: floorY - 50, w: 40, h: 40 };
            level.goal = { x: ladderX + 300, y: floorY - 80, w: 70, h: 80 };
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });
            
            return level;
        }
    },
    
    2: {
        name: "Les Plateformes",
        bgColor: "#e8f4f8",
        playerStart: { x: 20, y: 200 },
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();
            
            level.platforms.push({ x: -50, y: unit * 5, w: 200, h: unit });
            
            // Plateforme mobile horizontale
            level.platforms.push({ x: 150, y: unit * 5, w: 120, h: 20, type: 'moving', vx: 1.5 * state.difficulty, minX: 150, maxX: 400 });
            
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: 180 + i * 30, y: unit * 5 - 40, w: 20, h: 20 });
            }
            
            let midLandX = 450, midLandY = unit * 5;
            level.platforms.push({ x: midLandX, y: midLandY, w: unit * 6, h: unit });
            level.enemies.push({
                x: midLandX + 200, y: midLandY - 60,
                w: 60, h: 60, type: 'chest_monster',
                patrolStart: midLandX, patrolEnd: midLandX + unit * 5,
                dir: 1, speed: 2 * state.difficulty
            });
            
            // Ascenseur
            let liftX = midLandX + unit * 6 + 20;
            level.platforms.push({ x: liftX, y: midLandY, w: 100, h: 20, type: 'moving', vy: -2 * state.difficulty, minY: unit * 2, maxY: midLandY, vx: 0 });
            
            // Plateforme haute
            let topX = liftX + 120;
            level.platforms.push({ x: topX, y: unit * 2, w: unit * 4, h: 20 });
            level.enemies.push({
                x: topX + 50, y: unit * 2 - 60,
                w: 50, h: 60, type: 'zombie',
                patrolStart: topX, patrolEnd: topX + unit * 3,
                dir: 1, speed: 2 * state.difficulty
            });
            
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: topX + 50 + i * 60, y: unit * 2 - 50, w: 20, h: 20 });
            }
            
            level.keyItem = { x: topX + unit * 3, y: unit * 2 - 50, w: 40, h: 40 };
            
            let exitY = h - unit;
            level.platforms.push({ x: midLandX - 200, y: exitY, w: w + 200, h: unit });
            level.goal = { x: topX + 300, y: exitY - 80, w: 70, h: 80 };
            
            // Chemins alternatifs
            level.platforms.push({ x: midLandX - 300, y: exitY, w: 100, h: 20, type: 'moving', vy: -1.5, minY: unit * 5, maxY: exitY, vx: 0 });
            level.platforms.push({ x: midLandX - 400, y: unit * 5, w: 80, h: 20 });
            level.platforms.push({ x: topX + unit * 5, y: unit * 4, w: 100, h: 20 });
            level.platforms.push({ x: topX + unit * 6, y: unit * 6, w: 100, h: 20 });
            
            level.hazards.push({ x: -1000, y: h + 50, w: w * 30, h: 100, type: 'void' });
            
            return level;
        }
    },
    
    3: {
        name: "Le Donjon",
        bgColor: "#2c3e50",
        playerStart: { x: 50, y: 300 },
        needsKey: false, // Pas besoin de clé pour ce niveau
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();
            
            level.platforms.push({ x: -50, y: unit * 6, w: 200, h: unit });
            
            // Îles avec barres de feu
            let isle1 = 250;
            level.platforms.push({ x: isle1, y: unit * 6, w: 100, h: unit });
            level.fireBars.push({ cx: isle1 + 50, cy: unit * 6 + 10, length: 120, angle: 0, speed: 0.05 * state.difficulty });
            level.coins.push({ x: isle1 + 40, y: unit * 6 - 120, w: 20, h: 20 });
            
            let isle2 = 450;
            level.platforms.push({ x: isle2, y: unit * 5, w: 100, h: unit });
            level.fireBars.push({ cx: isle2 + 50, cy: unit * 5 + 10, length: 130, angle: Math.PI, speed: -0.06 * state.difficulty });
            level.coins.push({ x: isle2 + 40, y: unit * 5 - 120, w: 20, h: 20 });
            
            let isle3 = 650;
            level.platforms.push({ x: isle3, y: unit * 4, w: 100, h: unit });
            level.coins.push({ x: isle3 + 40, y: unit * 4 - 50, w: 20, h: 20 });
            
            // Pont final
            let bridgeX = 850;
            level.platforms.push({ x: bridgeX, y: unit * 4, w: 400, h: unit });
            level.enemies.push({
                x: bridgeX + 200, y: unit * 4 - 80,
                w: 80, h: 80, type: 'chest_monster',
                patrolStart: bridgeX, patrolEnd: bridgeX + 300,
                dir: 1, speed: 3 * state.difficulty
            });
            
            for (let i = 0; i < 5; i++) {
                level.coins.push({ x: bridgeX + 50 + i * 60, y: unit * 4 - 50, w: 20, h: 20 });
            }
            
            level.goal = { x: bridgeX + 350, y: unit * 4 - 60, w: 40, h: 60, type: 'axe' };
            level.hazards.push({ x: -1000, y: h - 50, w: w * 30, h: 100, type: 'lava_floor' });
            
            return level;
        }
    },
    
    4: {
        name: "Monde Champignon",
        bgColor: "#5c94fc",
        playerStart: { x: 50, y: 400 },
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();
            
            // Nuages décoratifs
            level.clouds = [];
            for (let i = 0; i < 10; i++) {
                level.clouds.push({ x: Math.random() * w * 4, y: Math.random() * (h / 2), w: 60 + Math.random() * 40 });
            }
            
            let groundY = h - unit;
            level.platforms.push({ x: -50, y: groundY, w: 400, h: unit, type: 'brick_floor' });
            
            for (let i = 0; i < 5; i++) {
                level.coins.push({ x: 80 + i * 60, y: groundY - 50, w: 20, h: 20 });
            }
            
            // Tuyaux
            let pipe1X = 450;
            level.platforms.push({ x: pipe1X, y: groundY - 60, w: 60, h: 60 + unit, type: 'pipe' });
            level.platforms.push({ x: pipe1X + 150, y: groundY, w: 300, h: unit, type: 'brick_floor' });
            
            level.enemies.push({
                x: pipe1X + 200, y: groundY - 60,
                w: 50, h: 60, type: 'zombie',
                patrolStart: pipe1X + 150, patrolEnd: pipe1X + 400,
                dir: -1, speed: 2 * state.difficulty
            });
            
            let pipe2X = pipe1X + 350;
            level.platforms.push({ x: pipe2X, y: groundY - 90, w: 60, h: 90 + unit, type: 'pipe' });
            
            // Blocs
            let bricksX = pipe2X + 200;
            let bricksY = groundY - 150;
            level.platforms.push({ x: bricksX, y: bricksY, w: 180, h: 40, type: 'brick_block' });
            level.platforms.push({ x: bricksX + 250, y: bricksY - 50, w: 40, h: 40, type: 'gold_block' });
            level.keyItem = { x: bricksX + 255, y: bricksY - 100, w: 30, h: 30 };
            
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: bricksX + 20 + i * 45, y: bricksY - 50, w: 20, h: 20 });
            }
            
            // Zone finale
            let endGroundX = bricksX + 400;
            level.platforms.push({ x: endGroundX, y: groundY, w: 600, h: unit, type: 'brick_floor' });
            
            // Escaliers
            let stairsX = endGroundX + 100;
            for (let i = 0; i < 5; i++) {
                level.platforms.push({ x: stairsX + (i * 40), y: groundY - (i * 40) - 40, w: 40, h: 40, type: 'brick_block' });
            }
            
            level.goal = { x: stairsX + 350, y: groundY - 120, w: 10, h: 120, type: 'flag' };
            level.platforms.push({ x: stairsX + 400, y: groundY - 100, w: 100, h: 100, type: 'castle' });
            
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });
            
            return level;
        }
    },
    
    5: {
        name: "Monde Cubique",
        bgColor: "#87CEEB",
        playerStart: { x: 50, y: 300 },
        setup: (w, h) => {
            const blockSize = 40;
            const level = createEmptyLevel();
            
            level.clouds = [];
            for (let i = 0; i < 8; i++) {
                level.clouds.push({ x: Math.random() * w * 3, y: 50 + Math.random() * 150, w: 50 + Math.random() * 40 });
            }
            
            // Sol Minecraft
            for (let i = 0; i < 15; i++) {
                level.platforms.push({ x: i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'grass_block' });
                level.platforms.push({ x: i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'dirt_block' });
            }
            
            // Pièces sur le sol
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: 100 + i * 80, y: h - blockSize * 2 - 50, w: 20, h: 20 });
            }
            
            // Arbre
            let treeX = 300;
            level.platforms.push({ x: treeX, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'wood' });
            level.platforms.push({ x: treeX - blockSize, y: h - blockSize * 7, w: blockSize * 3, h: blockSize * 2, type: 'leaves' });
            level.platforms.push({ x: treeX, y: h - blockSize * 8, w: blockSize, h: blockSize, type: 'leaves' });
            
            level.keyItem = { x: treeX, y: h - blockSize * 9, w: 30, h: 30, type: 'diamond' };
            
            // Zone de lave
            let caveX = 650;
            level.platforms.push({ x: caveX, y: h - blockSize * 4, w: blockSize * 2, h: blockSize, type: 'stone' });
            level.platforms.push({ x: caveX + 150, y: h - blockSize * 2, w: blockSize * 2, h: blockSize, type: 'stone' });
            level.hazards.push({ x: caveX, y: h - 20, w: 400, h: 20, type: 'lava_floor' });
            
            level.coins.push({ x: caveX + 30, y: h - blockSize * 4 - 50, w: 20, h: 20 });
            level.coins.push({ x: caveX + 180, y: h - blockSize * 2 - 50, w: 20, h: 20 });
            
            // Portail du Nether (fin)
            let netherX = caveX + 400;
            level.platforms.push({ x: netherX, y: h - blockSize * 5, w: blockSize * 4, h: blockSize, type: 'netherrack' });
            level.goal = { x: netherX + blockSize, y: h - blockSize * 5 - 80, w: 60, h: 80, type: 'nether_portal' };
            
            level.enemies.push({
                x: netherX + 50, y: h - blockSize * 5 - 60,
                w: 50, h: 60, type: 'zombie',
                patrolStart: netherX, patrolEnd: netherX + 150,
                dir: 1, speed: 2 * state.difficulty
            });
            
            level.hazards.push({ x: -1000, y: h + 100, w: w * 30, h: 100, type: 'void' });
            
            return level;
        }
    },
    
    6: {
        name: "Les Portails",
        bgColor: "#1a1a2e",
        playerStart: { x: 50, y: 400 },
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();
            
            // Plateforme de départ
            level.platforms.push({ x: -50, y: h - unit * 2, w: 300, h: unit, type: 'metal' });
            
            // Portail 1 : téléporte en haut à droite
            level.portals.push({
                x: 200, y: h - unit * 2 - 80, w: 50, h: 80,
                color: '#00FFFF',
                destX: w - 200, destY: unit * 3 - player.h - 10
            });
            
            level.platforms.push({ x: w - 300, y: unit * 3, w: 300, h: 20, type: 'metal' });
            level.enemies.push({
                x: w - 200, y: unit * 3 - 60,
                w: 50, h: 60, type: 'zombie',
                patrolStart: w - 280, patrolEnd: w - 50,
                dir: -1, speed: 2.5 * state.difficulty
            });
            
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: w - 280 + i * 80, y: unit * 3 - 50, w: 20, h: 20 });
            }
            
            // Portail 2 : téléporte à gauche milieu
            level.portals.push({
                x: w - 100, y: unit * 3 - 80, w: 50, h: 80,
                color: '#FF9900',
                destX: 100, destY: unit * 5 - player.h - 10
            });
            
            level.platforms.push({ x: 50, y: unit * 5, w: 300, h: 20, type: 'metal' });
            level.hazards.push({ x: 180, y: unit * 5 - 25, w: 25, h: 25, type: 'spike' });
            level.keyItem = { x: 80, y: unit * 5 - 50, w: 40, h: 40 };
            
            level.coins.push({ x: 250, y: unit * 5 - 50, w: 20, h: 20 });
            
            // Portail 3 : téléporte en bas à droite (sortie)
            level.portals.push({
                x: 300, y: unit * 5 - 80, w: 50, h: 80,
                color: '#CC00FF',
                destX: w - 150, destY: h - unit * 2 - player.h - 10
            });
            
            level.platforms.push({ x: w - 300, y: h - unit * 2, w: 300, h: unit, type: 'metal' });
            level.enemies.push({
                x: w - 250, y: h - unit * 2 - 60,
                w: 60, h: 60, type: 'chest_monster',
                patrolStart: w - 280, patrolEnd: w - 100,
                dir: 1, speed: 2
            });
            
            level.goal = { x: w - 80, y: h - unit * 2 - 80, w: 70, h: 80 };
            
            // Plateforme mobile au centre
            level.platforms.push({ x: w / 2 - 100, y: h - unit, w: 200, h: 20, type: 'moving', vx: 2, minX: 200, maxX: w - 200 });
            
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });
            
            return level;
        }
    },
    
    7: {
        name: "Les Remparts",
        bgColor: "#2d1b4e",
        playerStart: { x: 50, y: 200 },
        needsKey: false,
        setup: (w, h) => {
            const level = createEmptyLevel();
            let wallY = h / 2 + 50;
            
            // Mur de départ
            level.platforms.push({ x: -50, y: wallY, w: 200, h: h, type: 'castle_wall' });
            
            // Créneaux avec trous
            let currentX = 150;
            for (let i = 0; i < 12; i++) {
                let gap = (i % 3 === 1) ? 120 : 0;
                let width = 150 + Math.random() * 80;
                
                if (gap > 0) {
                    level.hazards.push({
                        x: currentX + gap / 2 - 20, y: wallY + 50,
                        w: 40, h: 80, type: 'knight',
                        minY: wallY - 80, maxY: wallY + 100,
                        speed: 2 * state.difficulty, dir: 1
                    });
                }
                
                level.platforms.push({ x: currentX + gap, y: wallY, w: width, h: h, type: 'castle_wall' });
                
                if (i % 2 === 0) {
                    level.coins.push({ x: currentX + gap + width / 2, y: wallY - 50, w: 20, h: 20 });
                }
                
                currentX += gap + width;
            }
            
            // La corde (plateforme mobile rapide)
            let ropeGap = 400;
            level.platforms.push({
                x: currentX + 50, y: wallY - 50, w: 60, h: 10,
                type: 'moving', vx: 4 * state.difficulty,
                minX: currentX + 50, maxX: currentX + ropeGap - 50
            });
            
            level.platforms.push({ x: currentX + ropeGap, y: wallY, w: 300, h: h, type: 'castle_wall' });
            
            // Cloche (fin)
            level.goal = { x: currentX + ropeGap + 150, y: wallY - 100, w: 60, h: 80, type: 'bell' };
            
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });
            
            return level;
        }
    },
    
    8: {
        name: "Royaume des Rêves",
        bgColor: "#9290FF",
        playerStart: { x: 50, y: 400 },
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();
            
            let groundY = h - unit;
            
            // Sol SMB2
            level.platforms.push({ x: -50, y: groundY, w: 300, h: unit, type: 'smb2_grass' });
            
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: 80 + i * 60, y: groundY - 50, w: 20, h: 20 });
            }
            
            // Vase
            level.platforms.push({ x: 300, y: groundY - 60, w: 50, h: 60 + unit, type: 'jar' });
            
            // Bûches flottantes
            level.platforms.push({ x: 400, y: groundY - 120, w: 100, h: 20, type: 'smb2_log' });
            level.platforms.push({ x: 550, y: groundY - 180, w: 100, h: 20, type: 'smb2_log' });
            
            // Maskass
            level.enemies.push({
                x: 600, y: groundY - 180 - 60,
                w: 40, h: 40, type: 'shy_guy',
                patrolStart: 550, patrolEnd: 650,
                dir: 1, speed: 2 * state.difficulty
            });
            
            level.coins.push({ x: 420, y: groundY - 170, w: 20, h: 20 });
            level.coins.push({ x: 570, y: groundY - 230, w: 20, h: 20 });
            
            // Sol plus loin
            level.platforms.push({ x: 700, y: groundY, w: 500, h: unit, type: 'smb2_grass' });
            
            // Navet (clé) en haut
            level.platforms.push({ x: 800, y: groundY - 250, w: 80, h: 20, type: 'smb2_log' });
            level.keyItem = { x: 820, y: groundY - 300, w: 30, h: 30, type: 'turnip' };
            
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: 720 + i * 80, y: groundY - 50, w: 20, h: 20 });
            }
            
            // Tête de Faucon (porte)
            level.goal = { x: 1000, y: groundY - 100, w: 80, h: 100, type: 'hawkmouth' };
            
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });
            
            return level;
        }
    },
    
    9: {
        name: "BOSS FINAL",
        bgColor: "#1a0a0a",
        playerStart: { x: 100, y: 400 },
        isBoss: true,
        needsKey: false,
        setup: (w, h) => {
            const level = createEmptyLevel();
            
            // Arène du boss
            let floorY = h - 80;
            level.platforms.push({ x: -50, y: floorY, w: w + 100, h: 100, type: 'boss_floor' });
            
            // Plateformes d'esquive
            level.platforms.push({ x: 150, y: floorY - 150, w: 120, h: 20 });
            level.platforms.push({ x: w - 270, y: floorY - 150, w: 120, h: 20 });
            level.platforms.push({ x: w / 2 - 60, y: floorY - 280, w: 120, h: 20 });
            
            // Boss
            level.boss = {
                x: w - 200, y: floorY - 180,
                w: 150, h: 180,
                hp: 5,
                maxHp: 5,
                phase: 1,
                attackTimer: 0,
                invincible: 0,
                dir: -1,
                state: 'idle'
            };
            
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });
            
            return level;
        }
    }
};

// Helper pour créer un niveau vide
function createEmptyLevel() {
    return {
        platforms: [],
        hazards: [],
        enemies: [],
        ladders: [],
        coins: [],
        fireBars: [],
        portals: [],
        projectiles: [],
        clouds: []
    };
}
