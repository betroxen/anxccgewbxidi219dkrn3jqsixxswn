import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Tooltip } from '../components/Tooltip';
import CryptoJS from 'crypto-js';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  variance: number;
  description: string;
  icon: React.FC<any>;
}

interface SimulationSession {
  id: string;
  startTime: number;
  seeds: {
    clientSeed: string;
    serverSeed: string;
    serverSeedHash: string;
  };
}

// --- IN-PAGE COMPONENTS (Adhering to file structure constraints) ---

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops: number[] = Array(Math.floor(columns)).fill(1);

    let animationFrame: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FFC0';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const ScanlineEffect: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#00FFC0]/50 to-transparent animate-scanline-vertical opacity-50" />
    </div>
);

const HeaderBar: React.FC = () => (
    <header className="relative overflow-hidden bg-[#14131c]/50 border-b border-[#00FFC0]/20 py-8 text-center">
        <ScanlineEffect />
        <h1 className="font-heading text-4xl md:text-5xl neon-text">
            ZAP STRATEGY SANDBOX: ZERO-RISK PROTOCOL
        </h1>
        <p className="mt-3 text-[#8d8c9e] max-w-2xl mx-auto font-tactical">
            Test strategies, verify game variance, and refine your edge without stack deployment.
        </p>
    </header>
);

