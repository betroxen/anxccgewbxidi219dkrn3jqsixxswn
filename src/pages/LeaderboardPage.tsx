import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

// Extended Mock Data for V4.0
const MOCK_LEADERBOARD = [
    { rank: 1, handle: "CryptoWhale99", zp: 45250, vprScore: 5.0, level: 98, tier: "ELITE" },
    { rank: 2, handle: "SatoshiDreamer", zp: 42100, vprScore: 4.8, level: 95, tier: "ELITE" },
    { rank: 3, handle: "DegenKing", zp: 38900, vprScore: 4.9, level: 91, tier: "VETERAN" },
    { rank: 4, handle: "MoonShot", zp: 35400, vprScore: 4.6, level: 88, tier: "VETERAN" },
    { rank: 5, handle: "HodlGang", zp: 31200, vprScore: 4.7, level: 85, tier: "RUNNER" },
    { rank: 6, handle: "RTP_Hunter", zp: 28500, vprScore: 4.4, level: 82, tier: "RUNNER" },
    { rank: 7, handle: "ZeroEdge", zp: 26100, vprScore: 4.9, level: 79, tier: "RUNNER" },
];

const USER_STATS = {
    rank: 1337,
    handle: "DegenGambler",
    zp: 1240,
    vprScore: 4.5,
    level: 42,
    tier: "INTEL ANALYST"
};

const CONTESTS = [
    { id: 1, title: "WEEKLY VPR SUBMISSION", time: "3D 14H", rank: 213, pool: "5,000 ZP", action: "SUBMIT VPR" },
    { id: 2, title: "TRUE RTP HUNT", time: "12H 44M", rank: 45, pool: "1 BTC BONUS", action: "LAUNCH FINDER" },
];

