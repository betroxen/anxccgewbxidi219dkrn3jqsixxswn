
import React from 'react';
import { Card } from '../components/Card';
import { Icons } from '../components/icons';

export const LiveRTPTrackerPage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.Activity className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                        RTP INTELLIGENCE BRIEFING
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                        // CRITICAL METRIC ANALYSIS // STATUS: DECLASSIFIED
                    </p>
                </div>
            </div>

            {/* CORE DEFINITION CARD */}
            <Card className="p-8 bg-[#0c0c0e] border-[#00FFC0]/30 mb-12 relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="font-heading text-2xl text-white mb-4 uppercase flex items-center gap-3">
                        <Icons.Target className="h-6 w-6 text-[#00FFC0]" /> THE SINGLE MOST CRITICAL METRIC
                    </h2>
                    <p className="text-lg text-white leading-relaxed mb-6">
                        RTP, or <strong className="text-[#00FFC0]">Return-to-Player</strong>, is the expected percentage of all wagered money that a game will return to players over its lifetime. It is the mathematical bedrock of all gambling operations.
                    </p>
                    <div className="bg-[#14131c] p-6 rounded-lg border-l-4 border-[#00FFC0] flex flex-col md:flex-row items-center gap-6">
                        <Icons.Info className="h-10 w-10 text-[#00FFC0] flex-shrink-0" />
                        <div className="text-sm md:text-base text-[#8d8c9e] leading-relaxed">
                            <strong className="text-white block font-heading uppercase mb-1">THE MATHEMATICAL GUARANTEE</strong>
                            If a slot game has an RTP of <span className="text-white font-bold">96%</span>, it means that for every <span className="text-white font-bold">$100</span> wagered over millions of spins, the machine is programmed to return <span className="text-white font-bold">$96</span> to the players, keeping <span className="text-white font-bold">$4</span> as profit. It is a long-term average, not a session guarantee.
                        </div>
                    </div>
                </div>
                {/* subtle background grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>

            {/* SECTION 1: THE CORE MATH */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">01 //</span> THE CORE MATH: RTP VS. HOUSE EDGE
                </h2>
                <p className="text-[#8d8c9e] mb-6 text-lg">
                    RTP and House Edge are two sides of the same coin. They always add up to 100%.
                </p>

                <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333] mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#14131c] text-xs text-[#8d8c9e] font-mono uppercase tracking-wider">
                                <tr>
                                    <th className="p-5 pl-6">Metric</th>
                                    <th className="p-5">Calculation</th>
                                    <th className="p-5 pr-6">What It Represents</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#333]">
                                <tr className="hover:bg-[#14131c] transition-colors">
                                    <td className="p-5 pl-6 font-heading text-[#00FFC0] uppercase">RTP (Return-to-Player)</td>
                                    <td className="p-5 text-white font-mono">% returned to player</td>
                                    <td className="p-5 pr-6 text-[#8d8c9e] leading-relaxed">The player's long-term expectation of winning back funds. (E.g., 96%)</td>
                                </tr>
                                <tr className="hover:bg-[#14131c] transition-colors">
                                    <td className="p-5 pl-6 font-heading text-red-500 uppercase">House Edge</td>
                                    <td className="p-5 text-white font-mono">% kept by operator</td>
                                    <td className="p-5 pr-6 text-[#8d8c9e] leading-relaxed">The built-in mathematical advantage for the house. (E.g., 4%)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="p-4 bg-[#00FFC0]/10 border border-[#00FFC0]/30 rounded-lg text-center font-mono text-sm text-[#00FFC0]">
                    <strong className="uppercase">TACTICAL FACT:</strong> A HIGHER RTP ALWAYS EQUALS A LOWER HOUSE EDGE.
                </div>
            </section>

            {/* SECTION 2: HOW IT WORKS */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">02 //</span> EXECUTION: THE STEP-BY-STEP PROCESS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-[#00FFC0]/10 p-3 rounded-full text-[#00FFC0] font-bold font-mono">01</div>
                            <h3 className="font-heading text-white uppercase">Simulation Run</h3>
                        </div>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            The developer's math team runs the game's code—including all potential outcomes, symbols, and bonus features—through a simulation lasting billions of rounds.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-[#00FFC0]/10 p-3 rounded-full text-[#00FFC0] font-bold font-mono">02</div>
                            <h3 className="font-heading text-white uppercase">Expected Payout</h3>
                        </div>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            They calculate the total amount paid back to players versus the total amount wagered. This generates the Theoretical RTP.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-[#00FFC0]/10 p-3 rounded-full text-[#00FFC0] font-bold font-mono">03</div>
                            <h3 className="font-heading text-white uppercase">Certification</h3>
                        </div>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            This theoretical rate is certified by independent testing labs (like eCOGRA or iTech Labs) to confirm the game's fairness and compliance.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-[#00FFC0]/10 p-3 rounded-full text-[#00FFC0] font-bold font-mono">04</div>
                            <h3 className="font-heading text-white uppercase">Long-Term Guarantee</h3>
                        </div>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            The game is designed to deviate wildly in the short term (volatility) but consistently trend toward its certified RTP percentage over its entire lifespan.
                        </p>
                    </Card>
                </div>
            </section>

            {/* SECTION 3: VARIANTS */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">03 //</span> UNDERSTANDING THE VARIANTS
                </h2>
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#14131c] rounded-xl border-l-4 border-blue-500">
                        <div className="flex-shrink-0">
                            <Icons.BookOpen className="h-8 w-8 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-heading text-white uppercase mb-2">THEORETICAL RTP</h3>
                            <p className="text-[#8d8c9e]">
                                The published, certified number (e.g., 96.5%). This is the maximum expected long-term return under ideal conditions.
                            </p>
                        </div>
                    </div>
                     <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#14131c] rounded-xl border-l-4 border-[#00FFC0]">
                        <div className="flex-shrink-0">
                            <Icons.Activity className="h-8 w-8 text-[#00FFC0]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-heading text-white uppercase mb-2">TRUE / OBSERVED RTP</h3>
                            <p className="text-[#8d8c9e]">
                                The real-time RTP calculated by tracking actual player spins on a specific casino in the short-to-medium term. ZAP focuses on this observed data to find immediate advantage or spot negative deviations.
                            </p>
                        </div>
                    </div>
                     <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#14131c] rounded-xl border-l-4 border-red-500">
                        <div className="flex-shrink-0">
                            <Icons.AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-heading text-white uppercase mb-2">VARIABLE RTP</h3>
                            <p className="text-[#8d8c9e]">
                                Many new slot games feature adjustable settings. Developers provide casinos with multiple versions (e.g., 96%, 94%, 92%). Operators can choose which version to host, often without clearly notifying the player.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: SLOTS VS ORIGINALS */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">04 //</span> SLOTS VS. ORIGINALS: WHERE THE RTP LIVES
                </h2>
                
                <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#14131c] text-xs text-[#8d8c9e] font-mono uppercase tracking-wider">
                                <tr>
                                    <th className="p-5 pl-6">Game Type</th>
                                    <th className="p-5">Mechanism</th>
                                    <th className="p-5">Standard RTP Range</th>
                                    <th className="p-5 pr-6">Transparency</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#333]">
                                <tr className="hover:bg-[#14131c] transition-colors">
                                    <td className="p-5 pl-6 font-heading text-white uppercase">Slots (RNG)</td>
                                    <td className="p-5 text-[#8d8c9e] text-sm leading-relaxed">Relies on a Random Number Generator (RNG) housed on the provider's server.</td>
                                    <td className="p-5 font-mono text-yellow-500">92% - 98%</td>
                                    <td className="p-5 pr-6">
                                        <span className="inline-block px-3 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase">MEDIUM</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-[#14131c] transition-colors">
                                    <td className="p-5 pl-6 font-heading text-white uppercase">Originals (Provably Fair)</td>
                                    <td className="p-5 text-[#8d8c9e] text-sm leading-relaxed">Relies on cryptographic hashes (Client Seed, Server Seed) verifiable by player.</td>
                                    <td className="p-5 font-mono text-[#00FFC0]">99% - 99.5%</td>
                                    <td className="p-5 pr-6">
                                        <span className="inline-block px-3 py-1 rounded bg-[#00FFC0]/10 text-[#00FFC0] text-xs font-bold uppercase">HIGH</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* SUMMARY FOOTER */}
            <div className="p-8 bg-[#0c0c0e] rounded-2xl border-2 border-[#00FFC0]/20 text-center">
                <Icons.Zap className="h-12 w-12 text-[#00FFC0] mx-auto mb-6" />
                <h3 className="font-heading text-2xl text-white uppercase mb-4">FINAL DIRECTIVE</h3>
                <p className="text-lg text-[#8d8c9e] max-w-3xl mx-auto leading-relaxed">
                    RTP is the most powerful piece of information available to a player. Understanding its variants is essential because while a slot promises 96.5% on paper, the version you are currently playing might be set lower. <strong className="text-white">Only observed data can verify the True RTP.</strong>
                </p>
            </div>

        </div>
    );
};
