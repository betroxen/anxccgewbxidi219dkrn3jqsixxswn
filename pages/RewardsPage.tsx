
import React, { useContext, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { ProgressBar } from '../components/ProgressBar';
import { AppContext } from '../context/AppContext';
import { ToastContext } from '../context/ToastContext';

export const RewardsPage = () => {
    const appContext = useContext(AppContext);
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };
    const [referralCopied, setReferralCopied] = useState(false);

    const handleCopyReferral = () => {
        navigator.clipboard.writeText("ZAP-DG42-INTEL");
        setReferralCopied(true);
        showToast("REFERRAL HANDLE COPIED TO CLIPBOARD.", "success");
        setTimeout(() => setReferralCopied(false), 3000);
    };

    const REDEMPTION_ITEMS = [
        { id: 'crypto', title: "CRYPTO CONVERSION", icon: Icons.Wallet, cost: "10,000", desc: "Direct payout index (BTC, ETH, USDC).", action: "INITIATE CONVERSION" },
        { id: 'voucher', title: "BONUS VOUCHERS", icon: Icons.Zap, cost: "500", desc: "High-value, low-wager operator bonuses.", action: "SELECT & CLAIM" },
        { id: 'gear', title: "ZAP INTEL GEAR", icon: Icons.Gift, cost: "1,500", desc: "Limited edition tactical merchandise.", action: "BROWSE STORE" },
        { id: 'data', title: "DATA ACCESS PASS", icon: Icons.Database, cost: "200", desc: "24H access to beta tools and premium feeds.", action: "ACTIVATE PASS" },
    ];

    return (
        <div className="container mx-auto max-w-6xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <Icons.Gift className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                        SSP PAYOUT CENTER: <span className="text-[#00FFC0] text-glow">ASSET MANAGEMENT</span>
                    </h1>
                </div>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                    // STATUS: OPERATIONAL. EARN AND REDEEM LIKE A TRUE DEGEN.
                </p>
            </div>

            {/* 1. PAYOUT CIRCUIT STATUS (HUD) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30">
                    <div className="absolute top-0 right-0 p-2 opacity-10"><Icons.Zap className="w-16 h-16 text-[#00FFC0]"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-2">CURRENT ZAP POINTS (ZP)</p>
                    <p className="font-mono text-3xl text-[#00FFC0] font-bold tracking-tight">1,240 ZP</p>
                    <p className="text-xs text-[#8d8c9e] font-mono mt-2 flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                        [VIEW CONTRIBUTION LOG] <Icons.ChevronRight className="h-3 w-3" />
                    </p>
                </Card>
                <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30">
                    <div className="absolute top-0 right-0 p-2 opacity-10"><Icons.Activity className="w-16 h-16 text-blue-500"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-2">PENDING PAYOUT VALUE</p>
                    <p className="font-mono text-3xl text-white font-bold tracking-tight">~$45.00</p>
                    <p className="text-xs text-[#8d8c9e] font-mono mt-2">ESTIMATED ON CURRENT INDEX</p>
                </Card>
                <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30">
                    <div className="absolute top-0 right-0 p-2 opacity-10"><Icons.Clock className="w-16 h-16 text-purple-500"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-2">NEXT DISBURSEMENT</p>
                    <p className="font-mono text-3xl text-white font-bold tracking-tight">14D 06H 44M</p>
                    <button onClick={() => appContext?.setCurrentPage('Command Console')} className="text-xs text-[#00FFC0] font-mono mt-2 flex items-center gap-1 hover:underline">
                        [UPDATE WALLET ADDRESS]
                    </button>
                </Card>
            </div>

            {/* 2. REWARD TIER & XP PROGRESSION */}
            <Card className="p-6 md:p-8 mb-12 bg-[#14131c] border-[#333] relative overflow-hidden">
                {/* Background Grip Texture */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
                
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                        <div>
                            <h2 className="font-heading text-xl text-white uppercase flex items-center gap-2">
                                <Icons.Trophy className="h-5 w-5 text-[#00FFC0]" /> OPERATIONAL LEVEL 42
                            </h2>
                            <p className="text-[#8d8c9e] text-sm">Maximize XP to unlock higher reward multipliers.</p>
                        </div>
                        <div className="bg-[#00FFC0]/10 border border-[#00FFC0]/30 px-4 py-2 rounded-md text-xs font-mono text-[#00FFC0]">
                            NEXT TIER BONUS: <span className="text-white font-bold">+5% MULTIPLIER</span>
                        </div>
                    </div>
                    <div className="mb-2 flex justify-between text-xs font-mono text-[#8d8c9e] uppercase">
                        <span>Current XP: 4,250</span>
                        <span>Target: 5,000</span>
                    </div>
                    <ProgressBar progress={65} className="h-3" />
                </div>
            </Card>

            {/* 3. REDEMPTION TERMINAL */}
            <div className="mb-12">
                <h2 className="font-heading text-xl text-white mb-6 flex items-center gap-2 uppercase tracking-wider border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">03 //</span> REDEMPTION TERMINAL (ASSET EXCHANGE)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {REDEMPTION_ITEMS.map((item) => (
                        <Card key={item.id} className="flex flex-col p-0 overflow-hidden bg-[#0c0c0e] border-[#333] group hover:border-[#00FFC0]/50 transition-all duration-300">
                            <div className="p-5 flex-1">
                                <item.icon className="h-8 w-8 text-[#00FFC0] mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-heading text-white text-lg uppercase mb-1">{item.title}</h3>
                                <p className="text-sm text-[#8d8c9e] mb-4 h-10">{item.desc}</p>
                                <div className="bg-[#14131c] p-2 rounded border border-[#333] text-center mb-4">
                                    <span className="text-xs text-[#8d8c9e] font-mono uppercase block">ZP COST</span>
                                    <span className="font-mono text-lg text-white font-bold">{item.cost}</span>
                                </div>
                            </div>
                            <Button className="rounded-t-none w-full font-heading uppercase text-xs py-4 tracking-wider">
                                {item.action}
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>

            {/* 4. REFERRAL PROTOCOL */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                     <Card className="p-6 md:p-8 bg-[#14131c] border-[#00FFC0]/20 h-full">
                        <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                            <Icons.Users className="h-5 w-5 text-[#00FFC0]" /> 4. REFERRAL PROTOCOL: EXPAND THE GRID
                        </h2>
                        <p className="text-[#8d8c9e] mb-6 text-lg">
                            Earn <strong className="text-white">10%</strong> of all ZP earned by verified contributors you bring into the ecosystem, forever. This is true passive asset acquisition.
                        </p>
                        
                        <div className="bg-[#0A0A0A] p-4 rounded-lg border border-[#333]">
                            <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-2">Your Referral Handle</label>
                            <div className="flex gap-4">
                                <div className="flex-1 bg-[#14131c] border border-[#333] rounded px-4 py-3 font-mono text-white tracking-wider flex items-center justify-between">
                                    <span>ZAP-DG42-INTEL</span>
                                    <Icons.Link className="h-4 w-4 text-[#8d8c9e]" />
                                </div>
                                <Button onClick={handleCopyReferral} className={`shrink-0 min-w-[100px] font-heading uppercase ${referralCopied ? 'bg-[#14131c] border-[#00FFC0] text-[#00FFC0]' : ''}`}>
                                    {referralCopied ? 'COPIED' : 'COPY LINK'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <Card className="p-6 bg-[#0c0c0e] border-[#333] flex flex-col justify-center items-center text-center">
                    <div className="p-4 bg-[#00FFC0]/10 rounded-full mb-4">
                        <Icons.Users className="h-10 w-10 text-[#00FFC0]" />
                    </div>
                    <h3 className="font-heading text-[#8d8c9e] uppercase text-sm mb-2">LIFETIME COMMISSIONS</h3>
                    <p className="font-mono text-4xl text-white font-bold tracking-tight mb-2">2,150 ZP</p>
                    <p className="text-xs font-mono text-[#00FFC0]">// 15 ACTIVE REFERRALS</p>
                </Card>
            </div>

            {/* 5. FOOTER LINKS */}
            <div className="border-t border-[#333] pt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <Button variant="ghost" className="text-[#8d8c9e] hover:text-white font-heading uppercase text-xs border border-[#333] bg-[#0c0c0e]">
                    VIEW FULL SSP PAYOUT HISTORY LOG <Icons.ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="ghost" className="text-[#8d8c9e] hover:text-white font-heading uppercase text-xs border border-[#333] bg-[#0c0c0e]" onClick={() => appContext?.setCurrentPage('Command Console')}>
                    ACCESS SECURITY CIRCUIT <Icons.ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
            <p className="text-center md:text-left text-[10px] text-[#666] font-mono mt-4 uppercase">
                All reward transactions are subject to AML/KYC screening under the Partner Vetting Policy.
            </p>

        </div>
    );
};