export const LeaderboardPage = () => {
    const navigate = useNavigate();
    const [activeCircuit, setActiveCircuit] = useState<'ZP' | 'XP' | 'VPR'>('ZP');

    const getRankStyles = (rank: number) => {
        if (rank === 1) return "bg-yellow-500/10 text-yellow-500 border-yellow-500/50";
        if (rank === 2) return "bg-gray-300/10 text-gray-300 border-gray-300/50";
        if (rank === 3) return "bg-amber-700/10 text-amber-600 border-amber-700/50";
        return "bg-[#1A1A1A] text-[#8d8c9e] border-[#333]";
    };

    return (
        <div className="container mx-auto max-w-6xl p-4 py-6 md:p-10 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Icons.Trophy className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                        GLOBAL STANDINGS: <span className="text-[#00FFC0] text-glow">THE TOP SIGNAL</span>
                    </h1>
                </div>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                    // STATUS: LIVE STREAM. TRACK THE ELITE.
                </p>
            </div>

            {/* PERSISTENT TRACKING HUD */}
            <Card className="mb-10 p-6 bg-[#0c0c0e] border-[#00FFC0]/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Icons.Target className="h-24 w-24 text-[#00FFC0]" />
                </div>
                <h2 className="font-heading text-sm text-[#8d8c9e] uppercase mb-4 flex items-center gap-2">
                    <Icons.Crosshair className="h-4 w-4" /> YOUR CURRENT STANDING
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div className="p-4 bg-[#14131c] rounded-lg border border-[#333] flex items-center gap-4">
                        <img src="https://placehold.co/48x48/00FFC0/000000?text=DG" className="rounded-md border border-[#00FFC0]/50" alt="Profile" />
                        <div>
                            <div className="font-heading text-white uppercase">{USER_STATS.handle}</div>
                            <div className="font-mono text-xs text-[#00FFC0]">{USER_STATS.tier}</div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#14131c] rounded-lg border border-[#333]">
                        <div className="text-xs text-[#8d8c9e] font-heading uppercase mb-1">GLOBAL RANK</div>
                        <div className="font-mono text-3xl text-white font-bold">#{USER_STATS.rank.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-[#14131c] rounded-lg border border-[#333]">
                         <div className="text-xs text-[#8d8c9e] font-heading uppercase mb-1">CURRENT ZP STACK</div>
                        <div className="font-mono text-3xl text-[#00FFC0] font-bold">{USER_STATS.zp.toLocaleString()} ZP</div>
                    </div>
                </div>
            </Card>

            {/* MAIN LAYOUT */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* LEFT: MAIN LEADERBOARD (2/3) */}
                <div className="xl:col-span-2">
                    
                    {/* RANKING CIRCUIT TABS */}
                    <div className="flex border-b border-[#333] mb-6 overflow-x-auto">
                        {[
                            { id: 'ZP', label: 'ZP DOMINANCE', icon: Icons.Zap },
                            { id: 'XP', label: 'OPERATIONAL MASTERY', icon: Icons.Activity },
                            { id: 'VPR', label: 'VPR VALIDATOR', icon: Icons.Shield }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveCircuit(tab.id as any)}
                                className={`flex items-center gap-2 px-6 py-4 font-heading uppercase text-sm transition-all border-b-2 whitespace-nowrap ${
                                    activeCircuit === tab.id 
                                    ? 'border-[#00FFC0] text-white bg-[#00FFC0]/5' 
                                    : 'border-transparent text-[#8d8c9e] hover:text-white hover:bg-[#14131c]'
                                }`}
                            >
                                <tab.icon className={`h-4 w-4 ${activeCircuit === tab.id ? 'text-[#00FFC0]' : ''}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* LEADERBOARD TABLE */}
                    <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333] animate-tabSlideIn">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#14131c] border-b border-[#333]">
                                    <tr>
                                        <th className="p-4 pl-6 font-heading text-xs text-[#8d8c9e] uppercase tracking-wider">Rank</th>
                                        <th className="p-4 font-heading text-xs text-[#8d8c9e] uppercase tracking-wider">Handle / Tier</th>
                                        <th className="p-4 font-heading text-xs text-[#00FFC0] uppercase tracking-wider text-right">Total ZP Stack</th>
                                        <th className="p-4 font-heading text-xs text-[#8d8c9e] uppercase tracking-wider text-center hidden md:table-cell">VPR Score</th>
                                        <th className="p-4 pr-6 font-heading text-xs text-[#8d8c9e] uppercase tracking-wider text-right hidden sm:table-cell">Level (XP)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    {MOCK_LEADERBOARD.map((entry) => (
                                        <tr key={entry.rank} className="hover:bg-[#14131c] transition-colors group">
                                            <td className="p-4 pl-6">
                                                <div className={`h-8 w-8 rounded-md flex items-center justify-center font-bold font-mono border ${getRankStyles(entry.rank)}`}>
                                                    {entry.rank <= 3 ? <Icons.Trophy className="h-4 w-4" /> : entry.rank}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={`https://placehold.co/32x32/24232d/ffffff?text=${entry.handle.substring(0,1)}`} alt={entry.handle} className="w-8 h-8 rounded-full ring-1 ring-[#333] group-hover:ring-[#00FFC0] transition-all" />
                                                    <div>
                                                        <div className={`font-bold ${entry.rank <= 3 ? 'text-white' : 'text-[#8d8c9e] group-hover:text-white'}`}>{entry.handle}</div>
                                                        <div className="text-[10px] font-mono text-[#666] uppercase">{entry.tier}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-mono text-white font-bold text-lg">
                                                {entry.zp.toLocaleString()}
                                            </td>
                                            <td className="p-4 text-center font-mono text-[#8d8c9e] hidden md:table-cell">
                                                {entry.vprScore.toFixed(1)}
                                            </td>
                                            <td className="p-4 pr-6 text-right font-mono text-[#00FFC0] hidden sm:table-cell">
                                                LVL {entry.level}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* USER ROW (Contextual) */}
                                    <tr className="bg-[#00FFC0]/5 border-t-2 border-[#00FFC0]/20">
                                        <td className="p-4 pl-6">
                                             <div className="h-8 w-auto px-2 rounded-md flex items-center justify-center font-bold font-mono bg-[#00FFC0] text-black">
                                                #{USER_STATS.rank.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="font-bold text-white">{USER_STATS.handle} <span className="text-[#00FFC0] text-xs ml-2">(YOU)</span></div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right font-mono text-[#00FFC0] font-bold text-lg">
                                            {USER_STATS.zp.toLocaleString()}
                                        </td>
                                        <td className="p-4 text-center font-mono text-[#8d8c9e] hidden md:table-cell">
                                            {USER_STATS.vprScore.toFixed(1)}
                                        </td>
                                        <td className="p-4 pr-6 text-right font-mono text-[#00FFC0] hidden sm:table-cell">
                                            LVL {USER_STATS.level}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* RIGHT: CONTEST CIRCUIT (1/3) */}
                <div className="space-y-6">
                     <div>
                        <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2 uppercase">
                            <Icons.Flag className="h-5 w-5 text-red-500" /> GLOBAL CONTEST CIRCUIT
                        </h2>
                        <div className="space-y-4">
                            {CONTESTS.map(contest => (
                                <Card key={contest.id} className="p-5 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/50 group">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-heading text-white text-sm uppercase">{contest.title}</h3>
                                        <span className="font-mono text-red-400 text-xs bg-red-950/30 px-2 py-1 rounded border border-red-900/50 flex items-center gap-1">
                                            <Icons.Clock className="h-3 w-3" /> {contest.time}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
                                        <div className="bg-[#0A0A0A] p-2 rounded border border-[#333]">
                                            <span className="text-[#8d8c9e] block mb-1">YOUR RANK</span>
                                            <span className="text-white font-bold">#{contest.rank}</span>
                                        </div>
                                        <div className="bg-[#0A0A0A] p-2 rounded border border-[#333]">
                                            <span className="text-[#8d8c9e] block mb-1">REWARD POOL</span>
                                            <span className="text-[#00FFC0] font-bold">{contest.pool}</span>
                                        </div>
                                    </div>
                                    <Button className="w-full font-heading uppercase text-xs tracking-wider shadow-[0_0_15px_rgba(0,255,192,0.15)]">
                                        {contest.action}
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <Card className="p-6 bg-[#0c0c0e] border-[#333]">
                        <h3 className="font-heading text-white uppercase mb-4 text-sm">REWARD LOG & STATUS</h3>
                        <div className="space-y-3">
                            <Button variant="secondary" onClick={() => navigate('/rewards')} className="w-full justify-between text-xs font-mono uppercase group">
                                VIEW SSP PAYOUT LOG <Icons.ChevronRight className="h-4 w-4 text-[#333] group-hover:text-[#00FFC0]" />
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/knowledge-base')} className="w-full justify-between text-xs font-mono uppercase group">
                                CONTRIBUTION GUIDE <Icons.ChevronRight className="h-4 w-4 text-[#333] group-hover:text-[#00FFC0]" />
                            </Button>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
};