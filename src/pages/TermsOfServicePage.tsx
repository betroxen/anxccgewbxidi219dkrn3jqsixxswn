import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

export const TermsOfServicePage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.FileText className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                        TERMS OF ENGAGEMENT
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                        // THE CIRCUIT RULES // STATUS: MANDATORY
                    </p>
                    <span className="hidden md:block text-[#333]">|</span>
                    <p className="text-[#8d8c9e] font-mono text-xs uppercase">
                        LAST SYNCHRONIZED: NOVEMBER 09, 2025
                    </p>
                </div>
            </div>

            {/* INTRO MANIFESTO */}
            <Card className="p-8 bg-[#0c0c0e] border-[#00FFC0]/30 mb-12 relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="font-heading text-xl text-white mb-4 uppercase flex items-center gap-2">
                        <Icons.Zap className="h-5 w-5 text-[#00FFC0]" /> AGREEMENT PROTOCOL
                    </h2>
                    <p className="text-lg text-white leading-relaxed mb-4">
                        Welcome to ZAP. We're data rebels in a rigged game, but every revolution demands clear boundaries. These Terms of Service ("The Rules") form a binding contract between you—the sharp-eyed player—and ZapWay Corporation.
                    </p>
                    <p className="text-[#8d8c9e] leading-relaxed">
                        By accessing, using, or integrating with the ZAP ecosystem, you affirm your commitment to these Rules. <strong className="text-white">No wiggle room.</strong> If they don't align with your playstyle, log out now.
                    </p>
                </div>
                {/* subtle background grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>

            {/* TERMS SECTIONS */}
            <div className="space-y-8">

                {/* PROTOCOL 01: ELIGIBILITY */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                        <span className="text-[#00FFC0]">01 //</span> PLAYER ELIGIBILITY
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-[#14131c] border-[#333]">
                            <Icons.Users className="h-8 w-8 text-[#00FFC0] mb-4" />
                            <h3 className="font-heading text-lg text-white uppercase mb-2">Minimum Age (18+)</h3>
                            <p className="text-sm text-[#8d8c9e] leading-relaxed">
                                You must be at least 18 years old, or the applicable legal gambling age in your jurisdiction. Underage? Access denied—no data for you.
                            </p>
                        </Card>
                         <Card className="p-6 bg-[#14131c] border-[#333]">
                            <Icons.Globe className="h-8 w-8 text-blue-500 mb-4" />
                            <h3 className="font-heading text-lg text-white uppercase mb-2">Local Compliance</h3>
                            <p className="text-sm text-[#8d8c9e] leading-relaxed">
                                It's entirely on you to verify that ZAP's tools and linked operators comply with your local laws. We deliver raw intelligence, not legal counsel.
                            </p>
                        </Card>
                    </div>
                </section>

                {/* PROTOCOL 02: CONDUCT */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">02 //</span> CODE OF CONDUCT
                    </h2>
                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="bg-[#00FFC0]/10 p-2 rounded-full shrink-0">
                                    <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0]" />
                                </div>
                                <div>
                                    <strong className="text-white block font-heading uppercase text-sm mb-1">YOUR VOICE IS POWER</strong>
                                    <span className="text-[#8d8c9e] text-sm leading-relaxed">
                                        When you contribute—via reviews, Validated Player Reports (VPRs), or other intel—you grant ZAP a perpetual, royalty-free license to leverage that content for enhancing our platform's core grid.
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-red-500/10 p-2 rounded-full shrink-0">
                                    <Icons.X className="h-5 w-5 text-red-500" />
                                </div>
                                <div>
                                    <strong className="text-white block font-heading uppercase text-sm mb-1">ZERO NOISE POLICY</strong>
                                    <span className="text-[#8d8c9e] text-sm leading-relaxed">
                                        We enforce a strict no-tolerance stance on spam, shilling, misinformation, or any disruptive tactics. Tarnish the signal, and face immediate, permanent disconnection.
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </Card>
                </section>

                {/* PROTOCOL 03: LIABILITY (CRITICAL) */}
                <section>
                     <h2 className="font-heading text-2xl text-red-500 mb-6 flex items-center gap-3 border-b border-red-900/30 pb-4">
                         <span className="text-red-500">03 //</span> LIMITATION OF LIABILITY
                    </h2>
                    <Card className="p-6 bg-red-950/10 border-red-900/50 mb-6 relative overflow-hidden">
                        {/* Caution stripes */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none" style={{backgroundImage: 'repeating-linear-gradient(45deg, #ff0000, #ff0000 10px, transparent 10px, transparent 20px)'}}></div>

                        <div className="flex items-start gap-4 relative z-10">
                            <Icons.AlertTriangle className="h-8 w-8 text-red-500 shrink-0" />
                            <div className="space-y-4">
                                <h3 className="text-white font-heading uppercase text-lg">
                                    CRITICAL NOTICE: DATA IS INTELLIGENCE, NOT INSURANCE
                                </h3>
                                <p className="text-[#8d8c9e] text-sm">
                                    ZAP delivers unbiased analysis, scores, and community insights. We're not a casino, financial advisor, or betting operator—full stop.
                                </p>
                                <ul className="list-disc pl-4 space-y-2 text-red-200/80 text-sm font-mono">
                                    <li>ZAP bears no responsibility for financial losses from third-party platforms.</li>
                                    <li>Engaging with external operators is at your exclusive risk.</li>
                                    <li>All content is provided "AS IS," with no warranties, express or implied.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* PROTOCOL 04: INTELLECTUAL PROPERTY */}
                 <section>
                    <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">04 //</span> INTELLECTUAL PROPERTY
                    </h2>
                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <p className="text-white mb-4 leading-relaxed">
                            "Content" encompasses our proprietary arsenal: ZAP Scores, True RTP metrics, custom analytics, and all branding elements.
                        </p>
                        <div className="bg-[#0c0c0e] p-4 rounded border-l-4 border-[#00FFC0] text-sm text-[#8d8c9e] leading-relaxed">
                            This intel sharpens the community's edge, but it stays our domain. Use it to outmaneuver the house—by all means. Just don't repurpose it to fuel a rival operation.
                        </div>
                    </Card>
                </section>

            </div>

            {/* CONTACT FOOTER */}
            <div className="mt-16 pt-8 border-t border-[#333] grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-heading text-white uppercase mb-2 flex items-center gap-2">
                        <Icons.HelpCircle className="h-4 w-4 text-[#00FFC0]" /> Operational Support
                    </h3>
                    <p className="text-[#8d8c9e] text-sm mb-2">For account, rewards, or tech glitches.</p>
                    <a href="mailto:support@zap.gg" className="text-[#00FFC0] font-mono hover:underline">support@zap.gg</a>
                </div>
                <div>
                     <h3 className="font-heading text-white uppercase mb-2 flex items-center gap-2">
                        <Icons.Shield className="h-4 w-4 text-[#00FFC0]" /> Legal Comm Line
                    </h3>
                    <p className="text-[#8d8c9e] text-sm mb-2">For disputes or compliance matters.</p>
                    <a href="mailto:legal@zap.gg" className="text-[#00FFC0] font-mono hover:underline">legal@zap.gg</a>
                     <p className="text-xs text-[#666] mt-4 font-mono uppercase">
                        HQ: Premier Business Centre, Mutsamudu, Comoros
                    </p>
                </div>
            </div>

        </div>
    );
};
