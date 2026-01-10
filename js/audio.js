// ============================================================
// L'AVENTURE DE LÉO - SYSTÈME AUDIO
// ============================================================

const AudioSystem = {
    ctx: null,
    enabled: true,
    
    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.log('Audio non supporté');
        }
    },
    
    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },
    
    play(type) {
        if (!this.enabled || !this.ctx) return;
        this.resume();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        const now = this.ctx.currentTime;
        
        switch(type) {
            case 'jump':
                osc.type = 'square';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
                break;
                
            case 'coin':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.setValueAtTime(1174, now + 0.05);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
                break;
                
            case 'key':
                osc.type = 'sine';
                [523, 659, 784, 1046].forEach((freq, i) => {
                    osc.frequency.setValueAtTime(freq, now + i * 0.1);
                });
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
                break;
                
            case 'hurt':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
                
            case 'victory':
                osc.type = 'sine';
                [523, 659, 784, 1046, 784, 1046].forEach((freq, i) => {
                    osc.frequency.setValueAtTime(freq, now + i * 0.12);
                });
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
                osc.start(now);
                osc.stop(now + 0.8);
                break;
                
            case 'death':
                osc.type = 'square';
                [200, 180, 160, 140, 100].forEach((freq, i) => {
                    osc.frequency.setValueAtTime(freq, now + i * 0.15);
                });
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
                osc.start(now);
                osc.stop(now + 0.8);
                break;
                
            case 'boss_hit':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
                
            case 'life':
                osc.type = 'sine';
                [440, 554, 659, 880].forEach((freq, i) => {
                    osc.frequency.setValueAtTime(freq, now + i * 0.08);
                });
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
                break;
        }
    }
};
