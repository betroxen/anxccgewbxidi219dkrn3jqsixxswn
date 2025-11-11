
import React, { useState, useContext } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Icons } from '../components/icons';
import { ToastContext } from '../context/ToastContext';

export const AffiliatePage = () => {
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };
    const [partnerType, setPartnerType] = useState<'operator' | 'creator'>('operator');
    const [philosophy, setPhilosophy] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            showToast("APPLICATION TRANSMITTED. Entered Vetting Queue.", "success");
            setPhilosophy('');
            (e.target as HTMLFormElement).reset();
        }, 2000);
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.Zap className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-white uppercase tracking-wider leading-none">
                        ZAP ACCESS PROTOCOL: <span className="text-[#00FFC0] text-glow block md:inline mt-2 md:mt-0">PLUG INTO THE CIRCUIT</span>
                    </h1>
                </div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00FFC0]/10 border border-[#00FFC0]/30 rounded-md">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#00FFC0] animate-pulse"></div>
                    <span className="text-xs font-mono text-[#00FFC0] uppercase tracking-widest">
                        STATUS: VETTING ACTIVE // SEEKING ALLIES
                    </span>
                </div>
                <p className="text-xl text-[#8d8c9e] max-w-3xl mt-8 leading-relaxed">
                    ZAP is not an affiliate hustle—we are the new signal. We trade in data, trust, and quality, connecting our hyper-engaged community only with the industry's vetted elite.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                
                {/* LEFT COLUMN: THE PITCH (7/12) */}
                <div className="xl:col-span-7 space-y-10">
                    
                    {/* OPERATOR PROTOCOL */}
                    <Card className="p-8 bg-[#0c0c0e] border-[#00FFC0]/20 hover:border-[#00FFC0]/50 group transition-all">
                        <div className="flex items-center gap-4 mb-6 border-b border-[#333] pb-6">
                            <div className="bg-[#00FFC0]/10 p-4 rounded-xl border border-[#00FFC0]/20 group-hover:scale-110 transition-transform">
                                <Icons.Shield className="h-8 w-8 text-[#00FFC0]" />
                            </div>
                            <div>
                                <h2 className="font-heading text-2xl text-white uppercase tracking-wider">
                                    1. FOR OPERATORS
                                </h2>
                                <p className="text-[#00FFC0] font-mono text-sm uppercase">DEMAND HIGH-SIGNAL QUALITY</p>
                            </div>
                        </div>
                        <p className="text-[#8d8c9e] mb-6 text-lg">
                            Stop paying for tire-kickers. Listing on the ZAP Grid is a premium certification, not a purchase order.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="bg-[#14131c] p-4 rounded-lg border border-[#333]">
                                <strong className="text-white block mb-1 font-heading uppercase text-sm">No Junk Traffic</strong>
                                <span className="text-xs text-[#8d8c9e]">We drive strategic, high-value players who engage based on data.</span>
                            </li>
                             <li className="bg-[#14131c] p-4 rounded-lg border border-[#333]">
                                <strong className="text-white block mb-1 font-heading uppercase text-sm">Vetting is Value</strong>
                                <span className="text-xs text-[#8d8c9e]">A ZAP listing is a premium security stamp recognized by degens.</span>
                            </li>
                        </ul>
                    </Card>

                    {/* CREATOR PROTOCOL */}
                    <Card className="p-8 bg-[#0c0c0e] border-purple-500/20 hover:border-purple-500/50 group transition-all">
                         <div className="flex items-center gap-4 mb-6 border-b border-[#333] pb-6">
                            <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 group-hover:scale-110 transition-transform">
                                <Icons.Zap className="h-8 w-8 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="font-heading text-2xl text-white uppercase tracking-wider">
                                    2. FOR CREATORS
                                </h2>
                                <p className="text-purple-400 font-mono text-sm uppercase">AMPLIFY THE VERIFIED TRUTH</p>
                            </div>
                        </div>
                        <p className="text-[#8d8c9e] mb-6 text-lg">
                            Tired of pushing generic codes for platforms you can't truly vouch for? Align your signal with raw data.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="bg-[#14131c] p-4 rounded-lg border border-[#333]">
                                <strong className="text-white block mb-1 font-heading uppercase text-sm">Integrity Pipeline</strong>
                                <span className="text-xs text-[#8d8c9e]">Advocate for authentic gaming and connect your stream to our data engine.</span>
                            </li>
                             <li className="bg-[#14131c] p-4 rounded-lg border border-[#333]">
                                <strong className="text-white block mb-1 font-heading uppercase text-sm">Exclusive Rewards</strong>
                                <span className="text-xs text-[#8d8c9e]">Unique collaboration models that reinforce your reputation as an honest source.</span>
                            </li>
                        </ul>
                    </Card>

                </div>

                {/* RIGHT COLUMN: INTAKE TERMINAL (5/12) */}
                <div className="xl:col-span-5">
                    <div className="sticky top-24">
                        <div className="bg-[#1A1A1A] border border-[#333] border-b-0 rounded-t-xl p-4 flex items-center justify-between">
                            <span className="font-mono text-xs text-[#00FFC0] uppercase animate-pulse">
                                // SECURE CONNECTION ESTABLISHED
                            </span>
                            <Icons.Lock className="h-4 w-4 text-[#8d8c9e]" />
                        </div>
                        
                        <Card className="p-6 md:p-8 bg-[#0A0A0A] border-[#00FFC0]/30 rounded-t-none shadow-2xl">
                            <div className="mb-8">
                                <h3 className="font-heading text-2xl font-bold text-white mb-2 uppercase">
                                    CIRCUIT ACCESS
                                </h3>
                                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest mb-4">
                                    VALIDATE YOUR SPOT
                                </p>
                                <p className="text-xs text-[#8d8c9e] leading-relaxed border-l-2 border-[#333] pl-3">
                                    This is the intake terminal. We only onboard partners serious about transparency. Show us your verifiable edge.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                
                                {/* STEP 1 */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-[#333] text-xs font-mono text-white px-2 py-0.5 rounded">01</span>
                                        <h4 className="text-xs font-heading uppercase text-[#8d8c9e] tracking-widest">IDENTITY & SOURCE</h4>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <Input type="text" required placeholder="FULL NAME (THE SOURCE)..." className="font-mono text-sm bg-[#14131c] border-[#333]" />
                                        <Input type="email" required placeholder="DIRECT COMMS EMAIL..." className="font-mono text-sm bg-[#14131c] border-[#333]" />
                                    </div>
                                </div>

                                {/* STEP 2 */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-[#333] text-xs font-mono text-white px-2 py-0.5 rounded">02</span>
                                        <h4 className="text-xs font-heading uppercase text-[#8d8c9e] tracking-widest">MISSION ALIGNMENT</h4>
                                    </div>
                                    <div className="bg-[#14131c] p-1.5 rounded-md border border-[#333] flex">
                                        <button
                                            type="button"
                                            onClick={() => setPartnerType('operator')}
                                            className={`flex-1 py-2 text-xs font-heading uppercase transition-all rounded-sm ${partnerType === 'operator' ? 'bg-[#00FFC0] text-black font-bold shadow-[0_0_10px_rgba(0,255,192,0.3)]' : 'text-[#8d8c9e] hover:text-white'}`}
                                        >
                                            Operator
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPartnerType('creator')}
                                            className={`flex-1 py-2 text-xs font-heading uppercase transition-all rounded-sm ${partnerType === 'creator' ? 'bg-purple-500 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'text-[#8d8c9e] hover:text-white'}`}
                                        >
                                            Creator
                                        </button>
                                    </div>
                                    <Input type="text" required placeholder="PLATFORM / CHANNEL NAME..." className="font-mono text-sm bg-[#14131c] border-[#333]" />
                                </div>

                                {/* STEP 3 */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-[#333] text-xs font-mono text-white px-2 py-0.5 rounded">03</span>
                                        <h4 className="text-xs font-heading uppercase text-[#8d8c9e] tracking-widest">THE VETTING CHECK</h4>
                                    </div>
                                    <textarea 
                                        required
                                        rows={4}
                                        className="w-full rounded-md border border-[#333] bg-[#14131c] p-3 text-sm text-white placeholder:text-[#666] focus:outline-none focus:border-[#00FFC0] resize-none font-mono"
                                        placeholder={partnerType === 'operator' 
                                            ? "> UPLOAD DATA: Licensing authority, RNG cert link, monthly volume..." 
                                            : "> UPLOAD DATA: Channel links, verifiable avg viewership metrics..."}
                                    ></textarea>
                                </div>

                                {/* STEP 4 */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-[#333] text-xs font-mono text-white px-2 py-0.5 rounded">04</span>
                                        <h4 className="text-xs font-heading uppercase text-[#8d8c9e] tracking-widest">THE PHILOSOPHY TEST</h4>
                                    </div>
                                    <Input 
                                        type="text" 
                                        required 
                                        maxLength={200}
                                        placeholder="STATE CORE PROBLEM YOU ARE FIXING..."
                                        value={philosophy}
                                        onChange={(e) => setPhilosophy(e.target.value)}
                                        className="font-mono text-sm bg-[#14131c] border-[#333]"
                                    />
                                    <div className={`text-xs text-right font-mono ${philosophy.length > 180 ? 'text-[#00FFC0] animate-pulse' : 'text-[#666]'}`}>
                                        {philosophy.length} / 200 CHARS
                                    </div>
                                </div>

                                <Button type="submit" size="lg" className="w-full font-heading uppercase tracking-[0.15em] py-6 shadow-[0_0_30px_rgba(0,255,192,0.2)]" loading={isSubmitting}>
                                    {isSubmitting ? 'TRANSMITTING...' : 'APPLY FOR VALIDATION'}
                                </Button>

                            </form>
                        </Card>

                         <div className="mt-4 p-4 bg-red-950/20 border-l-2 border-red-900/50 rounded text-[10px] text-red-400/80 font-mono uppercase leading-relaxed">
                            <strong>ZAP VETTING PROTOCOL:</strong> We review every application rigorously. If you meet our strict standards for fairness and transparency, we’ll activate your line. If not, the application is discarded.
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};
