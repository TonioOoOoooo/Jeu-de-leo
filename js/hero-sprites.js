// ============================================================
// L'AVENTURE DE LÉO - HÉROS PAR NIVEAU
// Sprites différents selon le niveau joué
// ============================================================

// ===== NIVEAU 1-2 : LÉO (petit garçon) =====
function drawHeroLeo(ctx, p) {
    const cx = p.x + p.w / 2;
    const cy = p.y + p.h / 2;

    // Corps (couleur personnalisée !)
    ctx.fillStyle = state.playerColor || '#3498db';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 5, p.w / 2 - 2, p.h / 2 - 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tête
    ctx.fillStyle = '#f5d0a9';
    ctx.beginPath();
    ctx.arc(cx, p.y + 12, 14, 0, Math.PI * 2);
    ctx.fill();

    // Cheveux
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.arc(cx, p.y + 6, 12, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(cx - 10, p.y + 2, 20, 8);

    // Yeux
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(cx - 5, p.y + 12, 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 5, p.y + 12, 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(cx - 4, p.y + 13, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 6, p.y + 13, 2, 0, Math.PI * 2);
    ctx.fill();

    // Sourire
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, p.y + 16, 5, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Bras (animation)
    ctx.fillStyle = state.playerColor || '#3498db';
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 15 : 5);

    ctx.save();
    ctx.translate(p.x + 5, p.y + 25);
    ctx.rotate((-20 + armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 18);
    ctx.restore();

    ctx.save();
    ctx.translate(p.x + p.w - 5, p.y + 25);
    ctx.rotate((20 - armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 18);
    ctx.restore();

    // Mains
    ctx.fillStyle = '#f5d0a9';
    ctx.beginPath();
    ctx.arc(p.x + 5 + Math.sin((-20 + armSwing) * Math.PI / 180) * 18,
            p.y + 25 + Math.cos((-20 + armSwing) * Math.PI / 180) * 18, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x + p.w - 5 + Math.sin((20 - armSwing) * Math.PI / 180) * 18,
            p.y + 25 + Math.cos((20 - armSwing) * Math.PI / 180) * 18, 4, 0, Math.PI * 2);
    ctx.fill();

    // Jambes
    ctx.fillStyle = '#2c3e50';
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 20 : 0);

    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 10, p.y + p.h - 15, 8, 12);
        ctx.fillRect(cx + 2, p.y + p.h - 15, 8, 12);
    } else {
        ctx.save();
        ctx.translate(cx - 6, p.y + p.h - 18);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 8, 18);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 6, p.y + p.h - 18);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 8, 18);
        ctx.restore();
    }

    // Chaussures
    ctx.fillStyle = '#c0392b';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 12, p.y + p.h - 5, 10, 5);
        ctx.fillRect(cx + 2, p.y + p.h - 5, 10, 5);
    } else {
        const leftFootX = cx - 6 + Math.sin(legSwing * Math.PI / 180) * 18;
        const rightFootX = cx + 6 + Math.sin(-legSwing * Math.PI / 180) * 18;
        ctx.fillRect(leftFootX - 6, p.y + p.h - 2, 10, 5);
        ctx.fillRect(rightFootX - 4, p.y + p.h - 2, 10, 5);
    }
}

// ===== NIVEAU 3 : SUPER MARIO BROS =====
function drawHeroMario(ctx, p) {
    const cx = p.x + p.w / 2;
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 15 : 5);
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 20 : 0);

    // Casquette rouge Mario
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(cx, p.y + 8, 14, Math.PI, 0);
    ctx.fill();
    // Visière de la casquette
    ctx.fillRect(cx - 2, p.y + 2, 16, 5);
    // Lettre M sur la casquette
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - 2, p.y + 6, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 8px Arial';
    ctx.fillText('M', cx - 5, p.y + 9);

    // Tête / visage
    ctx.fillStyle = '#f5c6a0';
    ctx.beginPath();
    ctx.arc(cx, p.y + 14, 12, 0, Math.PI * 2);
    ctx.fill();

    // Moustache
    ctx.fillStyle = '#4a2800';
    ctx.beginPath();
    ctx.ellipse(cx, p.y + 19, 10, 3, 0, 0, Math.PI);
    ctx.fill();

    // Nez
    ctx.fillStyle = '#e8a87c';
    ctx.beginPath();
    ctx.arc(cx + 3, p.y + 16, 4, 0, Math.PI * 2);
    ctx.fill();

    // Yeux
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(cx - 4, p.y + 12, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 4, p.y + 12, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.arc(cx - 3, p.y + 13, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 5, p.y + 13, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Salopette bleue (corps)
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(cx - 12, p.y + 25, 24, 14);
    // Bretelles
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(cx - 10, p.y + 22, 6, 6);
    ctx.fillRect(cx + 4, p.y + 22, 6, 6);
    // Boutons dorés des bretelles
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.arc(cx - 7, p.y + 27, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 7, p.y + 27, 2, 0, Math.PI * 2);
    ctx.fill();

    // T-shirt rouge sous la salopette
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(cx - 14, p.y + 22, 4, 10);
    ctx.fillRect(cx + 10, p.y + 22, 4, 10);

    // Bras rouges
    ctx.fillStyle = '#e74c3c';
    ctx.save();
    ctx.translate(p.x + 3, p.y + 24);
    ctx.rotate((-20 + armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 16);
    ctx.restore();

    ctx.save();
    ctx.translate(p.x + p.w - 3, p.y + 24);
    ctx.rotate((20 - armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 16);
    ctx.restore();

    // Gants blancs
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(p.x + 3 + Math.sin((-20 + armSwing) * Math.PI / 180) * 16,
            p.y + 24 + Math.cos((-20 + armSwing) * Math.PI / 180) * 16, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x + p.w - 3 + Math.sin((20 - armSwing) * Math.PI / 180) * 16,
            p.y + 24 + Math.cos((20 - armSwing) * Math.PI / 180) * 16, 4, 0, Math.PI * 2);
    ctx.fill();

    // Jambes bleues
    ctx.fillStyle = '#2980b9';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 10, p.y + p.h - 14, 8, 11);
        ctx.fillRect(cx + 2, p.y + p.h - 14, 8, 11);
    } else {
        ctx.save();
        ctx.translate(cx - 6, p.y + p.h - 16);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 8, 16);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 6, p.y + p.h - 16);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 8, 16);
        ctx.restore();
    }

    // Chaussures marron
    ctx.fillStyle = '#8B4513';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 12, p.y + p.h - 5, 11, 5);
        ctx.fillRect(cx + 2, p.y + p.h - 5, 11, 5);
    } else {
        const leftFootX = cx - 6 + Math.sin(legSwing * Math.PI / 180) * 16;
        const rightFootX = cx + 6 + Math.sin(-legSwing * Math.PI / 180) * 16;
        ctx.fillRect(leftFootX - 6, p.y + p.h - 3, 12, 5);
        ctx.fillRect(rightFootX - 5, p.y + p.h - 3, 12, 5);
    }
}

