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
        for (const dust of VisualCache.level3.dust) {
            dust.x += dust.speed;
            if (dust.x > canvas.width) {
                dust.x = 0;
                dust.y = Math.random() * canvas.height;
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

        // Fireflies are animated in the draw pass for smoother motion
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
