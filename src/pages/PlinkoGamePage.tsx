import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Icons } from '@/components/icons';
import { useToast } from '@/context/ToastContext';
import { ProvablyFairModal } from '@/components/ProvablyFairModal';
import { useSound } from '@/context/SoundContext';

// --- CONFIGURATION & CONSTANTS ---
const ROW_OPTIONS = [8, 10, 12, 14, 16];
const RISK_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'];

// Standard crypto-casino multiplier curves
const MULTIPLIERS: Record<string, Record<number, number[]>> = {
    LOW: {
        8: [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6],
        10: [8.9, 3, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9],
        12: [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
        14: [7.1, 4, 1.9, 1.4, 1.3, 1.1, 1, 0.5, 1, 1.1, 1.3, 1.4, 1.9, 4, 7.1],
        16: [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 1.4, 2, 9, 16]
    },
    MEDIUM: {
        8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
        10: [22, 5, 2, 1.4, 0.6, 0.4, 0.6, 1.4, 2, 5, 22],
        12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
        14: [58, 15, 7, 4, 1.9, 1, 0.5, 0.2, 0.5, 1, 1.9, 4, 7, 15, 58],
        16: [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110]
    },
    HIGH: {
        8: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29],
        10: [76, 10, 3, 0.9, 0.3, 0.2, 0.3, 0.9, 3, 10, 76],
        12: [170, 24, 8.1, 2, 0.7, 0.2, 0.2, 0.2, 0.7, 2, 8.1, 24, 170],
        14: [420, 56, 18, 5, 1.9, 0.3, 0.2, 0.2, 0.2, 0.3, 1.9, 5, 18, 56, 420],
        16: [1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000]
    }
};

// Engine Types
interface Particle {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    path: number[];     // The pre-determined array of 0s (left) and 1s (right)
    currentRow: number; // Which row of pegs we are currently navigating
    finished: boolean;
    history: {x: number, y: number}[]; // For trail rendering
}

interface Peg {
    x: number;
    y: number;
    r: number;
    lastHit: number; // Timestamp for pulse effect
}

