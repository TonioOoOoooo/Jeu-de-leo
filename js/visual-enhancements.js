// ============================================================
// L'AVENTURE DE LÉO - AMÉLIORATIONS VISUELLES v2.0
// Design par un Game Artist professionnel
// ============================================================

// ===== SYSTÈME DE DÉCORS DYNAMIQUES =====

// Cache pour les éléments de décor générés
const VisualCache = {
    level1: null,
    level2: null,
    level7: null,
    level8: null,
    level9: null,
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
        pillars: [],
        torches: [],
        chains: [],
        windows: [],
        dust: []
    };

    // Piliers de cathédrale (structure rythmée au lieu d'aléatoire)
    const spacing = 400;
    for (let i = -1; i < 20; i++) {
        visuals.pillars.push({
            x: i * spacing,
            width: 60,
            type: i % 2 === 0 ? 'major' : 'minor' // Alternance gros/petits piliers
        });
    }

    // Vitraux (en arrière-plan profond)
    for (let i = 0; i < 10; i++) {
        visuals.windows.push({
            x: i * spacing * 2 + 200,
            y: h * 0.2,
            w: 80,
            h: 180,
            color: i % 2 === 0 ? '#3498db' : '#9b59b6' // Bleu et Violet mystique
        });
    }

    // Torches (alignées sur les piliers)
    for (let i = 0; i < 20; i += 2) {
        visuals.torches.push({
            x: i * spacing + 30, // Sur le pilier
            y: h * 0.4,
            flicker: Math.random() * Math.PI * 2
        });
    }

    // Chaînes décoratives en haut
    for (let i = 0; i < 10; i++) {
        visuals.chains.push({
            x: i * 500 + 100,
            y: 0,
            length: 100 + Math.random() * 150,
            swayOffset: Math.random() * Math.PI * 2
        });
    }

    // Poussière flottante (atmosphère)
    for (let i = 0; i < 50; i++) {
        visuals.dust.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2,
            speed: 0.2 + Math.random() * 0.3
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
        bgMushrooms: [], // Champignons géants de fond
        skyClouds: [],
        fireflies: [],
        particles: []
    };

    // Collines (Parallax layers)
    // Layer lointain
    for (let i = 0; i < 8; i++) {
        visuals.hills.push({
            x: i * 300,
            y: h * 0.6,
            w: 400 + Math.random() * 200,
            h: 300,
            color: '#2d3436', // Sombre pour le contraste
            layer: 0.2
        });
    }
    // Layer proche
    for (let i = 0; i < 8; i++) {
        visuals.hills.push({
            x: i * 400 - 100,
            y: h * 0.7,
            w: 500,
            h: 200,
            color: '#1e3799', // Bleu nuit saturé
            layer: 0.5
        });
    }

    // Champignons géants en arrière plan (silhouettes)
    for (let i = 0; i < 15; i++) {
        visuals.bgMushrooms.push({
            x: i * 300 + Math.random() * 150,
            y: h * 0.8,
            scale: 0.5 + Math.random() * 1.5,
            type: Math.floor(Math.random() * 3),
            parallax: 0.3 + Math.random() * 0.2
        });
    }

    // Lucioles / Particules magiques
    for (let i = 0; i < 40; i++) {
        visuals.fireflies.push({
            x: Math.random() * w,
            y: Math.random() * h,
            pulse: Math.random() * Math.PI * 2,
            size: 2 + Math.random() * 3,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: Math.random() > 0.5 ? '#55efc4' : '#fd79a8' // Cyan et Rose
        });
    }

    VisualCache.level4 = visuals;
    return visuals;
}

