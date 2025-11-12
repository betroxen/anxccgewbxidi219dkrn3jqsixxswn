
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

// --- MOCK DATA ---
const LIVE_TARGETS = [
    { id: 1, name: "THE DAILY CRUSH", host: "Stake", verified: true, pool: "$5,000 USDC", time: "04h 22m 15s", action: "JOIN CIRCUIT & ENGAGE" },
    { id: 2, name: "MAX VOLATILITY RUN", host: "Duel", verified: true, pool: "2.5 BTC", time: "1D 18H 45M", action: "VIEW LEADERBOARD" },
    { id: 3, name: "NEW SLOT DEPLOY", host: "Apex Crypto", verified: false, pool: "10,000 USDT", time: "7D 00H 00M", action: "VIEW STRATEGY GUIDE" },
];

const UPCOMING_DEPLOYMENTS = [
    { date: "11/20 (THU)", name: "SSP MASTERY CIRCUIT", access: "Exclusive (Contributor)", focus: "Slots (High RTP)" },
    { date: "12/01 (MON)", name: "MONTHLY BTC BRAWL", access: "Open Access", focus: "Crash/Dice (High Volatility)" },
    { date: "12/15 (MON)", name: "CREATOR COLLABORATION", access: "Streamer-Vetted", focus: "Live Casino" },
];