export const PlinkoGamePage = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { playSound } = useSound();

    // --- SIMULATION STATE ---
    const [simBalance, setSimBalance] = useState(10000);
    const [betAmount, setBetAmount] = useState(100);
    const [rows, setRows] = useState(16);
    const [risk, setRisk] = useState('MEDIUM');
    const [autoBetActive, setAutoBetActive] = useState(false);
    const [history, setHistory] = useState<{mult: number, id: string}[]>([]);

    // --- PROVABLY FAIR STATE ---
    const [pfModalOpen, setPfModalOpen] = useState(false);
    const [serverSeedHash, setServerSeedHash] = useState('a1b2c3d4e5f6...'); 
    const [clientSeed, setClientSeed] = useState('zap_vanguard');
    const [nonce, setNonce] = useState(0);

    // --- ENGINE REFS ---
    const particlesRef = useRef<Particle[]>([]);
    const pegsRef = useRef<Peg[]>([]);
    const animationRef = useRef<number>();
    const multipliers = useMemo(() => MULTIPLIERS[risk][rows], [rows, risk]);
    const lastBucketHitRef = useRef<number | null>(null); // For bucket flash effect

    // --- INITIALIZE BOARD LAYOUT ---
     const initBoard = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // High-DPI Canvas Setup
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        // Generate Peg Positions
        const newPegs: Peg[] = [];
        const width = rect.width;
        const height = rect.height;
        
        const paddingTop = 80;
        const paddingBottom = 100;
        const playableHeight = height - paddingTop - paddingBottom;
        
        const pegSpacingY = playableHeight / rows;
        const maxCols = rows + 1;
        const pegSpacingX = Math.min(width / (maxCols + 2), 45); 

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col <= row; col++) {
                const x = width / 2 + (col - row / 2) * pegSpacingX;
                const y = paddingTop + row * pegSpacingY;
                newPegs.push({ x, y, r: 4, lastHit: 0 });
            }
        }
        pegsRef.current = newPegs;
    }, [rows]);

    useEffect(() => {
        initBoard();
        const handleResize = () => initBoard();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [initBoard]);

    // --- MAIN ANIMATION LOOP ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let lastTime = performance.now();

        const render = (time: number) => {
            const deltaTime = (time - lastTime) / 16.667;
            lastTime = time;
            
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);

            ctx.clearRect(0, 0, width, height);

            // 1. Draw Pegs
            pegsRef.current.forEach(peg => {
                const hitDelta = time - peg.lastHit;
                let radius = peg.r;
                let color = '#333';
                
                if (hitDelta < 300) {
                     const pulse = 1 - (hitDelta / 300);
                     radius += pulse * 3;
                     color = `rgba(0, 255, 192, ${0.2 + pulse * 0.8})`;
                }

                ctx.beginPath();
                ctx.arc(peg.x, peg.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            });

            // 2. Draw Buckets
            const bucketY = height - 60;
            const bucketHeight = 40;
            const maxCols = rows + 1;
            const pegSpacingX = Math.min(width / (maxCols + 2), 45);
            
            multipliers.forEach((mult, i) => {
                const x = width / 2 + (i - rows / 2) * pegSpacingX;
                const w = pegSpacingX - 4;

                let baseColor = mult < 1 ? [60, 60, 60] : mult < 3 ? [255, 170, 0] : [255, 0, 85];
                if (lastBucketHitRef.current === i) {
                     baseColor = [0, 255, 192];
                }

                ctx.fillStyle = `rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`;
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(x - w / 2, bucketY, w, bucketHeight, 4);
                } else {
                    ctx.rect(x - w / 2, bucketY, w, bucketHeight);
                }
                ctx.fill();

                ctx.fillStyle = mult < 1 ? '#8d8c9e' : '#fff';
                ctx.font = 'bold 10px "Roboto Mono", monospace';
                ctx.textAlign = 'center';
                ctx.fillText(`${mult}x`, x, bucketY + 24);
            });

            // 3. Update & Draw Particles
            particlesRef.current.forEach((p) => {
                if (p.finished) return;

                p.vy += 0.8 * deltaTime;
                p.vy *= 0.98;
                p.vx *= 0.97;
                p.x += p.vx * deltaTime;
                p.y += p.vy * deltaTime;

                const pegSpacingY = (height - 180) / rows;
                const startY = 80;

                if (p.currentRow < rows && p.y >= startY + p.currentRow * pegSpacingY - p.radius) {
                    for (let j = 0; j < pegsRef.current.length; j++) {
                         const peg = pegsRef.current[j];
                         if (Math.abs(peg.y - p.y) < pegSpacingY && Math.abs(peg.x - p.x) < pegSpacingY) {
                             const dx = p.x - peg.x;
                             const dy = p.y - peg.y;
                             const dist = Math.sqrt(dx*dx + dy*dy);
                             
                             if (dist < p.radius + peg.r) {
                                 peg.lastHit = time;
                                 const direction = p.path[p.currentRow];
                                 p.vy = -Math.abs(p.vy) * 0.5 - 2;
                                 const guideForce = (Math.random() * 1.5 + 2);
                                 p.vx += direction === 0 ? -guideForce : guideForce;
                                 p.y = peg.y - (p.radius + peg.r + 1); 
                                 p.currentRow++;
                                 playSound('plinko_hit');
                                 break;
                             }
                         }
                    }
                }

                if (p.y > bucketY - p.radius) {
                    p.finished = true;
                    p.y = bucketY - p.radius;
                    const pathSum = p.path.reduce((a, b) => a + b, 0);
                    const payoutMult = multipliers[pathSum] || 0;
                    const win = betAmount * payoutMult;

                    setSimBalance(prev => prev + win);
                    setHistory(prev => [{ mult: payoutMult, id: p.id }, ...prev].slice(0, 10));
                    lastBucketHitRef.current = pathSum;
                    setTimeout(() => { if(lastBucketHitRef.current === pathSum) lastBucketHitRef.current = null; }, 200);
                    playSound('plinko_bucket');
                }

                p.history.push({x: p.x, y: p.y});
                if (p.history.length > 20) p.history.shift();

                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 192, 0.5)`;
                ctx.lineWidth = 2;
                for (let h = 0; h < p.history.length - 1; h++) {
                    const point = p.history[h];
                    const nextPoint = p.history[h+1];
                    ctx.globalAlpha = h / p.history.length;
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(nextPoint.x, nextPoint.y);
                }
                ctx.stroke();
                ctx.globalAlpha = 1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = '#00FFC0';
                ctx.shadowBlur = 20;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            particlesRef.current = particlesRef.current.filter(p => !p.finished || p.y < height + 100);
            animationRef.current = requestAnimationFrame(render);
        };

        animationRef.current = requestAnimationFrame(render);
        return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
    }, [multipliers, rows, betAmount, playSound]);

    const dropBall = useCallback(() => {
        if (betAmount > simBalance) {
            showToast("INSUFFICIENT FUNDS.", "error");
            setAutoBetActive(false);
            return;
        }

        setSimBalance(prev => prev - betAmount);
        setNonce(prev => prev + 1);

        const path: number[] = [];
        for (let i = 0; i < rows; i++) {
            path.push(Math.random() > 0.5 ? 1 : 0);
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const width = canvas.width / (window.devicePixelRatio || 1);

        particlesRef.current.push({
            id: Math.random().toString(36).substr(2, 9),
            x: width / 2 + (Math.random() - 0.5) * 10,
            y: 30,
            vx: 0,
            vy: 0,
            radius: 5,
            path,
            currentRow: 0,
            finished: false,
            history: []
        });
        
        playSound('plinko_drop');
    }, [betAmount, simBalance, rows, showToast, playSound]);

    useEffect(() => {
        let interval: any;
        if (autoBetActive) {
            interval = setInterval(dropBall, 250);
        }
        return () => clearInterval(interval);
    }, [autoBetActive, dropBall]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space' && !e.repeat && !pfModalOpen) {
                e.preventDefault();
                dropBall();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [dropBall, pfModalOpen]);

    return (
        <div className="container mx-auto max-w-7xl p-4 py-6 md:p-8 page-fade-in min-h-[calc(100vh-8rem)] flex flex-col">
            
             <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                     <Button variant="ghost" onClick={() => navigate('/strategy-sandbox')} className="text-[#8d8c9e] hover:text-white px-0 md:px-4">
                        <Icons.ChevronLeft className="h-5 w-5 mr-2" /> SANDBOX
                    </Button>
                    <h1 className="font-orbitron text-xl md:text-2xl text-white uppercase tracking-wider flex items-center gap-3">
                        <Icons.Activity className="h-6 w-6 text-[#00FFC0]" />
                        PLINKO PROTOCOL
                    </h1>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                     <Button 
                        variant="ghost" 
                        onClick={() => setPfModalOpen(true)}
                        className="text-[#00FFC0] border border-[#00FFC0]/30 hover:bg-[#00FFC0]/10 font-mono uppercase text-xs"
                     >
                        <Icons.Lock className="h-4 w-4 mr-2" /> FAIRNESS
                     </Button>
                    <div className="bg-[#0c0c0e] px-5 py-3 rounded-xl border border-[#333] flex items-center gap-4 font-mono shadow-xl">
                        <span className="text-[#8d8c9e] text-xs uppercase tracking-wider flex items-center gap-2">
                            <Icons.Wallet className="h-4 w-4" /> BALANCE
                        </span>
                        <span className="text-xl tracking-tight font-bold text-white">
                            ${simBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[600px]">
                
                <Card className="lg:col-span-3 order-last lg:order-first bg-[#0c0c0e] border-[#333] p-0 flex flex-col h-fit lg:sticky lg:top-24">
                    <div className="p-4 bg-[#14131c] border-b border-[#333] flex justify-between items-center">
                        <span className="font-heading text-xs text-white uppercase tracking-widest flex items-center gap-2">
                            <Icons.Sliders className="h-4 w-4 text-[#00FFC0]" /> MANUAL OVERRIDE
                        </span>
                    </div>

                    <div className="p-5 space-y-6">
                        <div>
                            <label className="flex justify-between text-[10px] font-mono text-[#8d8c9e] uppercase mb-2">
                                <span>Bet Amount</span>
                            </label>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 text-[#8d8c9e]">$</span>
                                <Input 
                                    type="number" 
                                    value={betAmount} 
                                    onChange={(e) => setBetAmount(Math.max(0, Number(e.target.value)))}
                                    className="font-mono text-lg pl-8 pr-4 bg-[#0A0A0A] border-[#333] h-12 focus:border-[#00FFC0]"
                                />
                            </div>
                             <div className="grid grid-cols-4 gap-2 mt-2">
                                {['MIN', '1/2', '2x', 'MAX'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => {
                                            if (opt === 'MIN') setBetAmount(1);
                                            if (opt === '1/2') setBetAmount(Math.max(1, betAmount / 2));
                                            if (opt === '2x') setBetAmount(betAmount * 2);
                                            if (opt === 'MAX') setBetAmount(simBalance);
                                        }}
                                        className="bg-[#14131c] border border-[#333] rounded text-[10px] font-heading py-2 text-[#8d8c9e] hover:text-white hover:border-[#8d8c9e] transition-all active:scale-95"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-mono text-[#8d8c9e] uppercase mb-2">Risk Protocol</label>
                            <div className="grid grid-cols-3 gap-2 bg-[#14131c] p-1 rounded-md border border-[#333]">
                                {RISK_OPTIONS.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setRisk(opt)}
                                        className={`py-2 text-[10px] font-heading uppercase rounded-sm transition-all ${risk === opt ? 'bg-[#333] text-white shadow-sm border border-[#555]' : 'text-[#8d8c9e] hover:text-white'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div>
                            <label className="block text-[10px] font-mono text-[#8d8c9e] uppercase mb-2">Peg Density</label>
                            <select 
                                value={rows} 
                                onChange={(e) => setRows(Number(e.target.value))}
                                className="w-full h-12 bg-[#0A0A0A] border border-[#333] rounded px-4 text-sm text-white font-mono focus:border-[#00FFC0] outline-none appearance-none"
                            >
                                {ROW_OPTIONS.map(r => (
                                    <option key={r} value={r}>{r} ROWS</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="p-5 pt-0 mt-auto space-y-3">
                        <Button 
                            onClick={dropBall} 
                            className="w-full py-6 font-orbitron font-bold uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(0,255,192,0.2)] bg-[#00FFC0] text-black hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            DROP [SPACE]
                        </Button>
                         <Button 
                            onClick={() => setAutoBetActive(!autoBetActive)} 
                            variant="secondary"
                            className={`w-full font-heading uppercase tracking-wider py-4 border-[#333] ${autoBetActive ? 'bg-red-950/30 text-red-500 border-red-900/50 animate-pulse' : ''}`}
                        >
                            {autoBetActive ? 'STOP AUTOPILOT' : 'ENGAGE AUTOPILOT'}
                        </Button>
                    </div>
                </Card>

                <div className="lg:col-span-9 flex flex-col gap-4">
                    
                    <div className="h-14 bg-[#0c0c0e] rounded-xl border border-[#333] flex items-center px-2 overflow-hidden relative">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0c0c0e] to-transparent z-10 pointer-events-none"></div>
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar-hidden px-4 w-full justify-end">
                             {history.map((entry) => (
                                <div 
                                    key={entry.id}
                                    className={`shrink-0 px-3 py-1.5 rounded font-mono text-xs font-bold animate-fadeIn
                                        ${entry.mult >= 10 ? 'bg-[#ff0055] text-white' : 
                                          entry.mult >= 2 ? 'bg-[#00FFC0] text-black' : 
                                          entry.mult < 1 ? 'bg-[#1A1A1A] text-[#8d8c9e]' : 'bg-[#333] text-white'}`}
                                >
                                    {entry.mult.toFixed(1)}x
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={containerRef} className="flex-1 bg-[#0c0c0e] rounded-xl border border-[#333] relative overflow-hidden min-h-[500px]">
                         <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                        <canvas ref={canvasRef} className="w-full h-full relative z-10" />
                    </div>

                </div>

            </div>

            <ProvablyFairModal 
                isOpen={pfModalOpen}
                onClose={() => setPfModalOpen(false)}
                gameName="PLINKO"
                serverSeedHash={serverSeedHash}
                clientSeed={clientSeed}
                nonce={nonce}
                onRotateSeeds={(newSeed) => {
                    setClientSeed(newSeed);
                    setNonce(0);
                    showToast("SEEDS ROTATED. LEDGER RESET.", "success");
                }}
            />
        </div>
    );
};
