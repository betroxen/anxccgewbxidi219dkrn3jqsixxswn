
import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ToastContext } from '../context/ToastContext';
import { AppContext } from '../context/AppContext';
import { Input } from '../components/Input';

declare global {
    interface Window { CryptoJS: any; }
}

// --- In-file Components for modularity without creating new files ---

const Modal: React.FC<{ isOpen: boolean; onClose?: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-[#0c0c0e] rounded-lg p-8 max-w-2xl w-full shadow-2xl border border-[#333]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const EducationalDisclaimerModal: React.FC<{ isOpen: boolean, onAccept: () => void }> = ({ isOpen, onAccept }) => (
    <Modal isOpen={isOpen}>
        <h2 className="font-heading text-2xl neon-text mb-6 text-center">EDUCATIONAL SIMULATOR DISCLAIMER</h2>
        <div className="space-y-4 text-[#8d8c9e] mb-8">
            <p className="text-lg text-white"><strong>This is NOT real gambling.</strong> You cannot win or lose real money.</p>
            <div className="bg-[#14131c] p-4 rounded border border-[#00FFC0]/30">
                <p className="mb-3"><strong className="text-white">Key Truth:</strong> In real gambling with &lt;100% RTP, the house always has a mathematical advantage.</p>
                <p className="text-sm">This sandbox uses 100% RTP to demonstrate variance and probability. Real casinos typically use 94-98% RTP.</p>
            </div>
            <p>No betting system can overcome a negative expected value. "Hot streaks" are statistical illusions.</p>
            <p className="text-sm">This tool exists to <strong>debunk gambling myths</strong> and demonstrate mathematical reality.</p>
        </div>
        <div className="flex justify-center">
            <Button onClick={onAccept} variant="primary" size="lg">I Understand - Enter Sandbox</Button>
        </div>
    </Modal>
);

const SeedVerificationModal: React.FC<{isOpen: boolean, onClose: () => void, seedPair: any, onRotate: () => void}> = ({isOpen, onClose, seedPair, onRotate}) => {
    const { showToast } = useContext(ToastContext) || {};
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showToast?.("Copied to clipboard", "success");
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
             <h2 className="font-heading text-2xl text-white mb-6 text-center">PROVABLY FAIR SEED PAIR</h2>
             <div className="space-y-4 font-mono text-xs">
                 <div>
                     <label className="text-[#8d8c9e] uppercase block mb-1">Server Seed (Hashed)</label>
                     <div className="flex items-center gap-2 p-2 bg-[#14131c] border border-[#333] rounded">
                         <input readOnly value={seedPair.serverSeedHash} className="bg-transparent w-full outline-none text-white truncate"/>
                         {/* FIX: Use the newly added Copy icon. */}
                         <Button size="sm" variant="ghost" onClick={() => handleCopy(seedPair.serverSeedHash)}><Icons.Copy className="h-4 w-4"/></Button>
                     </div>
                 </div>
                 <div>
                     <label className="text-[#8d8c9e] uppercase block mb-1">Client Seed</label>
                      <div className="flex items-center gap-2 p-2 bg-[#14131c] border border-[#333] rounded">
                         <input readOnly value={seedPair.clientSeed} className="bg-transparent w-full outline-none text-white truncate"/>
                         {/* FIX: Use the newly added Copy icon. */}
                         <Button size="sm" variant="ghost" onClick={() => handleCopy(seedPair.clientSeed)}><Icons.Copy className="h-4 w-4"/></Button>
                     </div>
                 </div>
                 <div className="pt-4 flex justify-center">
                    <Button onClick={() => { onRotate(); onClose(); }} variant="primary">Rotate Seeds</Button>
                 </div>
             </div>
        </Modal>
    );
};


