// ============================================================
// L'AVENTURE DE LÉO - AMÉLIORATIONS VISUELLES v2.0
// Design par un Game Artist professionnel
// ============================================================

// ===== SYSTÈME DE DÉCORS DYNAMIQUES =====

// Cache pour les éléments de décor générés
const VisualCache = {
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    level5: null,
    level6: null,
    level7: null,
    level8: null,
    level9: null,
    level10: null,
    initialized: false
};

// ===== NIVEAU 1 : LA PRAIRIE ENCHANTÉE =====
function initLevel1Visuals(w, h) {
    if (VisualCache.level1) return VisualCache.level1;

    const visuals = {
        // Nuages avec différentes tailles et vitesses (parallax)
        clouds: [],
        // Montagnes en arrière-plan
        mountains: [],
        // Arbres décoratifs
        trees: [],
        // Buissons
        bushes: [],
        // Fleurs
        flowers: [],
        // Papillons
        butterflies: [],
        // Oiseaux
        birds: []
    };

    // Générer les nuages (3 couches de parallax)
    for (let layer = 0; layer < 3; layer++) {
        const count = 4 + layer * 2;
        for (let i = 0; i < count; i++) {
            visuals.clouds.push({
                x: Math.random() * w * 3,
                y: 30 + layer * 40 + Math.random() * 60,
                width: 80 + Math.random() * 120 - layer * 20,
                height: 30 + Math.random() * 30,
                speed: 0.2 + layer * 0.15,
                opacity: 0.9 - layer * 0.2,
                layer: layer
            });
        }
    }

    // Générer les montagnes (2 couches)
    for (let layer = 0; layer < 2; layer++) {
        const baseY = h * 0.4 + layer * 80;
        visuals.mountains.push({
            points: generateMountainPoints(w * 3, baseY, layer),
            color: layer === 0 ? '#7eb8a2' : '#a8d5ba',
            layer: layer
        });
    }

    // Générer les arbres
    for (let i = 0; i < 15; i++) {
        visuals.trees.push({
            x: i * 200 + Math.random() * 100,
            y: h * 0.45 + Math.random() * 50,
            scale: 0.5 + Math.random() * 0.5,
            type: Math.floor(Math.random() * 3), // 3 types d'arbres
            swayOffset: Math.random() * Math.PI * 2
        });
    }

    // Générer les buissons
    for (let i = 0; i < 25; i++) {
        visuals.bushes.push({
            x: i * 120 + Math.random() * 60,
            y: h * 0.55 + Math.random() * 30,
            scale: 0.3 + Math.random() * 0.4,
            type: Math.floor(Math.random() * 2)
        });
    }

    // Générer les fleurs (groupées près des plateformes)
    for (let i = 0; i < 50; i++) {
        visuals.flowers.push({
            x: Math.random() * w * 3,
            groundY: 0, // Sera ajusté selon la plateforme
            type: Math.floor(Math.random() * 4), // 4 types de fleurs
            color: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bca'][Math.floor(Math.random() * 5)],
            swayOffset: Math.random() * Math.PI * 2,
            scale: 0.5 + Math.random() * 0.5
        });
    }

    // Générer les papillons
    for (let i = 0; i < 8; i++) {
        visuals.butterflies.push({
            x: Math.random() * w * 2,
            y: 100 + Math.random() * 200,
            targetX: Math.random() * w * 2,
            targetY: 100 + Math.random() * 200,
            color: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bca'][Math.floor(Math.random() * 5)],
            wingPhase: Math.random() * Math.PI * 2,
            size: 8 + Math.random() * 6
        });
    }

    // Générer les oiseaux
    for (let i = 0; i < 5; i++) {
        visuals.birds.push({
            x: Math.random() * w * 2,
            y: 50 + Math.random() * 100,
            vx: 1 + Math.random() * 2,
            wingPhase: Math.random() * Math.PI * 2,
            size: 10 + Math.random() * 8
        });
    }

    VisualCache.level1 = visuals;
    return visuals;
}

function generateMountainPoints(width, baseY, layer) {
    const points = [];
    const segments = 20 + layer * 10;
    const amplitude = 100 - layer * 30;

    for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const noise = Math.sin(i * 0.5) * amplitude * 0.5 +
                      Math.sin(i * 0.3) * amplitude * 0.3 +
                      Math.sin(i * 0.7) * amplitude * 0.2;
        points.push({ x, y: baseY - Math.abs(noise) });
    }
    return points;
}

// ===== NIVEAU 2 : LE ROYAUME DES NUAGES =====
function initLevel2Visuals(w, h) {
    if (VisualCache.level2) return VisualCache.level2;

    const visuals = {
        // Nuages de fond (gros et moelleux)
        bgClouds: [],
        // Étoiles scintillantes (c'est haut dans le ciel!)
        stars: [],
        // Oiseaux
        birds: [],
        // Rayons de lumière
        lightRays: [],
        // Îles flottantes décoratives
        floatingIslands: []
    };

    // Gros nuages de fond
    for (let i = 0; i < 12; i++) {
        visuals.bgClouds.push({
            x: Math.random() * w * 3,
            y: h * 0.3 + Math.random() * h * 0.5,
            width: 150 + Math.random() * 200,
            height: 60 + Math.random() * 80,
            speed: 0.1 + Math.random() * 0.2,
            opacity: 0.3 + Math.random() * 0.3,
            puffCount: 3 + Math.floor(Math.random() * 3)
        });
    }

    // Petites étoiles qui scintillent
    for (let i = 0; i < 30; i++) {
        visuals.stars.push({
            x: Math.random() * w * 3,
            y: Math.random() * h * 0.4,
            size: 1 + Math.random() * 2,
            twinkleOffset: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.05 + Math.random() * 0.1
        });
    }

    // Oiseaux volant en formation
    for (let i = 0; i < 7; i++) {
        visuals.birds.push({
            x: -100 + Math.random() * 200,
            y: 80 + Math.random() * 120,
            vx: 0.8 + Math.random() * 1.2,
            wingPhase: Math.random() * Math.PI * 2,
            size: 12 + Math.random() * 8,
            formationOffset: i * 30
        });
    }

    // Rayons de lumière divine
    for (let i = 0; i < 5; i++) {
        visuals.lightRays.push({
            x: i * 400 + Math.random() * 200,
            width: 80 + Math.random() * 60,
            opacity: 0.1 + Math.random() * 0.1,
            swayOffset: Math.random() * Math.PI * 2
        });
    }

    // Petites îles flottantes décoratives
    for (let i = 0; i < 4; i++) {
        visuals.floatingIslands.push({
            x: 200 + i * 500 + Math.random() * 200,
            y: h * 0.2 + Math.random() * h * 0.3,
            width: 60 + Math.random() * 40,
            floatOffset: Math.random() * Math.PI * 2,
            hasTree: Math.random() > 0.5
        });
    }

    VisualCache.level2 = visuals;
    return visuals;
}

// ===== NIVEAU 3 : LE DONJON MAUDIT (VERSION SUBLIMÉE) =====
function initLevel3Visuals(w, h) {
    if (VisualCache.level3) return VisualCache.level3;

    const visuals = {
        pillars: [],
        chains: [],
        windows: [],
        dust: [],
        rays: [], // Ajout de rayons de lumière pour l'effet WOW
        // Nouveaux éléments WOW
        fogLayers: [],
        magicRunes: [],
        cobwebs: [],
        skulls: [],
        waterDrips: [],
        floatingSpirits: [],
        crackedStones: [],
        wallMoss: []
    };

    // Piliers de cathédrale gothique (structure rythmée)
    const spacing = 400;
    for (let i = -1; i < 20; i++) {
        visuals.pillars.push({
            x: i * spacing,
            width: 80, // Plus larges pour plus de prestance
            type: i % 2 === 0 ? 'major' : 'minor' // Alternance gros/petits piliers
        });
    }

    // Vitraux (Moins nombreux mais plus impactants)
    for (let i = 0; i < 10; i++) {
        visuals.windows.push({
            x: i * spacing * 2 + 200,
            y: h * 0.2,
            w: 100,
            h: 180,
            color: i % 2 === 0 ? '#3498db' : '#9b59b6' // Bleu et Violet mystique
        });
    }

    // Chaînes décoratives avec crânes
    for (let i = 0; i < 15; i++) {
        visuals.chains.push({
            x: i * 450 + 100,
            y: 0,
            length: 80 + seededRandom(i * 107) * 180,
            swayOffset: seededRandom(i * 109) * Math.PI * 2,
            hasSkull: seededRandom(i * 111) > 0.6
        });
    }

    // Couches de brouillard (effet de profondeur)
    for (let layer = 0; layer < 4; layer++) {
        visuals.fogLayers.push({
            y: h * (0.5 + layer * 0.15),
            opacity: 0.15 - layer * 0.03,
            speed: 0.3 + layer * 0.2,
            offset: seededRandom(layer * 113) * 1000
        });
    }

    // Runes magiques sur les murs (lueur mystérieuse)
    for (let i = 0; i < 20; i++) {
        visuals.magicRunes.push({
            x: seededRandom(i * 127) * w * 3,
            y: h * 0.3 + seededRandom(i * 131) * h * 0.4,
            size: 15 + seededRandom(i * 137) * 25,
            glowPhase: seededRandom(i * 139) * Math.PI * 2,
            symbol: Math.floor(seededRandom(i * 149) * 6),
            color: seededRandom(i * 151) > 0.5 ? '#00ff88' : '#ff6b6b'
        });
    }

    // Rayons de lumière (God Rays)
    for (let i = 0; i < 6; i++) {
        visuals.rays.push({
            x: i * 600 + 100,
            width: 150 + Math.random() * 100,
            alpha: 0.1 + Math.random() * 0.1
        });
    }

    // Toiles d'araignée dans les coins
    for (let i = 0; i < 18; i++) {
        visuals.cobwebs.push({
            x: seededRandom(i * 157) * w * 3,
            y: seededRandom(i * 163) * h * 0.3,
            size: 60 + seededRandom(i * 167) * 80,
            type: Math.floor(seededRandom(i * 173) * 3)
        });
    }

    // Crânes décoratifs
    for (let i = 0; i < 12; i++) {
        visuals.skulls.push({
            x: seededRandom(i * 179) * w * 3,
            y: h * 0.7 + seededRandom(i * 181) * h * 0.2,
            size: 20 + seededRandom(i * 191) * 15,
            rotation: (seededRandom(i * 193) - 0.5) * 0.5
        });
    }

    // Gouttes d'eau qui tombent
    for (let i = 0; i < 30; i++) {
        visuals.waterDrips.push({
            x: seededRandom(i * 197) * w * 3,
            startY: seededRandom(i * 199) * h * 0.3,
            speed: 2 + seededRandom(i * 211) * 3,
            phase: seededRandom(i * 223) * 100
        });
    }

    // Esprits flottants (wisps)
    for (let i = 0; i < 8; i++) {
        visuals.floatingSpirits.push({
            x: seededRandom(i * 227) * w * 2,
            y: h * 0.2 + seededRandom(i * 229) * h * 0.5,
            size: 15 + seededRandom(i * 233) * 20,
            phaseX: seededRandom(i * 239) * Math.PI * 2,
            phaseY: seededRandom(i * 241) * Math.PI * 2,
            color: ['#74b9ff', '#a29bfe', '#81ecec'][i % 3]
        });
    }

    // Poussière flottante améliorée
    for (let i = 0; i < 80; i++) {
        visuals.dust.push({
            x: seededRandom(i * 251) * w * 2,
            y: seededRandom(i * 257) * h,
            size: 1 + seededRandom(i * 263) * 2.5,
            speed: 0.1 + seededRandom(i * 269) * 0.4,
            brightness: 0.2 + seededRandom(i * 271) * 0.3
        });
    }

    VisualCache.level3 = visuals;
    return visuals;
}

// ===== NIVEAU 4 : MONDE CHAMPIGNON (VERSION CLASSIC MARIO) =====
function initLevel4Visuals(w, h) {
    if (VisualCache.level4) return VisualCache.level4;

    const visuals = {
        // --- ÉLÉMENTS DE FOND ACTIFS ---
        hills: [],
        clouds: [],
        bushes: [],
        
        // --- ÉLÉMENTS VIDE (Pour ne pas perturber le joueur) ---
        // On laisse les tableaux vides pour éviter les bugs si le moteur de rendu les cherche
        bgMushrooms: [],     // Supprimé : Trop distrayant
        questionBlocks: [],  // Supprimé : C'était des faux blocs !
        floatingCoins: [],   // Supprimé : C'était des fausses pièces !
        pipes: [],           // Supprimé : Les vrais tuyaux sont dans levels.js
        fireflies: [],       
        sparkles: [],
        butterflies: [],
        flowers: [],
        grassTufts: []
    };

    // Soleil (Optionnel, on peut le garder en haut à droite)
    visuals.sun = { x: w - 100, y: 80, rayPhase: 0 };

    // 1. COLLINES (Style Mario : Vertes et simples)
    // On remplace les collines bleues complexes par des collines vertes classiques
    for (let i = 0; i < 6; i++) {
        visuals.hills.push({
            x: i * 600, // Espacées régulièrement
            y: h * 0.65, 
            w: 400, 
            h: 300, 
            color: '#009900', // Vert Mario classique
            border: '#006600', // Contour plus sombre
            layer: 0.2 // Très loin derrière
        });
    }

    // 2. NUAGES (Style Mario : Blancs et en haut)
    for (let i = 0; i < 8; i++) {
        visuals.clouds.push({
            x: seededRandom(i * 100) * w * 2,
            y: 50 + seededRandom(i * 200) * 150, // Restent dans le ciel
            width: 80 + seededRandom(i * 300) * 60,
            height: 40,
            speed: 0.05, // Bougent très doucement
            puffs: 3
        });
    }

    // 3. BUISSONS (Au sol uniquement)
    // Ils décorent le sol sans gêner la vue
    for (let i = 0; i < 10; i++) {
        visuals.bushes.push({
            x: i * 400 + 50, // Alignés ou semi-aléatoires
            y: h * 0.88, // Juste posés sur le sol (supposant que le sol est à h*0.9)
            width: 100,
            hasEyes: false, // Pas d'yeux pour rester sobre
            parallax: 0.5
        });
    }

    VisualCache.level4 = visuals;
    return visuals;
}

// ===== FONCTIONS DE DESSIN NIVEAU 1 =====

function drawLevel1Background(ctx, w, h, camX) {
    const visuals = initLevel1Visuals(w, h);

    // Fond dégradé ciel (du bleu clair au blanc)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#87CEEB');    // Bleu ciel
    skyGradient.addColorStop(0.3, '#B0E0E6');  // Bleu poudré
    skyGradient.addColorStop(0.6, '#E0F7FA');  // Bleu très clair
    skyGradient.addColorStop(1, '#FFFDE7');    // Jaune pâle (horizon)
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Soleil avec rayons
    drawSun(ctx, w - 150, 120);

    // Montagnes en arrière-plan (avec parallax)
    for (const mountain of visuals.mountains) {
        const parallax = 0.1 + mountain.layer * 0.1;
        drawMountain(ctx, mountain, camX * parallax, h);
    }

    // Nuages (avec parallax)
    for (const cloud of visuals.clouds) {
        const parallax = 0.2 + cloud.layer * 0.15;
        drawFluffyCloud(ctx, cloud.x - camX * parallax, cloud.y, cloud.width, cloud.height, cloud.opacity);
    }

    // Arbres en arrière-plan
    for (const tree of visuals.trees) {
        drawTree(ctx, tree.x - camX * 0.3, tree.y, tree.scale, tree.type, tree.swayOffset);
    }

    // Buissons
    for (const bush of visuals.bushes) {
        drawBush(ctx, bush.x - camX * 0.4, bush.y, bush.scale, bush.type);
    }
}

function drawLevel1Foreground(ctx, w, h, camX) {
    const visuals = initLevel1Visuals(w, h);

    // Papillons animés
    for (const butterfly of visuals.butterflies) {
        updateButterfly(butterfly, w);
        drawButterfly(ctx, butterfly.x - camX * 0.8, butterfly.y, butterfly);
    }

    // Oiseaux
    for (const bird of visuals.birds) {
        updateBird(bird, w);
        drawBird(ctx, bird.x - camX * 0.5, bird.y, bird);
    }
}

