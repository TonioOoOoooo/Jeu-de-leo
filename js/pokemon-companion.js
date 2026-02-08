// ============================================================
// NIVEAU 13 - SYSTÈME COMPAGNON POKÉMON
// Sélection, projectiles, capture, configuration
// ============================================================

// --- CONFIGURATION DES COMPAGNONS (Strategy Pattern) ---
const COMPANION_TYPES = {
    electric: {
        name: 'Éclair',
        icon: '⚡',
        color: '#f1c40f',
        colorLight: '#ffeaa7',
        projectile: {
            speed: 10,
            w: 16, h: 12,
            damage: 1,
            type: 'electric_bolt',
            range: 600,
            gravity: 0,
            piercing: false
        },
        special: null, // Pas d'effet spécial
        desc: 'Tir rapide en ligne droite'
    },
    fire: {
        name: 'Flamme',
        icon: '🔥',
        color: '#e74c3c',
        colorLight: '#fab1a0',
        projectile: {
            speed: 7,
            w: 20, h: 18,
            damage: 1,
            type: 'fire_ball',
            range: 250,
            gravity: 0.08,
            piercing: false
        },
        special: 'destroy_wood', // Détruit obstacles bois
        desc: 'Portée courte, détruit le bois'
    },
    water: {
        name: 'Bulle',
        icon: '💧',
        color: '#3498db',
        colorLight: '#74b9ff',
        projectile: {
            speed: 8,
            w: 18, h: 18,
            damage: 0,
            type: 'water_pulse',
            range: 400,
            gravity: 0,
            piercing: true
        },
        special: 'push_enemies', // Repousse les ennemis
        desc: 'Repousse les ennemis'
    },
    plant: {
        name: 'Feuille',
        icon: '🌿',
        color: '#2ecc71',
        colorLight: '#55efc4',
        projectile: {
            speed: 6,
            w: 22, h: 14,
            damage: 1,
            type: 'leaf_blade',
            range: 350,
            gravity: 0,
            piercing: false
        },
        special: 'attract_coins', // Attire les collectibles
        desc: 'Attire les collectibles proches'
    }
};

// --- ÉTAT DU COMPAGNON ---
const CompanionState = {
    type: null,           // Clé dans COMPANION_TYPES
    config: null,         // Ref vers la config active
    projectiles: [],      // Projectiles actifs du joueur
    cooldown: 0,          // Cooldown entre les tirs
    cooldownMax: 20,      // Frames entre chaque tir
    captures: 0,          // Nombre de créatures capturées
    companionX: 0,        // Position X du compagnon (suit le joueur)
    companionY: 0,        // Position Y
    bobAngle: 0           // Animation flottante
};

// --- SÉLECTION DU COMPAGNON ---
function selectCompanion(type) {
    if (!COMPANION_TYPES[type]) return;
    CompanionState.type = type;
    CompanionState.config = COMPANION_TYPES[type];
    CompanionState.projectiles = [];
    CompanionState.cooldown = 0;
    CompanionState.captures = 0;
}

// --- TIR DE PROJECTILE ---
function fireCompanionProjectile(fromX, fromY, facingRight) {
    if (CompanionState.cooldown > 0 || !CompanionState.config) return;

    const cfg = CompanionState.config.projectile;
    const dir = facingRight ? 1 : -1;

    const proj = {
        x: fromX,
        y: fromY - cfg.h / 2,
        w: cfg.w,
        h: cfg.h,
        vx: cfg.speed * dir,
        vy: 0,
        type: cfg.type,
        life: cfg.range,
        damage: cfg.damage,
        gravity: cfg.gravity,
        piercing: cfg.piercing,
        companionType: CompanionState.type
    };

    CompanionState.projectiles.push(proj);
    CompanionState.cooldown = CompanionState.cooldownMax;

    // Son de tir
    if (typeof AudioSystem !== 'undefined') {
        AudioSystem.play('poke_shoot');
    }
}

