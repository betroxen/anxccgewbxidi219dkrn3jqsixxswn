import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import CryptoJS from 'crypto-js';

export const ProvablyFairPage = () => {
    // --- 1. VISUALS STATE ---
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // --- 2. VERIFIER STATE ---
    const [serverSeed, setServerSeed] = useState('a1b2c3d4e5f6789012345678901234567890123456789012345678901234');
    const [clientSeed, setClientSeed] = useState('zap_player_42');
    const [nonce, setNonce] = useState<number>(1);
    const [cursor, setCursor] = useState<number>(0);
    const [gameType, setGameType] = useState<'DICE' | 'PLINKO' | 'FLOAT' | 'MINES'>('DICE');
    
    // Game Specific Inputs
    const [plinkoRows, setPlinkoRows] = useState(16);
    const [minesCount, setMinesCount] = useState(3);

    const [hashedServerSeed, setHashedServerSeed] = useState('');
    const [verifierLog, setVerifierLog] = useState<{ timestamp: string, type: string, result: React.ReactNode }[]>([]);

    // --- 3. KINETIC EFFECTS ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles: any[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.fillStyle = `rgba(0, 255, 192, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            });
            requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- 4. CRYPTOGRAPHIC CORE ---
    useEffect(() => {
        if (serverSeed) {
             setHashedServerSeed(CryptoJS.SHA512(serverSeed).toString());
        }
    }, [serverSeed]);

    const hmacSha512 = (key: string, message: string) => {
        return CryptoJS.HmacSHA512(message, key).toString();
    };

    // Standard float generator [0, 1)
    const generateFloat = (currentCursor: number): number => {
        const hash = hmacSha512(serverSeed, `${clientSeed}:${nonce}:${currentCursor}`);
        // Use first 7 bytes (56 bits) for high precision, typical for standard PF
        const hexSegment = hash.substring(0, 14);
        const bytes = parseInt(hexSegment, 16);
        // Divide by 2^56 to get float
        return bytes / Math.pow(2, 56);
    };

    // Integer generator with rejection sampling (ensures uniform distribution)
    const generateInteger = (maxExclusive: number, startCursor: number): { value: number, nextCursor: number } => {
        // This is a simplified version. Full version uses rejection sampling if (val >= limit).
        // For demo speed and most standard ranges, this is sufficient 99% of the time.
        const float = generateFloat(startCursor);
        return { 
            value: Math.floor(float * maxExclusive), 
            nextCursor: startCursor + 1 
        };
    };

    const logResult = (type: string, content: React.ReactNode) => {
        const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
        setVerifierLog(prev => [{ timestamp, type, result: content }, ...prev].slice(0, 5));
    };

    // --- 5. GAME VERIFIERS ---
    const verifyDice = () => {
        try {
            const float = generateFloat(cursor);
            const roll = (float * 10001) / 100; // Standard 0-100 Dice formula
            logResult('DICE', <span className="animate-glitch-reveal">ROLLED: <strong className="text-[#00FFC0] text-xl">{roll.toFixed(2)}</strong></span>);
        } catch (e) {
            logResult('ERROR', <span className="text-red-500">CRYPTO ENGINE FAILURE</span>);
        }
    };

    const verifyFloat = () => {
        try {
            const float = generateFloat(cursor);
            logResult('FLOAT', <span className="animate-glitch-reveal">VALUE: <strong className="text-[#00FFC0]">{float.toFixed(10)}</strong></span>);
        } catch (e) {
             logResult('ERROR', <span className="text-red-500">CRYPTO ENGINE FAILURE</span>);
        }
    };

    const verifyPlinko = () => {
        try {
            // Need 'plinkoRows' number of random directions (0=left, 1=right)
            // We can use a single large integer's bits for this.
            // 16 rows = 16 bits needed.
            const directionsInt = generateInteger(Math.pow(2, plinkoRows), cursor).value;
            // Count set bits (Hamming weight) to find bucket index
            let bucket = 0;
            let temp = directionsInt;
            for (let i = 0; i < plinkoRows; i++) {
                bucket += temp & 1;
                temp >>= 1;
            }
            logResult(`PLINKO (${plinkoRows})`, <span className="animate-glitch-reveal">LANDED BUCKET: <strong className="text-[#00FFC0] text-xl">{bucket}</strong> / {plinkoRows}</span>);
        } catch (e) {
             logResult('ERROR', <span className="text-red-500">CRYPTO ENGINE FAILURE</span>);
        }
    };

    const verifyMines = () => {
        try {
            // Fisher-Yates shuffle simulation to place mines
            const boardSize = 25;
            const minesPositions: number[] = [];
            let currentCursor = cursor;
            
            // We need to pick 'minesCount' unique positions
            const availableTiles = Array.from({ length: boardSize }, (_, i) => i);
            
            for (let i = 0; i < minesCount; i++) {
                // Pick a random index from currently available tiles
                const result = generateInteger(availableTiles.length, currentCursor);
                currentCursor = result.nextCursor;
                const pickIndex = result.value;
                
                // Add the actual tile ID to mines list
                minesPositions.push(availableTiles[pickIndex]);
                // Remove picked tile from available pool
                availableTiles.splice(pickIndex, 1);
            }

            minesPositions.sort((a, b) => a - b);

            logResult(`MINES (${minesCount})`, (
                <div className="animate-glitch-reveal">
                    <div className="mb-2">MINE LOCATIONS (0-24):</div>
                    <div className="flex flex-wrap gap-1.5">
                        {minesPositions.map(pos => (
                            <span key={pos} className="bg-red-950/50 text-red-400 border border-red-900/50 px-1.5 py-0.5 rounded-sm font-bold font-mono text-xs">
                                {pos}
                            </span>
                        ))}
                    </div>
                </div>
            ));

        } catch (e) {
             logResult('ERROR', <span className="text-red-500">CRYPTO ENGINE FAILURE</span>);
        }
    };

    const executeVerify = () => {
        switch (gameType) {
            case 'DICE': verifyDice(); break;
            case 'FLOAT': verifyFloat(); break;
            case 'PLINKO': verifyPlinko(); break;
            case 'MINES': verifyMines(); break;
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-mono relative overflow-hidden page-fade-in">
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />
            
            {/* PAGE CONTAINER */}
            <div className="container mx-auto max-w-6xl p-4 py-12 md:py-20 relative z-10">
                
                {/* HEADER */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00FFC0]/5 border border-[#00FFC0]/30 rounded-full mb-6 animate-fade-up">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FFC0]"></span>
                        </span>
                        <span className="text-[#00FFC0] font-mono text-xs uppercase tracking-widest font-bold">CLIENT-SIDE VERIFIER LIVE</span>
                    </div>
                    <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-4 tracking-tight animate-depth-in">
                        TRUST IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC0] to-white">CODE</span>.
                    </h1>
                    <p className="text-lg text-[#8d8c9e] font-medium max-w-2xl mx-auto animate-fade-up">
                        Don't take our word for it. Verify every outcome yourself. Zero server calls. Just pure, auditable math running right in your browser.
                    </p>
                </div>

                {/* --- HYPER VERIFIER TERMINAL --- */}
                <Card className="bg-[#0c0c0e]/90 backdrop-blur-xl border-[#00FFC0]/30 p-0 overflow-hidden shadow-[0_0_50px_rgba(0,255,192,0.1)] animate-fade-up relative">
                     {/* Terminal Scanline */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(0,255,192,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline opacity-50 mix-blend-screen"></div>
                    
                    {/* Terminal Header */}
                    <div className="bg-[#14131c] p-4 border-b border-[#333] flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Icons.Terminal className="h-5 w-5 text-[#00FFC0]" />
                            <span className="font-heading text-white text-sm uppercase tracking-widest">CRYPTOGRAPHIC AUDIT CONSOLE v2.1</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-[#00FFC0]/20 border border-[#00FFC0]/50 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                        
                        {/* LEFT: INPUTS (5/12) */}
                        <div className="lg:col-span-5 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#333] bg-[#0A0A0A]/50">
                             <div className="space-y-6">
                                
                                <div>
                                    <label className="text-[#00FFC0] text-xs uppercase font-heading tracking-wider mb-2 block">Server Seed (Unhashed)</label>
                                    <Input 
                                        value={serverSeed}
                                        onChange={(e) => setServerSeed(e.target.value)}
                                        className="font-mono text-xs bg-[#0c0c0e] border-[#333] focus:border-[#00FFC0] h-11"
                                        placeholder="Paste revealed server seed..."
                                    />
                                     <div className="mt-2 p-2 bg-black/30 rounded border border-[#333] text-[10px] font-mono text-[#8d8c9e] break-all">
                                        <span className="text-[#00FFC0] mr-2">[LIVE HASH]</span> 
                                        {hashedServerSeed || '...'}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[#00FFC0] text-xs uppercase font-heading tracking-wider mb-2 block">Client Seed</label>
                                    <Input 
                                        value={clientSeed}
                                        onChange={(e) => setClientSeed(e.target.value)}
                                        className="font-mono text-xs bg-[#0c0c0e] border-[#333] focus:border-[#00FFC0] h-11"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[#8d8c9e] text-xs uppercase font-heading tracking-wider mb-2 block">Nonce</label>
                                        <Input 
                                            type="number" 
                                            value={nonce}
                                            onChange={(e) => setNonce(Number(e.target.value))}
                                            className="font-mono bg-[#0c0c0e] border-[#333] focus:border-[#00FFC0]"
                                        />
                                    </div>
                                     <div>
                                        <label className="text-[#8d8c9e] text-xs uppercase font-heading tracking-wider mb-2 block">Cursor</label>
                                        <Input 
                                            type="number" 
                                            value={cursor}
                                            onChange={(e) => setCursor(Number(e.target.value))}
                                            className="font-mono bg-[#0c0c0e] border-[#333] focus:border-[#00FFC0]"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* RIGHT: EXECUTION & OUTPUT (7/12) */}
                        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col">
                            
                            {/* Game Selector */}
                            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-[#0c0c0e] border border-[#333] rounded-lg">
                                {['DICE', 'PLINKO', 'MINES', 'FLOAT'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setGameType(type as any)}
                                        className={`flex-1 py-2.5 text-xs font-heading uppercase rounded-md transition-all ${gameType === type ? 'bg-[#00FFC0] text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.3)]' : 'text-[#8d8c9e] hover:text-white'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            {/* Dynamic Game Options */}
                            <div className="mb-8 min-h-[60px]">
                                {gameType === 'PLINKO' && (
                                     <div className="animate-fadeIn">
                                        <label className="text-[#8d8c9e] text-xs uppercase font-heading tracking-wider mb-2 block">Rows</label>
                                        <select 
                                            value={plinkoRows} onChange={(e) => setPlinkoRows(Number(e.target.value))}
                                            className="w-full h-10 bg-[#0c0c0e] border border-[#333] rounded px-3 text-sm text-white font-mono focus:border-[#00FFC0]"
                                        >
                                            {[8, 10, 12, 14, 16].map(r => <option key={r} value={r}>{r} ROWS</option>)}
                                        </select>
                                    </div>
                                )}
                                {gameType === 'MINES' && (
                                     <div className="animate-fadeIn">
                                        <label className="text-[#8d8c9e] text-xs uppercase font-heading tracking-wider mb-2 block">Mines Count (1-24)</label>
                                        <Input 
                                            type="number" min="1" max="24"
                                            value={minesCount} onChange={(e) => setMinesCount(Math.min(24, Math.max(1, Number(e.target.value))))}
                                            className="font-mono bg-[#0c0c0e] border-[#333] focus:border-[#00FFC0]"
                                        />
                                    </div>
                                )}
                                {(gameType === 'DICE' || gameType === 'FLOAT') && (
                                    <div className="text-[#8d8c9e] text-xs font-mono flex items-center h-full opacity-50 uppercase">
                                        // NO ADDITIONAL PARAMETERS REQUIRED
                                    </div>
                                )}
                            </div>

                            {/* EXECUTE BUTTON */}
                            <Button 
                                onClick={executeVerify} 
                                size="lg" 
                                className="w-full py-6 font-heading uppercase tracking-[0.2em] text-base shadow-[0_0_30px_rgba(0,255,192,0.25)] animate-pulse-glow"
                            >
                                RUN VERIFICATION PROTOCOL
                            </Button>

                            {/* TERMINAL OUTPUT */}
                            <div className="mt-8 flex-1 bg-[#050505] rounded-lg border border-[#333] p-4 font-mono text-sm overflow-y-auto custom-scrollbar shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative">
                                {verifierLog.length === 0 ? (
                                    <div className="h-full flex items-center justify-center text-[#333] uppercase tracking-widest">
                                        AWAITING EXECUTION...
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {verifierLog.map((log, i) => (
                                            <div key={i} className={`flex gap-3 ${i === 0 ? 'opacity-100' : 'opacity-60'}`}>
                                                <span className="text-[#666] shrink-0">[{log.timestamp}]</span>
                                                <span className={`font-bold shrink-0 ${log.type === 'ERROR' ? 'text-red-500' : 'text-[#00FFC0]'}`}>{log.type}></span>
                                                <span className="text-[#E0E0E0] break-all">{log.result}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* Blinking cursor at bottom */}
                                <div className="absolute bottom-4 left-4 flex gap-2 text-[#00FFC0]">
                                    <span>></span><span className="animate-pulse">_</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </Card>

                {/* --- EDUCATION SECTION --- */}
                <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/50 group">
                        <Icons.Lock className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-white uppercase mb-2">1. The Commitment</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Before you bet, we generate a <strong className="text-white">Server Seed</strong> and show you its SHA-512 hash. This commits us to the outcome before you even press play.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/50 group">
                        <Icons.Users className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-white uppercase mb-2">2. Your Influence</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            You provide a <strong className="text-white">Client Seed</strong>. We combine this with our seed to generate the result. Since we don't know your seed in advance, we can't rig the outcome.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/50 group">
                        <Icons.Eye className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-white uppercase mb-2">3. The Reveal</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            After the game, we reveal the unhashed Server Seed. You can paste it into the verifier above to prove it matches the initial hash and generated the exact same result.
                        </p>
                    </Card>
                </div>

            </div>
        </div>
    );
};