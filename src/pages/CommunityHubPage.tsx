import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { useToast } from '../context/ToastContext';
import { Toggle } from '../components/Toggle';

// --- MOCK INTEL STREAM DATA ---
const INTEL_POSTS = [
    {
        id: 1,
        type: 'BIG WIN',
        handle: 'CryptoWhale99',
        level: 98,
        vprs: 45,
        time: '2h ago',
        content: "Just hit a 5000x on Wanted Dead or a Wild at Stake! Payout was 4 minutes, confirmed. The RTP seems hot right now. I uploaded a verified screenshot (TX ID 4R67E) to the Forum. 🚀",
        dataPoints: [
            { label: 'Operator', value: 'Stake' },
            { label: 'Payout Speed', value: '4 Mins (Confirmed)' },
            { label: 'Evidence', value: 'Verified (TX ID)' }
        ],
        verified: true,
        eng: { fires: 24, comments: 5 }
    },
    {
        id: 2,
        type: 'CRITICAL',
        handle: 'BonusHunter',
        level: 60,
        vprs: 22,
        time: '5h ago',
        content: "PSA: Roobet's new weekly bonus has a hidden 40x wager on free spins. That turns the whole thing into a high-risk liability. Read the T&Cs carefully before claiming. (ZAP Score Penalty Recommended)",
        dataPoints: [
             { label: 'Operator', value: 'Roobet' },
             { label: 'Target Metric', value: 'Wagering (40x)' },
             { label: 'Action', value: 'AVOID CLAIMING' }
        ],
        verified: true,
        eng: { fires: 45, comments: 12 }
    },
    {
        id: 3,
        type: 'INTEL',
        handle: 'DegenKing',
        level: 91,
        vprs: 38,
        time: '1d ago',
        content: "Anyone tried the new Duel originals? Plinko feels a bit tight compared to others. Volatility Index feels lower than advertised. Need more data points from the community.",
        dataPoints: [
             { label: 'Operator', value: 'Duel' },
             { label: 'Game Focus', value: 'Plinko (Originals)' },
             { label: 'Analysis', value: 'Volatility / RTP' }
        ],
        verified: false,
        eng: { fires: 8, comments: 15 }
    }
];

