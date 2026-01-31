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

// ===== NIVEAU 3 : LE DONJON MAUDIT =====
function initLevel3Visuals(w, h) {
    if (VisualCache.level3) return VisualCache.level3;

    const visuals = {
        arches: [],
        torches: [],
        chains: [],
        fogBands: [],
        embers: [],
        stainedWindows: []
    };

    // Grandes arches gothiques en arrière-plan
    for (let i = 0; i < 8; i++) {
        visuals.arches.push({
            x: i * 320 + Math.random() * 120,
            y: h * 0.25 + Math.random() * 40,
            width: 160 + Math.random() * 60,
            height: 220 + Math.random() * 60,
            depth: 0.15 + Math.random() * 0.2
        });
    }

    // Fenêtres colorées avec lueur
    for (let i = 0; i < 6; i++) {
        visuals.stainedWindows.push({
            x: i * 420 + 120,
            y: h * 0.18 + Math.random() * 40,
            width: 60 + Math.random() * 20,
            height: 120 + Math.random() * 30,
            hue: 200 + Math.random() * 80,
            glowOffset: Math.random() * Math.PI * 2
        });
    }

    // Torches murales
    for (let i = 0; i < 10; i++) {
        visuals.torches.push({
            x: i * 240 + 80,
            y: h * 0.45 + Math.random() * 120,
            flicker: Math.random() * Math.PI * 2
        });
    }

    // Chaînes suspendues
    for (let i = 0; i < 6; i++) {
        visuals.chains.push({
            x: i * 360 + 200,
            y: 40 + Math.random() * 60,
            length: 120 + Math.random() * 120,
            swayOffset: Math.random() * Math.PI * 2
        });
    }

    // Brumes basses
    for (let i = 0; i < 6; i++) {
        visuals.fogBands.push({
            x: Math.random() * w * 3,
            y: h * 0.65 + i * 18,
            width: 260 + Math.random() * 160,
            speed: 0.08 + Math.random() * 0.08,
            opacity: 0.15 + Math.random() * 0.15
        });
    }

    // Braises flottantes
    for (let i = 0; i < 18; i++) {
        visuals.embers.push({
            x: Math.random() * w * 3,
            y: h * 0.4 + Math.random() * h * 0.5,
            size: 2 + Math.random() * 3,
            speed: 0.2 + Math.random() * 0.4,
            drift: Math.random() * 0.6 - 0.3
        });
    }

    VisualCache.level3 = visuals;
    return visuals;
}

