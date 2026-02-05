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

            // ===== AMÉLIORATIONS PLATEFORME FINALE (Game Design) =====
            // Trail de pièces APRÈS l'échelle, menant vers la sortie (au bout de la plateforme!)
            for (let i = 0; i < 10; i++) {
                level.coins.push({ x: ladderX + 350 + i * 60, y: floorY - 50, w: 20, h: 20 });
            }

            // Pièces bonus en arc (récompense visuelle au bout)
            for (let i = 0; i < 5; i++) {
                const arcHeight = Math.sin((i / 4) * Math.PI) * 60;
                level.coins.push({ x: ladderX + 400 + i * 50, y: floorY - 100 - arcHeight, w: 20, h: 20 });
            }

            // Power-up magnet au bout de la plateforme
            level.powerups.push({ x: ladderX + 550, y: floorY - 120, w: 35, h: 35, type: 'magnet' });

            // Pièces secrètes bonus en hauteur (au bout)
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: ladderX + 450 + i * 60, y: floorY - 180, w: 25, h: 25, value: 3, secret: true });
            }

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
            level.platforms.push({ x: returnLiftX, y: exitY, w: 100, h: 20, type: 'moving', vy: -2 * state.difficulty, minY: unit * 2, maxY: exitY, vx: 0 });
            // Pièces pour indiquer l'ascenseur
            level.coins.push({ x: returnLiftX + 40, y: exitY - 50, w: 20, h: 20 });
            level.coins.push({ x: returnLiftX + 40, y: unit * 2 - 30, w: 20, h: 20 }); // Pièce en haut pour montrer qu'il monte!

            // ===== AMÉLIORATIONS PLATEFORME FINALE (Game Design) =====
            // Trail de pièces menant vers la sortie (APRÈS l'ascenseur, AVANT la porte!)
            // Goal est à topX + 400, donc pièces entre returnLiftX + 120 et topX + 350
            for (let i = 0; i < 8; i++) {
                level.coins.push({ x: topX + 250 + i * 50, y: exitY - 50, w: 20, h: 20 });
            }

            // Pièces bonus en zigzag (pattern ludique) - SUR la plateforme
            for (let i = 0; i < 5; i++) {
                const zigzag = (i % 2 === 0) ? -50 : -100;
                level.coins.push({ x: topX + 280 + i * 45, y: exitY + zigzag, w: 20, h: 20 });
            }

            // Power-up shield final AVANT la sortie
            level.powerups.push({ x: topX + 500, y: exitY - 80, w: 35, h: 35, type: 'shield' });

            // Pièces secrètes bonus (valeur 3) en hauteur - AVANT la porte
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: topX + 320 + i * 50, y: exitY - 140, w: 25, h: 25, value: 3, secret: true });
            }

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

            // Trois barres de feu tournantes MONTÉES (ne touchent plus le sol!)
            // CORRIGÉ: cy était à unit*7+10 avec rayon 140-150 = touchait le sol et tuait le joueur
            // NOUVEAU: cy à unit*6.5 avec rayon 80-90 = espace sécurisé de ~70px au-dessus du sol
            level.fireBars.push({ cx: fireRoomX + 100, cy: unit * 6.5, length: 85, angle: 0, speed: 0.05 * state.difficulty });
            level.fireBars.push({ cx: fireRoomX + 250, cy: unit * 6.5, length: 90, angle: Math.PI, speed: -0.06 * state.difficulty });
            level.fireBars.push({ cx: fireRoomX + 400, cy: unit * 6.5, length: 85, angle: Math.PI/2, speed: 0.07 * state.difficulty });

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

            // Sol de lave en-dessous de tout (CORRIGÉ : était à h-50, traversait le sol!)
            level.hazards.push({ x: -1000, y: h + 100, w: w * 30, h: 100, type: 'lava_floor' });

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

            // ===== NUAGES FIXES (4 nuages bien placés, pas aléatoires) =====
            level.clouds = [
                { x: 200, y: 80, w: 80 },
                { x: 600, y: 120, w: 70 },
                { x: 1000, y: 90, w: 85 },
                { x: 1400, y: 110, w: 75 }
            ];

            let groundY = h - unit;

            // ===== SOL DE DÉPART (briques continues et propres) =====
            level.platforms.push({ x: -50, y: groundY, w: 800, h: unit, type: 'brick_floor' });

            // Pièces de départ (5 pièces bien espacées)
            for (let i = 0; i < 5; i++) {
                level.coins.push({ x: 100 + i * 80, y: groundY - 50, w: 20, h: 20 });
            }

            // ===== PREMIÈRE PLATEFORME FLOTTANTE =====
            let plat1X = 300;
            level.platforms.push({ x: plat1X, y: groundY - 160, w: 120, h: 40, type: 'brick_block' });
            // Pièces sous la plateforme (style "?" blocks de SMB)
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: plat1X + 20 + i * 40, y: groundY - 210, w: 20, h: 20 });
            }

            // ===== PREMIER ENNEMI (Zombie en patrouille simple) =====
            level.enemies.push({
                x: 480,
                y: groundY - 60,
                w: 50,
                h: 60,
                type: 'zombie',
                patrolStart: 450,
                patrolEnd: 650,
                dir: 1,
                speed: 1.5 * state.difficulty
            });

            // ===== TUYAU MAGIQUE VERS LE SOUS-SOL (bien visible!) =====
            // SECRET : Appuyer sur BAS quand on est sur le tuyau pour descendre !
            let pipeX = 700;
            level.platforms.push({ x: pipeX, y: groundY - 80, w: 60, h: 80 + unit, type: 'pipe' });

            // Pièces autour du tuyau pour indiquer son importance
            level.coins.push({ x: pipeX - 40, y: groundY - 60, w: 20, h: 20 });
            level.coins.push({ x: pipeX + 100, y: groundY - 60, w: 20, h: 20 });
            level.coins.push({ x: pipeX + 30, y: groundY - 140, w: 20, h: 20 });

            // ===== SOL APRÈS LE TUYAU =====
            level.platforms.push({ x: 800, y: groundY, w: 700, h: unit, type: 'brick_floor' });

            // ===== TUYAU DE SORTIE DU SOUS-SOL (Mécanique SMB1) =====
            // Ce tuyau permet au joueur de ressortir du sous-sol
            let exitPipeX = 950;
            level.platforms.push({
                x: exitPipeX,
                y: groundY - 80,
                w: 60,
                h: 80 + unit,
                type: 'pipe',
                isExitPipe: true // Marqueur pour la sortie du sous-sol
            });

            // Pièces autour du tuyau de sortie (indicateurs visuels)
            level.coins.push({ x: exitPipeX - 40, y: groundY - 60, w: 20, h: 20 });
            level.coins.push({ x: exitPipeX + 100, y: groundY - 60, w: 20, h: 20 });

            // Power-up magnet pour collecter les pièces facilement
            level.powerups.push({ x: 1150, y: groundY - 60, w: 35, h: 35, type: 'magnet' });

            // ===== DEUXIÈME PLATEFORME FLOTTANTE (bonus) =====
            let plat2X = 1250;
            level.platforms.push({ x: plat2X, y: groundY - 180, w: 80, h: 40, type: 'gold_block' });
            // Pièces bonus en or
            for (let i = 0; i < 2; i++) {
                level.coins.push({ x: plat2X + 15 + i * 50, y: groundY - 230, w: 20, h: 20 });
            }

            // ===== SOL VERS LA SORTIE =====
            level.platforms.push({ x: 1500, y: groundY, w: 500, h: unit, type: 'brick_floor' });

            // ===== ESCALIER DE BRIQUES (5 marches style Super Mario Bros) =====
            let stairsX = 1600;
            for (let i = 0; i < 5; i++) {
                level.platforms.push({
                    x: stairsX + (i * 40),
                    y: groundY - (i * 40) - 40,
                    w: 40,
                    h: 40 + (i * 40),
                    type: 'brick_block'
                });
                // Pièce sur chaque marche
                level.coins.push({ x: stairsX + (i * 40) + 10, y: groundY - (i * 40) - 70, w: 20, h: 20 });
            }

            // ===== DRAPEAU GÉANT (style Super Mario Bros) =====
            const flagHeight = 350;
            level.goal = {
                x: stairsX + 350,
                y: groundY - flagHeight,
                w: 10,
                h: flagHeight,
                type: 'flag'
            };

            // ===== CHÂTEAU DE FIN =====
            level.platforms.push({
                x: stairsX + 420,
                y: groundY - 100,
                w: 120,
                h: 100,
                type: 'castle'
            });

            // Vide mortel
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });

            return level;
        },

        // ===== SOUS-NIVEAU : ZONE SOUTERRAINE (simplifié et lisible) =====
        setupUnderground: (w, h) => {
            const unit = h / 10;
            const level = createEmptyLevel();

            // Pas de nuages sous terre
            level.clouds = [];

            let groundY = h - unit;

            // ===== SOL EN BRIQUES =====
            for (let i = 0; i < 25; i++) {
                level.platforms.push({ x: i * 60, y: groundY, w: 60, h: unit, type: 'brick_block' });
            }

            // ===== PLAFOND EN BRIQUES =====
            for (let i = 0; i < 25; i++) {
                level.platforms.push({ x: i * 60, y: 0, w: 60, h: 40, type: 'brick_block' });
            }

            // ===== TUYAU D'ARRIVÉE =====
            let arrivalX = 100;
            level.platforms.push({ x: arrivalX - 30, y: groundY - 80, w: 60, h: 80, type: 'pipe' });

            // Petite plateforme sécurisée autour du tuyau
            level.platforms.push({ x: arrivalX - 80, y: groundY - 20, w: 200, h: 20, type: 'brick_block' });

            // ===== PARCOURS SOUTERRAIN (simplifié - 2 plateformes) =====

            // Plateforme 1 - Première section
            let plat1X = 300;
            level.platforms.push({ x: plat1X, y: groundY - 120, w: 140, h: 20, type: 'brick_block' });
            // Pièces normales
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: plat1X + 20 + i * 30, y: groundY - 150, w: 20, h: 20 });
            }

            // Badnik ennemi (un seul suffit)
            level.enemies.push({
                x: plat1X + 70,
                y: groundY - 170,
                w: 50,
                h: 50,
                type: 'badnik',
                patrolStart: plat1X,
                patrolEnd: plat1X + 140,
                dir: 1,
                speed: 2 * state.difficulty
            });

            // Plateforme 2 - Section bonus (plus haute, avec pièces secrètes)
            let plat2X = 550;
            level.platforms.push({ x: plat2X, y: groundY - 200, w: 160, h: 20, type: 'gold_block' });
            // Pièces secrètes en or (valent 3 pièces chacune)
            for (let i = 0; i < 3; i++) {
                level.coins.push({
                    x: plat2X + 30 + i * 50,
                    y: groundY - 230,
                    w: 25,
                    h: 25,
                    value: 3,
                    secret: true
                });
            }

            // ===== ZONE DU TRÉSOR ET DE LA CLÉ =====
            let treasureX = 800;
            level.platforms.push({ x: treasureX, y: groundY - 150, w: 220, h: 20, type: 'gold_block' });

            // Coffre monstre BOSS qui garde la clé souterraine
            level.enemies.push({
                x: treasureX + 110,
                y: groundY - 230,
                w: 70,
                h: 80,
                type: 'chest_monster',
                patrolStart: treasureX + 50,
                patrolEnd: treasureX + 170,
                dir: -1,
                speed: 2.5 * state.difficulty
            });

            // LA CLÉ SOUTERRAINE (bien visible)
            level.keyItem = { x: treasureX + 100, y: groundY - 200, w: 40, h: 40 };

            // Pièces bonus autour de la clé
            for (let i = 0; i < 5; i++) {
                level.coins.push({ x: treasureX + 20 + i * 35, y: groundY - 180, w: 20, h: 20 });
            }

            // Power-up étoile d'invincibilité
            level.powerups.push({ x: treasureX + 100, y: groundY - 270, w: 35, h: 35, type: 'star' });

            // ===== TUYAU DE SORTIE =====
            let exitX = 1100;
            level.platforms.push({ x: exitX, y: groundY - 80, w: 60, h: 80, type: 'pipe' });

            // Portail de sortie dans le tuyau (vert pour indiquer la sortie)
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
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: exitX - 80 - i * 40, y: groundY - 60, w: 20, h: 20 });
            }

            // Vide mortel
            level.hazards.push({ x: -1000, y: h + 50, w: w * 30, h: 100, type: 'void' });

            return level;
        }
    },


    
    5: {
        name: "🎮 Aventure Minecraft 🎮",
        bgColor: "#87CEEB",
        playerStart: { x: 50, y: 300 },
        needsKey: true,
        setup: (w, h) => {
            const blockSize = 40;
            const level = createEmptyLevel();

            // ===== MONDE PRINCIPAL (Overworld PREMIUM) =====
            level.clouds = [];
            for (let i = 0; i < 15; i++) {
                level.clouds.push({
                    x: i * 120 + Math.random() * 40,
                    y: 30 + Math.random() * 80,
                    w: 60 + Math.random() * 40
                });
            }

            // ============================================================
            // SECTION 1 : VILLAGE DE DÉPART
            // Ambiance paisible, tutoriel implicite
            // ============================================================

            // Sol du village
            for (let i = 0; i < 20; i++) {
                level.platforms.push({ x: i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'grass_block' });
                level.platforms.push({ x: i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'dirt_block' });
            }

            // Première maison (abri du joueur)
            level.platforms.push({ x: 80, y: h - blockSize * 5, w: blockSize * 3, h: blockSize * 3, type: 'wood' });
            level.platforms.push({ x: 80, y: h - blockSize * 6, w: blockSize * 3, h: blockSize, type: 'wood' }); // Toit

            // Pièces de bienvenue (guide le joueur vers la droite)
            for (let i = 0; i < 10; i++) {
                level.coins.push({
                    x: 180 + i * 50,
                    y: h - blockSize * 2 - 40 - Math.sin(i * 0.5) * 20,
                    w: 20, h: 20
                });
            }

            // Puits du village (avec pièces secrètes en profondeur simulée)
            let wellX = 350;
            level.platforms.push({ x: wellX, y: h - blockSize * 3, w: blockSize, h: blockSize, type: 'stone' });
            level.platforms.push({ x: wellX + blockSize * 2, y: h - blockSize * 3, w: blockSize, h: blockSize, type: 'stone' });
            // Pièces "dans" le puits
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: wellX + 50, y: h - blockSize * 2 - 30 - i * 25, w: 25, h: 25, value: 2, secret: true });
            }

            // Arbre géant avec power-up
            let treeX = 500;
            // Tronc
            level.platforms.push({ x: treeX, y: h - blockSize * 6, w: blockSize, h: blockSize * 4, type: 'wood' });
            // Feuillage en forme de croix
            level.platforms.push({ x: treeX - blockSize, y: h - blockSize * 8, w: blockSize * 3, h: blockSize * 2, type: 'leaves' });
            level.platforms.push({ x: treeX, y: h - blockSize * 9, w: blockSize, h: blockSize, type: 'leaves' });
            level.platforms.push({ x: treeX - blockSize * 2, y: h - blockSize * 7, w: blockSize, h: blockSize, type: 'leaves' });
            level.platforms.push({ x: treeX + blockSize * 2, y: h - blockSize * 7, w: blockSize, h: blockSize, type: 'leaves' });
            // Shield sur l'arbre
            level.powerups.push({ x: treeX + 5, y: h - blockSize * 9 - 35, w: 35, h: 35, type: 'shield' });

            // ============================================================
            // SECTION 2 : FORÊT MYSTÉRIEUSE
            // Tension croissante, premiers Creepers
            // ============================================================

            let forestX = 750;

            // Transition : petit gouffre avec pont de bois
            level.platforms.push({ x: forestX - 60, y: h - blockSize * 3, w: blockSize * 3, h: blockSize / 2, type: 'wood' });
            level.hazards.push({ x: forestX - 80, y: h - blockSize, w: 140, h: blockSize, type: 'void' });

            // Sol de la forêt (plus sombre)
            for (let i = 0; i < 15; i++) {
                level.platforms.push({ x: forestX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'grass_block' });
                level.platforms.push({ x: forestX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'dirt_block' });
            }

            // Arbres de la forêt (cachettes pour Creepers)
            for (let t = 0; t < 3; t++) {
                let tx = forestX + 80 + t * 180;
                level.platforms.push({ x: tx, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'wood' });
                level.platforms.push({ x: tx - blockSize, y: h - blockSize * 6, w: blockSize * 3, h: blockSize * 2, type: 'leaves' });
            }

            // CREEPER EMBUSQUÉ #1 (surgit de derrière l'arbre!)
            level.enemies.push({
                x: forestX + 120, y: h - blockSize * 2 - 60, w: 40, h: 60,
                type: 'creeper', patrolStart: forestX + 80, patrolEnd: forestX + 200,
                dir: 1, speed: 1.8 * state.difficulty
            });

            // Pièces en arc dans la forêt
            for (let i = 0; i < 6; i++) {
                level.coins.push({
                    x: forestX + 50 + i * 80,
                    y: h - blockSize * 2 - 60 - Math.abs(i - 2.5) * 15,
                    w: 20, h: 20
                });
            }

            // SPIDER sur sa toile (entre les arbres)
            level.enemies.push({
                x: forestX + 350, y: h - blockSize * 4 - 30, w: 55, h: 45,
                type: 'spider', patrolStart: forestX + 280, patrolEnd: forestX + 420,
                dir: -1, speed: 2.8 * state.difficulty
            });

            // ============================================================
            // SECTION 3 : MINE ABANDONNÉE
            // Descente, rails, lave, spiders
            // ============================================================

            let mineX = forestX + 620;

            // Entrée de la mine (arche de pierre)
            level.platforms.push({ x: mineX, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'stone' });
            level.platforms.push({ x: mineX + blockSize * 3, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'stone' });
            level.platforms.push({ x: mineX, y: h - blockSize * 6, w: blockSize * 4, h: blockSize, type: 'stone' });

            // Sol de la mine (pierre)
            for (let i = 0; i < 12; i++) {
                level.platforms.push({ x: mineX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'stone' });
                level.platforms.push({ x: mineX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'stone' });
            }

            // Lac de lave dans la mine
            level.hazards.push({ x: mineX + blockSize * 4, y: h - blockSize, w: blockSize * 4, h: blockSize, type: 'lava_floor' });

            // Pont au-dessus de la lave
            level.platforms.push({ x: mineX + blockSize * 4.5, y: h - blockSize * 3, w: blockSize * 3, h: blockSize / 2, type: 'wood' });

            // Pièces au-dessus de la lave (risque/récompense)
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: mineX + blockSize * 5 + i * 30, y: h - blockSize * 3 - 40, w: 20, h: 20 });
            }

            // Diamants cachés dans un recoin de la mine
            level.coins.push({ x: mineX + blockSize * 2, y: h - blockSize * 4, w: 30, h: 30, value: 5, secret: true });

            // SKELETON archer dans la mine
            level.enemies.push({
                x: mineX + blockSize * 8, y: h - blockSize * 2 - 60, w: 40, h: 60,
                type: 'skeleton', patrolStart: mineX + blockSize * 6, patrolEnd: mineX + blockSize * 10,
                dir: -1, speed: 1.5 * state.difficulty
            });

            // Super Jump power-up (pour atteindre la section suivante)
            level.powerups.push({ x: mineX + blockSize * 10, y: h - blockSize * 4, w: 35, h: 35, type: 'superJump' });

            // ============================================================
            // SECTION 4 : ARÈNE DE L'ENDERMAN (Mini-boss surprise!)
            // ============================================================

            let arenaX = mineX + blockSize * 14;

            // Plateforme d'arène isolée
            for (let i = 0; i < 10; i++) {
                level.platforms.push({ x: arenaX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'stone' });
                level.platforms.push({ x: arenaX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'stone' });
            }

            // Piliers d'obsidienne décoratifs
            level.platforms.push({ x: arenaX + blockSize, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'netherrack' });
            level.platforms.push({ x: arenaX + blockSize * 8, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'netherrack' });

            // L'ENDERMAN - Mini-boss surprenant!
            level.enemies.push({
                x: arenaX + blockSize * 4.5, y: h - blockSize * 2 - 90, w: 35, h: 90,
                type: 'enderman', patrolStart: arenaX + blockSize * 2, patrolEnd: arenaX + blockSize * 7,
                dir: 1, speed: 2.5 * state.difficulty,
                holdingBlock: true
            });

            // Trésor gardé par l'Enderman
            level.coins.push({ x: arenaX + blockSize * 4.5, y: h - blockSize * 4, w: 30, h: 30, value: 5, secret: true });

            // Magnet power-up après l'arène
            level.powerups.push({ x: arenaX + blockSize * 9, y: h - blockSize * 3, w: 35, h: 35, type: 'magnet' });

            // ============================================================
            // SECTION 5 : PORTAIL DU NETHER
            // Zone de transition épique
            // ============================================================

            let portalAreaX = arenaX + blockSize * 12;

            // Sol de netherrack (transition vers le Nether)
            for (let i = 0; i < 10; i++) {
                level.platforms.push({ x: portalAreaX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'netherrack' });
                level.platforms.push({ x: portalAreaX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'netherrack' });
            }

            // Cadre du portail en "obsidienne"
            let netherPortalX = portalAreaX + blockSize * 3;
            level.platforms.push({ x: netherPortalX - 15, y: h - blockSize * 2 - 120, w: 15, h: 120, type: 'netherrack' });
            level.platforms.push({ x: netherPortalX + 65, y: h - blockSize * 2 - 120, w: 15, h: 120, type: 'netherrack' });
            level.platforms.push({ x: netherPortalX - 15, y: h - blockSize * 2 - 135, w: 95, h: 15, type: 'netherrack' });

            // PORTAIL VERS LE NETHER
            level.portals.push({
                x: netherPortalX,
                y: h - blockSize * 2 - 110,
                w: 65,
                h: 110,
                color: '#8B00FF',
                destX: -999,
                destY: -999,
                isNetherPortal: true
            });

            // Gardiens du portail
            level.enemies.push({
                x: netherPortalX - 80, y: h - blockSize * 2 - 60, w: 50, h: 60,
                type: 'zombie', patrolStart: portalAreaX, patrolEnd: netherPortalX - 20,
                dir: 1, speed: 2 * state.difficulty
            });
            level.enemies.push({
                x: netherPortalX + 100, y: h - blockSize * 2 - 60, w: 40, h: 60,
                type: 'skeleton', patrolStart: netherPortalX + 80, patrolEnd: portalAreaX + blockSize * 9,
                dir: -1, speed: 1.8 * state.difficulty
            });

            // Pièces autour du portail
            for (let i = 0; i < 5; i++) {
                level.coins.push({ x: portalAreaX + 30 + i * 70, y: h - blockSize * 2 - 50, w: 20, h: 20 });
            }

            // ============================================================
            // SECTION 6 : ZONE DE RETOUR
            // Après le Nether, dernière ligne droite
            // ============================================================

            let returnX = portalAreaX + blockSize * 12;

            // Sol de retour (herbe = soulagement)
            for (let i = 0; i < 8; i++) {
                level.platforms.push({ x: returnX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'grass_block' });
                level.platforms.push({ x: returnX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'dirt_block' });
            }

            // Position du portail de retour
            level.returnPortalPos = { x: returnX + 50, y: h - blockSize * 2 - 100 };

            // Derniers ennemis avant la sortie
            level.enemies.push({
                x: returnX + blockSize * 5, y: h - blockSize * 2 - 60, w: 40, h: 60,
                type: 'creeper', patrolStart: returnX + blockSize * 3, patrolEnd: returnX + blockSize * 7,
                dir: 1, speed: 2 * state.difficulty
            });

            // ============================================================
            // SORTIE FINALE
            // ============================================================

            let exitX = returnX + blockSize * 10;

            for (let i = 0; i < 6; i++) {
                level.platforms.push({ x: exitX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'grass_block' });
                level.platforms.push({ x: exitX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'dirt_block' });
            }

            // Maison de sortie stylisée
            level.platforms.push({ x: exitX + blockSize * 2, y: h - blockSize * 5, w: blockSize * 3, h: blockSize * 3, type: 'wood' });
            level.platforms.push({ x: exitX + blockSize * 1.5, y: h - blockSize * 6, w: blockSize * 4, h: blockSize, type: 'wood' });

            level.goal = { x: exitX + blockSize * 3, y: h - blockSize * 2 - 80, w: 40, h: 80, type: 'nether_portal' };

            // Vide mortel
            level.hazards.push({ x: -1000, y: h + 100, w: w * 50, h: 100, type: 'void' });

            return level;
        },

        // ============================================================
        // SOUS-NIVEAU : LE NETHER (Version Premium)
        // ============================================================
        setupNether: (w, h) => {
            const blockSize = 40;
            const level = createEmptyLevel();
            level.clouds = [];

            // ============================================================
            // ZONE 1 : ENTRÉE INFERNALE
            // ============================================================

            // Plateforme de spawn
            for (let i = 0; i < 6; i++) {
                level.platforms.push({ x: i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'netherrack' });
                level.platforms.push({ x: i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'netherrack' });
            }

            // Premier lac de lave
            level.hazards.push({ x: blockSize * 6, y: h - blockSize, w: blockSize * 4, h: blockSize, type: 'lava_floor' });

            // Plateformes au-dessus de la lave
            level.platforms.push({ x: blockSize * 7, y: h - blockSize * 4, w: blockSize * 2, h: blockSize, type: 'netherrack' });
            level.coins.push({ x: blockSize * 7.5, y: h - blockSize * 4 - 35, w: 20, h: 20 });

            // MAGMA CUBE rebondissant
            level.enemies.push({
                x: blockSize * 7.5, y: h - blockSize * 4 - 50, w: 45, h: 50,
                type: 'magma_cube', patrolStart: blockSize * 7, patrolEnd: blockSize * 8.5,
                dir: 1, speed: 2.2 * state.difficulty
            });

            // ============================================================
            // ZONE 2 : CORRIDOR DE FEU
            // ============================================================

            let corridorX = blockSize * 10;

            // Long corridor de netherrack
            for (let i = 0; i < 15; i++) {
                level.platforms.push({ x: corridorX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'netherrack' });
                level.platforms.push({ x: corridorX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'netherrack' });
            }

            // Lave intermittente (danger!)
            level.hazards.push({ x: corridorX + blockSize * 3, y: h - blockSize, w: blockSize * 2, h: blockSize, type: 'lava_floor' });
            level.hazards.push({ x: corridorX + blockSize * 8, y: h - blockSize, w: blockSize * 2, h: blockSize, type: 'lava_floor' });

            // BLAZE flottant (patrouille aérienne)
            level.enemies.push({
                x: corridorX + blockSize * 5, y: h - blockSize * 5, w: 50, h: 60,
                type: 'blaze', patrolStart: corridorX + blockSize * 2, patrolEnd: corridorX + blockSize * 8,
                dir: -1, speed: 1.5 * state.difficulty
            });

            // Pièces sur le parcours
            for (let i = 0; i < 8; i++) {
                level.coins.push({ x: corridorX + blockSize + i * 60, y: h - blockSize * 2 - 50, w: 20, h: 20 });
            }

            // Étoile d'invincibilité (aide pour la suite)
            level.powerups.push({ x: corridorX + blockSize * 6, y: h - blockSize * 3 - 30, w: 35, h: 35, type: 'star' });

            // Zombie Pigman
            level.enemies.push({
                x: corridorX + blockSize * 11, y: h - blockSize * 2 - 60, w: 50, h: 60,
                type: 'zombie', patrolStart: corridorX + blockSize * 10, patrolEnd: corridorX + blockSize * 14,
                dir: 1, speed: 2.5 * state.difficulty
            });

            // ============================================================
            // ZONE 3 : SALLE DU GHAST
            // ============================================================

            let ghastRoomX = corridorX + blockSize * 16;

            // Grande salle ouverte
            for (let i = 0; i < 12; i++) {
                level.platforms.push({ x: ghastRoomX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'netherrack' });
                level.platforms.push({ x: ghastRoomX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'netherrack' });
            }

            // Piliers pour se protéger
            level.platforms.push({ x: ghastRoomX + blockSize * 2, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'netherrack' });
            level.platforms.push({ x: ghastRoomX + blockSize * 6, y: h - blockSize * 6, w: blockSize, h: blockSize * 4, type: 'netherrack' });
            level.platforms.push({ x: ghastRoomX + blockSize * 9, y: h - blockSize * 5, w: blockSize, h: blockSize * 3, type: 'netherrack' });

            // LE GHAST - Gardien redoutable!
            level.enemies.push({
                x: ghastRoomX + blockSize * 5, y: h - blockSize * 8, w: 70, h: 70,
                type: 'ghast', patrolStart: ghastRoomX + blockSize * 2, patrolEnd: ghastRoomX + blockSize * 9,
                dir: 1, speed: 1.3 * state.difficulty
            });

            // Second Magma Cube (renfort)
            level.enemies.push({
                x: ghastRoomX + blockSize * 8, y: h - blockSize * 2 - 50, w: 40, h: 45,
                type: 'magma_cube', patrolStart: ghastRoomX + blockSize * 7, patrolEnd: ghastRoomX + blockSize * 10,
                dir: -1, speed: 2 * state.difficulty
            });

            // Pièces bonus sur les piliers
            level.coins.push({ x: ghastRoomX + blockSize * 2.2, y: h - blockSize * 5 - 35, w: 25, h: 25, value: 3 });
            level.coins.push({ x: ghastRoomX + blockSize * 6.2, y: h - blockSize * 6 - 35, w: 25, h: 25, value: 3 });
            level.coins.push({ x: ghastRoomX + blockSize * 9.2, y: h - blockSize * 5 - 35, w: 25, h: 25, value: 3 });

            // ============================================================
            // ZONE 4 : CHAMBRE DE LA CLÉ
            // ============================================================

            let keyRoomX = ghastRoomX + blockSize * 14;

            // Petite plateforme isolée
            for (let i = 0; i < 5; i++) {
                level.platforms.push({ x: keyRoomX + i * blockSize, y: h - blockSize * 4, w: blockSize, h: blockSize, type: 'netherrack' });
            }

            // LA CLÉ DU NETHER (DIAMANT!)
            level.keyItem = { x: keyRoomX + blockSize * 2, y: h - blockSize * 4 - 50, w: 45, h: 45, type: 'diamond' };

            // Pièces autour de la clé
            level.coins.push({ x: keyRoomX + blockSize * 0.5, y: h - blockSize * 4 - 35, w: 20, h: 20 });
            level.coins.push({ x: keyRoomX + blockSize * 3.5, y: h - blockSize * 4 - 35, w: 20, h: 20 });

            // Dernier Blaze gardien
            level.enemies.push({
                x: keyRoomX + blockSize * 2.5, y: h - blockSize * 6, w: 45, h: 55,
                type: 'blaze', patrolStart: keyRoomX + blockSize, patrolEnd: keyRoomX + blockSize * 4,
                dir: 1, speed: 1.8 * state.difficulty
            });

            // ============================================================
            // ZONE 5 : PORTAIL DE RETOUR
            // ============================================================

            let returnPortalX = keyRoomX + blockSize * 7;

            // Plateforme du portail
            for (let i = 0; i < 5; i++) {
                level.platforms.push({ x: returnPortalX + i * blockSize, y: h - blockSize * 2, w: blockSize, h: blockSize, type: 'netherrack' });
                level.platforms.push({ x: returnPortalX + i * blockSize, y: h - blockSize, w: blockSize, h: blockSize, type: 'netherrack' });
            }

            // Cadre du portail
            level.platforms.push({ x: returnPortalX + blockSize - 10, y: h - blockSize * 2 - 110, w: 10, h: 110, type: 'netherrack' });
            level.platforms.push({ x: returnPortalX + blockSize * 3, y: h - blockSize * 2 - 110, w: 10, h: 110, type: 'netherrack' });

            // PORTAIL DE RETOUR
            level.portals.push({
                x: returnPortalX + blockSize,
                y: h - blockSize * 2 - 100,
                w: blockSize * 2,
                h: 100,
                color: '#00FF00',
                destX: -998,
                destY: -998,
                isReturnPortal: true
            });

            // Vide mortel
            level.hazards.push({ x: -1000, y: h + 100, w: w * 50, h: 100, type: 'void' });

            return level;
        }
    },
    
    6: {
        name: "🧪 Centre de Test Aperture 🧪",
        bgColor: "#E8E8E8",
        playerStart: { x: 80, y: 300 },
        needsKey: true,
        setup: (w, h) => {
            const unit = 40; // Taille de bloc standard
            const level = createEmptyLevel();

            // ============================================================
            // STRUCTURE : 5 CHAMBRES DE TEST + SORTIE
            // Inspiré de Portal 2 : progression, apprentissage, maîtrise
            // ============================================================

            // Variables de positionnement des chambres
            const chamberWidth = 500;
            const chamberGap = 80;
            let currentX = 0;

            // ============================================================
            // CHAMBRE 00 : SAS D'ENTRÉE
            // "Bienvenue au Centre de Test Aperture"
            // ============================================================

            // Sol du SAS
            for (let i = 0; i < 8; i++) {
                level.platforms.push({
                    x: currentX + i * unit,
                    y: h - unit * 2,
                    w: unit, h: unit * 2,
                    type: 'test_chamber_floor'
                });
            }

            // Mur gauche du SAS
            level.platforms.push({
                x: currentX - unit,
                y: h - unit * 8,
                w: unit, h: unit * 8,
                type: 'test_chamber_wall'
            });

            // Plafond du SAS
            level.platforms.push({
                x: currentX,
                y: h - unit * 8,
                w: unit * 8, h: unit,
                type: 'test_chamber_wall'
            });

            // Pièces d'introduction (guide vers la droite)
            for (let i = 0; i < 5; i++) {
                level.coins.push({
                    x: currentX + 50 + i * 50,
                    y: h - unit * 2 - 50,
                    w: 20, h: 20
                });
            }

            // Signalétique "00" (visuel, pas de collision)
            level.decorations = level.decorations || [];
            level.decorations.push({
                type: 'chamber_sign',
                x: currentX + 20,
                y: h - unit * 7,
                number: '00'
            });

            currentX += chamberWidth;

            // ============================================================
            // CHAMBRE 01 : INTRODUCTION AUX PORTAILS
            // Objectif : Comprendre que les portails téléportent
            // ============================================================

            // Sol de la chambre 01
            for (let i = 0; i < 12; i++) {
                level.platforms.push({
                    x: currentX + i * unit,
                    y: h - unit * 2,
                    w: unit, h: unit * 2,
                    type: 'test_chamber_floor'
                });
            }

            // MUR SÉPARATEUR (impossible à franchir sans portail)
            level.platforms.push({
                x: currentX + unit * 5,
                y: h - unit * 7,
                w: unit, h: unit * 5,
                type: 'test_chamber_wall'
            });

            // Plafond
            level.platforms.push({
                x: currentX,
                y: h - unit * 8,
                w: unit * 12, h: unit,
                type: 'test_chamber_wall'
            });

            // PORTAIL BLEU A (entrée) - Sur le mur gauche
            level.portals.push({
                x: currentX + unit,
                y: h - unit * 2 - 80,
                w: 50, h: 80,
                color: '#00AAFF',
                destX: currentX + unit * 7,
                destY: h - unit * 2 - 80,
                portalPair: 'blue_01_B'
            });

            // PORTAIL BLEU B (sortie) - De l'autre côté du mur
            level.portals.push({
                x: currentX + unit * 7,
                y: h - unit * 2 - 80,
                w: 50, h: 80,
                color: '#00AAFF',
                destX: currentX + unit,
                destY: h - unit * 2 - 80,
                portalPair: 'blue_01_A'
            });

            // Pièces après le mur (récompense)
            for (let i = 0; i < 4; i++) {
                level.coins.push({
                    x: currentX + unit * 8 + i * 40,
                    y: h - unit * 2 - 50,
                    w: 20, h: 20
                });
            }

            // Signalétique "01"
            level.decorations.push({
                type: 'chamber_sign',
                x: currentX + 20,
                y: h - unit * 7,
                number: '01'
            });

            currentX += chamberWidth + chamberGap;

            // ============================================================
            // CHAMBRE 02 : CONSERVATION DU MOMENTUM (FLING!)
            // Objectif : Apprendre que la vitesse est conservée
            // "Speedy thing goes in, speedy thing comes out"
            // ============================================================

            // Sol de la chambre (avec trou au milieu pour le portail)
            for (let i = 0; i < 5; i++) {
                level.platforms.push({
                    x: currentX + i * unit,
                    y: h - unit * 2,
                    w: unit, h: unit * 2,
                    type: 'test_chamber_floor'
                });
            }
            // Trou pour le portail au sol (entre x+5 et x+7)
            for (let i = 8; i < 14; i++) {
                level.platforms.push({
                    x: currentX + i * unit,
                    y: h - unit * 2,
                    w: unit, h: unit * 2,
                    type: 'test_chamber_floor'
                });
            }

            // PLATEFORME HAUTE pour prendre de l'élan
            level.platforms.push({
                x: currentX + unit * 2,
                y: h - unit * 6,
                w: unit * 3, h: unit,
                type: 'test_chamber_platform'
            });

            // Échelle pour monter sur la plateforme haute
            level.ladders.push({
                x: currentX + unit,
                y: h - unit * 6,
                w: 30, h: unit * 4
            });

            // PORTAIL ORANGE A (au "sol" du trou) - Entrée de chute
            level.portals.push({
                x: currentX + unit * 5.5,
                y: h - unit,
                w: 80, h: 40,
                color: '#FF6600',
                destX: currentX + unit * 8,
                destY: h - unit * 5,
                portalPair: 'orange_02_B',
                isFloorPortal: true,
                exitDirection: 'right' // Projection horizontale
            });

            // PORTAIL ORANGE B (sur le mur) - Sortie horizontale
            level.portals.push({
                x: currentX + unit * 8,
                y: h - unit * 5 - 40,
                w: 50, h: 80,
                color: '#FF6600',
                destX: currentX + unit * 5.5,
                destY: h - unit - 40,
                portalPair: 'orange_02_A',
                isWallPortal: true
            });

            // PLATEFORME CIBLE (accessible uniquement via fling)
            level.platforms.push({
                x: currentX + unit * 11,
                y: h - unit * 5,
                w: unit * 3, h: unit,
                type: 'test_chamber_platform'
            });

            // PIÈCES EN L'AIR (à attraper pendant le fling!)
            for (let i = 0; i < 3; i++) {
                level.coins.push({
                    x: currentX + unit * 9 + i * 35,
                    y: h - unit * 5 - 30,
                    w: 25, h: 25,
                    value: 2
                });
            }

            // Shield sur la plateforme cible (récompense)
            level.powerups.push({
                x: currentX + unit * 12,
                y: h - unit * 5 - 40,
                w: 35, h: 35,
                type: 'shield'
            });

            // Danger en bas du trou (punition si raté)
            level.hazards.push({
                x: currentX + unit * 5,
                y: h - unit * 0.5,
                w: unit * 3, h: unit / 2,
                type: 'energy_field'
            });

            // Plafond
            level.platforms.push({
                x: currentX,
                y: h - unit * 8,
                w: unit * 14, h: unit,
                type: 'test_chamber_wall'
            });

            // Signalétique "02"
            level.decorations.push({
                type: 'chamber_sign',
                x: currentX + 20,
                y: h - unit * 7,
                number: '02'
            });

            currentX += chamberWidth + chamberGap + 100;

            // ============================================================
            // CHAMBRE 03 : PUZZLE D'ACTIVATION
            // Objectif : Comprendre les boutons et mécanismes
            // ============================================================

            // Sol en plusieurs sections
            for (let i = 0; i < 6; i++) {
                level.platforms.push({
                    x: currentX + i * unit,
                    y: h - unit * 2,
                    w: unit, h: unit * 2,
                    type: 'test_chamber_floor'
                });
            }

            // Fosse avec plateforme de pression
            level.platforms.push({
                x: currentX + unit * 6,
                y: h - unit,
                w: unit * 2, h: unit,
                type: 'pressure_plate'
            });

            for (let i = 8; i < 16; i++) {
                level.platforms.push({
                    x: currentX + i * unit,
                    y: h - unit * 2,
                    w: unit, h: unit * 2,
                    type: 'test_chamber_floor'
                });
            }

            // PLATEFORME MOBILE (activée conceptuellement par la zone)
            level.platforms.push({
                x: currentX + unit * 9,
                y: h - unit * 4,
                w: unit * 3, h: unit / 2,
                type: 'moving',
                vx: 0,
                vy: 1.5 * state.difficulty,
                minY: h - unit * 6,
                maxY: h - unit * 3
            });

            // TOURELLE (ennemi style Portal)
            level.enemies.push({
                x: currentX + unit * 12,
                y: h - unit * 2 - 50,
                w: 40, h: 50,
                type: 'turret',
                patrolStart: currentX + unit * 10,
                patrolEnd: currentX + unit * 14,
                dir: -1,
                speed: 1.5 * state.difficulty
            });

            // Portail CYAN pour passer au-dessus de la tourelle
            level.portals.push({
                x: currentX + unit * 5,
                y: h - unit * 2 - 80,
                w: 50, h: 80,
                color: '#00FFFF',
                destX: currentX + unit * 14,
                destY: h - unit * 5,
                portalPair: 'cyan_03_B'
            });

            // Portail CYAN B (en hauteur, sortie sécurisée)
            level.portals.push({
                x: currentX + unit * 14,
                y: h - unit * 5 - 80,
                w: 50, h: 80,
                color: '#00FFFF',
                destX: currentX + unit * 5,
                destY: h - unit * 2 - 80,
                portalPair: 'cyan_03_A'
            });

            // Plateforme haute de sécurité
            level.platforms.push({
                x: currentX + unit * 13,
                y: h - unit * 5,
                w: unit * 3, h: unit,
                type: 'test_chamber_platform'
            });

            // Pièces sur le parcours
            for (let i = 0; i < 5; i++) {
                level.coins.push({
                    x: currentX + unit * 9 + i * 30,
                    y: h - unit * 2 - 60,
                    w: 20, h: 20
                });
            }

            // Super Jump (pour la chambre suivante)
            level.powerups.push({
                x: currentX + unit * 15,
                y: h - unit * 5 - 40,
                w: 35, h: 35,
                type: 'superJump'
            });

            // Plafond
            level.platforms.push({
                x: currentX,
                y: h - unit * 8,
                w: unit * 16, h: unit,
                type: 'test_chamber_wall'
            });

            // Signalétique "03"
            level.decorations.push({
                type: 'chamber_sign',
                x: currentX + 20,
                y: h - unit * 7,
                number: '03'
            });

            currentX += chamberWidth + chamberGap + 150;

            // ============================================================
            // CHAMBRE 04 : LA SALLE DE LA CLÉ (PUZZLE PRINCIPAL)
            // Objectif : Combiner toutes les mécaniques apprises
            // La clé est VISIBLE mais INACCESSIBLE directement
            // ============================================================

            // Sol principal (zone de départ de la chambre)
            for (let i = 0; i < 6; i++) {
                level.platforms.push({
                    x: currentX + i * unit,
                    y: h - unit * 2,
                    w: unit, h: unit * 2,
                    type: 'test_chamber_floor'
                });
            }

            // GRANDE FOSSE CENTRALE (danger!)
            level.hazards.push({
                x: currentX + unit * 6,
                y: h - unit,
                w: unit * 6, h: unit,
                type: 'acid_pool'
            });

            // Sol après la fosse
            for (let i = 12; i < 20; i++) {
                level.platforms.push({
                    x: currentX + i * unit,
                    y: h - unit * 2,
                    w: unit, h: unit * 2,
                    type: 'test_chamber_floor'
                });
            }

            // ===== PLATEFORME DE LA CLÉ (INACCESSIBLE DIRECTEMENT) =====
            // Positionnée en hauteur, au-dessus de la fosse
            level.platforms.push({
                x: currentX + unit * 8,
                y: h - unit * 6,
                w: unit * 3, h: unit,
                type: 'key_platform'
            });

            // LA CLÉ ! (visible mais comment l'atteindre ?)
            level.keyItem = {
                x: currentX + unit * 9,
                y: h - unit * 6 - 50,
                w: 45, h: 45,
                type: 'aperture_key'
            };

            // ===== SOLUTION DU PUZZLE =====

            // ÉTAPE 1 : Plateforme intermédiaire haute à gauche
            level.platforms.push({
                x: currentX + unit * 2,
                y: h - unit * 5,
                w: unit * 3, h: unit,
                type: 'test_chamber_platform'
            });

            // Échelle pour atteindre la plateforme intermédiaire
            level.ladders.push({
                x: currentX + unit,
                y: h - unit * 5,
                w: 30, h: unit * 3
            });

            // ÉTAPE 2 : Portail VIOLET A (sur la plateforme intermédiaire)
            // Le joueur doit TOMBER dedans depuis plus haut
            level.portals.push({
                x: currentX + unit * 3,
                y: h - unit * 5,
                w: 60, h: 40,
                color: '#9900FF',
                destX: currentX + unit * 5,
                destY: h - unit * 4,
                portalPair: 'violet_04_B',
                isFloorPortal: true,
                exitDirection: 'up-right'
            });

            // ÉTAPE 3 : Plateforme TRÈS haute pour prendre de l'élan
            level.platforms.push({
                x: currentX + unit,
                y: h - unit * 8,
                w: unit * 4, h: unit,
                type: 'test_chamber_platform'
            });

            // Échelle vers la plateforme très haute
            level.ladders.push({
                x: currentX + unit * 4.5,
                y: h - unit * 8,
                w: 30, h: unit * 3
            });

            // PORTAIL VIOLET B (sortie murale) - Projette vers la clé !
            level.portals.push({
                x: currentX + unit * 5,
                y: h - unit * 5 - 80,
                w: 50, h: 80,
                color: '#9900FF',
                destX: currentX + unit * 3,
                destY: h - unit * 5,
                portalPair: 'violet_04_A',
                isWallPortal: true
            });

            // ===== GARDIENS DE LA CLÉ =====

            // Chest Monster patrouille en bas
            level.enemies.push({
                x: currentX + unit * 14,
                y: h - unit * 2 - 60,
                w: 60, h: 60,
                type: 'chest_monster',
                patrolStart: currentX + unit * 12,
                patrolEnd: currentX + unit * 18,
                dir: -1,
                speed: 2 * state.difficulty
            });

            // Tourelle sur une plateforme latérale
            level.platforms.push({
                x: currentX + unit * 15,
                y: h - unit * 4,
                w: unit * 2, h: unit,
                type: 'test_chamber_platform'
            });
            level.enemies.push({
                x: currentX + unit * 15.5,
                y: h - unit * 4 - 50,
                w: 40, h: 50,
                type: 'turret',
                patrolStart: currentX + unit * 15,
                patrolEnd: currentX + unit * 16.5,
                dir: -1,
                speed: 1 * state.difficulty
            });

            // Pièces autour de la clé (récompense risquée)
            level.coins.push({ x: currentX + unit * 8.2, y: h - unit * 6 - 40, w: 25, h: 25, value: 3 });
            level.coins.push({ x: currentX + unit * 10.2, y: h - unit * 6 - 40, w: 25, h: 25, value: 3 });

            // Pièces sur le chemin sécurisé
            for (let i = 0; i < 6; i++) {
                level.coins.push({
                    x: currentX + unit * 13 + i * 40,
                    y: h - unit * 2 - 50,
                    w: 20, h: 20
                });
            }

            // Plafond de la chambre
            level.platforms.push({
                x: currentX,
                y: h - unit * 10,
                w: unit * 20, h: unit,
                type: 'test_chamber_wall'
            });

            // Mur droit (fin de chambre)
            level.platforms.push({
                x: currentX + unit * 19,
                y: h - unit * 10,
                w: unit, h: unit * 8,
                type: 'test_chamber_wall'
            });

            // Signalétique "04"
            level.decorations.push({
                type: 'chamber_sign',
                x: currentX + 20,
                y: h - unit * 9,
                number: '04'
            });

            // ===== PORTAIL DE RETOUR (après avoir la clé) =====
            level.portals.push({
                x: currentX + unit * 17,
                y: h - unit * 2 - 80,
                w: 50, h: 80,
                color: '#00FF00',
                destX: 100,
                destY: h - unit * 2 - 80,
                portalPair: 'green_return_B'
            });

            currentX += chamberWidth + chamberGap + 200;

            // ============================================================
            // CHAMBRE FINALE : SORTIE
            // Retour au début avec la clé pour ouvrir la porte
            // ============================================================

            // Le portail vert ramène au début (x=100)
            // Portail vert B (au début, près de la sortie)
            level.portals.push({
                x: 100,
                y: h - unit * 2 - 80,
                w: 50, h: 80,
                color: '#00FF00',
                destX: currentX - chamberWidth - 100 + unit * 17,
                destY: h - unit * 2 - 80,
                portalPair: 'green_return_A'
            });

            // Plateforme de sortie (à côté du SAS d'entrée)
            level.platforms.push({
                x: 200,
                y: h - unit * 4,
                w: unit * 4, h: unit,
                type: 'exit_platform'
            });

            // Échelle vers la sortie
            level.ladders.push({
                x: 180,
                y: h - unit * 4,
                w: 30, h: unit * 2
            });

            // LA SORTIE FINALE (nécessite la clé!)
            level.goal = {
                x: 280,
                y: h - unit * 4 - 80,
                w: 60, h: 80,
                type: 'aperture_exit'
            };

            // Pièces finales
            for (let i = 0; i < 4; i++) {
                level.coins.push({
                    x: 220 + i * 35,
                    y: h - unit * 4 - 50,
                    w: 20, h: 20
                });
            }

            // ============================================================
            // ÉLÉMENTS GLOBAUX
            // ============================================================

            // Vide mortel (sous les plateformes)
            level.hazards.push({
                x: -1000,
                y: h + 50,
                w: w * 30,
                h: 100,
                type: 'void'
            });

            // Pièces secrètes cachées dans les chambres
            level.coins.push({ x: currentX - chamberWidth * 2, y: h - unit * 9, w: 30, h: 30, value: 5, secret: true });
            level.coins.push({ x: 50, y: h - unit * 7, w: 30, h: 30, value: 5, secret: true });

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
                    // Pièces autour des chevaliers (dangereux!)
                    level.coins.push({ x: currentX + gap / 2 - 40, y: wallY - 50, w: 20, h: 20 });
                    level.coins.push({ x: currentX + gap / 2 + 20, y: wallY - 50, w: 20, h: 20 });
                }

                level.platforms.push({ x: currentX + gap, y: wallY, w: width, h: h, type: 'castle_wall' });
                // Pièces sur TOUS les murs (pas seulement pairs)
                level.coins.push({ x: currentX + gap + width / 2, y: wallY - 50, w: 20, h: 20 });
                // Pièce bonus en hauteur sur certains murs
                if (i % 3 === 0) level.coins.push({ x: currentX + gap + width / 2, y: wallY - 120, w: 20, h: 20 });
                currentX += gap + width;
            }
            
            let ropeGap = 400;
            level.platforms.push({ x: currentX + 50, y: wallY - 50, w: 60, h: 10, type: 'moving', vx: 4 * state.difficulty, minX: currentX + 50, maxX: currentX + ropeGap - 50 });
            // Pièces le long du parcours de la corde
            for (let i = 0; i < 6; i++) level.coins.push({ x: currentX + 80 + i * 60, y: wallY - 90, w: 20, h: 20 });

            level.platforms.push({ x: currentX + ropeGap, y: wallY, w: 300, h: h, type: 'castle_wall' });
            // Pièces finales avant la cloche
            for (let i = 0; i < 4; i++) level.coins.push({ x: currentX + ropeGap + 50 + i * 50, y: wallY - 60, w: 20, h: 20 });

            level.goal = { x: currentX + ropeGap + 150, y: wallY - 100, w: 60, h: 80, type: 'bell' };
            level.hazards.push({ x: -1000, y: h + 100, w: w * 20, h: 100, type: 'void' });

            // Power-up étoile d'invincibilité pour traverser les dangers
            level.powerups.push({ x: currentX / 2, y: wallY - 90, w: 35, h: 35, type: 'star' });

            // Tours d'archers qui lancent des flèches !
            level.archers = [
                { x: currentX * 0.3, y: wallY - 180, w: 50, h: 80 },
                { x: currentX * 0.6, y: wallY - 180, w: 50, h: 80 },
                { x: currentX * 0.85, y: wallY - 180, w: 50, h: 80 }
            ];

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
    // NIVEAU 9 - BOMBJACK !
    // Collecter les pièces dans l'ordre pour un SUPER BONUS !
    // ========================================
    9: {
        name: "💣 TEMPLE DES BOMBES 💣",
        bgColor: "#0a1628",
        playerStart: { x: 400, y: 400 },
        needsKey: false,
        bombJackLevel: true, // Flag spécial pour activer le vol !
        setup: (w, h) => {
            const level = createEmptyLevel();
            const groundY = h - 60;

            // Pyramides égyptiennes en arrière-plan
            level.pyramids = [
                { x: 50, y: groundY - 200, size: 200 },
                { x: w - 250, y: groundY - 180, size: 180 }
            ];

            // Étoiles dans le ciel
            level.stars = [];
            for (let i = 0; i < 100; i++) {
                level.stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h * 0.6,
                    size: Math.random() * 2 + 1,
                    twinkle: Math.random() * Math.PI * 2
                });
            }

            // Sol principal (petit, juste pour démarrer)
            level.platforms.push({ x: 200, y: groundY, w: 400, h: 60, type: 'egyptian_ground' });

            // ===== PLATEFORMES FLOTTANTES STYLE BOMBJACK =====
            // Disposition en grille asymétrique pour le fun!

            // Rangée du bas (y = groundY - 120)
            level.platforms.push({ x: 100, y: groundY - 120, w: 120, h: 15, type: 'floating' });
            level.platforms.push({ x: 350, y: groundY - 120, w: 120, h: 15, type: 'floating' });
            level.platforms.push({ x: 600, y: groundY - 120, w: 120, h: 15, type: 'floating' });
            level.platforms.push({ x: 850, y: groundY - 120, w: 120, h: 15, type: 'floating' });

            // Rangée du milieu-bas (y = groundY - 220)
            level.platforms.push({ x: 50, y: groundY - 220, w: 100, h: 15, type: 'floating' });
            level.platforms.push({ x: 250, y: groundY - 220, w: 140, h: 15, type: 'floating' });
            level.platforms.push({ x: 500, y: groundY - 220, w: 100, h: 15, type: 'floating' });
            level.platforms.push({ x: 700, y: groundY - 220, w: 140, h: 15, type: 'floating' });
            level.platforms.push({ x: 900, y: groundY - 220, w: 100, h: 15, type: 'floating' });

            // Rangée du milieu (y = groundY - 320)
            level.platforms.push({ x: 150, y: groundY - 320, w: 120, h: 15, type: 'floating' });
            level.platforms.push({ x: 400, y: groundY - 320, w: 160, h: 15, type: 'floating' });
            level.platforms.push({ x: 700, y: groundY - 320, w: 120, h: 15, type: 'floating' });

            // Rangée du milieu-haut (y = groundY - 420)
            level.platforms.push({ x: 100, y: groundY - 420, w: 100, h: 15, type: 'floating' });
            level.platforms.push({ x: 300, y: groundY - 420, w: 120, h: 15, type: 'floating' });
            level.platforms.push({ x: 550, y: groundY - 420, w: 100, h: 15, type: 'floating' });
            level.platforms.push({ x: 800, y: groundY - 420, w: 120, h: 15, type: 'floating' });

            // Rangée du haut (y = groundY - 500)
            level.platforms.push({ x: 200, y: groundY - 500, w: 140, h: 15, type: 'floating' });
            level.platforms.push({ x: 500, y: groundY - 500, w: 140, h: 15, type: 'floating' });
            level.platforms.push({ x: 750, y: groundY - 500, w: 120, h: 15, type: 'floating' });

            // ===== PIÈCES SPÉCIALES NUMÉROTÉES (6 pièces) =====
            // Ces pièces doivent être collectées dans l'ordre 1→2→3→4→5→6 pour le SUPER BONUS!
            // TOUTES SUR DES PLATEFORMES pour être accessibles !

            level.specialCoins = [
                { x: 660, y: groundY - 160, w: 30, h: 30, number: 1, collected: false },  // Sur plateforme x=600
                { x: 110, y: groundY - 260, w: 30, h: 30, number: 2, collected: false },  // Sur plateforme x=50
                { x: 540, y: groundY - 260, w: 30, h: 30, number: 3, collected: false },  // Sur plateforme x=500
                { x: 760, y: groundY - 360, w: 30, h: 30, number: 4, collected: false },  // Sur plateforme x=700
                { x: 350, y: groundY - 460, w: 30, h: 30, number: 5, collected: false },  // Sur plateforme x=300
                { x: 860, y: groundY - 460, w: 30, h: 30, number: 6, collected: false }   // Sur plateforme x=800 (haut droite)
            ];

            // Pièces normales partout pour faire joli (comme dans BombJack original)
            for (let i = 0; i < 20; i++) {
                level.coins.push({
                    x: 80 + Math.random() * 900,
                    y: groundY - 80 - Math.random() * 480,
                    w: 20,
                    h: 20
                });
            }

            // Power-ups stratégiques
            level.powerups.push({ x: 450, y: groundY - 360, w: 35, h: 35, type: 'shield' });
            level.powerups.push({ x: 210, y: groundY - 460, w: 35, h: 35, type: 'magnet' });

            // Ennemis volants (style sphinx/scarabées)
            level.enemies.push({ x: 200, y: groundY - 250, w: 40, h: 40, type: 'sphinx', patrolStart: 150, patrolEnd: 350, dir: 1, speed: 1.5 * state.difficulty });
            level.enemies.push({ x: 600, y: groundY - 350, w: 40, h: 40, type: 'sphinx', patrolStart: 500, patrolEnd: 750, dir: -1, speed: 1.8 * state.difficulty });
            level.enemies.push({ x: 400, y: groundY - 450, w: 40, h: 40, type: 'sphinx', patrolStart: 300, patrolEnd: 600, dir: 1, speed: 2 * state.difficulty });

            // Sortie (pyramide avec porte)
            level.goal = { x: 450, y: groundY - 70, w: 80, h: 70, type: 'pyramid_door' };

            // Vide
            level.hazards.push({ x: -1000, y: h + 100, w: w * 3, h: 100, type: 'void' });

            return level;
        }
    },

    // ========================================
    // NIVEAU 10 - BOSS FINAL !
    // Zone Sonic + Boss Multi-Phases
    // ========================================
    10: {
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
            
            // ===== LE BOSS : DR. EGGMAN-LIKE (ADAPTÉ À LA DIFFICULTÉ!) =====
            const bossHp = state.difficulty <= 0.7 ? 3 : state.difficulty <= 1.2 ? 5 : 8;
            level.boss = {
                x: arenaStart + arenaWidth / 2,
                y: groundY - 250,
                w: 100,
                h: 100,
                hp: bossHp,
                maxHp: bossHp,
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
    },

    // NIVEAU 11 - FRUITY FRANK (Niveau Caché / Bonus)
    // Remastered : Moteur grid-based avec graphismes HD
    // ========================================================
    11: {
        name: "🍓 SUPER FRUITY FRANK 🍓",
        bgColor: "#1a0505", // Fond prune très sombre pour faire ressortir les couleurs
        playerStart: { x: 0, y: 0 }, // Géré par le moteur fruity
        needsKey: false,
        fruityFrankLevel: true,
        setup: (w, h) => {
            return { fruityFrank: true };
        }
    },

    // ============================================================
    // NIVEAU 12 - LE MONDE DES ESPRITS (Hommage à Miyazaki)
    // 千と千尋の神隠し - Spirited Away
    // ============================================================
    // NIVEAU CACHÉ - Inspiré du Voyage de Chihiro
    // Direction artistique : Poésie visuelle, mélancolie, beauté étrange
    // Gameplay : Exploration contemplative avec moments de tension
    // ============================================================
    12: {
        name: "🌸 Le Monde des Esprits 🌸",
        bgColor: "#1a1a2e", // Crépuscule bleu-violet profond
        playerStart: { x: 80, y: 400 },
        needsKey: true,
        hidden: true, // Niveau caché pour tests
        setup: (w, h) => {
            const unit = 40;
            const level = createEmptyLevel();

            // Étoiles scintillantes pour le ciel crépusculaire
            level.stars = [];
            for (let i = 0; i < 80; i++) {
                level.stars.push({
                    x: Math.random() * 8000,
                    y: Math.random() * h * 0.6,
                    size: 1 + Math.random() * 2,
                    twinkle: Math.random() * Math.PI * 2
                });
            }

            // Décorations spéciales Miyazaki
            level.decorations = level.decorations || [];

            // ============================================================
            // SECTION 1 : L'ENTRÉE DU MONDE DES ESPRITS
            // "Un tunnel rouge mène vers l'inconnu..."
            // ============================================================

            let currentX = 0;

            // Sol de départ - monde réel (herbe et terre)
            for (let i = 0; i < 8; i++) {
                level.platforms.push({
                    x: currentX + i * unit, y: h - unit * 2,
                    w: unit, h: unit * 2, type: 'spirit_grass'
                });
            }

            // Torii d'entrée (portail traditionnel japonais)
            level.decorations.push({
                type: 'torii_gate',
                x: currentX + unit * 3,
                y: h - unit * 6,
                scale: 1.5
            });

            // Pièces d'introduction (pétales de sakura)
            for (let i = 0; i < 5; i++) {
                level.coins.push({
                    x: currentX + 60 + i * 45,
                    y: h - unit * 2 - 50,
                    w: 22, h: 22, type: 'sakura_petal'
                });
            }

            // Première NOIRAUDE (Susuwatari) - créature inoffensive
            level.enemies.push({
                x: currentX + 200, y: h - unit * 2 - 25,
                w: 30, h: 30, type: 'soot_sprite',
                patrolStart: currentX + 150, patrolEnd: currentX + 280,
                dir: 1, speed: 0.8, harmless: true
            });

            // Tunnel mystérieux (transition)
            currentX += unit * 8;

            // Entrée du tunnel
            level.platforms.push({
                x: currentX, y: h - unit * 5,
                w: unit * 6, h: unit * 3, type: 'spirit_tunnel'
            });
            level.platforms.push({
                x: currentX, y: h - unit * 2,
                w: unit * 6, h: unit * 2, type: 'spirit_stone'
            });

            // Portail de transition (téléporte vers l'autre côté)
            level.portals.push({
                x: currentX + unit * 2, y: h - unit * 5 + 20,
                w: 80, h: 100,
                color: '#ff6b6b',
                destX: currentX + unit * 8,
                destY: h - unit * 2 - 80,
                portalPair: 'torii_entrance',
                isToriiPortal: true
            });

            currentX += unit * 8;

            // Sortie du tunnel - monde des esprits
            for (let i = 0; i < 6; i++) {
                level.platforms.push({
                    x: currentX + i * unit, y: h - unit * 2,
                    w: unit, h: unit * 2, type: 'spirit_stone'
                });
            }

            // Lanternes flottantes (décor animé)
            for (let i = 0; i < 4; i++) {
                level.decorations.push({
                    type: 'floating_lantern',
                    x: currentX + 50 + i * 120,
                    y: h - unit * 4 - Math.random() * 80,
                    color: ['#ff9f43', '#ee5a24', '#ffc048'][i % 3]
                });
            }

            // ============================================================
            // SECTION 2 : LES ÉCHOPPES ABANDONNÉES
            // "Des stands de nourriture vides... ou pas tout à fait"
            // ============================================================

            currentX += unit * 8;

            // Grande plateforme des échoppes
            for (let i = 0; i < 15; i++) {
                level.platforms.push({
                    x: currentX + i * unit, y: h - unit * 2,
                    w: unit, h: unit * 2, type: 'spirit_wood'
                });
            }

            // Échoppes de nourriture (décor)
            level.decorations.push({ type: 'food_stall', x: currentX + unit * 2, y: h - unit * 4 });
            level.decorations.push({ type: 'food_stall', x: currentX + unit * 6, y: h - unit * 4 });
            level.decorations.push({ type: 'food_stall', x: currentX + unit * 10, y: h - unit * 4 });

            // SANS-VISAGE (Kaonashi) - Premier apparition mystérieuse
            // Il est immobile et observe... pour l'instant
            level.enemies.push({
                x: currentX + unit * 5, y: h - unit * 2 - 80,
                w: 50, h: 80, type: 'noface',
                patrolStart: currentX + unit * 4, patrolEnd: currentX + unit * 7,
                dir: 1, speed: 0.5 * state.difficulty,
                phase: 'curious' // curious, offering, chasing
            });

            // Pièces dans les échoppes (récompenses cachées)
            level.coins.push({ x: currentX + unit * 2.5, y: h - unit * 5, w: 25, h: 25, value: 3, type: 'gold_coin' });
            level.coins.push({ x: currentX + unit * 6.5, y: h - unit * 5, w: 25, h: 25, value: 3, type: 'gold_coin' });
            level.coins.push({ x: currentX + unit * 10.5, y: h - unit * 5, w: 25, h: 25, value: 3, type: 'gold_coin' });

            // Plus de noiraudes qui travaillent
            for (let i = 0; i < 3; i++) {
                level.enemies.push({
                    x: currentX + unit * (3 + i * 4), y: h - unit * 2 - 25,
                    w: 25, h: 25, type: 'soot_sprite',
                    patrolStart: currentX + unit * (2 + i * 4), patrolEnd: currentX + unit * (4 + i * 4),
                    dir: (i % 2 === 0) ? 1 : -1, speed: 1, harmless: true,
                    carryingStar: (i === 1) // Une porte une étoile de charbon
                });
            }

            // Power-up bouclier caché derrière une échoppe
            level.powerups.push({
                x: currentX + unit * 8, y: h - unit * 2 - 50,
                w: 35, h: 35, type: 'shield'
            });

            // ============================================================
            // SECTION 3 : LES BAINS PUBLICS D'ABURAYA (Zone verticale)
            // "Le palais des bains où travaillent les esprits"
            // ============================================================

            currentX += unit * 16;

            // Base des bains (grande structure)
            for (let i = 0; i < 20; i++) {
                level.platforms.push({
                    x: currentX + i * unit, y: h - unit * 2,
                    w: unit, h: unit * 2, type: 'bathhouse_floor'
                });
            }

            // Structure verticale des bains (plateformes à grimper)
            // Niveau 1
            level.platforms.push({
                x: currentX + unit * 2, y: h - unit * 5,
                w: unit * 4, h: unit, type: 'bathhouse_platform'
            });
            level.platforms.push({
                x: currentX + unit * 14, y: h - unit * 5,
                w: unit * 4, h: unit, type: 'bathhouse_platform'
            });

            // Niveau 2
            level.platforms.push({
                x: currentX + unit * 6, y: h - unit * 8,
                w: unit * 8, h: unit, type: 'bathhouse_platform'
            });

            // Niveau 3 - Plateforme avec l'ESPRIT DU RADIS
            level.platforms.push({
                x: currentX + unit * 4, y: h - unit * 11,
                w: unit * 12, h: unit, type: 'bathhouse_platform'
            });

            // Échelles pour monter
            level.ladders.push({
                x: currentX + unit * 18, y: h - unit * 5,
                w: 35, h: unit * 3
            });
            level.ladders.push({
                x: currentX + unit * 6, y: h - unit * 8,
                w: 35, h: unit * 3
            });
            level.ladders.push({
                x: currentX + unit * 14, y: h - unit * 11,
                w: 35, h: unit * 3
            });

            // ESPRIT DU RADIS (Oshira-sama) - Grand esprit bienveillant
            // Il bouge lentement et sert presque de plateforme mobile
            level.enemies.push({
                x: currentX + unit * 8, y: h - unit * 11 - 90,
                w: 70, h: 90, type: 'radish_spirit',
                patrolStart: currentX + unit * 5, patrolEnd: currentX + unit * 13,
                dir: 1, speed: 0.3, harmless: true, rideable: true
            });

            // Vapeurs et brume (décor animé)
            for (let i = 0; i < 6; i++) {
                level.decorations.push({
                    type: 'steam_cloud',
                    x: currentX + unit * (2 + i * 3),
                    y: h - unit * (3 + (i % 3) * 2),
                    size: 0.5 + Math.random() * 0.5
                });
            }

            // YUBABA'S BIRD - Ennemi volant dangereux
            level.enemies.push({
                x: currentX + unit * 10, y: h - unit * 9,
                w: 55, h: 45, type: 'yubaba_bird',
                patrolStart: currentX + unit * 4, patrolEnd: currentX + unit * 16,
                dir: -1, speed: 2.5 * state.difficulty
            });

            // Pièces le long du parcours vertical
            for (let i = 0; i < 4; i++) {
                level.coins.push({ x: currentX + unit * (3 + i), y: h - unit * 5 - 35, w: 20, h: 20 });
            }
            for (let i = 0; i < 6; i++) {
                level.coins.push({ x: currentX + unit * (7 + i), y: h - unit * 8 - 35, w: 20, h: 20 });
            }
            // Pièces précieuses en haut
            for (let i = 0; i < 3; i++) {
                level.coins.push({ x: currentX + unit * (6 + i * 3), y: h - unit * 11 - 50, w: 25, h: 25, value: 5 });
            }

            // Power-up super saut pour atteindre les hauteurs
            level.powerups.push({
                x: currentX + unit * 10, y: h - unit * 8 - 50,
                w: 35, h: 35, type: 'super_jump'
            });

            // ============================================================
            // SECTION 4 : LE PONT ET LA DESCENTE VERS LE TRAIN
            // "Il faut descendre vers la gare du train fantôme"
            // ============================================================

            currentX += unit * 22;

            // Pont traditionnel japonais
            level.platforms.push({
                x: currentX, y: h - unit * 11,
                w: unit * 10, h: unit, type: 'spirit_bridge'
            });

            // Rampes du pont (décor)
            level.decorations.push({
                type: 'bridge_railing',
                x: currentX, y: h - unit * 12,
                width: unit * 10
            });

            // Second SANS-VISAGE sur le pont (plus agressif maintenant)
            level.enemies.push({
                x: currentX + unit * 5, y: h - unit * 11 - 80,
                w: 50, h: 80, type: 'noface',
                patrolStart: currentX + unit * 2, patrolEnd: currentX + unit * 8,
                dir: -1, speed: 1.2 * state.difficulty,
                phase: 'chasing'
            });

            // Plateformes de descente (style escalier)
            for (let i = 0; i < 5; i++) {
                level.platforms.push({
                    x: currentX + unit * 10 + i * unit * 2,
                    y: h - unit * (10 - i * 1.5),
                    w: unit * 2, h: unit,
                    type: 'spirit_stone'
                });
                // Pièces sur chaque marche
                level.coins.push({
                    x: currentX + unit * 10.5 + i * unit * 2,
                    y: h - unit * (10 - i * 1.5) - 40,
                    w: 20, h: 20
                });
            }

            // BOH MOUSE - Petite souris rapide
            level.enemies.push({
                x: currentX + unit * 14, y: h - unit * 7 - 20,
                w: 30, h: 25, type: 'boh_mouse',
                patrolStart: currentX + unit * 12, patrolEnd: currentX + unit * 18,
                dir: 1, speed: 3 * state.difficulty
            });

            // ============================================================
            // SECTION 5 : LA GARE ET LE TRAIN SUR L'EAU
            // "Le train qui traverse l'océan infini au crépuscule"
            // C'est LE moment poétique du niveau
            // ============================================================

            currentX += unit * 22;

            // Quai de la gare
            for (let i = 0; i < 8; i++) {
                level.platforms.push({
                    x: currentX + i * unit, y: h - unit * 2,
                    w: unit, h: unit * 2, type: 'train_platform'
                });
            }

            // Petit abri de gare (décor)
            level.decorations.push({
                type: 'train_station',
                x: currentX + unit * 2, y: h - unit * 5
            });

            // Panneau de la gare "6番目の駅" (6ème station)
            level.decorations.push({
                type: 'station_sign',
                x: currentX + unit * 5, y: h - unit * 4,
                text: '六番目'
            });

            // L'EAU INFINIE (zone de danger mais aussi de beauté)
            level.hazards.push({
                x: currentX + unit * 8, y: h - unit,
                w: unit * 40, h: unit,
                type: 'spirit_water'
            });

            // LE TRAIN FANTÔME - Grande plateforme mobile !
            // C'est une expérience unique : le joueur monte sur le train
            level.platforms.push({
                x: currentX + unit * 10, y: h - unit * 3,
                w: unit * 8, h: unit,
                type: 'spirit_train',
                moving: true,
                vx: 2, vy: 0,
                minX: currentX + unit * 10,
                maxX: currentX + unit * 40
            });

            // Fenêtres du train (décor sur la plateforme)
            level.decorations.push({
                type: 'train_windows',
                x: currentX + unit * 10, y: h - unit * 5,
                width: unit * 8
            });

            // Passagers fantômes dans le train (décor animé)
            level.decorations.push({
                type: 'ghost_passengers',
                x: currentX + unit * 12, y: h - unit * 4,
                count: 3
            });

            // Pièces à collecter PENDANT le trajet en train
            for (let i = 0; i < 8; i++) {
                level.coins.push({
                    x: currentX + unit * (12 + i * 3),
                    y: h - unit * 4 - 20 + Math.sin(i) * 30,
                    w: 22, h: 22
                });
            }

            // Lanternes sur pilotis au milieu de l'eau
            for (let i = 0; i < 5; i++) {
                level.decorations.push({
                    type: 'water_lantern',
                    x: currentX + unit * (15 + i * 6),
                    y: h - unit * 2
                });
            }

            // Îlot secret avec power-up étoile (récompense pour les explorateurs)
            level.platforms.push({
                x: currentX + unit * 25, y: h - unit * 5,
                w: unit * 3, h: unit,
                type: 'spirit_stone'
            });
            level.powerups.push({
                x: currentX + unit * 26, y: h - unit * 5 - 50,
                w: 35, h: 35, type: 'star'
            });

            // Arrivée à la destination du train
            currentX += unit * 42;

            // Quai d'arrivée
            for (let i = 0; i < 6; i++) {
                level.platforms.push({
                    x: currentX + i * unit, y: h - unit * 2,
                    w: unit, h: unit * 2, type: 'train_platform'
                });
            }

            // ============================================================
            // SECTION 6 : LE JARDIN DE ZENIBA
            // "La maison paisible au bout du voyage"
            // Moment de calme avant la conclusion
            // ============================================================

            currentX += unit * 8;

            // Chemin de pierres
            for (let i = 0; i < 12; i++) {
                level.platforms.push({
                    x: currentX + i * unit, y: h - unit * 2,
                    w: unit, h: unit * 2, type: 'garden_path'
                });
            }

            // Arbres à esprits (décor avec lucioles)
            level.decorations.push({ type: 'spirit_tree', x: currentX + unit * 2, y: h - unit * 6 });
            level.decorations.push({ type: 'spirit_tree', x: currentX + unit * 8, y: h - unit * 7 });

            // Lucioles (particules décoratives)
            for (let i = 0; i < 8; i++) {
                level.decorations.push({
                    type: 'firefly',
                    x: currentX + unit * (1 + i * 1.5),
                    y: h - unit * (3 + Math.random() * 3),
                    phase: Math.random() * Math.PI * 2
                });
            }

            // La maison de Zeniba (décor)
            level.decorations.push({
                type: 'zeniba_house',
                x: currentX + unit * 4, y: h - unit * 6
            });

            // Dernière noiraude amicale devant la maison
            level.enemies.push({
                x: currentX + unit * 6, y: h - unit * 2 - 25,
                w: 30, h: 30, type: 'soot_sprite',
                patrolStart: currentX + unit * 5, patrolEnd: currentX + unit * 8,
                dir: 1, speed: 0.5, harmless: true, friendly: true
            });

            // ============================================================
            // LA CLÉ : LE SCEAU DE ZENIBA
            // "L'amour qu'on met dans quelque chose le rend précieux"
            // ============================================================

            level.keyItem = {
                x: currentX + unit * 5.5, y: h - unit * 2 - 60,
                w: 45, h: 45, type: 'zeniba_seal'
            };

            // Pièces finales autour de la clé
            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                level.coins.push({
                    x: currentX + unit * 5.5 + Math.cos(angle) * 60,
                    y: h - unit * 2 - 60 + Math.sin(angle) * 40,
                    w: 20, h: 20, value: 2
                });
            }

            // ============================================================
            // SECTION 7 : LE RETOUR - La porte de sortie
            // "Quand tu passeras le tunnel, ne te retourne pas"
            // ============================================================

            currentX += unit * 14;

            // Chemin final vers la sortie
            for (let i = 0; i < 10; i++) {
                level.platforms.push({
                    x: currentX + i * unit, y: h - unit * 2,
                    w: unit, h: unit * 2, type: 'spirit_grass'
                });
            }

            // Dernier torii de sortie
            level.decorations.push({
                type: 'torii_gate',
                x: currentX + unit * 5,
                y: h - unit * 6,
                scale: 1.5,
                isExit: true
            });

            // Pétales de sakura final (récompenses)
            for (let i = 0; i < 8; i++) {
                level.coins.push({
                    x: currentX + 50 + i * 40,
                    y: h - unit * 2 - 40 - Math.sin(i * 0.5) * 30,
                    w: 22, h: 22, type: 'sakura_petal'
                });
            }

            // Power-up magnet final
            level.powerups.push({
                x: currentX + unit * 3, y: h - unit * 2 - 60,
                w: 35, h: 35, type: 'magnet'
            });

            // LA SORTIE
            level.goal = {
                x: currentX + unit * 6, y: h - unit * 2 - 80,
                w: 70, h: 80, type: 'spirit_gate'
            };

            // Vide mortel (l'eau spirituelle en dessous)
            level.hazards.push({
                x: -1000, y: h + 50,
                w: 10000, h: 100, type: 'void'
            });

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