export const CommunityHubPage = () => {
    const { showToast } = useToast();
    const [filterPriority, setFilterPriority] = useState('ALL');
    const [filterVerified, setFilterVerified] = useState(false);
    const [intelMessage, setIntelMessage] = useState('');

    const handleTransmit = () => {
        if (intelMessage.length < 10) {
            showToast("TRANSMISSION FAILED: Intel too short.", "error");
            return;
        }
        showToast("SIGNAL TRANSMITTED to the Grid.", "success");
        setIntelMessage('');
    };

    const handleCopyReferral = () => {
        navigator.clipboard.writeText("ZAP-DG42-INTEL");
        showToast("REFERRAL HANDLE COPIED.", "success");
    };

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'BIG WIN': return 'text-[#00FFC0] border-[#00FFC0] bg-[#00FFC0]/10';
            case 'CRITICAL': return 'text-red-500 border-red-500 bg-red-950/30 animate-pulse';
            default: return 'text-blue-400 border-blue-400 bg-blue-950/30';
        }
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 py-6 md:p-10 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Icons.Activity className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                        ZAP INTEL STREAM: <span className="text-[#00FFC0] text-glow">REAL-TIME ALPHA</span>
                    </h1>
                </div>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                    // STATUS: LIVE SIGNAL. UNFILTERED INSIGHTS FROM THE FRONT LINE.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* LEFT COLUMN: FILTERS & TRANSMIT (1/4) */}
                <div className="space-y-6">
                    {/* 3. TRANSMIT SIGNAL */}
                    <Card className="p-5 bg-[#0c0c0e] border-[#00FFC0]/30">
                        <h2 className="font-heading text-white uppercase mb-4 flex items-center gap-2 text-sm">
                            <Icons.Zap className="h-4 w-4 text-[#00FFC0]" /> TRANSMIT SIGNAL
                        </h2>
                        <textarea 
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-sm text-white font-mono focus:outline-none focus:border-[#00FFC0] resize-none mb-4 placeholder:text-[#666]"
                            rows={4}
                            placeholder={"> ENTER INTEL MESSAGE... (Max 500 chars)"}
                            value={intelMessage}
                            onChange={(e) => setIntelMessage(e.target.value)}
                        />
                        <Button onClick={handleTransmit} className="w-full mb-3 font-heading uppercase text-xs tracking-wider shadow-[0_0_15px_rgba(0,255,192,0.2)]">
                            TRANSMIT TO CIRCUIT
                        </Button>
                        <Button variant="secondary" className="w-full font-heading uppercase text-xs border-[#333] hover:border-[#00FFC0]">
                            OPEN VPR TERMINAL
                        </Button>
                    </Card>

                    {/* 1. TACTICAL FILTERS */}
                     <Card className="p-5 bg-[#14131c] border-[#333]">
                        <h2 className="font-heading text-white uppercase mb-4 flex items-center gap-2 text-sm">
                            <Icons.Filter className="h-4 w-4 text-[#8d8c9e]" /> SIGNAL FILTERS
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Priority Level</label>
                                <select 
                                    className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#00FFC0]"
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value)}
                                >
                                    <option value="ALL">ALL SIGNALS</option>
                                    <option value="CRITICAL">CRITICAL WARNINGS</option>
                                    <option value="BIG WIN">BIG WIN SIGNALS</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Operator Grid</label>
                                <select className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#00FFC0]">
                                    <option value="ALL">ALL OPERATORS</option>
                                    <option value="STAKE">STAKE</option>
                                    <option value="DUEL">DUEL</option>
                                    <option value="ROOBET">ROOBET</option>
                                </select>
                            </div>
                            <Toggle 
                                checked={filterVerified} 
                                onChange={setFilterVerified} 
                                label={<span className="text-xs font-mono uppercase text-[#8d8c9e]">VERIFIED ANALYSTS ONLY</span>}
                            />
                        </div>
                    </Card>

                    {/* 4. REFERRAL PROTOCOL */}
                    <Card className="p-5 bg-[#14131c] border-[#333]">
                         <h2 className="font-heading text-white uppercase mb-4 flex items-center gap-2 text-sm">
                            <Icons.Users className="h-4 w-4 text-[#00FFC0]" /> EXPAND THE GRID
                        </h2>
                        <div className="bg-[#0A0A0A] p-3 rounded border border-[#333] mb-3">
                            <p className="text-xs font-mono text-[#8d8c9e] mb-1">YOUR HANDLE:</p>
                            <p className="text-white font-bold font-mono tracking-wider">ZAP-DG42-INTEL</p>
                        </div>
                        <Button variant="ghost" onClick={handleCopyReferral} className="w-full text-[#00FFC0] border border-[#00FFC0]/30 hover:bg-[#00FFC0]/10 font-heading uppercase text-xs">
                            COPY REFERRAL LINK
                        </Button>
                    </Card>
                </div>

                {/* RIGHT COLUMN: LIVE INTEL FEED (3/4) */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {/* PERSISTENT WARNING BANNER */}
                    <div className="bg-yellow-950/30 border-l-4 border-yellow-500 p-4 rounded-r-md flex items-start gap-3">
                        <Icons.AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-200 font-mono uppercase leading-relaxed">
                            <strong className="text-yellow-500">PERSISTENT WARNING:</strong> Always cross-reference bonus claims against the Bonus Protocol Analyzer before accepting terms. Operator T&Cs can change instantly.
                        </p>
                    </div>

                    {/* 2. LIVE SIGNAL TRANSMISSIONS */}
                    <div className="space-y-6">
                        {INTEL_POSTS.filter(post => filterPriority === 'ALL' || post.type === filterPriority).map(post => (
                            <Card key={post.id} className={`p-0 overflow-hidden bg-[#14131c] border-[#333] hover:border-[#00FFC0]/30 transition-all ${post.type === 'CRITICAL' ? 'shadow-[0_0_20px_rgba(239,68,68,0.15)]' : ''}`}>
                                
                                {/* Post Header */}
                                <div className="p-4 md:p-5 flex flex-wrap justify-between items-start gap-4 border-b border-[#333]/50">
                                    <div className="flex items-center gap-3">
                                        <img src={`https://placehold.co/40x40/24232d/ffffff?text=${post.handle.substring(0,1)}`} alt={post.handle} className="w-10 h-10 rounded-md border border-[#333]" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-heading text-white font-bold">{post.handle}</span>
                                                {post.verified && (
                                                    <span title="Verified Analyst">
                                                        <Icons.CheckCircle className="h-4 w-4 text-[#00FFC0]" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs font-mono text-[#8d8c9e] flex items-center gap-3 mt-0.5">
                                                <span>LVL {post.level}</span>
                                                <span className="text-[#333]">|</span>
                                                <span>{post.vprs} VPRs</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded border uppercase mb-1.5 ${getTypeStyles(post.type)}`}>
                                            {post.type} SIGNAL
                                        </span>
                                        <span className="text-xs text-[#666] font-mono">{post.time}</span>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div className="p-4 md:p-5">
                                    <p className="text-[#FAFBFF] text-base leading-relaxed mb-6">{post.content}</p>

                                    {/* Data Points Table */}
                                    <div className="bg-[#0A0A0A] rounded-lg border border-[#333] overflow-hidden mb-6">
                                        <table className="w-full text-sm">
                                            <tbody className="divide-y divide-[#333]">
                                                {post.dataPoints.map((dp, i) => (
                                                    <tr key={i} className="flex">
                                                        <td className="p-3 w-1/3 text-[#8d8c9e] font-mono uppercase text-xs bg-[#14131c] border-r border-[#333] flex items-center">{dp.label}</td>
                                                        <td className="p-3 w-2/3 text-white font-medium flex items-center">{dp.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Action & Eng Row */}
                                    <div className="flex flex-wrap justify-between items-center gap-4">
                                        <Button 
                                            variant={post.type === 'CRITICAL' ? 'secondary' : 'primary'}
                                            size="sm" 
                                            className={`font-heading uppercase text-xs tracking-wider ${post.type === 'CRITICAL' ? 'border-red-900/50 text-red-400 hover:bg-red-950/30' : ''}`}
                                        >
                                            {post.type === 'BIG WIN' ? 'VIEW EVIDENCE & VALIDATE' : 
                                             post.type === 'CRITICAL' ? 'FLAG AS FUD / INVESTIGATE' : 
                                             'CONTRIBUTE DATA / VPR'}
                                        </Button>
                                        <div className="flex items-center gap-4 text-sm text-[#8d8c9e] font-mono">
                                            <button className="flex items-center gap-1.5 hover:text-[#00FFC0] transition-colors">
                                                <Icons.Zap className="h-4 w-4" /> {post.eng.fires}
                                            </button>
                                            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                                                <Icons.MessageSquare className="h-4 w-4" /> {post.eng.comments}
                                            </button>
                                            <button className="hover:text-white transition-colors">
                                                <Icons.Share className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </Card>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
};