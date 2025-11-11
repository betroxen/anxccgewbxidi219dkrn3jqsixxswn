
import React, { useState, useContext } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { Icons } from '../components/icons';
import { AppContext } from '../context/AppContext';
import { ToastContext } from '../context/ToastContext';

export const SupportPage = () => {
    const appContext = useContext(AppContext);
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        handle: 'DegenGambler', // Auto-filled for authorized user
        email: '',
        userId: 'UID-459901', // Auto-filled mock
        category: 'GENERAL',
        priority: 'STANDARD',
        operator: '',
        subject: '',
        message: '',
        evidenceUrl: '',
        attestData: false,
        attestTc: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.attestData || !formData.attestTc) {
             showToast("TRANSMISSION FAILED: Mandatory attestations required.", "error");
             return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            showToast("SIGNAL TRANSMITTED. Ticket #9432 created. Awaiting orbit response.", "success");
            setFormData(prev => ({ ...prev, subject: '', message: '', evidenceUrl: '', attestData: false, attestTc: false }));
        }, 2000);
    };

    const inputClassName = "w-full rounded-[4px] border border-[#333] bg-[#1A1A1A] px-3 py-2.5 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-1 focus:ring-[#00FFC0] focus:border-[#00FFC0] transition-all font-mono";
    const labelClassName = "block text-xs font-mono uppercase text-[#00FFC0] mb-2";

    const FAQ_FIREWALL = [
        { q: "Why is my ZAP Score not updating?", a: "Scores refresh every 6 hours; check decay flags.", next: "Run manual sync in Diagnostics." },
        { q: "SSP rewards missing—where's my ZP?", a: "Accrual logs in Rewards Tab; delays <24h.", next: "Export ledger CSV for audit." },
        { q: "VPR rejected—how to fix?", a: "Needs timestamped proof; common fail: Missing tx IDs.", next: "Resubmit via Portal." },
        { q: "Operator delisted mid-session?", a: "Veto-triggered; migrate via Grid filters.", next: "Contact operator for salvage." },
        { q: "Privacy breach suspected?", a: "Zero-tolerance; initiate Data Archive request.", next: "privacy@zap.gg for forensic trace." },
    ];

  return (
    <div className="container mx-auto max-w-6xl p-4 py-10 md:p-12 page-fade-in">
        {/* HEADER & MANIFESTO */}
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
                <Icons.Activity className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                    SYSTEM DIAGNOSTIC CONSOLE
                </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:items-center mb-8">
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                    // STATUS: CLEAR SIGNAL // YOUR EDGE DEPENDS ON FAST ANSWERS
                </p>
                <span className="hidden md:block text-[#333]">|</span>
                <p className="text-[#8d8c9e] font-mono text-xs uppercase">
                    EFFECTIVE DATE: NOVEMBER 09, 2025
                </p>
            </div>
            <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#00FFC0]/30 relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="font-heading text-xl text-white mb-4 uppercase">LOCK IN THE LINK: YOUR COMMAND CENTER FOR RESOLUTION</h2>
                    <p className="text-[#8d8c9e] text-lg leading-relaxed mb-6">
                        Operators, the Grid runs on precision—downtime is the enemy. Our Diagnostic Console delivers rapid, fortified support. We're not gatekeepers; we're your tactical relay. Self-serve first for lightning strikes, or transmit a direct signal for heavy ordnance. Stay sharp: Complete intel accelerates orbits. Incomplete signals? They drift to the void.
                    </p>
                    {/* QUICK-START GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Icons.Activity, title: "SCORE GLITCH?", action: "RTP GUIDE" },
                            { icon: Icons.Wallet, title: "PAYOUT DELAY?", action: "CHECK SYNC" },
                            { icon: Icons.FileText, title: "VPR REJECTED?", action: "REVIEW PROTOCOL" },
                            { icon: Icons.Lock, title: "ACCESS LOCKED?", action: "MFA RESET" }
                        ].map((item, i) => (
                            <button key={i} className="p-3 bg-[#14131c] border border-[#333] rounded-lg text-left hover:border-[#00FFC0]/50 transition-all group">
                                <item.icon className="h-5 w-5 text-[#8d8c9e] group-hover:text-[#00FFC0] mb-2" />
                                <div className="font-heading text-xs text-white uppercase mb-1">{item.title}</div>
                                <div className="font-mono text-[10px] text-[#00FFC0] uppercase group-hover:underline">> {item.action}</div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>
        </div>

        {/* 01 // INTEL CIRCUIT & PROTOCOL ACCESS */}
        <section className="mb-16">
            <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                <span className="text-[#00FFC0]">01 //</span> INTEL CIRCUIT & PROTOCOL ACCESS (Self-Serve Arsenal)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/50 group flex flex-col">
                    <Icons.BookOpen className="h-8 w-8 text-[#00FFC0] mb-4" />
                    <h3 className="font-heading text-base text-white mb-2">KNOWLEDGE BASE</h3>
                    <p className="text-xs text-[#8d8c9e] mb-6 flex-1">Raw Data Library on ZAP mechanics, score pillars, and vetting blueprints.</p>
                    <Button variant="secondary" className="w-full font-mono uppercase text-[10px]" onClick={() => appContext?.setCurrentPage('Knowledge Base')}>
                        ACCESS LIBRARY →
                    </Button>
                </Card>
                <Card className="p-6 bg-[#14131c] border-[#333] hover:border-blue-500/50 group flex flex-col">
                    <Icons.Shield className="h-8 w-8 text-blue-500 mb-4" />
                    <h3 className="font-heading text-base text-white mb-2">RESPONSIBLE GAMING</h3>
                    <p className="text-xs text-[#8d8c9e] mb-6 flex-1">Fortified tools for discipline—timers, loss thresholds, and Unplug maneuvers.</p>
                    <Button variant="secondary" className="w-full font-mono uppercase text-[10px] hover:border-blue-500" onClick={() => appContext?.setCurrentPage('Responsible Gaming')}>
                        VIEW PROTOCOLS →
                    </Button>
                </Card>
                <Card className="p-6 bg-[#14131c] border-[#333] hover:border-purple-500/50 group flex flex-col">
                    <Icons.FileText className="h-8 w-8 text-purple-500 mb-4" />
                    <h3 className="font-heading text-base text-white mb-2">LEGAL MANIFESTO</h3>
                    <p className="text-xs text-[#8d8c9e] mb-6 flex-1">Ironclad dossiers: Terms, Privacy, and Commercial Disclosure.</p>
                    <Button variant="secondary" className="w-full font-mono uppercase text-[10px] hover:border-purple-500" onClick={() => appContext?.setCurrentPage('Terms of Service')}>
                        VIEW FILES →
                    </Button>
                </Card>
                 <Card className="p-6 bg-[#14131c] border-[#333] hover:border-yellow-500/50 group flex flex-col">
                    <Icons.Users className="h-8 w-8 text-yellow-500 mb-4" />
                    <h3 className="font-heading text-base text-white mb-2">PARTNERSHIP ARCHIVE</h3>
                    <p className="text-xs text-[#8d8c9e] mb-6 flex-1">Operator synergy docs, referral blueprints, and revenue loop APIs.</p>
                    <Button variant="secondary" className="w-full font-mono uppercase text-[10px] hover:border-yellow-500" onClick={() => appContext?.setCurrentPage('Affiliate')}>
                        ACCESS ARCHIVE →
                    </Button>
                </Card>
            </div>
        </section>

        {/* 02 // DIRECT COMMUNICATION */}
        <section id="ticket-system" className="mb-16">
             <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                <span className="text-[#00FFC0]">02 //</span> DIRECT COMMUNICATION: LINE ACTIVATION
            </h2>

            <Card className="p-0 overflow-hidden border-[#00FFC0]/30 bg-[#0A0A0A] shadow-2xl">
                <div className="bg-[#0c0c0e] p-4 border-b border-[#333] flex items-center justify-between">
                    <span className="font-mono text-sm text-[#00FFC0] uppercase tracking-widest flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FFC0]"></span>
                        </span>
                        SIGNAL STATUS: READY TO TRANSMIT
                    </span>
                </div>
                
                <div className="p-6 md:p-10">
                    <p className="text-[#8d8c9e] mb-10 border-l-4 border-[#00FFC0] pl-4 py-3 bg-[#00FFC0]/5 font-mono text-sm leading-relaxed">
                        <strong className="text-[#00FFC0] font-heading uppercase">MISSION DIRECTIVE:</strong> Channel your intel with surgical clarity. Our vanguard team prioritizes fortified signals. Vague transmissions queue longer.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* SENDER INTEL */}
                        <div>
                            <h3 className="text-white font-heading uppercase text-sm mb-6 flex items-center gap-2">
                                <Icons.Users className="h-4 w-4 text-[#8d8c9e]" /> SENDER'S INTEL (The Source)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelClassName}>Your Handle (Alias)</label>
                                    <Input name="handle" value={formData.handle} readOnly className="font-mono bg-[#0c0c0e] cursor-not-allowed opacity-70" />
                                </div>
                                <div>
                                    <label className={labelClassName}>Verified Email *</label>
                                    <Input name="email" type="email" required placeholder="Confirmation vector..." value={formData.email} onChange={handleInputChange} className="font-mono" />
                                </div>
                                 <div>
                                    <label className={labelClassName}>ZAP User ID</label>
                                    <Input name="userId" value={formData.userId} readOnly className="font-mono bg-[#0c0c0e] cursor-not-allowed opacity-70" />
                                </div>
                            </div>
                        </div>

                        {/* THE SIGNAL */}
                         <div>
                            <h3 className="text-white font-heading uppercase text-sm mb-6 flex items-center gap-2">
                                <Icons.Activity className="h-4 w-4 text-[#8d8c9e]" /> THE SIGNAL (Core Issue)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                 <div>
                                    <label className={labelClassName}>Category *</label>
                                    <select name="category" className={inputClassName} value={formData.category} onChange={handleInputChange}>
                                        <option value="DATA">DATA/RTP AUDIT</option>
                                        <option value="ACCOUNT">ACCOUNT/REWARDS</option>
                                        <option value="VETTING">OPERATOR VETTING</option>
                                        <option value="PARTNER">PARTNERSHIP QUERY</option>
                                        <option value="GENERAL">GENERAL INQUIRY</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClassName}>Priority *</label>
                                    <select name="priority" className={`${inputClassName} font-bold ${formData.priority === 'CRITICAL' ? 'text-red-500 !border-red-900 bg-red-950/30' : formData.priority === 'ELEVATED' ? 'text-yellow-500' : 'text-[#8d8c9e]'}`} value={formData.priority} onChange={handleInputChange}>
                                        <option value="STANDARD">STANDARD (48-72h)</option>
                                        <option value="ELEVATED">ELEVATED (24h)</option>
                                        <option value="CRITICAL">CRITICAL (&lt;4h - EVIDENCE MANDATORY)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClassName}>Operator Name</label>
                                    <Input name="operator" placeholder="If applicable..." value={formData.operator} onChange={handleInputChange} className="font-mono" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClassName}>Subject (Mission Summary) *</label>
                                <Input name="subject" required maxLength={100} placeholder="CONCISE VECTOR (MAX 100 CHARS)..." value={formData.subject} onChange={handleInputChange} className="font-mono" />
                            </div>
                        </div>

                        {/* RAW DATA CONTRACT */}
                        <div>
                            <h3 className="text-white font-heading uppercase text-sm mb-6 flex items-center gap-2">
                                <Icons.Database className="h-4 w-4 text-[#8d8c9e]" /> THE RAW DATA CONTRACT (Verification Payload)
                            </h3>
                            <div className="space-y-6">
                                 <div>
                                    <label className={labelClassName}>Detailed Report (Min 5 lines) *</label>
                                    <textarea 
                                        name="message"
                                        required
                                        rows={6}
                                        className={`${inputClassName} resize-none`}
                                        placeholder="> NARRATE THE BREACH...&#10;> WHAT HAPPENED? WHEN? IMPACT?&#10;> STEPS ALREADY TRIED?"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClassName}>Evidence URL (Recommended)</label>
                                        <Input name="evidenceUrl" type="url" placeholder="SECURE VAULT LINK..." value={formData.evidenceUrl} onChange={handleInputChange} className="font-mono" />
                                    </div>
                                    <div>
                                        <label className={labelClassName}>Attachments (Optional)</label>
                                        <div className="h-10 w-full rounded-[4px] border border-[#333] bg-[#1A1A1A] px-3 flex items-center text-xs font-mono text-[#666] cursor-not-allowed">
                                            [ UPLOAD DISABLED IN DEMO MODE ]
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ATTESTATION */}
                         <div className="bg-[#0c0c0e] p-6 rounded-lg border border-[#333]">
                            <h3 className="text-[#00FFC0] font-heading uppercase text-sm mb-4 flex items-center gap-2">
                                <Icons.Lock className="h-4 w-4" /> DATA ATTESTATION (MANDATORY CHECKPOINT)
                            </h3>
                            <div className="space-y-4">
                                <Toggle 
                                    checked={formData.attestData} 
                                    onChange={(val) => setFormData(prev => ({...prev, attestData: val}))}
                                    label={<span className="font-heading uppercase text-sm text-white">DATA INTEGRITY CONFIRMATION</span>}
                                    description={<span className="font-mono text-xs">I confirm this report contains raw, un-fictionalized data.</span>}
                                />
                                <div className="h-px bg-[#333] w-full"></div>
                                <Toggle 
                                    checked={formData.attestTc} 
                                    onChange={(val) => setFormData(prev => ({...prev, attestTc: val}))}
                                    label={<span className="font-heading uppercase text-sm text-white">T&C CONTRACT ACCEPTANCE</span>}
                                    description={<span className="font-mono text-xs">I accept the ZAP Terms of Service governance.</span>}
                                />
                            </div>
                        </div>

                        {/* SUBMIT & TIMELINES */}
                        <div className="pt-4">
                            <Button 
                                type="submit" 
                                size="lg" 
                                className="w-full font-heading uppercase tracking-[0.2em] py-6 shadow-[0_0_30px_rgba(0,255,192,0.3)] animate-pulse-glow"
                                loading={isLoading}
                                disabled={!formData.attestData || !formData.attestTc}
                            >
                                {isLoading ? 'TRANSMITTING...' : 'ACTIVATE SUPPORT LINE & TRANSMIT'}
                            </Button>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#333]">
                            <div className="text-center">
                                <span className="text-[#8d8c9e] font-heading uppercase text-xs block mb-1">STANDARD ORBIT</span>
                                <span className="text-white font-mono font-bold">48-72 HOURS</span>
                            </div>
                            <div className="text-center">
                                <span className="text-yellow-500 font-heading uppercase text-xs block mb-1">ELEVATED ORBIT</span>
                                <span className="text-white font-mono font-bold">24 HOURS</span>
                            </div>
                             <div className="text-center">
                                <span className="text-red-500 font-heading uppercase text-xs block mb-1">CRITICAL ORBIT</span>
                                <span className="text-white font-mono font-bold">&lt; 4 HOURS</span>
                            </div>
                        </div>

                    </form>
                </div>
            </Card>
        </section>

        {/* 03 // FAQ FIREWALL */}
        <section className="mb-16">
            <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                <span className="text-[#00FFC0]">03 //</span> FAQ FIREWALL: PREEMPTIVE STRIKES
            </h2>
            <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#14131c] text-xs text-[#8d8c9e] font-mono uppercase tracking-wider">
                            <tr>
                                <th className="p-4 pl-6">Query Vector</th>
                                <th className="p-4">Resolution Signal</th>
                                <th className="p-4 pr-6">Next Orbit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333]">
                            {FAQ_FIREWALL.map((item, i) => (
                                <tr key={i} className="hover:bg-[#14131c] transition-colors">
                                    <td className="p-4 pl-6 font-bold text-white">"{item.q}"</td>
                                    <td className="p-4 text-[#8d8c9e]">{item.a}</td>
                                    <td className="p-4 pr-6 font-mono text-[#00FFC0] text-xs uppercase">{item.next}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </section>

        {/* FOOTER NOTES */}
        <div className="text-center text-xs text-[#666] font-mono uppercase space-y-2">
            <p>
                <strong className="text-red-900">NOTE: ABUSE COUNTERMEASURES ACTIVE.</strong> Misuse of CRITICAL priority triggers deprioritization.
            </p>
            <p>
                HQ RELAY: Premier Business Centre, Mutsamudu, Comoros. GLOBAL OPS, UNBREAKABLE UPTIME.
            </p>
        </div>

    </div>
  );
};