const StatusBanner: React.FC<{ seedHash: string; onVerify: () => void }> = ({ seedHash, onVerify }) => (
    <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border-y-2 border-[#00FFC0] sticky top-16 z-30">
        <div className="container mx-auto px-6 py-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="font-mono text-[#00FFC0] text-sm md:text-base animate-pulse-slow">
                    <span className="font-bold">STATUS:</span> 100% TRUE RTP ACTIVATED • NO HOUSE EDGE
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-mono text-[#00FFC0]/70 text-xs md:text-sm">
                        PROVABLY FAIR SEED: {seedHash.substring(0, 10)}...
                    </span>
                    <button onClick={onVerify} className="text-xs font-mono text-white hover:underline hover:text-[#00FFC0]">
                        [VERIFY SEED]
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const MetricDisplay: React.FC<{ label: string; value: string; large?: boolean; tooltip: string }> = ({ label, value, large, tooltip }) => (
    <div className={`bg-black/30 p-3 rounded border border-white/10 ${large ? 'col-span-2' : ''}`}>
        <Tooltip content={tooltip}>
            <span className="text-xs text-[#8d8c9e] font-mono uppercase flex items-center justify-center gap-1.5">
                {label} <Icons.Info className="h-3 w-3" />
            </span>
        </Tooltip>
        <p className={`font-mono font-bold text-center ${large ? 'text-xl text-[#00FFC0]' : 'text-lg text-white'}`}>
            {value}
        </p>
    </div>
);

const GameCard: React.FC<{ game: Game; onLaunch: () => void; onViewData: () => void }> = ({ game, onLaunch, onViewData }) => (
    <motion.div
        className="relative bg-[#14131c]/50 backdrop-blur-md rounded-lg p-6 shadow-card cursor-crosshair border border-white/10"
        whileHover={{ y: -4, borderColor: 'rgba(0, 255, 192, 0.8)', boxShadow: '0 0 24px rgba(0, 255, 192, 0.3)' }}
        transition={{ duration: 0.2 }}
    >
        <div className="text-center">
            <div className="text-6xl mb-4 text-[#00FFC0] text-glow"><game.icon className="inline-block" /></div>
            <h3 className="font-heading text-xl mb-4">{game.title}</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
                <MetricDisplay label="Variance Index" value={`${game.variance}/5`} tooltip="Measures outcome volatility - higher = bigger swings" />
                <MetricDisplay label="Simulated RTP" value="100.00%" large tooltip="Full return to player - educational mode only" />
            </div>

            <div className="flex flex-col gap-2">
                <Button onClick={onLaunch} variant="primary" className="w-full">
                    LAUNCH PROTOCOL
                </Button>
                <Button onClick={onViewData} variant="secondary" className="w-full text-sm">
                    VIEW DATA LOG
                </Button>
            </div>
            <div className="mt-4">
                <span className="text-xs text-[#00FFC0]/50 italic">
                    [STRATEGY CLEARANCE ENABLED]
                </span>
            </div>
        </div>
    </motion.div>
);

const SeedVerificationModal: React.FC<{ isOpen: boolean; session: SimulationSession | null; onClose: () => void; onRotate: () => void }> = ({ isOpen, session, onClose, onRotate }) => {
    const { showToast } = useToast();

    if (!isOpen || !session) return null;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        showToast("Copied to clipboard", "success");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                className="bg-[#0c0c0e] rounded-lg p-8 max-w-2xl w-full shadow-modal border border-[#00FFC0]/30"
            >
                <h2 className="font-heading text-2xl neon-text mb-6 text-center">PROVABLY FAIR SEED PAIR</h2>
                <div className="space-y-4 font-mono text-sm">
                    {['serverSeed', 'clientSeed', 'serverSeedHash'].map(key => (
                        <div key={key}>
                            <label className="text-xs text-[#8d8c9e] uppercase block mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                            <div className="flex items-center gap-2 p-2 bg-[#14131c] border border-[#333] rounded">
                                <input readOnly value={(session.seeds as any)[key]} className="bg-transparent w-full outline-none text-white truncate" />
                                <Button size="sm" variant="ghost" onClick={() => copyToClipboard((session.seeds as any)[key])}><Icons.Copy className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <Button onClick={onRotate} variant="primary">ROTATE SEEDS</Button>
                    <Button onClick={onClose} variant="secondary">CLOSE</Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- MAIN PAGE COMPONENT ---

export const StrategySandboxPage = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [isLaunching, setIsLaunching] = useState(false);
    const [currentSession, setCurrentSession] = useState<SimulationSession | null>(null);
    const [showSeedModal, setShowSeedModal] = useState(false);
    
    // Static definition of games
    const games: Game[] = [
      { id: 'plinko', title: 'ZAP Originals: Plinko', variance: 4.5, description: 'High-variance peg drop with 16 payout buckets', icon: Icons.Activity },
      { id: 'mines', title: 'ZAP Originals: Mines', variance: 3.5, description: 'Classic 6-sided roll with perfect uniformity', icon: Icons.Bomb },
      { id: 'dice', title: 'ZAP Originals: Dice', variance: 1.0, description: 'Exponential multiplier with house edge simulation', icon: Icons.Dices }, // No page for this one yet
    ];

    // Provably Fair Logic
    const generateSeedPair = (): SimulationSession['seeds'] => {
        const clientSeed = `user_session_${Math.random().toString(36).substring(2, 10)}`;
        const serverSeed = CryptoJS.lib.WordArray.random(32).toString();
        const serverSeedHash = CryptoJS.SHA256(serverSeed).toString();
        return { clientSeed, serverSeed, serverSeedHash };
    };

    const startNewSession = () => {
        const session: SimulationSession = {
            id: `session_${Date.now()}`,
            startTime: Date.now(),
            seeds: generateSeedPair(),
        };
        setCurrentSession(session);
        showToast("New Provably Fair Session Initialized", "success");
    };

    useEffect(() => {
        startNewSession(); // Initialize first session on load
    }, []);

    const handleLaunch = async (gameId: string) => {
        setIsLaunching(true);
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate boot
        setIsLaunching(false);
        
        const gamePaths: { [key: string]: string } = {
            mines: '/strategy-sandbox/mines',
            plinko: '/strategy-sandbox/plinko'
        };

        const path = gamePaths[gameId];
        if (path) {
            navigate(path);
        } else {
            showToast(`${gameId} simulation not yet available.`, "info");
        }
    };
    
    // Remove disclaimer logic as per instructions
    useEffect(() => {
        const hasSeenDisclaimer = sessionStorage.getItem('zap_disclaimer_seen');
        if (!hasSeenDisclaimer) {
            // No longer show modal, but we can set the flag anyway
            sessionStorage.setItem('zap_disclaimer_seen', 'true');
        }
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLaunching && <MatrixRain />}
            </AnimatePresence>
            
            <div className="min-h-full bg-foundation text-text-primary">
                <HeaderBar />
                {currentSession && (
                    <StatusBanner 
                        seedHash={currentSession.seeds.serverSeedHash}
                        onVerify={() => setShowSeedModal(true)}
                    />
                )}
                
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {games.map((game, index) => (
                             <motion.div 
                                key={game.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                             >
                                <GameCard
                                    game={game}
                                    onLaunch={() => handleLaunch(game.id)}
                                    onViewData={() => navigate('/knowledge-base')}
                                />
                             </motion.div>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    <SeedVerificationModal
                        isOpen={showSeedModal}
                        session={currentSession}
                        onClose={() => setShowSeedModal(false)}
                        onRotate={startNewSession}
                    />
                </AnimatePresence>
            </div>
        </>
    );
};