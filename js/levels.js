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
            
            level.platforms.push({ x: -100, y: unit * 2, w: 600, h: unit });
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: 150 + i * 50, y: unit * 2 - 50, w: 20, h: 20 });
            }
            
            let trapX = 550, trapY = unit * 3;
            level.platforms.push({ x: trapX, y: trapY, w: unit * 4, h: unit });
            level.hazards.push({ x: trapX + 30, y: trapY - 25, w: 25, h: 25, type: 'spike' });
            level.hazards.push({ x: trapX + 130, y: trapY - 25, w: 25, h: 25, type: 'spike' });
            level.coins.push({ x: trapX + 80, y: trapY - 60, w: 20, h: 20 });
            
            let slideX = trapX + unit * 4;
            level.platforms.push({ x: slideX, y: unit * 3, w: unit * 4, h: unit * 2.5, type: 'slide_visual' });
            for (let i = 0; i < 8; i++) {
                level.platforms.push({ x: slideX + (i * unit * 0.5), y: unit * 3 + (i * unit * 0.3), w: unit * 0.55, h: unit * 0.4 + 40, type: 'slide' });
            }
            
            let zombiePlatX = slideX + unit * 4;
            let zombiePlatY = unit * 5;
            level.platforms.push({ x: zombiePlatX, y: zombiePlatY, w: unit * 8, h: unit });
            level.enemies.push({ x: zombiePlatX + 200, y: zombiePlatY - 60, w: 50, h: 60, type: 'zombie', patrolStart: zombiePlatX + 50, patrolEnd: zombiePlatX + unit * 7, dir: 1, speed: 2 * state.difficulty });
            
            for (let i = 0; i < 5; i++) {
                level.coins.push({ x: zombiePlatX + 50 + i * 80, y: zombiePlatY - 50, w: 20, h: 20 });
            }
            
            let ladderX = zombiePlatX + unit * 7;
            let floorY = h - unit * 1.5;
            level.ladders.push({ x: ladderX, y: zombiePlatY, w: 60, h: floorY - zombiePlatY });
            level.platforms.push({ x: ladderX - 500, y: floorY, w: w + 1000, h: unit * 2 });
            
            level.enemies.push({ x: ladderX - 200, y: floorY - 60, w: 60, h: 60, type: 'chest_monster', patrolStart: ladderX - 350, patrolEnd: ladderX - 100, dir: 1, speed: 2 * state.difficulty });
            
            level.keyItem = { x: ladderX - 400, y: floorY - 50, w: 40, h: 40 };
            level.goal = { x: ladderX + 300, y: floorY - 80, w: 70, h: 80 };
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });

            // Power-up bouclier pour apprendre
            level.powerups.push({ x: zombiePlatX + 350, y: zombiePlatY - 70, w: 35, h: 35, type: 'shield' });

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
            level.platforms.push({ x: 150, y: unit * 5, w: 120, h: 20, type: 'moving', vx: 1.5 * state.difficulty, minX: 150, maxX: 400 });
            for (let i = 0; i < 3; i++) level.coins.push({ x: 180 + i * 30, y: unit * 5 - 40, w: 20, h: 20 });
            
            let midLandX = 450, midLandY = unit * 5;
            level.platforms.push({ x: midLandX, y: midLandY, w: unit * 6, h: unit });
            level.enemies.push({ x: midLandX + 200, y: midLandY - 60, w: 60, h: 60, type: 'chest_monster', patrolStart: midLandX, patrolEnd: midLandX + unit * 5, dir: 1, speed: 2 * state.difficulty });
            
            let liftX = midLandX + unit * 6 + 20;
            level.platforms.push({ x: liftX, y: midLandY, w: 100, h: 20, type: 'moving', vy: -2 * state.difficulty, minY: unit * 2, maxY: midLandY, vx: 0 });
            
            let topX = liftX + 120;
            level.platforms.push({ x: topX, y: unit * 2, w: unit * 4, h: 20 });
            level.enemies.push({ x: topX + 50, y: unit * 2 - 60, w: 50, h: 60, type: 'zombie', patrolStart: topX, patrolEnd: topX + unit * 3, dir: 1, speed: 2 * state.difficulty });
            for (let i = 0; i < 4; i++) level.coins.push({ x: topX + 50 + i * 60, y: unit * 2 - 50, w: 20, h: 20 });
            
            level.keyItem = { x: topX + unit * 3, y: unit * 2 - 50, w: 40, h: 40 };
            let exitY = h - unit;
            level.platforms.push({ x: midLandX - 200, y: exitY, w: w + 200, h: unit });
            level.goal = { x: topX + 300, y: exitY - 80, w: 70, h: 80 };
            level.hazards.push({ x: -1000, y: h + 50, w: w * 30, h: 100, type: 'void' });

            // Power-up super saut sur la plateforme mobile
            level.powerups.push({ x: liftX + 25, y: midLandY - 60, w: 35, h: 35, type: 'super_jump' });

            return level;
        }
    },
    
    3: {
        name: "Le Donjon",
        bgColor: "#2c3e50",
        playerStart: { x: 50, y: 300 },
        needsKey: false,
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();
            
            level.platforms.push({ x: -50, y: unit * 6, w: 200, h: unit });
            
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
            
            let bridgeX = 850;
            level.platforms.push({ x: bridgeX, y: unit * 4, w: 400, h: unit });
            level.enemies.push({ x: bridgeX + 200, y: unit * 4 - 80, w: 80, h: 80, type: 'chest_monster', patrolStart: bridgeX, patrolEnd: bridgeX + 300, dir: 1, speed: 3 * state.difficulty });
            for (let i = 0; i < 5; i++) level.coins.push({ x: bridgeX + 50 + i * 60, y: unit * 4 - 50, w: 20, h: 20 });
            
            level.goal = { x: bridgeX + 350, y: unit * 4 - 60, w: 40, h: 60, type: 'axe' };
            level.hazards.push({ x: -1000, y: h - 50, w: w * 30, h: 100, type: 'lava_floor' });

            // Power-up étoile pour traverser les obstacles
            level.powerups.push({ x: isle2 + 40, y: unit * 5 - 70, w: 35, h: 35, type: 'star' });

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
            
            level.clouds = [];
            for (let i = 0; i < 10; i++) level.clouds.push({ x: Math.random() * w * 4, y: Math.random() * (h / 2), w: 60 + Math.random() * 40 });
            
            let groundY = h - unit;
            level.platforms.push({ x: -50, y: groundY, w: 400, h: unit, type: 'brick_floor' });
            for (let i = 0; i < 5; i++) level.coins.push({ x: 80 + i * 60, y: groundY - 50, w: 20, h: 20 });
            
            let pipe1X = 450;
            level.platforms.push({ x: pipe1X, y: groundY - 60, w: 60, h: 60 + unit, type: 'pipe' });
            level.platforms.push({ x: pipe1X + 150, y: groundY, w: 300, h: unit, type: 'brick_floor' });
            level.enemies.push({ x: pipe1X + 200, y: groundY - 60, w: 50, h: 60, type: 'zombie', patrolStart: pipe1X + 150, patrolEnd: pipe1X + 400, dir: -1, speed: 2 * state.difficulty });
            
            let pipe2X = pipe1X + 350;
            level.platforms.push({ x: pipe2X, y: groundY - 90, w: 60, h: 90 + unit, type: 'pipe' });
            
            let bricksX = pipe2X + 200, bricksY = groundY - 150;
            level.platforms.push({ x: bricksX, y: bricksY, w: 180, h: 40, type: 'brick_block' });
            level.platforms.push({ x: bricksX + 250, y: bricksY - 50, w: 40, h: 40, type: 'gold_block' });
            level.keyItem = { x: bricksX + 255, y: bricksY - 100, w: 30, h: 30 };
            for (let i = 0; i < 4; i++) level.coins.push({ x: bricksX + 20 + i * 45, y: bricksY - 50, w: 20, h: 20 });
            
            let endGroundX = bricksX + 400;
            level.platforms.push({ x: endGroundX, y: groundY, w: 600, h: unit, type: 'brick_floor' });
            let stairsX = endGroundX + 100;
            for (let i = 0; i < 5; i++) level.platforms.push({ x: stairsX + (i * 40), y: groundY - (i * 40) - 40, w: 40, h: 40, type: 'brick_block' });
            
            level.goal = { x: stairsX + 350, y: groundY - 120, w: 10, h: 120, type: 'flag' };
            level.platforms.push({ x: stairsX + 400, y: groundY - 100, w: 100, h: 100, type: 'castle' });
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });

            // Power-up aimant à pièces sur le bloc doré
            level.powerups.push({ x: bricksX + 255, y: bricksY - 140, w: 35, h: 35, type: 'magnet' });

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
            for (let i = 0; i < 8; i++) level.clouds.push({ x: Math.random() * w * 3, y: 50 + Math.random() * 150, w: 50 + Math.random() * 40 });
            
            for (let i = 0; i < 15; i++) {
                level.platforms.push({ x: i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'grass_block' });
                level.platforms.push({ x: i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'dirt_block' });
            }
            for (let i = 0; i < 4; i++) level.coins.push({ x: 100 + i * 80, y: h - blockSize * 2 - 50, w: 20, h: 20 });
            
            let treeX = 300;
            level.platforms.push({ x: treeX, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'wood' });
            level.platforms.push({ x: treeX - blockSize, y: h - blockSize * 7, w: blockSize * 3, h: blockSize * 2, type: 'leaves' });
            level.platforms.push({ x: treeX, y: h - blockSize * 8, w: blockSize, h: blockSize, type: 'leaves' });
            level.keyItem = { x: treeX, y: h - blockSize * 9, w: 30, h: 30, type: 'diamond' };
            
            let caveX = 650;
            level.platforms.push({ x: caveX, y: h - blockSize * 4, w: blockSize * 2, h: blockSize, type: 'stone' });
            level.platforms.push({ x: caveX + 150, y: h - blockSize * 2, w: blockSize * 2, h: blockSize, type: 'stone' });
            level.hazards.push({ x: caveX, y: h - 20, w: 400, h: 20, type: 'lava_floor' });
            level.coins.push({ x: caveX + 30, y: h - blockSize * 4 - 50, w: 20, h: 20 });
            level.coins.push({ x: caveX + 180, y: h - blockSize * 2 - 50, w: 20, h: 20 });
            
            let netherX = caveX + 400;
            level.platforms.push({ x: netherX, y: h - blockSize * 5, w: blockSize * 4, h: blockSize, type: 'netherrack' });
            level.goal = { x: netherX + blockSize, y: h - blockSize * 5 - 80, w: 60, h: 80, type: 'nether_portal' };
            level.enemies.push({ x: netherX + 50, y: h - blockSize * 5 - 60, w: 50, h: 60, type: 'zombie', patrolStart: netherX, patrolEnd: netherX + 150, dir: 1, speed: 2 * state.difficulty });
            level.hazards.push({ x: -1000, y: h + 100, w: w * 30, h: 100, type: 'void' });

            // Power-up bouclier dans l'arbre
            level.powerups.push({ x: treeX, y: h - blockSize * 6, w: 35, h: 35, type: 'shield' });

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
            
            level.platforms.push({ x: -50, y: h - unit * 2, w: 300, h: unit, type: 'metal' });
            level.portals.push({ x: 200, y: h - unit * 2 - 80, w: 50, h: 80, color: '#00FFFF', destX: w - 200, destY: unit * 3 - 58 });
            
            level.platforms.push({ x: w - 300, y: unit * 3, w: 300, h: 20, type: 'metal' });
            level.enemies.push({ x: w - 200, y: unit * 3 - 60, w: 50, h: 60, type: 'zombie', patrolStart: w - 280, patrolEnd: w - 50, dir: -1, speed: 2.5 * state.difficulty });
            for (let i = 0; i < 3; i++) level.coins.push({ x: w - 280 + i * 80, y: unit * 3 - 50, w: 20, h: 20 });
            
            level.portals.push({ x: w - 100, y: unit * 3 - 80, w: 50, h: 80, color: '#FF9900', destX: 100, destY: unit * 5 - 58 });
            level.platforms.push({ x: 50, y: unit * 5, w: 300, h: 20, type: 'metal' });
            level.hazards.push({ x: 180, y: unit * 5 - 25, w: 25, h: 25, type: 'spike' });
            level.keyItem = { x: 80, y: unit * 5 - 50, w: 40, h: 40 };
            level.coins.push({ x: 250, y: unit * 5 - 50, w: 20, h: 20 });
            
            level.portals.push({ x: 300, y: unit * 5 - 80, w: 50, h: 80, color: '#CC00FF', destX: w - 150, destY: h - unit * 2 - 58 });
            level.platforms.push({ x: w - 300, y: h - unit * 2, w: 300, h: unit, type: 'metal' });
            level.enemies.push({ x: w - 250, y: h - unit * 2 - 60, w: 60, h: 60, type: 'chest_monster', patrolStart: w - 280, patrolEnd: w - 100, dir: 1, speed: 2 });
            
            level.goal = { x: w - 80, y: h - unit * 2 - 80, w: 70, h: 80 };
            level.platforms.push({ x: w / 2 - 100, y: h - unit, w: 200, h: 20, type: 'moving', vx: 2, minX: 200, maxX: w - 200 });
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });

            // Power-up super saut près du premier portail
            level.powerups.push({ x: 220, y: h - unit * 2 - 130, w: 35, h: 35, type: 'super_jump' });

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
            
            level.platforms.push({ x: -50, y: wallY, w: 200, h: h, type: 'castle_wall' });
            
            let currentX = 150;
            for (let i = 0; i < 12; i++) {
                let gap = (i % 3 === 1) ? 120 : 0;
                let width = 150 + Math.random() * 80;
                
                if (gap > 0) {
                    level.hazards.push({ x: currentX + gap / 2 - 20, y: wallY + 50, w: 40, h: 80, type: 'knight', minY: wallY - 80, maxY: wallY + 100, speed: 2 * state.difficulty, dir: 1 });
                }
                
                level.platforms.push({ x: currentX + gap, y: wallY, w: width, h: h, type: 'castle_wall' });
                if (i % 2 === 0) level.coins.push({ x: currentX + gap + width / 2, y: wallY - 50, w: 20, h: 20 });
                currentX += gap + width;
            }
            
            let ropeGap = 400;
            level.platforms.push({ x: currentX + 50, y: wallY - 50, w: 60, h: 10, type: 'moving', vx: 4 * state.difficulty, minX: currentX + 50, maxX: currentX + ropeGap - 50 });
            level.platforms.push({ x: currentX + ropeGap, y: wallY, w: 300, h: h, type: 'castle_wall' });
            level.goal = { x: currentX + ropeGap + 150, y: wallY - 100, w: 60, h: 80, type: 'bell' };
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });

            // Power-up étoile d'invincibilité pour traverser les dangers
            level.powerups.push({ x: currentX / 2, y: wallY - 90, w: 35, h: 35, type: 'star' });

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
            level.platforms.push({ x: -50, y: groundY, w: 300, h: unit, type: 'smb2_grass' });
            for (let i = 0; i < 3; i++) level.coins.push({ x: 80 + i * 60, y: groundY - 50, w: 20, h: 20 });
            
            level.platforms.push({ x: 300, y: groundY - 60, w: 50, h: 60 + unit, type: 'jar' });
            level.platforms.push({ x: 400, y: groundY - 120, w: 100, h: 20, type: 'smb2_log' });
            level.platforms.push({ x: 550, y: groundY - 180, w: 100, h: 20, type: 'smb2_log' });
            level.enemies.push({ x: 600, y: groundY - 180 - 60, w: 40, h: 40, type: 'shy_guy', patrolStart: 550, patrolEnd: 650, dir: 1, speed: 2 * state.difficulty });
            level.coins.push({ x: 420, y: groundY - 170, w: 20, h: 20 });
            level.coins.push({ x: 570, y: groundY - 230, w: 20, h: 20 });
            
            level.platforms.push({ x: 700, y: groundY, w: 500, h: unit, type: 'smb2_grass' });
            level.platforms.push({ x: 800, y: groundY - 250, w: 80, h: 20, type: 'smb2_log' });
            level.keyItem = { x: 820, y: groundY - 300, w: 30, h: 30, type: 'turnip' };
            for (let i = 0; i < 4; i++) level.coins.push({ x: 720 + i * 80, y: groundY - 50, w: 20, h: 20 });
            
            level.goal = { x: 1000, y: groundY - 100, w: 80, h: 100, type: 'hawkmouth' };
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });

            // Power-up aimant et bouclier
            level.powerups.push({ x: 570, y: groundY - 230, w: 35, h: 35, type: 'magnet' });
            level.powerups.push({ x: 900, y: groundY - 70, w: 35, h: 35, type: 'shield' });

            return level;
        }
    },
    
    // ========================================
    // NIVEAU 9 - ÉPIQUE FINAL !
    // Zone Sonic + Boss Multi-Phases
    // ========================================
    9: {
        name: "⚡ ZONE FINALE ⚡",
        bgColor: "#0a0a2e",
        playerStart: { x: 80, y: 400 },
        isBoss: true,
        needsKey: false,
        setup: (w, h) => {
            const level = createEmptyLevel();
            const groundY = h - 60;
            
            // Étoiles en arrière-plan
            level.stars = [];
            for (let i = 0; i < 150; i++) {
                level.stars.push({
                    x: Math.random() * 4000,
                    y: Math.random() * h * 0.8,
                    size: Math.random() * 2 + 1,
                    twinkle: Math.random() * Math.PI * 2
                });
            }
            
            // ===== PARTIE 1 : ZONE SONIC =====
            
            // Sol de départ
            level.platforms.push({ x: -50, y: groundY, w: 400, h: 80, type: 'sonic_ground' });
            
            // Rings de départ
            for (let i = 0; i < 5; i++) {
                level.coins.push({ x: 100 + i * 50, y: groundY - 60, w: 25, h: 25, type: 'ring' });
            }
            
            // Premier ressort
            level.platforms.push({ x: 350, y: groundY - 20, w: 50, h: 30, type: 'spring' });
            
            // Plateforme haute
            level.platforms.push({ x: 450, y: groundY - 180, w: 180, h: 20, type: 'sonic_platform' });
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: 480 + i * 50, y: groundY - 230, w: 25, h: 25, type: 'ring' });
            }
            
            // Speed pad !
            level.platforms.push({ x: 620, y: groundY - 180, w: 80, h: 15, type: 'speed_pad' });
            
            // Loop visuel
            level.decorations = [{ x: 750, y: groundY - 300, type: 'loop', size: 180 }];
            
            // Plateformes après loop
            level.platforms.push({ x: 700, y: groundY - 80, w: 120, h: 20, type: 'sonic_platform' });
            level.platforms.push({ x: 880, y: groundY - 140, w: 100, h: 20, type: 'sonic_platform' });
            level.platforms.push({ x: 1040, y: groundY - 200, w: 100, h: 20, type: 'sonic_platform' });
            
            // Rings en arc
            for (let i = 0; i < 5; i++) {
                const angle = (i / 4) * Math.PI;
                level.coins.push({ x: 930 + Math.cos(angle) * 70, y: groundY - 180 - Math.sin(angle) * 50, w: 25, h: 25, type: 'ring' });
            }
            
            // Badnik !
            level.enemies.push({ x: 980, y: groundY - 200 - 40, w: 45, h: 40, type: 'badnik', patrolStart: 900, patrolEnd: 1120, dir: 1, speed: 3 * state.difficulty });
            
            // Ressort vers les hauteurs
            level.platforms.push({ x: 1140, y: groundY - 200, w: 80, h: 20, type: 'sonic_platform' });
            level.platforms.push({ x: 1160, y: groundY - 220, w: 50, h: 30, type: 'spring' });
            
            // Zone haute
            level.platforms.push({ x: 1220, y: groundY - 380, w: 280, h: 20, type: 'sonic_platform' });
            for (let i = 0; i < 6; i++) {
                level.coins.push({ x: 1250 + i * 40, y: groundY - 430, w: 25, h: 25, type: 'ring' });
            }
            
            // Speed pad #2
            level.platforms.push({ x: 1480, y: groundY - 380, w: 80, h: 15, type: 'speed_pad' });
            
            // Descente
            level.platforms.push({ x: 1620, y: groundY - 280, w: 80, h: 20, type: 'sonic_platform' });
            level.platforms.push({ x: 1720, y: groundY - 180, w: 80, h: 20, type: 'sonic_platform' });
            level.platforms.push({ x: 1820, y: groundY - 80, w: 80, h: 20, type: 'sonic_platform' });
            
            // Badnik #2
            level.enemies.push({ x: 1770, y: groundY - 220, w: 45, h: 40, type: 'badnik', patrolStart: 1730, patrolEnd: 1790, dir: -1, speed: 2 * state.difficulty });
            
            // Sol avant boss
            level.platforms.push({ x: 1900, y: groundY, w: 300, h: 80, type: 'sonic_ground' });
            
            // Ressort vers l'arène
            level.platforms.push({ x: 2100, y: groundY - 20, w: 50, h: 30, type: 'spring' });
            
            // ===== PARTIE 2 : ARÈNE DU BOSS =====
            const arenaStart = 2350;
            const arenaWidth = 700;
            
            // Sol de l'arène
            level.platforms.push({ x: arenaStart, y: groundY, w: arenaWidth, h: 80, type: 'boss_arena' });
            
            // Murs
            level.platforms.push({ x: arenaStart - 30, y: 0, w: 30, h: h, type: 'invisible_wall' });
            level.platforms.push({ x: arenaStart + arenaWidth, y: 0, w: 30, h: h, type: 'invisible_wall' });
            
            // Plateformes d'esquive
            level.platforms.push({ x: arenaStart + 80, y: groundY - 130, w: 100, h: 20, type: 'boss_platform' });
            level.platforms.push({ x: arenaStart + arenaWidth - 180, y: groundY - 130, w: 100, h: 20, type: 'boss_platform' });
            level.platforms.push({ x: arenaStart + arenaWidth / 2 - 50, y: groundY - 250, w: 100, h: 20, type: 'boss_platform' });
            
            // Plateformes mobiles
            level.platforms.push({ x: arenaStart + 220, y: groundY - 180, w: 70, h: 15, type: 'moving', vx: 0, vy: 1.5, minY: groundY - 220, maxY: groundY - 100 });
            level.platforms.push({ x: arenaStart + arenaWidth - 290, y: groundY - 220, w: 70, h: 15, type: 'moving', vx: 0, vy: -1.5, minY: groundY - 260, maxY: groundY - 140 });
            
            // ===== LE BOSS : DR. EGGMAN-LIKE =====
            level.boss = {
                x: arenaStart + arenaWidth / 2,
                y: groundY - 250,
                w: 100,
                h: 100,
                hp: 8,
                maxHp: 8,
                phase: 1,
                attackTimer: 0,
                invincible: 0,
                dir: -1,
                state: 'float',
                floatY: 0,
                floatDir: 1,
                chargeTimer: 0,
                dashSpeed: 0,
                spawnTimer: 0
            };
            
            // Vide
            level.hazards.push({ x: -1000, y: h + 100, w: 5000, h: 100, type: 'void' });

            // Power-ups stratégiques dans l'arène du boss
            level.powerups.push({ x: 1200, y: groundY - 80, w: 35, h: 35, type: 'star' }); // Avant le boss
            level.powerups.push({ x: arenaStart + 140, y: groundY - 180, w: 35, h: 35, type: 'shield' }); // Sur plateforme
            level.powerups.push({ x: arenaStart + arenaWidth - 240, y: groundY - 180, w: 35, h: 35, type: 'super_jump' }); // Sur l'autre plateforme

            return level;
        }
    }
};

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
        clouds: [],
        stars: [],
        decorations: [],
        powerups: []  // Nouveaux power-ups !
    };
}
