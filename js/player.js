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

    // === ASSISTANCES MOBILE (coyote time + jump buffer) ===
    coyoteTime: 0,          // Frames restantes de "coyote time"
    coyoteTimeMax: 8,       // 8 frames (~133ms) pour sauter après avoir quitté une plateforme
    jumpBuffer: 0,          // Frames restantes de "jump buffer"
    jumpBufferMax: 10,      // 10 frames (~166ms) pour mémoriser l'appui sur saut
    wasGrounded: false,     // Était au sol à la frame précédente

    // Obtenir la force de saut actuelle (normal)
    getJumpForce() {
        return this.jumpForce;
    },

    // Obtenir le nombre max de sauts (avec power-up super saut = triple saut !)
    getMaxJumps() {
        return state.powerups.superJump > 0 ? 3 : this.maxJumps;
    },
    
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.grounded = false;
        this.climbing = false;
        this.jumpCount = 0;
        this.currentPlatform = null;
        // Reset des assistances mobile
        this.coyoteTime = 0;
        this.jumpBuffer = 0;
        this.wasGrounded = false;
    },
    
    draw(ctx) {
        if (state.invincibilityTimer > 0 && state.invincibilityTimer % 10 >= 5 && state.powerups.star === 0) {
            return; // Clignotement (sauf si étoile active)
        }

        ctx.save();

        // Effet visuel du bouclier
        if (state.powerups.shield > 0) {
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 3;
            ctx.globalAlpha = 0.5 + Math.sin(state.frameTick * 0.2) * 0.3;
            ctx.beginPath();
            ctx.arc(this.x + this.w/2, this.y + this.h/2, this.w/2 + 8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // Effet visuel de l'étoile (invincibilité)
        if (state.powerups.star > 0) {
            // Arc-en-ciel tournant !
            const colors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0077ff', '#ff00ff'];
            for (let i = 0; i < 6; i++) {
                const angle = (state.frameTick * 0.1 + i * Math.PI / 3) % (Math.PI * 2);
                const dist = 30;
                const x = this.x + this.w/2 + Math.cos(angle) * dist;
                const y = this.y + this.h/2 + Math.sin(angle) * dist;

                ctx.fillStyle = colors[i];
                ctx.globalAlpha = 0.7;
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }

        // Effet visuel du super saut
        if (state.powerups.superJump > 0 && !this.grounded) {
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.5;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(this.x + this.w/2 - 5 + i * 5, this.y + this.h + i * 5);
                ctx.lineTo(this.x + this.w/2, this.y + this.h + 10 + i * 8);
                ctx.lineTo(this.x + this.w/2 + 5 - i * 5, this.y + this.h + i * 5);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
        }

        ctx.save();
        const cx = this.x + this.w / 2;
        const cy = this.y + this.h / 2;

        if (!this.facingRight) {
            ctx.translate(cx, 0);
            ctx.scale(-1, 1);
            ctx.translate(-cx, 0);
        }

        // Dessiner le héros selon le niveau actuel
        if (typeof drawHeroForLevel === 'function') {
            drawHeroForLevel(ctx, this, state.level);
        } else {
            // Fallback : Léo par défaut
            ctx.fillStyle = state.playerColor || '#3498db';
            ctx.beginPath();
            ctx.ellipse(cx, cy + 5, this.w / 2 - 2, this.h / 2 - 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#f5d0a9';
            ctx.beginPath();
            ctx.arc(cx, this.y + 12, 14, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore(); // Restore du flip horizontal

        // Animation frame
        if (Math.abs(this.vx) > 0.5 || !this.grounded) {
            this.animFrame++;
        }

        ctx.restore(); // Restore du ctx.save() ligne 46 - CRITIQUE pour éviter l'accumulation!
    }
};