// ===== NIVEAU 4 : LUIGI =====
function drawHeroLuigi(ctx, p) {
    const cx = p.x + p.w / 2;
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 15 : 5);
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 20 : 0);

    // Casquette verte Luigi
    ctx.fillStyle = '#27ae60';
    ctx.beginPath();
    ctx.arc(cx, p.y + 8, 14, Math.PI, 0);
    ctx.fill();
    // Visière
    ctx.fillRect(cx - 2, p.y + 2, 16, 5);
    // Lettre L
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - 2, p.y + 6, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#27ae60';
    ctx.font = 'bold 8px Arial';
    ctx.fillText('L', cx - 4, p.y + 9);

    // Tête / visage (Luigi plus mince)
    ctx.fillStyle = '#f5c6a0';
    ctx.beginPath();
    ctx.arc(cx, p.y + 14, 11, 0, Math.PI * 2);
    ctx.fill();

    // Moustache (plus fine que Mario)
    ctx.fillStyle = '#4a2800';
    ctx.beginPath();
    ctx.ellipse(cx, p.y + 19, 8, 2, 0, 0, Math.PI);
    ctx.fill();

    // Nez
    ctx.fillStyle = '#e8a87c';
    ctx.beginPath();
    ctx.arc(cx + 3, p.y + 16, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Yeux (Luigi a des yeux plus grands)
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(cx - 4, p.y + 12, 3.5, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 4, p.y + 12, 3.5, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.arc(cx - 3, p.y + 13, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 5, p.y + 13, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Salopette bleu foncé
    ctx.fillStyle = '#1a5276';
    ctx.fillRect(cx - 11, p.y + 25, 22, 14);
    // Bretelles
    ctx.fillRect(cx - 9, p.y + 22, 5, 6);
    ctx.fillRect(cx + 4, p.y + 22, 5, 6);
    // Boutons dorés
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.arc(cx - 7, p.y + 27, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 7, p.y + 27, 2, 0, Math.PI * 2);
    ctx.fill();

    // T-shirt vert
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(cx - 14, p.y + 22, 5, 10);
    ctx.fillRect(cx + 9, p.y + 22, 5, 10);

    // Bras verts
    ctx.fillStyle = '#27ae60';
    ctx.save();
    ctx.translate(p.x + 3, p.y + 24);
    ctx.rotate((-20 + armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 16);
    ctx.restore();

    ctx.save();
    ctx.translate(p.x + p.w - 3, p.y + 24);
    ctx.rotate((20 - armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 16);
    ctx.restore();

    // Gants blancs
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(p.x + 3 + Math.sin((-20 + armSwing) * Math.PI / 180) * 16,
            p.y + 24 + Math.cos((-20 + armSwing) * Math.PI / 180) * 16, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x + p.w - 3 + Math.sin((20 - armSwing) * Math.PI / 180) * 16,
            p.y + 24 + Math.cos((20 - armSwing) * Math.PI / 180) * 16, 4, 0, Math.PI * 2);
    ctx.fill();

    // Jambes bleu foncé
    ctx.fillStyle = '#1a5276';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 9, p.y + p.h - 14, 7, 11);
        ctx.fillRect(cx + 2, p.y + p.h - 14, 7, 11);
    } else {
        ctx.save();
        ctx.translate(cx - 5, p.y + p.h - 16);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 7, 16);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 5, p.y + p.h - 16);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 7, 16);
        ctx.restore();
    }

    // Chaussures marron
    ctx.fillStyle = '#6d4c2a';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 11, p.y + p.h - 5, 10, 5);
        ctx.fillRect(cx + 2, p.y + p.h - 5, 10, 5);
    } else {
        const leftFootX = cx - 5 + Math.sin(legSwing * Math.PI / 180) * 16;
        const rightFootX = cx + 5 + Math.sin(-legSwing * Math.PI / 180) * 16;
        ctx.fillRect(leftFootX - 6, p.y + p.h - 3, 11, 5);
        ctx.fillRect(rightFootX - 5, p.y + p.h - 3, 11, 5);
    }
}

