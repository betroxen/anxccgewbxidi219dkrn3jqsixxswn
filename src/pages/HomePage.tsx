import React from 'react';
import { HeroSection } from '@/sections/HeroSection';
import { FeaturedCasinos } from '@/pages/FeaturedCasinos';
import { FAQComponent } from '@/sections/FAQComponent';
import { Icons } from '@/components/icons';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/auth/AuthContext';
import { useUI } from '@/context/UIContext';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { openRegister } = useUI();
  
  React.useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#0A0A0A] font-tactical overflow-hidden">
      
      <HeroSection />
      <FeaturedCasinos />

      {/* === SECTION: GRID RECON === */}
      <section className="py-20 md:py-32 relative">
          <div className="container mx-auto max-w-7xl px-4 relative z-10">
              
              <div className="text-center mb-16 md:mb-24 animate-fade-up">
                  <h2 className="font-orbitron text-3xl md:text-6xl text-white uppercase mb-6 font-black tracking-wider leading-tight">GRID RECON: <span className="text-[#00FFC0] text-glow">THE FIX</span></h2>
                  <p className="text-[#8d8c9e] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
                      The legacy system is a rigged labyrinth. We didn't just patch it; we rebuilt it with code that can't lie.
                  </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-24 md:mb-32">
                  {/* Old Way */}
                  <div className="bg-[#14131c]/60 border-l-4 border-red-900/50 rounded-r-xl p-6 md:p-10 backdrop-blur-sm">
                      <h3 className="font-orbitron text-red-500 uppercase text-2xl md:text-3xl mb-8 flex items-center gap-3 tracking-widest font-bold">
                          <Icons.XCircle className="h-8 w-8 md:h-10 md:w-10" /> THE OLD WAY
                      </h3>
                      <ul className="space-y-8">
                          {[
                              { icon: Icons.EyeOff, title: "Hidden RTPs & Fees", desc: "Buried in fine print, inflating house takes without disclosure." },
                              { icon: Icons.MessageSquare, title: "Paid Fake Reviews", desc: "Astroturfed praise masking systemic failures." },
                              { icon: Icons.Ghost, title: "Zero Accountability", desc: "Operators vanish post-dispute. Licenses forged in obscurity." }
                          ].map((item, i) => (
                              <li key={i} className="flex items-start gap-4 md:gap-6 opacity-80 hover:opacity-100 transition-opacity">
                                  <item.icon className="h-6 w-6 md:h-8 md:w-8 text-red-900/80 shrink-0 mt-1" />
                                  <div>
                                      <strong className="text-white font-orbitron uppercase text-lg block mb-1 tracking-wider">{item.title}</strong>
                                      <p className="text-[#8d8c9e] text-base leading-relaxed">{item.desc}</p>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* New Way */}
                  <div className="bg-[#00FFC0]/5 border-l-4 border-[#00FFC0] rounded-r-xl p-6 md:p-10 relative overflow-hidden backdrop-blur-sm">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,192,0.1),transparent_70%)]"></div>
                      <h3 className="font-orbitron text-[#00FFC0] uppercase text-2xl md:text-3xl mb-8 flex items-center gap-3 relative z-10 tracking-widest font-bold text-glow">
                          <Icons.Zap className="h-8 w-8 md:h-10 md:w-10" /> THE ZAP CIRCUIT
                      </h3>
                      <ul className="space-y-8 relative z-10">
                           {[
                              { icon: Icons.Database, title: "Verified On-Chain Data", desc: "Aggregated from millions of spins, audited live—True RTP exposed." },
                              { icon: Icons.Users, title: "Community Veto Power", desc: "Your voice triggers delistings. No bribes tolerated. Ever." },
                              { icon: Icons.Activity, title: "Real-Time VPR Tracking", desc: "Timestamped evidence chains. Fail once, face the Grid forever." }
                          ].map((item, i) => (
                              <li key={i} className="flex items-start gap-4 md:gap-6">
                                  <item.icon className="h-6 w-6 md:h-8 md:w-8 text-[#00FFC0] shrink-0 mt-1 drop-shadow-[0_0_15px_rgba(0,255,192,0.4)]" />
                                  <div>
                                      <strong className="text-white font-orbitron uppercase text-lg block mb-1 tracking-wider">{item.title}</strong>
                                      <p className="text-[#8d8c9e] text-base leading-relaxed">{item.desc}</p>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>

              {/* Data Stream Demo */}
              <div className="max-w-4xl mx-auto">
                  <div className="mb-8 text-center">
                       <p className="inline-block text-[#00FFC0] font-mono text-xs md:text-sm uppercase tracking-[0.2em] animate-pulse-slow px-4 py-2 bg-[#00FFC0]/5 border rounded-full border-[#00FFC0]/20">
                          INCOMING LIVE DATA STREAM...
                      </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                      <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#00FFC0] shadow-[0_0_40px_rgba(0,255,192,0.1)] hover:scale-[1.02] transition-all duration-500">
                          <div className="flex justify-between items-start mb-6">
                              <h4 className="font-orbitron text-2xl text-white uppercase tracking-wider font-bold">STAKE.COM</h4>
                              <span className="px-3 py-1 bg-[#00FFC0] text-black text-sm font-bold rounded-sm font-mono shadow-[0_0_15px_#00FFC0]">SCORE: 9.8</span>
                          </div>
                          <div className="space-y-5 font-mono text-sm md:text-base">
                              <div>
                                  <div className="flex justify-between mb-2">
                                      <span className="text-[#8d8c9e] tracking-wider">TRUE RTP (LIVE)</span>
                                      <span className="text-white font-bold text-lg">98.5%</span>
                                  </div>
                                  <ProgressBar progress={98.5} className="h-2" />
                              </div>
                              <div className="flex justify-between py-3 border-t border-b border-[#333]">
                                  <span className="text-[#8d8c9e] tracking-wider">AVG PAYOUT</span>
                                  <span className="text-[#00FFC0] font-bold text-lg">~5 MINS</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-[#8d8c9e] tracking-wider">STATUS</span>
                                  <span className="text-[#00FFC0] tracking-widest font-bold">// VERIFIED</span>
                              </div>
                          </div>
                      </Card>
                      
                      <Card className="p-6 md:p-8 bg-[#0c0c0e] border-red-900/60 relative overflow-hidden opacity-90 hover:opacity-100 transition-all">
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                              <div className="border-4 md:border-8 border-red-500/30 text-red-500/30 font-orbitron uppercase text-4xl md:text-6xl font-black -rotate-12 p-4 rounded-xl backdrop-blur-[2px]">
                                  DELISTED
                              </div>
                          </div>
                          <div className="flex justify-between items-start mb-6 opacity-40">
                              <h4 className="font-orbitron text-2xl text-white uppercase line-through font-bold">SHADY.BET</h4>
                              <span className="px-3 py-1 bg-red-900 text-red-200 text-sm font-bold rounded-sm font-mono">BANNED</span>
                          </div>
                           <div className="p-4 bg-red-950/80 border border-red-500/30 rounded-lg text-sm font-mono text-red-300 uppercase relative z-30 flex items-start gap-3">
                              <Icons.AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
                              <div className="leading-relaxed">
                                  <strong>CRITICAL FAILURE:</strong> FAILED PAYOUT AUDIT (CASE #404)
                              </div>
                          </div>
                      </Card>
                  </div>
              </div>

          </div>
      </section>

      {/* === SECTION: ACTIVATION SEQUENCE === */}
      <section className="py-24 bg-[#0c0c0e] border-y border-[#333] relative">
           <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

          <div className="container mx-auto max-w-7xl px-4 relative z-10">
               <div className="text-center mb-16 md:mb-24">
                  <h2 className="font-orbitron text-3xl md:text-5xl text-white uppercase mb-6 font-black tracking-wider">ACTIVATION SEQUENCE</h2>
                  <p className="text-[#8d8c9e] max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                      Plug into the Grid. We don't just vet; we empower you to command.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  {[
                      { id: '01', icon: Icons.Scan, title: "PERIMETER SCAN", text: "Forensic dissection of licenses and RNG certs. No ghosts on the Grid." },
                      { id: '02', icon: Icons.Cpu, title: "MATH FORGE", text: "Real-time engines harvest on-chain data to simulate 10k+ outcomes per operator." },
                      { id: '03', icon: Icons.Gavel, title: "THE HAMMER", text: "You flag, we probe. VPRs feed the algo; thresholds breached trigger instant suspension." }
                  ].map((item, i) => (
                      <div key={i} className="bg-[#14131c] p-8 rounded-3xl border border-[#333] relative group hover:border-[#00FFC0] transition-all duration-500 hover:-translate-y-2">
                          <div className="font-orbitron text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#333] to-transparent absolute top-4 right-6 opacity-40 group-hover:from-[#00FFC0]/20 transition-all">
                              {item.id}
                          </div>
                          <div className="bg-[#00FFC0]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-[#00FFC0]/20 group-hover:scale-110 transition-transform shadow-[0_0_25px_rgba(0,255,192,0.1)]">
                              <item.icon className="h-8 w-8 text-[#00FFC0]" />
                          </div>
                          <h3 className="font-orbitron text-white text-xl uppercase mb-4 relative z-10 tracking-wider font-bold">{item.title}</h3>
                          <p className="text-[#8d8c9e] text-base leading-relaxed relative z-10">{item.text}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <FAQComponent />

      {/* === FINAL CTA === */}
      <section className="py-24 md:py-32 bg-[#09090B] relative overflow-hidden border-t-2 border-[#00FFC0]">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
          
          <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
              <h2 className="font-orbitron text-5xl md:text-8xl text-white uppercase font-black tracking-tighter mb-12 leading-none drop-shadow-[0_0_30px_rgba(0,255,192,0.2)]">
                  PLUG IN<br/>
                  <span className="text-[#00FFC0] text-glow">NOW</span>
              </h2>
              
              {!user && (
                 <Button 
                    onClick={openRegister} 
                    className="w-full sm:w-auto bg-[#00FFC0] text-black hover:bg-white hover:scale-105 font-orbitron font-black uppercase tracking-[0.2em] text-lg md:text-2xl py-6 md:py-8 px-12 md:px-16 shadow-[0_0_60px_rgba(0,255,192,0.5)] transition-all duration-300 animate-pulse-glow rounded-lg"
                >
                    INITIATE SEQUENCE
                </Button>
              )}
          </div>
      </section>

    </div>
  );
};
