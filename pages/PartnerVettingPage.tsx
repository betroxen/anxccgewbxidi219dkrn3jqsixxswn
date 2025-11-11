
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

export const PartnerVettingPage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <Icons.Shield className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                        INTEGRITY STANDARD PROTOCOL
                    </h1>
                </div>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                    // THE ONLY STANDARD // STATUS: ACTIVE FILTER
                </p>
            </div>

            {/* MISSION STATEMENT */}
            <Card className="p-8 bg-[#0c0c0e] border-[#00FFC0]/30 mb-16 relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="font-heading text-xl text-white mb-4 uppercase flex items-center gap-2">
                        <Icons.Filter className="h-5 w-5 text-[#00FFC0]" /> THE CRITICAL FILTER
                    </h2>
                    <p className="text-lg text-[#8d8c9e] leading-relaxed max-w-3xl">
                        ZAP acts as the critical filter for the crypto gaming ecosystem. Our partnership is an endorsement of security, fairness, and verifiable compliance. This protocol defines the minimum standards and the <strong className="text-white">continuous monitoring</strong> required for all ZAP-listed operators.
                    </p>
                </div>
                {/* subtle background grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>

            {/* GATE I: FOUNDATIONAL */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">GATE I //</span> FOUNDATIONAL COMPLIANCE (The Hard Facts)
                </h2>
                <p className="text-[#8d8c9e] mb-6">
                    Every operator seeking to join the ZAP Circuit must provide irrefutable, verifiable proof of the following before any data analysis begins. No exceptions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/30 transition-all">
                        <Icons.BookOpen className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-lg text-white uppercase mb-2">Active Licensing</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Valid and current operating licenses from a reputable gaming jurisdiction (e.g., Curaçao, Malta, Isle of Man).
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/30 transition-all">
                        <Icons.Activity className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-lg text-white uppercase mb-2">RNG Certification</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Independent third-party certification (e.g., eCOGRA, iTech Labs) of their Random Number Generator for provably fair outcomes.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/30 transition-all">
                        <Icons.Eye className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-lg text-white uppercase mb-2">Ownership Transparency</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Full disclosure of ultimate beneficial owners (UBOs) to ensure zero connection to known sanctions or criminal activity.
                        </p>
                    </Card>
                </div>
            </section>

            {/* GATE II: AML & KYC */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">GATE II //</span> FINANCIAL INTEGRITY (AML & KYC)
                </h2>
                <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#333]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-[#8d8c9e] mb-6 leading-relaxed">
                                We demand robust financial integrity and player protection systems. Our audit verifies the operator's commitment to advanced monitoring and compliant verification.
                            </p>
                            <ul className="space-y-4 font-mono text-sm">
                                <li className="flex items-center gap-3 p-3 bg-[#14131c] rounded border border-[#333]">
                                    <Icons.CheckCircle className="h-5 w-5 text-blue-500" />
                                    <span className="text-white">TRANSACTION MONITORING SYSTEMS</span>
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-[#14131c] rounded border border-[#333]">
                                    <Icons.CheckCircle className="h-5 w-5 text-blue-500" />
                                    <span className="text-white">CLEAR IDENTITY VERIFICATION (KYC)</span>
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-[#14131c] rounded border border-[#333]">
                                    <Icons.CheckCircle className="h-5 w-5 text-blue-500" />
                                    <span className="text-white">SOURCE OF FUNDS (SOF) CHECKS</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-center opacity-80">
                            <Icons.Lock className="h-32 w-32 text-blue-900/50" />
                        </div>
                    </div>
                </Card>
            </section>

            {/* GATE III: CONTINUOUS MONITORING */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-red-500">GATE III //</span> CONTINUOUS VETO PROTOCOL
                </h2>
                <p className="text-[#8d8c9e] mb-8 text-lg">
                    The auditing does not stop once the operator is on the Grid. We maintain continuous operational pressure using our data engine and the community's signal.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <Card className="p-6 bg-[#14131c] border-[#00FFC0]/20">
                        <h3 className="font-heading text-lg text-white uppercase mb-3 flex items-center gap-2">
                            <Icons.Activity className="h-5 w-5 text-[#00FFC0]" /> Data Engine Surveillance
                        </h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Our tools continuously monitor historical RTP logs and payout transaction speeds to instantly detect sudden, unfavorable changes in performance.
                        </p>
                    </Card>
                    <Card className="p-6 bg-[#14131c] border-purple-500/20">
                        <h3 className="font-heading text-lg text-white uppercase mb-3 flex items-center gap-2">
                            <Icons.Users className="h-5 w-5 text-purple-500" /> Community Veto Power
                        </h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            ZAP reserves the right to initiate an immediate audit if the VPR volume exceeds a critical negative threshold. The players hold the ultimate kill switch.
                        </p>
                    </Card>
                </div>

                {/* KILL SWITCH */}
                <div className="bg-red-950/20 p-6 rounded-xl border-l-4 border-red-500 flex items-start gap-4">
                    <Icons.AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0" />
                    <div>
                        <h3 className="font-heading text-xl text-red-500 uppercase mb-2">IMMEDIATE DE-LISTING PROTOCOL</h3>
                        <p className="text-[#8d8c9e] leading-relaxed">
                            ZAP will <strong className="text-white">immediately delist</strong> any operator who demonstrates a failure in security, a sustained degradation in fairness metrics, or a breach of compliance. Integrity is a renewable license; operators must earn it every day.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};
