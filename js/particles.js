// ============================================================
// L'AVENTURE DE LÉO - SYSTÈME DE PARTICULES
// ============================================================

const ParticleSystem = {
    particles: [],
    
    emit(x, y, type, count = 10) {
        for (let i = 0; i < count; i++) {
            const p = {
                x, y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 2,
                life: 1,
                decay: 0.02 + Math.random() * 0.02,
                size: 3 + Math.random() * 5,
                type
            };

            if (type === 'dust') {
                p.vy = -Math.random() * 2;
                p.vx = (Math.random() - 0.5) * 3;
                p.size = 2 + Math.random() * 3;
                p.decay = 0.05;
            }
            else if (type === 'sparkle') {
                p.vy = -Math.random() * 5;
                p.size = 2 + Math.random() * 4;
            }
            else if (type === 'damage') {
                p.vx = (Math.random() - 0.5) * 10;
                p.vy = (Math.random() - 0.5) * 10;
                p.size = 4 + Math.random() * 6;
            }
            else if (type === 'confetti') {
                p.vx = (Math.random() - 0.5) * 12;
                p.vy = -Math.random() * 15 - 5;
                p.size = 6 + Math.random() * 8;
                p.decay = 0.015;
                p.rotation = Math.random() * Math.PI * 2;
                p.rotationSpeed = (Math.random() - 0.5) * 0.3;
                p.color = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#e67e22'][Math.floor(Math.random() * 6)];
            }

            this.particles.push(p);
        }
    },
    
    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2;
            p.life -= p.decay;

            // Rotation pour confettis
            if (p.rotation !== undefined) {
                p.rotation += p.rotationSpeed;
            }

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    },
    
    draw(ctx) {
        for (const p of this.particles) {
            ctx.globalAlpha = p.life;

            if (p.type === 'confetti') {
                // Confettis avec rotation !
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();
            } else {
                if (p.type === 'dust') {
                    ctx.fillStyle = '#a0522d';
                } else if (p.type === 'sparkle') {
                    ctx.fillStyle = `hsl(${50 + Math.random() * 20}, 100%, 70%)`;
                } else if (p.type === 'coin') {
                    ctx.fillStyle = 'gold';
                } else if (p.type === 'damage') {
                    ctx.fillStyle = '#e74c3c';
                } else if (p.type === 'boss') {
                    ctx.fillStyle = '#9b59b6';
                } else if (p.type === 'life') {
                    ctx.fillStyle = '#e74c3c';
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1;
    },
    
    clear() {
        this.particles = [];
    }
};
