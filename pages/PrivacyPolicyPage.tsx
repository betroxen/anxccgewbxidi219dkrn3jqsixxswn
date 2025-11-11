
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const PrivacyPolicyPage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.Lock className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                        DATA PRIVACY PROTOCOL
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                        // CLASSIFICATION: NO SECRETS // STATUS: ENCRYPTED
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
                        <Icons.Eye className="h-5 w-5 text-[#00FFC0]" /> TRANSPARENCY IS TRUST
                    </h2>
                    <p className="text-lg text-white leading-relaxed mb-6">
                        At ZAP, we forge trust through unyielding clarity—your data is no exception. This Protocol lays bare every facet of our data practices: what intelligence we gather, the strategic imperatives driving its collection, and how it powers your edge in the ecosystem. We're not hoarding shadows; we're arming you with the full schematic.
                    </p>
                    <div className="bg-[#00FFC0]/10 p-4 rounded border-l-4 border-[#00FFC0] flex items-start gap-3">
                        <Icons.Shield className="h-6 w-6 text-[#00FFC0] shrink-0 mt-1" />
                        <div>
                            <strong className="text-[#00FFC0] font-heading uppercase text-sm block mb-1">ZERO SALE PROTOCOL</strong>
                            <p className="text-sm text-[#8d8c9e] leading-relaxed">
                                Our core directive: We never sell, lease, or auction your personal data to third parties. ZAP thrives on aggregated community signals, not the commodification of identities. Your privacy is non-negotiable.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Background grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>

            {/* DATA PROTOCOLS */}
            <div className="space-y-12">

                {/* PROTOCOL 01: COLLECTION */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                        <span className="text-[#00FFC0]">01 //</span> INTELLIGENCE GATHERING (What We Collect)
                    </h2>
                    <p className="text-[#8d8c9e] mb-6">We collect only the essentials to fuel the Grid—minimal, targeted, and purpose-bound. No excess, no overreach.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Card className="p-6 bg-[#14131c] border-[#333]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-500/10 p-2 rounded">
                                    <Icons.Users className="h-6 w-6 text-blue-500" />
                                </div>
                                <h3 className="font-heading text-lg text-white uppercase">Player Identity Data</h3>
                            </div>
                            <ul className="space-y-4 text-sm font-mono">
                                <li>
                                    <div className="flex justify-between text-[#8d8c9e] mb-1">HANDLE/EMAIL</div>
                                    <div className="text-white leading-tight">Essential for secure access, authentication, and personalized intel delivery.</div>
                                </li>
                                <li className="border-t border-[#333] pt-4">
                                    <div className="flex justify-between text-[#8d8c9e] mb-1">WALLET ADDRESS</div>
                                    <div className="text-white leading-tight">Collected solely for processing Shared Success Protocol (SSP) payouts.</div>
                                </li>
                                <li className="border-t border-[#333] pt-4">
                                    <div className="flex justify-between text-[#8d8c9e] mb-1">CONTRIBUTIONS</div>
                                    <div className="text-white leading-tight">VPRs, forum posts, and engagement metrics you voluntarily provide.</div>
                                </li>
                            </ul>
                        </Card>
                        <Card className="p-6 bg-[#14131c] border-[#333]">
                             <div className="flex items-center gap-3 mb-6">
                                <div className="bg-purple-500/10 p-2 rounded">
                                    <Icons.Activity className="h-6 w-6 text-purple-500" />
                                </div>
                                <h3 className="font-heading text-lg text-white uppercase">Operational Data</h3>
                            </div>
                            <ul className="space-y-4 text-sm font-mono">
                                <li>
                                    <div className="flex justify-between text-[#8d8c9e] mb-1">IP ADDRESS</div>
                                    <div className="text-white leading-tight">Used for security hardening and geo-compliance verification.</div>
                                </li>
                                <li className="border-t border-[#333] pt-4">
                                    <div className="flex justify-between text-[#8d8c9e] mb-1">DEVICE INFO</div>
                                    <div className="text-white leading-tight">Browser type, OS, and screen resolution for optimization and fraud detection.</div>
                                </li>
                                <li className="border-t border-[#333] pt-4">
                                    <div className="flex justify-between text-[#8d8c9e] mb-1">USAGE LOGS</div>
                                    <div className="text-white leading-tight">Anonymized session data to refine platform performance.</div>
                                </li>
                            </ul>
                        </Card>
                    </div>
                    <p className="text-xs text-[#8d8c9e] font-mono bg-[#14131c] p-3 rounded border border-[#333]">
                        <strong className="text-[#00FFC0]">NOTE:</strong> We do not harvest sensitive categories like biometric data, health records, or financial histories unless explicitly tied to SSP rewards (and only with consent).
                    </p>
                </section>

                {/* PROTOCOL 02: USAGE */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">02 //</span> OPERATIONAL USAGE (Why We Need It)
                    </h2>
                    <p className="text-[#8d8c9e] mb-6">Every byte serves a mission-critical function, aligned to our rebel ethos: empower users, purge noise, evolve the system.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-[#14131c] p-6 rounded-lg border border-[#333] hover:border-[#00FFC0]/30 transition-all">
                            <Icons.Shield className="h-8 w-8 text-[#00FFC0] mb-4" />
                            <h3 className="font-heading text-white uppercase text-sm mb-2">Secure the Grid</h3>
                            <p className="text-sm text-[#8d8c9e] leading-relaxed">Vigilant monitoring detects fraudulent VPRs, multi-account abuse, and adversarial incursions, preserving ecosystem integrity.</p>
                        </div>
                        <div className="bg-[#14131c] p-6 rounded-lg border border-[#333] hover:border-[#00FFC0]/30 transition-all">
                            <Icons.Target className="h-8 w-8 text-[#00FFC0] mb-4" />
                            <h3 className="font-heading text-white uppercase text-sm mb-2">Sharpen Tools</h3>
                            <p className="text-sm text-[#8d8c9e] leading-relaxed">Aggregate analysis of engagement patterns (e.g., RTP queries) informs rapid iterations and smarter features.</p>
                        </div>
                        <div className="bg-[#14131c] p-6 rounded-lg border border-[#333] hover:border-[#00FFC0]/30 transition-all">
                            <Icons.Gift className="h-8 w-8 text-[#00FFC0] mb-4" />
                            <h3 className="font-heading text-white uppercase text-sm mb-2">Distribute Rewards</h3>
                            <p className="text-sm text-[#8d8c9e] leading-relaxed">Precise tracking of contributions ensures equitable SSP allocations, turning your intel into verifiable crypto returns.</p>
                        </div>
                    </div>
                    <div className="p-4 bg-[#0c0c0e] border-l-2 border-[#333] text-sm text-[#8d8c9e] font-mono leading-relaxed">
                        <strong className="text-white uppercase">DATA RETENTION PROTOCOL:</strong> Personal identifiers purged after 30 days post-inactivity; anonymized aggregates retained indefinitely for trend-building. End-to-end encryption (AES-256) employed.
                    </div>
                </section>

                {/* PROTOCOL 03: USER CONTROL */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">03 //</span> USER CONTROL TERMINAL (Your Rights)
                    </h2>
                    <Card className="p-8 bg-[#0c0c0e] border-[#333]">
                        <p className="text-white mb-6 text-lg">
                            You are the sovereign of your data—ZAP is merely the custodian. Exercise these rights at any node:
                        </p>
                        <ul className="space-y-4 text-sm text-[#8d8c9e] mb-8">
                            <li className="flex items-start gap-3">
                                <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0 mt-0.5" />
                                <span><strong className="text-white uppercase">Access & Portability:</strong> Request a comprehensive archive of your data in machine-readable format (JSON/CSV).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0 mt-0.5" />
                                <span><strong className="text-white uppercase">Rectification:</strong> Flag inaccuracies for swift correction.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0 mt-0.5" />
                                <span><strong className="text-white uppercase">Erasure ("Right to be Forgotten"):</strong> Initiate full deletion of your profile, effective within 30 days barring legal holds.</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0 mt-0.5" />
                                <span><strong className="text-white uppercase">Global Compliance:</strong> Rights aligned with GDPR, CCPA, and emerging standards.</span>
                            </li>
                        </ul>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="secondary" className="font-mono uppercase text-xs flex items-center gap-2">
                                <Icons.Database className="h-4 w-4" /> REQUEST ARCHIVE
                            </Button>
                            <Button variant="secondary" className="font-mono uppercase text-xs flex items-center gap-2 hover:text-red-500 hover:border-red-500">
                                <Icons.Trash className="h-4 w-4" /> INITIATE DELETION
                            </Button>
                        </div>
                    </Card>
                </section>

                {/* PROTOCOL 04: SHARING & SECURITY */}
                <section>
                     <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">04 //</span> DATA SHARING & SECURITY PERIMETER
                    </h2>
                    <div className="space-y-6">
                        <Card className="p-6 bg-[#14131c] border-[#333]">
                            <h3 className="font-heading text-white uppercase mb-3 flex items-center gap-2">
                                <Icons.Share className="h-5 w-5 text-[#00FFC0]" /> Sharing Ecosystem
                            </h3>
                            <p className="text-sm text-[#8d8c9e] leading-relaxed">
                                Data stays locked down, shared only with vetted service providers (e.g., cloud hosts, payment processors) under strict NDAs. No marketing partners, no ad networks. In rare cases (e.g., legal subpoenas), we notify you unless prohibited.
                            </p>
                        </Card>
                         <Card className="p-6 bg-[#14131c] border-[#333]">
                            <h3 className="font-heading text-white uppercase mb-3 flex items-center gap-2">
                                <Icons.Lock className="h-5 w-5 text-[#00FFC0]" /> Security Arsenal
                            </h3>
                            <p className="text-sm text-[#8d8c9e] leading-relaxed">
                                Multi-layered defenses include MFA enforcement, anomaly detection AI, and annual penetration testing. Breaches trigger immediate disclosure per regulatory timelines.
                            </p>
                        </Card>
                    </div>
                </section>

            </div>

            {/* FOOTER CONTACT & UPDATES */}
            <div className="mt-16 space-y-8">
                 <div>
                    <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-3 uppercase border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">05 //</span> PROTOCOL UPDATES
                    </h2>
                    <p className="text-[#8d8c9e] text-sm">
                        This Protocol evolves with the ecosystem—material changes trigger in-app alerts and email pings, effective 30 days post-notice. Continued use signals acceptance.
                    </p>
                </div>

                <div className="p-6 bg-[#0c0c0e] rounded-xl border border-[#00FFC0]/30 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="font-heading text-white uppercase mb-2 flex items-center gap-2">
                            <Icons.HelpCircle className="h-5 w-5 text-[#00FFC0]" /> PRIVACY OFFICER COMM LINE
                        </h3>
                        <p className="text-[#8d8c9e] text-sm mb-2">
                            For queries, complaints, or right invocations: Direct, encrypted channel to our compliance vanguard.
                        </p>
                        <p className="text-xs text-[#666] font-mono uppercase">
                            HQ: Premier Business Centre, Mutsamudu, Comoros
                        </p>
                    </div>
                    <a href="mailto:privacy@zap.gg" className="px-8 py-4 bg-[#14131c] border border-[#00FFC0] rounded text-[#00FFC0] font-heading uppercase text-sm hover:bg-[#00FFC0] hover:text-black transition-all shadow-[0_0_20px_rgba(0,255,192,0.2)]">
                        privacy@zap.gg
                    </a>
                </div>
            </div>

        </div>
    );
};
