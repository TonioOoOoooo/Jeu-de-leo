// ============================================================
// L'AVENTURE DE LÉO - FONCTIONS DE DESSIN
// ============================================================

function draw() {
    ctx.save();
    
    // Screen shake
    if (state.screenShake > 0) {
        ctx.translate(
            (Math.random() - 0.5) * state.screenShake,
            (Math.random() - 0.5) * state.screenShake
        );
    }
    
    // Fond
    const levelDef = LEVELS[state.level];
    ctx.fillStyle = levelDef ? levelDef.bgColor : '#fffdf0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (!currentLevelData) {
        ctx.restore();
        return;
    }
    
    // Grille cahier pour niveaux 1-2
    if (state.level <= 2) {
        drawNotebookGrid();
    }
    
    // Caméra
    const camX = Math.min(0, (canvas.width * 0.3) - player.x);
    ctx.save();
    ctx.translate(camX, 0);
    
    // Étoiles (niveau 9)
    if (currentLevelData.stars && currentLevelData.stars.length > 0) {
        drawStars();
    }
    
    // Nuages
    if (currentLevelData.clouds && currentLevelData.clouds.length > 0) {
        drawClouds();
    }
    
    // Décorations (loops, etc.)
    if (currentLevelData.decorations && currentLevelData.decorations.length > 0) {
        drawDecorations();
    }
    
    // Portails
    drawPortals();
    
    // Barres de feu
    drawFireBars();
    
    // Échelles
    drawLadders();
    
    // Plateformes
    drawPlatforms();
    
    // Pièces
    drawCoins();

    // Power-ups !
    drawPowerups();

    // Clé
    drawKey();
    
    // Dangers
    drawHazards();
    
    // Ennemis
    drawEnemies();
    
    // Boss
    if (currentLevelData.boss) {
        drawBoss();
    }
    
    // Projectiles
    drawProjectiles();
    
    // But
    drawGoal();
    
    // Joueur
    player.draw(ctx);
    
    // Particules
    ParticleSystem.draw(ctx);
    
    ctx.restore();
    ctx.restore();
}

function drawNotebookGrid() {
    ctx.strokeStyle = "rgba(100, 180, 255, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let y = 0; y < canvas.height; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
    
    ctx.strokeStyle = "rgba(255, 100, 100, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, canvas.height);
    ctx.stroke();
}

function drawStars() {
    for (const star of currentLevelData.stars) {
        const twinkle = Math.sin(state.frameTick * 0.05 + star.twinkle) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + twinkle * 0.7})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (0.8 + twinkle * 0.4), 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawDecorations() {
    for (const d of currentLevelData.decorations) {
        if (d.type === 'loop') {
            // Loop style Sonic - cercle avec damier
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 15;
            ctx.beginPath();
            ctx.arc(d.x + d.size/2, d.y + d.size/2, d.size/2, 0, Math.PI * 2);
            ctx.stroke();
            
            // Damier intérieur
            ctx.strokeStyle = '#1a5276';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.arc(d.x + d.size/2, d.y + d.size/2, d.size/2, 0, Math.PI * 2);
            ctx.stroke();
            
            // Reflets
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(d.x + d.size/2, d.y + d.size/2, d.size/2 - 10, Math.PI * 1.2, Math.PI * 1.8);
            ctx.stroke();
        }
    }
}