// --- MISE À JOUR DES PROJECTILES ---
function updateCompanionProjectiles() {
    if (CompanionState.cooldown > 0) CompanionState.cooldown--;

    for (let i = CompanionState.projectiles.length - 1; i >= 0; i--) {
        const p = CompanionState.projectiles[i];
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.life -= Math.abs(p.vx);

        // Hors durée de vie
        if (p.life <= 0 || p.x < -200 || p.x > 10000 || p.y > 2000) {
            CompanionState.projectiles.splice(i, 1);
        }
    }
}

// --- COLLISION PROJECTILE <-> ENNEMI ---
function checkCompanionProjectileCollisions(enemies, coins) {
    if (!CompanionState.config) return;

    for (let i = CompanionState.projectiles.length - 1; i >= 0; i--) {
        const p = CompanionState.projectiles[i];

        // Collision avec ennemis capturables (créatures sauvages)
        for (let j = enemies.length - 1; j >= 0; j--) {
            const e = enemies[j];
            if (e.captured || e.uncapturable) continue;

            if (p.x < e.x + e.w && p.x + p.w > e.x &&
                p.y < e.y + e.h && p.y + p.h > e.y) {

                if (CompanionState.config.special === 'push_enemies') {
                    // Eau : repousse
                    e.x += (p.vx > 0 ? 80 : -80);
                    if (typeof ParticleSystem !== 'undefined') {
                        ParticleSystem.emit(e.x + e.w / 2, e.y + e.h / 2, 'sparkle', 10);
                    }
                } else if (e.capturable) {
                    // Capture de la créature !
                    e.captured = true;
                    CompanionState.captures++;
                    if (typeof state !== 'undefined') {
                        state.coins += (e.captureValue || 5);
                        state.totalCoins += (e.captureValue || 5);
                        if (typeof updateCoinsDisplay === 'function') updateCoinsDisplay();
                    }
                    if (typeof AudioSystem !== 'undefined') AudioSystem.play('poke_capture');
                    if (typeof ParticleSystem !== 'undefined') {
                        ParticleSystem.emit(e.x + e.w / 2, e.y + e.h / 2, 'confetti', 25);
                    }
                    if (typeof showMessage === 'function') {
                        showMessage('CAPTURÉ !', `+${e.captureValue || 5} points !`, 1200);
                    }
                    // Retirer l'ennemi
                    enemies.splice(j, 1);
                } else {
                    // Ennemi non capturable mais touché (ballon méchant)
                    if (p.damage > 0) {
                        e.hp = (e.hp || 1) - p.damage;
                        if (e.hp <= 0) {
                            if (typeof ParticleSystem !== 'undefined') {
                                ParticleSystem.emit(e.x + e.w / 2, e.y + e.h / 2, 'boss', 10);
                            }
                            enemies.splice(j, 1);
                        }
                    }
                }

                if (!p.piercing) {
                    CompanionState.projectiles.splice(i, 1);
                    break;
                }
            }
        }

        // Spécial plante : attire les collectibles proches
        if (CompanionState.config.special === 'attract_coins' && coins) {
            for (const c of coins) {
                const dx = p.x - c.x;
                const dy = p.y - c.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    // Attire vers le joueur
                    c.x += (typeof player !== 'undefined' ? (player.x - c.x) : dx) * 0.1;
                    c.y += (typeof player !== 'undefined' ? (player.y - c.y) : dy) * 0.1;
                }
            }
        }
    }
}

// --- FLÛTE (Zone A - objet caché) ---
function activateFlute(snorlaxEnemy) {
    if (!snorlaxEnemy) return;
    snorlaxEnemy.awakened = true;
    snorlaxEnemy.awakeTimer = 120; // 2 secondes d'animation
    if (typeof AudioSystem !== 'undefined') AudioSystem.play('poke_flute');
    if (typeof showMessage === 'function') {
        showMessage('FLÛTE !', 'La créature se réveille et s\'en va !', 2500);
    }
    if (typeof ParticleSystem !== 'undefined') {
        ParticleSystem.emit(snorlaxEnemy.x + snorlaxEnemy.w / 2, snorlaxEnemy.y, 'sparkle', 30);
    }
}