// ===== NIVEAU 5 : STEVE (Minecraft) =====
function drawHeroSteve(ctx, p) {
    const cx = p.x + p.w / 2;
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 15 : 5);
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 20 : 0);

    // Steve est très "blocky" - tout en rectangles comme Minecraft

    // Tête carrée (plus large)
    ctx.fillStyle = '#c69c6d'; // peau
    ctx.fillRect(cx - 10, p.y, 20, 20);

    // Cheveux (haut et côtés de la tête)
    ctx.fillStyle = '#3b2213';
    ctx.fillRect(cx - 10, p.y, 20, 6);
    ctx.fillRect(cx - 10, p.y, 3, 14);
    ctx.fillRect(cx + 7, p.y, 3, 14);

    // Yeux blancs
    ctx.fillStyle = 'white';
    ctx.fillRect(cx - 7, p.y + 8, 5, 4);
    ctx.fillRect(cx + 2, p.y + 8, 5, 4);

    // Pupilles bleues (Steve a des yeux bleus)
    ctx.fillStyle = '#3498db';
    ctx.fillRect(cx - 5, p.y + 9, 3, 3);
    ctx.fillRect(cx + 4, p.y + 9, 3, 3);

    // Nez
    ctx.fillStyle = '#a0785a';
    ctx.fillRect(cx - 1, p.y + 12, 3, 3);

    // Bouche
    ctx.fillStyle = '#8b6b4a';
    ctx.fillRect(cx - 4, p.y + 16, 8, 2);

    // Barbe/goatee sombre
    ctx.fillStyle = '#5a3a1a';
    ctx.fillRect(cx - 3, p.y + 16, 6, 3);

    // Corps - T-shirt bleu cyan
    ctx.fillStyle = '#00a8a8';
    ctx.fillRect(cx - 10, p.y + 20, 20, 14);

    // Bras (animation) - T-shirt couleur
    ctx.fillStyle = '#00a8a8';
    ctx.save();
    ctx.translate(p.x + 3, p.y + 21);
    ctx.rotate((-15 + armSwing) * Math.PI / 180);
    ctx.fillRect(-4, 0, 6, 14);
    // Main peau
    ctx.fillStyle = '#c69c6d';
    ctx.fillRect(-4, 14, 6, 4);
    ctx.restore();

    ctx.fillStyle = '#00a8a8';
    ctx.save();
    ctx.translate(p.x + p.w - 3, p.y + 21);
    ctx.rotate((15 - armSwing) * Math.PI / 180);
    ctx.fillRect(-2, 0, 6, 14);
    // Main peau
    ctx.fillStyle = '#c69c6d';
    ctx.fillRect(-2, 14, 6, 4);
    ctx.restore();

    // Pantalon bleu foncé (comme le jean de Steve)
    ctx.fillStyle = '#2c3e80';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 9, p.y + p.h - 16, 8, 12);
        ctx.fillRect(cx + 1, p.y + p.h - 16, 8, 12);
    } else {
        ctx.save();
        ctx.translate(cx - 5, p.y + p.h - 16);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 8, 16);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 5, p.y + p.h - 16);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 8, 16);
        ctx.restore();
    }

    // Chaussures grises
    ctx.fillStyle = '#5d5d5d';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 10, p.y + p.h - 5, 9, 5);
        ctx.fillRect(cx + 1, p.y + p.h - 5, 9, 5);
    } else {
        const leftFootX = cx - 5 + Math.sin(legSwing * Math.PI / 180) * 16;
        const rightFootX = cx + 5 + Math.sin(-legSwing * Math.PI / 180) * 16;
        ctx.fillRect(leftFootX - 5, p.y + p.h - 3, 10, 5);
        ctx.fillRect(rightFootX - 4, p.y + p.h - 3, 10, 5);
    }
}

