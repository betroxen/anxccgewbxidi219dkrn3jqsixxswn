
import React, { useState } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Tooltip } from '../components/Tooltip';

interface IntelBrief {
    id: string;
    title: string;
    focus: string;
    content: React.ReactNode;
}

interface Circuit {
    id: string;
    title: string;
    icon: React.FC<any>;
    description: string;
    briefs: IntelBrief[];
}

export const KnowledgeBasePage = () => {
    const [activeBrief, setActiveBrief] = useState<IntelBrief | null>(null);
    const [openCircuitId, setOpenCircuitId] = useState<string | null>("I"); // Default first one open
    const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

    const toggleCircuit = (id: string) => {
        setOpenCircuitId(prev => prev === id ? null : id);
    };

    const handleBriefSelect = (brief: IntelBrief) => {
        setActiveBrief(brief);
        setMobileView('detail');
        setTimeout(() => window.scrollTo(0,0), 10);
    };

    const backToList = () => {
        setMobileView('list');
    };

    // --- FULL CONTENT DATA ---
    const circuits: Circuit[] = [
        {
            id: "I",
            title: "ZAP PROTOCOL & INTEGRITY",
            icon: Icons.BookOpen,
            description: "How ZAP operates, our unbiased methodology, and funding transparency.",
            briefs: [
                { 
                    id: "001", 
                    title: "HOW WE SCORE: THE ZAP SCORE DEEP DIVE", 
                    focus: "Full breakdown of the 3-pillar rating methodology.", 
                    content: (
                        <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Understand the only rating in the crypto space that can't be bought. The ZAP Score is a dynamic, constantly updated metric built from raw data, security audits, and—most importantly—validated community intel.</span>
                            </div>

                            <p className="text-lg leading-relaxed">
                                The score is calculated using three non-negotiable data streams. No single stream can dominate the final score, ensuring integrity and resilience against manipulation.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-heading text-white mb-3 uppercase flex items-center gap-2">
                                        <span className="text-[#00FFC0]">I.</span> THE DATA WEIGHT (40%) <span className="text-[#8d8c9e] text-sm ml-auto font-mono">// QUANTITATIVE FACTS</span>
                                    </h3>
                                    <ul className="space-y-3 border-l border-[#333] pl-4 ml-2">
                                        <li>
                                            <strong className="text-white block">True RTP/House Edge</strong>
                                            We audit the actual historical Return to Player (RTP) performance, not the marketing claims. This is the single largest factor.
                                        </li>
                                        <li>
                                            <strong className="text-white block">Payout Speed</strong>
                                            We track average withdrawal times based on actual user reports and test transactions.
                                        </li>
                                        <li>
                                            <strong className="text-white block">Fees & Terms</strong>
                                            A deep dive into hidden deposit/withdrawal fees and bonus wagering requirements.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-heading text-white mb-3 uppercase flex items-center gap-2">
                                        <span className="text-[#00FFC0]">II.</span> THE VETTING WEIGHT (30%) <span className="text-[#8d8c9e] text-sm ml-auto font-mono">// SECURITY & COMPLIANCE</span>
                                    </h3>
                                    <p className="text-sm text-[#8d8c9e] mb-3 ml-2">If an operator fails this check, they are immediately disqualified and removed from the Grid.</p>
                                    <ul className="space-y-3 border-l border-[#333] pl-4 ml-2">
                                        <li>
                                            <strong className="text-white block">Security Architecture</strong>
                                            Assessment of encryption standards and wallet security.
                                        </li>
                                        <li>
                                            <strong className="text-white block">Compliance & Licensing</strong>
                                            Verification of active, legitimate licensing and robust AML/KYC protocols.
                                        </li>
                                        <li>
                                            <strong className="text-white block">Provably Fair Mechanics</strong>
                                            Rigorous testing of the transparency and auditability of their system.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-heading text-white mb-3 uppercase flex items-center gap-2">
                                        <span className="text-[#00FFC0]">III.</span> THE COMMUNITY WEIGHT (30%) <span className="text-[#8d8c9e] text-sm ml-auto font-mono">// PLAYER VALIDATION</span>
                                    </h3>
                                    <ul className="space-y-3 border-l border-[#333] pl-4 ml-2">
                                        <li>
                                            <strong className="text-white block">Validated Player Reports (VPRs)</strong>
                                            Aggregated scores from our verified user base, weighted based on contributor reputation.
                                        </li>
                                        <li>
                                            <strong className="text-white block">Customer Support Response</strong>
                                            Testing the speed, clarity, and competence of the operator's support staff.
                                        </li>
                                         <li>
                                            <strong className="text-white block">The Community Veto</strong>
                                            Collective, verified player reports can trigger a formal ZAP audit, leading to an immediate score reduction.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                             <div className="bg-[#14131c] p-4 rounded border-l-2 border-[#00FFC0] text-sm">
                                <strong className="text-white font-heading uppercase">ACTIONABLE INSIGHT:</strong> The ZAP Score is a live metric. Always check the Score Last Verified timestamp before you play.
                            </div>
                        </div>
                    )
                },
                { 
                    id: "002", 
                    title: "THE AFFILIATE CONTRACT: WHERE DOES THE MONEY GO?", 
                    focus: "Transparency on our financial model and SSP.", 
                    content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Total transparency on our financial model. We run standard affiliate partnerships with operators who pass our rigorous vetting.</span>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-heading text-white mb-4 uppercase">THE CHASM: AFFILIATION VS. INTEGRITY</h3>
                                <p className="text-lg mb-4">The commission fee is a transaction for traffic. It is <strong className="text-white">NOT</strong> a transaction for a rating. The ZAP Score is algorithm-driven and cannot be compromised by payment.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#14131c] p-5 rounded-lg border border-[#333]">
                                    <Icons.Zap className="h-8 w-8 text-[#00FFC0] mb-4" />
                                    <h4 className="font-heading text-white mb-2">WE EARN WHEN YOU PLAY</h4>
                                    <p className="text-sm text-[#8d8c9e]">This is how we monetize our service of providing actionable data and maintain our independence from paid reviews.</p>
                                </div>
                                <div className="bg-[#14131c] p-5 rounded-lg border border-[#333]">
                                    <Icons.Shield className="h-8 w-8 text-[#00FFC0] mb-4" />
                                    <h4 className="font-heading text-white mb-2">WE SCORE BASED ON DATA</h4>
                                    <p className="text-sm text-[#8d8c9e]">Integrity is non-negotiable. An operator cannot pay to boost their score, ever.</p>
                                </div>
                            </div>

                             <div className="bg-[#14131c] p-6 rounded-lg border border-[#00FFC0]/30">
                                <h3 className="text-lg font-heading text-white mb-2 uppercase flex items-center gap-2">
                                    <Icons.Gift className="h-5 w-5 text-[#00FFC0]" /> WHAT ABOUT REWARDS?
                                </h3>
                                <p className="text-[#8d8c9e]">A percentage of the revenue generated through the affiliate model is fed directly back into the <strong className="text-white">Shared Success Protocol (SSP)</strong>, rewarding community contributors. When ZAP wins, the community wins.</p>
                            </div>
                        </div>
                    )
                },
                { 
                    id: "003", 
                    title: "WHY ZAP ISN'T A CASINO (AND WHY THAT MATTERS)", 
                    focus: "Defining our role as a data platform, not an operator.", 
                    content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Clarify the divide. ZAP is a Data Platform and Integrity Filter, not a gaming operator.</span>
                            </div>
                            <p className="text-lg leading-relaxed">
                                We have zero vested interest in your loss. Casinos need you to lose to make profit; ZAP needs you to engage successfully with verified partners to sustain our ecosystem.
                            </p>
                            <ul className="space-y-4 text-lg">
                                <li className="flex items-center gap-3">
                                    <Icons.X className="h-6 w-6 text-red-500" />
                                    <span>We host <strong className="text-white">NO</strong> games.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icons.X className="h-6 w-6 text-red-500" />
                                    <span>We hold <strong className="text-white">NO</strong> player funds for wagering.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icons.CheckCircle className="h-6 w-6 text-[#00FFC0]" />
                                    <span>We <strong className="text-white">DO</strong> provide the intelligence you need to win.</span>
                                </li>
                            </ul>
                        </div>
                    )
                },
                { 
                    id: "004", 
                    title: "ZAP VETTING: HOW OPERATORS EARN A SPOT ON THE GRID", 
                    focus: "The high bar for ZAP verification and listing.", 
                    content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Understand the high bar set for ZAP verification. Not every operator gets in.</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-heading text-white mb-3 uppercase">COMPLIANCE CRUCIBLE</h3>
                                    <ul className="space-y-2 text-sm border-l border-[#333] pl-4 text-[#8d8c9e]">
                                        <li><strong className="text-white">Active Licensing:</strong> Must hold a valid license from a recognized jurisdiction.</li>
                                        <li><strong className="text-white">AML/KYC Protocol:</strong> Robust anti-money laundering procedures must be in place.</li>
                                        <li><strong className="text-white">Solvency Check:</strong> Proof of funds to cover large player wins.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading text-white mb-3 uppercase">INTEGRITY AUDIT</h3>
                                    <ul className="space-y-2 text-sm border-l border-[#333] pl-4 text-[#8d8c9e]">
                                        <li><strong className="text-white">Historical RTP:</strong> Must provide access to logs for RTP validation.</li>
                                        <li><strong className="text-white">Community Veto:</strong> Must agree to our terms regarding community-triggered audits.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-red-950/20 p-4 rounded border-l-4 border-red-500">
                                <strong className="text-red-500 font-heading uppercase block mb-1">CRITICAL PROTOCOL: IMMEDIATE DE-LISTING</strong>
                                <span className="text-[#8d8c9e]">If an operator fails to maintain compliance or attempts to compromise a review score, they are immediately removed from the Grid. No second chances.</span>
                            </div>
                        </div>
                    )
                },
                { 
                    id: "005", 
                    title: "DISPUTE RESOLUTION: OUR ROLE IN CONFLICTS", 
                    focus: "ZAP's boundary and leverage as a Data Mediator.", 
                    content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Define ZAP's boundary and leverage. We are the Data Mediator, not the judge and jury.</span>
                            </div>
                            <p className="text-lg leading-relaxed">
                                If you have a dispute, submit irrefutable evidence via the Support Line Activation Form. ZAP uses its partnership standing to present your validated data directly to the operator.
                            </p>
                            <div className="bg-[#14131c] p-6 rounded-lg border border-[#333]">
                                <h3 className="text-lg font-heading text-white mb-2 uppercase">OUR LEVERAGE IS PUBLIC</h3>
                                <p className="text-[#8d8c9e]">
                                    ZAP cannot force a payout or restore an account directly. Our power lies in the <strong>ZAP Score</strong>. We penalize integrity failures publicly, which often motivates operators to resolve legitimate disputes quickly to avoid reputation damage.
                                </p>
                            </div>
                        </div>
                    )
                },
            ]
        },
        {
            id: "II",
            title: "THE DATA LAYER",
            icon: Icons.Database,
            description: "Tools, metrics, and mathematical concepts for the strategic player.",
            briefs: [
                 { 
                    id: "101", 
                    title: "HUNTING THE TRUE RTP: WHAT THE HOUSE HIDES", 
                    focus: "Moving past marketing spin to find actual edge.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Move past marketing spin and find the True RTP that defines your long-term advantage.</span>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-heading text-white mb-2 uppercase">THEORETICAL RTP (TRTP)</h3>
                                    <p className="text-[#8d8c9e]">The number on the box. Calculated over billions of simulated spins. Useful as a baseline, but rarely reflects short-term reality.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading text-[#00FFC0] mb-2 uppercase">OBSERVED RTP (ORTP)</h3>
                                    <p className="text-white">The actual historical payout rate observed by ZAP's data tools across thousands of real player sessions. <strong className="text-[#00FFC0]">This is the first truth.</strong></p>
                                </div>
                            </div>

                            <div className="bg-[#14131c] p-4 rounded border-l-2 border-yellow-500 text-sm">
                                <strong className="text-yellow-500 font-heading uppercase block mb-1">TACTICAL NOTE: FACTOR IN FEES</strong>
                                <span className="text-[#8d8c9e]">Always deduct withdrawal and deposit fees from the TRTP to understand your actual net edge. A 99% RTP game on a site with 2% withdrawal fees is a losing proposition.</span>
                            </div>
                        </div>
                    )
                },
                { 
                    id: "102", 
                    title: "VARIANCE & VOLATILITY: ADJUSTING YOUR STRATEGY", 
                    focus: "Understanding volatility as a measurable risk factor.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Volatility is not just a buzzword; it is a measurable risk factor that dictates your required bankroll.</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#14131c] p-5 rounded-lg border border-[#333]">
                                    <h4 className="font-heading text-blue-400 mb-2 uppercase">LOW VOLATILITY</h4>
                                    <p className="text-sm text-[#8d8c9e]">Frequent, smaller wins. Great for extending playtime, clearing bonuses, and managing a smaller bankroll.</p>
                                </div>
                                <div className="bg-[#14131c] p-5 rounded-lg border border-[#333]">
                                    <h4 className="font-heading text-red-400 mb-2 uppercase">HIGH VOLATILITY</h4>
                                    <p className="text-sm text-[#8d8c9e]">Rare, but potentially massive wins. Requires substantial bankroll to weather long dry streaks.</p>
                                </div>
                            </div>

                             <div className="bg-[#14131c] p-6 rounded-lg border border-[#00FFC0]/30">
                                <h3 className="text-lg font-heading text-white mb-2 uppercase">THE BANKROLL RESILIENCE FORMULA</h3>
                                <p className="text-[#8d8c9e]">Never dedicate more than <strong className="text-white">0.5%</strong> of your total stack to a single bet on a high-volatility game. Use ZAP's Volatility Index (1 to 5) to match risk to your stack size.</p>
                            </div>
                        </div>
                    )
                },
                { 
                    id: "103", 
                    title: "DECRYPTING THE SEED: UNDERSTANDING PROVABLY FAIR", 
                    focus: "How to mathematically verify game outcomes.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Eliminate doubt. "Provably Fair" means you can mathematically verify the game outcome was not manipulated after you placed your bet.</span>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-heading text-white mb-4 uppercase">THE HASH TRINITY</h3>
                                <ul className="space-y-4 border-l border-[#333] pl-6">
                                    <li>
                                        <strong className="text-[#00FFC0] block font-mono uppercase mb-1">1. Server Seed (House Secret)</strong>
                                        Generated by the casino before you bet. You get a hashed version of this first.
                                    </li>
                                    <li>
                                        <strong className="text-[#00FFC0] block font-mono uppercase mb-1">2. Client Seed (Your Control)</strong>
                                        You can—and should—change this seed. It ensures the casino didn't know the outcome in advance.
                                    </li>
                                    <li>
                                        <strong className="text-[#00FFC0] block font-mono uppercase mb-1">3. Nonce (The Counter)</strong>
                                        A number that increases with every bet you make, ensuring each round is unique.
                                    </li>
                                </ul>
                            </div>

                             <div className="bg-[#14131c] p-4 rounded border-l-2 border-red-500 text-sm">
                                <strong className="text-red-500 font-heading uppercase block mb-1">RED FLAG PROTOCOL</strong>
                                <span className="text-[#8d8c9e]">If a platform labeled "Provably Fair" does not allow you to easily change your Client Seed, or hides the unhashed Server Seed after the round, WALK AWAY.</span>
                            </div>
                        </div>
                    )
                },
                { 
                    id: "104", 
                    title: "SPOTTING HIDDEN FEES & AGGRESSIVE WAGERING", 
                    focus: "Uncovering traps that nullify your edge.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Bonus money is bait. You must learn to spot the traps in the Terms & Conditions that nullify your statistical edge.</span>
                            </div>
                            
                            <ul className="space-y-6">
                                <li className="bg-[#14131c] p-4 rounded-lg border border-[#333]">
                                    <h4 className="font-heading text-red-400 mb-2 uppercase flex items-center gap-2"><Icons.AlertTriangle className="h-4 w-4"/> The Wagering Trap</h4>
                                    <p className="text-sm text-[#8d8c9e]">A Wagering Requirement (WR) of 40x or higher on <em>both</em> the bonus AND the deposit amount is mathematically aggressive and designed to zero out your balance.</p>
                                </li>
                                <li className="bg-[#14131c] p-4 rounded-lg border border-[#333]">
                                    <h4 className="font-heading text-red-400 mb-2 uppercase flex items-center gap-2"><Icons.AlertTriangle className="h-4 w-4"/> Game Contribution Lie</h4>
                                    <p className="text-sm text-[#8d8c9e]">High RTP games (like Blackjack or specific slots) are often excluded or only count 5-10% towards WR. Always check the contribution table.</p>
                                </li>
                                <li className="bg-[#14131c] p-4 rounded-lg border border-[#333]">
                                    <h4 className="font-heading text-red-400 mb-2 uppercase flex items-center gap-2"><Icons.AlertTriangle className="h-4 w-4"/> Hidden Transactional Fees</h4>
                                    <p className="text-sm text-[#8d8c9e]">Be wary of percentage-based withdrawal fees. A fixed fee is acceptable; a 2% fee on a 1 BTC withdrawal is theft.</p>
                                </li>
                            </ul>
                        </div>
                    )
                },
                { 
                    id: "105", 
                    title: "TOOL SPOTLIGHT: THE EDGE FINDER", 
                    focus: "Using ZAP's primary data aggregation tool.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">The Edge Finder is your competitive advantage. It aggregates real-time data from all ZAP-verified operators into a single, searchable dashboard.</span>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-lg font-heading text-white uppercase">KEY FUNCTIONS</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <li className="bg-[#14131c] p-4 rounded-lg border border-[#333] text-center">
                                        <Icons.Activity className="h-8 w-8 text-[#00FFC0] mx-auto mb-2" />
                                        <h4 className="font-heading text-white text-sm mb-1">RTP Comparison</h4>
                                        <p className="text-xs text-[#8d8c9e]">See which casino offers the best odds for the exact same game.</p>
                                    </li>
                                     <li className="bg-[#14131c] p-4 rounded-lg border border-[#333] text-center">
                                        <Icons.Target className="h-8 w-8 text-[#00FFC0] mx-auto mb-2" />
                                        <h4 className="font-heading text-white text-sm mb-1">Volatility Meter</h4>
                                        <p className="text-xs text-[#8d8c9e]">Match games to your current bankroll strategy.</p>
                                    </li>
                                     <li className="bg-[#14131c] p-4 rounded-lg border border-[#333] text-center">
                                        <Icons.Users className="h-8 w-8 text-[#00FFC0] mx-auto mb-2" />
                                        <h4 className="font-heading text-white text-sm mb-1">Community Win Rate</h4>
                                        <p className="text-xs text-[#8d8c9e]">Track recent performance based on VPR data.</p>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-[#8d8c9e] text-sm">Use the Edge Finder to pick games based on mathematical superiority, not marketing placement.</p>
                        </div>
                    )
                },
            ]
        },
        {
            id: "III",
            title: "COMMUNITY & REWARDS",
            icon: Icons.Users,
            description: "Contribution protocols, validation, and the Shared Success Protocol (SSP).",
            briefs: [
                 { 
                    id: "201", 
                    title: "YOUR SIGNAL IS THE REVIEW: SUBMITTING VPRS", 
                    focus: "Guidelines for submitting Validated Player Reports.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">We only accept raw, un-fictionalized data. Fiction is noise. Your report must be verifiable to earn rewards.</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-heading text-[#00FFC0] mb-3 uppercase">REQUIRED EVIDENCE</h3>
                                    <ul className="space-y-2 text-sm border-l border-[#333] pl-4 text-[#8d8c9e]">
                                        <li>Screenshots of transaction IDs or error messages.</li>
                                        <li>Unedited chat logs with support staff.</li>
                                        <li>Provably Fair Hash IDs for contested game outcomes.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading text-red-500 mb-3 uppercase">WHAT WE REJECT</h3>
                                    <ul className="space-y-2 text-sm border-l border-[#333] pl-4 text-[#8d8c9e]">
                                        <li>Unsubstantiated claims ("This site is rigged!").</li>
                                        <li>Emotional rants without data points.</li>
                                        <li>Duplicate reports for the same incident.</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-[#8d8c9e]">Reports are validated by ZAP analysts before they impact the Community Weight of the ZAP Score.</p>
                        </div>
                    )
                },
                { 
                    id: "202", 
                    title: "THE SHARED SUCCESS PROTOCOL: EARNING REWARDS", 
                    focus: "How active contribution translates to real value.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">You helped build the intelligence grid. You deserve a cut. The SSP distributes a portion of ZAP's revenue back to high-value contributors.</span>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-heading text-white mb-4 uppercase">CONTRIBUTION VALUE SYSTEM (CVS)</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-[#14131c] rounded border-l-2 border-[#00FFC0]">
                                        <span className="text-white font-bold">Fraud Reports (Validated)</span>
                                        <span className="font-mono text-[#00FFC0]">HIGHEST TIER REWARD</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-[#14131c] rounded border-l-2 border-[#00FFC0]/60">
                                        <span className="text-white font-medium">VPR Submissions</span>
                                        <span className="font-mono text-[#00FFC0]/80">MID TIER REWARD</span>
                                    </div>
                                     <div className="flex items-center justify-between p-3 bg-[#14131c] rounded border-l-2 border-[#00FFC0]/30">
                                        <span className="text-[#8d8c9e]">General Activity (Login/Posts)</span>
                                        <span className="font-mono text-[#00FFC0]/50">BASE TIER REWARD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                },
                { 
                    id: "203", 
                    title: "THE COMMUNITY VETO: COLLECTIVE INTEL", 
                    focus: "How the community can overturn a ZAP Score.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">The Community Veto is the final line of defense. Collective intelligence can override algorithmic scoring.</span>
                            </div>
                            
                            <div className="bg-[#14131c] p-6 rounded-lg border border-[#333]">
                                <h3 className="text-lg font-heading text-white mb-3 uppercase">VETO TRIGGER MECHANISM</h3>
                                <p className="text-[#8d8c9e] mb-4">
                                    The Veto is triggered by a statistically significant volume of validated VPRs focused on a single critical failure point (e.g., a sudden wave of delayed withdrawals).
                                </p>
                                <div className="flex items-center gap-4 text-sm">
                                    <Icons.ArrowRight className="h-5 w-5 text-[#00FFC0]" />
                                    <span className="text-white font-bold">IMMEDIATE AUDIT</span>
                                    <Icons.ArrowRight className="h-5 w-5 text-[#00FFC0]" />
                                    <span className="text-white font-bold">SCORE SUSPENSION</span>
                                </div>
                            </div>
                        </div>
                    )
                },
                 { 
                    id: "204", 
                    title: "MASTERING THE FORUM: RULES OF ENGAGEMENT", 
                    focus: "Conduct guidelines for the ZAP intelligence hub.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">The ZAP Forum is an intelligence hub, not a chaotic message board. Data over Drama.</span>
                            </div>
                            <ul className="space-y-4 text-sm text-[#8d8c9e]">
                                <li className="flex items-start gap-3">
                                    <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] mt-0.5" />
                                    <span>Maintain a professional, analytical tone. We are here to find an edge, not to vent without purpose.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icons.X className="h-5 w-5 text-red-500 mt-0.5" />
                                    <span>Zero tolerance for FUD (Fear, Uncertainty, Doubt) without evidence, or shilling for affiliate codes.</span>
                                </li>
                            </ul>
                            <p className="text-sm text-[#8d8c9e]">Participation is rewarded via a merit-based ranking system (Verified Contributor, Intel Analyst).</p>
                        </div>
                    )
                },
                 { 
                    id: "205", 
                    title: "ACCOUNT ACTIVATION: SECURITY PROTOCOLS", 
                    focus: "Managing your ZAP command center securely.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Your ZAP account is your command center. Secure it accordingly.</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#14131c] p-5 rounded-lg border border-[#333]">
                                    <Icons.Lock className="h-6 w-6 text-[#00FFC0] mb-3" />
                                    <h4 className="font-heading text-white mb-1 uppercase">Mandatory MFA</h4>
                                    <p className="text-xs text-[#8d8c9e]">Set up Multi-Factor Authentication immediately. It is required for profile changes and reward withdrawals.</p>
                                </div>
                                <div className="bg-[#14131c] p-5 rounded-lg border border-[#333]">
                                    <Icons.Wallet className="h-6 w-6 text-[#00FFC0] mb-3" />
                                    <h4 className="font-heading text-white mb-1 uppercase">Wallet Connection</h4>
                                    <p className="text-xs text-[#8d8c9e]">Link a crypto wallet only for receiving ZAP rewards. We do not store private keys.</p>
                                </div>
                            </div>
                        </div>
                    )
                },
            ]
        },
        {
            id: "IV",
            title: "SAFETY & PROTECTION",
            icon: Icons.Shield,
            description: "Ethical guidelines, responsible gaming, and legal frameworks.",
            briefs: [
                { 
                    id: "301", 
                    title: "SMART GAMBLING PLAYBOOK: STAYING SHARP", 
                    focus: "Responsible gaming as a tactical advantage.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Responsible Gaming is tactical leverage. Losing control means losing your edge.</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-heading text-white mb-4 uppercase">THE DISCIPLINE CONTRACT</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <li className="bg-[#14131c] p-4 rounded border border-[#333]">
                                        <strong className="text-[#00FFC0] block font-heading uppercase mb-1">TIME LIMITS</strong>
                                        <span className="text-xs text-[#8d8c9e]">Avoid fatigue.</span>
                                    </li>
                                     <li className="bg-[#14131c] p-4 rounded border border-[#333]">
                                        <strong className="text-[#00FFC0] block font-heading uppercase mb-1">LOSS LIMITS</strong>
                                        <span className="text-xs text-[#8d8c9e]">Know your max downside.</span>
                                    </li>
                                     <li className="bg-[#14131c] p-4 rounded border border-[#333]">
                                        <strong className="text-[#00FFC0] block font-heading uppercase mb-1">WIN LIMITS</strong>
                                        <span className="text-xs text-[#8d8c9e]">Secure profit and exit.</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-sm text-[#8d8c9e]">Avoid Chasing Losses. If the game stops being fun, use the external support resources in the Responsible Gaming Policy.</p>
                        </div>
                    )
                },
                 { 
                    id: "302", 
                    title: "GEO-FENCING & JURISDICTION: KNOW YOUR SLOT", 
                    focus: "Understanding legal compliance in your region.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">Your legal compliance is local. ZAP provides global data, but you must obey local laws.</span>
                            </div>
                            <div className="bg-[#14131c] p-6 rounded-lg border border-[#333]">
                                <h3 className="text-lg font-heading text-white mb-2 uppercase">THE LEGAL IMPERATIVE</h3>
                                <p className="text-[#8d8c9e] mb-4">
                                    It is your sole responsibility to confirm the legality of crypto gaming in your jurisdiction. ZAP cannot confirm your eligibility.
                                </p>
                                <div className="bg-red-950/20 p-3 rounded border border-red-900/30 text-sm text-red-400 flex items-start gap-2">
                                    <Icons.AlertTriangle className="h-5 w-5 shrink-0" />
                                    <span>WARNING: Bypassing geo-fencing (e.g., using VPNs against operator T&Cs) is a breach of terms and can void your winnings.</span>
                                </div>
                            </div>
                        </div>
                    )
                },
                { 
                    id: "303", 
                    title: "THE FRAUD REPORT: FLAGGING SHADY ACTIVITY", 
                    focus: "High-priority reporting for systemic operator failures.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">This is a critical, high-priority ticket for severe, systemic failures, not standard grievances.</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-heading text-white mb-4 uppercase">THE THRESHOLD FOR FRAUD</h3>
                                <p className="text-[#8d8c9e] mb-4">Alleging illegal or intentionally deceptive activity (e.g., tampering with Provably Fair code, intentional non-payout of legitimate winnings). Requires irrefutable raw data.</p>
                                <p className="text-white font-medium">A validated Fraud Report leads to immediate permanent de-listing and the highest SSP reward tier.</p>
                            </div>
                        </div>
                    )
                },
                { 
                    id: "304", 
                    title: "DATA PRIVACY: WHAT WE LOG", 
                    focus: "Transparency on user data collection.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">We need data to give you the edge. We respect your security and anonymity.</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-heading text-[#00FFC0] mb-3 uppercase">WE LOG</h3>
                                    <ul className="space-y-2 text-sm border-l border-[#333] pl-4 text-[#8d8c9e]">
                                        <li>Derivative Data (IP, browser type for security).</li>
                                        <li>Contribution Data (VPRs, Handle).</li>
                                        <li>Wallet Address (strictly for payouts).</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-heading text-red-500 mb-3 uppercase">WE NEVER TOUCH</h3>
                                    <ul className="space-y-2 text-sm border-l border-[#333] pl-4 text-[#8d8c9e]">
                                        <li>Private Keys or Seed Phrases.</li>
                                        <li>External financial transaction details.</li>
                                        <li>Your individual activity data for sale to third parties.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                },
                { 
                    id: "305", 
                    title: "TERMS OF ENGAGEMENT: THE CONTRACT", 
                    focus: "Executive summary of T&Cs.", 
                     content: (
                         <div className="space-y-8">
                            <div className="p-4 bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-lg">
                                 <strong className="text-[#00FFC0] font-heading uppercase tracking-wider mr-2">MISSION DIRECTIVE:</strong>
                                 <span className="text-white">The executive summary of the Terms and Conditions you agreed to upon entry.</span>
                            </div>
                            <ul className="space-y-4 text-[#8d8c9e]">
                                <li><strong className="text-white uppercase">Risk Assumption:</strong> You assume all risk when wagering on external platforms.</li>
                                <li><strong className="text-white uppercase">ZAP's Commitment:</strong> We provide the most honest, verifiable data available.</li>
                                <li><strong className="text-white uppercase">Your Obligation:</strong> You commit to providing 100% authentic and raw data and adhering to all compliance policies.</li>
                            </ul>
                        </div>
                    )
                },
            ]
        }
    ];

    return (
        <div className="h-full flex flex-col bg-[#0A0A0A]">
            <div className="container mx-auto max-w-[1400px] p-4 py-6 md:py-10 flex-1 flex flex-col page-fade-in">
                {/* Header Area */}
                <div className="mb-6 md:mb-8 flex-shrink-0">
                    <div className="flex items-center gap-3 md:gap-4 mb-2">
                        <Icons.BookOpen className="h-6 w-6 md:h-8 md:w-8 text-[#00FFC0] animate-pulse-slow" />
                        <h1 className="font-heading text-xl md:text-4xl font-bold text-white uppercase leading-tight">
                            KNOWLEDGE BASE: <span className="text-[#00FFC0] block md:inline text-glow">INTEL CIRCUIT V2.0</span>
                        </h1>
                    </div>
                    <p className="text-[#8d8c9e] max-w-3xl text-sm md:text-base font-mono">
                        <strong className="text-[#00FFC0] tracking-wider">// STATUS: OPERATIONAL.</strong> This is the primary source of truth for the ZAP ecosystem. Gamble Smarter, Not Harder.
                    </p>
                </div>

                {/* Command Center Layout - Fixed Height Container */}
                <div className="flex flex-1 gap-6 overflow-hidden relative h-[calc(100vh-12rem)]">
                    
                    {/* LEFT PANE: CIRCUIT NAVIGATION (Master) */}
                    <div className={`w-full lg:w-2/5 xl:w-1/3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-1 lg:pr-4 transition-all duration-300 
                        ${mobileView === 'detail' ? 'hidden lg:flex' : 'flex'}`}
                        role="navigation" aria-label="Intel Circuits"
                    >
                        
                        {circuits.map((circuit) => {
                            const isExpanded = openCircuitId === circuit.id;
                            return (
                            <div key={circuit.id} className={`bg-[#14131c] rounded-lg overflow-hidden transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-[#333333]`}>
                                {/* Circuit Header Toggle (Command Module Style) */}
                                <button 
                                    onClick={() => toggleCircuit(circuit.id)}
                                    aria-expanded={isExpanded}
                                    aria-controls={`circuit-${circuit.id}-content`}
                                    className={`w-full p-5 text-left flex items-start gap-4 hover:bg-[#1c1c26] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00FFC0] group`}
                                >
                                    <div className={`p-2.5 rounded-md bg-[#0c0c0c] border border-[#333] group-hover:border-[#00FFC0]/50 transition-colors flex-shrink-0`}>
                                        <circuit.icon className={`h-6 w-6 text-[#00FFC0]`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-heading text-base md:text-lg text-white uppercase tracking-wider flex justify-between items-center">
                                            <span className="truncate mr-2">CIRCUIT {circuit.id}: <span className="text-[#00FFC0]">{circuit.title}</span></span>
                                            <Icons.ChevronDown className={`h-5 w-5 text-[#8d8c9e] flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#00FFC0]' : ''}`} />
                                        </h2>
                                        <p className="text-[#8d8c9e] text-xs md:text-sm mt-1 pr-2 md:pr-8 line-clamp-2 md:line-clamp-none font-mono">{circuit.description}</p>
                                    </div>
                                </button>

                                {/* Article List (Smooth Transition) */}
                                <div 
                                    id={`circuit-${circuit.id}-content`}
                                    role="region"
                                    aria-labelledby={`circuit-${circuit.id}-header`}
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-3 space-y-2 bg-[#0c0c0e] border-t border-[#333333]">
                                        {circuit.briefs.map((brief) => {
                                            const isActive = activeBrief?.id === brief.id;
                                            return (
                                                <Tooltip key={brief.id} content={brief.focus}>
                                                    <button
                                                        onClick={() => handleBriefSelect(brief)}
                                                        className={`w-full group flex items-center text-left rounded-md overflow-hidden transition-all duration-150 min-h-[50px] focus:outline-none focus:ring-2 focus:ring-[#00FFC0]
                                                            ${isActive 
                                                                ? 'bg-[#00FFC0] text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.3)]' 
                                                                : 'bg-[#14131c] hover:bg-[#00FFC0]/10 hover:text-white text-[#8d8c9e]'
                                                            }`}
                                                    >
                                                        {/* Tactical ID Format [ID] TITLE */}
                                                        <div className="px-4 py-3 w-full truncate flex items-center">
                                                            <span className={`font-mono mr-3 transition-colors text-xs ${isActive ? 'text-black' : 'text-[#00FFC0] group-hover:text-[#00FFC0]'}`}>
                                                                [{brief.id}]
                                                            </span>
                                                            <span className="font-heading uppercase tracking-wider text-sm truncate">
                                                                {brief.title}
                                                            </span>
                                                        </div>
                                                    </button>
                                                </Tooltip>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )})}
                    </div>

                    {/* RIGHT PANE: INTEL VIEWER (Detail) */}
                    <div className={`flex-1 bg-[#14131c] rounded-xl overflow-hidden flex flex-col shadow-2xl border border-[#333333]
                        ${mobileView === 'list' ? 'hidden lg:flex' : 'flex fixed inset-0 z-[60] lg:relative lg:inset-auto lg:z-auto m-0 rounded-none lg:rounded-xl animate-slideInRight lg:animate-none'}`}
                        role="main" aria-label="Intel Brief Viewer"
                    >
                        
                        {activeBrief ? (
                            <>
                                {/* Viewer Header */}
                                <div className="bg-[#0c0c0e] p-4 lg:p-6 border-b border-[#333333] flex items-center gap-4 sticky top-0 z-10 safe-top">
                                    {/* Mobile Back Button */}
                                    <Button variant="secondary" size="icon" onClick={backToList} className="lg:hidden shrink-0 border-[#333] bg-[#14131c] text-[#00FFC0]" aria-label="Back to Circuit List">
                                        <Icons.ChevronLeft className="h-6 w-6" />
                                    </Button>
                                    
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-black bg-[#00FFC0] px-2 py-0.5 rounded-sm text-xs md:text-sm font-bold whitespace-nowrap shadow-[0_0_10px_rgba(0,255,192,0.3)]">
                                                INTEL BRIEF [{activeBrief.id}]
                                            </span>
                                            <span className="text-xs text-[#8d8c9e] font-mono uppercase tracking-widest hidden sm:inline-block truncate">
                                                // CLASSIFIED: OPEN
                                            </span>
                                        </div>
                                        <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2 uppercase">
                                            {activeBrief.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* Viewer Content - Scrollable */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-8 bg-[#121212]">
                                    <div className="prose max-w-none text-sm md:text-base text-[#8d8c9e]">
                                        {activeBrief.content}
                                    </div>

                                    {/* Footer of Brief */}
                                    <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-[#333] flex flex-col sm:flex-row justify-between items-center text-xs text-[#565564] font-mono uppercase gap-2">
                                        <span>END OF BRIEF [{activeBrief.id}]</span>
                                        <span>ZAP // OPERATIONAL MANUAL V2.0</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-[#8d8c9e] flex-col gap-6 p-8 text-center bg-[#121212]">
                                <Icons.Database className="h-24 w-24 opacity-10 text-[#00FFC0] animate-pulse-slow" />
                                <div>
                                    <p className="font-heading text-2xl uppercase tracking-widest text-white mb-2">AWAITING INPUT</p>
                                    <p className="text-[#8d8c9e] font-mono text-sm">// SELECT INTEL BRIEF TO DECRYPT</p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};