// --- MISE À JOUR POSITION COMPAGNON ---
function updateCompanionPosition(playerX, playerY, facingRight) {
    CompanionState.bobAngle += 0.08;
    const targetX = facingRight ? playerX - 30 : playerX + 40;
    const targetY = playerY - 10 + Math.sin(CompanionState.bobAngle) * 6;
    CompanionState.companionX += (targetX - CompanionState.companionX) * 0.15;
    CompanionState.companionY += (targetY - CompanionState.companionY) * 0.15;
}

// --- DESSIN DU COMPAGNON ---
function drawCompanion(ctx) {
    if (!CompanionState.config) return;

    const cfg = CompanionState.config;
    const x = CompanionState.companionX;
    const y = CompanionState.companionY;
    const t = CompanionState.bobAngle;

    ctx.save();

    // Halo lumineux
    const gradient = ctx.createRadialGradient(x, y, 2, x, y, 25);
    gradient.addColorStop(0, cfg.colorLight + '60');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    // Corps selon le type
    switch (CompanionState.type) {
        case 'electric':
            // Petite souris électrique
            ctx.fillStyle = cfg.color;
            ctx.beginPath();
            ctx.ellipse(x, y, 12, 10, 0, 0, Math.PI * 2);
            ctx.fill();
            // Oreilles pointues
            ctx.beginPath();
            ctx.moveTo(x - 8, y - 8);
            ctx.lineTo(x - 4, y - 18);
            ctx.lineTo(x, y - 8);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x + 8, y - 8);
            ctx.lineTo(x + 4, y - 18);
            ctx.lineTo(x, y - 8);
            ctx.fill();
            // Bouts noirs des oreilles
            ctx.fillStyle = '#2d3436';
            ctx.beginPath();
            ctx.moveTo(x - 6, y - 14);
            ctx.lineTo(x - 4, y - 18);
            ctx.lineTo(x - 2, y - 14);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x + 6, y - 14);
            ctx.lineTo(x + 4, y - 18);
            ctx.lineTo(x + 2, y - 14);
            ctx.fill();
            // Joues rouges
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(x - 9, y + 2, 3, 0, Math.PI * 2);
            ctx.arc(x + 9, y + 2, 3, 0, Math.PI * 2);
            ctx.fill();
            // Yeux
            ctx.fillStyle = '#2d3436';
            ctx.beginPath();
            ctx.arc(x - 4, y - 2, 2, 0, Math.PI * 2);
            ctx.arc(x + 4, y - 2, 2, 0, Math.PI * 2);
            ctx.fill();
            // Queue éclair
            ctx.strokeStyle = cfg.color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x + 12, y);
            ctx.lineTo(x + 18, y - 6);
            ctx.lineTo(x + 15, y);
            ctx.lineTo(x + 22, y + 4);
            ctx.stroke();
            // Étincelles
            if (Math.random() > 0.7) {
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(x + 20 + Math.random() * 10, y - 5 + Math.random() * 10, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
            break;

        case 'fire':
            // Petite salamandre de feu
            ctx.fillStyle = cfg.color;
            ctx.beginPath();
            ctx.ellipse(x, y, 11, 10, 0, 0, Math.PI * 2);
            ctx.fill();
            // Flamme sur la queue
            ctx.fillStyle = '#e67e22';
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 5);
            ctx.quadraticCurveTo(x + 18, y - 5 + Math.sin(t * 3) * 4, x + 22, y + 2);
            ctx.fill();
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.moveTo(x + 12, y + 4);
            ctx.quadraticCurveTo(x + 17, y - 2 + Math.sin(t * 3 + 1) * 3, x + 20, y + 3);
            ctx.fill();
            // Yeux
            ctx.fillStyle = '#2d3436';
            ctx.beginPath();
            ctx.arc(x - 4, y - 2, 2.5, 0, Math.PI * 2);
            ctx.arc(x + 4, y - 2, 2.5, 0, Math.PI * 2);
            ctx.fill();
            // Ventre
            ctx.fillStyle = '#fab1a0';
            ctx.beginPath();
            ctx.ellipse(x, y + 3, 7, 5, 0, 0, Math.PI);
            ctx.fill();
            break;

        case 'water':
            // Petite tortue d'eau
            ctx.fillStyle = '#2980b9';
            // Carapace
            ctx.beginPath();
            ctx.ellipse(x, y - 2, 13, 10, 0, Math.PI, 0);
            ctx.fill();
            ctx.fillStyle = '#1abc9c';
            ctx.beginPath();
            ctx.ellipse(x, y - 2, 11, 8, 0, Math.PI, 0);
            ctx.fill();
            // Ventre
            ctx.fillStyle = cfg.colorLight;
            ctx.beginPath();
            ctx.ellipse(x, y + 2, 10, 6, 0, 0, Math.PI);
            ctx.fill();
            // Tête
            ctx.fillStyle = '#3498db';
            ctx.beginPath();
            ctx.arc(x - 10, y, 6, 0, Math.PI * 2);
            ctx.fill();
            // Yeux
            ctx.fillStyle = '#2d3436';
            ctx.beginPath();
            ctx.arc(x - 12, y - 2, 1.5, 0, Math.PI * 2);
            ctx.fill();
            // Bulles
            if (Math.random() > 0.8) {
                ctx.strokeStyle = cfg.colorLight + '80';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(x + 12 + Math.random() * 8, y - 8 - Math.random() * 8, 2 + Math.random() * 2, 0, Math.PI * 2);
                ctx.stroke();
            }
            break;

        case 'plant':
            // Petite créature graine
            ctx.fillStyle = cfg.color;
            ctx.beginPath();
            ctx.ellipse(x, y, 10, 12, 0, 0, Math.PI * 2);
            ctx.fill();
            // Feuilles sur la tête
            ctx.fillStyle = '#27ae60';
            ctx.beginPath();
            ctx.ellipse(x - 5, y - 14, 6, 3, -0.4 + Math.sin(t * 2) * 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + 5, y - 14, 6, 3, 0.4 + Math.sin(t * 2 + 1) * 0.1, 0, Math.PI * 2);
            ctx.fill();
            // Yeux mignons
            ctx.fillStyle = '#c0392b';
            ctx.beginPath();
            ctx.arc(x - 3, y - 2, 3, 0, Math.PI * 2);
            ctx.arc(x + 3, y - 2, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(x - 3, y - 3, 1, 0, Math.PI * 2);
            ctx.arc(x + 3, y - 3, 1, 0, Math.PI * 2);
            ctx.fill();
            // Petits points de pollen
            if (Math.random() > 0.85) {
                ctx.fillStyle = '#ffeaa7';
                ctx.beginPath();
                ctx.arc(x + (Math.random() - 0.5) * 30, y - 15 - Math.random() * 10, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
    }

    ctx.restore();
}

// --- DESSIN DES PROJECTILES COMPAGNON ---
function drawCompanionProjectiles(ctx) {
    const t = CompanionState.bobAngle;

    for (const p of CompanionState.projectiles) {
        ctx.save();

        switch (p.type) {
            case 'electric_bolt':
                // Éclair jaune
                ctx.fillStyle = '#f1c40f';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y + p.h / 2);
                ctx.lineTo(p.x + p.w * 0.4, p.y);
                ctx.lineTo(p.x + p.w * 0.5, p.y + p.h * 0.4);
                ctx.lineTo(p.x + p.w, p.y + p.h * 0.3);
                ctx.lineTo(p.x + p.w * 0.6, p.y + p.h);
                ctx.lineTo(p.x + p.w * 0.5, p.y + p.h * 0.6);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;

            case 'fire_ball':
                // Boule de feu
                const grad = ctx.createRadialGradient(p.x + p.w / 2, p.y + p.h / 2, 2, p.x + p.w / 2, p.y + p.h / 2, p.w / 2);
                grad.addColorStop(0, '#f1c40f');
                grad.addColorStop(0.5, '#e67e22');
                grad.addColorStop(1, '#e74c3c');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'water_pulse':
                // Anneau d'eau
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.globalAlpha = 0.7 + Math.sin(t * 4) * 0.3;
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#74b9ff40';
                ctx.fill();
                break;

            case 'leaf_blade':
                // Feuille tranchante
                ctx.fillStyle = '#2ecc71';
                ctx.save();
                ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
                ctx.rotate(Math.atan2(p.vy, p.vx));
                ctx.beginPath();
                ctx.ellipse(0, 0, p.w / 2, p.h / 3, 0, 0, Math.PI * 2);
                ctx.fill();
                // Nervure
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(-p.w / 2, 0);
                ctx.lineTo(p.w / 2, 0);
                ctx.stroke();
                ctx.restore();
                break;

            case 'capture_ball':
                // Pokéball de capture
                const cx = p.x + p.w / 2;
                const cy = p.y + p.h / 2;
                const r = p.w / 2;
                // Moitié rouge
                ctx.fillStyle = '#e74c3c';
                ctx.beginPath();
                ctx.arc(cx, cy, r, Math.PI, 0);
                ctx.fill();
                // Moitié blanche
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI);
                ctx.fill();
                // Ligne noire
                ctx.strokeStyle = '#2d3436';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx - r, cy);
                ctx.lineTo(cx + r, cy);
                ctx.stroke();
                // Contour
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.stroke();
                // Bouton central
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(cx, cy, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#2d3436';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(cx, cy, 4, 0, Math.PI * 2);
                ctx.stroke();
                break;
        }

        ctx.restore();
    }
}

