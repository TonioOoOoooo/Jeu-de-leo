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

            // ===== 🎁 ZONE SECRÈTE #1 : Plateforme cachée au-dessus =====
            level.platforms.push({ x: 100, y: unit * 0.5, w: 150, h: 20, type: 'gold_block' });
            // Super pièces secrètes (valent 5 pièces chacune!)
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: 115 + i * 40, y: unit * 0.5 - 30, w: 25, h: 25, value: 5, secret: true });
            }
            // Power-up étoile secret !
            level.powerups.push({ x: 165, y: unit * 0.5 - 70, w: 35, h: 35, type: 'star' });
            
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

            // ===== ASCENSEUR POUR REMONTER DU SOL BAS ! =====
            let returnLiftX = topX + 200;
            level.platforms.push({ x: returnLiftX, y: exitY, w: 100, h: 20, type: 'moving', vy: -2 * state.difficulty, minY: midLandY, maxY: exitY, vx: 0 });
            // Pièces pour indiquer l'ascenseur
            level.coins.push({ x: returnLiftX + 40, y: exitY - 50, w: 20, h: 20 });

            level.goal = { x: topX + 400, y: exitY - 80, w: 70, h: 80 };
            level.hazards.push({ x: -1000, y: h + 50, w: w * 30, h: 100, type: 'void' });

            // Power-up super saut sur la plateforme mobile
            level.powerups.push({ x: liftX + 25, y: midLandY - 60, w: 35, h: 35, type: 'super_jump' });

            return level;
        }
    },
    
    3: {
        name: "⚔️ Le Donjon Maudit ⚔️",
        bgColor: "#1a1a2e",
        playerStart: { x: 50, y: 400 },
        needsKey: false,
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();

            // ===== SECTION 1 : SALLE D'ENTRÉE =====
            // Sol de départ avec murs de pierre
            level.platforms.push({ x: 0, y: unit * 7, w: 300, h: unit * 3, type: 'stone' });

            // Squelettes gardiens de l'entrée
            level.enemies.push({ x: 150, y: unit * 7 - 60, w: 50, h: 60, type: 'skeleton', patrolStart: 100, patrolEnd: 250, dir: 1, speed: 2 * state.difficulty });

            // Pièces d'entrée
            for (let i = 0; i < 4; i++) level.coins.push({ x: 80 + i * 40, y: unit * 7 - 100, w: 20, h: 20 });

            // ===== SECTION 2 : COULOIR DES PIQUES =====
            let corridorX = 320;
            level.platforms.push({ x: corridorX, y: unit * 7, w: 350, h: unit * 3, type: 'stone' });

            // Piques montantes dangereuses espacées
            for (let i = 0; i < 5; i++) {
                level.hazards.push({ x: corridorX + 50 + i * 60, y: unit * 7 - 40, w: 40, h: 40, type: 'spikes' });
            }

            // Plateformes surélevées pour éviter les piques
            level.platforms.push({ x: corridorX + 40, y: unit * 6.3, w: 80, h: 20, type: 'wood' });
            level.platforms.push({ x: corridorX + 160, y: unit * 6, w: 80, h: 20, type: 'wood' });
            level.platforms.push({ x: corridorX + 280, y: unit * 6.3, w: 80, h: 20, type: 'wood' });

            // Pièces sur les plateformes
            level.coins.push({ x: corridorX + 65, y: unit * 6.3 - 30, w: 20, h: 20 });
            level.coins.push({ x: corridorX + 190, y: unit * 6 - 30, w: 20, h: 20 });
            level.coins.push({ x: corridorX + 310, y: unit * 6.3 - 30, w: 20, h: 20 });

            // Power-up bouclier pour traverser
            level.powerups.push({ x: corridorX + 190, y: unit * 6 - 70, w: 35, h: 35, type: 'shield' });

            // ===== SECTION 3 : SALLE DES BARRES DE FEU =====
            let fireRoomX = 690;

            // Grande plateforme centrale
            level.platforms.push({ x: fireRoomX, y: unit * 7, w: 500, h: unit * 3, type: 'stone' });

            // Trois barres de feu tournantes en séquence
            level.fireBars.push({ cx: fireRoomX + 100, cy: unit * 7 + 10, length: 140, angle: 0, speed: 0.05 * state.difficulty });
            level.fireBars.push({ cx: fireRoomX + 250, cy: unit * 7 + 10, length: 150, angle: Math.PI, speed: -0.06 * state.difficulty });
            level.fireBars.push({ cx: fireRoomX + 400, cy: unit * 7 + 10, length: 140, angle: Math.PI/2, speed: 0.07 * state.difficulty });

            // Plateformes pour naviguer au-dessus
            level.platforms.push({ x: fireRoomX + 40, y: unit * 5.5, w: 70, h: 20, type: 'wood' });
            level.platforms.push({ x: fireRoomX + 180, y: unit * 5, w: 70, h: 20, type: 'wood' });
            level.platforms.push({ x: fireRoomX + 320, y: unit * 5.5, w: 70, h: 20, type: 'wood' });
            level.platforms.push({ x: fireRoomX + 440, y: unit * 6, w: 70, h: 20, type: 'wood' });

            // Pièces sur chaque plateforme
            level.coins.push({ x: fireRoomX + 60, y: unit * 5.5 - 30, w: 20, h: 20 });
            level.coins.push({ x: fireRoomX + 205, y: unit * 5 - 30, w: 20, h: 20 });
            level.coins.push({ x: fireRoomX + 345, y: unit * 5.5 - 30, w: 20, h: 20 });
            level.coins.push({ x: fireRoomX + 460, y: unit * 6 - 30, w: 20, h: 20 });

            // Power-up super saut
            level.powerups.push({ x: fireRoomX + 205, y: unit * 5 - 70, w: 35, h: 35, type: 'super_jump' });

            // ===== 🎁 ZONE SECRÈTE #2 : Plateforme cachée au plafond =====
            level.platforms.push({ x: fireRoomX + 180, y: unit * 2, w: 150, h: 20, type: 'gold_block' });
            // Pièces secrètes diamant
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: fireRoomX + 195 + i * 30, y: unit * 2 - 30, w: 25, h: 25, value: 3, secret: true });
            }
            // Power-up magnet secret
            level.powerups.push({ x: fireRoomX + 235, y: unit * 2 - 70, w: 35, h: 35, type: 'magnet' });

            // ===== SECTION 4 : PRISON VERTICALE =====
            let prisonX = 1210;

            // Structure verticale avec échelles
            level.platforms.push({ x: prisonX, y: unit * 7, w: 200, h: unit * 3, type: 'stone' });
            level.platforms.push({ x: prisonX, y: unit * 5, w: 200, h: 40, type: 'stone' });
            level.platforms.push({ x: prisonX, y: unit * 3.5, w: 200, h: 40, type: 'stone' });

            // Échelles pour grimper
            level.ladders.push({ x: prisonX + 30, y: unit * 5 + 40, w: 30, h: unit * 2 - 40 });
            level.ladders.push({ x: prisonX + 140, y: unit * 3.5 + 40, w: 30, h: unit * 1.5 - 40 });

            // Squelettes gardiens dans la prison
            level.enemies.push({ x: prisonX + 100, y: unit * 5 - 60, w: 50, h: 60, type: 'skeleton', patrolStart: prisonX + 50, patrolEnd: prisonX + 150, dir: 1, speed: 2 * state.difficulty });
            level.enemies.push({ x: prisonX + 80, y: unit * 3.5 - 60, w: 50, h: 60, type: 'skeleton', patrolStart: prisonX + 40, patrolEnd: prisonX + 160, dir: -1, speed: 2.5 * state.difficulty });

            // Pièces sur chaque étage
            for (let i = 0; i < 3; i++) level.coins.push({ x: prisonX + 60 + i * 40, y: unit * 5 - 30, w: 20, h: 20 });
            for (let i = 0; i < 3; i++) level.coins.push({ x: prisonX + 60 + i * 40, y: unit * 3.5 - 30, w: 20, h: 20 });

            // ===== SECTION 5 : SALLE DU TRÉSOR =====
            let treasureX = 1430;

            // Grande salle du trésor
            level.platforms.push({ x: treasureX, y: unit * 7, w: 400, h: unit * 3, type: 'gold_block' });
            level.platforms.push({ x: treasureX, y: unit * 3.5, w: 400, h: 40, type: 'stone' });

            // Échelle pour descendre
            level.ladders.push({ x: treasureX + 50, y: unit * 3.5 + 40, w: 30, h: unit * 3.5 - 40 });

            // Boss coffre monstre gardant le trésor
            level.enemies.push({ x: treasureX + 200, y: unit * 7 - 80, w: 80, h: 80, type: 'chest_monster', patrolStart: treasureX + 100, patrolEnd: treasureX + 300, dir: 1, speed: 3 * state.difficulty });

            // Beaucoup de pièces dans le trésor
            for (let i = 0; i < 8; i++) level.coins.push({ x: treasureX + 50 + i * 40, y: unit * 7 - 100, w: 20, h: 20 });
            for (let i = 0; i < 5; i++) level.coins.push({ x: treasureX + 100 + i * 50, y: unit * 7 - 150, w: 20, h: 20 });

            // Power-up aimant pour collecter facilement
            level.powerups.push({ x: treasureX + 200, y: unit * 3.5 - 70, w: 35, h: 35, type: 'magnet' });

            // ===== SECTION 6 : SALLE DU TRÔNE =====
            let throneX = 1850;

            // Salle finale avec escalier
            level.platforms.push({ x: throneX, y: unit * 7, w: 350, h: unit * 3, type: 'stone' });

            // Escalier majestueux
            for (let i = 0; i < 5; i++) {
                level.platforms.push({ x: throneX + 50 + i * 50, y: unit * 7 - (i + 1) * 35, w: 50, h: 35 + (i + 1) * 35, type: 'stone' });
            }

            // Hache légendaire au sommet
            level.goal = { x: throneX + 280, y: unit * 7 - 200, w: 40, h: 60, type: 'axe' };

            // Pièces finales
            for (let i = 0; i < 5; i++) level.coins.push({ x: throneX + 70 + i * 50, y: unit * 7 - (i + 1) * 35 - 30, w: 20, h: 20 });

            // Sol de lave en-dessous de tout
            level.hazards.push({ x: -1000, y: h - 50, w: w * 30, h: 100, type: 'lava_floor' });

            return level;
        }
    },
    
    4: {
        name: "Monde Champignon",
        bgColor: "#5c94fc",
        playerStart: { x: 50, y: 400 },
        needsKey: true,
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();

            level.clouds = [];
            for (let i = 0; i < 10; i++) level.clouds.push({ x: Math.random() * w * 4, y: Math.random() * (h / 2), w: 60 + Math.random() * 40 });

            let groundY = h - unit;
            level.platforms.push({ x: -50, y: groundY, w: 400, h: unit, type: 'brick_floor' });
            for (let i = 0; i < 5; i++) level.coins.push({ x: 80 + i * 60, y: groundY - 50, w: 20, h: 20 });

            // ===== TUYAU MAGIQUE VERS SOUS-SOL ! =====
            let pipe1X = 450;
            level.platforms.push({ x: pipe1X, y: groundY - 60, w: 60, h: 60 + unit, type: 'pipe' });

            // Portail d'entrée dans le tuyau (appuyer sur bas pour descendre)
            level.portals.push({
                x: pipe1X + 10,
                y: groundY - 55,
                w: 40,
                h: 50,
                color: '#00FF00',
                destX: -997, // Code spécial pour aller au sous-sol
                destY: -997,
                isUndergroundPortal: true
            });

            level.platforms.push({ x: pipe1X + 150, y: groundY, w: 300, h: unit, type: 'brick_floor' });
            level.enemies.push({ x: pipe1X + 200, y: groundY - 60, w: 50, h: 60, type: 'zombie', patrolStart: pipe1X + 150, patrolEnd: pipe1X + 400, dir: -1, speed: 2 * state.difficulty });
            
            // ===== ZONE DE RETOUR DU SOUS-SOL =====
            let returnX = pipe1X + 150;
            // Portail de retour du sous-sol (apparaîtra ici après visite)
            level.returnPortalPos = { x: returnX + 180, y: groundY - 100 };

            let pipe2X = returnX + 350;
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
        },

        // ===== SOUS-NIVEAU : ZONE SOUTERRAINE ! =====
        setupUnderground: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();

            // Pas de nuages sous terre !
            level.clouds = [];

            // ===== SOL ET MUR DE BRIQUES SOMBRES =====
            let groundY = h - unit;

            // Sol complet
            for (let i = 0; i < 30; i++) {
                level.platforms.push({ x: i * 60, y: groundY, w: 60, h: unit, type: 'brick_block' });
            }

            // Plafond de briques
            for (let i = 0; i < 30; i++) {
                level.platforms.push({ x: i * 60, y: 0, w: 60, h: 40, type: 'brick_block' });
            }

            // ===== TUYAU D'ARRIVÉE =====
            let arrivalX = 100;
            level.platforms.push({ x: arrivalX - 30, y: groundY - 80, w: 60, h: 80, type: 'pipe' });

            // ===== PARCOURS SOUTERRAIN AVEC TRÉSORS ! =====

            // Plateforme 1 avec pièces
            let plat1X = 250;
            level.platforms.push({ x: plat1X, y: groundY - 100, w: 120, h: 20, type: 'brick_block' });
            for (let i = 0; i < 5; i++) level.coins.push({ x: plat1X + 15 + i * 20, y: groundY - 130, w: 20, h: 20 });

            // Badnik ennemi !
            level.enemies.push({ x: plat1X + 60, y: groundY - 150, w: 50, h: 50, type: 'badnik', patrolStart: plat1X, patrolEnd: plat1X + 120, dir: 1, speed: 2 * state.difficulty });

            // Plateforme 2 avec super pièces secrètes !
            let plat2X = 450;
            level.platforms.push({ x: plat2X, y: groundY - 180, w: 150, h: 20, type: 'gold_block' });
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: plat2X + 25 + i * 35, y: groundY - 210, w: 25, h: 25, value: 3, secret: true });
            }

            // Plateforme 3 avec échelle
            let plat3X = 680;
            level.platforms.push({ x: plat3X, y: groundY - 100, w: 100, h: 20, type: 'brick_block' });
            level.ladders.push({ x: plat3X + 35, y: groundY - 100, w: 30, h: 100 });

            // Coins bonus dans les hauteurs
            for (let i = 0; i < 3; i++) level.coins.push({ x: plat3X + 35, y: groundY - 120 - i * 40, w: 20, h: 20 });

            // ===== ZONE DU TRÉSOR ! =====
            let treasureX = 850;
            level.platforms.push({ x: treasureX, y: groundY - 120, w: 200, h: 20, type: 'gold_block' });

            // Coffre monstre gardien du trésor souterrain !
            level.enemies.push({ x: treasureX + 100, y: groundY - 200, w: 60, h: 80, type: 'chest_monster', patrolStart: treasureX + 50, patrolEnd: treasureX + 150, dir: -1, speed: 2.5 * state.difficulty });

            // LA CLÉ SOUTERRAINE !
            level.keyItem = { x: treasureX + 85, y: groundY - 180, w: 40, h: 40 };

            // Beaucoup de pièces bonus !
            for (let i = 0; i < 8; i++) {
                level.coins.push({ x: treasureX + 20 + i * 22, y: groundY - 150, w: 20, h: 20 });
            }

            // Power-up étoile !
            level.powerups.push({ x: treasureX + 90, y: groundY - 220, w: 35, h: 35, type: 'star' });

            // ===== TUYAU DE SORTIE =====
            let exitX = 1100;
            level.platforms.push({ x: exitX, y: groundY - 80, w: 60, h: 80, type: 'pipe' });

            // Portail de sortie dans le tuyau (remonter avec ↑)
            level.portals.push({
                x: exitX + 10,
                y: groundY - 75,
                w: 40,
                h: 70,
                color: '#00FF00',
                destX: -996, // Code spécial pour retourner au monde principal
                destY: -996,
                isReturnPortal: true
            });

            // Pièces indicatrices vers la sortie
            for (let i = 0; i < 3; i++) level.coins.push({ x: exitX - 60 - i * 30, y: groundY - 50, w: 20, h: 20 });

            // Vide mortel
            level.hazards.push({ x: -1000, y: h + 50, w: w * 30, h: 100, type: 'void' });

            return level;
        }
    },
    
    5: {
        name: "Aventure Minecraft",
        bgColor: "#87CEEB",
        playerStart: { x: 50, y: 300 },
        needsKey: true,
        setup: (w, h) => {
            const blockSize = 40;
            const level = createEmptyLevel();

            // ===== MONDE PRINCIPAL =====
            level.clouds = [];
            for (let i = 0; i < 8; i++) level.clouds.push({ x: Math.random() * w * 2, y: 50 + Math.random() * 150, w: 50 + Math.random() * 40 });

            // Sol de départ
            for (let i = 0; i < 18; i++) {
                level.platforms.push({ x: i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'grass_block' });
                level.platforms.push({ x: i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'dirt_block' });
            }
            for (let i = 0; i < 5; i++) level.coins.push({ x: 100 + i * 80, y: h - blockSize * 2 - 50, w: 20, h: 20 });

            // Arbre avec power-up
            let treeX = 280;
            level.platforms.push({ x: treeX, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'wood' });
            level.platforms.push({ x: treeX - blockSize, y: h - blockSize * 7, w: blockSize * 3, h: blockSize * 2, type: 'leaves' });
            level.platforms.push({ x: treeX, y: h - blockSize * 8, w: blockSize, h: blockSize, type: 'leaves' });
            level.powerups.push({ x: treeX, y: h - blockSize * 8 - 40, w: 35, h: 35, type: 'shield' });
            level.coins.push({ x: treeX, y: h - blockSize * 7 - 30, w: 20, h: 20 });

            // Creeper caché près de l'arbre !
            level.enemies.push({ x: treeX + 80, y: h - blockSize * 2 - 60, w: 40, h: 60, type: 'creeper', patrolStart: treeX + 60, patrolEnd: treeX + 140, dir: 1, speed: 1.5 * state.difficulty });

            // Mini-saut vers la mine
            let gapX = treeX + 180;
            level.platforms.push({ x: gapX, y: h - blockSize * 3, w: blockSize, h: blockSize, type: 'stone' });
            level.coins.push({ x: gapX + 5, y: h - blockSize * 3 - 40, w: 20, h: 20 });

            // Mine avec lave
            let caveX = gapX + 150;
            for (let i = 0; i < 3; i++) {
                level.platforms.push({ x: caveX + i * blockSize, y: h - blockSize * 4, w: blockSize, h: blockSize, type: 'stone' });
            }
            level.hazards.push({ x: caveX - 50, y: h - 30, w: 250, h: 30, type: 'lava_floor' });
            level.coins.push({ x: caveX + 50, y: h - blockSize * 4 - 40, w: 20, h: 20 });

            // Spider dans la mine !
            level.enemies.push({ x: caveX + 60, y: h - blockSize * 4 - 50, w: 50, h: 50, type: 'spider', patrolStart: caveX, patrolEnd: caveX + 120, dir: -1, speed: 2.5 * state.difficulty });

            // Plateforme vers le portail Nether
            let portalAreaX = caveX + 300;
            for (let i = 0; i < 8; i++) {
                level.platforms.push({ x: portalAreaX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'netherrack' });
                level.platforms.push({ x: portalAreaX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'netherrack' });
            }

            // ===== PORTAIL VERS LE NETHER (pas la sortie!) =====
            let netherPortalX = portalAreaX + blockSize * 2;
            level.portals.push({
                x: netherPortalX,
                y: h - blockSize * 2 - 100,
                w: 60,
                h: 100,
                color: '#8B00FF',
                destX: -999, // Code spécial pour aller au Nether
                destY: -999,
                isNetherPortal: true
            });

            // Obsidienne autour du portail (décoratif)
            level.platforms.push({ x: netherPortalX - 10, y: h - blockSize * 2, w: 10, h: 100, type: 'netherrack' });
            level.platforms.push({ x: netherPortalX + 60, y: h - blockSize * 2, w: 10, h: 100, type: 'netherrack' });

            // Gardiens du portail Nether
            level.enemies.push({ x: netherPortalX + 100, y: h - blockSize * 2 - 60, w: 50, h: 60, type: 'zombie', patrolStart: portalAreaX, patrolEnd: portalAreaX + 180, dir: -1, speed: 2 * state.difficulty });
            level.enemies.push({ x: netherPortalX - 80, y: h - blockSize * 2 - 60, w: 40, h: 60, type: 'skeleton', patrolStart: portalAreaX, patrolEnd: portalAreaX + 280, dir: 1, speed: 1.8 * state.difficulty });

            // ===== ZONE DE RETOUR DU NETHER =====
            let returnX = portalAreaX + 450;
            for (let i = 0; i < 6; i++) {
                level.platforms.push({ x: returnX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'grass_block' });
                level.platforms.push({ x: returnX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'dirt_block' });
            }

            // Portail de retour du Nether (apparaîtra ici)
            level.returnPortalPos = { x: returnX + 40, y: h - blockSize * 2 - 100 };

            // ===== SORTIE FINALE (nécessite la clé du Nether!) =====
            let exitX = returnX + 300;
            for (let i = 0; i < 6; i++) {
                level.platforms.push({ x: exitX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'grass_block' });
                level.platforms.push({ x: exitX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'dirt_block' });
            }

            // Maison de sortie
            level.platforms.push({ x: exitX + 200, y: h - blockSize * 2 - 120, w: 100, h: 120, type: 'wood' });
            level.goal = { x: exitX + 230, y: h - blockSize * 2 - 80, w: 40, h: 80, type: 'nether_portal' };

            // Vide
            level.hazards.push({ x: -1000, y: h + 100, w: w * 30, h: 100, type: 'void' });

            return level;
        },

        // ===== SOUS-NIVEAU : LE NETHER ! =====
        setupNether: (w, h) => {
            const blockSize = 40;
            const level = createEmptyLevel();

            // Pas de clés, pas de nuages dans le Nether !
            level.clouds = [];

            // Sol de Netherrack partout
            for (let i = 0; i < 25; i++) {
                level.platforms.push({ x: i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'netherrack' });
                level.platforms.push({ x: i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'netherrack' });
            }

            // Lave au sol (danger!)
            level.hazards.push({ x: 0, y: h - 30, w: 100, h: 30, type: 'lava_floor' });
            level.hazards.push({ x: 250, y: h - 30, w: 150, h: 30, type: 'lava_floor' });
            level.hazards.push({ x: 550, y: h - 30, w: 200, h: 30, type: 'lava_floor' });

            // Parcours avec plateformes
            let platformsY = h - blockSize * 4;
            level.platforms.push({ x: 120, y: platformsY, w: blockSize * 2, h: blockSize, type: 'netherrack' });
            level.coins.push({ x: 135, y: platformsY - 40, w: 20, h: 20 });

            // Magma Cube qui rebondit !
            level.enemies.push({ x: 160, y: platformsY - 50, w: 45, h: 50, type: 'magma_cube', patrolStart: 120, patrolEnd: 200, dir: 1, speed: 2 * state.difficulty });

            level.platforms.push({ x: 280, y: platformsY - 60, w: blockSize * 2, h: blockSize, type: 'netherrack' });
            level.powerups.push({ x: 295, y: platformsY - 100, w: 35, h: 35, type: 'star' }); // Étoile d'invincibilité!

            // Blaze flottant dangereux !
            level.enemies.push({ x: 320, y: platformsY - 150, w: 50, h: 60, type: 'blaze', patrolStart: 280, patrolEnd: 380, dir: -1, speed: 1.5 * state.difficulty });

            level.platforms.push({ x: 420, y: platformsY, w: blockSize * 2, h: blockSize, type: 'netherrack' });

            // Zombie Pigman hostile !
            level.enemies.push({ x: 450, y: platformsY - 60, w: 50, h: 60, type: 'zombie', patrolStart: 420, patrolEnd: 500, dir: 1, speed: 3 * state.difficulty });

            // Plateforme avec LA CLÉ !
            let keyPlatformX = 650;
            level.platforms.push({ x: keyPlatformX, y: platformsY - 120, w: blockSize * 3, h: blockSize, type: 'netherrack' });
            level.keyItem = { x: keyPlatformX + 40, y: platformsY - 180, w: 40, h: 40, type: 'diamond' }; // Diamant du Nether!
            level.coins.push({ x: keyPlatformX + 10, y: platformsY - 160, w: 20, h: 20 });
            level.coins.push({ x: keyPlatformX + 90, y: platformsY - 160, w: 20, h: 20 });

            // Ghast gardien de la clé du Nether !
            level.enemies.push({ x: keyPlatformX - 50, y: platformsY - 250, w: 60, h: 60, type: 'ghast', patrolStart: keyPlatformX - 100, patrolEnd: keyPlatformX + 150, dir: 1, speed: 1.2 * state.difficulty });

            // Portail de retour vers le monde principal
            let returnPortalX = 850;
            level.platforms.push({ x: returnPortalX - 50, y: h - blockSize * 2, w: blockSize * 4, h: blockSize, type: 'netherrack' });

            // Portail magique de retour
            level.portals.push({
                x: returnPortalX,
                y: h - blockSize * 2 - 100,
                w: 60,
                h: 100,
                color: '#00FF00', // Vert pour le retour!
                destX: -998, // Code spécial pour retourner au monde principal
                destY: -998,
                isReturnPortal: true
            });

            // Vide mortel partout
            level.hazards.push({ x: -1000, y: h + 100, w: w * 30, h: 100, type: 'void' });

            return level;
        }
    },
    
    6: {
        name: "Labyrinthe des Portails",
        bgColor: "#1a1a2e",
        playerStart: { x: 50, y: 400 },
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();

            // ===== ZONE 1 : DÉPART =====
            level.platforms.push({ x: -50, y: h - unit * 2, w: 350, h: unit, type: 'metal' });
            for (let i = 0; i < 4; i++) level.coins.push({ x: 80 + i * 50, y: h - unit * 2 - 50, w: 20, h: 20 });

            // Premier défi : pièges !
            level.hazards.push({ x: 250, y: h - unit * 2 - 25, w: 25, h: 25, type: 'spike' });

            // PORTAIL 1 : CYAN → Zone haute gauche
            level.portals.push({ x: 260, y: h - unit * 2 - 80, w: 50, h: 80, color: '#00FFFF', destX: 150, destY: unit * 2 - 58 });

            // ===== ZONE 2 : HAUTE GAUCHE (après portail cyan) =====
            level.platforms.push({ x: 50, y: unit * 2, w: 300, h: 20, type: 'metal' });
            level.enemies.push({ x: 150, y: unit * 2 - 60, w: 50, h: 60, type: 'zombie', patrolStart: 50, patrolEnd: 300, dir: 1, speed: 2 * state.difficulty });
            for (let i = 0; i < 3; i++) level.coins.push({ x: 100 + i * 60, y: unit * 2 - 50, w: 20, h: 20 });

            // Power-up bouclier
            level.powerups.push({ x: 280, y: unit * 2 - 60, w: 35, h: 35, type: 'shield' });

            // PORTAIL 2 : ORANGE → Zone milieu droit
            level.portals.push({ x: 280, y: unit * 2 - 80, w: 50, h: 80, color: '#FF9900', destX: w - 250, destY: unit * 5 - 58 });

            // ===== ZONE 3 : MILIEU DROIT (après portail orange) =====
            level.platforms.push({ x: w - 400, y: unit * 5, w: 400, h: 20, type: 'metal' });

            // Plateforme mobile avec pièges
            level.platforms.push({ x: w - 450, y: unit * 6, w: 100, h: 20, type: 'moving', vx: 2, minX: w - 500, maxX: w - 200 });
            level.hazards.push({ x: w - 350, y: unit * 5 - 25, w: 25, h: 25, type: 'spike' });
            level.coins.push({ x: w - 300, y: unit * 5 - 50, w: 20, h: 20 });

            // PORTAIL 3 : VIOLET → Zone basse centrale
            level.portals.push({ x: w - 100, y: unit * 5 - 80, w: 50, h: 80, color: '#CC00FF', destX: w / 2, destY: h - unit * 3 - 58 });

            // ===== ZONE 4 : BASSE CENTRALE (après portail violet) =====
            level.platforms.push({ x: w / 2 - 250, y: h - unit * 3, w: 500, h: 20, type: 'metal' });

            // Monstre coffre gardien
            level.enemies.push({ x: w / 2, y: h - unit * 3 - 60, w: 60, h: 60, type: 'chest_monster', patrolStart: w / 2 - 200, patrolEnd: w / 2 + 150, dir: -1, speed: 2.5 * state.difficulty });

            // LA CLÉ ! Bien cachée
            level.keyItem = { x: w / 2 + 180, y: h - unit * 3 - 50, w: 40, h: 40 };
            for (let i = 0; i < 3; i++) level.coins.push({ x: w / 2 - 100 + i * 80, y: h - unit * 3 - 50, w: 20, h: 20 });

            // PORTAIL 4 : VERT → Retour zone départ (mais plus haut!)
            level.portals.push({ x: w / 2 - 220, y: h - unit * 3 - 80, w: 50, h: 80, color: '#00FF00', destX: 80, destY: h - unit * 4 - 58 });

            // ===== ZONE 5 : RETOUR HAUT (après portail vert) =====
            level.platforms.push({ x: -50, y: h - unit * 4, w: 400, h: 20, type: 'metal' });
            level.powerups.push({ x: 200, y: h - unit * 4 - 60, w: 35, h: 35, type: 'super_jump' });

            // Échelle vers la sortie
            level.ladders.push({ x: 320, y: h - unit * 6, w: 30, h: unit * 2 });
            level.platforms.push({ x: 250, y: h - unit * 6, w: 200, h: 20, type: 'metal' });

            // ===== SORTIE FINALE =====
            level.goal = { x: 380, y: h - unit * 6 - 80, w: 70, h: 80 };
            for (let i = 0; i < 2; i++) level.coins.push({ x: 290 + i * 60, y: h - unit * 6 - 50, w: 20, h: 20 });

            // Vide mortel
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
        name: "🌙 Royaume des Rêves 🌙",
        bgColor: "#9290FF",
        playerStart: { x: 50, y: 400 },
        setup: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();
            const groundY = h - unit;

            // Nuages décoratifs !
            level.clouds = [];
            for (let i = 0; i < 12; i++) {
                level.clouds.push({ x: Math.random() * w * 2, y: 30 + Math.random() * 200, w: 60 + Math.random() * 40 });
            }

            // ===== SECTION 1 : JARDIN DE DÉPART =====
            level.platforms.push({ x: -50, y: groundY, w: 400, h: unit, type: 'smb2_grass' });
            for (let i = 0; i < 5; i++) level.coins.push({ x: 80 + i * 60, y: groundY - 50, w: 20, h: 20 });

            // Premier jarre
            level.platforms.push({ x: 300, y: groundY - 60, w: 50, h: 60 + unit, type: 'jar' });
            level.powerups.push({ x: 315, y: groundY - 110, w: 35, h: 35, type: 'super_jump' });

            // ===== SECTION 2 : ESCALADE DE RONDINS =====
            let logX = 450;
            for (let i = 0; i < 5; i++) {
                const logY = groundY - 100 - i * 80;
                level.platforms.push({ x: logX + (i % 2) * 150, y: logY, w: 120, h: 20, type: 'smb2_log' });

                if (i < 4) {
                    level.coins.push({ x: logX + (i % 2) * 150 + 50, y: logY - 50, w: 20, h: 20 });
                }

                // Shy Guys en patrouille
                if (i === 1 || i === 3) {
                    const enemyX = logX + (i % 2) * 150 + 40;
                    level.enemies.push({
                        x: enemyX,
                        y: logY - 60,
                        w: 40, h: 40,
                        type: 'shy_guy',
                        patrolStart: logX + (i % 2) * 150,
                        patrolEnd: logX + (i % 2) * 150 + 110,
                        dir: 1,
                        speed: 2 * state.difficulty
                    });
                }
            }

            // ===== SECTION 3 : ZONE DE JARRES =====
            let jarArea = 850;
            level.platforms.push({ x: jarArea, y: groundY, w: 500, h: unit, type: 'smb2_grass' });

            // Plusieurs jarres avec pièges et récompenses
            level.platforms.push({ x: jarArea + 80, y: groundY - 60, w: 50, h: 60 + unit, type: 'jar' });
            level.hazards.push({ x: jarArea + 95, y: groundY - 70, w: 20, h: 20, type: 'spike' });

            level.platforms.push({ x: jarArea + 220, y: groundY - 60, w: 50, h: 60 + unit, type: 'jar' });
            level.coins.push({ x: jarArea + 235, y: groundY - 90, w: 20, h: 20 });

            level.platforms.push({ x: jarArea + 360, y: groundY - 60, w: 50, h: 60 + unit, type: 'jar' });
            level.powerups.push({ x: jarArea + 375, y: groundY - 110, w: 35, h: 35, type: 'shield' });

            // ===== SECTION 4 : PLATEFORME MOBILE DANGEREUSE =====
            let mobilePlatX = jarArea + 600;
            level.platforms.push({ x: mobilePlatX - 100, y: groundY, w: 150, h: unit, type: 'smb2_grass' });

            // Plateforme mobile qui monte et descend
            level.platforms.push({
                x: mobilePlatX,
                y: groundY - 120,
                w: 100,
                h: 20,
                type: 'moving',
                vx: 0,
                vy: -2 * state.difficulty,
                minY: groundY - 280,
                maxY: groundY - 120
            });

            // Pièces en hauteur
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: mobilePlatX + 30, y: groundY - 240 - i * 50, w: 20, h: 20 });
            }

            // ===== SECTION 5 : ZONE FINALE AVEC CLÉ =====
            let finalArea = mobilePlatX + 250;
            level.platforms.push({ x: finalArea, y: groundY - 250, w: 300, h: 20, type: 'smb2_log' });

            // Boss Shy Guy qui garde la clé !
            level.enemies.push({
                x: finalArea + 120,
                y: groundY - 250 - 60,
                w: 50, h: 50,
                type: 'shy_guy',
                patrolStart: finalArea + 20,
                patrolEnd: finalArea + 260,
                dir: -1,
                speed: 3 * state.difficulty
            });

            // LA CLÉ ! (navet magique)
            level.keyItem = { x: finalArea + 240, y: groundY - 250 - 50, w: 30, h: 30, type: 'turnip' };

            // Pièces bonus
            for (let i = 0; i < 5; i++) {
                level.coins.push({ x: finalArea + 40 + i * 50, y: groundY - 250 - 50, w: 20, h: 20 });
            }

            // ===== SECTION 6 : DESCENTE VERS LA SORTIE =====
            let exitArea = finalArea + 350;

            // Plateformes descendantes
            for (let i = 0; i < 4; i++) {
                level.platforms.push({
                    x: exitArea + i * 120,
                    y: groundY - 250 + i * 70,
                    w: 100,
                    h: 20,
                    type: 'smb2_log'
                });
            }

            // Sol final
            level.platforms.push({ x: exitArea + 400, y: groundY, w: 400, h: unit, type: 'smb2_grass' });

            // Power-up aimant avant la sortie
            level.powerups.push({ x: exitArea + 500, y: groundY - 60, w: 35, h: 35, type: 'magnet' });

            // SORTIE : Hawkmouth géant !
            level.goal = { x: exitArea + 680, y: groundY - 100, w: 80, h: 100, type: 'hawkmouth' };

            // Pièces finales
            for (let i = 0; i < 6; i++) {
                level.coins.push({ x: exitArea + 450 + i * 50, y: groundY - 50, w: 20, h: 20 });
            }

            // Vide mortel
            level.hazards.push({ x: -1000, y: h + 100, w: w * 30, h: 100, type: 'void' });

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
            
            // ===== LE BOSS : DR. EGGMAN-LIKE (VERSION FACILE POUR LÉO!) =====
            level.boss = {
                x: arenaStart + arenaWidth / 2,
                y: groundY - 250,
                w: 100,
                h: 100,
                hp: 5,        // Réduit de 8 à 5 (plus facile!)
                maxHp: 5,
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
