
import React, { useState, useMemo } from 'react';
import { mockCasinosData } from '../constants/casinos';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

export const BonusOffersPage = ({ setViewingCasinoId }: { setViewingCasinoId: (id: string | null) => void; }) => {
    const [sortBy, setSortBy] = useState<'value' | 'wagering' | 'newest'>('value');

    // Enrich mock data with specific bonus metrics for the demo
    const enrichedBonuses = useMemo(() => {
        return mockCasinosData
            .filter(c => c.tags.includes('high-bonus') || c.tags.includes('new'))
            .map(c => ({
                ...c,
                wagering: c.id === 'stake' ? 35 : c.id === 'duel' ? 40 : c.id === 'roobet' ? 45 : 30 + Math.floor(Math.random() * 15),
                minDeposit: c.id === 'stake' ? 20 : 50,
                maxCashout: c.id === 'stake' ? 'UNLIMITED' : '$5,000',
                code: c.id === 'stake' ? 'ZAPVIP' : 'AUTO'
            }))
            .sort((a, b) => {
                if (sortBy === 'wagering') return a.wagering - b.wagering;
                if (sortBy === 'newest') return (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0);
                // Default 'value' sort (mock based on rating as proxy for value quality)
                return b.rating - a.rating;
            });
    }, [sortBy]);

    return (
        <div className="container mx-auto max-w-[1400px] p-4 py-6 md:p-10 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Icons.Gift className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                            ACTIVE BONUS OPERATIONS
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest">
                        <p className="text-[#00FFC0]">// STATUS: LIVE BOUNTIES</p>
                        <span className="text-[#333]">|</span>
                        <p className="text-[#8d8c9e]">{enrichedBonuses.length} TARGETS ACQUIRED</p>
                    </div>
                </div>

                {/* TACTICAL SORT */}
                <div className="flex p-1 bg-[#0c0c0e] rounded-lg border border-[#333]">
                    {[
                        { id: 'value', label: 'HIGHEST VALUE', icon: Icons.Star },
                        { id: 'wagering', label: 'LOWEST WAGERING', icon: Icons.Percent },
                        { id: 'newest', label: 'FRESH INTEL', icon: Icons.Zap }
                    ].map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => setSortBy(opt.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md font-heading uppercase text-xs transition-all ${
                                sortBy === opt.id 
                                ? 'bg-[#00FFC0] text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.3)]' 
                                : 'text-[#8d8c9e] hover:text-white'
                            }`}
                        >
                            <opt.icon className="h-3 w-3" />
                            <span className="hidden md:inline">{opt.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* BOUNTY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {enrichedBonuses.map((casino, index) => (
                    <Card key={casino.id} className="flex flex-col p-0 overflow-hidden bg-[#14131c] border-[#333] group hover:border-[#00FFC0]/50 animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
                        
                        {/* Card Header */}
                        <div className="p-5 border-b border-[#333] bg-[#0c0c0e] flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <img src={casino.logo} alt={casino.name} className="w-10 h-10 rounded-md border border-[#333]" />
                                <div>
                                    <h3 className="font-heading text-lg text-white uppercase">{casino.name}</h3>
                                    {casino.tags.includes('new') && (
                                        <span className="text-[10px] text-[#00FFC0] font-mono flex items-center gap-1">
                                            <Icons.Zap className="h-3 w-3" /> FRESH SIGNAL
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-white font-bold text-lg">{casino.rating.toFixed(1)}</div>
                                <div className="text-[10px] text-[#8d8c9e] font-heading uppercase">ZAP SCORE</div>
                            </div>
                        </div>

                        {/* Main Offer (Hero) */}
                        <div className="p-6 pb-4 flex-1 flex flex-col justify-center text-center relative overflow-hidden">
                             <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FFC0] via-transparent to-transparent group-hover:opacity-10 transition-opacity"></div>
                            <h4 className="font-orbitron text-2xl md:text-3xl text-white uppercase font-black tracking-wider leading-tight mb-2 relative z-10">
                                {casino.bonus}
                            </h4>
                        </div>

                        {/* Intel Grid */}
                        <div className="px-6 pb-6">
                            <div className="grid grid-cols-3 gap-px bg-[#333] border border-[#333] rounded-md overflow-hidden mb-6">
                                <div className="bg-[#1A1A1A] p-3 text-center">
                                    <span className="block text-[10px] text-[#8d8c9e] font-heading uppercase mb-1">WAGERING</span>
                                    <span className={`font-mono font-bold text-sm ${casino.wagering <= 35 ? 'text-[#00FFC0]' : 'text-yellow-500'}`}>
                                        {casino.wagering}x
                                    </span>
                                </div>
                                <div className="bg-[#1A1A1A] p-3 text-center">
                                    <span className="block text-[10px] text-[#8d8c9e] font-heading uppercase mb-1">MIN DEP</span>
                                    <span className="font-mono font-bold text-white text-sm">${casino.minDeposit}</span>
                                </div>
                                <div className="bg-[#1A1A1A] p-3 text-center">
                                    <span className="block text-[10px] text-[#8d8c9e] font-heading uppercase mb-1">CODE</span>
                                    <span className="font-mono font-bold text-[#00FFC0] text-sm tracking-wider">{casino.code}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button 
                                    onClick={() => setViewingCasinoId(casino.id)} 
                                    className="flex-1 font-heading uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,192,0.15)]"
                                >
                                    CLAIM BOUNTY
                                </Button>
                                <Button 
                                    variant="secondary"
                                    onClick={() => setViewingCasinoId(casino.id)} 
                                    className="px-3 border-[#333] hover:border-white"
                                    title="View Full Intel"
                                >
                                    <Icons.Eye className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                    </Card>
                ))}
            </div>
        </div>
    );
};