function drawClouds() {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    for (const c of currentLevelData.clouds) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.w / 2, 0, Math.PI * 2);
        ctx.arc(c.x + c.w / 2, c.y - 10, c.w / 2, 0, Math.PI * 2);
        ctx.arc(c.x + c.w, c.y, c.w / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawPortals() {
    for (const p of currentLevelData.portals) {
        // Portail Nether/Retour super stylé !
        if (p.isNetherPortal || p.isReturnPortal || p.isReturnFromNether) {
            // Cadre en obsidienne
            ctx.fillStyle = '#1a0033';
            ctx.fillRect(p.x - 10, p.y, 10, p.h);
            ctx.fillRect(p.x + p.w, p.y, 10, p.h);
            ctx.fillRect(p.x - 10, p.y - 10, p.w + 20, 10);
            ctx.fillRect(p.x - 10, p.y + p.h, p.w + 20, 10);

            // Effet de tourbillon
            const time = state.frameTick * 0.05;
            for (let i = 0; i < 8; i++) {
                const angle = time + (i * Math.PI / 4);
                const radius = (p.w / 2) * (0.3 + Math.sin(time * 2 + i) * 0.2);
                const x = p.x + p.w/2 + Math.cos(angle) * radius;
                const y = p.y + p.h/2 + Math.sin(angle) * radius * 1.5;

                ctx.fillStyle = p.color || '#8B00FF';
                ctx.globalAlpha = 0.6;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            // Centre du portail animé
            ctx.fillStyle = p.color || '#8B00FF';
            ctx.globalAlpha = 0.4 + Math.sin(state.frameTick * 0.1) * 0.2;
            ctx.fillRect(p.x, p.y, p.w, p.h);
            ctx.globalAlpha = 1;

            // Particules magiques
            if (state.frameTick % 5 === 0) {
                const px = p.x + Math.random() * p.w;
                const py = p.y + Math.random() * p.h;
                ParticleSystem.emit(px, py, 'sparkle', 1);
            }

            // Texte indicatif
            if (p.isNetherPortal) {
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 16px Patrick Hand';
                ctx.fillText('→ NETHER', p.x + 5, p.y - 15);
            } else if (p.isReturnPortal) {
                ctx.fillStyle = '#00ff00';
                ctx.font = 'bold 16px Patrick Hand';
                ctx.fillText('← RETOUR', p.x + 5, p.y - 15);
            }
        } else {
            // Portail normal
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.ellipse(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.3 + Math.sin(state.frameTick * 0.1) * 0.1;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
}

function drawFireBars() {
    for (const fb of currentLevelData.fireBars) {
        const endX = fb.cx + Math.cos(fb.angle) * fb.length;
        const endY = fb.cy + Math.sin(fb.angle) * fb.length;
        
        // Barre
        ctx.strokeStyle = "#ff6600";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(fb.cx, fb.cy);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Boules de feu
        for (let i = 0; i <= 4; i++) {
            const px = fb.cx + (endX - fb.cx) * (i / 4);
            const py = fb.cy + (endY - fb.cy) * (i / 4);
            
            ctx.fillStyle = i % 2 === 0 ? "#ff3300" : "#ffcc00";
            ctx.beginPath();
            ctx.arc(px, py, 10 - i, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Centre
        ctx.fillStyle = "#555";
        ctx.beginPath();
        ctx.arc(fb.cx, fb.cy, 12, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawLadders() {
    for (const l of currentLevelData.ladders) {
        ctx.strokeStyle = state.level === 7 ? "#4444ff" : "#795548";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x, l.y + l.h);
        ctx.moveTo(l.x + l.w, l.y);
        ctx.lineTo(l.x + l.w, l.y + l.h);
        
        for (let i = 0; i < l.h; i += 30) {
            ctx.moveTo(l.x, l.y + i);
            ctx.lineTo(l.x + l.w, l.y + i);
        }
        ctx.stroke();
    }
}

function drawPlatforms() {
    for (const p of currentLevelData.platforms) {
        if (p.type === 'slide') continue;
        
        switch (p.type) {
            case 'slide_visual':
                ctx.fillStyle = "rgba(241, 196, 15, 0.8)";
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.w, p.y + p.h);
                ctx.lineTo(p.x, p.y + p.h);
                ctx.fill();
                ctx.strokeStyle = "#e67e22";
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.w, p.y + p.h);
                ctx.stroke();
                break;
                
            case 'moving':
                ctx.fillStyle = "#3498db";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#2980b9";
                ctx.lineWidth = 3;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = "white";
                ctx.fillRect(p.x + 5, p.y + 5, 5, 5);
                ctx.fillRect(p.x + p.w - 10, p.y + 5, 5, 5);
                break;
                
            case 'pipe':
                ctx.fillStyle = "#27ae60";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#1e8449";
                ctx.lineWidth = 4;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                ctx.fillRect(p.x - 5, p.y, p.w + 10, 30);
                ctx.strokeRect(p.x - 5, p.y, p.w + 10, 30);
                break;
                
            case 'brick_block':
                ctx.fillStyle = "#d35400";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                ctx.beginPath();
                ctx.moveTo(p.x, p.y + p.h / 2);
                ctx.lineTo(p.x + p.w, p.y + p.h / 2);
                ctx.moveTo(p.x + p.w / 2, p.y);
                ctx.lineTo(p.x + p.w / 2, p.y + p.h / 2);
                ctx.stroke();
                break;
                
            case 'brick_floor':
                ctx.fillStyle = "#c45d16";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = "#27ae60";
                ctx.fillRect(p.x, p.y, p.w, 10);
                break;
                
            case 'gold_block':
                ctx.fillStyle = "gold";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#333";
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = "#333";
                ctx.font = "bold 20px sans-serif";
                ctx.fillText("?", p.x + 12, p.y + 28);
                break;
                
            case 'castle':
                ctx.fillStyle = "#eee";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = "#333";
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h, 20, Math.PI, 0);
                ctx.fill();
                ctx.fillRect(p.x, p.y - 20, 20, 20);
                ctx.fillRect(p.x + p.w - 20, p.y - 20, 20, 20);
                break;
                
            case 'grass_block':
                ctx.fillStyle = "#8B4513";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = "#32CD32";
                ctx.fillRect(p.x, p.y, p.w, 15);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'dirt_block':
                ctx.fillStyle = "#5d4037";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 1;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'stone':
                ctx.fillStyle = "#757575";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'wood':
                ctx.fillStyle = "#5D4037";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'leaves':
                ctx.fillStyle = "#228B22";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'netherrack':
                ctx.fillStyle = "#800000";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'metal':
                ctx.fillStyle = "#7f8c8d";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#95a5a6";
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = "#333";
                ctx.beginPath();
                ctx.arc(p.x + 8, p.y + 8, 3, 0, Math.PI * 2);
                ctx.arc(p.x + p.w - 8, p.y + 8, 3, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'castle_wall':
                ctx.fillStyle = "#ff5722";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = "#bf360c";
                ctx.fillRect(p.x, p.y, 20, p.h);
                ctx.fillRect(p.x + p.w - 20, p.y, 20, p.h);
                ctx.strokeStyle = "#333";
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'smb2_grass':
                ctx.fillStyle = "#d82800";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = "#00c000";
                ctx.fillRect(p.x, p.y, p.w, 15);
                ctx.strokeStyle = "#333";
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'smb2_log':
                ctx.fillStyle = "#d8a080";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = "#5a3000";
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'jar':
                ctx.fillStyle = "#d82800";
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.w, p.y);
                ctx.lineTo(p.x + p.w - 5, p.y + p.h);
                ctx.lineTo(p.x + 5, p.y + p.h);
                ctx.fill();
                ctx.strokeStyle = "#333";
                ctx.stroke();
                ctx.fillStyle = "white";
                ctx.fillRect(p.x + 5, p.y + 10, p.w - 10, 10);
                break;
                
            case 'boss_floor':
                ctx.fillStyle = "#2d1b4e";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = "#9b59b6";
                ctx.fillRect(p.x, p.y, p.w, 5);
                // Motif
                for (let i = 0; i < p.w; i += 40) {
                    ctx.fillStyle = "#8e44ad";
                    ctx.fillRect(p.x + i, p.y + 5, 20, 10);
                }
                break;
            
            // === SONIC STYLE ===
            case 'sonic_ground':
                // Damier bleu style Green Hill Zone
                ctx.fillStyle = '#1a5276';
                ctx.fillRect(p.x, p.y, p.w, p.h);
                // Damier
                for (let i = 0; i < p.w; i += 40) {
                    for (let j = 0; j < p.h; j += 40) {
                        if ((Math.floor(i/40) + Math.floor(j/40)) % 2 === 0) {
                            ctx.fillStyle = '#2874a6';
                            ctx.fillRect(p.x + i, p.y + j, 40, 40);
                        }
                    }
                }
                // Bord supérieur doré
                ctx.fillStyle = '#f4d03f';
                ctx.fillRect(p.x, p.y, p.w, 8);
                break;
                
            case 'sonic_platform':
                ctx.fillStyle = '#2874a6';
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = '#f4d03f';
                ctx.fillRect(p.x, p.y, p.w, 5);
                ctx.strokeStyle = '#1a5276';
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'spring':
                // Base rouge
                ctx.fillStyle = '#e74c3c';
                ctx.fillRect(p.x, p.y + p.h/2, p.w, p.h/2);
                // Ressort jaune
                ctx.fillStyle = '#f1c40f';
                const springY = p.y + Math.sin(state.frameTick * 0.2) * 3;
                ctx.beginPath();
                ctx.ellipse(p.x + p.w/2, springY + 10, p.w/2 - 5, 12, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#d4ac0d';
                ctx.lineWidth = 3;
                ctx.stroke();
                // Flèche
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.moveTo(p.x + p.w/2, springY);
                ctx.lineTo(p.x + p.w/2 - 8, springY + 10);
                ctx.lineTo(p.x + p.w/2 + 8, springY + 10);
                ctx.fill();
                break;
                
            case 'speed_pad':
                // Flèches de boost
                ctx.fillStyle = '#e74c3c';
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = '#f1c40f';
                const arrowOffset = (state.frameTick * 2) % 30;
                for (let i = 0; i < 3; i++) {
                    const ax = p.x + 10 + i * 25 + arrowOffset;
                    if (ax < p.x + p.w - 10) {
                        ctx.beginPath();
                        ctx.moveTo(ax, p.y + p.h/2);
                        ctx.lineTo(ax - 8, p.y + 3);
                        ctx.lineTo(ax - 8, p.y + p.h - 3);
                        ctx.fill();
                    }
                }
                break;
                
            case 'boss_arena':
                // Sol d'arène épique
                ctx.fillStyle = '#1a0a2e';
                ctx.fillRect(p.x, p.y, p.w, p.h);
                // Motif violet
                for (let i = 0; i < p.w; i += 50) {
                    ctx.fillStyle = (Math.floor(i/50) % 2 === 0) ? '#2d1b4e' : '#1a0a2e';
                    ctx.fillRect(p.x + i, p.y, 50, p.h);
                }
                // Ligne dorée
                ctx.fillStyle = '#f4d03f';
                ctx.fillRect(p.x, p.y, p.w, 5);
                // Coins lumineux
                ctx.fillStyle = '#9b59b6';
                ctx.beginPath();
                ctx.arc(p.x + 30, p.y + 5, 15, 0, Math.PI * 2);
                ctx.arc(p.x + p.w - 30, p.y + 5, 15, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'boss_platform':
                ctx.fillStyle = '#8e44ad';
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.fillStyle = '#f4d03f';
                ctx.fillRect(p.x, p.y, p.w, 4);
                ctx.strokeStyle = '#6c3483';
                ctx.lineWidth = 2;
                ctx.strokeRect(p.x, p.y, p.w, p.h);
                break;
                
            case 'invisible_wall':
                // Ne rien dessiner
                break;
                
            default:
                ctx.fillStyle = state.level === 3 ? "#5d4037" : "#2c3e50";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.strokeStyle = state.level === 3 ? "#8d6e63" : "#27ae60";
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                for (let i = 0; i < p.w; i += 10) {
                    ctx.lineTo(p.x + i + 5, p.y - 5);
                    ctx.lineTo(p.x + i + 10, p.y);
                }
                ctx.stroke();
        }
    }
}

function drawCoins() {
    for (const c of currentLevelData.coins) {
        const wobble = Math.sin(state.frameTick * 0.1 + c.x) * 2;
        
        if (c.type === 'ring') {
            // Ring style Sonic !
            const rotation = state.frameTick * 0.1;
            const scaleX = Math.cos(rotation) * 0.8 + 0.2;
            
            ctx.save();
            ctx.translate(c.x + c.w/2, c.y + c.h/2 + wobble);
            ctx.scale(scaleX, 1);
            
            // Anneau doré
            ctx.strokeStyle = '#f4d03f';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, c.w/2, 0, Math.PI * 2);
            ctx.stroke();
            
            // Reflet
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, c.w/2 - 2, -0.5, 0.5);
            ctx.stroke();
            
            ctx.restore();
        } else {
            // Pièce normale
            ctx.fillStyle = "gold";
            ctx.beginPath();
            ctx.ellipse(c.x + c.w / 2, c.y + c.h / 2 + wobble, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = "#b8860b";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Brillance
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.beginPath();
            ctx.arc(c.x + c.w / 3, c.y + c.h / 3 + wobble, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawKey() {
    if (state.hasKey || !currentLevelData.keyItem) return;
    
    const k = currentLevelData.keyItem;
    const wobble = Math.sin(state.frameTick * 0.1) * 3;
    
    switch (k.type) {
        case 'diamond':
            ctx.fillStyle = "#00BFFF";
            ctx.beginPath();
            ctx.moveTo(k.x + k.w / 2, k.y + wobble);
            ctx.lineTo(k.x + k.w, k.y + k.h / 2 + wobble);
            ctx.lineTo(k.x + k.w / 2, k.y + k.h + wobble);
            ctx.lineTo(k.x, k.y + k.h / 2 + wobble);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.stroke();
            break;
            
        case 'turnip':
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(k.x + 15, k.y + 20 + wobble, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.moveTo(k.x + 15, k.y + 8 + wobble);
            ctx.lineTo(k.x + 5, k.y - 5 + wobble);
            ctx.lineTo(k.x + 25, k.y - 5 + wobble);
            ctx.fill();
            break;
            
        default:
            // Clé dorée standard
            ctx.fillStyle = "gold";
            ctx.beginPath();
            ctx.arc(k.x + 15, k.y + 10 + wobble, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(k.x + 12, k.y + 10 + wobble, 6, 25);
            ctx.fillRect(k.x + 12, k.y + 25 + wobble, 12, 5);
            ctx.fillRect(k.x + 12, k.y + 32 + wobble, 10, 5);
            
            // Brillance
            if (state.frameTick % 40 < 20) {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(k.x + 10, k.y + 5 + wobble, 3, 0, Math.PI * 2);
                ctx.fill();
            }
    }
}

function drawHazards() {
    for (const h of currentLevelData.hazards) {
        switch (h.type) {
            case 'spike':
                ctx.fillStyle = "#c0392b";
                ctx.beginPath();
                ctx.moveTo(h.x, h.y + h.h);
                ctx.lineTo(h.x + h.w / 2, h.y);
                ctx.lineTo(h.x + h.w, h.y + h.h);
                ctx.fill();
                ctx.strokeStyle = "#922b21";
                ctx.lineWidth = 2;
                ctx.stroke();
                break;
                
            case 'lava_floor':
                ctx.fillStyle = "#e74c3c";
                ctx.fillRect(h.x, h.y, h.w, h.h);
                // Bulles
                if (Math.random() < 0.1) {
                    ctx.fillStyle = "#f1c40f";
                    ctx.beginPath();
                    ctx.arc(h.x + Math.random() * 800, h.y + Math.random() * 20, 3 + Math.random() * 5, 0, Math.PI * 2);
                    ctx.fill();
                }
                break;
                
            case 'knight':
                // Chevalier médiéval amélioré !
                const knightCenterX = h.x + h.w / 2;

                // Corps en armure argentée avec reflets
                ctx.fillStyle = "#d0d0d0";
                ctx.fillRect(h.x + 5, h.y + 30, 30, 50);

                // Reflets sur l'armure
                ctx.fillStyle = "#f0f0f0";
                ctx.fillRect(h.x + 8, h.y + 35, 4, 20);

                // Tête avec casque
                ctx.fillStyle = "#b0b0b0";
                ctx.fillRect(h.x, h.y, h.w, 35);

                // Fente du casque (visière)
                ctx.fillStyle = "#000";
                ctx.fillRect(h.x + 8, h.y + 12, 24, 8);

                // Détails du casque (crête)
                ctx.fillStyle = "#ff4444";
                ctx.fillRect(h.x + h.w/2 - 2, h.y - 8, 4, 10);

                // Épaules
                ctx.fillStyle = "#909090";
                ctx.beginPath();
                ctx.arc(h.x + 5, h.y + 30, 8, 0, Math.PI * 2);
                ctx.arc(h.x + h.w - 5, h.y + 30, 8, 0, Math.PI * 2);
                ctx.fill();

                // Lance épique avec mouvement !
                const lanceAngle = Math.sin(state.frameTick * 0.05) * 0.1; // Légère oscillation
                const lanceLength = 60;

                // Manche de la lance (bois)
                ctx.strokeStyle = "#8B4513";
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(knightCenterX, h.y + 10);
                ctx.lineTo(knightCenterX + Math.sin(lanceAngle) * 5, h.y - lanceLength + 20);
                ctx.stroke();

                // Pointe de la lance (métal brillant)
                ctx.save();
                ctx.translate(knightCenterX + Math.sin(lanceAngle) * 5, h.y - lanceLength + 20);
                ctx.rotate(lanceAngle);

                // Pointe principale
                ctx.fillStyle = "#e0e0e0";
                ctx.beginPath();
                ctx.moveTo(0, -20);
                ctx.lineTo(-10, 0);
                ctx.lineTo(10, 0);
                ctx.closePath();
                ctx.fill();

                // Reflet sur la pointe
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.moveTo(0, -18);
                ctx.lineTo(-3, -8);
                ctx.lineTo(0, -10);
                ctx.closePath();
                ctx.fill();

                // Garde de la lance
                ctx.fillStyle = "#d4af37";
                ctx.fillRect(-12, -2, 24, 4);

                ctx.restore();

                // Ombre du chevalier
                ctx.fillStyle = "rgba(0,0,0,0.2)";
                ctx.beginPath();
                ctx.ellipse(knightCenterX, h.y + 82, 20, 6, 0, 0, Math.PI * 2);
                ctx.fill();

                break;
        }
    }
}

function drawEnemies() {
    for (const e of currentLevelData.enemies) {
        switch (e.type) {
            case 'zombie':
                // Corps
                ctx.fillStyle = "#2ecc71";
                ctx.fillRect(e.x, e.y, e.w, e.h);
                // Tête
                ctx.fillRect(e.x - 5, e.y - 20, e.w + 10, 30);
                // Yeux
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(e.x + 12, e.y - 5, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(e.x + 32, e.y - 5, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#333";
                ctx.beginPath();
                ctx.arc(e.x + 12, e.y - 5, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(e.x + 32, e.y - 5, 2, 0, Math.PI * 2);
                ctx.fill();
                // Texte
                ctx.fillStyle = "#333";
                ctx.font = "bold 16px 'Patrick Hand'";
                ctx.fillText("REEE!", e.x, e.y - 30);
                // Pieds animés
                ctx.fillStyle = "#27ae60";
                if (state.frameTick % 20 < 10) {
                    ctx.fillRect(e.x + 5, e.y + e.h, 10, 10);
                } else {
                    ctx.fillRect(e.x + e.w - 15, e.y + e.h, 10, 10);
                }
                break;
                
            case 'chest_monster':
                // Coffre
                ctx.fillStyle = "#8d6e63";
                ctx.fillRect(e.x, e.y, e.w, e.h);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.strokeRect(e.x, e.y, e.w, e.h);
                // Dents
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.moveTo(e.x, e.y + 20);
                for (let i = 0; i < e.w; i += 10) {
                    ctx.lineTo(e.x + i + 5, e.y + 30);
                    ctx.lineTo(e.x + i + 10, e.y + 20);
                }
                ctx.fill();
                // Yeux
                ctx.fillStyle = "#e74c3c";
                ctx.beginPath();
                ctx.arc(e.x + 15, e.y + 10, 5, 0, Math.PI * 2);
                ctx.arc(e.x + e.w - 15, e.y + 10, 5, 0, Math.PI * 2);
                ctx.fill();
                // Trident
                ctx.strokeStyle = "#e74c3c";
                ctx.lineWidth = 3;
                const tx = e.x + e.w + 10;
                const ty = e.y + e.h;
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(tx, ty - 50);
                ctx.moveTo(tx - 10, ty - 50);
                ctx.lineTo(tx + 10, ty - 50);
                ctx.moveTo(tx - 10, ty - 50);
                ctx.lineTo(tx - 10, ty - 65);
                ctx.moveTo(tx, ty - 50);
                ctx.lineTo(tx, ty - 70);
                ctx.moveTo(tx + 10, ty - 50);
                ctx.lineTo(tx + 10, ty - 65);
                ctx.stroke();
                break;
                
            case 'shy_guy':
                // Corps rouge
                ctx.fillStyle = "#e74c3c";
                ctx.fillRect(e.x, e.y, e.w, e.h);
                // Masque blanc
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(e.x + e.w / 2, e.y + 12, 12, 0, Math.PI * 2);
                ctx.fill();
                // Yeux et bouche
                ctx.fillStyle = "#333";
                ctx.beginPath();
                ctx.arc(e.x + e.w / 2 - 5, e.y + 10, 2, 0, Math.PI * 2);
                ctx.arc(e.x + e.w / 2 + 5, e.y + 10, 2, 0, Math.PI * 2);
                ctx.arc(e.x + e.w / 2, e.y + 18, 3, 0, Math.PI * 2);
                ctx.fill();
                // Pieds bleus
                ctx.fillStyle = "#3498db";
                if (state.frameTick % 20 < 10) {
                    ctx.fillRect(e.x, e.y + e.h - 5, 10, 5);
                } else {
                    ctx.fillRect(e.x + e.w - 10, e.y + e.h - 5, 10, 5);
                }
                break;
                
            case 'badnik':
                // Robot style Sonic - Motobug
                const bobble = Math.sin(state.frameTick * 0.2) * 2;
                
                // Corps métallique
                ctx.fillStyle = '#e74c3c';
                ctx.beginPath();
                ctx.ellipse(e.x + e.w/2, e.y + e.h/2 + bobble, e.w/2, e.h/2 - 5, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Yeux méchants
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.ellipse(e.x + 12, e.y + 12 + bobble, 8, 10, 0, 0, Math.PI * 2);
                ctx.ellipse(e.x + e.w - 12, e.y + 12 + bobble, 8, 10, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(e.x + 14, e.y + 14 + bobble, 4, 0, Math.PI * 2);
                ctx.arc(e.x + e.w - 10, e.y + 14 + bobble, 4, 0, Math.PI * 2);
                ctx.fill();
                
                // Antenne
                ctx.strokeStyle = '#7f8c8d';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(e.x + e.w/2, e.y + bobble);
                ctx.lineTo(e.x + e.w/2, e.y - 10 + bobble);
                ctx.stroke();
                ctx.fillStyle = '#f1c40f';
                ctx.beginPath();
                ctx.arc(e.x + e.w/2, e.y - 12 + bobble, 5, 0, Math.PI * 2);
                ctx.fill();
                
                // Roues
                ctx.fillStyle = '#2c3e50';
                ctx.beginPath();
                ctx.arc(e.x + 10, e.y + e.h, 8, 0, Math.PI * 2);
                ctx.arc(e.x + e.w - 10, e.y + e.h, 8, 0, Math.PI * 2);
                ctx.fill();
                break;
        }
    }
}

function drawBoss() {
    const boss = currentLevelData.boss;
    if (!boss || boss.hp <= 0) return;
    
    const flash = boss.invincible > 0 && boss.invincible % 10 < 5;
    const bossY = boss.y + (boss.floatY || 0);
    
    ctx.save();
    
    // Ombre au sol
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(boss.x + boss.w/2, canvas.height - 80, boss.w/2 + 10, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // === MACHINE VOLANTE DU BOSS ===
    
    // Partie inférieure (moteur)
    ctx.fillStyle = flash ? '#fff' : '#7f8c8d';
    ctx.beginPath();
    ctx.ellipse(boss.x + boss.w/2, bossY + boss.h - 20, boss.w/2, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#5d6d7e';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Flammes du réacteur
    const flameHeight = 20 + Math.random() * 15;
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(boss.x + boss.w/2 - 15, bossY + boss.h);
    ctx.lineTo(boss.x + boss.w/2, bossY + boss.h + flameHeight);
    ctx.lineTo(boss.x + boss.w/2 + 15, bossY + boss.h);
    ctx.fill();
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.moveTo(boss.x + boss.w/2 - 8, bossY + boss.h);
    ctx.lineTo(boss.x + boss.w/2, bossY + boss.h + flameHeight * 0.6);
    ctx.lineTo(boss.x + boss.w/2 + 8, bossY + boss.h);
    ctx.fill();
    
    // Cockpit (dôme)
    ctx.fillStyle = flash ? '#fff' : '#3498db';
    ctx.beginPath();
    ctx.arc(boss.x + boss.w/2, bossY + 40, 45, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Reflet du dôme
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(boss.x + boss.w/2, bossY + 40, 40, Math.PI * 1.2, Math.PI * 1.7);
    ctx.stroke();
    
    // === LE MÉCHANT DANS LE COCKPIT ===
    
    // Tête
    ctx.fillStyle = '#f5d0a9';
    ctx.beginPath();
    ctx.arc(boss.x + boss.w/2, bossY + 35, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Moustache épique
    ctx.fillStyle = '#c0392b';
    ctx.beginPath();
    ctx.ellipse(boss.x + boss.w/2, bossY + 45, 25, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Lunettes
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.ellipse(boss.x + boss.w/2 - 10, bossY + 30, 8, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(boss.x + boss.w/2 + 10, bossY + 30, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(boss.x + boss.w/2 - 10, bossY + 30, 3, 0, Math.PI * 2);
    ctx.arc(boss.x + boss.w/2 + 10, bossY + 30, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Nez
    ctx.fillStyle = '#e8b89a';
    ctx.beginPath();
    ctx.arc(boss.x + boss.w/2, bossY + 38, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Sourcils méchants
    ctx.strokeStyle = '#5d4037';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(boss.x + boss.w/2 - 18, bossY + 22);
    ctx.lineTo(boss.x + boss.w/2 - 5, bossY + 26);
    ctx.moveTo(boss.x + boss.w/2 + 18, bossY + 22);
    ctx.lineTo(boss.x + boss.w/2 + 5, bossY + 26);
    ctx.stroke();
    
    // === INDICATEURS DE PHASE ===
    
    // Aura de rage en phase 3
    if (boss.phase === 3) {
        ctx.strokeStyle = `rgba(231, 76, 60, ${0.3 + Math.sin(state.frameTick * 0.2) * 0.3})`;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(boss.x + boss.w/2, bossY + boss.h/2, boss.w/2 + 20, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Indicateur de charge (phase 2)
    if (boss.chargeTimer > 30) {
        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('!!!', boss.x + boss.w/2 - 15, bossY - 20);
    }
    
    // === BARRE DE VIE ===
    const hpBarWidth = 120;
    const hpBarHeight = 14;
    const hpX = boss.x + (boss.w - hpBarWidth) / 2;
    const hpY = bossY - 60;
    
    // Fond
    ctx.fillStyle = "#333";
    ctx.fillRect(hpX - 3, hpY - 3, hpBarWidth + 6, hpBarHeight + 6);
    
    // Barre rouge (vide)
    ctx.fillStyle = "#c0392b";
    ctx.fillRect(hpX, hpY, hpBarWidth, hpBarHeight);
    
    // Barre verte (pleine)
    const hpColor = boss.phase === 3 ? '#e74c3c' : boss.phase === 2 ? '#f39c12' : '#27ae60';
    ctx.fillStyle = hpColor;
    ctx.fillRect(hpX, hpY, (boss.hp / boss.maxHp) * hpBarWidth, hpBarHeight);
    
    // Texte phase
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`PHASE ${boss.phase}`, hpX, hpY - 8);
    
    ctx.restore();
}

function drawProjectiles() {
    for (const p of currentLevelData.projectiles) {
        switch (p.type) {
            case 'arrow':
                // Flèche médiévale améliorée !
                ctx.save();

                // Corps de la flèche (bois)
                ctx.fillStyle = "#8B4513";
                ctx.fillRect(p.x + 8, p.y + p.h/2 - 2, p.w - 8, 4);

                // Pointe de la flèche (métal brillant)
                ctx.fillStyle = "#d0d0d0";
                ctx.beginPath();
                ctx.moveTo(p.x, p.y + p.h / 2);
                ctx.lineTo(p.x + 12, p.y);
                ctx.lineTo(p.x + 12, p.y + p.h);
                ctx.closePath();
                ctx.fill();

                // Reflet sur la pointe
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.moveTo(p.x + 2, p.y + p.h / 2);
                ctx.lineTo(p.x + 8, p.y + 2);
                ctx.lineTo(p.x + 8, p.y + p.h / 2 - 1);
                ctx.closePath();
                ctx.fill();

                // Empennage (plumes rouges)
                ctx.fillStyle = "#e74c3c";
                ctx.beginPath();
                ctx.moveTo(p.x + p.w, p.y + p.h / 2);
                ctx.lineTo(p.x + p.w - 8, p.y);
                ctx.lineTo(p.x + p.w - 8, p.y + p.h);
                ctx.closePath();
                ctx.fill();

                // Deuxième plume (jaune)
                ctx.fillStyle = "#f1c40f";
                ctx.beginPath();
                ctx.moveTo(p.x + p.w - 3, p.y + p.h / 2);
                ctx.lineTo(p.x + p.w - 10, p.y + 2);
                ctx.lineTo(p.x + p.w - 10, p.y + p.h - 2);
                ctx.closePath();
                ctx.fill();

                // Traînée de mouvement
                if (Math.abs(p.speed) > 4) {
                    ctx.strokeStyle = "rgba(139, 69, 19, 0.3)";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(p.x + p.w, p.y + p.h/2);
                    ctx.lineTo(p.x + p.w + 10, p.y + p.h/2);
                    ctx.stroke();
                }

                ctx.restore();
                break;
                
            case 'fireball':
                ctx.fillStyle = "#ff6600";
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h / 2, 15, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#ffcc00";
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h / 2, 8, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'boss_fire':
                // Boule d'énergie violette
                ctx.fillStyle = "#9b59b6";
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#e74c3c";
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 4, 0, Math.PI * 2);
                ctx.fill();
                // Traînée
                ctx.strokeStyle = 'rgba(155, 89, 182, 0.5)';
                ctx.lineWidth = p.w / 2;
                ctx.beginPath();
                ctx.moveTo(p.x + p.w/2, p.y + p.h/2);
                ctx.lineTo(p.x + p.w/2 - (p.vx || 0) * 3, p.y + p.h/2 - (p.vy || 0) * 3);
                ctx.stroke();
                break;
                
            case 'boss_bomb':
                // Bombe qui tombe
                ctx.fillStyle = "#2c3e50";
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, 0, Math.PI * 2);
                ctx.fill();
                // Mèche
                ctx.strokeStyle = "#f39c12";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(p.x + p.w / 2, p.y);
                ctx.lineTo(p.x + p.w / 2 + 5, p.y - 10);
                ctx.stroke();
                // Étincelle
                if (state.frameTick % 10 < 5) {
                    ctx.fillStyle = "#e74c3c";
                    ctx.beginPath();
                    ctx.arc(p.x + p.w / 2 + 5, p.y - 12, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
                // Tête de mort
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(p.x + p.w/2 - 5, p.y + p.h/2 - 3, 4, 0, Math.PI * 2);
                ctx.arc(p.x + p.w/2 + 5, p.y + p.h/2 - 3, 4, 0, Math.PI * 2);
                ctx.fill();
                break;
        }
    }
}

function drawGoal() {
    if (!currentLevelData.goal) return;
    
    // Pas de goal au niveau boss
    if (LEVELS[state.level] && LEVELS[state.level].isBoss) return;
    
    const g = currentLevelData.goal;
    const levelDef = LEVELS[state.level];
    const needsKey = levelDef.needsKey !== false && state.level !== 3 && state.level !== 7 && state.level !== 9;
    
    // Niveau 8 : porte invisible sans clé
    if (state.level === 8 && !state.hasKey) {
        // Dessiner porte fermée
        ctx.fillStyle = "#d82800";
        ctx.fillRect(g.x, g.y, g.w, g.h);
        ctx.fillStyle = "#333";
        ctx.fillRect(g.x + 10, g.y + 60, 60, 2);
        // Yeux fermés
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(g.x + 20, g.y + 20, 8, 0, Math.PI * 2);
        ctx.arc(g.x + 60, g.y + 20, 8, 0, Math.PI * 2);
        ctx.fill();
        return;
    }
    
    switch (g.type) {
        case 'axe':
            ctx.fillStyle = "gold";
            ctx.fillRect(g.x, g.y, g.w, g.h);
            ctx.strokeStyle = "#333";
            ctx.strokeRect(g.x, g.y, g.w, g.h);
            ctx.fillStyle = "#333";
            ctx.font = "bold 20px sans-serif";
            ctx.fillText("FIN", g.x + 5, g.y + 35);
            break;
            
        case 'flag':
            ctx.fillStyle = "#27ae60";
            ctx.fillRect(g.x, g.y, 8, g.h);
            ctx.fillStyle = "gold";
            ctx.beginPath();
            ctx.arc(g.x + 4, g.y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#e74c3c";
            ctx.beginPath();
            ctx.moveTo(g.x + 8, g.y + 10);
            ctx.lineTo(g.x + 40, g.y + 25);
            ctx.lineTo(g.x + 8, g.y + 40);
            ctx.fill();
            break;
            
        case 'nether_portal':
            ctx.fillStyle = "#6a0dad";
            ctx.fillRect(g.x, g.y, g.w, g.h);
            ctx.strokeStyle = "#333";
            ctx.lineWidth = 4;
            ctx.strokeRect(g.x, g.y, g.w, g.h);
            // Animation
            ctx.fillStyle = `rgba(138, 43, 226, ${0.5 + Math.sin(state.frameTick * 0.1) * 0.3})`;
            ctx.fillRect(g.x + 5, g.y + 5, g.w - 10, g.h - 10);
            break;
            
        case 'bell':
            ctx.fillStyle = "gold";
            ctx.beginPath();
            ctx.arc(g.x + g.w / 2, g.y + g.h / 2, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#8B4513";
            ctx.fillRect(g.x + g.w / 2 - 5, g.y, 10, 20);
            ctx.strokeStyle = "#b8860b";
            ctx.lineWidth = 3;
            ctx.stroke();
            break;
            
        case 'hawkmouth':
            ctx.fillStyle = "#d82800";
            ctx.fillRect(g.x, g.y, g.w, g.h);
            // Bouche ouverte
            ctx.fillStyle = "#333";
            ctx.fillRect(g.x + 10, g.y + 40, 60, 60);
            // Yeux
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(g.x + 20, g.y + 20, 8, 0, Math.PI * 2);
            ctx.arc(g.x + 60, g.y + 20, 8, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        default:
            // Porte standard
            ctx.fillStyle = "#f1c40f";
            ctx.fillRect(g.x, g.y, g.w, g.h);
            ctx.strokeStyle = "#333";
            ctx.lineWidth = 3;
            ctx.strokeRect(g.x, g.y, g.w, g.h);
            
            // Texte
            ctx.fillStyle = "#333";
            ctx.font = "bold 18px 'Patrick Hand'";
            const nextLvl = state.level < 9 ? `NIV ${state.level + 1}` : "FIN";
            ctx.fillText(nextLvl, g.x + 10, g.y - 10);
            
            // Poignée
            ctx.beginPath();
            ctx.arc(g.x + g.w - 15, g.y + g.h / 2, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Cadenas si pas de clé
            if (!state.hasKey && needsKey) {
                ctx.fillStyle = "#c0392b";
                ctx.fillRect(g.x + 20, g.y + 30, 30, 30);
                ctx.fillStyle = "white";
                ctx.font = "24px sans-serif";
                ctx.fillText("🔒", g.x + 22, g.y + 55);
                
                if (Math.abs(player.x - g.x) < 100) {
                    ctx.fillStyle = "#c0392b";
                    ctx.font = "bold 20px 'Patrick Hand'";
                    ctx.fillText("IL FAUT LA CLÉ !", g.x - 40, g.y - 30);
                }
            }
    }
}

function drawPowerups() {
    for (const p of currentLevelData.powerups) {
        const float = Math.sin(state.frameTick * 0.1 + p.x) * 5;
        const glow = 0.3 + Math.sin(state.frameTick * 0.15) * 0.2;

        ctx.save();
        ctx.translate(p.x + p.w/2, p.y + p.h/2 + float);

        // Aura lumineuse
        ctx.globalAlpha = glow;
        ctx.fillStyle = getPowerupColor(p.type);
        ctx.beginPath();
        ctx.arc(0, 0, p.w/2 + 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Icône du power-up
        drawPowerupIcon(p.type, -p.w/2, -p.h/2, p.w, p.h);

        // Particules autour
        if (state.frameTick % 15 === 0) {
            const angle = Math.random() * Math.PI * 2;
            const dist = p.w/2 + 15;
            ParticleSystem.emit(
                p.x + p.w/2 + Math.cos(angle) * dist,
                p.y + p.h/2 + Math.sin(angle) * dist,
                'sparkle',
                1
            );
        }

        ctx.restore();
    }

    // Afficher les icônes des power-ups actifs sur le joueur
    let iconY = canvas.height - 120;
    if (state.powerups.shield > 0) {
        drawPowerupIndicator('shield', 20, iconY, state.powerups.shield);
        iconY -= 50;
    }
    if (state.powerups.superJump > 0) {
        drawPowerupIndicator('super_jump', 20, iconY, state.powerups.superJump);
        iconY -= 50;
    }
    if (state.powerups.magnet > 0) {
        drawPowerupIndicator('magnet', 20, iconY, state.powerups.magnet);
        iconY -= 50;
    }
    if (state.powerups.star > 0) {
        drawPowerupIndicator('star', 20, iconY, state.powerups.star);
        iconY -= 50;
    }
}

function getPowerupColor(type) {
    switch(type) {
        case 'shield': return '#3498db';
        case 'super_jump': return '#e74c3c';
        case 'magnet': return '#f39c12';
        case 'star': return '#f1c40f';
        default: return '#fff';
    }
}

function drawPowerupIcon(type, x, y, w, h) {
    ctx.save();
    ctx.translate(x + w/2, y + h/2);

    switch(type) {
        case 'shield':
            // Bouclier bleu
            ctx.fillStyle = '#3498db';
            ctx.strokeStyle = '#2980b9';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, -h/2);
            ctx.lineTo(w/2 - 5, -h/4);
            ctx.lineTo(w/2 - 5, h/4);
            ctx.lineTo(0, h/2);
            ctx.lineTo(-w/2 + 5, h/4);
            ctx.lineTo(-w/2 + 5, -h/4);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Croix
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(0, -h/4);
            ctx.lineTo(0, h/4);
            ctx.moveTo(-w/4, 0);
            ctx.lineTo(w/4, 0);
            ctx.stroke();
            break;

        case 'super_jump':
            // Fusée rouge
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.moveTo(0, -h/2);
            ctx.lineTo(w/3, h/4);
            ctx.lineTo(0, h/6);
            ctx.lineTo(-w/3, h/4);
            ctx.closePath();
            ctx.fill();
            // Flamme
            ctx.fillStyle = '#f39c12';
            ctx.beginPath();
            ctx.moveTo(-w/4, h/4);
            ctx.lineTo(0, h/2);
            ctx.lineTo(w/4, h/4);
            ctx.fill();
            // Étoile
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText('↑', -5, 5);
            break;

        case 'magnet':
            // Aimant
            ctx.strokeStyle = '#e74c3c';
            ctx.fillStyle = '#e74c3c';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.arc(-w/4, 0, w/4, Math.PI, 0);
            ctx.stroke();
            ctx.strokeStyle = '#3498db';
            ctx.fillStyle = '#3498db';
            ctx.beginPath();
            ctx.arc(w/4, 0, w/4, Math.PI, 0);
            ctx.stroke();
            // Traits de force
            for (let i = 0; i < 3; i++) {
                ctx.strokeStyle = '#f39c12';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-w/2 - 5, -h/4 + i * 10);
                ctx.lineTo(-w/2 - 10, -h/4 + i * 10);
                ctx.moveTo(w/2 + 5, -h/4 + i * 10);
                ctx.lineTo(w/2 + 10, -h/4 + i * 10);
                ctx.stroke();
            }
            break;

        case 'star':
            // Étoile dorée
            ctx.fillStyle = '#f1c40f';
            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI / 5) - Math.PI/2;
                const radius = i % 2 === 0 ? w/2 : w/4;
                const px = Math.cos(angle) * radius;
                const py = Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Brillance
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(-w/6, -h/6, w/8, 0, Math.PI * 2);
            ctx.fill();
            break;
    }

    ctx.restore();
}

function drawPowerupIndicator(type, x, y, timer) {
    const size = 40;
    const typeKey = type === 'super_jump' ? 'SUPER_JUMP' : type.toUpperCase();
    const maxTime = CONFIG.POWERUP_DURATION[typeKey];
    const progress = timer / maxTime;

    // Fond semi-transparent
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(x, y, size + 10, size + 10);

    // Icône
    drawPowerupIcon(type, x + 5, y + 5, size, size);

    // Barre de progression
    ctx.strokeStyle = getPowerupColor(type);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x + size/2 + 5, y + size/2 + 5, size/2 + 8, -Math.PI/2, -Math.PI/2 + (progress * Math.PI * 2));
    ctx.stroke();

    // Timer
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(Math.ceil(timer / 60), x + size - 5, y + size + 20);
}