// ===== NIVEAU 5 : MINECRAFT =====
function initLevel5Visuals(w, h) {
    if (VisualCache.level5) return VisualCache.level5;

    const visuals = {
        clouds: [],
        bgParticles: [] // Cendres pour le Nether
    };

    // Nuages cubiques
    for (let i = 0; i < 8; i++) {
        visuals.clouds.push({
            x: Math.random() * w * 3,
            y: 50 + Math.random() * 100,
            w: 100 + Math.random() * 100,
            h: 30 + Math.random() * 20,
            speed: 0.1 + Math.random() * 0.1
        });
    }

    // Particules de cendres (Nether)
    for (let i = 0; i < 50; i++) {
        visuals.bgParticles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 4 + 1,
            speedY: -0.5 - Math.random() * 1,
            color: Math.random() > 0.5 ? '#800000' : '#550000'
        });
    }

    VisualCache.level5 = visuals;
    return visuals;
}

// ===== NIVEAU 6 : PORTAL LABS =====
function initLevel6Visuals(w, h) {
    if (VisualCache.level6) return VisualCache.level6;

    const visuals = {
        bgPanels: []
    };

    // Panneaux muraux modulaires en fond
    const panelSize = 100;
    for (let x = 0; x < w * 2; x += panelSize) {
        for (let y = 0; y < h; y += panelSize) {
            visuals.bgPanels.push({ x, y, size: panelSize - 2 });
        }
    }

    VisualCache.level6 = visuals;
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
    // UX: On assombrit pour faire ressortir les plateformes (le gameplay)
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Vitraux en arrière plan (donne de la profondeur)
    for (const win of visuals.windows) {
        const x = win.x - camX * 0.2; // Parallax lent

        // Lueur du vitrail
        ctx.shadowBlur = 20;
        ctx.shadowColor = win.color;
        ctx.fillStyle = win.color;
        ctx.beginPath();
        // Forme en ogive
        ctx.moveTo(x, win.y + win.h);
        ctx.lineTo(x + win.w, win.y + win.h);
        ctx.lineTo(x + win.w, win.y + 20);
        ctx.quadraticCurveTo(x + win.w / 2, win.y - 40, x, win.y + 20);
        ctx.fill();

        ctx.shadowBlur = 0; // Reset
    }

    // Piliers (rythme visuel)
    for (const pillar of visuals.pillars) {
        const x = pillar.x - camX * 0.5;

        ctx.fillStyle = '#0f3460'; // Bleu nuit pierre
        if (pillar.type === 'major') {
            ctx.fillRect(x, 0, pillar.width, h);
            // Détails briques
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(x + 10, 0, 10, h);
            ctx.fillRect(x + 40, 0, 10, h);
        } else {
            ctx.fillStyle = '#1f4068'; // Plus clair, plus loin
            ctx.fillRect(x + 10, 50, pillar.width - 20, h - 50);
        }
    }

    // Sol du fond (pour ancrer le décor)
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(0, h * 0.85, w, h * 0.15);
}