// ===== NIVEAU 6 : ROBOT PORTAL 2 (Atlas) =====
function drawHeroPortalRobot(ctx, p) {
    const cx = p.x + p.w / 2;
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 12 : 4);
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 18 : 0);
    const bobble = Math.sin(p.animFrame * 0.15) * 2;

    // Antenne sur la tête
    ctx.strokeStyle = '#7f8c8d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, p.y + 5);
    ctx.lineTo(cx, p.y - 5);
    ctx.stroke();
    // Lumière d'antenne
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    ctx.arc(cx, p.y - 6, 3, 0, Math.PI * 2);
    ctx.fill();
    // Glow de l'antenne
    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.beginPath();
    ctx.arc(cx, p.y - 6, 6, 0, Math.PI * 2);
    ctx.fill();

    // Tête ronde robotique
    ctx.fillStyle = '#ecf0f1';
    ctx.beginPath();
    ctx.arc(cx, p.y + 12, 13, 0, Math.PI * 2);
    ctx.fill();
    // Bordure tête
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, p.y + 12, 13, 0, Math.PI * 2);
    ctx.stroke();

    // Oeil unique (style Portal - orange/bleu)
    const eyeGlow = Math.sin(state.frameTick * 0.1) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(241, 196, 15, ${eyeGlow})`;
    ctx.beginPath();
    ctx.ellipse(cx, p.y + 12, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Pupille
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.ellipse(cx + 1, p.y + 12, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    // Reflet oeil
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath();
    ctx.arc(cx - 2, p.y + 10, 2, 0, Math.PI * 2);
    ctx.fill();

    // Corps robotique (torse)
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(cx - 11, p.y + 24, 22, 12);
    // Détails du torse - plaque bleue Aperture
    ctx.fillStyle = '#3498db';
    ctx.fillRect(cx - 7, p.y + 26, 14, 8);
    // Lignes du torse
    ctx.strokeStyle = '#95a5a6';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 11, p.y + 30);
    ctx.lineTo(cx + 11, p.y + 30);
    ctx.stroke();

    // Cou
    ctx.fillStyle = '#95a5a6';
    ctx.fillRect(cx - 4, p.y + 22, 8, 4);

    // Bras robotiques (avec articulations)
    ctx.fillStyle = '#bdc3c7';
    // Bras gauche
    ctx.save();
    ctx.translate(p.x + 3, p.y + 25);
    ctx.rotate((-15 + armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 5, 7);
    // Articulation
    ctx.fillStyle = '#7f8c8d';
    ctx.beginPath();
    ctx.arc(0, 7, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#bdc3c7';
    ctx.fillRect(-3, 7, 5, 7);
    // Pince
    ctx.fillStyle = '#7f8c8d';
    ctx.fillRect(-4, 14, 3, 5);
    ctx.fillRect(1, 14, 3, 5);
    ctx.restore();

    // Bras droit
    ctx.fillStyle = '#bdc3c7';
    ctx.save();
    ctx.translate(p.x + p.w - 3, p.y + 25);
    ctx.rotate((15 - armSwing) * Math.PI / 180);
    ctx.fillRect(-2, 0, 5, 7);
    ctx.fillStyle = '#7f8c8d';
    ctx.beginPath();
    ctx.arc(1, 7, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#bdc3c7';
    ctx.fillRect(-2, 7, 5, 7);
    ctx.fillStyle = '#7f8c8d';
    ctx.fillRect(-3, 14, 3, 5);
    ctx.fillRect(2, 14, 3, 5);
    ctx.restore();

    // Jambes robotiques
    ctx.fillStyle = '#bdc3c7';
    if (!p.grounded && p.vy < 0) {
        // Saut : pieds propulseurs
        ctx.fillRect(cx - 8, p.y + p.h - 14, 6, 10);
        ctx.fillRect(cx + 2, p.y + p.h - 14, 6, 10);
        // Flammes de propulsion
        ctx.fillStyle = '#e67e22';
        ctx.globalAlpha = 0.7 + Math.random() * 0.3;
        ctx.beginPath();
        ctx.moveTo(cx - 7, p.y + p.h - 4);
        ctx.lineTo(cx - 5, p.y + p.h + 4 + Math.random() * 4);
        ctx.lineTo(cx - 3, p.y + p.h - 4);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx + 3, p.y + p.h - 4);
        ctx.lineTo(cx + 5, p.y + p.h + 4 + Math.random() * 4);
        ctx.lineTo(cx + 7, p.y + p.h - 4);
        ctx.fill();
        ctx.globalAlpha = 1;
    } else {
        ctx.save();
        ctx.translate(cx - 5, p.y + p.h - 16);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 6, 8);
        // Articulation genou
        ctx.fillStyle = '#7f8c8d';
        ctx.beginPath();
        ctx.arc(0, 8, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(-3, 8, 6, 8);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 5, p.y + p.h - 16);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 6, 8);
        ctx.fillStyle = '#7f8c8d';
        ctx.beginPath();
        ctx.arc(0, 8, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(-3, 8, 6, 8);
        ctx.restore();
    }

    // Pieds-bottes robotiques
    ctx.fillStyle = '#7f8c8d';
    if (!p.grounded && p.vy < 0) {
        // déjà dessiné dans la section saut
    } else {
        const leftFootX = cx - 5 + Math.sin(legSwing * Math.PI / 180) * 16;
        const rightFootX = cx + 5 + Math.sin(-legSwing * Math.PI / 180) * 16;
        ctx.fillRect(leftFootX - 5, p.y + p.h - 3, 10, 5);
        ctx.fillRect(rightFootX - 4, p.y + p.h - 3, 10, 5);
        // Spring heel (détail Portal)
        ctx.strokeStyle = '#95a5a6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(leftFootX - 2, p.y + p.h + 2);
        ctx.lineTo(leftFootX + 4, p.y + p.h + 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(rightFootX - 1, p.y + p.h + 2);
        ctx.lineTo(rightFootX + 5, p.y + p.h + 2);
        ctx.stroke();
    }
}

// ===== NIVEAU 7 : HUNCHBACK (Amstrad CPC) =====
function drawHeroHunchback(ctx, p) {
    const cx = p.x + p.w / 2;
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 15 : 5);
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 20 : 0);

    // Style rétro Amstrad CPC - Quasimodo (couleurs vives, formes simples)

    // Chapeau/bonnet bossu
    ctx.fillStyle = '#8e44ad'; // Violet comme sur CPC
    ctx.beginPath();
    ctx.arc(cx, p.y + 5, 10, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(cx - 10, p.y + 5, 20, 4);
    // Clochette au sommet
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.arc(cx, p.y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Tête ronde
    ctx.fillStyle = '#f5d0a9';
    ctx.beginPath();
    ctx.arc(cx, p.y + 14, 11, 0, Math.PI * 2);
    ctx.fill();

    // Yeux (style CPC : grands et simples)
    ctx.fillStyle = 'white';
    ctx.fillRect(cx - 7, p.y + 10, 5, 6);
    ctx.fillRect(cx + 2, p.y + 10, 5, 6);
    ctx.fillStyle = '#000';
    ctx.fillRect(cx - 5, p.y + 12, 3, 4);
    ctx.fillRect(cx + 4, p.y + 12, 3, 4);

    // Sourire
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(cx - 4, p.y + 19, 8, 2);

    // Corps bossu - la bosse !
    ctx.fillStyle = '#8e44ad';
    // Tunique principale
    ctx.fillRect(cx - 12, p.y + 24, 24, 14);
    // Bosse sur le dos (côté gauche quand face à droite)
    ctx.beginPath();
    ctx.arc(cx - 8, p.y + 22, 8, Math.PI, 0);
    ctx.fill();

    // Ceinture
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(cx - 12, p.y + 34, 24, 3);
    // Boucle
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(cx - 2, p.y + 34, 5, 3);

    // Bras (manches violettes)
    ctx.fillStyle = '#8e44ad';
    ctx.save();
    ctx.translate(p.x + 3, p.y + 25);
    ctx.rotate((-25 + armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 15);
    // Main
    ctx.fillStyle = '#f5d0a9';
    ctx.fillRect(-2, 15, 5, 4);
    ctx.restore();

    ctx.fillStyle = '#8e44ad';
    ctx.save();
    ctx.translate(p.x + p.w - 3, p.y + 25);
    ctx.rotate((25 - armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 15);
    ctx.fillStyle = '#f5d0a9';
    ctx.fillRect(-2, 15, 5, 4);
    ctx.restore();

    // Jambes (collants jaune/vert comme CPC)
    ctx.fillStyle = '#f39c12';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 9, p.y + p.h - 14, 7, 11);
        ctx.fillRect(cx + 2, p.y + p.h - 14, 7, 11);
    } else {
        ctx.save();
        ctx.translate(cx - 5, p.y + p.h - 16);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 7, 16);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 5, p.y + p.h - 16);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 7, 16);
        ctx.restore();
    }

    // Chaussures (bottes noires simples CPC)
    ctx.fillStyle = '#2c3e50';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 10, p.y + p.h - 5, 9, 5);
        ctx.fillRect(cx + 2, p.y + p.h - 5, 9, 5);
    } else {
        const leftFootX = cx - 5 + Math.sin(legSwing * Math.PI / 180) * 16;
        const rightFootX = cx + 5 + Math.sin(-legSwing * Math.PI / 180) * 16;
        ctx.fillRect(leftFootX - 5, p.y + p.h - 3, 10, 5);
        ctx.fillRect(rightFootX - 4, p.y + p.h - 3, 10, 5);
    }
}

// ===== NIVEAU 8 : MARIO SMB3 (Raccoon Mario / Tanuki) =====
function drawHeroMarioSMB3(ctx, p) {
    const cx = p.x + p.w / 2;
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 15 : 5);
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 20 : 0);
    const tailWag = Math.sin(p.animFrame * 0.4) * 15;

    // Oreilles de raton laveur (Raccoon Mario SMB3)
    ctx.fillStyle = '#8B4513';
    // Oreille gauche
    ctx.beginPath();
    ctx.moveTo(cx - 12, p.y + 6);
    ctx.lineTo(cx - 8, p.y - 4);
    ctx.lineTo(cx - 4, p.y + 6);
    ctx.fill();
    // Oreille droite
    ctx.beginPath();
    ctx.moveTo(cx + 4, p.y + 6);
    ctx.lineTo(cx + 8, p.y - 4);
    ctx.lineTo(cx + 12, p.y + 6);
    ctx.fill();
    // Intérieur oreilles
    ctx.fillStyle = '#d4a76a';
    ctx.beginPath();
    ctx.moveTo(cx - 10, p.y + 5);
    ctx.lineTo(cx - 8, p.y - 1);
    ctx.lineTo(cx - 6, p.y + 5);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + 6, p.y + 5);
    ctx.lineTo(cx + 8, p.y - 1);
    ctx.lineTo(cx + 10, p.y + 5);
    ctx.fill();

    // Casquette rouge
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(cx, p.y + 8, 13, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(cx, p.y + 3, 14, 4);
    // Lettre M
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx - 1, p.y + 6, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 7px Arial';
    ctx.fillText('M', cx - 4, p.y + 9);

    // Tête
    ctx.fillStyle = '#f5c6a0';
    ctx.beginPath();
    ctx.arc(cx, p.y + 14, 11, 0, Math.PI * 2);
    ctx.fill();

    // Moustache
    ctx.fillStyle = '#4a2800';
    ctx.beginPath();
    ctx.ellipse(cx, p.y + 19, 9, 3, 0, 0, Math.PI);
    ctx.fill();

    // Nez
    ctx.fillStyle = '#e8a87c';
    ctx.beginPath();
    ctx.arc(cx + 2, p.y + 16, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Yeux
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(cx - 4, p.y + 12, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 4, p.y + 12, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.arc(cx - 3, p.y + 13, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 5, p.y + 13, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Combinaison Raccoon (marron/orange)
    ctx.fillStyle = '#d4a76a';
    ctx.fillRect(cx - 12, p.y + 24, 24, 14);
    // Ventre clair
    ctx.fillStyle = '#f5deb3';
    ctx.beginPath();
    ctx.ellipse(cx, p.y + 30, 6, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Queue rayée (Raccoon tail!)
    ctx.save();
    ctx.translate(p.x - 2, p.y + 32);
    ctx.rotate(tailWag * Math.PI / 180);
    // Rayures de la queue
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#8B4513' : '#d4a76a';
        ctx.fillRect(-12 + i * 3, -2, 3, 6);
    }
    ctx.restore();

    // Bras
    ctx.fillStyle = '#d4a76a';
    ctx.save();
    ctx.translate(p.x + 3, p.y + 24);
    ctx.rotate((-20 + armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 15);
    ctx.restore();

    ctx.save();
    ctx.translate(p.x + p.w - 3, p.y + 24);
    ctx.rotate((20 - armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 15);
    ctx.restore();

    // Gants blancs
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(p.x + 3 + Math.sin((-20 + armSwing) * Math.PI / 180) * 15,
            p.y + 24 + Math.cos((-20 + armSwing) * Math.PI / 180) * 15, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x + p.w - 3 + Math.sin((20 - armSwing) * Math.PI / 180) * 15,
            p.y + 24 + Math.cos((20 - armSwing) * Math.PI / 180) * 15, 4, 0, Math.PI * 2);
    ctx.fill();

    // Jambes
    ctx.fillStyle = '#d4a76a';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 9, p.y + p.h - 14, 7, 11);
        ctx.fillRect(cx + 2, p.y + p.h - 14, 7, 11);
    } else {
        ctx.save();
        ctx.translate(cx - 5, p.y + p.h - 16);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 7, 16);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 5, p.y + p.h - 16);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 7, 16);
        ctx.restore();
    }

    // Chaussures marron
    ctx.fillStyle = '#8B4513';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 11, p.y + p.h - 5, 10, 5);
        ctx.fillRect(cx + 2, p.y + p.h - 5, 10, 5);
    } else {
        const leftFootX = cx - 5 + Math.sin(legSwing * Math.PI / 180) * 16;
        const rightFootX = cx + 5 + Math.sin(-legSwing * Math.PI / 180) * 16;
        ctx.fillRect(leftFootX - 6, p.y + p.h - 3, 11, 5);
        ctx.fillRect(rightFootX - 5, p.y + p.h - 3, 11, 5);
    }
}

// ===== NIVEAU 9 : BOMBJACK (Amstrad CPC) =====
function drawHeroBombJack(ctx, p) {
    const cx = p.x + p.w / 2;
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 15 : 5);
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 20 : 0);
    const capeFlutter = Math.sin(p.animFrame * 0.2) * 10;

    // Cape rouge flottante (BombJack est connu pour sa cape)
    ctx.fillStyle = '#e74c3c';
    ctx.save();
    ctx.translate(cx - 4, p.y + 20);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.quadraticCurveTo(-15 + capeFlutter, 15, -8 + capeFlutter * 0.5, 25);
    ctx.lineTo(12 + capeFlutter * 0.3, 25);
    ctx.quadraticCurveTo(15 - capeFlutter * 0.5, 15, 14, 0);
    ctx.fill();
    ctx.restore();

    // Masque / casque bleu (style CPC)
    ctx.fillStyle = '#2980b9';
    ctx.beginPath();
    ctx.arc(cx, p.y + 8, 13, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(cx - 13, p.y + 6, 26, 4);

    // Visage
    ctx.fillStyle = '#f5d0a9';
    ctx.beginPath();
    ctx.arc(cx, p.y + 14, 11, 0, Math.PI * 2);
    ctx.fill();

    // Masque bleu autour des yeux (style super-héros)
    ctx.fillStyle = '#2980b9';
    ctx.beginPath();
    ctx.moveTo(cx - 12, p.y + 10);
    ctx.lineTo(cx + 12, p.y + 10);
    ctx.lineTo(cx + 10, p.y + 16);
    ctx.lineTo(cx - 10, p.y + 16);
    ctx.fill();

    // Yeux (blancs dans le masque, style CPC)
    ctx.fillStyle = 'white';
    ctx.fillRect(cx - 8, p.y + 10, 6, 5);
    ctx.fillRect(cx + 2, p.y + 10, 6, 5);
    ctx.fillStyle = '#000';
    ctx.fillRect(cx - 6, p.y + 11, 3, 4);
    ctx.fillRect(cx + 4, p.y + 11, 3, 4);

    // Sourire
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, p.y + 18, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Corps - combinaison bleue
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(cx - 11, p.y + 24, 22, 14);
    // Lettre B sur le torse
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 10px Arial';
    ctx.fillText('B', cx - 4, p.y + 35);

    // Ceinture jaune
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(cx - 11, p.y + 35, 22, 3);

    // Bras bleus
    ctx.fillStyle = '#2980b9';
    ctx.save();
    ctx.translate(p.x + 3, p.y + 25);
    ctx.rotate((-20 + armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 14);
    // Gant rouge
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(-3, 14, 7, 5);
    ctx.restore();

    ctx.fillStyle = '#2980b9';
    ctx.save();
    ctx.translate(p.x + p.w - 3, p.y + 25);
    ctx.rotate((20 - armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 14);
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(-4, 14, 7, 5);
    ctx.restore();

    // Jambes bleues
    ctx.fillStyle = '#2980b9';
    if (!p.grounded && p.vy < 0) {
        // BombJack en vol : jambes écartées, cape au vent
        ctx.fillRect(cx - 10, p.y + p.h - 14, 7, 11);
        ctx.fillRect(cx + 3, p.y + p.h - 14, 7, 11);
    } else {
        ctx.save();
        ctx.translate(cx - 5, p.y + p.h - 16);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 7, 16);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 5, p.y + p.h - 16);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 7, 16);
        ctx.restore();
    }

    // Bottes rouges
    ctx.fillStyle = '#e74c3c';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 11, p.y + p.h - 5, 9, 5);
        ctx.fillRect(cx + 3, p.y + p.h - 5, 9, 5);
    } else {
        const leftFootX = cx - 5 + Math.sin(legSwing * Math.PI / 180) * 16;
        const rightFootX = cx + 5 + Math.sin(-legSwing * Math.PI / 180) * 16;
        ctx.fillRect(leftFootX - 5, p.y + p.h - 3, 10, 5);
        ctx.fillRect(rightFootX - 4, p.y + p.h - 3, 10, 5);
    }
}

// ===== NIVEAU 10 : SONIC THE HEDGEHOG =====
function drawHeroSonic(ctx, p) {
    const cx = p.x + p.w / 2;
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 15 : 5);
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 25 : 0);
    const isRunning = Math.abs(p.vx) > 3;

    // Piquants bleus (derrière la tête)
    ctx.fillStyle = '#2980b9';
    // Piquant 1 (haut)
    ctx.beginPath();
    ctx.moveTo(cx - 5, p.y + 8);
    ctx.lineTo(cx - 18, p.y - 2);
    ctx.lineTo(cx - 2, p.y + 14);
    ctx.fill();
    // Piquant 2 (milieu)
    ctx.beginPath();
    ctx.moveTo(cx - 6, p.y + 14);
    ctx.lineTo(cx - 22, p.y + 6);
    ctx.lineTo(cx - 3, p.y + 20);
    ctx.fill();
    // Piquant 3 (bas)
    ctx.beginPath();
    ctx.moveTo(cx - 5, p.y + 18);
    ctx.lineTo(cx - 20, p.y + 14);
    ctx.lineTo(cx - 2, p.y + 24);
    ctx.fill();

    // Tête bleue
    ctx.fillStyle = '#2980b9';
    ctx.beginPath();
    ctx.arc(cx + 2, p.y + 14, 14, 0, Math.PI * 2);
    ctx.fill();

    // Visage/museau beige
    ctx.fillStyle = '#f5d0a9';
    ctx.beginPath();
    ctx.ellipse(cx + 5, p.y + 16, 8, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Yeux (les grands yeux connectés de Sonic)
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(cx, p.y + 11, 5, 7, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 6, p.y + 11, 5, 7, 0.1, 0, Math.PI * 2);
    ctx.fill();
    // Pupilles vertes
    ctx.fillStyle = '#27ae60';
    ctx.beginPath();
    ctx.arc(cx + 1, p.y + 12, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 7, p.y + 12, 3, 0, Math.PI * 2);
    ctx.fill();
    // Pupilles noires
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx + 2, p.y + 12, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 7, p.y + 12, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Nez
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.arc(cx + 10, p.y + 15, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Sourire
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx + 6, p.y + 18, 4, 0.1, Math.PI * 0.7);
    ctx.stroke();

    // Corps bleu
    ctx.fillStyle = '#2980b9';
    ctx.beginPath();
    ctx.ellipse(cx, p.y + 30, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ventre beige
    ctx.fillStyle = '#f5d0a9';
    ctx.beginPath();
    ctx.ellipse(cx + 2, p.y + 30, 6, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bras bleus
    ctx.fillStyle = '#2980b9';
    ctx.save();
    ctx.translate(p.x + 3, p.y + 26);
    ctx.rotate((-15 + armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 12);
    // Gant blanc
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#2980b9';
    ctx.save();
    ctx.translate(p.x + p.w - 3, p.y + 26);
    ctx.rotate((15 - armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 6, 12);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Jambes bleues
    ctx.fillStyle = '#2980b9';

    if (isRunning && p.grounded) {
        // Effet de speed : cercle de jambes qui tournent
        ctx.save();
        ctx.translate(cx, p.y + p.h - 8);
        const spinAngle = p.animFrame * 0.6;
        for (let i = 0; i < 3; i++) {
            const a = spinAngle + i * Math.PI * 2 / 3;
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.ellipse(Math.cos(a) * 6, Math.sin(a) * 6, 5, 3, a, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    } else if (!p.grounded && p.vy < 0) {
        // Saut : Sonic en boule
        ctx.fillStyle = '#2980b9';
        ctx.beginPath();
        ctx.arc(cx, p.y + p.h - 8, 8, 0, Math.PI * 2);
        ctx.fill();
        // Piquants en boule
        for (let i = 0; i < 4; i++) {
            const a = p.animFrame * 0.3 + i * Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * 6, p.y + p.h - 8 + Math.sin(a) * 6);
            ctx.lineTo(cx + Math.cos(a) * 12, p.y + p.h - 8 + Math.sin(a) * 12);
            ctx.lineTo(cx + Math.cos(a + 0.5) * 6, p.y + p.h - 8 + Math.sin(a + 0.5) * 6);
            ctx.fill();
        }
    } else {
        ctx.save();
        ctx.translate(cx - 5, p.y + p.h - 14);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 6, 14);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 5, p.y + p.h - 14);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 6, 14);
        ctx.restore();
    }

    // Chaussures rouges de Sonic
    if (!isRunning || !p.grounded) {
        ctx.fillStyle = '#e74c3c';
        if (!p.grounded && p.vy < 0) {
            // Pas de chaussures visibles en boule
        } else {
            const leftFootX = cx - 5 + Math.sin(legSwing * Math.PI / 180) * 14;
            const rightFootX = cx + 5 + Math.sin(-legSwing * Math.PI / 180) * 14;
            // Chaussure gauche
            ctx.beginPath();
            ctx.ellipse(leftFootX, p.y + p.h - 1, 7, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            // Bande blanche
            ctx.fillStyle = '#fff';
            ctx.fillRect(leftFootX - 3, p.y + p.h - 3, 6, 2);

            // Chaussure droite
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.ellipse(rightFootX, p.y + p.h - 1, 7, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.fillRect(rightFootX - 3, p.y + p.h - 3, 6, 2);
        }
    }

    // Effet de vitesse quand il court vite
    if (isRunning && p.grounded) {
        ctx.strokeStyle = 'rgba(41, 128, 185, 0.4)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(p.x - 5 - i * 8, p.y + 15 + i * 8);
            ctx.lineTo(p.x - 15 - i * 10, p.y + 15 + i * 8);
            ctx.stroke();
        }
    }
}

// ===== NIVEAU 12 : PETITE FILLE MIYAZAKI (Chihiro / Sen) =====
function drawHeroMiyazakiGirl(ctx, p) {
    const cx = p.x + p.w / 2;
    const armSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 12 : 4);
    const legSwing = Math.sin(p.animFrame * 0.3) * (Math.abs(p.vx) > 0.5 ? 18 : 0);
    const hairSway = Math.sin(p.animFrame * 0.15) * 3;

    // Cheveux longs bruns (queue de cheval avec ruban)
    ctx.fillStyle = '#5a3825';
    // Queue de cheval qui flotte
    ctx.save();
    ctx.translate(cx - 2, p.y + 10);
    ctx.rotate(hairSway * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(-3, 0);
    ctx.quadraticCurveTo(-8 + hairSway, 18, -5 + hairSway * 0.5, 28);
    ctx.lineTo(3 + hairSway * 0.3, 26);
    ctx.quadraticCurveTo(2, 14, 3, 0);
    ctx.fill();
    ctx.restore();

    // Tête ronde
    ctx.fillStyle = '#fce4c8';
    ctx.beginPath();
    ctx.arc(cx, p.y + 12, 12, 0, Math.PI * 2);
    ctx.fill();

    // Cheveux (frange et côtés)
    ctx.fillStyle = '#5a3825';
    // Frange
    ctx.beginPath();
    ctx.arc(cx, p.y + 6, 12, Math.PI + 0.3, -0.3);
    ctx.fill();
    // Cheveux côtés
    ctx.fillRect(cx - 12, p.y + 4, 4, 14);
    ctx.fillRect(cx + 8, p.y + 4, 4, 14);

    // Ruban rose dans les cheveux (comme Chihiro)
    ctx.fillStyle = '#e91e90';
    ctx.beginPath();
    ctx.arc(cx - 4, p.y + 3, 3, 0, Math.PI * 2);
    ctx.fill();
    // Bouts du ruban
    ctx.beginPath();
    ctx.moveTo(cx - 6, p.y + 3);
    ctx.lineTo(cx - 10, p.y + 7);
    ctx.lineTo(cx - 7, p.y + 4);
    ctx.fill();

    // Yeux (grands yeux expressifs style Ghibli)
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(cx - 4, p.y + 12, 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 5, p.y + 12, 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Iris marron foncé
    ctx.fillStyle = '#3d1f00';
    ctx.beginPath();
    ctx.arc(cx - 3, p.y + 13, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 6, p.y + 13, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Reflets dans les yeux (style Ghibli)
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.arc(cx - 4, p.y + 12, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 5, p.y + 12, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Petite bouche
    ctx.strokeStyle = '#cc6666';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx + 1, p.y + 17, 3, 0.3, Math.PI - 0.3);
    ctx.stroke();

    // Joues roses
    ctx.fillStyle = 'rgba(255, 150, 150, 0.4)';
    ctx.beginPath();
    ctx.arc(cx - 7, p.y + 15, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 8, p.y + 15, 3, 0, Math.PI * 2);
    ctx.fill();

    // T-shirt blanc et rose (uniforme de Chihiro dans le monde des esprits)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 11, p.y + 23, 22, 8);
    // Manches courtes
    ctx.fillRect(cx - 14, p.y + 23, 5, 6);
    ctx.fillRect(cx + 9, p.y + 23, 5, 6);

    // Pantalon/short rose
    ctx.fillStyle = '#e88dac';
    ctx.fillRect(cx - 11, p.y + 31, 22, 8);

    // Bras (manches blanches puis bras peau)
    ctx.fillStyle = '#fce4c8';
    ctx.save();
    ctx.translate(p.x + 3, p.y + 25);
    ctx.rotate((-15 + armSwing) * Math.PI / 180);
    ctx.fillRect(-3, 0, 5, 14);
    // Main
    ctx.beginPath();
    ctx.arc(0, 15, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(p.x + p.w - 3, p.y + 25);
    ctx.rotate((15 - armSwing) * Math.PI / 180);
    ctx.fillRect(-2, 0, 5, 14);
    ctx.beginPath();
    ctx.arc(1, 15, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Jambes
    ctx.fillStyle = '#fce4c8';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 8, p.y + p.h - 14, 6, 10);
        ctx.fillRect(cx + 2, p.y + p.h - 14, 6, 10);
    } else {
        ctx.save();
        ctx.translate(cx - 5, p.y + p.h - 14);
        ctx.rotate(legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 6, 14);
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 5, p.y + p.h - 14);
        ctx.rotate(-legSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 6, 14);
        ctx.restore();
    }

    // Chaussures simples (sandales marron)
    ctx.fillStyle = '#8B4513';
    if (!p.grounded && p.vy < 0) {
        ctx.fillRect(cx - 9, p.y + p.h - 4, 8, 4);
        ctx.fillRect(cx + 2, p.y + p.h - 4, 8, 4);
    } else {
        const leftFootX = cx - 5 + Math.sin(legSwing * Math.PI / 180) * 14;
        const rightFootX = cx + 5 + Math.sin(-legSwing * Math.PI / 180) * 14;
        ctx.fillRect(leftFootX - 5, p.y + p.h - 2, 9, 4);
        ctx.fillRect(rightFootX - 4, p.y + p.h - 2, 9, 4);
    }

    // Petites particules d'esprit autour (effet Miyazaki)
    if (Math.random() < 0.3) {
        ctx.fillStyle = 'rgba(255, 255, 200, 0.6)';
        for (let i = 0; i < 2; i++) {
            const sx = cx + (Math.random() - 0.5) * 40;
            const sy = p.y + Math.random() * p.h;
            ctx.beginPath();
            ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// ===== DISPATCHER : Choisir le héros selon le niveau =====
function drawHeroForLevel(ctx, p, level) {
    switch(level) {
        case 1:
        case 2:
            drawHeroLeo(ctx, p);
            break;
        case 3:
            drawHeroMario(ctx, p);
            break;
        case 4:
            drawHeroLuigi(ctx, p);
            break;
        case 5:
            drawHeroSteve(ctx, p);
            break;
        case 6:
            drawHeroPortalRobot(ctx, p);
            break;
        case 7:
            drawHeroHunchback(ctx, p);
            break;
        case 8:
            drawHeroMarioSMB3(ctx, p);
            break;
        case 9:
            drawHeroBombJack(ctx, p);
            break;
        case 10:
            drawHeroSonic(ctx, p);
            break;
        case 12:
            drawHeroMiyazakiGirl(ctx, p);
            break;
        default:
            // Par défaut : Léo (petit garçon)
            drawHeroLeo(ctx, p);
            break;
    }
}
