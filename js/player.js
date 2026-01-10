// ============================================================
// L'AVENTURE DE LÉO - JOUEUR
// ============================================================

const player = {
    x: 50, y: 50,
    w: 36, h: 48,
    vx: 0, vy: 0,
    baseSpeed: 6,
    jumpForce: 14,
    grounded: false,
    climbing: false,
    jumpCount: 0,
    maxJumps: 2,
    currentPlatform: null,
    facingRight: true,
    animFrame: 0,
    animTimer: 0,
    
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.grounded = false;
        this.climbing = false;
        this.jumpCount = 0;
        this.currentPlatform = null;
    },
    
    draw(ctx) {
        if (state.invincibilityTimer > 0 && state.invincibilityTimer % 10 >= 5) {
            return; // Clignotement
        }
        
        ctx.save();
        const cx = this.x + this.w / 2;
        const cy = this.y + this.h / 2;
        
        if (!this.facingRight) {
            ctx.translate(cx, 0);
            ctx.scale(-1, 1);
            ctx.translate(-cx, 0);
        }
        
        // Corps (bleu)
        ctx.fillStyle = '#3498db';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 5, this.w / 2 - 2, this.h / 2 - 5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Tête
        ctx.fillStyle = '#f5d0a9';
        ctx.beginPath();
        ctx.arc(cx, this.y + 12, 14, 0, Math.PI * 2);
        ctx.fill();
        
        // Cheveux
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(cx, this.y + 6, 12, Math.PI, 0);
        ctx.fill();
        ctx.fillRect(cx - 10, this.y + 2, 20, 8);
        
        // Yeux
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(cx - 5, this.y + 12, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx + 5, this.y + 12, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(cx - 4, this.y + 13, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + 6, this.y + 13, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Sourire
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, this.y + 16, 5, 0.2, Math.PI - 0.2);
        ctx.stroke();
        
        // Bras (animation)
        ctx.fillStyle = '#3498db';
        const armSwing = Math.sin(this.animFrame * 0.3) * (Math.abs(this.vx) > 0.5 ? 15 : 5);
        
        // Bras gauche
        ctx.save();
        ctx.translate(this.x + 5, this.y + 25);
        ctx.rotate((-20 + armSwing) * Math.PI / 180);
        ctx.fillRect(-3, 0, 6, 18);
        ctx.restore();
        
        // Bras droit
        ctx.save();
        ctx.translate(this.x + this.w - 5, this.y + 25);
        ctx.rotate((20 - armSwing) * Math.PI / 180);
        ctx.fillRect(-3, 0, 6, 18);
        ctx.restore();
        
        // Mains (couleur peau)
        ctx.fillStyle = '#f5d0a9';
        ctx.beginPath();
        ctx.arc(this.x + 5 + Math.sin((-20 + armSwing) * Math.PI / 180) * 18, 
                this.y + 25 + Math.cos((-20 + armSwing) * Math.PI / 180) * 18, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.w - 5 + Math.sin((20 - armSwing) * Math.PI / 180) * 18,
                this.y + 25 + Math.cos((20 - armSwing) * Math.PI / 180) * 18, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Jambes (animation)
        ctx.fillStyle = '#2c3e50';
        const legSwing = Math.sin(this.animFrame * 0.3) * (Math.abs(this.vx) > 0.5 ? 20 : 0);
        
        if (!this.grounded && this.vy < 0) {
            // Saut : jambes pliées
            ctx.fillRect(cx - 10, this.y + this.h - 15, 8, 12);
            ctx.fillRect(cx + 2, this.y + this.h - 15, 8, 12);
        } else {
            // Jambe gauche
            ctx.save();
            ctx.translate(cx - 6, this.y + this.h - 18);
            ctx.rotate(legSwing * Math.PI / 180);
            ctx.fillRect(-4, 0, 8, 18);
            ctx.restore();
            
            // Jambe droite
            ctx.save();
            ctx.translate(cx + 6, this.y + this.h - 18);
            ctx.rotate(-legSwing * Math.PI / 180);
            ctx.fillRect(-4, 0, 8, 18);
            ctx.restore();
        }
        
        // Chaussures
        ctx.fillStyle = '#c0392b';
        if (!this.grounded && this.vy < 0) {
            ctx.fillRect(cx - 12, this.y + this.h - 5, 10, 5);
            ctx.fillRect(cx + 2, this.y + this.h - 5, 10, 5);
        } else {
            const leftFootX = cx - 6 + Math.sin(legSwing * Math.PI / 180) * 18;
            const rightFootX = cx + 6 + Math.sin(-legSwing * Math.PI / 180) * 18;
            ctx.fillRect(leftFootX - 6, this.y + this.h - 2, 10, 5);
            ctx.fillRect(rightFootX - 4, this.y + this.h - 2, 10, 5);
        }
        
        ctx.restore();
        
        // Animation frame
        if (Math.abs(this.vx) > 0.5 || !this.grounded) {
            this.animFrame++;
        }
    }
};
