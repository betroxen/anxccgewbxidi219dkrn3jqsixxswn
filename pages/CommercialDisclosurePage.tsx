
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

export const CommercialDisclosurePage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.Info className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                        COMMERCIAL DISCLOSURE
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                        // TRANSPARENCY PROTOCOL // STATUS: ACTIVE
                    </p>
                    <span className="hidden md:block text-[#333]">|</span>
                    <p className="text-[#8d8c9e] font-mono text-xs uppercase">
                        EFFECTIVE DATE: NOVEMBER 09, 2025
                    </p>
                </div>
            </div>

            {/* CORE MANIFESTO */}
            <Card className="p-8 bg-[#0c0c0e] border-[#00FFC0]/30 mb-16 relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="font-heading text-xl text-white mb-4 uppercase flex items-center gap-2">
                        <Icons.Zap className="h-5 w-5 text-[#00FFC0]" /> WE OPERATE IN THE LIGHT
                    </h2>
                    <p className="text-lg text-white leading-relaxed mb-6">
                        ZAP doesn't thrive in shadows—we illuminate them. In an industry riddled with hidden agendas, our commitment to radical transparency isn't optional; it's operational bedrock. This disclosure unpacks our revenue streams, safeguards, and symbiotic loops, ensuring you know exactly how we fuel the engine without compromising the signal.
                    </p>
                    <div className="bg-[#14131c] p-6 rounded-lg border-l-4 border-[#00FFC0]">
                        <strong className="text-[#00FFC0] font-heading uppercase text-sm block mb-2">THE DATA ENGINE REQUIRES FUEL</strong>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            High-fidelity intelligence demands relentless resources: data aggregation across millions of sessions, real-time security audits, and a global network of validators. We're not a charity or a house shill—we're an independent force, sustained by ethical revenue that keeps us agile, unbiased, and laser-focused on your edge. No smoke, no mirrors: Here's how it works.
                        </p>
                    </div>
                </div>
                {/* subtle background grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>

            {/* 01. THE REVENUE MODEL */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">01 //</span> OPERATIONAL REVENUE MODEL (Affiliate Partnerships)
                </h2>
                <p className="text-[#8d8c9e] mb-8 text-lg">
                    Our model is straightforward, player-centric, and battle-tested: We connect you to vetted operators via secure affiliate links, earning only when value flows both ways. This isn't extraction—it's ecosystem synergy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Step 1 */}
                    <Card className="p-6 bg-[#14131c] border-[#333] relative group hover:border-[#00FFC0]/30 transition-all">
                        <div className="text-[#00FFC0]/10 font-mono text-6xl font-bold absolute top-2 right-4 group-hover:text-[#00FFC0]/20 transition-colors">01</div>
                        <Icons.Link className="h-10 w-10 text-[#00FFC0] mb-6 relative z-10" />
                        <h3 className="font-heading text-white uppercase mb-3 text-base relative z-10">The Connection</h3>
                        <p className="text-sm text-[#8d8c9e] relative z-10 leading-relaxed">
                            You discover a top-tier operator through our Grid—filtered by ZAP Scores, True RTP, and Community Veto. Click our encrypted tracking link, and you're routed seamlessly to their platform.
                        </p>
                    </Card>
                    {/* Step 2 */}
                     <Card className="p-6 bg-[#14131c] border-[#333] relative group hover:border-[#00FFC0]/30 transition-all">
                        <div className="text-[#00FFC0]/10 font-mono text-6xl font-bold absolute top-2 right-4 group-hover:text-[#00FFC0]/20 transition-colors">02</div>
                        <Icons.Users className="h-10 w-10 text-[#00FFC0] mb-6 relative z-10" />
                        <h3 className="font-heading text-white uppercase mb-3 text-base relative z-10">The Engagement</h3>
                        <p className="text-sm text-[#8d8c9e] relative z-10 leading-relaxed">
                            If you register, deposit, and play, the operator recognizes us as the trusted referral source. They remit a commission from their allocated marketing funds based on net revenue.
                        </p>
                    </Card>
                    {/* Step 3 */}
                     <Card className="p-6 bg-[#14131c] border-[#333] relative group hover:border-[#00FFC0]/30 transition-all">
                        <div className="text-[#00FFC0]/10 font-mono text-6xl font-bold absolute top-2 right-4 group-hover:text-[#00FFC0]/20 transition-colors">03</div>
                        <Icons.Zap className="h-10 w-10 text-[#00FFC0] mb-6 relative z-10" />
                        <h3 className="font-heading text-white uppercase mb-3 text-base relative z-10">The Fuel Cycle</h3>
                        <p className="text-sm text-[#8d8c9e] relative z-10 leading-relaxed">
                            Earnings power the Vanguard dev team, independent Data Integrity Audits, and bolster the Shared Success Protocol (SSP) reward pool for contributors.
                        </p>
                    </Card>
                </div>

                <div className="bg-[#0c0c0e] p-6 rounded-xl border border-[#00FFC0]/20">
                    <h3 className="font-heading text-white uppercase mb-4 flex items-center gap-2">
                        <Icons.Shield className="h-5 w-5 text-[#00FFC0]" /> ZERO COST TO PLAYER: THE UNBREAKABLE PLEDGE
                    </h3>
                    <p className="text-[#8d8c9e] mb-4">Affiliate commissions are carved from the operator's promotional war chest, not your pocket. Here's the ironclad truth:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <li className="flex items-start gap-3 p-3 bg-[#14131c] rounded border border-[#333]">
                            <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0" />
                            <span><strong className="text-white block font-heading uppercase text-xs mb-1">Odds & RTP Untouched</strong>Your playthrough math stays pristine—no hidden vig.</span>
                        </li>
                         <li className="flex items-start gap-3 p-3 bg-[#14131c] rounded border border-[#333]">
                            <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0" />
                            <span><strong className="text-white block font-heading uppercase text-xs mb-1">Bonuses Preserved</strong>Lock in the same (or better) promotions as direct visitors.</span>
                        </li>
                         <li className="flex items-start gap-3 p-3 bg-[#14131c] rounded border border-[#333]">
                            <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0" />
                            <span><strong className="text-white block font-heading uppercase text-xs mb-1">Transparency Audit</strong>Every partnership is publicly logged in our Operator Ledger.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* 02. THE INTEGRITY FIREWALL */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-red-500 mb-8 flex items-center gap-3 border-b border-red-900/30 pb-4">
                    <span className="text-red-500">02 //</span> THE INTEGRITY FIREWALL (Non-Negotiables)
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <p className="text-lg text-white leading-relaxed">
                            Affiliates are the norm, but ZAP's Firewall is our secret weapon—a hardened barrier that severs money from metrics. No bribe can breach it; no favor can bend it.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 p-4 bg-[#14131c] rounded border-l-2 border-red-500">
                                <Icons.Lock className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                                <span className="text-[#8d8c9e] text-sm">
                                    <strong className="text-white block font-heading uppercase mb-1">NO PAID RATINGS</strong>
                                    ZAP Scores are forged in code, not cash. Locked to verifiable pillars (RTP, Security, Community), they evolve dynamically via data alone.
                                </span>
                            </li>
                             <li className="flex items-start gap-3 p-4 bg-[#14131c] rounded border-l-2 border-red-500">
                                <Icons.Trash className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                                <span className="text-[#8d8c9e] text-sm">
                                    <strong className="text-white block font-heading uppercase mb-1">NO DELETING HISTORY</strong>
                                    Valid negative VPRs or RTP shortfalls stay etched in the ledger for 7 years, partnership be damned.
                                </span>
                            </li>
                             <li className="flex items-start gap-3 p-4 bg-[#14131c] rounded border-l-2 border-red-500">
                                <Icons.Filter className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                                <span className="text-[#8d8c9e] text-sm">
                                    <strong className="text-white block font-heading uppercase mb-1">NO PREFERRED PLACEMENT</strong>
                                    Grid rankings prioritize signal strength over sponsorships. High-score operators rise organically; low performers sink.
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center">
                        <Card className="p-8 bg-red-950/10 border-red-900/30 text-center">
                            <Icons.Shield className="h-20 w-20 text-red-500 mx-auto mb-6 opacity-80" />
                            <h3 className="font-heading text-xl text-white uppercase mb-4">OUR REPUTATION IS THE ASSET</h3>
                            <p className="text-[#8d8c9e] text-sm leading-relaxed mb-6">
                                Compromise the data for a fleeting commission, and the Grid implodes. We're wired for longevity: Brutal honesty isn't altruism—it's our greatest hedge. By staying incorruptible, trust compounds like interest.
                            </p>
                            <div className="inline-block px-4 py-2 bg-red-500/10 text-red-400 text-xs font-mono uppercase rounded border border-red-500/30">
                                CROSS THE LINE = INSTANT DELISTING
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 03. THE VALUE LOOP */}
            <section>
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">03 //</span> THE VALUE LOOP (Shared Success Ecosystem)
                </h2>
                <p className="text-[#8d8c9e] mb-10 text-lg max-w-3xl">
                    ZAP's genius lies in circular economics: Revenue doesn't hoard—it recirculates, forging unbreakable alignment between platform and players. We chase sustainable community growth over short-term grabs.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-12">
                    {/* VISUAL LOOP */}
                    <Card className="lg:col-span-3 p-8 bg-[#0c0c0e] border-[#00FFC0]/20">
                        <h3 className="font-heading text-white uppercase mb-8 text-center">THE LOOP IN MOTION</h3>
                        <div className="space-y-4 relative">
                            {/* Vertical connecting line */}
                            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#333] via-[#00FFC0]/50 to-[#333]"></div>

                            {[
                                { icon: Icons.Zap, title: "PLATFORM REVENUE", desc: "Affiliate Commissions from Operators" },
                                { icon: Icons.GitMerge, title: "SSP PROTOCOL", desc: "Automated Allocation: 25% of Net Revenue", highlight: true },
                                { icon: Icons.Gift, title: "REWARD DISTRIBUTION", desc: "ZP Accrual & Crypto Redemptions" },
                                { icon: Icons.Users, title: "ACTIVE CONTRIBUTORS", desc: "VPRs, Forum Intel, Mission Completions" },
                                { icon: Icons.Database, title: "ENHANCED GRID INTEGRITY", desc: "More Data → Sharper Scores → Better Operators" },
                                { icon: Icons.Repeat, title: "BACK TO REVENUE", desc: "Stronger Ecosystem → Higher Engagement" }
                            ].map((step, i) => (
                                <div key={i} className={`relative flex items-center gap-4 p-3 rounded-lg border ml-2 ${step.highlight ? 'bg-[#00FFC0]/10 border-[#00FFC0] shadow-[0_0_15px_rgba(0,255,192,0.1)]' : 'bg-[#14131c] border-[#333]'}`}>
                                    <div className={`relative z-10 p-2 rounded-full ${step.highlight ? 'bg-[#00FFC0] text-black' : 'bg-[#0A0A0A] border border-[#333] text-[#00FFC0]'}`}>
                                        <step.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className={`font-heading uppercase text-sm ${step.highlight ? 'text-[#00FFC0]' : 'text-white'}`}>{step.title}</h4>
                                        <p className="text-xs text-[#8d8c9e] font-mono">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* BENEFITS SIDEBAR */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="font-heading text-white uppercase mb-4">WHY IT WORKS FOR YOU</h3>
                        <Card className="p-5 bg-[#14131c] border-[#333]">
                            <Icons.TrendingUp className="h-6 w-6 text-[#00FFC0] mb-3" />
                            <h4 className="font-heading text-white uppercase text-sm mb-2">EQUITABLE SCALING</h4>
                            <p className="text-sm text-[#8d8c9e]">As ZAP expands, so does the SSP pool—top contributors see exponential ZP yields.</p>
                        </Card>
                        <Card className="p-5 bg-[#14131c] border-[#333]">
                            <Icons.Target className="h-6 w-6 text-[#00FFC0] mb-3" />
                            <h4 className="font-heading text-white uppercase text-sm mb-2">INCENTIVE PURITY</h4>
                            <p className="text-sm text-[#8d8c9e]">Rewards tie directly to high-signal actions, not volume. Quality intel gets amplified.</p>
                        </Card>
                         <Card className="p-5 bg-[#14131c] border-[#333]">
                            <Icons.Clock className="h-6 w-6 text-[#00FFC0] mb-3" />
                            <h4 className="font-heading text-white uppercase text-sm mb-2">LONG-TERM HORIZON</h4>
                            <p className="text-sm text-[#8d8c9e]">Your VPRs today sharpen tomorrow's edges for everyone, including you.</p>
                        </Card>
                    </div>
                </div>
            </section>

        </div>
    );
};