// --- DESSIN DES CRÉATURES SAUVAGES ---
function drawWildCreature(ctx, e, frameTick) {
    if (e.captured) return;

    const bob = Math.sin(frameTick * 0.08 + e.x * 0.01) * 3;
    ctx.save();

    switch (e.creatureType) {
        case 'caterpillar':
            // Chenille verte
            for (let i = 0; i < 4; i++) {
                ctx.fillStyle = i % 2 === 0 ? '#2ecc71' : '#27ae60';
                ctx.beginPath();
                ctx.arc(e.x + 8 + i * 10, e.y + e.h / 2 + bob + Math.sin(frameTick * 0.15 + i) * 2, 7, 0, Math.PI * 2);
                ctx.fill();
            }
            // Tête
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(e.x + e.w - 5, e.y + e.h / 2 + bob, 8, 0, Math.PI * 2);
            ctx.fill();
            // Yeux
            ctx.fillStyle = '#2d3436';
            ctx.beginPath();
            ctx.arc(e.x + e.w - 3, e.y + e.h / 2 + bob - 2, 2, 0, Math.PI * 2);
            ctx.fill();
            // Antennes
            ctx.strokeStyle = '#2d3436';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(e.x + e.w - 3, e.y + e.h / 2 + bob - 6);
            ctx.lineTo(e.x + e.w + 3, e.y + e.h / 2 + bob - 14);
            ctx.moveTo(e.x + e.w - 7, e.y + e.h / 2 + bob - 6);
            ctx.lineTo(e.x + e.w - 10, e.y + e.h / 2 + bob - 14);
            ctx.stroke();
            break;

        case 'bird':
            // Petit oiseau
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.ellipse(e.x + e.w / 2, e.y + e.h / 2 + bob, e.w / 2 - 2, e.h / 2 - 4, 0, 0, Math.PI * 2);
            ctx.fill();
            // Aile
            const wingY = Math.sin(frameTick * 0.25) * 5;
            ctx.fillStyle = '#c0392b';
            ctx.beginPath();
            ctx.ellipse(e.x + e.w / 2 + 3, e.y + e.h / 2 + bob + wingY - 5, 8, 4, 0.3, 0, Math.PI * 2);
            ctx.fill();
            // Oeil
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(e.x + e.w * 0.7, e.y + e.h / 2 + bob - 2, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#2d3436';
            ctx.beginPath();
            ctx.arc(e.x + e.w * 0.72, e.y + e.h / 2 + bob - 2, 2, 0, Math.PI * 2);
            ctx.fill();
            // Bec
            ctx.fillStyle = '#f39c12';
            ctx.beginPath();
            ctx.moveTo(e.x + e.w - 2, e.y + e.h / 2 + bob);
            ctx.lineTo(e.x + e.w + 6, e.y + e.h / 2 + bob + 2);
            ctx.lineTo(e.x + e.w - 2, e.y + e.h / 2 + bob + 4);
            ctx.closePath();
            ctx.fill();
            break;

        case 'rat':
            // Petit rat violet
            ctx.fillStyle = '#9b59b6';
            ctx.beginPath();
            ctx.ellipse(e.x + e.w / 2, e.y + e.h / 2 + bob, e.w / 2 - 2, e.h / 2 - 2, 0, 0, Math.PI * 2);
            ctx.fill();
            // Oreilles rondes
            ctx.fillStyle = '#8e44ad';
            ctx.beginPath();
            ctx.arc(e.x + 8, e.y + bob + 4, 6, 0, Math.PI * 2);
            ctx.arc(e.x + e.w - 8, e.y + bob + 4, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#d5a6e6';
            ctx.beginPath();
            ctx.arc(e.x + 8, e.y + bob + 4, 3, 0, Math.PI * 2);
            ctx.arc(e.x + e.w - 8, e.y + bob + 4, 3, 0, Math.PI * 2);
            ctx.fill();
            // Yeux
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(e.x + e.w * 0.35, e.y + e.h / 2 + bob, 3, 0, Math.PI * 2);
            ctx.arc(e.x + e.w * 0.65, e.y + e.h / 2 + bob, 3, 0, Math.PI * 2);
            ctx.fill();
            // Dents
            ctx.fillStyle = 'white';
            ctx.fillRect(e.x + e.w / 2 - 3, e.y + e.h - 3 + bob, 3, 4);
            ctx.fillRect(e.x + e.w / 2 + 1, e.y + e.h - 3 + bob, 3, 4);
            break;

        case 'butterfly':
            // Papillon coloré
            const wingFlap = Math.sin(frameTick * 0.3) * 15;
            ctx.fillStyle = '#e91e63';
            // Aile gauche
            ctx.beginPath();
            ctx.ellipse(e.x + e.w / 2 - 8, e.y + e.h / 2 + bob, 10, 6 + wingFlap * 0.3, -0.3, 0, Math.PI * 2);
            ctx.fill();
            // Aile droite
            ctx.beginPath();
            ctx.ellipse(e.x + e.w / 2 + 8, e.y + e.h / 2 + bob, 10, 6 + wingFlap * 0.3, 0.3, 0, Math.PI * 2);
            ctx.fill();
            // Corps
            ctx.fillStyle = '#2d3436';
            ctx.beginPath();
            ctx.ellipse(e.x + e.w / 2, e.y + e.h / 2 + bob, 3, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            // Motifs
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(e.x + e.w / 2 - 8, e.y + e.h / 2 + bob, 3, 0, Math.PI * 2);
            ctx.arc(e.x + e.w / 2 + 8, e.y + e.h / 2 + bob, 3, 0, Math.PI * 2);
            ctx.fill();
            break;

        case 'slime':
            // Blob gélatineux
            const squish = 1 + Math.sin(frameTick * 0.12) * 0.1;
            ctx.fillStyle = '#00cec9';
            ctx.beginPath();
            ctx.ellipse(e.x + e.w / 2, e.y + e.h / 2 + bob + 2, (e.w / 2) * squish, (e.h / 2) / squish, 0, 0, Math.PI * 2);
            ctx.fill();
            // Reflet
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.beginPath();
            ctx.ellipse(e.x + e.w / 2 - 5, e.y + e.h / 2 + bob - 4, 4, 3, -0.3, 0, Math.PI * 2);
            ctx.fill();
            // Yeux
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(e.x + e.w * 0.35, e.y + e.h / 2 + bob - 2, 5, 0, Math.PI * 2);
            ctx.arc(e.x + e.w * 0.65, e.y + e.h / 2 + bob - 2, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#2d3436';
            ctx.beginPath();
            ctx.arc(e.x + e.w * 0.37, e.y + e.h / 2 + bob - 1, 2.5, 0, Math.PI * 2);
            ctx.arc(e.x + e.w * 0.67, e.y + e.h / 2 + bob - 1, 2.5, 0, Math.PI * 2);
            ctx.fill();
            break;
    }

    // Indicateur capturable
    if (e.capturable && !e.captured) {
        ctx.globalAlpha = 0.5 + Math.sin(frameTick * 0.1) * 0.3;
        ctx.fillStyle = 'white';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('!', e.x + e.w / 2, e.y + bob - 10);
        ctx.globalAlpha = 1;
    }

    ctx.restore();
}

// --- DESSIN DU SNORLAX (bloqueur Zone A) ---
function drawSnorlax(ctx, e, frameTick) {
    ctx.save();

    if (e.awakened) {
        // Animation de réveil
        ctx.globalAlpha = Math.max(0, 1 - (120 - (e.awakeTimer || 0)) / 120);
        if (e.awakeTimer <= 0) {
            ctx.restore();
            return;
        }
    }

    // Corps gros bleu foncé
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.ellipse(e.x + e.w / 2, e.y + e.h * 0.6, e.w / 2, e.h * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ventre clair
    ctx.fillStyle = '#dfe6e9';
    ctx.beginPath();
    ctx.ellipse(e.x + e.w / 2, e.y + e.h * 0.65, e.w * 0.35, e.h * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tête
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.arc(e.x + e.w / 2, e.y + e.h * 0.25, e.w * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Yeux fermés (dort) ou ouverts
    if (!e.awakened) {
        ctx.strokeStyle = '#2d3436';
        ctx.lineWidth = 2;
        // Oeil gauche fermé
        ctx.beginPath();
        ctx.moveTo(e.x + e.w * 0.33, e.y + e.h * 0.22);
        ctx.lineTo(e.x + e.w * 0.43, e.y + e.h * 0.25);
        ctx.stroke();
        // Oeil droit fermé
        ctx.beginPath();
        ctx.moveTo(e.x + e.w * 0.57, e.y + e.h * 0.22);
        ctx.lineTo(e.x + e.w * 0.67, e.y + e.h * 0.25);
        ctx.stroke();
        // ZZZ
        const zzz = Math.sin(frameTick * 0.05);
        ctx.fillStyle = 'white';
        ctx.font = `${12 + zzz * 2}px sans-serif`;
        ctx.globalAlpha = 0.6 + zzz * 0.3;
        ctx.fillText('Z', e.x + e.w * 0.7, e.y + e.h * 0.1 + zzz * 3);
        ctx.font = `${10 + zzz}px sans-serif`;
        ctx.fillText('z', e.x + e.w * 0.8, e.y + e.h * 0.05 + zzz * 5);
        ctx.globalAlpha = 1;
    }

    // Pieds
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.ellipse(e.x + e.w * 0.3, e.y + e.h * 0.9, 12, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(e.x + e.w * 0.7, e.y + e.h * 0.9, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// --- DESSIN DES MÉCHANTS EN BALLON (Zone C) ---
function drawBalloonVillain(ctx, e, frameTick) {
    const bob = Math.sin(frameTick * 0.04 + e.x * 0.02) * 8;
    ctx.save();

    // Ballon
    ctx.fillStyle = '#9b59b6';
    ctx.beginPath();
    ctx.ellipse(e.x + e.w / 2, e.y + bob - 20, 25, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    // Reflet ballon
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.ellipse(e.x + e.w / 2 - 8, e.y + bob - 30, 6, 10, -0.3, 0, Math.PI * 2);
    ctx.fill();
    // Ficelles
    ctx.strokeStyle = '#636e72';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(e.x + e.w / 2 - 5, e.y + bob + 8);
    ctx.lineTo(e.x + e.w / 2, e.y + bob + 25);
    ctx.moveTo(e.x + e.w / 2 + 5, e.y + bob + 8);
    ctx.lineTo(e.x + e.w / 2, e.y + bob + 25);
    ctx.stroke();

    // Nacelle
    ctx.fillStyle = '#d63031';
    ctx.fillRect(e.x + e.w / 2 - 12, e.y + bob + 25, 24, 18);

    // R sur la nacelle
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('R', e.x + e.w / 2, e.y + bob + 40);

    ctx.restore();
}

// --- DESSIN BADGE (collectible Zone B) ---
function drawBadge(ctx, c, frameTick) {
    const bob = Math.sin(frameTick * 0.1 + c.x * 0.01) * 3;
    const shine = Math.sin(frameTick * 0.08) * 0.3 + 0.7;
    ctx.save();

    const cx = c.x + c.w / 2;
    const cy = c.y + c.h / 2 + bob;
    const r = c.w / 2;

    // Étoile dorée (forme badge)
    ctx.fillStyle = `rgba(241, 196, 15, ${shine})`;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const rad = i % 2 === 0 ? r : r * 0.5;
        if (i === 0) ctx.moveTo(cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad);
        else ctx.lineTo(cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad);
    }
    ctx.closePath();
    ctx.fill();

    // Contour
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Reflet
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.arc(cx - 2, cy - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// --- DESSIN SPHÈRE DE CAPTURE (collectible Zone C) ---
function drawCaptureSphere(ctx, c, frameTick) {
    const bob = Math.sin(frameTick * 0.12 + c.x * 0.01) * 4;
    ctx.save();

    const cx = c.x + c.w / 2;
    const cy = c.y + c.h / 2 + bob;
    const r = c.w / 2;

    // Moitié rouge
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0);
    ctx.fill();
    // Moitié blanche
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI);
    ctx.fill();
    // Ligne
    ctx.strokeStyle = '#2d3436';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - r, cy);
    ctx.lineTo(cx + r, cy);
    ctx.stroke();
    // Contour
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    // Bouton central
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

// --- DESSIN BONBON POWER-UP ---
function drawRareCandy(ctx, p, frameTick) {
    const bob = Math.sin(frameTick * 0.1) * 4;
    const glow = Math.sin(frameTick * 0.08) * 0.3 + 0.7;
    ctx.save();

    const cx = p.x + p.w / 2;
    const cy = p.y + p.h / 2 + bob;

    // Halo
    const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 25);
    grad.addColorStop(0, `rgba(155, 89, 182, ${glow * 0.5})`);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fill();

    // Bonbon
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.ellipse(cx, cy, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Emballage
    ctx.fillStyle = '#2980b9';
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy - 4);
    ctx.lineTo(cx - 18, cy - 10);
    ctx.lineTo(cx - 16, cy);
    ctx.lineTo(cx - 12, cy + 4);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + 12, cy - 4);
    ctx.lineTo(cx + 18, cy - 10);
    ctx.lineTo(cx + 16, cy);
    ctx.lineTo(cx + 12, cy + 4);
    ctx.fill();

    // Étoile brillante
    ctx.fillStyle = 'white';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.globalAlpha = glow;
    ctx.fillText('★', cx, cy + 4);
    ctx.globalAlpha = 1;

    ctx.restore();
}

// Exports globaux
window.COMPANION_TYPES = COMPANION_TYPES;
window.CompanionState = CompanionState;
window.selectCompanion = selectCompanion;
window.fireCompanionProjectile = fireCompanionProjectile;
window.updateCompanionProjectiles = updateCompanionProjectiles;
window.checkCompanionProjectileCollisions = checkCompanionProjectileCollisions;
window.updateCompanionPosition = updateCompanionPosition;
window.drawCompanion = drawCompanion;
window.drawCompanionProjectiles = drawCompanionProjectiles;
window.drawWildCreature = drawWildCreature;
window.drawSnorlax = drawSnorlax;
window.drawBalloonVillain = drawBalloonVillain;
window.drawBadge = drawBadge;
window.drawCaptureSphere = drawCaptureSphere;
window.drawRareCandy = drawRareCandy;
window.activateFlute = activateFlute;