// ===== NIVEAU 4 : MONDE CHAMPIGNON =====
function initLevel4Visuals(w, h) {
    if (VisualCache.level4) return VisualCache.level4;

    const visuals = {
        hills: [],
        mushrooms: [],
        skyClouds: [],
        fireflies: [],
        caveCrystals: [],
        caveFog: [],
        caveStalactites: []
    };

    // Collines arrondies
    for (let i = 0; i < 6; i++) {
        visuals.hills.push({
            x: i * 420 + Math.random() * 120,
            y: h * 0.55 + Math.random() * 40,
            width: 260 + Math.random() * 100,
            height: 120 + Math.random() * 60,
            shade: i % 2 === 0 ? '#6bc96b' : '#4fbf7a'
        });
    }

    // Champignons géants décoratifs
    for (let i = 0; i < 10; i++) {
        visuals.mushrooms.push({
            x: i * 260 + 140,
            y: h * 0.62 + Math.random() * 40,
            capRadius: 50 + Math.random() * 30,
            stemHeight: 80 + Math.random() * 40,
            capColor: ['#ff5f6d', '#ffa95f', '#ffcc4d', '#ff6be6'][Math.floor(Math.random() * 4)],
            spotColor: 'rgba(255,255,255,0.9)'
        });
    }

    // Nuages moelleux
    for (let i = 0; i < 12; i++) {
        visuals.skyClouds.push({
            x: Math.random() * w * 3,
            y: 40 + Math.random() * 180,
            width: 120 + Math.random() * 120,
            height: 40 + Math.random() * 40,
            speed: 0.15 + Math.random() * 0.2,
            opacity: 0.6 + Math.random() * 0.2
        });
    }

    // Lucioles pour ambiance féerique
    for (let i = 0; i < 20; i++) {
        visuals.fireflies.push({
            x: Math.random() * w * 3,
            y: h * 0.35 + Math.random() * h * 0.4,
            pulse: Math.random() * Math.PI * 2,
            speed: 0.2 + Math.random() * 0.2
        });
    }

    // Décor souterrain : cristaux et brume
    for (let i = 0; i < 10; i++) {
        visuals.caveCrystals.push({
            x: i * 240 + 100,
            y: h * 0.65 + Math.random() * 60,
            size: 30 + Math.random() * 30,
            hue: 190 + Math.random() * 80
        });
    }

    for (let i = 0; i < 6; i++) {
        visuals.caveFog.push({
            x: Math.random() * w * 3,
            y: h * 0.7 + i * 20,
            width: 280 + Math.random() * 140,
            speed: 0.1 + Math.random() * 0.1,
            opacity: 0.18 + Math.random() * 0.12
        });
    }

    for (let i = 0; i < 12; i++) {
        visuals.caveStalactites.push({
            x: i * 220 + 60,
            y: 0,
            height: 80 + Math.random() * 120,
            width: 40 + Math.random() * 20
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

// ===== FONCTIONS DE DESSIN NIVEAU 3 =====

function drawLevel3Background(ctx, w, h, camX) {
    const visuals = initLevel3Visuals(w, h);

    // Fond dégradé nocturne
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, '#0b0b1c');
    gradient.addColorStop(0.5, '#17172f');
    gradient.addColorStop(1, '#241732');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Brume lointaine
    for (const fog of visuals.fogBands) {
        ctx.fillStyle = `rgba(110, 120, 160, ${fog.opacity})`;
        ctx.beginPath();
        ctx.ellipse(fog.x - camX * 0.2, fog.y, fog.width, 18, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Arches en pierre
    for (const arch of visuals.arches) {
        const archX = arch.x - camX * arch.depth;
        ctx.fillStyle = '#2b2b3f';
        ctx.beginPath();
        ctx.roundRect(archX, arch.y, arch.width, arch.height, 30);
        ctx.fill();
        ctx.clearRect(archX + 18, arch.y + 24, arch.width - 36, arch.height - 40);

        ctx.fillStyle = 'rgba(20, 20, 40, 0.6)';
        ctx.fillRect(archX + 18, arch.y + 24, arch.width - 36, arch.height - 40);
    }

    // Vitraux luisants
    for (const win of visuals.stainedWindows) {
        const glow = 0.4 + Math.sin(state.frameTick * 0.05 + win.glowOffset) * 0.2;
        const x = win.x - camX * 0.25;
        ctx.fillStyle = `hsla(${win.hue}, 80%, 70%, ${0.35 + glow})`;
        ctx.beginPath();
        ctx.roundRect(x, win.y, win.width, win.height, 20);
        ctx.fill();
        ctx.strokeStyle = `hsla(${win.hue}, 80%, 85%, ${0.4 + glow})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function drawLevel3Foreground(ctx, w, h, camX) {
    const visuals = initLevel3Visuals(w, h);

    // Chaînes
    ctx.strokeStyle = 'rgba(180, 180, 200, 0.6)';
    ctx.lineWidth = 3;
    for (const chain of visuals.chains) {
        const sway = Math.sin(state.frameTick * 0.02 + chain.swayOffset) * 4;
        ctx.beginPath();
        ctx.moveTo(chain.x - camX * 0.4, chain.y);
        ctx.lineTo(chain.x - camX * 0.4 + sway, chain.y + chain.length);
        ctx.stroke();
    }

    // Torches et lueur chaude
    for (const torch of visuals.torches) {
        const flicker = 0.6 + Math.sin(state.frameTick * 0.2 + torch.flicker) * 0.3;
        const x = torch.x - camX * 0.35;
        const y = torch.y;
        ctx.fillStyle = '#3e2a20';
        ctx.fillRect(x - 6, y + 15, 12, 30);
        ctx.fillStyle = '#ffb347';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + 12, y + 10, x, y + 20);
        ctx.quadraticCurveTo(x - 12, y + 10, x, y);
        ctx.fill();
        ctx.fillStyle = `rgba(255, 150, 80, ${0.25 * flicker})`;
        ctx.beginPath();
        ctx.arc(x, y + 10, 40 * flicker, 0, Math.PI * 2);
        ctx.fill();
    }

    // Braises
    for (const ember of visuals.embers) {
        const emberX = ember.x - camX * 0.3;
        ctx.fillStyle = 'rgba(255, 140, 80, 0.7)';
        ctx.beginPath();
        ctx.arc(emberX, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ===== FONCTIONS DE DESSIN NIVEAU 4 =====

function drawLevel4Background(ctx, w, h, camX) {
    const visuals = initLevel4Visuals(w, h);

    if (state.inSubLevel) {
        const caveGradient = ctx.createLinearGradient(0, 0, 0, h);
        caveGradient.addColorStop(0, '#0f1f2f');
        caveGradient.addColorStop(0.5, '#162635');
        caveGradient.addColorStop(1, '#1f2f3d');
        ctx.fillStyle = caveGradient;
        ctx.fillRect(0, 0, w, h);

        // Stalactites
        ctx.fillStyle = '#2b3b4b';
        for (const stal of visuals.caveStalactites) {
            const x = stal.x - camX * 0.25;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + stal.width / 2, stal.height);
            ctx.lineTo(x + stal.width, 0);
            ctx.closePath();
            ctx.fill();
        }

        // Cristaux lumineux
        for (const crystal of visuals.caveCrystals) {
            const glow = 0.4 + Math.sin(state.frameTick * 0.06 + crystal.x) * 0.3;
            const x = crystal.x - camX * 0.35;
            ctx.fillStyle = `hsla(${crystal.hue}, 70%, 60%, ${0.5 + glow})`;
            ctx.beginPath();
            ctx.moveTo(x, crystal.y);
            ctx.lineTo(x + crystal.size / 2, crystal.y - crystal.size);
            ctx.lineTo(x + crystal.size, crystal.y);
            ctx.closePath();
            ctx.fill();
        }

        // Brume souterraine
        for (const fog of visuals.caveFog) {
            ctx.fillStyle = `rgba(120, 140, 160, ${fog.opacity})`;
            ctx.beginPath();
            ctx.ellipse(fog.x - camX * 0.15, fog.y, fog.width, 18, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        return;
    }

    // Monde extérieur lumineux
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#7fd2ff');
    skyGradient.addColorStop(0.6, '#8be2ff');
    skyGradient.addColorStop(1, '#b7f4ff');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Collines
    for (const hill of visuals.hills) {
        const x = hill.x - camX * 0.2;
        ctx.fillStyle = hill.shade;
        ctx.beginPath();
        ctx.ellipse(x, hill.y, hill.width, hill.height, 0, Math.PI, Math.PI * 2);
        ctx.fill();
    }

    // Nuages doux
    for (const cloud of visuals.skyClouds) {
        ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
        ctx.beginPath();
        ctx.roundRect(cloud.x - camX * 0.3, cloud.y, cloud.width, cloud.height, 30);
        ctx.fill();
    }
}

function drawLevel4Foreground(ctx, w, h, camX) {
    const visuals = initLevel4Visuals(w, h);

    if (state.inSubLevel) {
        // Lueurs de cristaux en avant-plan
        for (const crystal of visuals.caveCrystals) {
            const glow = 0.2 + Math.sin(state.frameTick * 0.06 + crystal.x) * 0.2;
            ctx.fillStyle = `hsla(${crystal.hue}, 80%, 80%, ${0.2 + glow})`;
            ctx.beginPath();
            ctx.arc(crystal.x - camX * 0.3, crystal.y - 20, crystal.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
        }
        return;
    }

    // Champignons géants en premier plan
    for (const mush of visuals.mushrooms) {
        const x = mush.x - camX * 0.4;
        const stemY = mush.y;
        ctx.fillStyle = '#f5e7d0';
        ctx.fillRect(x - 12, stemY, 24, mush.stemHeight);
        ctx.fillStyle = mush.capColor;
        ctx.beginPath();
        ctx.ellipse(x, stemY, mush.capRadius, mush.capRadius * 0.6, 0, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = mush.spotColor;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(x - mush.capRadius / 2 + i * (mush.capRadius / 2), stemY - 10, 6, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Lucioles scintillantes
    for (const fly of visuals.fireflies) {
        const pulse = 0.4 + Math.sin(state.frameTick * 0.08 + fly.pulse) * 0.4;
        ctx.fillStyle = `rgba(255, 255, 180, ${pulse})`;
        ctx.beginPath();
        ctx.arc(fly.x - camX * 0.25, fly.y, 3 + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
    }
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

function drawEnhancedSkeleton(ctx, e) {
    const bob = Math.sin(state.frameTick * 0.08 + e.x) * 2;
    const glow = 0.5 + Math.sin(state.frameTick * 0.2 + e.y) * 0.3;

    // Aura froide
    ctx.fillStyle = `rgba(120, 180, 255, ${0.15 + glow * 0.2})`;
    ctx.beginPath();
    ctx.ellipse(e.x + e.w / 2, e.y + e.h / 2 + bob, e.w / 1.5, e.h / 1.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Corps osseux avec dégradé
    const boneGradient = ctx.createLinearGradient(e.x, e.y, e.x, e.y + e.h);
    boneGradient.addColorStop(0, '#f5f5f5');
    boneGradient.addColorStop(1, '#d8d8d8');
    ctx.fillStyle = boneGradient;
    ctx.fillRect(e.x + e.w / 2 - 9, e.y + 18 + bob, 18, e.h - 24);

    // Cage thoracique
    ctx.strokeStyle = '#c2c2c2';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(e.x + e.w / 2 - 10, e.y + 28 + i * 10 + bob);
        ctx.lineTo(e.x + e.w / 2 + 10, e.y + 28 + i * 10 + bob);
        ctx.stroke();
    }

    // Tête
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(e.x + e.w / 2 - 14, e.y + bob, 28, 22);
    ctx.strokeStyle = '#b0b0b0';
    ctx.strokeRect(e.x + e.w / 2 - 14, e.y + bob, 28, 22);

    // Yeux luminescents
    ctx.fillStyle = `rgba(120, 200, 255, ${0.7 + glow * 0.2})`;
    ctx.fillRect(e.x + e.w / 2 - 8, e.y + 6 + bob, 5, 6);
    ctx.fillRect(e.x + e.w / 2 + 3, e.y + 6 + bob, 5, 6);

    // Bras
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(e.x + 4, e.y + 22 + bob, 8, 22);
    ctx.fillRect(e.x + e.w - 12, e.y + 22 + bob, 8, 22);

    // Arc stylisé
    const bowDir = e.dir || 1;
    const bowX = bowDir > 0 ? e.x + e.w + 10 : e.x - 10;
    ctx.strokeStyle = '#b2743b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (bowDir > 0) {
        ctx.arc(bowX, e.y + 30 + bob, 16, -Math.PI / 2.4, Math.PI / 2.4);
    } else {
        ctx.arc(bowX, e.y + 30 + bob, 16, Math.PI - Math.PI / 2.4, Math.PI + Math.PI / 2.4);
    }
    ctx.stroke();

    ctx.strokeStyle = '#e6e6e6';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const cordX = bowDir > 0 ? bowX - 12 : bowX + 12;
    ctx.moveTo(cordX, e.y + 18 + bob);
    ctx.lineTo(cordX, e.y + 42 + bob);
    ctx.stroke();

    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const arrowStartX = e.x + e.w / 2;
    const arrowEndX = bowDir > 0 ? bowX + 18 : bowX - 18;
    ctx.moveTo(arrowStartX, e.y + 30 + bob);
    ctx.lineTo(arrowEndX, e.y + 30 + bob);
    ctx.stroke();

    ctx.fillStyle = '#555';
    ctx.beginPath();
    if (bowDir > 0) {
        ctx.moveTo(arrowEndX + 8, e.y + 30 + bob);
        ctx.lineTo(arrowEndX, e.y + 26 + bob);
        ctx.lineTo(arrowEndX, e.y + 34 + bob);
    } else {
        ctx.moveTo(arrowEndX - 8, e.y + 30 + bob);
        ctx.lineTo(arrowEndX, e.y + 26 + bob);
        ctx.lineTo(arrowEndX, e.y + 34 + bob);
    }
    ctx.closePath();
    ctx.fill();
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

// ===== FONCTION PRINCIPALE D'INTÉGRATION =====

function drawEnhancedLevelBackground(ctx, w, h, camX) {
    if (state.level === 1) {
        drawLevel1Background(ctx, w, h, camX);
    } else if (state.level === 2) {
        drawLevel2Background(ctx, w, h, camX);
    } else if (state.level === 3) {
        drawLevel3Background(ctx, w, h, camX);
    } else if (state.level === 4) {
        drawLevel4Background(ctx, w, h, camX);
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
    }
}

// Mettre à jour les nuages
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

    if (VisualCache.level3) {
        for (const fog of VisualCache.level3.fogBands) {
            fog.x += fog.speed;
            if (fog.x > canvas.width * 4) {
                fog.x = -fog.width;
            }
        }

        for (const ember of VisualCache.level3.embers) {
            ember.y -= ember.speed;
            ember.x += ember.drift;
            if (ember.y < 0) {
                ember.y = canvas.height + 40;
                ember.x = Math.random() * canvas.width * 3;
            }
        }
    }

    if (VisualCache.level4) {
        for (const cloud of VisualCache.level4.skyClouds) {
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width * 4) {
                cloud.x = -cloud.width;
            }
        }

        for (const fly of VisualCache.level4.fireflies) {
            fly.x += fly.speed;
            if (fly.x > canvas.width * 4) {
                fly.x = -20;
            }
        }

        for (const fog of VisualCache.level4.caveFog) {
            fog.x += fog.speed;
            if (fog.x > canvas.width * 4) {
                fog.x = -fog.width;
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
}

// Export des fonctions
window.drawEnhancedLevelBackground = drawEnhancedLevelBackground;
window.drawEnhancedLevelForeground = drawEnhancedLevelForeground;
window.drawEnhancedZombie = drawEnhancedZombie;
window.drawEnhancedChestMonster = drawEnhancedChestMonster;
window.drawEnhancedSkeleton = drawEnhancedSkeleton;
window.drawEnhancedGrassPlatform = drawEnhancedGrassPlatform;
window.drawEnhancedMovingPlatform = drawEnhancedMovingPlatform;
window.updateVisualElements = updateVisualElements;
window.resetVisualCache = resetVisualCache;