const StatusBanner: React.FC<{ seedHash: string; onVerify: () => void }> = ({ seedHash, onVerify }) => (
    <div className="bg-[#0A0A0A] border-b-2 border-[#00FFC0]/50 sticky top-16 z-30">
        <div className="container mx-auto px-6 py-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="font-mono text-[#00FFC0] text-sm md:text-base animate-pulse-slow">
                    <span className="font-bold">STATUS:</span> 100% TRUE RTP ACTIVATED • ZERO-RISK ENVIRONMENT
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-mono text-[#8d8c9e] text-xs md:text-sm hidden sm:inline">
                        PROVABLY FAIR SEED: {seedHash.substring(0, 12)}...
                    </span>
                    <button onClick={onVerify} className="text-xs font-mono text-white hover:underline hover:text-[#00FFC0]">
                        [VERIFY SEED]
                    </button>
                </div>
            </div>
        </div>
    </div>
);


const GameCard = ({ game, onLaunch }: { game: any; onLaunch: () => void }) => (
  <motion.div
    className="relative bg-[#1A1A1A] border border-[#333] rounded-lg p-6 shadow-card cursor-crosshair overflow-hidden group"
    whileHover={{ y: -5, boxShadow: '0 0 24px rgba(0, 255, 192, 0.3)' }}
    transition={{ duration: 0.2 }}
  >
    <div className="text-center">
      <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">{game.icon}</div>
      <h3 className="font-heading text-xl mb-4 text-white">{game.title}</h3>

      <div className="space-y-3 mb-6">
        <div className="bg-[#0c0c0e] p-3 rounded border border-[#333] text-center">
            <span className="block text-xs text-[#8d8c9e] font-mono uppercase mb-1">VARIANCE INDEX</span>
            <div className="flex items-center justify-center gap-2 text-[#00FFC0] font-mono font-bold">
                <Icons.Activity className="h-4 w-4" /> {game.variance}
            </div>
        </div>
        <div className="bg-[#0c0c0e] p-3 rounded border border-[#333] text-center">
            <span className="block text-xs text-[#8d8c9e] font-mono uppercase mb-1">SIMULATED RTP</span>
            <div className="text-white group-hover:text-[#00FFC0] font-mono font-bold text-lg transition-colors">
                {game.rtp}
            </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={onLaunch} variant="primary" className="w-full">
          LAUNCH PROTOCOL
        </Button>
      </div>

      <div className="mt-4">
        <span className="text-xs text-[#00FFC0]/50 italic group-hover:text-[#00FFC0] transition-colors">
          [STRATEGY CLEARANCE ENABLED]
        </span>
      </div>
    </div>
  </motion.div>
);

const SANDBOX_MODULES = [
    { id: 'mines', title: 'ZAP ORIGINALS: MINES', icon: '💣', variance: '3.5/5 (HIGH)', rtp: '100.00%', desc: 'Grid-based variance testing for martingale stress tests.' },
    { id: 'plinko', title: 'ZAP ORIGINALS: PLINKO', icon: '⏬', variance: '4.0/5 (VERY HIGH)', rtp: '100.00%', desc: 'Test extreme multipliers against long dry streaks.' },
    { id: 'dice', title: 'ZAP ORIGINALS: DICE', icon: '🎲', variance: '2.0/5 (MEDIUM)', rtp: '100.00%', desc: 'High-speed roll simulation for automated betting scripts.' },
];

export const StrategySandboxPage = () => {
    const { showToast } = useContext(ToastContext) || {};
    const appContext = useContext(AppContext);

    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [showSeedModal, setShowSeedModal] = useState(false);
    const [seedPair, setSeedPair] = useState({ serverSeedHash: '', clientSeed: '' });

    useEffect(() => {
        const hasSeenDisclaimer = sessionStorage.getItem('zap_disclaimer_seen');
        if (hasSeenDisclaimer !== 'true') {
            setShowDisclaimer(true);
        }
        rotateSeeds();
    }, []);

    const handleDisclaimerAccept = () => {
        sessionStorage.setItem('zap_disclaimer_seen', 'true');
        setShowDisclaimer(false);
    };
    
    const rotateSeeds = () => {
        const clientSeed = `user_session_${Math.random().toString(36).substring(2, 10)}`;
        const serverSeed = window.CryptoJS.lib.WordArray.random(32).toString();
        const serverSeedHash = window.CryptoJS.SHA256(serverSeed).toString();
        setSeedPair({ serverSeedHash, clientSeed });
        showToast?.("NEW PROVABLY FAIR SEEDS GENERATED.", "info");
    };

    const handleLaunch = (moduleId: string) => {
        if (moduleId === 'mines') appContext?.setCurrentPage('Mines');
        else if (moduleId === 'plinko') appContext?.setCurrentPage('Plinko');
        else showToast?.(`INITIALIZING ${moduleId.toUpperCase()} SIMULATION... [DEMO]`, "info");
    };

    return (
        <div className="bg-[#0A0A0A] min-h-full relative overflow-hidden">
            <AnimatePresence>
                <EducationalDisclaimerModal isOpen={showDisclaimer} onAccept={handleDisclaimerAccept} />
            </AnimatePresence>
            <SeedVerificationModal isOpen={showSeedModal} onClose={() => setShowSeedModal(false)} seedPair={seedPair} onRotate={rotateSeeds} />

            <StatusBanner seedHash={seedPair.serverSeedHash} onVerify={() => setShowSeedModal(true)} />
            
            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="text-center mb-16">
                     <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-4 tracking-tight animate-depth-in">
                        ZAP STRATEGY <span className="neon-text">SANDBOX</span>
                    </h1>
                    <p className="text-lg text-[#8d8c9e] font-medium max-w-2xl mx-auto animate-fade-up" style={{animationDelay: '200ms'}}>
                        Test strategies, verify game variance, and refine your edge without stack deployment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {SANDBOX_MODULES.map((game, index) => (
                         <motion.div key={game.id} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3 + index * 0.1}}>
                             <GameCard game={game} onLaunch={() => handleLaunch(game.id)} />
                         </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:30px_30px] animate-moving-grid"></div>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent"></div>
            </div>
        </div>
    );
};