import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { ProgressBar } from '../components/ProgressBar';
import { Input } from '../components/Input';
import { useToast } from '../context/ToastContext';
import { mockCasinosData } from '../constants/casinos';

interface LinkedAccount {
    id: string;
    casinoId: string;
    casinoName: string;
    username: string;
    email: string;
    verified: boolean;
    public: boolean;
}

export const ProfilePage = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();

    // Editable Profile State
    const [bannerGradient, setBannerGradient] = useState<'green' | 'purple'>('green');
    const [profileImage, setProfileImage] = useState('https://placehold.co/150x150/00FFC0/000000?text=DG');
    
    // Operator Linkage State
    const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([
         { id: '1', casinoId: 'stake', casinoName: 'Stake', username: 'DegenG_Official', email: '***@zap.gg', verified: true, public: true }
    ]);
    const [linkForm, setLinkForm] = useState({
        targetCasino: '',
        username: '',
        email: '',
        attestation: false
    });

    // Verification Matrix State (Mocked)
    const mfaStatus = true;
    const walletStatus = true;
    const discordHandle = "@DegenGambler";

    const toggleBanner = () => {
        setBannerGradient(prev => prev === 'green' ? 'purple' : 'green');
        showToast("Profile theme updated.", "success");
    };

    const cycleProfileImage = () => {
        // Mock functionality to cycle through a few placeholder images
        const images = [
            'https://placehold.co/150x150/00FFC0/000000?text=DG',
            'https://placehold.co/150x150/8b5cf6/000000?text=DG',
            'https://placehold.co/150x150/3b82f6/000000?text=DG'
        ];
        const currentIndex = images.indexOf(profileImage);
        const nextIndex = (currentIndex + 1) % images.length;
        setProfileImage(images[nextIndex]);
        showToast("Profile picture updated.", "success");
    };

    const handleLinkAccount = (e: React.FormEvent) => {
        e.preventDefault();
        if (linkedAccounts.length >= 50) {
            showToast("LINKAGE ERROR: Maximum of 50 accounts reached.", "error");
            return;
        }
        if (!linkForm.targetCasino || !linkForm.username || !linkForm.email || !linkForm.attestation) {
             showToast("LINKAGE FAILED: All fields and attestation are mandatory.", "error");
             return;
        }

        const casino = mockCasinosData.find(c => c.id === linkForm.targetCasino);
        if (!casino) return;

        const newAccount: LinkedAccount = {
            id: Math.random().toString(36).substr(2, 9),
            casinoId: casino.id,
            casinoName: casino.name,
            username: linkForm.username,
            email: linkForm.email,
            verified: false, // Pending verification in real app
            public: false // Default to private
        };

        setLinkedAccounts([...linkedAccounts, newAccount]);
        setLinkForm({ targetCasino: '', username: '', email: '', attestation: false });
        showToast(`LINK INITIATED: Verifying ${casino.name} account...`, "info");
        
        // Simulate verification success after 2s
        setTimeout(() => {
             setLinkedAccounts(prev => prev.map(acc => acc.id === newAccount.id ? { ...acc, verified: true } : acc));
             showToast(`LINK ESTABLISHED: ${casino.name} account verified.`, "success");
        }, 2000);
    };

    const removeLinkedAccount = (id: string) => {
        if (window.confirm("WARNING: Disconnecting this account will remove its verified history from your ZAP Score. Continue?")) {
            setLinkedAccounts(prev => prev.filter(acc => acc.id !== id));
            showToast("LINK TERMINATED. Account disconnected.", "info");
        }
    };

    const togglePublicStatus = (id: string) => {
        setLinkedAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, public: !acc.public } : acc));
    };

    const bannerClasses = bannerGradient === 'green' 
        ? 'bg-gradient-to-r from-[#121212] via-[#0A2A20] to-[#121212]' 
        : 'bg-gradient-to-r from-[#121212] via-purple-900/40 to-blue-900/20';

    return (
        <div className="container mx-auto max-w-7xl p-4 py-6 md:p-12 page-fade-in">
            
            {/* 1. HERO SECTION (Banner & Bio) */}
            <Card className="relative overflow-hidden p-0 mb-8 group/banner border-[#333333]">
                <div className={`h-48 ${bannerClasses} transition-all duration-500`}>
                     <button 
                        onClick={toggleBanner} 
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 opacity-0 group-hover/banner:opacity-100 transition-opacity border border-white/10 font-heading uppercase"
                    >
                        <Icons.Edit className="h-3 w-3" /> Edit Theme
                    </button>
                </div>
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-end -mt-24 relative z-10">
                    <div className="relative group/pfp cursor-pointer" onClick={cycleProfileImage}>
                        <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-32 h-32 md:w-44 md:h-44 rounded-2xl border-4 border-[#1A1A1A] shadow-2xl bg-[#1A1A1A]"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/pfp:opacity-100 transition-opacity rounded-2xl flex items-center justify-center border-4 border-transparent">
                            <Icons.Camera className="h-8 w-8 text-white/80" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-[#1A1A1A] p-1.5 rounded-full">
                             <div className="bg-[#00FFC0] p-1.5 rounded-full shadow-[0_0_15px_rgba(0,255,192,0.5)]" title="Circuit Status: Online">
                                <Icons.Zap className="w-5 h-5 text-black fill-black" />
                             </div>
                        </div>
                    </div>
                    <div className="flex-1 mt-2 md:mt-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase">DegenGambler</h1>
                            <span className="px-3 py-1 rounded-full bg-[#00FFC0]/10 text-[#00FFC0] text-sm font-bold border border-[#00FFC0]/20 font-mono">
                                LEVEL 42
                            </span>
                        </div>
                        <p className="text-[#8d8c9e] text-lg max-w-2xl mb-4">Crypto native since 2017. Hunting for max RTP and fair play. Alpha seeker.</p>
                        <div className="flex flex-wrap gap-3">
                             <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(window.location.href).then(() => showToast("Profile link copied to clipboard.", "success"))}>
                                 <Icons.Share className="w-4 h-4 mr-2" /> SHARE PROFILE INTEL
                             </Button>
                             <Button variant="secondary" size="sm" onClick={() => navigate('/settings')}>
                                 <Icons.Settings className="w-4 w-4 mr-2" /> ACCESS COMMAND CONSOLE
                             </Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* LEFT COLUMN (Main Intel) */}
                <div className="xl:col-span-2 space-y-8">
                    
                    {/* STATS GRID */}
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <Card className="p-5 text-center border-[#00FFC0]/20 bg-[#00FFC0]/5">
                            <Icons.Zap className="w-6 h-6 text-[#00FFC0] mx-auto mb-2" />
                            <p className="text-xl font-mono text-white font-bold">1,240</p>
                            <p className="text-xs text-[#8d8c9e] uppercase font-heading">Zap Points</p>
                        </Card>
                         <Card className="p-5 text-center">
                            <Icons.Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                            <p className="text-xl font-mono text-white font-bold">#1,337</p>
                            <p className="text-xs text-[#8d8c9e] uppercase font-heading">Global Rank</p>
                        </Card>
                         <Card className="p-5 text-center">
                            <Icons.Star className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                            <p className="text-xl font-mono text-white font-bold">12</p>
                            <p className="text-xs text-[#8d8c9e] uppercase font-heading">Reviews</p>
                        </Card>
                        <Card className="p-5 text-center">
                            <Icons.Shield className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                            <p className="text-xl font-mono text-white font-bold">98%</p>
                            <p className="text-xs text-[#8d8c9e] uppercase font-heading">Trust Score</p>
                        </Card>
                    </div>

                    {/* 5. OPERATOR LINKAGE CIRCUIT */}
                    <Card className="p-6 md:p-8 border-[#00FFC0]/20">
                        <h2 className="font-heading text-xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#333333] pb-3">
                            <Icons.Link className="h-5 w-5 text-[#00FFC0]" /> 5. OPERATOR LINKAGE CIRCUIT (VPR Verification)
                        </h2>
                        <p className="text-[#8d8c9e] mb-6 text-sm">
                            Link your external operator accounts to simplify VPR submissions and verify your play history for ZP missions.
                        </p>

                        {/* ACTIVE CONNECTIONS LIST */}
                        {linkedAccounts.length > 0 && (
                            <div className="mb-8 space-y-3">
                                <h3 className="text-xs font-mono text-[#00FFC0] uppercase mb-2">// ACTIVE LINKS ({linkedAccounts.length}/50)</h3>
                                {linkedAccounts.map(account => (
                                    <div key={account.id} className="flex items-center justify-between p-3 bg-[#121212] rounded-lg border border-[#333333]">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-md ${account.verified ? 'bg-[#00FFC0]/10 text-[#00FFC0]' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                                {account.verified ? <Icons.CheckCircle className="h-4 w-4" /> : <Icons.Loader className="h-4 w-4" />}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm font-heading uppercase">{account.casinoName}</p>
                                                <p className="text-xs text-[#8d8c9e] font-mono">{account.username}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <button 
                                                onClick={() => togglePublicStatus(account.id)}
                                                className="p-2 text-[#8d8c9e] hover:text-white transition-colors"
                                                title={account.public ? "Publicly Visible" : "Private"}
                                            >
                                                {account.public ? <Icons.Eye className="h-4 w-4" /> : <Icons.EyeOff className="h-4 w-4" />}
                                            </button>
                                            <button 
                                                onClick={() => removeLinkedAccount(account.id)}
                                                className="p-2 text-red-900 hover:text-red-500 transition-colors"
                                                title="Disconnect Account"
                                            >
                                                <Icons.Trash className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* LINKAGE FORM */}
                        <form onSubmit={handleLinkAccount} className="bg-[#0c0c0e] p-4 md:p-6 rounded-xl border border-[#333333]">
                            <h3 className="text-sm font-heading text-white uppercase mb-4">Initiate New Link</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Target Casino</label>
                                    <select 
                                        className="w-full h-10 rounded-md border border-[#333333] bg-[#1A1A1A] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00FFC0] focus:border-transparent font-mono"
                                        value={linkForm.targetCasino}
                                        onChange={(e) => setLinkForm({...linkForm, targetCasino: e.target.value})}
                                        required
                                    >
                                        <option value="">// SELECT OPERATOR</option>
                                        {mockCasinosData.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Casino Username</label>
                                    <Input 
                                        placeholder="EXACT HANDLE..." 
                                        value={linkForm.username}
                                        onChange={(e) => setLinkForm({...linkForm, username: e.target.value})}
                                        required
                                        className="font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Casino Email</label>
                                    <Input 
                                        type="email" 
                                        placeholder="REGISTERED EMAIL..." 
                                        value={linkForm.email}
                                        onChange={(e) => setLinkForm({...linkForm, email: e.target.value})}
                                        required
                                        className="font-mono"
                                    />
                                </div>
                            </div>

                            <label className="flex items-start gap-3 cursor-pointer group mb-6 bg-[#1A1A1A] p-3 rounded-lg border border-[#333333]">
                                <input 
                                    type="checkbox" 
                                    className="mt-1 accent-[#00FFC0]"
                                    checked={linkForm.attestation}
                                    onChange={(e) => setLinkForm({...linkForm, attestation: e.target.checked})}
                                />
                                <div className="text-xs text-[#8d8c9e] leading-relaxed">
                                    <strong className="text-white block mb-1 font-heading uppercase">DATA INTEGRITY ATTESTATION (MANDATORY)</strong>
                                    OWNERSHIP PROTOCOL: I confirm that I am the sole, legitimate owner of the linked casino account and am willing to provide verifiable proof of ownership if requested by the ZAP compliance team.
                                </div>
                            </label>

                            <div className="bg-red-950/20 border border-red-900/30 p-3 rounded-lg flex items-start gap-3 mb-6">
                                <Icons.AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                                <p className="text-xs text-red-300 leading-relaxed">
                                    <strong className="text-red-500 font-heading uppercase">CRITICAL WARNING:</strong> Providing false account information or claiming ownership of an account you do not own is a severe breach of ZAP's integrity contract. This action will result in the immediate suspension of your ZAP Account and the permanent forfeiture of all accumulated ZP and pending SSP Rewards.
                                </p>
                            </div>

                            <Button type="submit" className="w-full font-heading uppercase tracking-wider" disabled={!linkForm.attestation}>
                                LINK ACCOUNT & INITIATE VERIFICATION
                            </Button>
                        </form>
                    </Card>

                     {/* Activity Feed */}
                     <Card className="p-6">
                        <h3 className="font-heading text-xl text-white mb-6 uppercase">Recent Activity</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 pb-6 border-b border-[#333333] last:border-0 last:pb-0">
                                    <div className="bg-[#222222] p-3 rounded-full h-fit shrink-0 border border-[#333333]">
                                        {i === 1 ? <Icons.Star className="w-4 h-4 text-[#00FFC0]" /> : 
                                         i === 2 ? <Icons.Target className="w-4 h-4 text-blue-400" /> : 
                                         <Icons.MessageSquare className="w-4 h-4 text-purple-400" />}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">
                                            {i === 1 ? 'Reviewed Stake Casino' : 
                                             i === 2 ? 'Completed "Daily Login" Mission' : 
                                             'Commented on "Hidden RTP" thread'}
                                        </p>
                                        <p className="text-xs text-[#8d8c9e] mt-1 font-mono">{i} day{i > 1 ? 's' : ''} ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* RIGHT COLUMN (Sidebar) */}
                <div className="space-y-8">
                    
                    {/* 4. VERIFICATION MATRIX */}
                    <Card className="p-6 border-[#00FFC0]/20 bg-[#0c0c0e]">
                         <h2 className="font-heading text-lg text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#333333] pb-3">
                            <Icons.Shield className="h-5 w-5 text-[#00FFC0]" /> 4. VERIFICATION MATRIX
                        </h2>
                        <div className="space-y-4">
                            {/* MFA Status */}
                            <div className="flex items-center justify-between p-3 bg-[#121212] rounded-lg border border-[#333333]">
                                <div>
                                    <p className="text-xs text-[#8d8c9e] font-mono uppercase mb-1">MFA Status</p>
                                    <p className={`text-sm font-bold font-heading ${mfaStatus ? 'text-[#00FFC0]' : 'text-red-500'}`}>
                                        {mfaStatus ? 'VERIFIED & ACTIVE' : 'INACTIVE // RISK'}
                                    </p>
                                </div>
                                <Button variant="secondary" size="sm" onClick={() => navigate('/settings')} className="font-heading uppercase text-xs">
                                    VIEW CIRCUIT
                                </Button>
                            </div>

                             {/* SSP Wallet */}
                             <div className="flex items-center justify-between p-3 bg-[#121212] rounded-lg border border-[#333333]">
                                <div>
                                    <p className="text-xs text-[#8d8c9e] font-mono uppercase mb-1">SSP Wallet</p>
                                    <p className={`text-sm font-bold font-heading ${walletStatus ? 'text-[#00FFC0]' : 'text-yellow-500'}`}>
                                        {walletStatus ? 'CONNECTED' : 'NOT CONNECTED'}
                                    </p>
                                </div>
                                <Button variant="secondary" size="sm" onClick={() => navigate('/settings')} className="font-heading uppercase text-xs">
                                    UPDATE
                                </Button>
                            </div>

                            {/* Discord Handle */}
                            <div className="flex items-center justify-between p-3 bg-[#121212] rounded-lg border border-[#333333]">
                                <div>
                                    <p className="text-xs text-[#8d8c9e] font-mono uppercase mb-1">Discord Handle</p>
                                    <p className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                                        <Icons.Globe className="w-3 h-3 text-[#7289da]" /> {discordHandle}
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/20 h-8 px-2 font-heading uppercase text-xs">
                                    DISCONNECT
                                </Button>
                            </div>
                        </div>
                    </Card>

                     {/* Level Progress */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-heading text-lg text-white uppercase">Circuit Status</h3>
                             <span className="text-[#00FFC0] font-bold font-mono">4,250 / 5,000 XP</span>
                        </div>
                        <ProgressBar progress={85} className="h-3 mb-4" />
                        <p className="text-sm text-[#8d8c9e] font-mono">// 750 XP UNTIL LEVEL 43 INITIALIZATION.</p>
                    </Card>

                    {/* Badges */}
                    <Card className="p-6">
                        <h3 className="font-heading text-lg text-white mb-4 uppercase">Earned Badges</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((badge) => (
                                <div key={badge} className={`aspect-square rounded-md flex items-center justify-center ${badge <= 5 ? 'bg-[#00FFC0]/10 text-[#00FFC0] border border-[#00FFC0]/30 shadow-[0_0_10px_rgba(0,255,192,0.15)]' : 'bg-[#222222] text-[#333333] border border-[#333333]'}`}>
                                    <Icons.Shield className="w-5 h-5" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};