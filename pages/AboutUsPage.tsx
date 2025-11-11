
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

export const AboutUsPage = () => {
    const PILLARS = [
        { id: "I", title: "RAW DATA DOMINANCE", icon: Icons.Database, focus: "Empower with Data.", desc: "We build tools to hunt for true RTPs, expose hidden fees, and deliver verified statistics. Knowledge isn't power—raw data is leverage." },
        { id: "II", title: "TOTAL CODE TRANSPARENCY", icon: Icons.Eye, focus: "Unwavering Honesty.", desc: "Forget black boxes. We are 100% clear on scoring, revenue, and rewards. No secrets. No shadows." },
        { id: "III", title: "CROWDSOURCED INTEL", icon: Icons.Users, focus: "Harness Community Power.", desc: "The collective experience of thousands of savvy players beats any single analyst. Your signal is the ultimate review." },
        { id: "IV", title: "ZERO-TOLERANCE VETTING", icon: Icons.Shield, focus: "Vet for Safety.", desc: "We are your first line of defense. If an operator doesn't meet our ruthless standards for security and fairness, they don't make the cut." },
        { id: "V", title: "SHARED SUCCESS PROTOCOL", icon: Icons.Gift, focus: "Reward Participation.", desc: "You drive this platform. You should own the upside. We actively reward users who contribute intel and drive quality." },
    ];

    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER MANIFESTO */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.Zap className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-white uppercase tracking-wider leading-none">
                        ABOUT ZAP: <span className="text-[#00FFC0] text-glow block md:inline mt-2 md:mt-0">THE RIOT ACT</span>
                    </h1>
                </div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00FFC0]/10 border border-[#00FFC0]/30 rounded-md mb-8">
                    <span className="text-xs font-mono text-[#00FFC0] uppercase tracking-widest">
                        // STATUS: HOSTILE TAKEOVER IN PROGRESS
                    </span>
                </div>
                <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-white leading-relaxed font-medium">
                        ZAP is the Riot Act. We didn't like the status quo—the broken promises, the opaque systems, and the operators who didn't have your back. The crypto gaming space was ripe for a takeover by the users.
                    </p>
                    <p className="text-lg text-[#8d8c9e] leading-relaxed">
                        We're not just an affiliate site chasing commissions; we're the next-gen alternative—a smarter, fairer ecosystem built by degens, for the edge.
                    </p>
                </div>
            </div>

            {/* TEAM STRUCTURE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <Card className="p-6 bg-[#0c0c0e] border-[#333]">
                    <div className="flex items-center gap-3 mb-4 border-b border-[#333] pb-4">
                        <Icons.Users className="h-6 w-6 text-[#00FFC0]" />
                        <h3 className="font-heading text-xl text-white uppercase">THE ARCHITECTS</h3>
                    </div>
                    <p className="text-[#8d8c9e] leading-relaxed">
                        This isn't a traditional board of directors. It's a squad of ex-casino operators, professional gamblers, and quantitative data scientists who walked away from the old game to fix the code.
                    </p>
                </Card>
                <Card className="p-6 bg-[#0c0c0e] border-[#333]">
                    <div className="flex items-center gap-3 mb-4 border-b border-[#333] pb-4">
                        <Icons.Globe className="h-6 w-6 text-blue-400" />
                        <h3 className="font-heading text-xl text-white uppercase">THE GLOBAL GRID</h3>
                    </div>
                    <p className="text-[#8d8c9e] leading-relaxed">
                        We operate remotely, leveraging talent across 20+ jurisdictions. 24/7 coverage isn't a service—it's how we stay ahead of the market and ensure the intel never stops flowing.
                    </p>
                </Card>
            </div>

            {/* PRIME DIRECTIVE */}
            <Card className="p-8 mb-20 bg-[#14131c] border-[#00FFC0]/30 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FFC0] via-transparent to-transparent"></div>
                <div className="relative z-10">
                    <Icons.Shield className="h-12 w-12 text-[#00FFC0] mx-auto mb-4" />
                    <h2 className="font-heading text-2xl text-white uppercase mb-4 tracking-wider">THE PRIME DIRECTIVE</h2>
                    <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed">
                        Our reputation is the only asset we trade on. We will never take payment to alter a review score or manipulate data. <strong className="text-[#00FFC0] block mt-4 font-heading uppercase tracking-widest">INTEGRITY IS NON-NEGOTIABLE.</strong>
                    </p>
                </div>
            </Card>

            {/* THE FIVE PILLARS */}
            <section className="mb-20">
                <div className="mb-10 border-b border-[#333] pb-4">
                     <h2 className="font-heading text-3xl text-white uppercase mb-2">OUR MISSION</h2>
                     <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">// BREAK THE MOLD. WIN THE EDGE.</p>
                </div>
                <div className="space-y-6">
                    {PILLARS.map((pillar) => (
                        <Card key={pillar.id} className="p-0 overflow-hidden flex flex-col md:flex-row border-[#333] hover:border-[#00FFC0]/50 transition-all group">
                            <div className="bg-[#0c0c0e] p-6 md:w-48 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#333] group-hover:border-[#00FFC0]/30 transition-all">
                                <span className="font-mono text-[#00FFC0] text-sm mb-2">PILLAR {pillar.id} //</span>
                                <pillar.icon className="h-8 w-8 text-[#8d8c9e] group-hover:text-[#00FFC0] transition-colors" />
                            </div>
                            <div className="p-6 flex-1 bg-[#14131c]">
                                <h3 className="font-heading text-xl text-white uppercase mb-2">{pillar.title}</h3>
                                <p className="text-white font-medium mb-2">{pillar.focus}</p>
                                <p className="text-[#8d8c9e] text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CORE PHILOSOPHY FOOTER */}
            <div className="text-center p-10 bg-[#00FFC0]/5 rounded-2xl border-2 border-[#00FFC0]/20">
                <h2 className="font-heading text-2xl md:text-4xl text-white uppercase mb-4 leading-tight">
                    GAMBLE SMARTER, <span className="text-[#00FFC0] text-glow">NOT HARDER.</span>
                </h2>
                <p className="text-[#8d8c9e] text-lg max-w-2xl mx-auto font-mono">
                    // This isn't a slogan. It's the operating system for every tool, every review, and every decision we make. We're here to help you win.
                </p>
            </div>

        </div>
    );
};