export const TournamentsPage = () => {

    return (
        <div className="container mx-auto max-w-6xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <Icons.Trophy className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                        ZAP COMPETITIVE CIRCUIT: <span className="text-[#00FFC0] text-glow">HIGH-STAKES GRID</span>
                    </h1>
                </div>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                    // STATUS: OPERATIONAL // GLOBAL PROVING GROUND
                </p>
            </div>

            {/* PERSISTENT TRACKING HUD */}
            <Card className="p-0 overflow-hidden mb-12 bg-[#0c0c0e] border-[#00FFC0]/30">
                <div className="p-3 bg-[#14131c] border-b border-[#333]">
                    <h3 className="font-heading text-xs text-[#8d8c9e] uppercase tracking-widest flex items-center gap-2">
                        <Icons.Crosshair className="h-4 w-4 text-[#00FFC0]" /> OPERATIONAL STANDING
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    {/* Rank */}
                    <div className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/10 rounded-lg">
                            <Icons.Trophy className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-xs font-mono text-[#8d8c9e] uppercase mb-1">GLOBAL RANK (ALL-TIME)</p>
                            <p className="text-2xl font-mono text-white font-bold">#1,337</p>
                            <button className="text-xs text-[#00FFC0] hover:underline font-mono mt-1">[VIEW DOSSIER]</button>
                        </div>
                    </div>
                    {/* ZP Earned */}
                    <div className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-[#00FFC0]/10 rounded-lg">
                            <Icons.Zap className="h-6 w-6 text-[#00FFC0]" />
                        </div>
                         <div>
                            <p className="text-xs font-mono text-[#8d8c9e] uppercase mb-1">ZP EARNED (TOURNEYS)</p>
                            <p className="text-2xl font-mono text-white font-bold">4,200 ZP</p>
                             <button className="text-xs text-[#00FFC0] hover:underline font-mono mt-1">[VIEW SSP LOG]</button>
                        </div>
                    </div>
                    {/* Strategy Access */}
                    <div className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Icons.Lock className="h-6 w-6 text-blue-500" />
                        </div>
                         <div>
                            <p className="text-xs font-mono text-[#8d8c9e] uppercase mb-1">STRATEGY ACCESS</p>
                            <p className="text-2xl font-mono text-[#00FFC0] font-bold uppercase">UNLOCKED</p>
                             <button className="text-xs text-[#00FFC0] hover:underline font-mono mt-1">[LAUNCH EDGE FINDER]</button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* 1. LIVE ENGAGEMENT */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">01 //</span> LIVE ENGAGEMENT (PRIORITY TARGETS)
                </h2>
                <div className="space-y-4">
                    {LIVE_TARGETS.map(target => (
                        <Card key={target.id} className="p-5 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/50 group transition-all flex flex-col md:flex-row items-center gap-6">
                            {/* Info Block */}
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-heading text-xl text-white uppercase">{target.name}</h3>
                                    {target.verified && (
                                        <span className="px-2 py-0.5 bg-[#00FFC0]/10 text-[#00FFC0] text-[10px] font-bold rounded border border-[#00FFC0]/20 uppercase flex items-center gap-1">
                                            <Icons.Shield className="h-3 w-3" /> ZAP CERTIFIED
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-[#8d8c9e] font-mono uppercase">
                                    HOST: <span className="text-white">{target.host}</span> <span className="mx-2 text-[#333]">|</span> POOL: <span className="text-[#00FFC0] font-bold">{target.pool}</span>
                                </p>
                            </div>

                            {/* Countdown Block */}
                            <div className="bg-[#0A0A0A] p-4 rounded-lg border border-[#333] w-full md:w-auto min-w-[180px] text-center">
                                <p className="text-xs font-mono text-[#8d8c9e] uppercase mb-1">TIME TO ZERO</p>
                                <p className="font-mono text-xl text-white font-bold tracking-tight flex items-center justify-center gap-2">
                                    <Icons.Clock className="h-4 w-4 text-red-500 animate-pulse" />
                                    {target.time}
                                </p>
                            </div>

                            {/* Action Button */}
                            <Button 
                                className={`w-full md:w-auto whitespace-nowrap font-heading uppercase tracking-wider ${target.id === 1 ? 'shadow-[0_0_20px_rgba(0,255,192,0.4)] animate-pulse-glow' : ''}`}
                                variant={target.id === 1 ? 'primary' : 'secondary'}
                            >
                                {target.action}
                            </Button>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 2. FUTURE TARGETS */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">02 //</span> FUTURE TARGETS (UPCOMING DEPLOYMENTS)
                </h2>
                <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#14131c] text-xs text-[#8d8c9e] font-mono uppercase">
                                <tr>
                                    <th className="p-4 pl-6">Deployment Date</th>
                                    <th className="p-4">Event Name</th>
                                    <th className="p-4">Strategy Access</th>
                                    <th className="p-4 pr-6 text-right">Required Game Focus</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#333]">
                                {UPCOMING_DEPLOYMENTS.map((event, i) => (
                                    <tr key={i} className="hover:bg-[#14131c] transition-colors">
                                        <td className="p-4 pl-6 font-mono text-[#00FFC0]">{event.date}</td>
                                        <td className="p-4 font-heading text-white uppercase">{event.name}</td>
                                        <td className="p-4 text-[#8d8c9e]">{event.access}</td>
                                        <td className="p-4 pr-6 text-right font-medium text-white">{event.focus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-[#14131c] border-t border-[#333] text-center">
                        <Button variant="ghost" className="text-[#00FFC0] hover:text-[#00FFC0] hover:bg-[#00FFC0]/10 font-heading uppercase text-xs tracking-wider">
                            VIEW FULL DEPLOYMENT CALENDAR →
                        </Button>
                    </div>
                </Card>
            </section>

            {/* 3. SQUAD PROTOCOL */}
            <section>
                 <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">03 //</span> SQUAD PROTOCOL (SYNDICATES)
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 p-8 bg-[#14131c] border-[#00FFC0]/20">
                        <h3 className="font-heading text-xl text-white uppercase mb-4 flex items-center gap-2">
                            <Icons.Users className="h-6 w-6 text-[#00FFC0]" /> TEAM PLAY & COLLABORATION
                        </h3>
                        <p className="text-[#8d8c9e] mb-6 text-lg">
                            Form elite squads (Syndicates) and compete collectively for larger, segmented payouts.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block font-heading uppercase text-sm">HIGHER PAYOUTS</strong>
                                    <span className="text-[#8d8c9e] text-sm">Squad victories typically feature a 1.5x Multiplier on the base prize pool.</span>
                                </div>
                            </li>
                             <li className="flex items-start gap-3">
                                <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block font-heading uppercase text-sm">SQUAD VETTING</strong>
                                    <span className="text-[#8d8c9e] text-sm">All members must have Active MFA and min Operational Level 10.</span>
                                </div>
                            </li>
                        </ul>
                        <div className="flex flex-wrap gap-4">
                            <Button className="font-heading uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,192,0.2)]">
                                INITIATE NEW SQUAD
                            </Button>
                             <Button variant="secondary" className="font-heading uppercase tracking-wider">
                                JOIN EXISTING SYNDICATE
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-8 bg-[#0c0c0e] border-[#333] flex flex-col items-center justify-center text-center opacity-80">
                        <Icons.Lock className="h-16 w-16 text-[#333] mb-6" />
                        <h4 className="font-heading text-lg text-[#8d8c9e] uppercase mb-2">SYNDICATE COMMS OFFLINE</h4>
                         <p className="text-xs font-mono text-[#666]">
                            // REQUIRES SQUAD ASSIGNMENT TO ACCESS ENCRYPTED CHANNELS.
                        </p>
                    </Card>
                </div>
            </section>

        </div>
    );
};
