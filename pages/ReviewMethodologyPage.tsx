
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

export const ReviewMethodologyPage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.Target className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                        ZAP SCORE METHODOLOGY
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                        // ALGORITHMIC TRANSPARENCY // STATUS: ACTIVE V2.1
                    </p>
                    <span className="hidden md:block text-[#333]">|</span>
                    <p className="text-[#8d8c9e] font-mono text-xs uppercase">
                        LAST CALIBRATION: NOVEMBER 01, 2025
                    </p>
                </div>
            </div>

            {/* CORE MANIFESTO */}
            <Card className="p-8 bg-[#0c0c0e] border-[#00FFC0]/30 mb-16 relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="font-heading text-xl text-white mb-4 uppercase flex items-center gap-2">
                        <Icons.Zap className="h-5 w-5 text-[#00FFC0]" /> WE DON'T SELL RATINGS. WE ENGINEER THEM.
                    </h2>
                    <p className="text-lg text-white leading-relaxed mb-6">
                        The ZAP Score is the only rating in the crypto space that cannot be bought. It is a dynamic, mercilessly objective metric built from three non-negotiable data streams. If an operator tries to game the system, the system adapts. This is how we calculate the edge.
                    </p>
                </div>
                {/* subtle background grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>

            {/* PILLAR 1: DATA */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">40% //</span> THE HARD DATA WEIGHT (Quantitative Facts)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/30 transition-all">
                        <Icons.Activity className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-lg text-white uppercase mb-2">True RTP Audits</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            We measure actual historical return rates against advertised theoretical RTPs. Significant deviation triggers an automatic penalty.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/30 transition-all">
                        <Icons.Zap className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-lg text-white uppercase mb-2">Payout Velocity</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Speed is trust. We track average withdrawal times for crypto transactions. Delays >24h for standard KYC'd accounts reduce this score to zero.
                        </p>
                    </Card>
                     <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/30 transition-all">
                        <Icons.Percent className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-lg text-white uppercase mb-2">Fee Structure</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Hidden deposit or withdrawal fees are wealth extractors. Zero-fee operators receive maximum points in this vector.
                        </p>
                    </Card>
                </div>
            </section>

            {/* PILLAR 2: SECURITY */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">30% //</span> THE SECURITY WEIGHT (Vetting Protocol)
                </h2>
                <div className="bg-[#0c0c0e] p-6 rounded-xl border border-[#333] flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <p className="text-[#8d8c9e] mb-6 text-lg">
                            If the foundation is rotten, the house will fall. This is a binary pass/fail gate before scoring even begins.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 p-3 bg-[#14131c] rounded border border-[#333]">
                                <Icons.Shield className="h-5 w-5 text-purple-500" />
                                <span className="text-white font-heading uppercase text-sm">VALID GAMING LICENSE (CURAÇAO, MALTA, ETC.)</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-[#14131c] rounded border border-[#333]">
                                <Icons.Lock className="h-5 w-5 text-purple-500" />
                                <span className="text-white font-heading uppercase text-sm">SSL ENCRYPTION & COLD WALLET STORAGE</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-[#14131c] rounded border border-[#333]">
                                <Icons.FileText className="h-5 w-5 text-purple-500" />
                                <span className="text-white font-heading uppercase text-sm">TRANSPARENT T&C (NO PREDATORY CLAUSES)</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-8 bg-[#14131c] rounded-full border-4 border-purple-500/20 flex items-center justify-center">
                        <Icons.Shield className="h-24 w-24 text-purple-500" />
                    </div>
                </div>
            </section>

             {/* PILLAR 3: COMMUNITY */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">30% //</span> THE COMMUNITY WEIGHT (Player Signal)
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <h3 className="font-heading text-lg text-white uppercase mb-4 flex items-center gap-2">
                            <Icons.MessageSquare className="h-5 w-5 text-blue-400" /> Validated Player Reports (VPRs)
                        </h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed mb-4">
                            Not all reviews are equal. A VPR requires proof of play (TxID, screenshots). We weight these based on the reporter's reputation level within the ZAP ecosystem.
                        </p>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded border border-blue-500/30">LVL 50+ = 3X WEIGHT</span>
                             <span className="px-3 py-1 bg-[#333] text-[#8d8c9e] text-xs font-mono rounded border border-[#333]">NEW USER = 1X WEIGHT</span>
                        </div>
                    </Card>
                    <Card className="p-6 bg-red-950/10 border-red-900/50">
                        <h3 className="font-heading text-lg text-red-500 uppercase mb-4 flex items-center gap-2">
                            <Icons.AlertTriangle className="h-5 w-5" /> The Community Veto
                        </h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed mb-4">
                            The ultimate kill switch. If a statistically significant volume of negative VPRs hits an operator in a 48h window, their ZAP Score is automatically suspended pending a manual forensic audit.
                        </p>
                        <span className="text-red-400 font-mono text-xs uppercase">> POWER TO THE PLAYERS</span>
                    </Card>
                </div>
            </section>

            {/* DYNAMIC DISCLAIMER */}
            <div className="p-6 bg-[#14131c] rounded-xl border-l-4 border-[#00FFC0] flex items-start gap-4">
                <Icons.Activity className="h-6 w-6 text-[#00FFC0] flex-shrink-0 mt-1" />
                <div className="text-sm text-[#8d8c9e] leading-relaxed font-mono">
                    <strong className="text-white font-heading uppercase block mb-1">DYNAMIC SCORING ADVISORY</strong>
                    The ZAP Score is alive. It is recalculated daily based on incoming data streams. An operator that was rated 4.8 yesterday can drop to 3.2 today if they change their withdrawal policy or fail a community audit. Always check the "Last Verified" timestamp before engaging.
                </div>
            </div>

        </div>
    );
};
