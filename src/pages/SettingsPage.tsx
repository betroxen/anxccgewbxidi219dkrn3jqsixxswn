
import React, { useState, useContext } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { Icons } from '../components/icons';
import { ToastContext, ToastContextType } from '../context/ToastContext';
import { useSound } from '../context/SoundContext';

export const SettingsPage = () => {
    const toastCtx = useContext(ToastContext) as ToastContextType | undefined;
    const showToast = toastCtx?.showToast ?? (() => {});
    const { isMuted, setMuted, playSound } = useSound();

    // 01. PROFILE BLUEPRINT
    const [handle, setHandle] = useState('ShadowEdge42');
    const [email, setEmail] = useState('edge@zap.gg');

    // 02. SECURITY CIRCUIT
    const [mfaActive, setMfaActive] = useState(true);
    const [highSecLogs, setHighSecLogs] = useState(true);
    const [geoMonitor, setGeoMonitor] = useState(true);
    const [autoTerminate, setAutoTerminate] = useState(true);
    const [hardLock, setHardLock] = useState(true);

    // 03. PRIVACY & DATA CONTROL
    const [anonymizedAnalytics, setAnonymizedAnalytics] = useState(true);
    const [affiliateTracking, setAffiliateTracking] = useState(false);
    const [contributionDisplay, setContributionDisplay] = useState(false);

    // 04. SSP PROTOCOL PAYOUTS
    const [walletAddress, setWalletAddress] = useState('0x742d35Cc6634C0532925a3b8D...');

    // 05. USER PREFERENCES
    const [aestheticMode, setAestheticMode] = useState<'dark' | 'light'>('dark');
    const [dataViewFormat, setDataViewFormat] = useState<'decimal' | 'percentage'>('percentage');
    const [language, setLanguage] = useState('en-US');

    // 06. INTEL COMM CHANNEL
    const [emailIntel, setEmailIntel] = useState(true);
    const [communitySignal, setCommunitySignal] = useState(true);
    const [marketingComm, setMarketingComm] = useState(false);

    const handleSaveProfile = () => {
        showToast("IDENTITY SYNCHRONIZED: Profile updated on the Grid.", "success");
    };

    const handleUpdateWallet = () => {
        showToast("SSP PROTOCOL UPDATED: New payout address confirmed.", "success");
    };

    const handleDeleteAccount = () => {
        playSound('error', 0.5);
        if (window.confirm("WARNING: PERMANENT UNPLUG.\n\nIrreversible action. ZP forfeited. Handle erased. Confirm self-destruct sequence?")) {
             showToast("SELF-DESTRUCT SEQUENCE INITIATED. Goodbye, Operator.", "error");
        } else {
             playSound('ui_close', 0.3);
        }
    };
    
    // Handler for toggles that also plays a sound
    const createToggleHandler = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        return (checked: boolean) => {
            setter(checked);
        };
    };
    
    const handleAudioToggle = (checked: boolean) => {
        setMuted(!checked);
        if (checked) {
            setTimeout(() => playSound('success', 0.3), 50);
        }
    };


    const SectionHeader = ({ title, icon: Icon }: { title: string, icon: React.FC<any> }) => (
        <h2 className="font-heading text-xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#3a3846] pb-3">
            <Icon className="h-5 w-5 text-[#00FFC0]" /> {title}
        </h2>
    );

    const ProTip = ({ children }: { children?: React.ReactNode }) => (
        <div className="mt-4 p-3 bg-[#00FFC0]/5 border-l-2 border-[#00FFC0] text-xs text-[#8d8c9e] font-mono leading-relaxed">
            <strong className="text-[#00FFC0] uppercase">PRO TIP:</strong> {children}
        </div>
    );

    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            <div className="mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Icons.Settings className="h-10 w-10 text-[#00FFC0] animate-spin-slow" />
                            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                                COMMAND CONSOLE
                            </h1>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                            <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                                // CONFIGURATION V2.0 // STATUS: OPERATIONAL
                            </p>
                            <span className="hidden md:block text-[#333]">|</span>
                            <p className="text-[#8d8c9e] font-mono text-xs uppercase">
                                EFFECTIVE DATE: NOVEMBER 09, 2025
                            </p>
                        </div>
                    </div>
                    <div className="bg-[#00FFC0]/10 border border-[#00FFC0]/30 px-4 py-2 rounded-md flex items-center gap-3">
                         <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FFC0]"></span>
                        </div>
                         <span className="text-xs font-bold text-[#00FFC0] uppercase tracking-wider font-mono">SECURE CONNECTION ACTIVE</span>
                    </div>
                </div>

                <Card className="p-6 bg-[#0c0c0e] border-[#00FFC0]/20 mb-12">
                    <h3 className="font-heading text-white uppercase mb-2 text-sm flex items-center gap-2">
                        <Icons.Zap className="h-4 w-4 text-[#00FFC0]" /> DEPLOYMENT DIRECTIVE: CALIBRATE YOUR COMMAND
                    </h3>
                    <p className="text-sm text-[#8d8c9e] leading-relaxed max-w-4xl">
                        Operators, this is your neural core. From identity fortification to reward vaults, every toggle shapes your edge. Defaults prioritize security and signal purity; deviations demand MFA confirmation. Sync changes orbit instantly. No bloat, no blind spots: Probe, adjust, dominate.
                    </p>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-12">

                {/* 01 // PROFILE BLUEPRINT */}
                <section id="profile">
                    <SectionHeader title="01 // PROFILE BLUEPRINT: IDENTITY & ACCESS" icon={Icons.Users} />
                    <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                        <p className="text-sm text-[#8d8c9e] mb-6">Forge your operative signature here. Edits trigger full re-verification to purge drift.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-2">Your Handle (Alias)</label>
                                <div className="flex gap-3">
                                    <Input value={handle} onChange={(e) => setHandle(e.target.value)} className="font-mono bg-[#14131c] border-[#3a3846] text-white font-bold" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-2">Verified Email</label>
                                <div className="flex gap-3">
                                    <Input type="email" value={email} readOnly className="font-mono bg-[#14131c] border-[#3a3846] text-[#8d8c9e]" />
                                    <Button variant="secondary" size="sm" className="shrink-0 font-mono uppercase text-xs border-[#333] hover:border-[#00FFC0]" onClick={() => showToast('Email update requires support ticket.', 'info')}>Update Email</Button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-[#3a3846]/50 flex flex-col md:flex-row justify-between items-center gap-4">
                            <ProTip>Anchor your profile quarterly—stale intel invites exploits.</ProTip>
                            <Button onClick={handleSaveProfile} className="w-full md:w-auto font-heading uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,192,0.2)]">
                                SYNCHRONIZE CHANGES
                            </Button>
                        </div>
                    </Card>
                </section>

                {/* 02 // SECURITY CIRCUIT */}
                <section id="security">
                    <SectionHeader title="02 // SECURITY CIRCUIT: PROTECTION VAULT" icon={Icons.Shield} />
                    <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#333]">
                            <div>
                                <p className="text-white font-heading uppercase text-sm mb-1">Password Schema</p>
                                <p className="text-xs font-mono text-[#8d8c9e]">LAST UPDATE: 42 DAYS AGO <span className="text-[#333]">|</span> STATUS: <span className="text-[#00FFC0]">PROTECTED</span></p>
                            </div>
                            <Button variant="secondary" size="sm" className="font-mono uppercase text-xs border-[#333]" onClick={() => showToast("Password change modal not implemented.", "info")}>CHANGE PASSWORD</Button>
                        </div>

                        <div className="space-y-2 divide-y divide-[#333]/50">
                            <Toggle 
                                checked={mfaActive} onChange={createToggleHandler(setMfaActive)} 
                                label={<span className="font-heading uppercase text-sm flex items-center gap-2">MFA Management {mfaActive && <span className="text-[#00FFC0] text-[10px] border border-[#00FFC0] px-1 rounded">// ACTIVE</span>}</span>}
                                description="Mandatory for withdrawals and high-risk executions. Non-waivable for SSP."
                            />
                             <Toggle 
                                checked={highSecLogs} onChange={createToggleHandler(setHighSecLogs)} 
                                label={<span className="font-heading uppercase text-sm">Enable High-Security Access Logs</span>}
                                description="Continuous capture of IP metadata and session vectors for breach hunting."
                            />
                             <Toggle 
                                checked={geoMonitor} onChange={createToggleHandler(setGeoMonitor)} 
                                label={<span className="font-heading uppercase text-sm">Jurisdiction Compliance Monitoring (KB 302)</span>}
                                description="Auto-restrict access on geo-fence violations via IP triangulation."
                            />
                             <Toggle 
                                checked={autoTerminate} onChange={createToggleHandler(setAutoTerminate)} 
                                label={<span className="font-heading uppercase text-sm">Auto-Terminate Inactive Sessions</span>}
                                description="Enforce logout after 15 minutes of dormancy to seal dormant ports."
                            />
                             <Toggle 
                                checked={hardLock} onChange={createToggleHandler(setHardLock)} 
                                label={<span className="font-heading uppercase text-sm">Hard Lock Handle Identity</span>}
                                description="Demand passkey re-auth for any Handle or email tweaks."
                            />
                        </div>

                        <div className="mt-8 pt-6 border-t border-[#333] flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex-1 w-full">
                                <strong className="text-white font-heading uppercase text-xs block mb-3">AUDIT VECTOR (ACTIVE SESSIONS)</strong>
                                <div className="bg-[#14131c] p-3 rounded border border-[#333] font-mono text-xs flex justify-between items-center">
                                    <div>
                                        <span className="text-[#00FFC0] mr-4">● 1 ACTIVE</span>
                                        <span className="text-white mr-4">IP: 192.168.1.X</span>
                                        <span className="text-[#8d8c9e]">CHROME 120 (THIS DEVICE)</span>
                                    </div>
                                    <button onClick={() => showToast("All other sessions terminated.", "success")} className="text-red-500 hover:text-white hover:underline uppercase">TERMINATE OTHERS</button>
                                </div>
                            </div>
                            <Button variant="secondary" className="shrink-0 border-red-900/30 text-red-400 hover:border-red-500 hover:text-red-500 font-mono uppercase text-xs" onClick={() => showToast("Emergency key generated. Check your email.", "info")}>
                                <Icons.Lock className="h-3 w-3 mr-2" /> GENERATE EMERGENCY KEY
                            </Button>
                        </div>
                    </Card>
                </section>

                {/* 03 // PRIVACY & DATA CONTROL */}
                <section id="privacy">
                    <SectionHeader title="03 // PRIVACY & DATA CONTROL: THE CONTRACT" icon={Icons.Database} />
                    <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                        <p className="text-sm text-[#8d8c9e] mb-6">You command your data—ZAP custodies it. Toggles here enforce sovereignty.</p>
                        <div className="divide-y divide-[#333]/50 mb-8">
                            <Toggle 
                                checked={anonymizedAnalytics} onChange={createToggleHandler(setAnonymizedAnalytics)} 
                                label={<span className="font-heading uppercase text-sm">Anonymized Analytics</span>}
                                description="Permit ZAP to leverage non-identifying aggregates for Grid optimization."
                            />
                            <Toggle 
                                checked={affiliateTracking} onChange={createToggleHandler(setAffiliateTracking)} 
                                label={<span className="font-heading uppercase text-sm">Affiliate Tracking Preference</span>}
                                description="Opt-in to external pixel tracking for partner synergies; disable without reward impact."
                            />
                            <Toggle 
                                checked={contributionDisplay} onChange={createToggleHandler(setContributionDisplay)} 
                                label={<span className="font-heading uppercase text-sm">Community Contribution Display</span>}
                                description="Expose your Handle on public VPRs and leaderboards—enhance visibility or cloak."
                            />
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-[#14131c] rounded-lg border border-[#333]">
                            <Button variant="secondary" className="font-mono uppercase text-xs tracking-wider flex items-center gap-2 border-[#333] hover:border-[#00FFC0]" onClick={() => showToast("Data archive sent to your verified email.", "success")}>
                                <Icons.FileText className="h-4 w-4" /> EXPORT USER DATA ARCHIVE
                            </Button>
                            <p className="text-xs text-[#8d8c9e] font-mono leading-tight">
                                <strong className="text-[#00FFC0]">GUIDANCE NODE:</strong> Invoke "Right to be Forgotten" via privacy@zap.gg—erasure orbits in 30 days, barring legal holds.
                            </p>
                        </div>
                    </Card>
                </section>

                {/* 04 // SSP PROTOCOL PAYOUTS */}
                <section id="rewards">
                    <SectionHeader title="04 // SSP PROTOCOL PAYOUTS: REWARDS VAULT" icon={Icons.Gift} />
                    <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                        <div className="bg-[#14131c] p-6 rounded-lg border border-[#00FFC0]/20 mb-6">
                            <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-3">Reward Wallet Address (ERC-20 / SOL)</label>
                            <div className="flex gap-4">
                                <Input 
                                    value={walletAddress} 
                                    onChange={(e) => setWalletAddress(e.target.value)} 
                                    className="font-mono text-lg bg-black border-[#333] focus:border-[#00FFC0] text-white tracking-wider" 
                                />
                                <Button onClick={handleUpdateWallet} className="shrink-0 shadow-[0_0_15px_rgba(29,215,96,0.2)] font-heading uppercase tracking-wider px-6">
                                    UPDATE
                                </Button>
                            </div>
                            <p className="text-xs text-yellow-500 mt-3 flex items-center gap-2 font-mono uppercase">
                                <Icons.AlertTriangle className="h-4 w-4" /> DOUBLE-CHECK DIRECTIVE: Typos lock funds forever. Scan with vigilance.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                             <Button variant="link" className="text-[#00FFC0] font-mono uppercase text-xs flex items-center gap-1 hover:no-underline group">
                                [ VIEW PAYOUT HISTORY LOG ] <Icons.ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <ProTip>Threshold hits auto-notify; claim within 90 days or forfeit to pool.</ProTip>
                        </div>
                    </Card>
                </section>

                {/* 05 // USER PREFERENCES */}
                <section id="preferences">
                    <SectionHeader title="05 // USER PREFERENCES: VIEW & INTERFACE" icon={Icons.LayoutDashboard} />
                    <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="md:col-span-2">
                                <Toggle 
                                    checked={!isMuted} onChange={handleAudioToggle} 
                                    label={<span className="font-heading uppercase text-sm flex items-center gap-2">Tactical Audio Feedback <Icons.Activity className={`h-4 w-4 ${!isMuted ? 'text-[#00FFC0]' : 'text-[#333]'}`} /></span>}
                                    description="Enable UI sound effects for clicks, notifications, and game interactions."
                                />
                            </div>
                            <div className="border-t border-[#333] pt-6 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Aesthetic Mode</label>
                                    <div className="flex p-1 bg-[#14131c] rounded-md border border-[#333]">
                                        <button onClick={() => { playSound('click_secondary', 0.3); setAestheticMode('dark'); }} className={`flex-1 py-2 text-xs font-heading uppercase rounded-sm transition-all ${aestheticMode === 'dark' ? 'bg-[#333] text-white' : 'text-[#8d8c9e] hover:text-white'}`}>DARK OPS</button>
                                        <button onClick={() => { playSound('click_secondary', 0.3); setAestheticMode('light'); }} className={`flex-1 py-2 text-xs font-heading uppercase rounded-sm transition-all ${aestheticMode === 'light' ? 'bg-white text-black' : 'text-[#8d8c9e] hover:text-white'}`}>LIGHT (BETA)</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Data View Format</label>
                                    <div className="flex p-1 bg-[#14131c] rounded-md border border-[#333]">
                                        <button onClick={() => { playSound('click_secondary', 0.3); setDataViewFormat('percentage'); }} className={`flex-1 py-2 text-xs font-heading uppercase rounded-sm transition-all ${dataViewFormat === 'percentage' ? 'bg-[#00FFC0]/20 text-[#00FFC0]' : 'text-[#8d8c9e] hover:text-white'}`}>96.5%</button>
                                        <button onClick={() => { playSound('click_secondary', 0.3); setDataViewFormat('decimal'); }} className={`flex-1 py-2 text-xs font-heading uppercase rounded-sm transition-all ${dataViewFormat === 'decimal' ? 'bg-[#00FFC0]/20 text-[#00FFC0]' : 'text-[#8d8c9e] hover:text-white'}`}>0.965</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Primary Language</label>
                                    <select value={language} onChange={(e) => { playSound('click_secondary', 0.3); setLanguage(e.target.value); }} className="w-full h-[42px] bg-[#14131c] border border-[#333] rounded-md px-3 text-xs font-heading uppercase text-white focus:outline-none focus:border-[#00FFC0]">
                                        <option value="en-US">ENGLISH (US) // DEFAULT</option>
                                        <option value="es-ES">ESPAÑOL // BETA</option>
                                        <option value="de-DE">DEUTSCH // BETA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-[#666] font-mono mt-6 text-center uppercase">
                            SYNC NOTE: Preferences propagate on logout—test in incognito for seamlessness.
                        </p>
                    </Card>
                </section>

                {/* 06 // INTEL COMM CHANNEL */}
                <section id="notifications">
                    <SectionHeader title="06 // INTEL COMM CHANNEL: NOTIFICATIONS" icon={Icons.Mail} />
                    <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                        <div className="space-y-2 divide-y divide-[#333]/50">
                            {/* MANDATORY TOGGLE (LOCKED ON) */}
                            <div className="flex items-center justify-between py-4 opacity-80 cursor-not-allowed" title="This setting cannot be disabled.">
                                <div className="pr-8">
                                    <label className="font-medium text-white block font-heading uppercase text-sm flex items-center gap-2">
                                        System Alerts <span className="text-[#00FFC0] text-[10px] border border-[#00FFC0] px-1.5 rounded">// MANDATORY</span>
                                    </label>
                                    <div className="text-sm text-[#8d8c9e] mt-1">Critical pings for security breaches, dispute escalations, and payout verifications.</div>
                                </div>
                                <div className="relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent bg-[#00FFC0]/50">
                                    <span className="inline-block h-5 w-5 transform translate-x-5 rounded-full bg-white shadow ring-0" />
                                </div>
                            </div>

                            <Toggle 
                                checked={emailIntel} onChange={createToggleHandler(setEmailIntel)} 
                                label={<span className="font-heading uppercase text-sm">Email Intel Updates</span>}
                                description="Essential dispatches on ZAP Score shifts, fresh RTP reports, and Grid evolutions."
                            />
                            <Toggle 
                                checked={communitySignal} onChange={createToggleHandler(setCommunitySignal)} 
                                label={<span className="font-heading uppercase text-sm">Community Activity Signal</span>}
                                description="High-fidelity alerts for VPR replies, veto activations, or thread pings."
                            />
                             <Toggle 
                                checked={marketingComm} onChange={createToggleHandler(setMarketingComm)} 
                                label={<span className="font-heading uppercase text-sm">Marketing Communications</span>}
                                description="Exclusive drops: Partner bonuses, ZAP events—value without velocity."
                            />
                        </div>
                        <ProTip>Route to Slack/Discord via API for multi-vector feeds. Mute during ops with one-tap Do Not Disturb.</ProTip>
                    </Card>
                </section>

                {/* 07 // DANGER ZONE */}
                <section id="danger">
                    <Card className="p-6 md:p-8 bg-red-950/10 border-red-900/50 relative overflow-hidden">
                        {/* Caution Stripes */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,rgba(239,68,68,0.2),rgba(239,68,68,0.2)_10px,transparent_10px,transparent_20px)]"></div>
                        
                        <h2 className="font-heading text-xl text-red-500 mb-4 flex items-center gap-3 uppercase tracking-wider mt-4">
                            <Icons.AlertTriangle className="h-6 w-6" /> 07 // DANGER ZONE: DECOMMISSION PROTOCOL
                        </h2>
                        <p className="text-white font-bold uppercase mb-2">WARNING: PERMANENT UNPLUG. IRREVERSIBLE.</p>
                        <p className="text-[#8d8c9e] mb-8 max-w-3xl text-sm leading-relaxed">
                            Erasing your node severs all ties: ZP forfeits to the collective pool, Handle evaporates from ledgers, VPRs anonymize. No resurrection—this is scorched earth for sovereignty's sake.
                        </p>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <Button 
                                variant="secondary" 
                                onClick={handleDeleteAccount}
                                disableSound={true}
                                className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-red-500/50 font-heading uppercase tracking-widest w-full md:w-auto py-4"
                            >
                                INITIATE SELF-DESTRUCT PROTOCOL
                            </Button>
                            <p className="text-xs text-[#8d8c9e] font-mono">
                                <strong className="text-white">LAST RESORT RELAY:</strong> Pause instead via Unplug Protocol (temporary lockdown). Consult support before detonation.
                            </p>
                        </div>
                    </Card>
                </section>

            </div>
        </div>
    );
};
