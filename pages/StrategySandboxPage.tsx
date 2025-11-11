
import React, { useContext } from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ToastContext } from '../context/ToastContext';
import { AppContext } from '../context/AppContext';

const SANDBOX_MODULES = [
    {
        id: 'mines',
        title: 'ZAP ORIGINALS: MINES',
        icon: Icons.Bomb,
        variance: '3.5/5 (HIGH)',
        rtp: '100.00%',
        desc: 'Grid-based variance testing. Ideal for martingale stress tests on variable tile counts.',
        seed: '0xF4E5D6...'
    },
    {
        id: 'plinko',
        title: 'ZAP ORIGINALS: PLINKO',
        icon: Icons.Activity, // Using Activity as a proxy for the falling ball graph/path
        variance: '4.0/5 (VERY HIGH)',
        rtp: '100.00%',
        desc: 'Test extreme multipliers (1000x) against long dry streaks in a controlled environment.',
        seed: '0xA1B2C3...'
    },
    {
        id: 'dice',
        title: 'ZAP ORIGINALS: DICE',
        icon: Icons.Dices,
        variance: '2.0/5 (MEDIUM)',
        rtp: '100.00%',
        desc: 'High-speed roll simulation. Perfect for testing automated betting scripts and wager targets.',
        seed: '0x998877...'
    },
    {
        id: 'keno',
        title: 'ZAP ORIGINALS: KENO',
        icon: Icons.Grid,
        variance: '4.5/5 (EXTREME)',
        rtp: '100.00%',
        desc: 'Classic lottery simulation. Analyze hit frequency on high-risk 10-number draws.',
        seed: '0x123ABC...'
    }
];

export const StrategySandboxPage = () => {
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };
    const appContext = useContext(AppContext);

    const handleLaunch = (moduleId: string) => {
        if (moduleId === 'mines') {
            appContext?.setCurrentPage('Mines');
        } else if (moduleId === 'plinko') {
            appContext?.setCurrentPage('Plinko');
        } else {
            showToast(`INITIALIZING ${moduleId.toUpperCase()} SIMULATION... [DEMO]`, "info");
        }
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 py-6 md:p-10 page-fade-in bg-[#121212] min-h-[calc(100vh-4rem)]">
            
            {/* 01 // CRITICAL STATUS MANDATE */}
            <div className="sticky top-16 z-20 bg-[#0c0c0e]/90 backdrop-blur-md border-y border-[#00FFC0]/20 py-2 px-4 -mx-4 md:-mx-10 md:px-10 mb-8 text-center md:text-left mt-4 md:mt-0">
                <p className="font-mono text-sm text-[#00FFC0] uppercase tracking-[0.2em] animate-pulse-slow">
                     // STATUS: 100% TRUE RTP ACTIVATED // ZERO-RISK ENVIRONMENT
                </p>
            </div>

            {/* HEADER SECTION */}
            <div className="mb-16 relative">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#00FFC0]/10 rounded-xl border border-[#00FFC0]/30">
                        <Icons.Binary className="h-10 w-10 text-[#00FFC0]" />
                    </div>
                    <h1 className="font-orbitron text-3xl md:text-5xl font-bold text-white uppercase tracking-wider leading-none">
                        STRATEGY SANDBOX: <br />
                        <span className="text-[#00FFC0] text-glow">ZERO-RISK PROTOCOL</span>
                    </h1>
                </div>
                <div className="max-w-3xl">
                    <p className="text-xl text-[#D3D3D3] leading-relaxed font-medium italic border-l-4 border-[#00FFC0] pl-6 py-2 mb-8">
                        Test strategies, dissect variance, and weaponize your edge—sans stack risk. Provably fair seeds ensure every drop mirrors live math.
                    </p>
                </div>
            </div>

            {/* 02 // SIMULATION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {SANDBOX_MODULES.map((mod, index) => (
                    <Card 
                        key={mod.id} 
                        className="group relative bg-[#1A1A1A] border-[#333] p-0 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#00FFC0] hover:shadow-[0_0_30px_rgba(0,255,192,0.15)]"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Tactical Corner Badge */}
                        <div className="absolute top-0 right-0 px-3 py-1 bg-[#0c0c0e] border-l border-b border-[#00FFC0]/30 text-[10px] font-mono text-[#00FFC0] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                            [STRATEGY CLEARANCE ENABLED]
                        </div>

                        <div className="p-6 md:p-8 flex flex-col h-full">
                            {/* Icon & Title */}
                            <div className="mb-6">
                                <mod.icon className="h-12 w-12 text-[#8d8c9e] group-hover:text-[#00FFC0] transition-colors mb-4" />
                                <h3 className="font-orbitron text-2xl text-white uppercase font-bold tracking-wider group-hover:text-glow transition-all">
                                    {mod.title}
                                </h3>
                            </div>

                            {/* Metrics Grid */}
                            <div className="space-y-4 mb-8 flex-1">
                                <div className="bg-[#0c0c0e] p-3 rounded border border-[#333] group-hover:border-[#00FFC0]/20 transition-colors">
                                    <span className="block text-xs text-[#8d8c9e] font-mono uppercase mb-1">VARIANCE INDEX</span>
                                    <div className="flex items-center gap-2 text-[#00FFC0] font-mono font-bold">
                                        <Icons.Activity className="h-4 w-4" /> {mod.variance}
                                    </div>
                                </div>
                                 <div className="bg-[#0c0c0e] p-3 rounded border border-[#333] group-hover:border-[#00FFC0]/20 transition-colors">
                                    <span className="block text-xs text-[#8d8c9e] font-mono uppercase mb-1">SIMULATED RTP</span>
                                    <div className="text-white group-hover:text-[#00FFC0] font-mono font-bold text-lg transition-colors">
                                        {mod.rtp}
                                    </div>
                                </div>
                                <p className="text-sm text-[#8d8c9e] leading-relaxed">
                                    {mod.desc}
                                </p>
                            </div>

                            {/* Footer Actions */}
                            <div className="space-y-4">
                                <Button 
                                    onClick={() => handleLaunch(mod.id)}
                                    className="w-full font-orbitron font-bold uppercase tracking-widest py-6 text-base shadow-[0_0_20px_rgba(0,255,192,0.1)] group-hover:shadow-[0_0_30px_rgba(0,255,192,0.3)] group-hover:animate-pulse-glow transition-all"
                                >
                                    LAUNCH PROTOCOL
                                </Button>
                                <div className="flex justify-between items-center text-xs font-mono text-[#8d8c9e]">
                                    <button className="hover:text-[#00FFC0] transition-colors flex items-center gap-1">
                                        <Icons.Database className="h-3 w-3" /> VIEW DATA LOG
                                    </button>
                                    <span className="flex items-center gap-1 cursor-help" title="Client-side hash generation active.">
                                        <Icons.Lock className="h-3 w-3" /> SEED: {mod.seed}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

        </div>
    );
};
