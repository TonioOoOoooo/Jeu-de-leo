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
    
    // Nuages
    if (currentLevelData.clouds && currentLevelData.clouds.length > 0) {
        drawClouds();
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
                ctx.fillStyle = "#c0c0c0";
                ctx.fillRect(h.x, h.y, h.w, 30);
                ctx.fillRect(h.x + 10, h.y + 30, 20, 50);
                ctx.fillStyle = "#333";
                ctx.fillRect(h.x + 10, h.y + 5, 20, 5);
                // Lance
                ctx.strokeStyle = "#8B4513";
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(h.x + h.w / 2, h.y);
                ctx.lineTo(h.x + h.w / 2, h.y - 40);
                ctx.stroke();
                ctx.fillStyle = "#7f8c8d";
                ctx.beginPath();
                ctx.moveTo(h.x + h.w / 2, h.y - 40);
                ctx.lineTo(h.x + h.w / 2 - 8, h.y - 25);
                ctx.lineTo(h.x + h.w / 2 + 8, h.y - 25);
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
        }
    }
}

function drawBoss() {
    const boss = currentLevelData.boss;
    if (!boss || boss.hp <= 0) return;
    
    const flash = boss.invincible > 0 && boss.invincible % 10 < 5;
    
    ctx.save();
    
    // Corps principal
    ctx.fillStyle = flash ? "#fff" : "#9b59b6";
    ctx.fillRect(boss.x, boss.y, boss.w, boss.h);
    
    // Contour
    ctx.strokeStyle = "#6c3483";
    ctx.lineWidth = 5;
    ctx.strokeRect(boss.x, boss.y, boss.w, boss.h);
    
    // Couronne
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.moveTo(boss.x + 20, boss.y);
    ctx.lineTo(boss.x + 40, boss.y - 30);
    ctx.lineTo(boss.x + 60, boss.y);
    ctx.lineTo(boss.x + 80, boss.y - 40);
    ctx.lineTo(boss.x + 100, boss.y);
    ctx.lineTo(boss.x + 120, boss.y - 30);
    ctx.lineTo(boss.x + 130, boss.y);
    ctx.fill();
    
    // Yeux
    ctx.fillStyle = boss.phase === 2 ? "#e74c3c" : "white";
    ctx.beginPath();
    ctx.arc(boss.x + 45, boss.y + 60, 20, 0, Math.PI * 2);
    ctx.arc(boss.x + 105, boss.y + 60, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(boss.x + 45, boss.y + 60, 8, 0, Math.PI * 2);
    ctx.arc(boss.x + 105, boss.y + 60, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Bouche méchante
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(boss.x + 40, boss.y + 120);
    ctx.lineTo(boss.x + 55, boss.y + 100);
    ctx.lineTo(boss.x + 75, boss.y + 120);
    ctx.lineTo(boss.x + 95, boss.y + 100);
    ctx.lineTo(boss.x + 110, boss.y + 120);
    ctx.stroke();
    
    // Barre de vie
    const hpBarWidth = 100;
    const hpBarHeight = 12;
    const hpX = boss.x + (boss.w - hpBarWidth) / 2;
    const hpY = boss.y - 50;
    
    ctx.fillStyle = "#333";
    ctx.fillRect(hpX - 2, hpY - 2, hpBarWidth + 4, hpBarHeight + 4);
    
    ctx.fillStyle = "#c0392b";
    ctx.fillRect(hpX, hpY, hpBarWidth, hpBarHeight);
    
    ctx.fillStyle = "#27ae60";
    ctx.fillRect(hpX, hpY, (boss.hp / boss.maxHp) * hpBarWidth, hpBarHeight);
    
    ctx.restore();
}

function drawProjectiles() {
    for (const p of currentLevelData.projectiles) {
        switch (p.type) {
            case 'arrow':
                ctx.fillStyle = "white";
                ctx.fillRect(p.x, p.y, p.w, p.h);
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x - 10, p.y + p.h / 2);
                ctx.lineTo(p.x, p.y + p.h);
                ctx.fill();
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
                ctx.fillStyle = "#9b59b6";
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#e74c3c";
                ctx.beginPath();
                ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 4, 0, Math.PI * 2);
                ctx.fill();
                break;
        }
    }
}

function drawGoal() {
    if (!currentLevelData.goal) return;
    
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