function drawSun(ctx, x, y) {
    const time = state.frameTick * 0.02;
    const pulse = Math.sin(time) * 5;

    // Halo externe
    const haloGradient = ctx.createRadialGradient(x, y, 0, x, y, 150 + pulse);
    haloGradient.addColorStop(0, 'rgba(255, 244, 117, 0.4)');
    haloGradient.addColorStop(0.5, 'rgba(255, 244, 117, 0.1)');
    haloGradient.addColorStop(1, 'rgba(255, 244, 117, 0)');
    ctx.fillStyle = haloGradient;
    ctx.beginPath();
    ctx.arc(x, y, 150 + pulse, 0, Math.PI * 2);
    ctx.fill();

    // Rayons de soleil
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(time * 0.1);
    for (let i = 0; i < 12; i++) {
        ctx.save();
        ctx.rotate(i * Math.PI / 6);
        ctx.fillStyle = 'rgba(255, 244, 117, 0.3)';
        ctx.beginPath();
        ctx.moveTo(0, -50);
        ctx.lineTo(10, -120 - pulse);
        ctx.lineTo(-10, -120 - pulse);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    ctx.restore();

    // Corps du soleil
    const sunGradient = ctx.createRadialGradient(x - 10, y - 10, 0, x, y, 50);
    sunGradient.addColorStop(0, '#FFFDE7');
    sunGradient.addColorStop(0.5, '#FFF59D');
    sunGradient.addColorStop(1, '#FFD54F');
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();
}

function drawMountain(ctx, mountain, offsetX, h) {
    ctx.fillStyle = mountain.color;
    ctx.beginPath();
    ctx.moveTo(mountain.points[0].x - offsetX, h);

    for (const point of mountain.points) {
        ctx.lineTo(point.x - offsetX, point.y);
    }

    ctx.lineTo(mountain.points[mountain.points.length - 1].x - offsetX, h);
    ctx.closePath();
    ctx.fill();

    // Ombrage subtil
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fill();
}

function drawFluffyCloud(ctx, x, y, width, height, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;

    // Nuage composé de plusieurs cercles
    const gradient = ctx.createRadialGradient(x + width/2, y, 0, x + width/2, y, width/2);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(1, '#E8E8E8');
    ctx.fillStyle = gradient;

    // Forme principale du nuage
    const puffs = [
        { dx: 0, dy: 0, r: height * 0.8 },
        { dx: width * 0.25, dy: -height * 0.2, r: height * 0.9 },
        { dx: width * 0.5, dy: 0, r: height * 0.85 },
        { dx: width * 0.75, dy: -height * 0.1, r: height * 0.7 },
        { dx: width * 0.15, dy: height * 0.2, r: height * 0.6 },
        { dx: width * 0.6, dy: height * 0.15, r: height * 0.5 }
    ];

    for (const puff of puffs) {
        ctx.beginPath();
        ctx.arc(x + puff.dx, y + puff.dy, puff.r, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

function drawTree(ctx, x, y, scale, type, swayOffset) {
    const sway = Math.sin(state.frameTick * 0.02 + swayOffset) * 3 * scale;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Tronc
    const trunkGradient = ctx.createLinearGradient(-15, 0, 15, 0);
    trunkGradient.addColorStop(0, '#5D4037');
    trunkGradient.addColorStop(0.5, '#795548');
    trunkGradient.addColorStop(1, '#4E342E');
    ctx.fillStyle = trunkGradient;

    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-8, -80);
    ctx.lineTo(8, -80);
    ctx.lineTo(12, 0);
    ctx.closePath();
    ctx.fill();

    // Feuillage selon le type
    ctx.translate(sway, 0);

    if (type === 0) {
        // Arbre rond
        drawRoundTreeFoliage(ctx);
    } else if (type === 1) {
        // Sapin
        drawPineTreeFoliage(ctx);
    } else {
        // Arbre en forme de champignon
        drawMushroomTreeFoliage(ctx);
    }

    ctx.restore();
}

function drawRoundTreeFoliage(ctx) {
    const colors = ['#2E7D32', '#388E3C', '#43A047', '#4CAF50'];

    // Couches de feuillage
    const layers = [
        { y: -90, r: 50 },
        { y: -110, r: 45 },
        { y: -130, r: 35 },
        { y: -145, r: 25 }
    ];

    for (let i = 0; i < layers.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(0, layers[i].y, layers[i].r, 0, Math.PI * 2);
        ctx.fill();
    }

    // Highlights
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(-10, -120, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawPineTreeFoliage(ctx) {
    ctx.fillStyle = '#1B5E20';

    // Triangles superposés
    for (let i = 0; i < 4; i++) {
        const y = -80 - i * 30;
        const w = 60 - i * 10;
        const h = 50 - i * 5;

        ctx.fillStyle = i % 2 === 0 ? '#2E7D32' : '#1B5E20';
        ctx.beginPath();
        ctx.moveTo(0, y - h);
        ctx.lineTo(-w/2, y);
        ctx.lineTo(w/2, y);
        ctx.closePath();
        ctx.fill();
    }
}

function drawMushroomTreeFoliage(ctx) {
    // Grande canopée arrondie
    const gradient = ctx.createRadialGradient(0, -110, 0, 0, -110, 70);
    gradient.addColorStop(0, '#66BB6A');
    gradient.addColorStop(0.7, '#43A047');
    gradient.addColorStop(1, '#2E7D32');
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.ellipse(0, -110, 70, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    // Texture
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(-30 + i * 15, -100 - (i % 2) * 10, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawBush(ctx, x, y, scale, type) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(0.6, '#388E3C');
    gradient.addColorStop(1, '#2E7D32');
    ctx.fillStyle = gradient;

    // Forme de buisson
    ctx.beginPath();
    ctx.arc(-20, 0, 25, 0, Math.PI * 2);
    ctx.arc(0, -10, 30, 0, Math.PI * 2);
    ctx.arc(20, 0, 25, 0, Math.PI * 2);
    ctx.arc(0, 10, 20, 0, Math.PI * 2);
    ctx.fill();

    // Petites fleurs sur le buisson
    if (type === 0) {
        ctx.fillStyle = '#FFEB3B';
        ctx.beginPath();
        ctx.arc(-15, -15, 4, 0, Math.PI * 2);
        ctx.arc(10, -20, 3, 0, Math.PI * 2);
        ctx.arc(5, 5, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

function updateButterfly(butterfly, w) {
    // Mouvement erratique vers la cible
    const dx = butterfly.targetX - butterfly.x;
    const dy = butterfly.targetY - butterfly.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 20) {
        butterfly.targetX = Math.random() * w * 2;
        butterfly.targetY = 100 + Math.random() * 200;
    }

    butterfly.x += dx * 0.01 + Math.sin(state.frameTick * 0.1) * 0.5;
    butterfly.y += dy * 0.01 + Math.cos(state.frameTick * 0.08) * 0.3;
    butterfly.wingPhase += 0.3;
}

function drawButterfly(ctx, x, y, butterfly) {
    const wingOpen = Math.sin(butterfly.wingPhase) * 0.5 + 0.5;

    ctx.save();
    ctx.translate(x, y);

    // Corps
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(0, 0, 2, butterfly.size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ailes
    ctx.fillStyle = butterfly.color;
    ctx.globalAlpha = 0.8;

    // Aile gauche
    ctx.save();
    ctx.scale(wingOpen, 1);
    ctx.beginPath();
    ctx.ellipse(-butterfly.size * 0.6, 0, butterfly.size * 0.5, butterfly.size * 0.3, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Aile droite
    ctx.save();
    ctx.scale(wingOpen, 1);
    ctx.beginPath();
    ctx.ellipse(butterfly.size * 0.6, 0, butterfly.size * 0.5, butterfly.size * 0.3, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Motifs sur les ailes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(-butterfly.size * 0.4 * wingOpen, 0, 2, 0, Math.PI * 2);
    ctx.arc(butterfly.size * 0.4 * wingOpen, 0, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function updateBird(bird, w) {
    bird.x += bird.vx;
    bird.wingPhase += 0.15;
    bird.y += Math.sin(state.frameTick * 0.05 + bird.x * 0.01) * 0.3;

    if (bird.x > w * 3) {
        bird.x = -50;
        bird.y = 50 + Math.random() * 100;
    }
}

function drawBird(ctx, x, y, bird) {
    const wingUp = Math.sin(bird.wingPhase);

    ctx.save();
    ctx.translate(x, y);

    // Corps
    ctx.fillStyle = '#37474F';
    ctx.beginPath();
    ctx.ellipse(0, 0, bird.size * 0.5, bird.size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tête
    ctx.beginPath();
    ctx.arc(bird.size * 0.4, -bird.size * 0.1, bird.size * 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Bec
    ctx.fillStyle = '#FF9800';
    ctx.beginPath();
    ctx.moveTo(bird.size * 0.6, -bird.size * 0.1);
    ctx.lineTo(bird.size * 0.8, -bird.size * 0.05);
    ctx.lineTo(bird.size * 0.6, 0);
    ctx.closePath();
    ctx.fill();

    // Ailes
    ctx.fillStyle = '#546E7A';
    ctx.beginPath();
    ctx.moveTo(-bird.size * 0.2, 0);
    ctx.quadraticCurveTo(0, -bird.size * 0.5 * wingUp - bird.size * 0.3, bird.size * 0.1, -bird.size * 0.3 * wingUp);
    ctx.quadraticCurveTo(bird.size * 0.1, 0, -bird.size * 0.2, 0);
    ctx.fill();

    ctx.restore();
}

// ===== FONCTIONS DE DESSIN NIVEAU 2 =====

function drawLevel2Background(ctx, w, h, camX) {
    const visuals = initLevel2Visuals(w, h);

    // Fond dégradé ciel profond
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#1a237e');    // Bleu nuit
    skyGradient.addColorStop(0.2, '#303f9f');  // Indigo
    skyGradient.addColorStop(0.5, '#5c6bc0');  // Bleu clair
    skyGradient.addColorStop(0.8, '#9fa8da');  // Lavande
    skyGradient.addColorStop(1, '#e8eaf6');    // Blanc bleuté
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Étoiles scintillantes
    for (const star of visuals.stars) {
        const twinkle = Math.sin(state.frameTick * star.twinkleSpeed + star.twinkleOffset);
        const alpha = 0.3 + twinkle * 0.3;
        const size = star.size * (0.8 + twinkle * 0.2);

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x - camX * 0.05, star.y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Rayons de lumière divine
    for (const ray of visuals.lightRays) {
        const sway = Math.sin(state.frameTick * 0.01 + ray.swayOffset) * 20;
        drawLightRay(ctx, ray.x - camX * 0.1 + sway, ray.width, ray.opacity, h);
    }

    // Gros nuages de fond
    for (const cloud of visuals.bgClouds) {
        const x = cloud.x - camX * cloud.speed;
        drawBigCloud(ctx, x, cloud.y, cloud.width, cloud.height, cloud.opacity, cloud.puffCount);
    }

    // Îles flottantes décoratives
    for (const island of visuals.floatingIslands) {
        const floatY = Math.sin(state.frameTick * 0.02 + island.floatOffset) * 8;
        drawFloatingIsland(ctx, island.x - camX * 0.4, island.y + floatY, island.width, island.hasTree);
    }
}

function drawLevel2Foreground(ctx, w, h, camX) {
    const visuals = initLevel2Visuals(w, h);

    // Oiseaux en formation
    for (const bird of visuals.birds) {
        updateBird(bird, w);
        drawBird(ctx, bird.x - camX * 0.3 + bird.formationOffset, bird.y, bird);
    }
}

function drawLightRay(ctx, x, width, opacity, h) {
    const gradient = ctx.createLinearGradient(x, 0, x + width, h);
    gradient.addColorStop(0, `rgba(255, 255, 200, ${opacity})`);
    gradient.addColorStop(0.5, `rgba(255, 255, 200, ${opacity * 0.5})`);
    gradient.addColorStop(1, `rgba(255, 255, 200, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + width * 0.5, 0);
    ctx.lineTo(x + width * 1.5, h);
    ctx.lineTo(x + width, h);
    ctx.closePath();
    ctx.fill();
}

function drawBigCloud(ctx, x, y, width, height, opacity, puffCount) {
    ctx.save();
    ctx.globalAlpha = opacity;

    const gradient = ctx.createRadialGradient(x + width/2, y, 0, x + width/2, y, width);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.5, '#E3F2FD');
    gradient.addColorStop(1, '#BBDEFB');
    ctx.fillStyle = gradient;

    // Créer un nuage moelleux avec plusieurs cercles
    for (let i = 0; i < puffCount; i++) {
        const px = x + (i / (puffCount - 1)) * width;
        const py = y + Math.sin(i * 0.8) * height * 0.3;
        const r = height * (0.4 + Math.sin(i) * 0.2);

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
    }

    // Rangée du bas
    for (let i = 0; i < puffCount - 1; i++) {
        const px = x + width * 0.1 + (i / (puffCount - 2)) * width * 0.8;
        const py = y + height * 0.3;
        const r = height * 0.3;

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

// ===== FONCTIONS DE DESSIN NIVEAU 3 (VERSION SUBLIMÉE) =====

function drawLevel3Background(ctx, w, h, camX) {
    const visuals = initLevel3Visuals(w, h);
    const time = state.frameTick;

    // Fond dégradé nocturne (plus sombre et majestueux)
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, '#0f0c29');
    gradient.addColorStop(1, '#302b63');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Toiles d'araignée en arrière-plan profond
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (const web of visuals.cobwebs) {
        const x = web.x - camX * 0.1;
        drawCobweb(ctx, x, web.y, web.size, web.type);
    }

    // Vitraux gothiques avec lueur divine
    for (const win of visuals.windows) {
        const x = win.x - camX * 0.15;
        drawGothicWindow(ctx, x, win.y, win.w, win.h, win.color, win.pattern, time);
    }

    // God Rays (Rayons de lumière) - Effet WOW subtil
    for (const ray of visuals.rays) {
        const rx = ray.x - camX * 0.25;
        const grd = ctx.createLinearGradient(rx, h * 0.2, rx - 100, h);
        grd.addColorStop(0, `rgba(255, 255, 255, ${ray.alpha})`);
        grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.moveTo(rx, h * 0.2);
        ctx.lineTo(rx + ray.width, h * 0.2);
        ctx.lineTo(rx + ray.width - 200, h);
        ctx.lineTo(rx - 200, h);
        ctx.fill();
    }

    // Runes magiques qui brillent
    for (const rune of visuals.magicRunes) {
        const x = rune.x - camX * 0.25;
        const glow = 0.3 + Math.sin(time * 0.03 + rune.glowPhase) * 0.7;
        drawMagicRune(ctx, x, rune.y, rune.size, rune.symbol, rune.color, glow);
    }

    // Piliers gothiques avec détails architecturaux
    for (const pillar of visuals.pillars) {
        const x = pillar.x - camX * 0.4;
        drawGothicPillar(ctx, x, h, pillar.width, pillar.type);
    }

    // Crânes décoratifs sur le sol
    ctx.fillStyle = '#d4c4a8';
    for (const skull of visuals.skulls) {
        const x = skull.x - camX * 0.5;
        drawSkull(ctx, x, skull.y, skull.size, skull.rotation);
    }

    // Sol en pierre fissuré
    const stoneGradient = ctx.createLinearGradient(0, h * 0.85, 0, h);
    stoneGradient.addColorStop(0, '#161b22');
    stoneGradient.addColorStop(0.3, '#161b22');
    stoneGradient.addColorStop(1, '#0b0f14');
    ctx.fillStyle = stoneGradient;
    ctx.fillRect(0, h * 0.85, w, h * 0.15);

    // Fissures sur le sol
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
        const crackX = (seededRandom(i * 503) * w * 2 - camX * 0.5) % w;
        ctx.beginPath();
        ctx.moveTo(crackX, h * 0.86);
        ctx.lineTo(crackX + 20, h * 0.88);
        ctx.lineTo(crackX + 10, h * 0.92);
        ctx.stroke();
    }
}

function drawLevel3Foreground(ctx, w, h, camX) {
    const visuals = initLevel3Visuals(w, h);
    const time = state.frameTick;

    // Torches avec flammes réalistes et particules (si présentes)
    if (visuals.torches) {
        for (const torch of visuals.torches) {
            const x = torch.x - camX * 0.4;
            drawRealisticTorch(ctx, x, torch.y, torch.flicker, torch.intensity, time);
        }
    }

    // Esprits flottants (wisps)
    for (const spirit of visuals.floatingSpirits) {
        const offsetX = Math.sin(time * 0.02 + spirit.phaseX) * 30;
        const offsetY = Math.sin(time * 0.015 + spirit.phaseY) * 20;
        const x = spirit.x - camX * 0.6 + offsetX;
        const y = spirit.y + offsetY;

        // Traînée fantomatique
        ctx.globalAlpha = 0.15;
        for (let i = 3; i > 0; i--) {
            ctx.fillStyle = spirit.color;
            ctx.beginPath();
            ctx.arc(x - offsetX * i * 0.3, y - offsetY * i * 0.3, spirit.size * (1 - i * 0.2), 0, Math.PI * 2);
            ctx.fill();
        }

        // Corps principal du wisp
        ctx.globalAlpha = 0.6 + Math.sin(time * 0.1) * 0.2;
        const spiritGrad = ctx.createRadialGradient(x, y, 0, x, y, spirit.size);
        spiritGrad.addColorStop(0, '#ffffff');
        spiritGrad.addColorStop(0.4, spirit.color);
        spiritGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = spiritGrad;
        ctx.beginPath();
        ctx.arc(x, y, spirit.size, 0, Math.PI * 2);
        ctx.fill();

        // Yeux du wisp
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x - 4, y - 2, 2, 0, Math.PI * 2);
        ctx.arc(x + 4, y - 2, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    // Gouttes d'eau qui tombent
    ctx.fillStyle = 'rgba(100, 180, 255, 0.6)';
    for (const drip of visuals.waterDrips) {
        const x = drip.x - camX * 0.5;
        const cycleTime = (time + drip.phase) % 120;
        if (cycleTime < 60) {
            const y = drip.startY + cycleTime * drip.speed;
            // Goutte
            ctx.beginPath();
            ctx.ellipse(x, y, 2, 4, 0, 0, Math.PI * 2);
            ctx.fill();

            // Traînée
            ctx.globalAlpha = 0.3;
            ctx.fillRect(x - 1, y - 15, 2, 15);
            ctx.globalAlpha = 1;
        } else if (cycleTime < 80) {
            // Splash
            const splashY = drip.startY + 60 * drip.speed;
            const splashProgress = (cycleTime - 60) / 20;
            ctx.globalAlpha = 1 - splashProgress;
            ctx.beginPath();
            ctx.arc(x, splashY, 5 + splashProgress * 10, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    // Chaînes avec crânes
    for (const chain of visuals.chains) {
        const x = chain.x - camX * 0.7;
        const sway = Math.sin(time * 0.03 + chain.swayOffset) * 15;
        drawChainWithDetails(ctx, x, chain.y, chain.length, sway, chain.hasSkull);
    }

    // Couches de brouillard animées
    for (const fog of visuals.fogLayers) {
        const offsetX = (time * fog.speed + fog.offset) % (w * 2);
        ctx.globalAlpha = fog.opacity;
        const fogGrad = ctx.createLinearGradient(0, fog.y - 50, 0, fog.y + 50);
        fogGrad.addColorStop(0, 'transparent');
        fogGrad.addColorStop(0.5, 'rgba(100, 120, 150, 1)');
        fogGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = fogGrad;
        ctx.fillRect(-offsetX, fog.y - 50, w * 3, 100);
        ctx.globalAlpha = 1;
    }

    // Poussière atmosphérique
    for (const d of visuals.dust) {
        const dx = (d.x + time * d.speed) % (w * 2);
        const dy = d.y + Math.sin(time * 0.008 + d.x * 0.01) * 30;

        ctx.globalAlpha = d.brightness;
        ctx.fillStyle = '#c4b89b';
        ctx.beginPath();
        ctx.arc(dx - camX * 0.6, dy, d.size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

// Fonctions helpers pour le niveau 3
function drawCobweb(ctx, x, y, size, type) {
    ctx.save();
    ctx.translate(x, y);

    // Fils radiaux
    const rays = 8;
    for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 0.6 - Math.PI * 0.3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        ctx.stroke();
    }

    // Spirales
    for (let ring = 1; ring <= 4; ring++) {
        const ringSize = size * ring * 0.25;
        ctx.beginPath();
        for (let i = 0; i <= rays; i++) {
            const angle = (i / rays) * Math.PI * 0.6 - Math.PI * 0.3;
            const wobble = Math.sin(i * 2) * 5;
            const px = Math.cos(angle) * (ringSize + wobble);
            const py = Math.sin(angle) * (ringSize + wobble);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
    }

    ctx.restore();
}

function drawGothicWindow(ctx, x, y, w, h, color, pattern, time) {
    // Lueur extérieure
    const glow = 0.5 + Math.sin(time * 0.02) * 0.2;
    ctx.shadowBlur = 40;
    ctx.shadowColor = color;

    // Forme en ogive gothique
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.4 * glow;
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y + h * 0.3);
    ctx.quadraticCurveTo(x + w/2, y - h * 0.1, x, y + h * 0.3);
    ctx.closePath();
    ctx.fill();

    // Cadre intérieur
    ctx.globalAlpha = 0.7 * glow;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Motif intérieur selon le type
    ctx.globalAlpha = 0.5 * glow;
    ctx.lineWidth = 1;
    if (pattern === 0) {
        // Croix
        ctx.beginPath();
        ctx.moveTo(x + w/2, y + h * 0.2);
        ctx.lineTo(x + w/2, y + h * 0.9);
        ctx.moveTo(x + w * 0.2, y + h * 0.5);
        ctx.lineTo(x + w * 0.8, y + h * 0.5);
        ctx.stroke();
    } else if (pattern === 1) {
        // Cercle
        ctx.beginPath();
        ctx.arc(x + w/2, y + h * 0.5, w * 0.3, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
}

function drawMagicRune(ctx, x, y, size, symbol, color, glow) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = glow;

    // Lueur
    const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.5);
    glowGrad.addColorStop(0, color);
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Symbole runique
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    switch(symbol) {
        case 0: // Étoile
            for (let i = 0; i < 6; i++) {
                const angle = i * Math.PI / 3;
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
            }
            break;
        case 1: // Triangle
            ctx.moveTo(0, -size);
            ctx.lineTo(-size * 0.866, size * 0.5);
            ctx.lineTo(size * 0.866, size * 0.5);
            ctx.closePath();
            break;
        case 2: // Cercle avec croix
            ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
            ctx.moveTo(0, -size);
            ctx.lineTo(0, size);
            ctx.moveTo(-size, 0);
            ctx.lineTo(size, 0);
            break;
        default:
            // Spirale
            for (let i = 0; i < 20; i++) {
                const angle = i * 0.5;
                const r = size * i / 20;
                if (i === 0) ctx.moveTo(r, 0);
                else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            }
    }
    ctx.stroke();

    ctx.restore();
}

function drawGothicPillar(ctx, x, h, width, type) {
    const pillarWidth = type === 'major' ? width : (type === 'medium' ? width * 0.7 : width * 0.5);
    const depth = type === 'major' ? 0.4 : (type === 'medium' ? 0.5 : 0.6);

    // Corps du pilier
    const pillarGrad = ctx.createLinearGradient(x, 0, x + pillarWidth, 0);
    pillarGrad.addColorStop(0, `rgba(22, 27, 34, ${depth})`);
    pillarGrad.addColorStop(0.3, `rgba(28, 35, 49, ${depth})`);
    pillarGrad.addColorStop(0.7, `rgba(24, 30, 40, ${depth})`);
    pillarGrad.addColorStop(1, `rgba(15, 19, 25, ${depth})`);
    ctx.fillStyle = pillarGrad;
    ctx.fillRect(x, 0, pillarWidth, h);

    if (type === 'major') {
        // Détails architecturaux
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

        // Cannelures
        for (let i = 0; i < 3; i++) {
            ctx.fillRect(x + 10 + i * 20, 0, 6, h);
        }

        // Chapiteau
        ctx.fillStyle = 'rgba(30, 50, 80, 0.8)';
        ctx.fillRect(x - 10, 0, pillarWidth + 20, 30);
        ctx.fillRect(x - 5, 30, pillarWidth + 10, 15);

        // Base
        ctx.fillRect(x - 10, h - 40, pillarWidth + 20, 40);
    }
}

function drawSkull(ctx, x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Crâne
    ctx.fillStyle = '#d4c4a8';
    ctx.beginPath();
    ctx.ellipse(0, 0, size, size * 1.1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mâchoire
    ctx.beginPath();
    ctx.ellipse(0, size * 0.6, size * 0.7, size * 0.4, 0, 0, Math.PI);
    ctx.fill();

    // Orbites
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.ellipse(-size * 0.35, -size * 0.1, size * 0.25, size * 0.3, 0, 0, Math.PI * 2);
    ctx.ellipse(size * 0.35, -size * 0.1, size * 0.25, size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nez
    ctx.beginPath();
    ctx.moveTo(0, size * 0.1);
    ctx.lineTo(-size * 0.1, size * 0.35);
    ctx.lineTo(size * 0.1, size * 0.35);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function drawRealisticTorch(ctx, x, y, flickerPhase, intensity, time) {
    // Support de torche
    ctx.fillStyle = '#2a1a0a';
    ctx.beginPath();
    ctx.moveTo(x - 8, y + 30);
    ctx.lineTo(x + 8, y + 30);
    ctx.lineTo(x + 5, y);
    ctx.lineTo(x - 5, y);
    ctx.closePath();
    ctx.fill();

    // Bois brûlé en haut
    ctx.fillStyle = '#1a0a00';
    ctx.fillRect(x - 4, y - 5, 8, 10);

    const flicker = 1 + Math.sin(time * 0.25 + flickerPhase) * 0.15 +
                   Math.sin(time * 0.4 + flickerPhase * 2) * 0.1;
    const flameY = y - 20;

    // Grande lueur ambiante
    const ambientGrad = ctx.createRadialGradient(x, flameY, 0, x, flameY, 100 * intensity);
    ambientGrad.addColorStop(0, 'rgba(255, 150, 50, 0.3)');
    ambientGrad.addColorStop(0.5, 'rgba(255, 100, 30, 0.1)');
    ambientGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = ambientGrad;
    ctx.beginPath();
    ctx.arc(x, flameY, 100 * intensity, 0, Math.PI * 2);
    ctx.fill();

    // Flamme externe (rouge-orange)
    const outerFlameGrad = ctx.createRadialGradient(x, flameY + 10, 0, x, flameY - 10, 35 * flicker);
    outerFlameGrad.addColorStop(0, 'rgba(255, 100, 20, 0.9)');
    outerFlameGrad.addColorStop(0.6, 'rgba(200, 50, 0, 0.5)');
    outerFlameGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = outerFlameGrad;
    ctx.beginPath();
    ctx.ellipse(x, flameY, 15 * flicker, 25 * flicker, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flamme moyenne (orange)
    ctx.fillStyle = 'rgba(255, 180, 50, 0.8)';
    ctx.beginPath();
    ctx.ellipse(x, flameY + 5, 10 * flicker, 18 * flicker, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flamme centrale (jaune-blanc)
    ctx.fillStyle = 'rgba(255, 255, 200, 0.9)';
    ctx.beginPath();
    ctx.ellipse(x, flameY + 8, 5 * flicker, 10 * flicker, 0, 0, Math.PI * 2);
    ctx.fill();

    // Étincelles
    for (let i = 0; i < 3; i++) {
        const sparkTime = (time * 0.1 + flickerPhase + i * 33) % 30;
        if (sparkTime < 20) {
            const sparkY = flameY - 15 - sparkTime * 2;
            const sparkX = x + Math.sin(sparkTime + i) * 8;
            const sparkAlpha = 1 - sparkTime / 20;

            ctx.globalAlpha = sparkAlpha;
            ctx.fillStyle = '#ffff80';
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.globalAlpha = 1;
}

function drawChainWithDetails(ctx, x, startY, length, sway, hasSkull) {
    const linkCount = Math.floor(length / 12);

    ctx.strokeStyle = '#2a2a2a';
    ctx.fillStyle = '#3a3a3a';
    ctx.lineWidth = 2;

    let currentX = x;
    let currentY = startY;
    const swayPerLink = sway / linkCount;

    for (let i = 0; i < linkCount; i++) {
        const linkSway = swayPerLink * i;
        const nextX = x + linkSway;
        const nextY = startY + (i + 1) * 12;

        // Maillon de chaîne
        ctx.beginPath();
        ctx.ellipse(currentX + (nextX - currentX) / 2, currentY + 6, 4, 7, 0, 0, Math.PI * 2);
        ctx.stroke();

        currentX = nextX;
        currentY = nextY;
    }

    if (hasSkull) {
        drawSkull(ctx, x + sway, startY + length + 15, 12, Math.sin(state.frameTick * 0.02) * 0.2);
    } else {
        // Simple boulet
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(x + sway, startY + length, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ===== FONCTIONS DE DESSIN NIVEAU 4 (VERSION SUBLIMÉE - STYLE MARIO) =====

function drawLevel4Background(ctx, w, h, camX) {
    const visuals = initLevel4Visuals(w, h);
    const time = state.frameTick;

    // Ciel magique (plus doux)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#243B55'); // Bleu profond haut
    skyGradient.addColorStop(0.5, '#141E30'); // Milieu sombre
    skyGradient.addColorStop(1, '#6c5ce7'); // Bas magique
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Soleil joyeux avec visage
    drawHappySun(ctx, w - 120, 90, time);

    // Nuages Mario (blancs et moelleux)
    for (const cloud of visuals.clouds) {
        const cloudX = (cloud.x + time * cloud.speed) % (w * 4) - camX * 0.1;
        drawMarioCloud(ctx, cloudX, cloud.y, cloud.width, cloud.height, cloud.puffs);
    }

    // Collines ondulantes (parallax adouci)
    for (const hill of visuals.hills) {
        const x = hill.x - camX * hill.layer;
        drawRollingHill(ctx, x, hill.y, hill.w, hill.h, hill.color + '80', h);
    }

    // Champignons géants (silhouettes atmosphériques)
    for (const mush of visuals.bgMushrooms) {
        const x = mush.x - camX * mush.parallax;
        const bounce = Math.sin(time * 0.05 + mush.bounce) * 3;
        ctx.save();
        ctx.globalAlpha = 0.05 + mush.parallax * 0.1;
        drawMarioMushroom(ctx, x, mush.baseY + bounce, mush.scale, '#643296', '#643296', '#643296', h);
        ctx.restore();
    }

    // Buissons arrondis style Mario
    for (const bush of visuals.bushes) {
        const x = bush.x - camX * bush.parallax;
        drawMarioBush(ctx, x, bush.y, bush.width, bush.hasEyes, time);
    }

    // Blocs ? flottants en arrière-plan
    for (const block of visuals.questionBlocks) {
        const x = block.x - camX * 0.3;
        const bounce = Math.sin(time * 0.08 + block.bounce) * 3;
        drawQuestionBlock(ctx, x, block.y + bounce, block.size, time, block.sparkle);
    }

    // Pièces flottantes qui tournent
    for (const coin of visuals.floatingCoins) {
        const x = coin.x - camX * 0.35;
        const rotation = (time * 0.1 + coin.rotation) % (Math.PI * 2);
        const bob = Math.sin(time * 0.06 + coin.bobPhase) * 5;
        drawFloatingCoin(ctx, x, coin.y + bob, rotation);
    }
}

function drawLevel4Foreground(ctx, w, h, camX) {
    const visuals = initLevel4Visuals(w, h);
    const time = state.frameTick;

    // Fleurs souriantes au premier plan
    for (const flower of visuals.flowers) {
        const x = flower.x - camX * 0.7;
        const sway = Math.sin(time * 0.04 + flower.sway) * 5;
        drawSmilingFlower(ctx, x + sway, flower.y, flower.size, flower.color, time);
    }

    // Touffes d'herbe animées
    ctx.fillStyle = '#27ae60';
    for (const grass of visuals.grassTufts) {
        const x = grass.x - camX * 0.8;
        drawGrassTuft(ctx, x, grass.y, grass.blades, grass.height, time);
    }

    // Papillons colorés
    for (const butterfly of visuals.butterflies) {
        const pathX = Math.sin(time * 0.02 + butterfly.pathPhase) * 50;
        const pathY = Math.sin(time * 0.03 + butterfly.pathPhase * 1.5) * 30;
        const x = butterfly.x - camX * 0.5 + pathX;
        const y = butterfly.y + pathY;
        drawButterfly(ctx, x, y, butterfly.color, time, butterfly.wingPhase);
    }

    // Étincelles magiques
    for (const sparkle of visuals.sparkles) {
        const x = sparkle.x - camX * 0.4;
        const twinkle = Math.sin(time * 0.15 + sparkle.twinkle);
        if (twinkle > 0) {
            ctx.globalAlpha = twinkle;
            ctx.fillStyle = sparkle.color;
            drawSparkle(ctx, x, sparkle.y, sparkle.size * twinkle);
        }
    }
    ctx.globalAlpha = 1;
}

// Fonctions helpers pour le niveau 4 (Monde Champignon)
function drawHappySun(ctx, x, y, time) {
    const pulse = 1 + Math.sin(time * 0.03) * 0.05;
    const rayRotation = time * 0.01;

    // Rayons du soleil (tournants)
    ctx.fillStyle = '#f9e79f';
    for (let i = 0; i < 12; i++) {
        const angle = rayRotation + (i / 12) * Math.PI * 2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(50 * pulse, -8);
        ctx.lineTo(80 * pulse, 0);
        ctx.lineTo(50 * pulse, 8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // Corps du soleil
    const sunGrad = ctx.createRadialGradient(x - 10, y - 10, 0, x, y, 50 * pulse);
    sunGrad.addColorStop(0, '#fff9c4');
    sunGrad.addColorStop(0.5, '#ffeb3b');
    sunGrad.addColorStop(1, '#ffc107');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(x, y, 45 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Joues roses
    ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
    ctx.beginPath();
    ctx.arc(x - 25, y + 5, 10, 0, Math.PI * 2);
    ctx.arc(x + 25, y + 5, 10, 0, Math.PI * 2);
    ctx.fill();

    // Yeux joyeux
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.arc(x - 15, y - 5, 5, 0, Math.PI * 2);
    ctx.arc(x + 15, y - 5, 5, 0, Math.PI * 2);
    ctx.fill();

    // Reflets dans les yeux
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x - 13, y - 7, 2, 0, Math.PI * 2);
    ctx.arc(x + 17, y - 7, 2, 0, Math.PI * 2);
    ctx.fill();

    // Sourire
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(x, y + 5, 18, 0.2, Math.PI - 0.2);
    ctx.stroke();
}

function drawMarioCloud(ctx, x, y, width, height, puffs) {
    ctx.fillStyle = '#ffffff';

    // Ombre légère
    ctx.fillStyle = 'rgba(200, 220, 240, 0.7)';
    ctx.beginPath();
    const puffWidth = width / puffs;
    for (let i = 0; i < puffs; i++) {
        const puffX = x + i * puffWidth + puffWidth / 2;
        const puffY = y + height * 0.2 + Math.sin(i * 1.5) * height * 0.15;
        const puffR = puffWidth * 0.6 + Math.sin(i * 2) * puffWidth * 0.1;
        ctx.arc(puffX, puffY + 5, puffR, 0, Math.PI * 2);
    }
    ctx.fill();

    // Nuage principal
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    for (let i = 0; i < puffs; i++) {
        const puffX = x + i * puffWidth + puffWidth / 2;
        const puffY = y + Math.sin(i * 1.5) * height * 0.2;
        const puffR = puffWidth * 0.65 + Math.sin(i * 2) * puffWidth * 0.15;
        ctx.arc(puffX, puffY, puffR, 0, Math.PI * 2);
    }
    ctx.fill();

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(x + width * 0.3, y - height * 0.2, width * 0.15, 0, Math.PI * 2);
    ctx.fill();
}

function drawRollingHill(ctx, x, y, w, hillH, color, screenH) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - 50, screenH);
    ctx.lineTo(x - 50, y + hillH * 0.3);

    // Courbe douce pour le sommet
    ctx.quadraticCurveTo(x + w * 0.25, y - hillH * 0.2, x + w * 0.5, y);
    ctx.quadraticCurveTo(x + w * 0.75, y + hillH * 0.1, x + w + 50, y + hillH * 0.4);

    ctx.lineTo(x + w + 50, screenH);
    ctx.closePath();
    ctx.fill();
}

function drawMarioMushroom(ctx, x, baseY, scale, capColor, spotColor, stemColor, screenH) {
    const stemWidth = 30 * scale;
    const stemHeight = 60 * scale;
    const capWidth = 80 * scale;
    const capHeight = 50 * scale;

    // Tige
    ctx.fillStyle = stemColor;
    ctx.beginPath();
    ctx.moveTo(x - stemWidth/2, baseY);
    ctx.quadraticCurveTo(x - stemWidth/2 - 5, baseY - stemHeight/2, x - stemWidth/3, baseY - stemHeight);
    ctx.lineTo(x + stemWidth/3, baseY - stemHeight);
    ctx.quadraticCurveTo(x + stemWidth/2 + 5, baseY - stemHeight/2, x + stemWidth/2, baseY);
    ctx.closePath();
    ctx.fill();

    // Ombre sur la tige
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.quadraticCurveTo(x + stemWidth/2 + 5, baseY - stemHeight/2, x + stemWidth/2, baseY - stemHeight);
    ctx.lineTo(x + stemWidth/3, baseY - stemHeight);
    ctx.lineTo(x, baseY);
    ctx.fill();

    // Chapeau
    ctx.fillStyle = capColor;
    ctx.beginPath();
    ctx.ellipse(x, baseY - stemHeight - capHeight * 0.3, capWidth/2, capHeight/2, 0, Math.PI, 0, true);
    ctx.closePath();
    ctx.fill();

    // Bord du chapeau
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(x, baseY - stemHeight, capWidth/2, capHeight * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pois sur le chapeau
    ctx.fillStyle = spotColor;
    const spotPositions = [
        { dx: 0, dy: -capHeight * 0.4, size: 0.3 },
        { dx: -capWidth * 0.25, dy: -capHeight * 0.25, size: 0.2 },
        { dx: capWidth * 0.3, dy: -capHeight * 0.3, size: 0.22 },
        { dx: -capWidth * 0.35, dy: -capHeight * 0.5, size: 0.15 },
        { dx: capWidth * 0.2, dy: -capHeight * 0.55, size: 0.18 }
    ];
    for (const spot of spotPositions) {
        ctx.beginPath();
        ctx.arc(x + spot.dx, baseY - stemHeight + spot.dy, capWidth * spot.size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Reflet brillant
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.ellipse(x - capWidth * 0.2, baseY - stemHeight - capHeight * 0.5, capWidth * 0.12, capHeight * 0.15, -0.3, 0, Math.PI * 2);
    ctx.fill();
}

function drawMarioBush(ctx, x, y, width, hasEyes, time) {
    const bushHeight = width * 0.5;

    // Corps du buisson (3 boules)
    ctx.fillStyle = '#27ae60';
    ctx.beginPath();
    ctx.arc(x - width * 0.25, y, width * 0.35, 0, Math.PI * 2);
    ctx.arc(x + width * 0.25, y, width * 0.35, 0, Math.PI * 2);
    ctx.arc(x, y - bushHeight * 0.3, width * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Couleur plus claire au centre
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.arc(x, y - bushHeight * 0.2, width * 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(x - width * 0.15, y - bushHeight * 0.4, width * 0.15, 0, Math.PI * 2);
    ctx.fill();

    if (hasEyes) {
        // Yeux
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x - 10, y - bushHeight * 0.25, 8, 0, Math.PI * 2);
        ctx.arc(x + 10, y - bushHeight * 0.25, 8, 0, Math.PI * 2);
        ctx.fill();

        // Pupilles (qui bougent)
        const lookX = Math.sin(time * 0.02) * 2;
        ctx.fillStyle = '#2c3e50';
        ctx.beginPath();
        ctx.arc(x - 10 + lookX, y - bushHeight * 0.25, 4, 0, Math.PI * 2);
        ctx.arc(x + 10 + lookX, y - bushHeight * 0.25, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawQuestionBlock(ctx, x, y, size, time, sparklePhase) {
    // Ombre
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(x + 3, y + 3, size, size);

    // Corps du bloc
    const blockGrad = ctx.createLinearGradient(x, y, x, y + size);
    blockGrad.addColorStop(0, '#f9ca24');
    blockGrad.addColorStop(0.5, '#f0932b');
    blockGrad.addColorStop(1, '#d35400');
    ctx.fillStyle = blockGrad;
    ctx.fillRect(x, y, size, size);

    // Bordure
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, size, size);

    // Détails coins
    ctx.fillStyle = '#ffeaa7';
    ctx.fillRect(x + 2, y + 2, 6, 6);
    ctx.fillRect(x + size - 8, y + 2, 6, 6);
    ctx.fillRect(x + 2, y + size - 8, 6, 6);
    ctx.fillRect(x + size - 8, y + size - 8, 6, 6);

    // Point d'interrogation
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', x + size/2, y + size/2);

    // Ombre du ?
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillText('?', x + size/2 + 2, y + size/2 + 2);

    // Étincelle occasionnelle
    const sparkle = Math.sin(time * 0.1 + sparklePhase);
    if (sparkle > 0.8) {
        ctx.fillStyle = '#ffffff';
        drawSparkle(ctx, x + size * 0.8, y + size * 0.2, 5);
    }
}

function drawFloatingCoin(ctx, x, y, rotation) {
    const scaleX = Math.cos(rotation);
    const absScale = Math.abs(scaleX);

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scaleX, 1);

    // Corps de la pièce
    const coinGrad = ctx.createLinearGradient(-12, 0, 12, 0);
    coinGrad.addColorStop(0, '#f39c12');
    coinGrad.addColorStop(0.3, '#f1c40f');
    coinGrad.addColorStop(0.7, '#f39c12');
    coinGrad.addColorStop(1, '#d68910');
    ctx.fillStyle = coinGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bordure
    ctx.strokeStyle = '#d68910';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (absScale > 0.3) {
        // Étoile au centre
        ctx.fillStyle = '#ffeaa7';
        drawSparkle(ctx, 0, 0, 6);
    }

    ctx.restore();

    // Brillance
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(x - 4 * scaleX, y - 5, 3, 0, Math.PI * 2);
    ctx.fill();
}

function drawSmilingFlower(ctx, x, y, size, color, time) {
    const sway = Math.sin(time * 0.03 + x * 0.01) * 3;

    // Tige
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y + size * 2);
    ctx.quadraticCurveTo(x + sway, y + size, x + sway, y);
    ctx.stroke();

    // Feuilles
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.ellipse(x + sway/2 - 8, y + size, 10, 5, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + sway/2 + 8, y + size * 1.3, 10, 5, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Pétales
    ctx.fillStyle = color;
    const petalCount = 6;
    for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        const petalX = x + sway + Math.cos(angle) * size * 0.7;
        const petalY = y + Math.sin(angle) * size * 0.7;
        ctx.beginPath();
        ctx.ellipse(petalX, petalY, size * 0.45, size * 0.3, angle, 0, Math.PI * 2);
        ctx.fill();
    }

    // Centre
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.arc(x + sway, y, size * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Visage
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.arc(x + sway - size * 0.12, y - size * 0.05, 2, 0, Math.PI * 2);
    ctx.arc(x + sway + size * 0.12, y - size * 0.05, 2, 0, Math.PI * 2);
    ctx.fill();

    // Sourire
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x + sway, y + size * 0.05, size * 0.15, 0.2, Math.PI - 0.2);
    ctx.stroke();
}

function drawGrassTuft(ctx, x, y, blades, height, time) {
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    for (let i = 0; i < blades; i++) {
        const bladeX = x + (i - blades/2) * 6;
        const sway = Math.sin(time * 0.04 + bladeX * 0.1) * 5;
        const bladeHeight = height * (0.7 + Math.sin(i * 2) * 0.3);

        ctx.beginPath();
        ctx.moveTo(bladeX, y);
        ctx.quadraticCurveTo(bladeX + sway/2, y - bladeHeight/2, bladeX + sway, y - bladeHeight);
        ctx.stroke();
    }
}

function drawButterfly(ctx, x, y, color, time, wingPhase) {
    const wingFlap = Math.sin(time * 0.3 + wingPhase) * 0.8;

    ctx.save();
    ctx.translate(x, y);

    // Ailes gauche
    ctx.fillStyle = color;
    ctx.save();
    ctx.scale(Math.cos(wingFlap), 1);
    ctx.beginPath();
    ctx.ellipse(-8, 0, 10, 7, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-6, 6, 6, 4, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Ailes droite
    ctx.save();
    ctx.scale(-Math.cos(wingFlap), 1);
    ctx.beginPath();
    ctx.ellipse(-8, 0, 10, 7, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-6, 6, 6, 4, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Motifs sur les ailes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(-5 * Math.cos(wingFlap), -1, 3, 0, Math.PI * 2);
    ctx.arc(5 * Math.cos(wingFlap), -1, 3, 0, Math.PI * 2);
    ctx.fill();

    // Corps
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.ellipse(0, 2, 2, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Antennes
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-1, -5);
    ctx.quadraticCurveTo(-3, -10, -5, -12);
    ctx.moveTo(1, -5);
    ctx.quadraticCurveTo(3, -10, 5, -12);
    ctx.stroke();

    ctx.restore();
}

function drawSparkle(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.3, y - size * 0.3);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size * 0.3, y + size * 0.3);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size * 0.3, y + size * 0.3);
    ctx.lineTo(x - size, y);
    ctx.lineTo(x - size * 0.3, y - size * 0.3);
    ctx.closePath();
    ctx.fill();
}

function drawFloatingIsland(ctx, x, y, width, hasTree) {
    // Dessous rocheux de l'île
    const rockGradient = ctx.createLinearGradient(x, y, x, y + width);
    rockGradient.addColorStop(0, '#8D6E63');
    rockGradient.addColorStop(0.5, '#6D4C41');
    rockGradient.addColorStop(1, '#4E342E');
    ctx.fillStyle = rockGradient;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + width * 0.2, y + width * 0.8, x + width * 0.5, y + width);
    ctx.quadraticCurveTo(x + width * 0.8, y + width * 0.8, x + width, y);
    ctx.closePath();
    ctx.fill();

    // Dessus herbeux
    const grassGradient = ctx.createLinearGradient(x, y - 10, x, y + 10);
    grassGradient.addColorStop(0, '#81C784');
    grassGradient.addColorStop(1, '#4CAF50');
    ctx.fillStyle = grassGradient;

    ctx.beginPath();
    ctx.ellipse(x + width/2, y, width/2, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Petit arbre si présent
    if (hasTree) {
        // Tronc
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(x + width/2 - 4, y - 35, 8, 30);

        // Feuillage
        ctx.fillStyle = '#2E7D32';
        ctx.beginPath();
        ctx.arc(x + width/2, y - 45, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#388E3C';
        ctx.beginPath();
        ctx.arc(x + width/2 - 5, y - 50, 12, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ===== SPRITES AMÉLIORÉS POUR LES ENNEMIS =====

function drawEnhancedZombie(ctx, e) {
    const time = state.frameTick;
    const bounce = Math.sin(time * 0.15) * 2;
    const armSwing = Math.sin(time * 0.1) * 15;

    ctx.save();
    ctx.translate(e.x + e.w/2, e.y + e.h);

    // Direction
    const dir = e.dir || 1;
    ctx.scale(dir, 1);

    // Ombre
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(0, 5, e.w * 0.4, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pieds animés
    const footOffset = Math.sin(time * 0.2) * 8;
    ctx.fillStyle = '#1B5E20';
    ctx.beginPath();
    ctx.ellipse(-12 + footOffset, 0, 10, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(12 - footOffset, 0, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Jambes
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-8, -10);
    ctx.lineTo(-10 + footOffset * 0.5, 0);
    ctx.moveTo(8, -10);
    ctx.lineTo(10 - footOffset * 0.5, 0);
    ctx.stroke();

    // Corps avec dégradé
    const bodyGradient = ctx.createLinearGradient(-e.w/2, -e.h, e.w/2, -15);
    bodyGradient.addColorStop(0, '#4CAF50');
    bodyGradient.addColorStop(0.5, '#388E3C');
    bodyGradient.addColorStop(1, '#2E7D32');
    ctx.fillStyle = bodyGradient;

    ctx.beginPath();
    ctx.roundRect(-e.w/2 + 5, -e.h + 15 + bounce, e.w - 10, e.h - 25, 8);
    ctx.fill();

    // Lambeaux de vêtements
    ctx.fillStyle = '#795548';
    ctx.fillRect(-e.w/2 + 8, -e.h + 20 + bounce, 6, 15);
    ctx.fillRect(e.w/2 - 14, -e.h + 25 + bounce, 6, 12);

    // Bras tendus (pose zombie classique)
    ctx.save();
    ctx.translate(0, -e.h/2 + bounce);

    // Bras gauche
    ctx.save();
    ctx.rotate((-30 + armSwing) * Math.PI / 180);
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.roundRect(-35, -6, 30, 12, 6);
    ctx.fill();
    // Main
    ctx.fillStyle = '#66BB6A';
    ctx.beginPath();
    ctx.arc(-40, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Bras droit
    ctx.save();
    ctx.rotate((30 - armSwing) * Math.PI / 180);
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.roundRect(5, -6, 30, 12, 6);
    ctx.fill();
    ctx.fillStyle = '#66BB6A';
    ctx.beginPath();
    ctx.arc(40, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();

    // Tête
    const headGradient = ctx.createRadialGradient(0, -e.h - 5 + bounce, 0, 0, -e.h - 5 + bounce, 25);
    headGradient.addColorStop(0, '#66BB6A');
    headGradient.addColorStop(0.7, '#4CAF50');
    headGradient.addColorStop(1, '#388E3C');
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.arc(0, -e.h - 5 + bounce, 22, 0, Math.PI * 2);
    ctx.fill();

    // Cheveux désordonnés
    ctx.fillStyle = '#1B5E20';
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(-15 + i * 7, -e.h - 20 + bounce);
        ctx.lineTo(-12 + i * 7, -e.h - 35 + bounce + Math.sin(time * 0.1 + i) * 3);
        ctx.lineTo(-9 + i * 7, -e.h - 20 + bounce);
        ctx.fill();
    }

    // Yeux globuleux
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(-8, -e.h - 8 + bounce, 9, 11, -0.2, 0, Math.PI * 2);
    ctx.ellipse(8, -e.h - 6 + bounce, 7, 9, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Pupilles (qui suivent une direction)
    ctx.fillStyle = '#D32F2F';
    ctx.beginPath();
    ctx.arc(-6 + dir * 2, -e.h - 7 + bounce, 4, 0, Math.PI * 2);
    ctx.arc(10 + dir * 2, -e.h - 5 + bounce, 3, 0, Math.PI * 2);
    ctx.fill();

    // Reflets
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-8, -e.h - 10 + bounce, 2, 0, Math.PI * 2);
    ctx.arc(6, -e.h - 8 + bounce, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Bouche avec dents
    ctx.fillStyle = '#1B5E20';
    ctx.beginPath();
    ctx.arc(0, -e.h + 8 + bounce, 10, 0.1, Math.PI - 0.1);
    ctx.fill();

    // Dents
    ctx.fillStyle = '#FFECB3';
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(-8 + i * 5, -e.h + 5 + bounce, 3, 6);
    }

    // Cicatrices
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-15, -e.h - 15 + bounce);
    ctx.lineTo(-10, -e.h - 5 + bounce);
    ctx.stroke();

    ctx.restore();
}

function drawEnhancedChestMonster(ctx, e) {
    const time = state.frameTick;
    const breathe = Math.sin(time * 0.08) * 3;
    const mouthOpen = Math.abs(Math.sin(time * 0.1)) * 15;

    ctx.save();
    ctx.translate(e.x + e.w/2, e.y + e.h);

    const dir = e.dir || 1;
    ctx.scale(dir, 1);

    // Ombre
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 5, e.w * 0.45, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pieds (petites pattes de crabe)
    ctx.fillStyle = '#5D4037';
    const legWiggle = Math.sin(time * 0.15) * 5;

    // Pattes gauches
    ctx.beginPath();
    ctx.moveTo(-e.w/2 + 5, -10);
    ctx.quadraticCurveTo(-e.w/2 - 10, -5 + legWiggle, -e.w/2 - 5, 0);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#5D4037';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-e.w/2 + 10, -5);
    ctx.quadraticCurveTo(-e.w/2 - 5, 0 - legWiggle, -e.w/2, 5);
    ctx.stroke();

    // Pattes droites
    ctx.beginPath();
    ctx.moveTo(e.w/2 - 5, -10);
    ctx.quadraticCurveTo(e.w/2 + 10, -5 - legWiggle, e.w/2 + 5, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(e.w/2 - 10, -5);
    ctx.quadraticCurveTo(e.w/2 + 5, 0 + legWiggle, e.w/2, 5);
    ctx.stroke();

    // Corps du coffre (partie basse)
    const chestGradient = ctx.createLinearGradient(-e.w/2, -e.h, e.w/2, 0);
    chestGradient.addColorStop(0, '#8D6E63');
    chestGradient.addColorStop(0.3, '#A1887F');
    chestGradient.addColorStop(0.7, '#795548');
    chestGradient.addColorStop(1, '#5D4037');
    ctx.fillStyle = chestGradient;

    ctx.beginPath();
    ctx.roundRect(-e.w/2, -e.h/2 - 5, e.w, e.h/2 + 5, [0, 0, 8, 8]);
    ctx.fill();

    // Détails du bois
    ctx.strokeStyle = '#4E342E';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-e.w/2 + 5, -e.h/2 + 10 + i * 12);
        ctx.lineTo(e.w/2 - 5, -e.h/2 + 10 + i * 12);
        ctx.stroke();
    }

    // Ferrures
    ctx.fillStyle = '#FFD54F';
    ctx.fillRect(-e.w/2 + 3, -e.h/2, 8, e.h/2);
    ctx.fillRect(e.w/2 - 11, -e.h/2, 8, e.h/2);

    // Serrure
    ctx.fillStyle = '#FFC107';
    ctx.beginPath();
    ctx.arc(0, -e.h/4, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#5D4037';
    ctx.beginPath();
    ctx.arc(0, -e.h/4, 3, 0, Math.PI * 2);
    ctx.fill();

    // Couvercle (partie haute) qui s'ouvre
    ctx.save();
    ctx.translate(0, -e.h/2 - 5);
    ctx.rotate(-mouthOpen * Math.PI / 180);

    ctx.fillStyle = chestGradient;
    ctx.beginPath();
    ctx.roundRect(-e.w/2, -e.h/2 + 5 + breathe, e.w, e.h/2 - 5, [8, 8, 0, 0]);
    ctx.fill();

    // Détails du couvercle
    ctx.strokeStyle = '#4E342E';
    ctx.beginPath();
    ctx.moveTo(-e.w/2 + 5, -e.h/4 + breathe);
    ctx.lineTo(e.w/2 - 5, -e.h/4 + breathe);
    ctx.stroke();

    // Ferrures du couvercle
    ctx.fillStyle = '#FFD54F';
    ctx.fillRect(-e.w/2 + 3, -e.h/2 + 5 + breathe, 8, e.h/2 - 10);
    ctx.fillRect(e.w/2 - 11, -e.h/2 + 5 + breathe, 8, e.h/2 - 10);

    // Yeux maléfiques dans l'ouverture
    const eyeGlow = 0.5 + Math.sin(time * 0.1) * 0.3;
    ctx.fillStyle = `rgba(255, 0, 0, ${eyeGlow})`;
    ctx.shadowColor = '#FF0000';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(-12, 5, 6, 0, Math.PI * 2);
    ctx.arc(12, 5, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Pupilles
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.arc(-12 + dir * 2, 5, 3, 0, Math.PI * 2);
    ctx.arc(12 + dir * 2, 5, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Dents acérées (sur le bord du coffre ouvert)
    ctx.fillStyle = '#FFFDE7';
    const teethCount = 8;
    for (let i = 0; i < teethCount; i++) {
        const tx = -e.w/2 + 8 + i * ((e.w - 16) / (teethCount - 1));
        const th = 8 + Math.sin(i * 0.8) * 4;

        // Dents du haut (sur le couvercle)
        ctx.beginPath();
        ctx.moveTo(tx - 4, -e.h/2 - 5);
        ctx.lineTo(tx, -e.h/2 - 5 + th);
        ctx.lineTo(tx + 4, -e.h/2 - 5);
        ctx.fill();

        // Dents du bas
        ctx.beginPath();
        ctx.moveTo(tx - 4, -e.h/2 - 5);
        ctx.lineTo(tx, -e.h/2 - 5 - th * 0.7);
        ctx.lineTo(tx + 4, -e.h/2 - 5);
        ctx.fill();
    }

    // Langue bavante
    if (mouthOpen > 8) {
        ctx.fillStyle = '#E91E63';
        ctx.beginPath();
        ctx.moveTo(-5, -e.h/2);
        ctx.quadraticCurveTo(0, -e.h/2 + 15 + Math.sin(time * 0.2) * 5, 10, -e.h/2 + 5);
        ctx.quadraticCurveTo(0, -e.h/2 + 10, -5, -e.h/2);
        ctx.fill();
    }

    ctx.restore();
}

// Refonte complète du Squelette pour un style "Cartoon Vectoriel"
// Moins "Minecraft", plus "Rayman Origins / Vector Art"
function drawEnhancedSkeleton(ctx, e) {
    const bob = Math.sin(state.frameTick * 0.08 + e.x) * 2;

    // Direction
    const dir = e.dir || 1;

    const centerX = e.x + e.w / 2;
    const centerY = e.y + e.h / 2 + bob;

    ctx.save();

    // On dessine le squelette
    ctx.fillStyle = '#ecf0f1'; // Blanc os propre
    ctx.strokeStyle = '#bdc3c7'; // Contour gris
    ctx.lineWidth = 2;

    // 1. Tête (Forme crânienne arrondie)
    ctx.beginPath();
    ctx.arc(centerX, centerY - 15, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Yeux (grands et mignons mais fâchés)
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.ellipse(centerX + (4 * dir), centerY - 15, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sourcils froncés
    ctx.strokeStyle = '#2c3e50';
    ctx.beginPath();
    ctx.moveTo(centerX + (1 * dir), centerY - 20);
    ctx.lineTo(centerX + (7 * dir), centerY - 18);
    ctx.stroke();

    // 2. Corps (Petite cage thoracique stylisée)
    ctx.fillStyle = '#ecf0f1';
    ctx.beginPath();
    ctx.moveTo(centerX - 5, centerY - 3);
    ctx.lineTo(centerX + 5, centerY - 3);
    ctx.lineTo(centerX + 3, centerY + 10);
    ctx.lineTo(centerX - 3, centerY + 10);
    ctx.closePath();
    ctx.fill();

    // Côtes
    ctx.strokeStyle = '#bdc3c7';
    ctx.beginPath();
    ctx.moveTo(centerX - 4, centerY + 2);
    ctx.lineTo(centerX + 4, centerY + 2);
    ctx.moveTo(centerX - 3, centerY + 6);
    ctx.lineTo(centerX + 3, centerY + 6);
    ctx.stroke();

    // 3. Arc (Courbe simple en bois)
    const bowX = centerX + (15 * dir);
    ctx.strokeStyle = '#d35400'; // Bois roux
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(bowX, centerY + 5, 15, dir > 0 ? -Math.PI / 2 : Math.PI / 2, dir > 0 ? Math.PI / 2 : 3 * Math.PI / 2);
    ctx.stroke();

    // Flèche (si prêt à tirer)
    if (Math.floor(state.frameTick / 20) % 2 === 0) {
        ctx.strokeStyle = '#e74c3c'; // Pointe rouge
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bowX - (5 * dir), centerY + 5);
        ctx.lineTo(bowX + (10 * dir), centerY + 5);
        ctx.stroke();
    }

    ctx.restore();
}

// Squelette Cubique style Minecraft
function drawMinecraftSkeleton(ctx, e) {
    const walk = Math.sin(state.frameTick * 0.2) * 5;
    const dir = e.dir || 1;

    ctx.save();
    ctx.translate(e.x + e.w/2, e.y);
    if (dir === -1) ctx.scale(-1, 1);

    // Couleur os (plus terne pour réalisme Minecraft)
    const boneColor = "#B0B0B0";

    // Jambe droite
    ctx.fillStyle = boneColor;
    ctx.fillRect(4, 30, 4, 30 + walk); // Jambes plus fines
    
    // Jambe gauche
    ctx.fillRect(-8, 30, 4, 30 - walk);

    // Corps (côtes)
    ctx.fillStyle = boneColor;
    ctx.fillRect(-8, 12, 16, 20); // Torse
    
    // Détails des côtes (lignes sombres)
    ctx.fillStyle = "#1a0000"; // Très sombre (vide)
    ctx.fillRect(-6, 16, 12, 2);
    ctx.fillRect(-6, 22, 12, 2);
    ctx.fillRect(-6, 28, 12, 2);

    // Tête carrée
    ctx.fillStyle = boneColor;
    ctx.fillRect(-10, -12, 20, 20); // Tête plus proportionnée
    
    // Visage pixelisé
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(-7, -6, 4, 4); // Oeil G
    ctx.fillRect(3, -6, 4, 4);  // Oeil D
    ctx.fillRect(-4, 2, 8, 2);  // Bouche

    // Bras et Arc
    ctx.fillStyle = boneColor;
    
    // Bras qui tient l'arc (devant)
    ctx.save();
    ctx.translate(10, 16);
    ctx.rotate(-0.2); // Bras levé (position tir)
    ctx.fillRect(-2, 0, 4, 24); // Bras fin
    
    // Arc
    ctx.translate(0, 20);
    ctx.strokeStyle = "#5D4037"; // Bois
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 20, -1, 4);
    ctx.stroke();
    ctx.strokeStyle = "#FFF"; // Corde
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.cos(-1)*20, Math.sin(-1)*20);
    ctx.lineTo(Math.cos(4)*20, Math.sin(4)*20);
    ctx.stroke();

    ctx.restore();

    ctx.restore();
}

// ===== PLATEFORMES AMÉLIORÉES =====

// Fonction pseudo-aléatoire déterministe basée sur une seed
function seededRandom(seed) {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
}

function drawEnhancedGrassPlatform(ctx, p) {
    // Sol avec dégradé de terre
    const dirtGradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
    dirtGradient.addColorStop(0, '#6D4C41');
    dirtGradient.addColorStop(0.3, '#5D4037');
    dirtGradient.addColorStop(0.7, '#4E342E');
    dirtGradient.addColorStop(1, '#3E2723');
    ctx.fillStyle = dirtGradient;
    ctx.fillRect(p.x, p.y + 15, p.w, p.h - 15);

    // Herbe avec dégradé
    const grassGradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + 20);
    grassGradient.addColorStop(0, '#81C784');
    grassGradient.addColorStop(0.5, '#66BB6A');
    grassGradient.addColorStop(1, '#4CAF50');
    ctx.fillStyle = grassGradient;
    ctx.fillRect(p.x, p.y, p.w, 18);

    // Bord arrondi de l'herbe
    ctx.beginPath();
    ctx.arc(p.x, p.y + 9, 9, Math.PI * 0.5, Math.PI * 1.5);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x + p.w, p.y + 9, 9, -Math.PI * 0.5, Math.PI * 0.5);
    ctx.fill();

    // Touffes d'herbe détaillées (positions fixes basées sur l'index)
    const grassBladeCount = Math.floor(p.w / 15);
    for (let i = 0; i < grassBladeCount; i++) {
        // Position fixe basée sur l'index et la position de la plateforme
        const seed = p.x + p.y + i * 17;
        const randomOffset = seededRandom(seed) * 5;
        const gx = p.x + 5 + i * 15 + randomOffset;

        // Animation douce du balancement (très lent)
        const sway = Math.sin(state.frameTick * 0.015 + i * 0.5) * 2;

        // Plusieurs brins par touffe
        for (let j = 0; j < 3; j++) {
            const offset = (j - 1) * 3;
            const bladeHeight = 12 + seededRandom(seed + j * 7) * 6;
            ctx.beginPath();
            ctx.moveTo(gx + offset, p.y);
            ctx.quadraticCurveTo(
                gx + offset + sway,
                p.y - 8,
                gx + offset + sway * 1.2,
                p.y - bladeHeight
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = j === 1 ? '#4CAF50' : '#388E3C';
            ctx.stroke();
        }
    }

    // Petites fleurs occasionnelles (positions et couleurs fixes)
    const flowerCount = Math.floor(p.w / 80);
    const flowerColors = ['#FFEB3B', '#E91E63', '#9C27B0', '#FF5722'];
    for (let i = 0; i < flowerCount; i++) {
        const seed = p.x * 3 + p.y * 7 + i * 31;
        const fx = p.x + 30 + i * 80 + seededRandom(seed) * 40;
        const fy = p.y - 5;
        const colorIndex = Math.floor(seededRandom(seed + 100) * flowerColors.length);
        const color = flowerColors[colorIndex];

        // Tige
        ctx.strokeStyle = '#388E3C';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fx, p.y);
        ctx.lineTo(fx, fy);
        ctx.stroke();

        // Pétales
        ctx.fillStyle = color;
        for (let petal = 0; petal < 5; petal++) {
            ctx.beginPath();
            ctx.ellipse(
                fx + Math.cos(petal * Math.PI * 0.4) * 4,
                fy + Math.sin(petal * Math.PI * 0.4) * 4,
                3, 5, petal * Math.PI * 0.4, 0, Math.PI * 2
            );
            ctx.fill();
        }

        // Centre
        ctx.fillStyle = '#FFF59D';
        ctx.beginPath();
        ctx.arc(fx, fy, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    // Détails de la terre (cailloux - positions fixes)
    ctx.fillStyle = '#8D6E63';
    const rockCount = Math.floor(p.w / 50);
    for (let i = 0; i < rockCount; i++) {
        const seed = p.x * 5 + p.y * 11 + i * 41;
        const rx = p.x + 20 + i * 50 + seededRandom(seed) * 30;
        const ry = p.y + 25 + seededRandom(seed + 1) * 20;
        const rw = 4 + seededRandom(seed + 2) * 4;
        const rh = 3 + seededRandom(seed + 3) * 3;
        const rotation = seededRandom(seed + 4) * Math.PI;
        ctx.beginPath();
        ctx.ellipse(rx, ry, rw, rh, rotation, 0, Math.PI * 2);
        ctx.fill();
    }

    // Bordure
    ctx.strokeStyle = '#3E2723';
    ctx.lineWidth = 2;
    ctx.strokeRect(p.x, p.y, p.w, p.h);
}

function drawEnhancedStonePlatform(ctx, p) {
    // Sol de donjon en pierre (Niveau 3)
    const cx = p.x;
    const cy = p.y;
    const cw = p.w;
    const ch = p.h;

    // Fond gris foncé pierre
    ctx.fillStyle = "#4a4a4a";
    ctx.fillRect(cx, cy, cw, ch);

    // Briques irrégulières
    const brickH = 20;
    const brickW = 40;
    
    for (let y = 0; y < ch; y += brickH) {
        const offset = (y / brickH) % 2 === 0 ? 0 : brickW / 2;
        for (let x = -offset; x < cw; x += brickW) {
            // Couleur de brique légèrement variable
            const noise = seededRandom(cx + x + cy + y) * 20;
            const colVal = 60 + noise;
            ctx.fillStyle = `rgb(${colVal}, ${colVal}, ${colVal})`;
            
            // Dessiner brique avec marge pour le joint
            const bx = Math.max(cx, cx + x);
            const bw = Math.min(brickW - 2, cx + cw - bx);
            
            if (bw > 0) {
                ctx.fillRect(bx, cy + y, bw, brickH - 2);
                
                // Highlight (bord haut)
                ctx.fillStyle = "rgba(255,255,255,0.1)";
                ctx.fillRect(bx, cy + y, bw, 2);
                
                // Shadow (bord bas)
                ctx.fillStyle = "rgba(0,0,0,0.3)";
                ctx.fillRect(bx, cy + y + brickH - 4, bw, 2);
            }
        }
    }

    // Bordure
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cw, ch);
}

function drawEnhancedMushroomPlatform(ctx, p) {
    // Sol organique champignon (Niveau 4)
    
    // Corps spongieux
    const grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
    grad.addColorStop(0, "#e67e22"); // Orange
    grad.addColorStop(1, "#d35400"); // Foncé
    ctx.fillStyle = grad;
    
    // Forme arrondie sur les bords
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.w, p.h, 10);
    ctx.fill();

    // Mousse verte sur le dessus
    ctx.fillStyle = "#2ecc71";
    ctx.beginPath();
    ctx.roundRect(p.x - 2, p.y - 5, p.w + 4, 15, 10);
    ctx.fill();

    // Pois / Spores sur le côté
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    for (let i = 0; i < p.w / 30; i++) {
        const rx = seededRandom(p.x + i) * p.w;
        const ry = seededRandom(p.y + i) * p.h;
        ctx.beginPath();
        ctx.arc(p.x + rx, p.y + 10 + ry * 0.8, 3 + seededRandom(i)*3, 0, Math.PI*2);
        ctx.fill();
    }
}

function drawMinecraftBlock(ctx, x, y, w, h, type) {
    // Dessine une texture pixelisée style Minecraft
    const size = 40; // Taille standard d'un bloc visuel
    
    // Couleurs palettes
    const palettes = {
        'grass': { main: '#7CFC00', side: '#5D4037', top: '#32CD32' },
        'dirt': { main: '#5D4037', noise: '#3E2723' },
        'stone': { main: '#757575', noise: '#616161' },
        'netherrack': { main: '#800000', noise: '#500000' },
        'wood': { main: '#5D4037', noise: '#4E342E' },
        'leaves': { main: '#228B22', noise: '#006400' }
    };

    const pal = palettes[type] || palettes['dirt'];

    // Fond
    ctx.fillStyle = pal.main;
    ctx.fillRect(x, y, w, h);

    // Bruit pixelisé (simplifié)
    ctx.fillStyle = pal.noise || "rgba(0,0,0,0.1)";
    const pixelSize = 4;
    
    for (let py = 0; py < h; py += pixelSize) {
        for (let px = 0; px < w; px += pixelSize) {
            if (seededRandom(x + px + y + py) > 0.7) {
                ctx.fillRect(x + px, y + py, pixelSize, pixelSize);
            }
        }
    }

    // Herbe sur le dessus pour Grass
    if (type === 'grass') {
        ctx.fillStyle = pal.top;
        ctx.fillRect(x, y, w, 10);
        // Bords qui dépassent un peu
        for(let i=0; i<w; i+=8) ctx.fillRect(x+i, y+10, 4, 4);
    }
}

function drawEnhancedMovingPlatform(ctx, p) {
    const time = state.frameTick;
    const glow = 0.5 + Math.sin(time * 0.1) * 0.3;

    // Effet de lueur
    ctx.shadowColor = '#64B5F6';
    ctx.shadowBlur = 15 * glow;

    // Corps de la plateforme
    const platformGradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
    platformGradient.addColorStop(0, '#90CAF9');
    platformGradient.addColorStop(0.5, '#64B5F6');
    platformGradient.addColorStop(1, '#42A5F5');
    ctx.fillStyle = platformGradient;
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.w, p.h, 8);
    ctx.fill();

    ctx.shadowBlur = 0;

    // Bordure lumineuse
    ctx.strokeStyle = '#BBDEFB';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.w, p.h, 8);
    ctx.stroke();

    // Motif technologique
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(p.x + 5, p.y + 3, p.w - 10, 3);

    // Flèches de direction
    ctx.fillStyle = '#FFFFFF';
    if (p.vx && p.vx !== 0) {
        // Flèches horizontales
        const arrowDir = p.vx > 0 ? 1 : -1;
        for (let i = 0; i < 2; i++) {
            const ax = p.x + p.w/3 + i * (p.w/3);
            ctx.beginPath();
            ctx.moveTo(ax - 5 * arrowDir, p.y + p.h/2 - 3);
            ctx.lineTo(ax + 5 * arrowDir, p.y + p.h/2);
            ctx.lineTo(ax - 5 * arrowDir, p.y + p.h/2 + 3);
            ctx.fill();
        }
    } else if (p.vy && p.vy !== 0) {
        // Flèches verticales
        const arrowDir = p.vy > 0 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(p.x + p.w/2 - 5, p.y + p.h/2 - 3 * arrowDir);
        ctx.lineTo(p.x + p.w/2, p.y + p.h/2 + 5 * arrowDir);
        ctx.lineTo(p.x + p.w/2 + 5, p.y + p.h/2 - 3 * arrowDir);
        ctx.fill();
    }

    // Indicateurs aux extrémités
    ctx.fillStyle = '#FFEB3B';
    ctx.beginPath();
    ctx.arc(p.x + 8, p.y + p.h/2, 4, 0, Math.PI * 2);
    ctx.arc(p.x + p.w - 8, p.y + p.h/2, 4, 0, Math.PI * 2);
    ctx.fill();
}

function drawPortalPlatform(ctx, x, y, w, h) {
    // Style Portal : Blanc propre avec bords noirs
    ctx.fillStyle = "#E0E0E0";
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 4);
    ctx.fill();

    // Bordure noire fine
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ligne centrale technique
    ctx.fillStyle = "#CCC";
    ctx.fillRect(x + 10, y + h/2 - 2, w - 20, 4);

    // Témoins lumineux aux coins
    const lightColor = (state.frameTick % 60 < 30) ? "#00FFFF" : "#FF9900"; // Bleu/Orange
    ctx.fillStyle = lightColor;
    ctx.fillRect(x + 5, y + 5, 6, 6);
    ctx.fillRect(x + w - 11, y + 5, 6, 6);
}

// ===== NIVEAU 5 : AVENTURE MINECRAFT =====
function initLevel5Visuals(w, h) {
    if (VisualCache.level5) return VisualCache.level5;

    const visuals = {
        clouds: [],
        mountains: [],
        trees: [],
        birds: [],
        grassPatches: [],
        bgParticles: []
    };

    // Nuages pixelisés style Minecraft
    for (let i = 0; i < 10; i++) {
        visuals.clouds.push({
            x: seededRandom(i * 401) * w * 3,
            y: 60 + seededRandom(i * 409) * 100,
            width: 80 + seededRandom(i * 419) * 120,
            height: 30 + seededRandom(i * 421) * 20,
            speed: 0.2 + seededRandom(i * 431) * 0.3
        });
    }

    // Montagnes pixelisées en arrière-plan
    for (let i = 0; i < 6; i++) {
        visuals.mountains.push({
            x: seededRandom(i * 433) * w * 2,
            height: 150 + seededRandom(i * 439) * 150,
            width: 200 + seededRandom(i * 443) * 200,
            color: seededRandom(i * 449) > 0.5 ? '#5D8A3E' : '#4A7A2E'
        });
    }

    // Arbres décoratifs en arrière-plan
    for (let i = 0; i < 12; i++) {
        visuals.trees.push({
            x: seededRandom(i * 457) * w * 2.5,
            height: 60 + seededRandom(i * 461) * 80,
            type: seededRandom(i * 463) > 0.3 ? 'oak' : 'birch'
        });
    }

    // Oiseaux/chauves-souris pixelisés
    for (let i = 0; i < 5; i++) {
        visuals.birds.push({
            x: seededRandom(i * 467) * w * 2,
            y: 80 + seededRandom(i * 479) * 150,
            wingPhase: seededRandom(i * 487) * Math.PI * 2,
            speed: 1 + seededRandom(i * 491) * 2
        });
    }

    // Particules de cendres (Nether)
    for (let i = 0; i < 80; i++) {
        visuals.bgParticles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 4 + 1,
            speedY: -1 - Math.random() * 2, // Montent plus vite
            color: Math.random() > 0.5 ? '#800000' : '#550000'
        });
    }

    VisualCache.level5 = visuals;
    return visuals;
}

function drawLevel5Background(ctx, w, h, camX) {
    const visuals = initLevel5Visuals(w, h);

    if (state.inSubLevel) {
        const netherGrad = ctx.createLinearGradient(0, 0, 0, h);
        netherGrad.addColorStop(0, '#1a0000');
        netherGrad.addColorStop(1, '#4a0000');
        ctx.fillStyle = netherGrad;
        ctx.fillRect(0, 0, w, h);

        // Effet de chaleur (overlay orange subtil en bas)
        const heatGrad = ctx.createLinearGradient(0, h - 200, 0, h);
        heatGrad.addColorStop(0, 'rgba(255, 100, 0, 0)');
        heatGrad.addColorStop(1, 'rgba(255, 69, 0, 0.2)');
        ctx.fillStyle = heatGrad;
        ctx.fillRect(0, h - 200, w, 200);

        // Particules de cendres qui montent
        for (const p of visuals.bgParticles) {
            p.y += p.speedY;
            if (p.y < -10) p.y = h + 10;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - camX * 0.1, p.y, p.size, p.size);
        }

        return;
    }

    // Ciel Minecraft (dégradé bleu vif)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#7BA4DB');
    skyGradient.addColorStop(0.4, '#9BC4E8');
    skyGradient.addColorStop(0.7, '#B5D6F0');
    skyGradient.addColorStop(1, '#C8E4C8');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Soleil pixelisé Minecraft
    drawMinecraftSun(ctx, w - 120, 80);

    // Montagnes en arrière-plan
    for (const mountain of visuals.mountains) {
        drawPixelatedMountain(ctx, mountain.x - camX * 0.1, h * 0.6, mountain.width, mountain.height, mountain.color);
    }

    // Nuages pixelisés
    for (const cloud of visuals.clouds) {
        drawMinecraftCloud(ctx, cloud.x - camX * 0.15, cloud.y, cloud.width, cloud.height);
    }

    // Arbres en arrière-plan
    for (const tree of visuals.trees) {
        drawMinecraftTree(ctx, tree.x - camX * 0.25, h * 0.65, tree.height, tree.type);
    }
}

function drawLevel5Foreground(ctx, w, h, camX) {
    const visuals = initLevel5Visuals(w, h);

    // Oiseaux/chauves-souris pixelisés
    for (const bird of visuals.birds) {
        updateMinecraftBird(bird, w);
        drawMinecraftBird(ctx, bird.x - camX * 0.6, bird.y, bird);
    }

    // Particules de feuilles qui tombent
    const time = state.frameTick * 0.02;
    for (let i = 0; i < 8; i++) {
        const x = (seededRandom(i * 503) * w * 2 + time * 20) % (w * 2);
        const y = (seededRandom(i * 509) * h * 0.5 + time * 40 + i * 50) % h;
        const size = 4 + seededRandom(i * 521) * 4;

        ctx.fillStyle = seededRandom(i * 523) > 0.5 ? '#4CAF50' : '#8BC34A';
        ctx.fillRect(Math.floor(x - camX * 0.7), Math.floor(y), size, size);
    }
}

// Soleil pixelisé Minecraft
function drawMinecraftSun(ctx, x, y) {
    const size = 60;
    const time = state.frameTick * 0.01;
    const pulse = Math.sin(time) * 2;

    // Halo
    ctx.fillStyle = 'rgba(255, 255, 200, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y, size + 20 + pulse, 0, Math.PI * 2);
    ctx.fill();

    // Corps du soleil (carré pixelisé)
    ctx.fillStyle = '#FFEB3B';
    ctx.fillRect(x - size/2, y - size/2, size, size);

    // Rayons pixelisés
    ctx.fillStyle = '#FFF59D';
    const raySize = 12;
    // Haut
    ctx.fillRect(x - raySize/2, y - size/2 - raySize, raySize, raySize);
    // Bas
    ctx.fillRect(x - raySize/2, y + size/2, raySize, raySize);
    // Gauche
    ctx.fillRect(x - size/2 - raySize, y - raySize/2, raySize, raySize);
    // Droite
    ctx.fillRect(x + size/2, y - raySize/2, raySize, raySize);

    // Centre plus clair
    ctx.fillStyle = '#FFEE58';
    ctx.fillRect(x - size/4, y - size/4, size/2, size/2);
}

// Nuage pixelisé Minecraft
function drawMinecraftCloud(ctx, x, y, width, height) {
    ctx.fillStyle = '#FFFFFF';
    const blockSize = 12;

    // Forme de nuage en blocs
    const rows = Math.ceil(height / blockSize);
    const cols = Math.ceil(width / blockSize);

    for (let row = 0; row < rows; row++) {
        const rowWidth = row === 0 || row === rows - 1 ? cols - 2 : cols;
        const startCol = row === 0 || row === rows - 1 ? 1 : 0;

        for (let col = startCol; col < startCol + rowWidth; col++) {
            ctx.fillRect(
                Math.floor(x + col * blockSize),
                Math.floor(y + row * blockSize),
                blockSize - 1,
                blockSize - 1
            );
        }
    }

    // Ombre légère
    ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
    for (let col = 1; col < cols - 1; col++) {
        ctx.fillRect(
            Math.floor(x + col * blockSize),
            Math.floor(y + (rows - 1) * blockSize),
            blockSize - 1,
            blockSize / 2
        );
    }
}

// Montagne pixelisée
function drawPixelatedMountain(ctx, x, baseY, width, height, color) {
    const blockSize = 16;
    const rows = Math.ceil(height / blockSize);

    for (let row = 0; row < rows; row++) {
        const rowY = baseY - row * blockSize;
        const rowWidth = Math.max(1, Math.floor((rows - row) / rows * (width / blockSize)));
        const startX = x + (width / 2) - (rowWidth * blockSize / 2);

        for (let col = 0; col < rowWidth; col++) {
            // Couleur avec légère variation
            const shade = 0.9 + seededRandom(row * 100 + col) * 0.2;
            ctx.fillStyle = shadeColor(color, shade);
            ctx.fillRect(
                Math.floor(startX + col * blockSize),
                Math.floor(rowY),
                blockSize - 1,
                blockSize
            );
        }
    }

    // Neige au sommet
    ctx.fillStyle = '#FFFFFF';
    const snowRows = Math.floor(rows * 0.2);
    for (let row = rows - snowRows; row < rows; row++) {
        const rowY = baseY - row * blockSize;
        const rowWidth = Math.max(1, Math.floor((rows - row) / rows * (width / blockSize)));
        const startX = x + (width / 2) - (rowWidth * blockSize / 2);

        for (let col = 0; col < rowWidth; col++) {
            if (seededRandom(row * 100 + col + 999) > 0.3) {
                ctx.fillRect(
                    Math.floor(startX + col * blockSize),
                    Math.floor(rowY),
                    blockSize - 1,
                    blockSize
                );
            }
        }
    }
}

// Arbre Minecraft en arrière-plan
function drawMinecraftTree(ctx, x, baseY, height, type) {
    const trunkWidth = 16;
    const trunkHeight = height * 0.5;
    const leavesSize = height * 0.7;

    // Tronc
    ctx.fillStyle = type === 'birch' ? '#E8E4D4' : '#6D4C41';
    ctx.fillRect(x - trunkWidth/2, baseY - trunkHeight, trunkWidth, trunkHeight);

    // Détails du tronc birch
    if (type === 'birch') {
        ctx.fillStyle = '#2D2D2D';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(x - 4 + seededRandom(i * 777) * 8, baseY - trunkHeight + i * (trunkHeight / 4), 6, 3);
        }
    }

    // Feuilles
    ctx.fillStyle = type === 'birch' ? '#7CB342' : '#388E3C';
    const leafBlocks = Math.ceil(leavesSize / 16);

    for (let ly = 0; ly < leafBlocks; ly++) {
        const rowWidth = ly < leafBlocks / 2 ? leafBlocks - ly : ly + 1;
        for (let lx = 0; lx < rowWidth; lx++) {
            const offsetX = (rowWidth - leafBlocks) * 8;
            ctx.fillRect(
                x - leafBlocks * 8 + lx * 16 - offsetX,
                baseY - trunkHeight - ly * 16 - 16,
                15, 15
            );
        }
    }
}

// Oiseau pixelisé Minecraft
function updateMinecraftBird(bird, w) {
    bird.x += bird.speed;
    bird.wingPhase += 0.2;
    if (bird.x > w * 2.5) {
        bird.x = -50;
    }
}

function drawMinecraftBird(ctx, x, y, bird) {
    const wingOffset = Math.sin(bird.wingPhase) * 4;

    // Corps
    ctx.fillStyle = '#2D2D2D';
    ctx.fillRect(Math.floor(x), Math.floor(y), 8, 6);

    // Ailes
    ctx.fillRect(Math.floor(x - 2), Math.floor(y - 2 + wingOffset), 4, 4);
    ctx.fillRect(Math.floor(x + 6), Math.floor(y - 2 - wingOffset), 4, 4);

    // Bec
    ctx.fillStyle = '#FF9800';
    ctx.fillRect(Math.floor(x + 8), Math.floor(y + 1), 3, 2);
}

// Fonction utilitaire pour modifier la luminosité d'une couleur
function shadeColor(color, factor) {
    const hex = color.replace('#', '');
    const r = Math.min(255, Math.floor(parseInt(hex.substr(0, 2), 16) * factor));
    const g = Math.min(255, Math.floor(parseInt(hex.substr(2, 2), 16) * factor));
    const b = Math.min(255, Math.floor(parseInt(hex.substr(4, 2), 16) * factor));
    return `rgb(${r}, ${g}, ${b})`;
}

// ===== NIVEAU 6 : LABYRINTHE DES PORTAILS (SCI-FI) =====
function initLevel6Visuals(w, h) {
    if (VisualCache.level6) return VisualCache.level6;

    const visuals = {
        stars: [],
        nebulae: [],
        gridLines: [],
        floatingParticles: [],
        energyBeams: []
    };

    // Étoiles en arrière-plan
    for (let i = 0; i < 200; i++) {
        visuals.stars.push({
            x: seededRandom(i * 541) * w * 3,
            y: seededRandom(i * 547) * h,
            size: 1 + seededRandom(i * 557) * 2,
            twinkleOffset: seededRandom(i * 563) * Math.PI * 2,
            color: ['#FFFFFF', '#B3E5FC', '#CE93D8', '#FFCC80'][Math.floor(seededRandom(i * 569) * 4)]
        });
    }

    // Nébuleuses colorées
    for (let i = 0; i < 4; i++) {
        visuals.nebulae.push({
            x: seededRandom(i * 571) * w * 2,
            y: seededRandom(i * 577) * h * 0.7,
            width: 200 + seededRandom(i * 587) * 300,
            height: 150 + seededRandom(i * 593) * 200,
            color: ['#7C4DFF', '#00BCD4', '#E91E63', '#4CAF50'][i % 4],
            opacity: 0.15 + seededRandom(i * 599) * 0.1
        });
    }

    // Lignes de grille futuriste
    for (let i = 0; i < 20; i++) {
        visuals.gridLines.push({
            y: seededRandom(i * 601) * h,
            speed: 0.5 + seededRandom(i * 607) * 1,
            opacity: 0.1 + seededRandom(i * 613) * 0.2
        });
    }

    // Particules flottantes
    for (let i = 0; i < 30; i++) {
        visuals.floatingParticles.push({
            x: seededRandom(i * 617) * w * 3,
            y: seededRandom(i * 619) * h,
            size: 2 + seededRandom(i * 631) * 4,
            speedX: 0.5 + seededRandom(i * 641) * 1.5,
            speedY: (seededRandom(i * 643) - 0.5) * 0.5,
            color: seededRandom(i * 647) > 0.5 ? '#00FFFF' : '#FF00FF'
        });
    }

    VisualCache.level6 = visuals;
    return visuals;
}

function drawLevel6Background(ctx, w, h, camX) {
    const visuals = initLevel6Visuals(w, h);
    const time = state.frameTick;

    // Fond spatial profond
    const spaceGradient = ctx.createLinearGradient(0, 0, 0, h);
    spaceGradient.addColorStop(0, '#0a0a1a');
    spaceGradient.addColorStop(0.3, '#1a1a3e');
    spaceGradient.addColorStop(0.6, '#0d0d2b');
    spaceGradient.addColorStop(1, '#1a0a2e');
    ctx.fillStyle = spaceGradient;
    ctx.fillRect(0, 0, w, h);

    // Nébuleuses
    for (const nebula of visuals.nebulae) {
        drawNebula(ctx, nebula.x - camX * 0.05, nebula.y, nebula.width, nebula.height, nebula.color, nebula.opacity);
    }

    // Étoiles scintillantes
    for (const star of visuals.stars) {
        const twinkle = Math.sin(time * 0.05 + star.twinkleOffset);
        const alpha = 0.5 + twinkle * 0.5;

        ctx.fillStyle = star.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', '');
        if (star.color.startsWith('#')) {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = star.color;
        }
        ctx.beginPath();
        ctx.arc(star.x - camX * 0.02, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    // Grille futuriste
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (const line of visuals.gridLines) {
        const y = (line.y + time * line.speed * 0.5) % h;
        ctx.globalAlpha = line.opacity;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Grille verticale
    ctx.strokeStyle = 'rgba(255, 0, 255, 0.05)';
    for (let x = 0; x < w; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }

    // Planète ou lune en arrière-plan
    drawSciFiPlanet(ctx, w - 200, 150 - camX * 0.02);
}

function drawLevel6Foreground(ctx, w, h, camX) {
    const visuals = initLevel6Visuals(w, h);
    const time = state.frameTick;

    // Particules flottantes
    for (const particle of visuals.floatingParticles) {
        const x = (particle.x + time * particle.speedX) % (w * 3);
        const y = particle.y + Math.sin(time * 0.02 + particle.x) * 20;

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.6 + Math.sin(time * 0.1 + particle.x) * 0.4;
        ctx.beginPath();
        ctx.arc(x - camX * 0.8, y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Traînée
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.moveTo(x - camX * 0.8, y);
        ctx.lineTo(x - camX * 0.8 - 20, y);
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size / 2;
        ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Effets de scan horizontal
    const scanY = (time * 2) % h;
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(w, scanY);
    ctx.stroke();
}

// Nébuleuse colorée
function drawNebula(ctx, x, y, width, height, color, opacity) {
    const gradient = ctx.createRadialGradient(x + width/2, y + height/2, 0, x + width/2, y + height/2, Math.max(width, height)/2);
    gradient.addColorStop(0, color.replace(')', `, ${opacity})`).replace('rgb', 'rgba'));

    // Convertir couleur hex en rgba si nécessaire
    if (color.startsWith('#')) {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const gradient2 = ctx.createRadialGradient(x + width/2, y + height/2, 0, x + width/2, y + height/2, Math.max(width, height)/2);
        gradient2.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
        gradient2.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`);
        gradient2.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient2;
    } else {
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
    }

    ctx.beginPath();
    ctx.ellipse(x + width/2, y + height/2, width/2, height/2, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Planète sci-fi
function drawSciFiPlanet(ctx, x, y) {
    const radius = 80;
    const time = state.frameTick * 0.005;

    // Lueur externe
    const glowGradient = ctx.createRadialGradient(x, y, radius, x, y, radius + 40);
    glowGradient.addColorStop(0, 'rgba(100, 200, 255, 0.3)');
    glowGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius + 40, 0, Math.PI * 2);
    ctx.fill();

    // Corps de la planète
    const planetGradient = ctx.createRadialGradient(x - 20, y - 20, 0, x, y, radius);
    planetGradient.addColorStop(0, '#4FC3F7');
    planetGradient.addColorStop(0.5, '#0288D1');
    planetGradient.addColorStop(1, '#01579B');
    ctx.fillStyle = planetGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Anneaux
    ctx.strokeStyle = 'rgba(200, 220, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 1.5, radius * 0.3, time, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(200, 220, 255, 0.3)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 1.7, radius * 0.35, time, 0, Math.PI * 2);
    ctx.stroke();

    // Détails de surface
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(x - 30, y - 20, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 20, y + 30, 10, 0, Math.PI * 2);
    ctx.fill();
}

// ===== FONCTION PRINCIPALE D'INTÉGRATION =====

// ===== NIVEAU 7 : LES REMPARTS (CHÂTEAU MÉDIÉVAL) =====
function initLevel7Visuals(w, h) {
    if (VisualCache.level7) return VisualCache.level7;

    const visuals = {
        stars: [],
        castleSilhouettes: [],
        torches: [],
        bats: [],
        fogLayers: [],
        clouds: []
    };

    // Étoiles scintillantes dans le ciel nocturne
    for (let i = 0; i < 80; i++) {
        visuals.stars.push({
            x: seededRandom(i * 13) * w * 3,
            y: seededRandom(i * 17) * h * 0.5,
            size: 1 + seededRandom(i * 23) * 2,
            twinkleOffset: seededRandom(i * 31) * Math.PI * 2,
            twinkleSpeed: 0.02 + seededRandom(i * 37) * 0.03
        });
    }

    // Silhouettes de châteaux lointains
    visuals.castleSilhouettes.push({
        x: 200,
        towers: [
            { x: 0, w: 40, h: 120, hasFlag: true },
            { x: 50, w: 60, h: 180, hasFlag: true },
            { x: 120, w: 35, h: 100, hasFlag: false },
            { x: 180, w: 50, h: 150, hasFlag: true }
        ]
    });
    visuals.castleSilhouettes.push({
        x: 800,
        towers: [
            { x: 0, w: 50, h: 140, hasFlag: false },
            { x: 70, w: 70, h: 200, hasFlag: true },
            { x: 160, w: 45, h: 110, hasFlag: true }
        ]
    });
    visuals.castleSilhouettes.push({
        x: 1500,
        towers: [
            { x: 0, w: 55, h: 160, hasFlag: true },
            { x: 80, w: 45, h: 130, hasFlag: false },
            { x: 140, w: 65, h: 190, hasFlag: true }
        ]
    });

    // Torches avec flammes
    for (let i = 0; i < 10; i++) {
        visuals.torches.push({
            x: 150 + i * 250 + seededRandom(i * 47) * 100,
            y: h * 0.4,
            flickerOffset: seededRandom(i * 53) * Math.PI * 2
        });
    }

    // Chauves-souris volantes
    for (let i = 0; i < 8; i++) {
        visuals.bats.push({
            x: seededRandom(i * 59) * w * 2,
            y: 80 + seededRandom(i * 61) * 150,
            vx: 1.5 + seededRandom(i * 67) * 2,
            wingPhase: seededRandom(i * 71) * Math.PI * 2,
            size: 15 + seededRandom(i * 73) * 10
        });
    }

    // Couches de brouillard
    for (let i = 0; i < 4; i++) {
        visuals.fogLayers.push({
            y: h * 0.7 + i * 30,
            opacity: 0.15 - i * 0.03,
            speed: 0.3 + i * 0.1,
            offset: seededRandom(i * 79) * 1000
        });
    }

    // Nuages sombres
    for (let i = 0; i < 6; i++) {
        visuals.clouds.push({
            x: seededRandom(i * 83) * w * 3,
            y: 20 + seededRandom(i * 89) * 80,
            width: 100 + seededRandom(i * 97) * 150,
            height: 40 + seededRandom(i * 101) * 30,
            speed: 0.1 + seededRandom(i * 103) * 0.15
        });
    }

    VisualCache.level7 = visuals;
    return visuals;
}

function drawLevel7Background(ctx, w, h, camX) {
    const visuals = initLevel7Visuals(w, h);

    // Dégradé du ciel nocturne
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#0a0a1a');      // Noir bleuté
    skyGradient.addColorStop(0.3, '#1a1a3e');    // Bleu très foncé
    skyGradient.addColorStop(0.6, '#2d1b4e');    // Violet foncé
    skyGradient.addColorStop(1, '#4a2c6a');      // Violet plus clair
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Lune majestueuse
    drawMoon(ctx, w - 180, 100);

    // Étoiles scintillantes
    for (const star of visuals.stars) {
        const twinkle = Math.sin(state.frameTick * star.twinkleSpeed + star.twinkleOffset);
        const alpha = 0.4 + twinkle * 0.4;
        const size = star.size * (0.8 + twinkle * 0.2);

        ctx.fillStyle = `rgba(255, 255, 230, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x - camX * 0.02, star.y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Nuages sombres
    for (const cloud of visuals.clouds) {
        drawDarkCloud(ctx, cloud.x - camX * 0.1, cloud.y, cloud.width, cloud.height);
    }

    // Silhouettes de châteaux lointains
    for (const castle of visuals.castleSilhouettes) {
        drawCastleSilhouette(ctx, castle.x - camX * 0.15, h * 0.35, castle.towers);
    }

    // Torches avec flammes (en arrière-plan)
    for (const torch of visuals.torches) {
        drawTorch(ctx, torch.x - camX * 0.5, torch.y, torch.flickerOffset);
    }

    // Brouillard mystérieux
    for (const fog of visuals.fogLayers) {
        drawFogLayer(ctx, w, fog.y, fog.opacity, fog.speed, fog.offset, camX);
    }
}

function drawLevel7Foreground(ctx, w, h, camX) {
    const visuals = initLevel7Visuals(w, h);

    // Chauves-souris volantes
    for (const bat of visuals.bats) {
        updateBat(bat, w);
        drawBat(ctx, bat.x - camX * 0.6, bat.y, bat);
    }
}

function drawMoon(ctx, x, y) {
    // Halo de la lune
    const haloGradient = ctx.createRadialGradient(x, y, 0, x, y, 120);
    haloGradient.addColorStop(0, 'rgba(255, 255, 200, 0.3)');
    haloGradient.addColorStop(0.5, 'rgba(255, 255, 200, 0.1)');
    haloGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
    ctx.fillStyle = haloGradient;
    ctx.beginPath();
    ctx.arc(x, y, 120, 0, Math.PI * 2);
    ctx.fill();

    // Corps de la lune
    const moonGradient = ctx.createRadialGradient(x - 15, y - 15, 0, x, y, 55);
    moonGradient.addColorStop(0, '#FFFDE7');
    moonGradient.addColorStop(0.5, '#FFF9C4');
    moonGradient.addColorStop(1, '#F0E68C');
    ctx.fillStyle = moonGradient;
    ctx.beginPath();
    ctx.arc(x, y, 55, 0, Math.PI * 2);
    ctx.fill();

    // Cratères
    ctx.fillStyle = 'rgba(200, 180, 100, 0.3)';
    ctx.beginPath();
    ctx.arc(x - 20, y - 15, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 15, y + 10, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - 5, y + 25, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 25, y - 20, 6, 0, Math.PI * 2);
    ctx.fill();
}

function drawDarkCloud(ctx, x, y, width, height) {
    ctx.save();
    ctx.globalAlpha = 0.4;

    const gradient = ctx.createRadialGradient(x + width/2, y, 0, x + width/2, y, width/2);
    gradient.addColorStop(0, '#2a2a4a');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;

    // Forme du nuage sombre
    const puffs = [
        { dx: 0, dy: 0, r: height * 0.7 },
        { dx: width * 0.3, dy: -height * 0.2, r: height * 0.9 },
        { dx: width * 0.6, dy: 0, r: height * 0.75 },
        { dx: width * 0.9, dy: -height * 0.1, r: height * 0.6 }
    ];

    for (const puff of puffs) {
        ctx.beginPath();
        ctx.arc(x + puff.dx, y + puff.dy, puff.r, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

function drawCastleSilhouette(ctx, x, baseY, towers) {
    ctx.fillStyle = '#0a0a15';

    for (const tower of towers) {
        const tx = x + tower.x;
        const ty = baseY - tower.h;

        // Corps de la tour
        ctx.fillRect(tx, ty, tower.w, tower.h + 100);

        // Créneaux
        const crenelWidth = tower.w / 5;
        for (let i = 0; i < 5; i += 2) {
            ctx.fillRect(tx + i * crenelWidth, ty - 15, crenelWidth, 15);
        }

        // Toit pointu
        ctx.beginPath();
        ctx.moveTo(tx - 5, ty);
        ctx.lineTo(tx + tower.w / 2, ty - 30);
        ctx.lineTo(tx + tower.w + 5, ty);
        ctx.fill();

        // Drapeau si présent
        if (tower.hasFlag) {
            ctx.fillStyle = '#4a0000';
            ctx.fillRect(tx + tower.w / 2 - 1, ty - 50, 2, 25);
            ctx.beginPath();
            ctx.moveTo(tx + tower.w / 2 + 1, ty - 50);
            ctx.lineTo(tx + tower.w / 2 + 20, ty - 42);
            ctx.lineTo(tx + tower.w / 2 + 1, ty - 35);
            ctx.fill();
            ctx.fillStyle = '#0a0a15';
        }

        // Fenêtres éclairées
        ctx.fillStyle = 'rgba(255, 200, 100, 0.3)';
        ctx.fillRect(tx + tower.w / 2 - 4, ty + tower.h * 0.3, 8, 12);
        ctx.fillRect(tx + tower.w / 2 - 4, ty + tower.h * 0.6, 8, 12);
        ctx.fillStyle = '#0a0a15';
    }
}

function drawTorch(ctx, x, y, flickerOffset) {
    const flicker = Math.sin(state.frameTick * 0.2 + flickerOffset) * 0.3 + 0.7;
    const flameSway = Math.sin(state.frameTick * 0.15 + flickerOffset) * 3;

    // Lueur de la torche
    const glowGradient = ctx.createRadialGradient(x, y - 20, 0, x, y - 20, 80 * flicker);
    glowGradient.addColorStop(0, `rgba(255, 150, 50, ${0.3 * flicker})`);
    glowGradient.addColorStop(0.5, `rgba(255, 100, 30, ${0.1 * flicker})`);
    glowGradient.addColorStop(1, 'rgba(255, 80, 20, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(x, y - 20, 80 * flicker, 0, Math.PI * 2);
    ctx.fill();

    // Support de la torche
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(x - 4, y, 8, 30);

    // Flamme
    const flameGradient = ctx.createLinearGradient(x, y, x, y - 40);
    flameGradient.addColorStop(0, '#FF6600');
    flameGradient.addColorStop(0.3, '#FF9900');
    flameGradient.addColorStop(0.6, '#FFCC00');
    flameGradient.addColorStop(1, '#FFFF99');

    ctx.fillStyle = flameGradient;
    ctx.beginPath();
    ctx.moveTo(x - 8, y);
    ctx.quadraticCurveTo(x - 12 + flameSway, y - 20, x + flameSway * 0.5, y - 35 * flicker);
    ctx.quadraticCurveTo(x + 12 + flameSway, y - 20, x + 8, y);
    ctx.fill();

    // Cœur de la flamme
    ctx.fillStyle = '#FFFFCC';
    ctx.beginPath();
    ctx.moveTo(x - 3, y);
    ctx.quadraticCurveTo(x - 4 + flameSway * 0.5, y - 12, x + flameSway * 0.3, y - 20 * flicker);
    ctx.quadraticCurveTo(x + 4 + flameSway * 0.5, y - 12, x + 3, y);
    ctx.fill();
}

function drawFogLayer(ctx, w, y, opacity, speed, offset, camX) {
    ctx.save();
    ctx.globalAlpha = opacity;

    const fogGradient = ctx.createLinearGradient(0, y - 30, 0, y + 50);
    fogGradient.addColorStop(0, 'rgba(100, 80, 120, 0)');
    fogGradient.addColorStop(0.5, 'rgba(80, 60, 100, 1)');
    fogGradient.addColorStop(1, 'rgba(60, 40, 80, 0)');

    ctx.fillStyle = fogGradient;

    // Forme ondulante du brouillard
    ctx.beginPath();
    ctx.moveTo(-100, y + 50);

    const waveOffset = state.frameTick * speed + offset - camX * 0.3;
    for (let x = -100; x <= w + 100; x += 20) {
        const waveY = y + Math.sin((x + waveOffset) * 0.02) * 15;
        ctx.lineTo(x, waveY);
    }

    ctx.lineTo(w + 100, y + 50);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function updateBat(bat, w) {
    bat.x += bat.vx;
    bat.y += Math.sin(state.frameTick * 0.08 + bat.x * 0.01) * 0.8;
    bat.wingPhase += 0.4;

    if (bat.x > w * 3) {
        bat.x = -50;
        bat.y = 80 + seededRandom(bat.x) * 150;
    }
}

function drawBat(ctx, x, y, bat) {
    const wingUp = Math.sin(bat.wingPhase);
    const size = bat.size;

    ctx.save();
    ctx.translate(x, y);

    // Corps
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.3, size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tête
    ctx.beginPath();
    ctx.arc(size * 0.3, -size * 0.1, size * 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Oreilles pointues
    ctx.beginPath();
    ctx.moveTo(size * 0.25, -size * 0.2);
    ctx.lineTo(size * 0.2, -size * 0.4);
    ctx.lineTo(size * 0.35, -size * 0.2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(size * 0.35, -size * 0.2);
    ctx.lineTo(size * 0.4, -size * 0.38);
    ctx.lineTo(size * 0.45, -size * 0.2);
    ctx.fill();

    // Yeux rouges brillants
    ctx.fillStyle = '#FF3333';
    ctx.beginPath();
    ctx.arc(size * 0.28, -size * 0.12, 2, 0, Math.PI * 2);
    ctx.arc(size * 0.38, -size * 0.12, 2, 0, Math.PI * 2);
    ctx.fill();

    // Ailes membraneuses
    ctx.fillStyle = '#2a2a4e';

    // Aile gauche
    ctx.beginPath();
    ctx.moveTo(-size * 0.1, 0);
    ctx.quadraticCurveTo(-size * 0.5, -size * 0.3 * wingUp - size * 0.2, -size * 0.7, -size * 0.1 * wingUp);
    ctx.lineTo(-size * 0.6, size * 0.1);
    ctx.quadraticCurveTo(-size * 0.3, 0, -size * 0.1, 0);
    ctx.fill();

    // Aile droite (derrière)
    ctx.beginPath();
    ctx.moveTo(-size * 0.1, 0);
    ctx.quadraticCurveTo(-size * 0.4, -size * 0.2 * wingUp - size * 0.15, -size * 0.55, -size * 0.05 * wingUp);
    ctx.lineTo(-size * 0.45, size * 0.08);
    ctx.quadraticCurveTo(-size * 0.25, 0, -size * 0.1, 0);
    ctx.fill();

    ctx.restore();
}

// ===== NIVEAU 8 : ROYAUME DES RÊVES =====
function initLevel8Visuals(w, h) {
    if (VisualCache.level8) return VisualCache.level8;

    const visuals = {
        stars: [],
        dreamClouds: [],
        sparkles: [],
        bubbles: [],
        rainbowArcs: []
    };

    // Étoiles magiques
    for (let i = 0; i < 60; i++) {
        visuals.stars.push({
            x: seededRandom(i * 107) * w * 3,
            y: seededRandom(i * 109) * h * 0.6,
            size: 2 + seededRandom(i * 113) * 3,
            twinkleOffset: seededRandom(i * 127) * Math.PI * 2,
            color: ['#FFD700', '#FF69B4', '#87CEEB', '#DDA0DD', '#98FB98'][Math.floor(seededRandom(i * 131) * 5)]
        });
    }

    // Gros nuages de rêve
    for (let i = 0; i < 8; i++) {
        visuals.dreamClouds.push({
            x: seededRandom(i * 137) * w * 3,
            y: h * 0.15 + seededRandom(i * 139) * h * 0.4,
            width: 150 + seededRandom(i * 149) * 200,
            height: 60 + seededRandom(i * 151) * 60,
            speed: 0.15 + seededRandom(i * 157) * 0.2,
            hue: seededRandom(i * 163) * 60 + 260 // Teintes violettes/roses
        });
    }

    // Particules scintillantes
    for (let i = 0; i < 40; i++) {
        visuals.sparkles.push({
            x: seededRandom(i * 167) * w * 3,
            y: seededRandom(i * 173) * h,
            size: 2 + seededRandom(i * 179) * 4,
            speed: 0.5 + seededRandom(i * 181) * 1,
            phase: seededRandom(i * 191) * Math.PI * 2
        });
    }

    // Bulles de rêve flottantes
    for (let i = 0; i < 15; i++) {
        visuals.bubbles.push({
            x: seededRandom(i * 193) * w * 2,
            y: h + seededRandom(i * 197) * 200,
            size: 15 + seededRandom(i * 199) * 25,
            speed: 0.3 + seededRandom(i * 211) * 0.5,
            wobble: seededRandom(i * 223) * Math.PI * 2
        });
    }

    // Arcs-en-ciel subtils
    visuals.rainbowArcs.push({ x: 300, y: h * 0.5, size: 200, opacity: 0.15 });
    visuals.rainbowArcs.push({ x: 1200, y: h * 0.4, size: 250, opacity: 0.12 });
    visuals.rainbowArcs.push({ x: 2000, y: h * 0.55, size: 180, opacity: 0.18 });

    VisualCache.level8 = visuals;
    return visuals;
}

function drawLevel8Background(ctx, w, h, camX) {
    const visuals = initLevel8Visuals(w, h);

    // Dégradé de ciel onirique
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#1a0a2e');     // Violet très foncé
    skyGradient.addColorStop(0.2, '#4a2c7a');   // Violet
    skyGradient.addColorStop(0.4, '#7b4397');   // Violet rose
    skyGradient.addColorStop(0.6, '#9290FF');   // Bleu lavande
    skyGradient.addColorStop(0.8, '#dc98c0');   // Rose pâle
    skyGradient.addColorStop(1, '#ffecd2');     // Pêche clair
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Lune croissante magique
    drawCrescentMoon(ctx, w - 150, 100);

    // Arcs-en-ciel subtils
    for (const rainbow of visuals.rainbowArcs) {
        drawRainbowArc(ctx, rainbow.x - camX * 0.1, rainbow.y, rainbow.size, rainbow.opacity);
    }

    // Étoiles magiques colorées
    for (const star of visuals.stars) {
        const twinkle = Math.sin(state.frameTick * 0.03 + star.twinkleOffset);
        const alpha = 0.5 + twinkle * 0.4;
        const size = star.size * (0.8 + twinkle * 0.3);

        // Halo
        ctx.fillStyle = star.color.replace(')', `, ${alpha * 0.3})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(star.x - camX * 0.03, star.y, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Étoile
        drawSparkle(ctx, star.x - camX * 0.03, star.y, size, star.color, alpha);
    }

    // Nuages de rêve
    for (const cloud of visuals.dreamClouds) {
        drawDreamCloud(ctx, cloud.x - camX * cloud.speed * 0.5, cloud.y, cloud.width, cloud.height, cloud.hue);
    }

    // Particules scintillantes
    for (const sparkle of visuals.sparkles) {
        const y = sparkle.y - (state.frameTick * sparkle.speed * 0.5) % h;
        const alpha = Math.sin(state.frameTick * 0.05 + sparkle.phase) * 0.5 + 0.5;
        drawSparkle(ctx, sparkle.x - camX * 0.4, y, sparkle.size, '#FFFFFF', alpha);
    }
}

function drawLevel8Foreground(ctx, w, h, camX) {
    const visuals = initLevel8Visuals(w, h);

    // Bulles de rêve flottantes
    for (const bubble of visuals.bubbles) {
        updateDreamBubble(bubble, h);
        drawDreamBubble(ctx, bubble.x - camX * 0.3, bubble.y, bubble.size, bubble.wobble);
    }
}

function drawCrescentMoon(ctx, x, y) {
    // Halo magique
    const haloGradient = ctx.createRadialGradient(x, y, 0, x, y, 100);
    haloGradient.addColorStop(0, 'rgba(255, 230, 180, 0.4)');
    haloGradient.addColorStop(0.5, 'rgba(255, 200, 255, 0.15)');
    haloGradient.addColorStop(1, 'rgba(200, 150, 255, 0)');
    ctx.fillStyle = haloGradient;
    ctx.beginPath();
    ctx.arc(x, y, 100, 0, Math.PI * 2);
    ctx.fill();

    // Lune principale
    ctx.fillStyle = '#FFFDE7';
    ctx.beginPath();
    ctx.arc(x, y, 45, 0, Math.PI * 2);
    ctx.fill();

    // Découpe pour créer le croissant
    ctx.fillStyle = '#4a2c7a';
    ctx.beginPath();
    ctx.arc(x + 25, y - 5, 38, 0, Math.PI * 2);
    ctx.fill();

    // Brillance sur le croissant
    ctx.fillStyle = 'rgba(255, 255, 230, 0.3)';
    ctx.beginPath();
    ctx.arc(x - 15, y - 15, 8, 0, Math.PI * 2);
    ctx.fill();

    // Petites étoiles autour de la lune
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + state.frameTick * 0.01;
        const dist = 60 + Math.sin(state.frameTick * 0.02 + i) * 10;
        const sx = x + Math.cos(angle) * dist;
        const sy = y + Math.sin(angle) * dist;
        drawSparkle(ctx, sx, sy, 3, '#FFD700', 0.7);
    }
}

function drawRainbowArc(ctx, x, y, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;

    const colors = ['#FF6B6B', '#FFA07A', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6'];

    for (let i = 0; i < colors.length; i++) {
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(x, y + size, size - i * 10, Math.PI, 0);
        ctx.stroke();
    }

    ctx.restore();
}

function drawSparkle(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    // Forme d'étoile à 4 branches
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.3, y - size * 0.3);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size * 0.3, y + size * 0.3);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size * 0.3, y + size * 0.3);
    ctx.lineTo(x - size, y);
    ctx.lineTo(x - size * 0.3, y - size * 0.3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function drawDreamCloud(ctx, x, y, width, height, hue) {
    ctx.save();
    ctx.globalAlpha = 0.6;

    // Couleur basée sur la teinte
    const color1 = `hsla(${hue}, 60%, 80%, 0.8)`;
    const color2 = `hsla(${hue + 20}, 50%, 90%, 0.6)`;

    const gradient = ctx.createRadialGradient(x + width/2, y, 0, x + width/2, y, width/2);
    gradient.addColorStop(0, color2);
    gradient.addColorStop(1, color1);
    ctx.fillStyle = gradient;

    // Forme moelleuse du nuage
    const puffs = [
        { dx: 0, dy: 0, r: height * 0.8 },
        { dx: width * 0.25, dy: -height * 0.3, r: height * 1.0 },
        { dx: width * 0.5, dy: -height * 0.1, r: height * 0.9 },
        { dx: width * 0.75, dy: -height * 0.2, r: height * 0.7 },
        { dx: width * 0.15, dy: height * 0.3, r: height * 0.6 },
        { dx: width * 0.6, dy: height * 0.2, r: height * 0.5 }
    ];

    for (const puff of puffs) {
        ctx.beginPath();
        ctx.arc(x + puff.dx, y + puff.dy, puff.r, 0, Math.PI * 2);
        ctx.fill();
    }

    // Brillance
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(x + width * 0.3, y - height * 0.3, height * 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function updateDreamBubble(bubble, h) {
    bubble.y -= bubble.speed;
    bubble.wobble += 0.03;

    if (bubble.y < -bubble.size * 2) {
        bubble.y = h + bubble.size;
        bubble.x = seededRandom(bubble.y * 7) * canvas.width * 2;
    }
}

function drawDreamBubble(ctx, x, y, size, wobble) {
    const wobbleX = Math.sin(wobble) * 5;

    ctx.save();

    // Bulle principale
    const bubbleGradient = ctx.createRadialGradient(x + wobbleX - size * 0.3, y - size * 0.3, 0, x + wobbleX, y, size);
    bubbleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    bubbleGradient.addColorStop(0.3, 'rgba(200, 220, 255, 0.4)');
    bubbleGradient.addColorStop(0.7, 'rgba(180, 200, 255, 0.2)');
    bubbleGradient.addColorStop(1, 'rgba(150, 180, 255, 0.1)');

    ctx.fillStyle = bubbleGradient;
    ctx.beginPath();
    ctx.arc(x + wobbleX, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Bordure irisée
    ctx.strokeStyle = 'rgba(255, 200, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Reflet principal
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.ellipse(x + wobbleX - size * 0.3, y - size * 0.3, size * 0.25, size * 0.15, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Petit reflet secondaire
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(x + wobbleX + size * 0.2, y + size * 0.2, size * 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// ===== SPRITES AMÉLIORÉS NIVEAU 7 & 8 =====

function drawEnhancedKnight(ctx, h) {
    const time = state.frameTick;
    const breathe = Math.sin(time * 0.05) * 2;
    const lanceOscillation = Math.sin(time * 0.08) * 0.15;

    ctx.save();
    ctx.translate(h.x + h.w / 2, h.y + h.h / 2);

    // Ombre au sol
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(0, h.h / 2 + 10, h.w * 0.6, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Corps en armure avec dégradé
    const armorGradient = ctx.createLinearGradient(-h.w / 2, -h.h / 2, h.w / 2, h.h / 2);
    armorGradient.addColorStop(0, '#e8e8e8');
    armorGradient.addColorStop(0.3, '#c0c0c0');
    armorGradient.addColorStop(0.7, '#a0a0a0');
    armorGradient.addColorStop(1, '#808080');

    // Torse
    ctx.fillStyle = armorGradient;
    ctx.beginPath();
    ctx.roundRect(-12, -15 + breathe, 24, 35, 4);
    ctx.fill();

    // Détails du plastron
    ctx.strokeStyle = '#606060';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-8, -10 + breathe);
    ctx.lineTo(-8, 15 + breathe);
    ctx.moveTo(8, -10 + breathe);
    ctx.lineTo(8, 15 + breathe);
    ctx.moveTo(-10, 0 + breathe);
    ctx.lineTo(10, 0 + breathe);
    ctx.stroke();

    // Reflet sur l'armure
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(-10, -12 + breathe, 4, 15);

    // Épaulières
    ctx.fillStyle = armorGradient;
    ctx.beginPath();
    ctx.ellipse(-15, -10 + breathe, 8, 10, -0.3, 0, Math.PI * 2);
    ctx.ellipse(15, -10 + breathe, 8, 10, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#707070';
    ctx.stroke();

    // Casque
    const helmetGradient = ctx.createLinearGradient(-12, -h.h / 2, 12, -15);
    helmetGradient.addColorStop(0, '#d0d0d0');
    helmetGradient.addColorStop(0.5, '#b0b0b0');
    helmetGradient.addColorStop(1, '#909090');
    ctx.fillStyle = helmetGradient;
    ctx.beginPath();
    ctx.roundRect(-12, -h.h / 2 + breathe, 24, 28, [8, 8, 2, 2]);
    ctx.fill();

    // Visière (fente sombre)
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(-10, -h.h / 2 + 12 + breathe, 20, 6);

    // Yeux menaçants dans la visière
    const eyeGlow = Math.sin(time * 0.1) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(255, 50, 50, ${eyeGlow})`;
    ctx.beginPath();
    ctx.arc(-4, -h.h / 2 + 15 + breathe, 2, 0, Math.PI * 2);
    ctx.arc(4, -h.h / 2 + 15 + breathe, 2, 0, Math.PI * 2);
    ctx.fill();

    // Crête du casque
    ctx.fillStyle = '#cc0000';
    const crestWave = Math.sin(time * 0.1) * 2;
    ctx.beginPath();
    ctx.moveTo(-3, -h.h / 2 + breathe);
    ctx.quadraticCurveTo(0 + crestWave, -h.h / 2 - 20 + breathe, 3, -h.h / 2 + breathe);
    ctx.fill();

    // Plumes de la crête
    ctx.fillStyle = '#aa0000';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-2 + i * 2, -h.h / 2 + breathe);
        ctx.quadraticCurveTo(crestWave + i, -h.h / 2 - 15 - i * 3 + breathe, i, -h.h / 2 - 5 + breathe);
        ctx.stroke();
    }

    // Jambières
    ctx.fillStyle = armorGradient;
    ctx.fillRect(-10, 20 + breathe, 8, 20);
    ctx.fillRect(2, 20 + breathe, 8, 20);

    // Lance épique
    ctx.save();
    ctx.rotate(lanceOscillation);

    // Hampe de la lance
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(0, -70);
    ctx.stroke();

    // Détails de la hampe
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-3, -20);
    ctx.lineTo(3, -20);
    ctx.moveTo(-3, -40);
    ctx.lineTo(3, -40);
    ctx.stroke();

    // Pointe de la lance
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.moveTo(0, -95);
    ctx.lineTo(-8, -70);
    ctx.lineTo(-3, -70);
    ctx.lineTo(-3, -65);
    ctx.lineTo(3, -65);
    ctx.lineTo(3, -70);
    ctx.lineTo(8, -70);
    ctx.closePath();
    ctx.fill();

    // Reflet sur la pointe
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.moveTo(-2, -90);
    ctx.lineTo(-5, -72);
    ctx.lineTo(-2, -72);
    ctx.closePath();
    ctx.fill();

    // Garde de la lance
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(-6, -68, 12, 4);

    ctx.restore();

    ctx.restore();
}

function drawEnhancedShyGuy(ctx, e) {
    const time = state.frameTick;
    const bounce = Math.sin(time * 0.15) * 2;
    const wobble = Math.sin(time * 0.1) * 0.05;

    ctx.save();
    ctx.translate(e.x + e.w / 2, e.y + e.h);
    ctx.rotate(wobble);

    const dir = e.dir || 1;
    ctx.scale(dir, 1);

    // Ombre
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(0, 5, e.w * 0.4, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Robe/Corps rouge avec dégradé
    const bodyGradient = ctx.createLinearGradient(-e.w / 2, -e.h, e.w / 2, 0);
    bodyGradient.addColorStop(0, '#ff4444');
    bodyGradient.addColorStop(0.5, '#cc0000');
    bodyGradient.addColorStop(1, '#aa0000');
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.moveTo(-e.w / 2 + 5, -e.h / 2 + bounce);
    ctx.quadraticCurveTo(-e.w / 2, 0, -e.w / 2 + 8, 0);
    ctx.lineTo(e.w / 2 - 8, 0);
    ctx.quadraticCurveTo(e.w / 2, 0, e.w / 2 - 5, -e.h / 2 + bounce);
    ctx.closePath();
    ctx.fill();

    // Ceinture
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(-e.w / 2 + 6, -e.h / 3 + bounce, e.w - 12, 5);

    // Boucle de ceinture
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(-3, -e.h / 3 + bounce, 6, 5);

    // Pieds bleus animés
    const footOffset = Math.sin(time * 0.2) * 5;
    ctx.fillStyle = '#2980b9';

    // Pied gauche
    ctx.beginPath();
    ctx.ellipse(-8 + footOffset, 3, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pied droit
    ctx.beginPath();
    ctx.ellipse(8 - footOffset, 3, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Reflets sur les chaussures
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.ellipse(-10 + footOffset, 1, 3, 2, 0, 0, Math.PI * 2);
    ctx.ellipse(6 - footOffset, 1, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Masque blanc
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, -e.h / 2 - 5 + bounce, 14, 0, Math.PI * 2);
    ctx.fill();

    // Bordure du masque
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Yeux noirs (grands et expressifs)
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(-5, -e.h / 2 - 7 + bounce, 4, 5, 0, 0, Math.PI * 2);
    ctx.ellipse(5, -e.h / 2 - 7 + bounce, 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Reflets dans les yeux
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-6, -e.h / 2 - 9 + bounce, 1.5, 0, Math.PI * 2);
    ctx.arc(4, -e.h / 2 - 9 + bounce, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Bouche (petit O surpris)
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(0, -e.h / 2 + 3 + bounce, 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Capuche/Tête pointue
    ctx.fillStyle = '#cc0000';
    ctx.beginPath();
    ctx.moveTo(-12, -e.h / 2 - 12 + bounce);
    ctx.quadraticCurveTo(0, -e.h - 25 + bounce, 12, -e.h / 2 - 12 + bounce);
    ctx.fill();

    // Noeud de la capuche
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(0, -e.h / 2 - 15 + bounce, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// ===== NIVEAU 9 : TEMPLE DES BOMBES (ÉGYPTE) =====
function initLevel9Visuals(w, h) {
    if (VisualCache.level9) return VisualCache.level9;

    const visuals = {
        stars: [],
        shootingStars: [],
        sandDunes: [],
        obelisks: [],
        hieroglyphs: [],
        torches: [],
        dustParticles: []
    };

    // Étoiles dans le ciel nocturne
    for (let i = 0; i < 150; i++) {
        visuals.stars.push({
            x: seededRandom(i * 211) * w * 3,
            y: seededRandom(i * 223) * h * 0.5,
            size: 1 + seededRandom(i * 227) * 2.5,
            twinkleOffset: seededRandom(i * 229) * Math.PI * 2,
            twinkleSpeed: 0.02 + seededRandom(i * 233) * 0.04,
            color: seededRandom(i * 239) > 0.8 ? '#FFD700' : '#FFFFFF'
        });
    }

    // Étoiles filantes occasionnelles
    for (let i = 0; i < 3; i++) {
        visuals.shootingStars.push({
            x: seededRandom(i * 241) * w * 2,
            y: seededRandom(i * 251) * h * 0.3,
            length: 80 + seededRandom(i * 257) * 60,
            speed: 8 + seededRandom(i * 263) * 6,
            active: false,
            timer: seededRandom(i * 269) * 500
        });
    }

    // Dunes de sable en arrière-plan
    for (let i = 0; i < 5; i++) {
        visuals.sandDunes.push({
            x: seededRandom(i * 271) * w * 2,
            width: 300 + seededRandom(i * 277) * 400,
            height: 60 + seededRandom(i * 281) * 80,
            layer: i % 3
        });
    }

    // Obélisques mystérieux
    visuals.obelisks.push({ x: 150, height: 180, width: 25 });
    visuals.obelisks.push({ x: 850, height: 200, width: 28 });
    visuals.obelisks.push({ x: 1400, height: 160, width: 22 });

    // Torches sur les côtés
    for (let i = 0; i < 6; i++) {
        visuals.torches.push({
            x: 100 + i * 300 + seededRandom(i * 283) * 50,
            y: h * 0.65,
            flickerOffset: seededRandom(i * 293) * Math.PI * 2
        });
    }

    // Particules de poussière/sable
    for (let i = 0; i < 30; i++) {
        visuals.dustParticles.push({
            x: seededRandom(i * 307) * w * 3,
            y: h * 0.5 + seededRandom(i * 311) * h * 0.4,
            size: 1 + seededRandom(i * 313) * 3,
            speed: 0.3 + seededRandom(i * 317) * 0.5,
            opacity: 0.2 + seededRandom(i * 331) * 0.3
        });
    }

    VisualCache.level9 = visuals;
    return visuals;
}

function drawLevel9Background(ctx, w, h, camX) {
    const visuals = initLevel9Visuals(w, h);

    // Dégradé du ciel nocturne égyptien
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#0a0a1a');      // Noir profond
    skyGradient.addColorStop(0.2, '#0d1b2a');    // Bleu nuit
    skyGradient.addColorStop(0.5, '#1b263b');    // Bleu marine
    skyGradient.addColorStop(0.7, '#2d3a4a');    // Bleu gris
    skyGradient.addColorStop(1, '#4a3728');      // Brun sable (horizon)
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Lune croissante dorée (style égyptien)
    drawEgyptianMoon(ctx, w - 150, 100);

    // Étoiles scintillantes
    for (const star of visuals.stars) {
        const twinkle = Math.sin(state.frameTick * star.twinkleSpeed + star.twinkleOffset);
        const alpha = 0.5 + twinkle * 0.5;
        const size = star.size * (0.8 + twinkle * 0.2);

        ctx.fillStyle = star.color === '#FFD700'
            ? `rgba(255, 215, 0, ${alpha})`
            : `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x - camX * 0.02, star.y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Étoiles filantes
    for (const ss of visuals.shootingStars) {
        updateShootingStar(ss, w);
        if (ss.active) {
            drawShootingStar(ctx, ss, camX);
        }
    }

    // Dunes de sable en arrière-plan
    for (const dune of visuals.sandDunes) {
        const parallax = 0.1 + dune.layer * 0.1;
        drawSandDune(ctx, dune.x - camX * parallax, h * 0.7 - dune.layer * 30, dune.width, dune.height, dune.layer);
    }

    // Grandes pyramides majestueuses
    drawMajesticPyramid(ctx, 100 - camX * 0.15, h * 0.4, 280, true);
    drawMajesticPyramid(ctx, w - 200 - camX * 0.15, h * 0.45, 220, false);
    drawMajesticPyramid(ctx, 500 - camX * 0.12, h * 0.5, 180, false);

    // Obélisques mystérieux
    for (const ob of visuals.obelisks) {
        drawObelisk(ctx, ob.x - camX * 0.2, h * 0.65, ob.width, ob.height);
    }

    // Torches avec flammes
    for (const torch of visuals.torches) {
        drawEgyptianTorch(ctx, torch.x - camX * 0.4, torch.y, torch.flickerOffset);
    }

    // Particules de poussière/sable
    ctx.globalAlpha = 0.4;
    for (const dust of visuals.dustParticles) {
        ctx.fillStyle = `rgba(210, 180, 140, ${dust.opacity})`;
        ctx.beginPath();
        ctx.arc(dust.x - camX * 0.3, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function drawLevel9Foreground(ctx, w, h, camX) {
    const visuals = initLevel9Visuals(w, h);

    // Particules de sable qui flottent au premier plan
    const time = state.frameTick * 0.02;
    for (let i = 0; i < 15; i++) {
        const x = (seededRandom(i * 337) * w * 2 + time * 30) % (w * 2);
        const y = h * 0.3 + Math.sin(time + i) * 50 + seededRandom(i * 347) * h * 0.5;
        const size = 2 + seededRandom(i * 353) * 3;

        ctx.fillStyle = `rgba(210, 180, 140, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x - camX * 0.8, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Lune égyptienne dorée avec croissant
function drawEgyptianMoon(ctx, x, y) {
    const time = state.frameTick * 0.01;
    const pulse = Math.sin(time) * 3;

    // Halo doré mystique
    const haloGradient = ctx.createRadialGradient(x, y, 0, x, y, 100 + pulse);
    haloGradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
    haloGradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.15)');
    haloGradient.addColorStop(1, 'rgba(255, 180, 50, 0)');
    ctx.fillStyle = haloGradient;
    ctx.beginPath();
    ctx.arc(x, y, 100 + pulse, 0, Math.PI * 2);
    ctx.fill();

    // Corps de la lune (croissant)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x, y, 45, 0, Math.PI * 2);
    ctx.fill();

    // Partie sombre pour créer le croissant
    ctx.fillStyle = '#0d1b2a';
    ctx.beginPath();
    ctx.arc(x + 20, y - 5, 38, 0, Math.PI * 2);
    ctx.fill();

    // Reflet brillant
    ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
    ctx.beginPath();
    ctx.arc(x - 15, y - 15, 8, 0, Math.PI * 2);
    ctx.fill();
}

// Étoile filante
function updateShootingStar(ss, w) {
    ss.timer--;
    if (ss.timer <= 0 && !ss.active) {
        ss.active = true;
        ss.x = Math.random() * w;
        ss.y = Math.random() * 150;
    }
    if (ss.active) {
        ss.x += ss.speed;
        ss.y += ss.speed * 0.5;
        if (ss.x > w * 2 || ss.y > 400) {
            ss.active = false;
            ss.timer = 300 + Math.random() * 400;
        }
    }
}

function drawShootingStar(ctx, ss, camX) {
    const gradient = ctx.createLinearGradient(
        ss.x - camX * 0.02, ss.y,
        ss.x - ss.length - camX * 0.02, ss.y - ss.length * 0.5
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 200, 0.6)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ss.x - camX * 0.02, ss.y);
    ctx.lineTo(ss.x - ss.length - camX * 0.02, ss.y - ss.length * 0.5);
    ctx.stroke();
}

// Dune de sable
function drawSandDune(ctx, x, y, width, height, layer) {
    const colors = [
        ['#8B7355', '#A0926B'],  // Couche arrière (plus sombre)
        ['#C4A77D', '#D4B896'],  // Couche milieu
        ['#DEB887', '#E8CFA0']   // Couche avant (plus clair)
    ];
    const [baseColor, highlightColor] = colors[layer] || colors[0];

    const gradient = ctx.createLinearGradient(x, y - height, x, y + 20);
    gradient.addColorStop(0, highlightColor);
    gradient.addColorStop(1, baseColor);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x - width/2, y + 20);
    ctx.quadraticCurveTo(x, y - height, x + width/2, y + 20);
    ctx.fill();
}

// Pyramide majestueuse
function drawMajesticPyramid(ctx, x, y, size, isMain) {
    // Ombre de la pyramide
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.moveTo(x, y + size * 0.1);
    ctx.lineTo(x + size * 0.6, y + size * 0.5);
    ctx.lineTo(x + size * 1.2, y + size * 0.5);
    ctx.lineTo(x + size * 0.5, y + size * 0.1);
    ctx.fill();

    // Face gauche (dans l'ombre)
    const darkGradient = ctx.createLinearGradient(x - size/2, y, x, y - size);
    darkGradient.addColorStop(0, '#8B7355');
    darkGradient.addColorStop(0.5, '#7A6548');
    darkGradient.addColorStop(1, '#5D4E37');
    ctx.fillStyle = darkGradient;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size/2, y);
    ctx.lineTo(x, y);
    ctx.fill();

    // Face droite (éclairée par la lune)
    const lightGradient = ctx.createLinearGradient(x, y - size, x + size/2, y);
    lightGradient.addColorStop(0, '#D4B896');
    lightGradient.addColorStop(0.3, '#C4A77D');
    lightGradient.addColorStop(1, '#A08060');
    ctx.fillStyle = lightGradient;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size/2, y);
    ctx.lineTo(x, y);
    ctx.fill();

    // Détails des blocs (lignes horizontales)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 8; i++) {
        const lineY = y - size + (size / 8) * i;
        const leftX = x - (size/2) * (1 - i/8);
        const rightX = x + (size/2) * (1 - i/8);

        ctx.beginPath();
        ctx.moveTo(leftX, lineY);
        ctx.lineTo(x, lineY);
        ctx.lineTo(rightX, lineY);
        ctx.stroke();
    }

    // Sommet doré si c'est la pyramide principale
    if (isMain) {
        const topSize = size * 0.08;
        const glow = Math.sin(state.frameTick * 0.05) * 0.3 + 0.7;

        ctx.fillStyle = `rgba(255, 215, 0, ${glow})`;
        ctx.beginPath();
        ctx.moveTo(x, y - size - topSize);
        ctx.lineTo(x - topSize, y - size + topSize);
        ctx.lineTo(x + topSize, y - size + topSize);
        ctx.closePath();
        ctx.fill();

        // Halo autour du sommet
        ctx.fillStyle = `rgba(255, 215, 0, ${glow * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y - size, topSize * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Obélisque égyptien
function drawObelisk(ctx, x, y, width, height) {
    // Corps de l'obélisque
    const gradient = ctx.createLinearGradient(x - width/2, y, x + width/2, y);
    gradient.addColorStop(0, '#5D4E37');
    gradient.addColorStop(0.3, '#8B7355');
    gradient.addColorStop(0.7, '#7A6548');
    gradient.addColorStop(1, '#4A3C2A');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x, y - height);
    ctx.lineTo(x - width/2, y - height + 20);
    ctx.lineTo(x - width/2 + 3, y);
    ctx.lineTo(x + width/2 - 3, y);
    ctx.lineTo(x + width/2, y - height + 20);
    ctx.closePath();
    ctx.fill();

    // Sommet pyramidal
    ctx.fillStyle = '#C4A77D';
    ctx.beginPath();
    ctx.moveTo(x, y - height - 15);
    ctx.lineTo(x - width/2, y - height);
    ctx.lineTo(x + width/2, y - height);
    ctx.closePath();
    ctx.fill();

    // Hiéroglyphes simulés
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    for (let i = 0; i < 4; i++) {
        const hy = y - height + 40 + i * 35;
        ctx.fillRect(x - width/4, hy, width/2, 8);
        ctx.fillRect(x - width/6, hy + 12, width/3, 6);
    }
}

// Torche égyptienne
function drawEgyptianTorch(ctx, x, y, flickerOffset) {
    const time = state.frameTick * 0.1;
    const flicker = Math.sin(time + flickerOffset) * 0.3 + 0.7;

    // Support de la torche
    ctx.fillStyle = '#4A3C2A';
    ctx.fillRect(x - 4, y, 8, 40);

    // Bol de la torche
    ctx.fillStyle = '#8B7355';
    ctx.beginPath();
    ctx.moveTo(x - 12, y);
    ctx.lineTo(x - 8, y - 15);
    ctx.lineTo(x + 8, y - 15);
    ctx.lineTo(x + 12, y);
    ctx.fill();

    // Lueur de la flamme
    const glowGradient = ctx.createRadialGradient(x, y - 25, 0, x, y - 25, 40);
    glowGradient.addColorStop(0, `rgba(255, 150, 50, ${0.4 * flicker})`);
    glowGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(x, y - 25, 40, 0, Math.PI * 2);
    ctx.fill();

    // Flamme
    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    ctx.moveTo(x, y - 45 - flicker * 10);
    ctx.quadraticCurveTo(x - 10, y - 30, x - 6, y - 15);
    ctx.lineTo(x + 6, y - 15);
    ctx.quadraticCurveTo(x + 10, y - 30, x, y - 45 - flicker * 10);
    ctx.fill();

    // Coeur de la flamme
    ctx.fillStyle = '#FFCC00';
    ctx.beginPath();
    ctx.moveTo(x, y - 40 - flicker * 8);
    ctx.quadraticCurveTo(x - 5, y - 28, x - 3, y - 18);
    ctx.lineTo(x + 3, y - 18);
    ctx.quadraticCurveTo(x + 5, y - 28, x, y - 40 - flicker * 8);
    ctx.fill();
}

// ===== SPRITE AMÉLIORÉ : SPHINX (ennemi volant du niveau 9) =====
function drawEnhancedSphinx(ctx, e) {
    const time = state.frameTick;
    const hover = Math.sin(time * 0.08) * 4;
    const wingFlap = Math.sin(time * 0.3) * 20;

    ctx.save();
    ctx.translate(e.x + e.w/2, e.y + e.h/2 + hover);

    const dir = e.dir || 1;
    ctx.scale(dir, 1);

    // Ombre au sol
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(0, e.h/2 + 20 - hover, e.w * 0.4, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ailes (derrière le corps)
    ctx.fillStyle = '#C4A77D';

    // Aile gauche
    ctx.save();
    ctx.rotate((-30 + wingFlap) * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.quadraticCurveTo(-35, -20, -45, 5);
    ctx.quadraticCurveTo(-30, 10, -5, 5);
    ctx.fill();
    // Détails de l'aile
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-10, 2);
    ctx.lineTo(-35, -5);
    ctx.moveTo(-15, 3);
    ctx.lineTo(-40, 5);
    ctx.stroke();
    ctx.restore();

    // Aile droite
    ctx.save();
    ctx.rotate((30 - wingFlap) * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.quadraticCurveTo(35, -20, 45, 5);
    ctx.quadraticCurveTo(30, 10, 5, 5);
    ctx.fill();
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, 2);
    ctx.lineTo(35, -5);
    ctx.moveTo(15, 3);
    ctx.lineTo(40, 5);
    ctx.stroke();
    ctx.restore();

    // Corps du sphinx (lion stylisé)
    const bodyGradient = ctx.createLinearGradient(-15, -10, 15, 15);
    bodyGradient.addColorStop(0, '#DEB887');
    bodyGradient.addColorStop(0.5, '#C4A77D');
    bodyGradient.addColorStop(1, '#A08060');
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.ellipse(0, 5, 18, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pattes avant
    ctx.fillStyle = '#C4A77D';
    ctx.fillRect(-12, 10, 6, 12);
    ctx.fillRect(6, 10, 6, 12);

    // Queue
    ctx.strokeStyle = '#A08060';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(15, 5);
    ctx.quadraticCurveTo(25, 0, 22, -8);
    ctx.stroke();
    // Touffe de la queue
    ctx.fillStyle = '#8B7355';
    ctx.beginPath();
    ctx.arc(22, -10, 4, 0, Math.PI * 2);
    ctx.fill();

    // Tête humaine du sphinx
    const headGradient = ctx.createRadialGradient(-2, -12, 0, -2, -12, 15);
    headGradient.addColorStop(0, '#DEB887');
    headGradient.addColorStop(1, '#C4A77D');
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.arc(0, -12, 12, 0, Math.PI * 2);
    ctx.fill();

    // Coiffe égyptienne (némès)
    ctx.fillStyle = '#4169E1';
    ctx.beginPath();
    ctx.moveTo(-12, -15);
    ctx.lineTo(-15, 0);
    ctx.lineTo(-8, -5);
    ctx.lineTo(0, -22);
    ctx.lineTo(8, -5);
    ctx.lineTo(15, 0);
    ctx.lineTo(12, -15);
    ctx.closePath();
    ctx.fill();

    // Bandes de la coiffe
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(-10, -18, 20, 3);
    ctx.fillRect(-12, -8, 4, 10);
    ctx.fillRect(8, -8, 4, 10);

    // Visage
    // Yeux
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(-5, -13, 3, 4, 0, 0, Math.PI * 2);
    ctx.ellipse(5, -13, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupilles (suivent le joueur légèrement)
    ctx.fillStyle = '#4A0080';
    ctx.beginPath();
    ctx.arc(-5 + dir, -13, 2, 0, Math.PI * 2);
    ctx.arc(5 + dir, -13, 2, 0, Math.PI * 2);
    ctx.fill();

    // Yeux qui brillent
    const eyeGlow = Math.sin(time * 0.1) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(255, 215, 0, ${eyeGlow * 0.5})`;
    ctx.beginPath();
    ctx.arc(-5, -13, 4, 0, Math.PI * 2);
    ctx.arc(5, -13, 4, 0, Math.PI * 2);
    ctx.fill();

    // Nez
    ctx.strokeStyle = '#A08060';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(0, -8);
    ctx.stroke();

    // Bouche sérieuse
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-4, -5);
    ctx.lineTo(4, -5);
    ctx.stroke();

    // Barbe cérémonielle
    ctx.fillStyle = '#4169E1';
    ctx.beginPath();
    ctx.moveTo(-2, -4);
    ctx.lineTo(-3, 5);
    ctx.lineTo(3, 5);
    ctx.lineTo(2, -4);
    ctx.fill();
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(-2, -3, 4, 2);

    ctx.restore();
}

// ===== NIVEAU 10 : ZONE FINALE - BOSS ÉPIQUE =====
function initLevel10Visuals(w, h) {
    if (VisualCache.level10) return VisualCache.level10;

    const visuals = {
        // Fond cosmique
        stars: [],
        nebulae: [],
        shootingStars: [],
        // Effets Sonic
        checkerboardSegments: [],
        speedLines: [],
        rings: [],
        // Arène du boss
        energyVortex: [],
        lightningBolts: [],
        floatingDebris: [],
        // Particules épiques
        energyParticles: [],
        sparks: [],
        shockwaves: []
    };

    // Étoiles cosmiques (fond profond)
    for (let i = 0; i < 250; i++) {
        visuals.stars.push({
            x: seededRandom(i * 601) * w * 4,
            y: seededRandom(i * 607) * h,
            size: 0.5 + seededRandom(i * 613) * 2.5,
            twinklePhase: seededRandom(i * 617) * Math.PI * 2,
            color: ['#ffffff', '#a8d5ff', '#ffd5e5', '#d5ffe5'][Math.floor(seededRandom(i * 619) * 4)],
            brightness: 0.5 + seededRandom(i * 631) * 0.5
        });
    }

    // Nébuleuses colorées
    for (let i = 0; i < 6; i++) {
        visuals.nebulae.push({
            x: seededRandom(i * 641) * w * 3,
            y: seededRandom(i * 643) * h * 0.8,
            width: 300 + seededRandom(i * 647) * 400,
            height: 200 + seededRandom(i * 653) * 300,
            color: ['#ff006620', '#0066ff20', '#ff660020', '#00ff6620', '#6600ff20', '#ff00ff20'][i],
            rotation: seededRandom(i * 659) * Math.PI
        });
    }

    // Étoiles filantes
    for (let i = 0; i < 5; i++) {
        visuals.shootingStars.push({
            active: false,
            x: 0,
            y: 0,
            speed: 15 + seededRandom(i * 661) * 10,
            angle: -0.3 - seededRandom(i * 673) * 0.4,
            length: 80 + seededRandom(i * 677) * 60,
            cooldown: 0,
            maxCooldown: 200 + seededRandom(i * 683) * 300
        });
    }

    // Segments de damier Sonic (pour la zone Sonic)
    for (let i = 0; i < 20; i++) {
        visuals.checkerboardSegments.push({
            x: i * 150,
            y: h * 0.7,
            width: 150,
            rows: 4,
            color1: '#1e3a5f',
            color2: '#0a1628'
        });
    }

    // Lignes de vitesse
    for (let i = 0; i < 30; i++) {
        visuals.speedLines.push({
            x: seededRandom(i * 691) * w * 2,
            y: seededRandom(i * 701) * h,
            length: 50 + seededRandom(i * 709) * 150,
            speed: 10 + seededRandom(i * 719) * 20,
            opacity: 0.2 + seededRandom(i * 727) * 0.4
        });
    }

    // Anneaux Sonic flottants (décoratifs)
    for (let i = 0; i < 15; i++) {
        visuals.rings.push({
            x: seededRandom(i * 733) * w * 2.5,
            y: h * 0.2 + seededRandom(i * 739) * h * 0.5,
            size: 20 + seededRandom(i * 743) * 15,
            rotationSpeed: 0.05 + seededRandom(i * 751) * 0.1,
            bobPhase: seededRandom(i * 757) * Math.PI * 2
        });
    }

    // Vortex d'énergie (pour l'arène du boss)
    for (let ring = 0; ring < 5; ring++) {
        visuals.energyVortex.push({
            radius: 100 + ring * 50,
            rotationSpeed: 0.02 - ring * 0.003,
            particles: 20 - ring * 2,
            color: `hsl(${280 + ring * 20}, 100%, 60%)`
        });
    }

    // Débris flottants
    for (let i = 0; i < 20; i++) {
        visuals.floatingDebris.push({
            x: seededRandom(i * 761) * w * 3,
            y: seededRandom(i * 769) * h,
            size: 5 + seededRandom(i * 773) * 20,
            rotationSpeed: (seededRandom(i * 787) - 0.5) * 0.1,
            rotation: seededRandom(i * 797) * Math.PI * 2,
            floatPhase: seededRandom(i * 809) * Math.PI * 2,
            type: Math.floor(seededRandom(i * 811) * 3)
        });
    }

    // Particules d'énergie
    for (let i = 0; i < 50; i++) {
        visuals.energyParticles.push({
            x: seededRandom(i * 821) * w * 3,
            y: seededRandom(i * 823) * h,
            size: 2 + seededRandom(i * 827) * 4,
            speedX: (seededRandom(i * 829) - 0.5) * 2,
            speedY: -1 - seededRandom(i * 839) * 2,
            color: ['#ff00ff', '#00ffff', '#ffff00', '#ff6600'][i % 4],
            glowPhase: seededRandom(i * 853) * Math.PI * 2
        });
    }

    VisualCache.level10 = visuals;
    return visuals;
}

function drawLevel10Background(ctx, w, h, camX) {
    const visuals = initLevel10Visuals(w, h);
    const time = state.frameTick;

    // Fond spatial épique (dégradé dramatique)
    const spaceGrad = ctx.createLinearGradient(0, 0, 0, h);
    spaceGrad.addColorStop(0, '#0a0015');
    spaceGrad.addColorStop(0.3, '#150030');
    spaceGrad.addColorStop(0.5, '#1a0a40');
    spaceGrad.addColorStop(0.7, '#100525');
    spaceGrad.addColorStop(1, '#050010');
    ctx.fillStyle = spaceGrad;
    ctx.fillRect(0, 0, w, h);

    // Nébuleuses (effet de profondeur cosmique)
    for (const nebula of visuals.nebulae) {
        const x = nebula.x - camX * 0.05;
        drawCosmicNebula(ctx, x, nebula.y, nebula.width, nebula.height, nebula.color, time);
    }

    // Étoiles scintillantes
    for (const star of visuals.stars) {
        const x = star.x - camX * 0.02;
        const twinkle = 0.5 + Math.sin(time * 0.05 + star.twinklePhase) * 0.5;

        ctx.globalAlpha = star.brightness * twinkle;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Étoiles filantes occasionnelles
    for (const shootingStar of visuals.shootingStars) {
        updateAndDrawShootingStar(ctx, shootingStar, w, h, time);
    }

    // Damier Sonic en arrière-plan (style Green Hill Zone)
    drawSonicCheckerboard(ctx, visuals.checkerboardSegments, camX, h, time);

    // Anneaux Sonic flottants (décoratifs)
    for (const ring of visuals.rings) {
        const x = ring.x - camX * 0.3;
        const bob = Math.sin(time * 0.04 + ring.bobPhase) * 10;
        const rotation = time * ring.rotationSpeed;
        drawSonicRing(ctx, x, ring.y + bob, ring.size, rotation, time);
    }

    // Planète/Lune épique en arrière-plan
    drawEpicPlanet(ctx, w - 250, 180, time);

    // Lignes de vitesse (effet dynamique)
    if (state.level === 10) {
        for (const line of visuals.speedLines) {
            const x = (line.x - time * line.speed) % (w * 2);
            ctx.globalAlpha = line.opacity;
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - camX * 0.5, line.y);
            ctx.lineTo(x - line.length - camX * 0.5, line.y);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }
}

function drawLevel10Foreground(ctx, w, h, camX) {
    const visuals = initLevel10Visuals(w, h);
    const time = state.frameTick;

    // Débris flottants
    for (const debris of visuals.floatingDebris) {
        const x = debris.x - camX * 0.6;
        const floatY = debris.y + Math.sin(time * 0.02 + debris.floatPhase) * 20;
        const rotation = debris.rotation + time * debris.rotationSpeed;
        drawFloatingDebris(ctx, x, floatY, debris.size, rotation, debris.type);
    }

    // Particules d'énergie montantes
    for (const particle of visuals.energyParticles) {
        const x = (particle.x + time * particle.speedX) % (w * 3);
        const y = (particle.y + time * particle.speedY) % h;
        const adjustedY = y < 0 ? y + h : y;
        const glow = 0.5 + Math.sin(time * 0.1 + particle.glowPhase) * 0.5;

        ctx.globalAlpha = glow;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(x - camX * 0.7, adjustedY, particle.size * glow, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    // Effet de vortex d'énergie (centre de l'écran pour le boss)
    // Seulement visible dans la zone boss (après x > 2000)
    const bossAreaStart = 2000;
    const vortexCenterX = bossAreaStart + 400 - camX;
    if (vortexCenterX > -200 && vortexCenterX < w + 200) {
        drawEnergyVortex(ctx, vortexCenterX, h * 0.5, visuals.energyVortex, time);
    }

    // Éclairs occasionnels (effet dramatique)
    if (Math.sin(time * 0.02) > 0.98) {
        drawLightningFlash(ctx, w, h, time);
    }

    // Effet de scan horizontal épique
    const scanY = (time * 3) % (h * 2);
    if (scanY < h) {
        ctx.globalAlpha = 0.15;
        const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
        scanGrad.addColorStop(0, 'transparent');
        scanGrad.addColorStop(0.5, '#ff00ff');
        scanGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 20, w, 40);
        ctx.globalAlpha = 1;
    }
}

// Fonctions helpers pour le niveau 10
function drawCosmicNebula(ctx, x, y, width, height, color, time) {
    const pulse = 1 + Math.sin(time * 0.01) * 0.1;

    ctx.save();
    ctx.translate(x + width/2, y + height/2);
    ctx.scale(pulse, pulse);

    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(width, height) / 2);
    grad.addColorStop(0, color);
    grad.addColorStop(0.5, color.replace('20', '10'));
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, width/2, height/2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function updateAndDrawShootingStar(ctx, star, w, h, time) {
    if (!star.active) {
        star.cooldown--;
        if (star.cooldown <= 0 && Math.random() > 0.995) {
            star.active = true;
            star.x = Math.random() * w * 0.5 + w * 0.25;
            star.y = Math.random() * h * 0.3;
        }
        return;
    }

    // Dessiner l'étoile filante
    const tailX = star.x - Math.cos(star.angle) * star.length;
    const tailY = star.y - Math.sin(star.angle) * star.length;

    const grad = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#aaddff');
    grad.addColorStop(1, 'transparent');

    ctx.strokeStyle = grad;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    // Tête brillante
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ffffff';
    ctx.beginPath();
    ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Mettre à jour la position
    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;

    // Désactiver si hors écran
    if (star.x > w * 1.5 || star.y > h) {
        star.active = false;
        star.cooldown = star.maxCooldown;
    }
}

function drawSonicCheckerboard(ctx, segments, camX, h, time) {
    const tileSize = 25;

    for (const seg of segments) {
        const x = seg.x - camX * 0.4;

        for (let row = 0; row < seg.rows; row++) {
            for (let col = 0; col < seg.width / tileSize; col++) {
                const tileX = x + col * tileSize;
                const tileY = seg.y + row * tileSize;

                // Damier
                const isLight = (row + col + Math.floor(time * 0.05)) % 2 === 0;
                ctx.fillStyle = isLight ? seg.color1 : seg.color2;
                ctx.fillRect(tileX, tileY, tileSize, tileSize);
            }
        }
    }
}

function drawSonicRing(ctx, x, y, size, rotation, time) {
    ctx.save();
    ctx.translate(x, y);

    const scaleX = Math.cos(rotation);
    ctx.scale(Math.abs(scaleX) * 0.5 + 0.5, 1);

    // Anneau
    const ringGrad = ctx.createLinearGradient(-size, 0, size, 0);
    ringGrad.addColorStop(0, '#ffd700');
    ringGrad.addColorStop(0.3, '#ffea00');
    ringGrad.addColorStop(0.7, '#ffd700');
    ringGrad.addColorStop(1, '#b8860b');

    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = size * 0.3;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
    ctx.stroke();

    // Brillance
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(-size * 0.3, -size * 0.3, size * 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawEpicPlanet(ctx, x, y, time) {
    const radius = 100;
    const rotation = time * 0.002;

    // Lueur externe (aura)
    const auraGrad = ctx.createRadialGradient(x, y, radius, x, y, radius + 80);
    auraGrad.addColorStop(0, 'rgba(150, 100, 255, 0.4)');
    auraGrad.addColorStop(0.5, 'rgba(100, 50, 200, 0.2)');
    auraGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius + 80, 0, Math.PI * 2);
    ctx.fill();

    // Corps de la planète
    const planetGrad = ctx.createRadialGradient(x - 30, y - 30, 0, x, y, radius);
    planetGrad.addColorStop(0, '#8b5cf6');
    planetGrad.addColorStop(0.5, '#6d28d9');
    planetGrad.addColorStop(1, '#4c1d95');
    ctx.fillStyle = planetGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Anneaux de la planète
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(0.3);

    ctx.strokeStyle = 'rgba(200, 180, 255, 0.5)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 1.6, radius * 0.25, rotation, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(200, 180, 255, 0.3)';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 1.8, radius * 0.3, rotation, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // Détails de surface (cratères/nuages)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(x - 40, y - 30, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 30, y + 40, 15, 0, Math.PI * 2);
    ctx.fill();

    // Ombre
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.arc(x + 20, y + 20, radius * 0.9, 0, Math.PI * 2);
    ctx.fill();
}

function drawFloatingDebris(ctx, x, y, size, rotation, type) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.fillStyle = '#3d3d5c';
    ctx.strokeStyle = '#5d5d7c';
    ctx.lineWidth = 1;

    switch(type) {
        case 0: // Roche triangulaire
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(-size * 0.8, size * 0.6);
            ctx.lineTo(size * 0.7, size * 0.5);
            ctx.closePath();
            break;
        case 1: // Roche carrée
            ctx.beginPath();
            ctx.rect(-size/2, -size/2, size, size * 0.8);
            break;
        case 2: // Roche irrégulière
            ctx.beginPath();
            ctx.moveTo(-size * 0.3, -size);
            ctx.lineTo(size * 0.5, -size * 0.7);
            ctx.lineTo(size, size * 0.2);
            ctx.lineTo(size * 0.3, size);
            ctx.lineTo(-size * 0.8, size * 0.5);
            ctx.closePath();
            break;
    }

    ctx.fill();
    ctx.stroke();

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(-size * 0.2, -size * 0.3, size * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawEnergyVortex(ctx, x, y, vortexRings, time) {
    for (const ring of vortexRings) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time * ring.rotationSpeed);

        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.4;

        // Dessiner les particules du vortex
        for (let i = 0; i < ring.particles; i++) {
            const angle = (i / ring.particles) * Math.PI * 2;
            const particleX = Math.cos(angle) * ring.radius;
            const particleY = Math.sin(angle) * ring.radius * 0.3; // Ellipse

            ctx.beginPath();
            ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Arc du vortex
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.radius, ring.radius * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }
    ctx.globalAlpha = 1;
}

function drawLightningFlash(ctx, w, h, time) {
    ctx.globalAlpha = 0.3 + Math.random() * 0.3;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Éclair
    ctx.strokeStyle = '#a8d5ff';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00ffff';

    const startX = Math.random() * w;
    let currentX = startX;
    let currentY = 0;

    ctx.beginPath();
    ctx.moveTo(currentX, currentY);

    while (currentY < h * 0.7) {
        currentX += (Math.random() - 0.5) * 60;
        currentY += 20 + Math.random() * 30;
        ctx.lineTo(currentX, currentY);
    }

    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
}

function drawEnhancedLevelBackground(ctx, w, h, camX) {
    if (state.level === 1) {
        drawLevel1Background(ctx, w, h, camX);
    } else if (state.level === 2) {
        drawLevel2Background(ctx, w, h, camX);
    } else if (state.level === 3) {
        drawLevel3Background(ctx, w, h, camX);
    } else if (state.level === 4) {
        drawLevel4Background(ctx, w, h, camX);
    } else if (state.level === 5) {
        drawLevel5Background(ctx, w, h, camX);
    } else if (state.level === 6) {
        drawLevel6Background(ctx, w, h, camX);
    } else if (state.level === 7) {
        drawLevel7Background(ctx, w, h, camX);
    } else if (state.level === 8) {
        drawLevel8Background(ctx, w, h, camX);
    } else if (state.level === 9) {
        drawLevel9Background(ctx, w, h, camX);
    } else if (state.level === 10) {
        drawLevel10Background(ctx, w, h, camX);
    } else if (state.level === 11) {
        drawLevel11Background(ctx, w, h, camX);
    }
}

function drawEnhancedLevelForeground(ctx, w, h, camX) {
    if (state.level === 1) {
        drawLevel1Foreground(ctx, w, h, camX);
    } else if (state.level === 2) {
        drawLevel2Foreground(ctx, w, h, camX);
    } else if (state.level === 3) {
        drawLevel3Foreground(ctx, w, h, camX);
    } else if (state.level === 4) {
        drawLevel4Foreground(ctx, w, h, camX);
    } else if (state.level === 5) {
        drawLevel5Foreground(ctx, w, h, camX);
    } else if (state.level === 6) {
        drawLevel6Foreground(ctx, w, h, camX);
    } else if (state.level === 7) {
        drawLevel7Foreground(ctx, w, h, camX);
    } else if (state.level === 8) {
        drawLevel8Foreground(ctx, w, h, camX);
    } else if (state.level === 9) {
        drawLevel9Foreground(ctx, w, h, camX);
    } else if (state.level === 10) {
        drawLevel10Foreground(ctx, w, h, camX);
    } else if (state.level === 11) {
        drawLevel11Foreground(ctx, w, h, camX);
    }
}

// Mettre à jour les éléments visuels animés
function updateVisualElements() {
    // Level 1
    if (VisualCache.level1) {
        for (const cloud of VisualCache.level1.clouds) {
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width * 4) {
                cloud.x = -cloud.width;
            }
        }
    }

    // Level 2
    if (VisualCache.level2) {
        for (const cloud of VisualCache.level2.bgClouds) {
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width * 4) {
                cloud.x = -cloud.width;
            }
        }
    }

    // Level 4
    if (VisualCache.level4) {
        for (const cloud of VisualCache.level4.clouds) {
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width * 4) {
                cloud.x = -cloud.width;
            }
        }
    }

    // Level 5
    if (VisualCache.level5) {
        for (const cloud of VisualCache.level5.clouds) {
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width * 4) {
                cloud.x = -cloud.width;
            }
        }
    }

    // Level 7
    if (VisualCache.level7) {
        for (const cloud of VisualCache.level7.clouds) {
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width * 4) {
                cloud.x = -cloud.width;
            }
        }
    }

    // Level 8
    if (VisualCache.level8) {
        for (const cloud of VisualCache.level8.dreamClouds) {
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width * 4) {
                cloud.x = -cloud.width;
            }
        }
    }
}

// Reset le cache quand on change de niveau
function resetVisualCache() {
    VisualCache.level1 = null;
    VisualCache.level2 = null;
    VisualCache.level3 = null;
    VisualCache.level4 = null;
    VisualCache.level5 = null;
    VisualCache.level6 = null;
    VisualCache.level7 = null;
    VisualCache.level8 = null;
    VisualCache.level9 = null;
    VisualCache.level10 = null;
    VisualCache.level11 = null;
}

// ===== NIVEAU 10 : ZONE FINALE (CYBER-SPACE) =====
function initLevel10Visuals(w, h) {
    if (VisualCache.level10) return VisualCache.level10;

    const visuals = {
        gridLines: [],
        staticDebris: []
    };

    // Grille Cybernétique (Style Synthwave / Tron)
    // Lignes verticales
    for (let x = 0; x < w * 4; x += 150) {
        visuals.gridLines.push({ x: x, type: 'vertical' });
    }
    // Lignes horizontales (perspective)
    for (let i = 0; i < 15; i++) {
        // Espacement exponentiel pour effet de profondeur 3D
        visuals.gridLines.push({ y: h - (i * i * 3), type: 'horizontal' });
    }

    // Débris numériques flottants
    for (let i = 0; i < 30; i++) {
        visuals.staticDebris.push({
            x: Math.random() * w * 4,
            y: Math.random() * h,
            w: 5 + Math.random() * 20,
            h: 5 + Math.random() * 20,
            color: Math.random() > 0.5 ? '#00FFFF' : '#FF00FF', // Cyan et Magenta
            speed: 0.1 + Math.random() * 0.4,
            pulse: Math.random() * Math.PI * 2
        });
    }

    VisualCache.level10 = visuals;
    return visuals;
}

// ===== FONCTIONS DE DESSIN NIVEAU 10 (FINAL) =====
function drawLevel10Background(ctx, w, h, camX) {
    const visuals = initLevel10Visuals(w, h);

    // Fond Espace Profond
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#050010'); // Noir violet
    grad.addColorStop(0.5, '#100025');
    grad.addColorStop(1, '#250040'); // Violet profond bas
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Grille défilante (Parallax)
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 0, 255, 0.3)'; // Neon Rose
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FF00FF';

    // Lignes verticales qui défilent avec la caméra
    visuals.gridLines.filter((l) => l.type === 'vertical').forEach((l) => {
        const x = (l.x - camX * 0.2) % (w * 2);
        if (x > -10 && x < w + 10) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
    });

    // Lignes horizontales (fixes par rapport à l'écran pour l'effet sol infini)
    visuals.gridLines.filter((l) => l.type === 'horizontal').forEach((l) => {
        if (l.y > 0 && l.y < h) {
            ctx.beginPath();
            ctx.moveTo(0, l.y);
            ctx.lineTo(w, l.y);
            ctx.stroke();
        }
    });
    ctx.restore();

    // Débris numériques
    for (const d of visuals.staticDebris) {
        const x = (d.x - camX * 0.4) % (w * 2);
        if (x > -50 && x < w + 50) {
            const pulse = 0.5 + Math.sin(state.frameTick * 0.1 + d.pulse) * 0.5;
            ctx.fillStyle = d.color;
            ctx.globalAlpha = 0.4 * pulse;
            ctx.fillRect(x, d.y, d.w, d.h);
            ctx.globalAlpha = 1;
        }
    }
}

function drawLevel10Foreground(ctx, w, h, camX) {
    // Effet d'interférences / Glitch occasionnel pour l'ambiance finale
    if (Math.random() < 0.02) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.03)';
        ctx.fillRect(0, Math.random() * h, w, 5 + Math.random() * 20);
    }
}

// === PLATEFORMES NIVEAU 10 (NEON TECH) ===
function drawEnhancedSonicGround(ctx, p) {
    // Bloc noir avec grille néon bleue
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(p.x, p.y, p.w, p.h);

    // Bordure néon
    ctx.strokeStyle = '#00FFFF';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00FFFF';
    ctx.strokeRect(p.x, p.y, p.w, p.h);

    // Grille interne
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < p.w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(p.x + i, p.y);
        ctx.lineTo(p.x + i, p.y + p.h);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Bordure supérieure lumineuse solide
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(p.x, p.y, p.w, 3);
}

function drawEnhancedSonicPlatform(ctx, p) {
    // Plateforme flottante futuriste
    const pulse = Math.sin(state.frameTick * 0.1) * 0.5 + 0.5;

    ctx.fillStyle = 'rgba(0, 0, 50, 0.9)';
    ctx.fillRect(p.x, p.y, p.w, p.h);

    ctx.strokeStyle = `rgba(255, 0, 255, ${0.6 + pulse * 0.4})`;
    ctx.lineWidth = 3;
    ctx.strokeRect(p.x, p.y, p.w, p.h);

    // Coeur énergétique central
    ctx.fillStyle = `rgba(255, 0, 255, ${pulse})`;
    ctx.shadowColor = '#FF00FF';
    ctx.shadowBlur = 15;
    ctx.fillRect(p.x + 10, p.y + p.h / 2 - 3, p.w - 20, 6);
    ctx.shadowBlur = 0;
}

function drawEnhancedBossArena(ctx, p) {
    // Sol de l'arène finale
    const grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
    grad.addColorStop(0, '#200040');
    grad.addColorStop(1, '#050010');
    ctx.fillStyle = grad;
    ctx.fillRect(p.x, p.y, p.w, p.h);

    // Ligne de démarcation
    ctx.fillStyle = '#FF00FF';
    ctx.fillRect(p.x, p.y, p.w, 4);

    // Motifs hexagonaux (simulés)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    for (let i = 0; i < p.w; i += 60) {
        ctx.strokeRect(p.x + i, p.y, 60, p.h);
    }
}

function drawEnhancedBossPlatform(ctx, p) {
    // Plateforme de boss (rouge danger)
    ctx.fillStyle = '#330000';
    ctx.fillRect(p.x, p.y, p.w, p.h);

    // Bordure rouge clignotante
    const flash = Math.floor(state.frameTick / 15) % 2 === 0;
    ctx.strokeStyle = flash ? '#FF0000' : '#880000';
    ctx.lineWidth = 3;
    ctx.strokeRect(p.x, p.y, p.w, p.h);

    // Bandes d'avertissement
    ctx.fillStyle = '#FF0000';
    for (let i = 0; i < p.w; i += 20) {
        ctx.fillRect(p.x + i, p.y + p.h - 8, 10, 8);
    }
}

// === BOSS FINAL : THE IRON OVERLORD ===
function drawEnhancedBoss(ctx, boss) {
    const time = state.frameTick;
    // Flottement menaçant
    const hover = Math.sin(time * 0.05) * 10;
    const x = boss.x + boss.w / 2;
    const y = boss.y + boss.h / 2 + hover;
    const dir = boss.dir || -1;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(dir, 1); // Pour regarder dans la bonne direction

    // Aura de puissance (Change selon la phase/PV)
    const isAngry = boss.phase >= 2;
    const isFurious = boss.phase === 3;

    const pulse = 1.2 + Math.sin(time * 0.2) * 0.1;
    let auraColor = 'rgba(100, 0, 255, 0.2)'; // Phase 1: Violet
    if (isAngry) auraColor = 'rgba(255, 200, 0, 0.3)'; // Phase 2: Jaune
    if (isFurious) auraColor = 'rgba(255, 0, 0, 0.5)'; // Phase 3: Rouge

    ctx.fillStyle = auraColor;
    ctx.beginPath();
    ctx.arc(0, 0, 75 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // -- CHÂSSIS DU ROBOT --

    // Réacteur bas
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.moveTo(-30, 30);
    ctx.lineTo(30, 30);
    ctx.lineTo(15, 70);
    ctx.lineTo(-15, 70);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Flamme du réacteur
    ctx.fillStyle = isFurious ? '#FF0000' : '#00FFFF';
    ctx.beginPath();
    ctx.moveTo(-10, 70);
    ctx.lineTo(10, 70);
    ctx.lineTo(0, 70 + 30 + Math.random() * 20);
    ctx.fill();

    // Epaules blindées
    ctx.fillStyle = '#444';
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-50, -20);
    ctx.lineTo(-85, -45);
    ctx.lineTo(-85, 10);
    ctx.lineTo(-45, 25);
    ctx.fill();
    ctx.stroke(); // G
    ctx.beginPath();
    ctx.moveTo(50, -20);
    ctx.lineTo(85, -45);
    ctx.lineTo(85, 10);
    ctx.lineTo(45, 25);
    ctx.fill();
    ctx.stroke(); // D

    // Cockpit sphérique
    const cockpitGrad = ctx.createLinearGradient(-30, -30, 30, 30);
    cockpitGrad.addColorStop(0, '#88CCFF');
    cockpitGrad.addColorStop(1, '#004488');
    ctx.fillStyle = cockpitGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.fill();

    // Reflet vitre
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 40, 3.5, 5);
    ctx.stroke();

    // -- PILOTE (SILHOUETTE) --
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(0, 5, 18, Math.PI, 0);
    ctx.fill(); // Corps
    ctx.beginPath();
    ctx.arc(0, -5, 12, 0, Math.PI * 2);
    ctx.fill(); // Tête
    // Yeux rouges brillants du pilote
    ctx.fillStyle = '#F00';
    ctx.fillRect(-5, -8, 4, 3);
    ctx.fillRect(3, -8, 4, 3);

    // Canons latéraux
    ctx.fillStyle = '#666';
    const recoil = boss.attackTimer % 100 < 10 ? -10 : 0; // Recul quand il tire
    ctx.fillRect(45 + recoil, 5, 40, 15); // Canon D

    ctx.restore();

    // -- BARRE DE VIE DU BOSS (Flottante au-dessus) --
    const hpW = 120;
    const hpX = x - hpW / 2;
    const hpY = y - 90;

    // Cadre
    ctx.fillStyle = '#000';
    ctx.fillRect(hpX - 4, hpY - 4, hpW + 8, 18);
    // Fond rouge (dégâts)
    ctx.fillStyle = '#550000';
    ctx.fillRect(hpX, hpY, hpW, 10);
    // Barre de vie actuelle
    const hpPercent = Math.max(0, boss.hp / boss.maxHp);
    const hpColor = hpPercent > 0.5 ? '#00FF00' : hpPercent > 0.2 ? '#FFFF00' : '#FF0000';
    ctx.fillStyle = hpColor;
    ctx.fillRect(hpX, hpY, hpW * hpPercent, 10);

    // Texte
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('IRON OVERLORD', x, hpY - 8);
    ctx.textAlign = 'left';
}

// =================================================================
// VISUELS NIVEAU 11 : LA DIMENSION GLITCH
// =================================================================

// Initialisation des éléments de fond abstraits
function initLevel11Visuals(w, h) {
    if (VisualCache.level11) return VisualCache.level11;

    const visuals = {
        // Cubes de données flottants
        dataCubes: [],
        // Lignes d'énergie verticales
        energyLines: []
    };

    // Génération des cubes
    for (let i = 0; i < 40; i++) {
        visuals.dataCubes.push({
            x: Math.random() * w * 2,
            y: Math.random() * h * 2,
            size: 10 + Math.random() * 40,
            speedZ: 0.2 + Math.random() * 0.5, // Vitesse de "profondeur"
            color: Math.random() > 0.5 ? '#00FFFF' : '#FF00FF', // Cyan ou Magenta
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02
        });
    }

    // Génération des lignes
    for (let i = 0; i < 20; i++) {
        visuals.energyLines.push({
            x: Math.random() * w * 2,
            width: 1 + Math.random() * 3,
            speed: 2 + Math.random() * 5,
            opacity: 0.1 + Math.random() * 0.3
        });
    }

    VisualCache.level11 = visuals;
    return visuals;
}

// Dessin de l'arrière-plan
function drawLevel11Background(ctx, w, h, camX) {
    const visuals = initLevel11Visuals(w, h);
    const time = state.frameTick;

    // 1. Fond dégradé profond (Espace Cyber)
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#050015'); // Noir bleuté en haut
    grad.addColorStop(0.5, '#100030'); // Violet profond au milieu
    grad.addColorStop(1, '#000520'); // Bleu nuit en bas
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    // Effet de parallaxe sur les éléments
    ctx.translate(camX * 0.5, 0);

    // 2. Dessin des lignes d'énergie montantes
    for (const line of visuals.energyLines) {
        const yOffset = (time * line.speed) % (h * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${line.opacity})`;
        ctx.fillRect(line.x, h - yOffset, line.width, h);
        ctx.fillRect(line.x, h * 2 - yOffset, line.width, h); // Boucle
    }

    // 3. Dessin des cubes de données
    for (const cube of visuals.dataCubes) {
        ctx.save();
        // Mouvement complexe pour effet de flottement 3D
        const x = (cube.x + camX * cube.speedZ * 0.1) % (w * 2.5) - 200;
        const y = cube.y + Math.sin(time * 0.01 + cube.x) * 30;
        
        ctx.translate(x, y);
        ctx.rotate(cube.rotation + time * cube.rotSpeed);
        
        // Style "fil de fer" néon
        ctx.strokeStyle = cube.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        ctx.strokeRect(-cube.size / 2, -cube.size / 2, cube.size, cube.size);
        
        // Cœur lumineux
        ctx.fillStyle = cube.color;
        ctx.globalAlpha = 0.2;
        ctx.fillRect(-cube.size / 4, -cube.size / 4, cube.size / 2, cube.size / 2);
        
        ctx.restore();
    }
    ctx.restore();
}

// Dessin du premier plan (Overlay Glitch)
function drawLevel11Foreground(ctx, w, h, camX) {
    // Effet de "scanline" subtil qui descend
    const scanY = (state.frameTick * 2) % h;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(0, scanY, w, 5);

    // Effet de glitch aléatoire très bref
    if (Math.random() < 0.01) {
        const glitchH = Math.random() * 50;
        const glitchY = Math.random() * h;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 0, 255, 0.1)';
        ctx.fillRect(0, glitchY, w, glitchH);
        // Léger décalage chromatique
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.translate(5, 0);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.05)';
        ctx.fillRect(0, glitchY, w, glitchH);
        ctx.restore();
    }
}

// --- RENDU DES PLATEFORMES NIVEAU 11 ---

// Helper : dessine la base néon d'une plateforme glitch
function drawGlitchBase(ctx, p, colorMain, colorAccent) {
    const time = state.frameTick;
    
    // Fond semi-transparent tech
    ctx.fillStyle = `${colorMain}44`; // Hex avec alpha
    ctx.fillRect(p.x, p.y, p.w, p.h);
    
    // Bordure néon pulsante
    const pulse = Math.sin(time * 0.1) * 0.2 + 0.8;
    ctx.lineWidth = 3;
    ctx.strokeStyle = colorAccent;
    ctx.shadowColor = colorAccent;
    ctx.shadowBlur = 10 * pulse;
    ctx.strokeRect(p.x, p.y, p.w, p.h);
    
    // Motifs de circuits internes qui défilent
    ctx.save();
    ctx.beginPath();
    ctx.rect(p.x, p.y, p.w, p.h);
    ctx.clip();
    
    ctx.strokeStyle = `${colorMain}88`;
    ctx.lineWidth = 1;
    const patternOffset = (time * 2) % 40;
    for (let i = -40; i < p.w + p.h; i += 20) {
        ctx.beginPath();
        ctx.moveTo(p.x + i - patternOffset, p.y);
        ctx.lineTo(p.x + i - patternOffset - p.h, p.y + p.h);
        ctx.stroke();
    }
    ctx.restore();
    ctx.shadowBlur = 0;
}

// 1. Plateforme Normale/Mouvante (Cyan/Bleu)
function drawGlitchPlatformNormal(ctx, p) {
    drawGlitchBase(ctx, p, '#0088FF', '#00FFFF');
    // Ligne supérieure solide
    ctx.fillStyle = '#00FFFF';
    ctx.fillRect(p.x, p.y, p.w, 3);
}

// 2. Plateforme de Glace (Blanc/Bleu givré)
function drawGlitchPlatformIce(ctx, p) {
    drawGlitchBase(ctx, p, '#AACCFF', '#FFFFFF');
    
    // Effet de surface givrée brillante
    const shinePos = (state.frameTick * 4) % (p.w * 2) - p.w;
    const grad = ctx.createLinearGradient(p.x + shinePos, p.y, p.x + shinePos + 40, p.y + p.h);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.8)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = grad;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    
    // Bord supérieur givré
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(p.x, p.y, p.w, 3);
}

// 3. Tremplin (Jump Pad) (Magenta/Rose pulsant)
function drawGlitchPlatformJump(ctx, p) {
    const time = state.frameTick;
    // Pulsation rapide pour indiquer l'énergie
    const bouncePulse = Math.sin(time * 0.3) * 0.5 + 0.5;
    
    drawGlitchBase(ctx, p, '#FF0088', '#FF55FF');
    
    // Indicateur de saut sur le dessus (flèches ou ondes)
    ctx.fillStyle = `rgba(255, 100, 255, ${0.5 + bouncePulse * 0.5})`;
    
    const centerX = p.x + p.w / 2;
    const centerY = p.y + p.h / 2;
    
    // Dessin de chevrons vers le haut ^^^
    for (let i = 0; i < 3; i++) {
        const yOff = i * 5 - (time % 15); // Animation vers le haut
        const alpha = 1 - (i * 0.3) - ((time % 15) / 15);
        if (alpha > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(centerX - 10, centerY + yOff);
            ctx.lineTo(centerX, centerY - 10 + yOff);
            ctx.lineTo(centerX + 10, centerY + yOff);
            ctx.fill();
        }
    }
    
    // Surface de saut très lumineuse
    ctx.shadowColor = '#FF55FF';
    ctx.shadowBlur = 20 * bouncePulse;
    ctx.fillStyle = '#FFBBFF';
    ctx.fillRect(p.x, p.y, p.w, 5);
    ctx.shadowBlur = 0;
}

// Export des fonctions
window.drawEnhancedLevelBackground = drawEnhancedLevelBackground;
window.drawEnhancedLevelForeground = drawEnhancedLevelForeground;
window.drawEnhancedZombie = drawEnhancedZombie;
window.drawEnhancedChestMonster = drawEnhancedChestMonster;
window.drawMinecraftSkeleton = drawMinecraftSkeleton; // Export squelette Minecraft
window.drawEnhancedSkeleton = drawEnhancedSkeleton;
window.drawEnhancedGrassPlatform = drawEnhancedGrassPlatform;
window.drawEnhancedStonePlatform = drawEnhancedStonePlatform;
window.drawEnhancedMushroomPlatform = drawEnhancedMushroomPlatform;
window.drawEnhancedMovingPlatform = drawEnhancedMovingPlatform;
window.drawEnhancedKnight = drawEnhancedKnight;
window.drawEnhancedShyGuy = drawEnhancedShyGuy;
window.drawEnhancedSphinx = drawEnhancedSphinx;
window.drawEnhancedSonicGround = drawEnhancedSonicGround;
window.drawEnhancedSonicPlatform = drawEnhancedSonicPlatform;
window.drawEnhancedBossArena = drawEnhancedBossArena;
window.drawEnhancedBossPlatform = drawEnhancedBossPlatform;
window.drawEnhancedBoss = drawEnhancedBoss;
window.updateVisualElements = updateVisualElements;
window.resetVisualCache = resetVisualCache;
window.drawGlitchPlatformNormal = drawGlitchPlatformNormal;
window.drawGlitchPlatformIce = drawGlitchPlatformIce;
window.drawGlitchPlatformJump = drawGlitchPlatformJump;