function drawLevel3Foreground(ctx, w, h, camX) {
    const visuals = initLevel3Visuals(w, h);

    // Torches sur les piliers
    for (const torch of visuals.torches) {
        const x = torch.x - camX * 0.5;

        // Support
        ctx.fillStyle = '#16213e';
        ctx.beginPath();
        ctx.moveTo(x, torch.y);
        ctx.lineTo(x + 10, torch.y + 10);
        ctx.lineTo(x, torch.y + 20);
        ctx.fill();

        // Flamme
        const flicker = 1 + Math.sin(state.frameTick * 0.2 + torch.flicker) * 0.2;
        const flameY = torch.y - 15;

        // Glow externe
        const grad = ctx.createRadialGradient(x, flameY, 5, x, flameY, 40 * flicker);
        grad.addColorStop(0, 'rgba(231, 76, 60, 0.8)');
        grad.addColorStop(1, 'rgba(231, 76, 60, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, flameY, 40 * flicker, 0, Math.PI * 2);
        ctx.fill();

        // Cœur de flamme
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.arc(x, flameY + 5, 6, 0, Math.PI * 2);
        ctx.fill();
    }

    // Poussières au premier plan (ambiance)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (const d of visuals.dust) {
        // Mouvement continu
        const dx = (d.x + state.frameTick * d.speed) % w;
        const dy = d.y + Math.sin(state.frameTick * 0.01 + d.x) * 20;

        ctx.beginPath();
        ctx.arc(dx, dy, d.size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Chaînes en haut (très sombre pour contraste)
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    for (const chain of visuals.chains) {
        const x = chain.x - camX * 0.8; // Parallax fort (premier plan)
        const sway = Math.sin(state.frameTick * 0.05 + chain.swayOffset) * 10;

        ctx.beginPath();
        ctx.moveTo(x, chain.y);
        // Courbe de chaînette simple
        ctx.quadraticCurveTo(x + sway / 2, chain.y + chain.length / 2, x + sway, chain.y + chain.length);
        ctx.stroke();

        // Petit boulet au bout
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + sway, chain.y + chain.length, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ===== FONCTIONS DE DESSIN NIVEAU 4 =====

function drawLevel4Background(ctx, w, h, camX) {
    const visuals = initLevel4Visuals(w, h);

    // Ciel magique (Teal vers Violet)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#00b894'); // Mint
    skyGradient.addColorStop(0.4, '#0984e3'); // Bleu electron
    skyGradient.addColorStop(1, '#6c5ce7'); // Violet
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Champignons géants de fond (Silhouettes atmosphériques)
    for (const mush of visuals.bgMushrooms) {
        const parallax = mush.parallax;
        const x = mush.x - camX * parallax;

        ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + mush.parallax * 0.1})`; // Transparence pour effet de distance

        // Pied
        ctx.fillRect(x - 10 * mush.scale, mush.y, 20 * mush.scale, h - mush.y);

        // Chapeau
        ctx.beginPath();
        ctx.ellipse(x, mush.y, 60 * mush.scale, 40 * mush.scale, 0, Math.PI, Math.PI * 2);
        ctx.fill();
    }

    // Collines ondulantes
    for (const hill of visuals.hills) {
        const x = hill.x - camX * hill.layer;

        ctx.fillStyle = hill.color;
        ctx.beginPath();
        // Courbe de Bézier pour faire plus organique qu'un simple cercle
        ctx.moveTo(x, h);
        ctx.lineTo(x, hill.y);
        ctx.bezierCurveTo(x + hill.w / 2, hill.y - 50, x + hill.w / 2, hill.y + 50, x + hill.w, hill.y);
        ctx.lineTo(x + hill.w, h);
        ctx.fill();
    }
}

function drawLevel4Foreground(ctx, w, h, camX) {
    const visuals = initLevel4Visuals(w, h);

    // Lucioles au premier plan
    for (const fly of visuals.fireflies) {
        let x = (fly.x + state.frameTick * fly.speedX) % w;
        let y = (fly.y + state.frameTick * fly.speedY) % h;
        if (x < 0) x += w;
        if (y < 0) y += h;

        const pulse = 0.5 + Math.sin(state.frameTick * 0.1 + fly.pulse) * 0.5;

        ctx.shadowBlur = 10;
        ctx.shadowColor = fly.color;
        ctx.fillStyle = fly.color;
        ctx.beginPath();
        ctx.arc(x, y, fly.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// ===== FONCTIONS DE DESSIN NIVEAU 5 (MINECRAFT) =====
function drawLevel5Background(ctx, w, h, camX) {
    const visuals = initLevel5Visuals(w, h);

    if (state.inSubLevel) {
        // NETHER : Fond rouge sombre et brumeux
        ctx.fillStyle = "#2A0505"; // Rouge très sombre fond
        ctx.fillRect(0, 0, w, h);

        // Brume de lave lointaine
        const grad = ctx.createLinearGradient(0, h - 200, 0, h);
        grad.addColorStop(0, "rgba(255, 69, 0, 0)");
        grad.addColorStop(1, "rgba(255, 69, 0, 0.3)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Particules de cendres qui montent
        for (const p of visuals.bgParticles) {
            const y = (p.y + state.frameTick * p.speedY) % h;
            const drawY = y < 0 ? y + h : y;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, drawY, p.size, p.size);
        }
    } else {
        // OVERWORLD : Ciel bleu Minecraft
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0, 0, w, h);

        // Soleil carré
        ctx.fillStyle = "#FFF";
        ctx.fillRect(w - 150, 50, 80, 80);

        // Nuages cubiques
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        for (const c of visuals.clouds) {
            const x = (c.x + state.frameTick * c.speed) % (w * 2) - camX * 0.1;
            // Dessiner un nuage "pixelisé"
            ctx.fillRect(x, c.y, c.w, c.h);
        }
    }
}

function drawLevel5Foreground(ctx, w, h, camX) {
    // Pas de premier plan spécifique pour Minecraft, le style est épuré
}

// ===== FONCTIONS DE DESSIN NIVEAU 6 (PORTAL) =====
function drawLevel6Background(ctx, w, h, camX) {
    const visuals = initLevel6Visuals(w, h);

    // Fond gris technique sombre
    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect(0, 0, w, h);

    // Panneaux modulaires en arrière-plan (parallaxe très lent)
    ctx.fillStyle = "#222";
    for (const p of visuals.bgPanels) {
        const x = p.x - camX * 0.05;
        if (x > -100 && x < w + 100) {
            ctx.fillRect(x, p.y, p.size, p.size);
            // Petit point de fixation
            ctx.fillStyle = "#111";
            ctx.fillRect(x + p.size/2 - 2, p.y + p.size/2 - 2, 4, 4);
            ctx.fillStyle = "#222";
        }
    }
    
    // Vignettage pour ambiance
    const grad = ctx.createRadialGradient(w/2, h/2, h*0.3, w/2, h/2, h);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.6)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
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

    // Couleur os
    const boneColor = "#DDD";
    const darkBone = "#AAA";

    // Jambe droite
    ctx.fillStyle = boneColor;
    ctx.fillRect(2, 32, 6, 28 + walk);
    
    // Jambe gauche
    ctx.fillRect(-8, 32, 6, 28 - walk);

    // Corps (côtes)
    ctx.fillRect(-10, 12, 20, 20);
    ctx.fillStyle = "#555"; // Vide entre les côtes
    ctx.fillRect(-6, 16, 12, 2);
    ctx.fillRect(-6, 22, 12, 2);

    // Tête carrée
    ctx.fillStyle = boneColor;
    ctx.fillRect(-12, -10, 24, 22);
    
    // Visage pixelisé
    ctx.fillStyle = "#222";
    ctx.fillRect(-8, -4, 6, 6); // Oeil G
    ctx.fillRect(2, -4, 6, 6);  // Oeil D
    ctx.fillRect(-6, 6, 12, 4); // Bouche

    // Bras et Arc
    ctx.fillStyle = boneColor;
    
    // Bras qui tient l'arc (devant)
    ctx.save();
    ctx.translate(10, 16);
    ctx.rotate(-0.5); // Bras levé
    ctx.fillRect(-3, 0, 6, 24);
    
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

function drawEnhancedLevelBackground(ctx, w, h, camX) {
    if (state.level === 1) {
        drawLevel1Background(ctx, w, h, camX);
    } else if (state.level === 2) {
        drawLevel2Background(ctx, w, h, camX);
    } else if (state.level === 7) {
        drawLevel7Background(ctx, w, h, camX);
    } else if (state.level === 8) {
        drawLevel8Background(ctx, w, h, camX);
    } else if (state.level === 9) {
        drawLevel9Background(ctx, w, h, camX);
    }
}

function drawEnhancedLevelForeground(ctx, w, h, camX) {
    if (state.level === 1) {
        drawLevel1Foreground(ctx, w, h, camX);
    } else if (state.level === 2) {
        drawLevel2Foreground(ctx, w, h, camX);
    } else if (state.level === 7) {
        drawLevel7Foreground(ctx, w, h, camX);
    } else if (state.level === 8) {
        drawLevel8Foreground(ctx, w, h, camX);
    } else if (state.level === 9) {
        drawLevel9Foreground(ctx, w, h, camX);
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
    VisualCache.level7 = null;
    VisualCache.level8 = null;
    VisualCache.level9 = null;
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
window.updateVisualElements = updateVisualElements;
window.resetVisualCache = resetVisualCache;
