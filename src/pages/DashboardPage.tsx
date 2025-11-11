import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Icons } from '../components/icons';
import { Toggle } from '../components/Toggle';

// Mock Data removed
const ALPHA_FEED: any[] = [];
const ACTIVE_MISSIONS: any[] = [];

export const DashboardPage = () => {
    const navigate = useNavigate();
    const [quickAesthetic, setQuickAesthetic] = useState(true);
    const [quickData, setQuickData] = useState(true);

    return (
        <div className="container mx-auto max-w-[1400px] p-4 py-6 md:p-8 page-fade-in">
            
            <div className="sticky top-16 z-20 bg-[#121212]/80 backdrop-blur-md py-4 mb-6 border-b border-[#333] flex flex-col md:flex-row justify-between items-start md:items-center -mx-4 px-4 md:-mx-8 md:px-8">
                <div>
                    <h1 className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wider">
                        WELCOME BACK, <span className="text-[#00FFC0] text-glow">DEGENGAMBLER</span>
                    </h1>
                    <p className="font-mono text-xs md:text-sm text-[#8d8c9e] mt-1">
                        // SYSTEM STATUS: <span className="text-[#00FFC0] font-bold animate-pulse">// OPTIMAL</span>
                    </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="secondary" size="sm" onClick={() => navigate('/missions')} className="font-heading uppercase text-xs">
                        <Icons.Target className="w-4 h-4 mr-2 text-[#00FFC0]"/> DAILY OPS
                    </Button>
                    <Button size="sm" onClick={() => navigate('/settings')} className="shadow-[0_0_15px_rgba(0,255,192,0.2)] font-heading uppercase text-xs">
                        <Icons.Settings className="w-4 h-4 mr-2"/> CONSOLE
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30 transition-all">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Icons.Zap className="w-16 h-16 text-[#00FFC0]"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-1">ZAP POINTS (ZP)</p>
                    <p className="font-mono text-3xl text-[#00FFC0] font-bold tracking-tight">1,240</p>
                    <div className="mt-3">
                        <div className="flex justify-between text-[10px] font-mono text-[#8d8c9e] mb-1">
                            <span>LVL 42 PROGRESS</span>
                            <span className="text-[#00FFC0]">85%</span>
                        </div>
                        <ProgressBar progress={85} className="h-1.5 bg-[#333]" />
                    </div>
                </Card>
                <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30 transition-all">
                     <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Icons.Trophy className="w-16 h-16 text-yellow-500"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-1">GLOBAL RANK</p>
                    <p className="font-mono text-3xl text-white font-bold tracking-tight">#1,337</p>
                    <p className="text-xs text-[#00FFC0] font-mono mt-2 flex items-center">
                        <Icons.ArrowUp className="w-3 h-3 mr-1" /> TOP 5%
                    </p>
                </Card>
                <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30 transition-all">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Icons.Database className="w-16 h-16 text-purple-500"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-1">VPRs LOGGED</p>
                    <p className="font-mono text-3xl text-white font-bold tracking-tight">12</p>
                    <button className="text-xs text-[#8d8c9e] hover:text-[#00FFC0] font-mono mt-2 flex items-center uppercase transition-colors">
                        [VIEW LOG] <Icons.ChevronRight className="w-3 h-3 ml-1" />
                    </button>
                </Card>
                 <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30 transition-all">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Icons.Gift className="w-16 h-16 text-[#00FFC0]"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-1">SSP REWARDS</p>
                    <p className="font-mono text-3xl text-[#00FFC0] font-bold tracking-tight">$45.00</p>
                    <p className="text-xs text-[#8d8c9e] font-mono mt-2">PENDING PAYOUT</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                             <h2 className="font-heading text-xl text-white uppercase flex items-center gap-2">
                                <Icons.Target className="h-5 w-5 text-[#00FFC0]" /> ACTIVE MISSIONS
                            </h2>
                            <Button variant="link" onClick={() => navigate('/missions')} className="text-xs font-mono">VIEW ALL →</Button>
                        </div>
                        {ACTIVE_MISSIONS.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ACTIVE_MISSIONS.map(mission => (
                                    <Card key={mission.id} className="p-5 flex flex-col justify-between bg-[#14131c] hover:bg-[#1A1A1A] border-[#333] group">
                                        {/* Mission content */}
                                    </Card>
                                ))}
                            </div>
                        ) : (
                             <Card className="p-8 text-center text-[#8d8c9e] border-dashed border-[#333] bg-transparent">
                                <Icons.Target className="h-8 w-8 mx-auto mb-2 opacity-50"/>
                                <p className="font-mono text-sm">NO ACTIVE MISSIONS</p>
                            </Card>
                        )}
                    </div>

                    <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333]">
                        <div className="p-4 border-b border-[#333] flex justify-between items-center bg-[#14131c]">
                            <h2 className="font-heading text-lg text-white uppercase flex items-center gap-2">
                                <Icons.Zap className="h-5 w-5 text-[#00FFC0]" /> ALPHA FEED INTEL
                            </h2>
                             <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FFC0]"></span>
                                </span>
                                <span className="text-xs font-mono text-[#00FFC0] uppercase">LIVE</span>
                            </div>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-4 space-y-3">
                            {ALPHA_FEED.length > 0 ? ALPHA_FEED.map(item => (
                                <div key={item.id} className={`p-3 rounded border text-sm flex gap-3 items-start animate-fadeIn`}>
                                    {/* Feed item content */}
                                </div>
                            )) : (
                                <div className="text-center py-10 text-[#8d8c9e]">
                                    <Icons.Mail className="h-8 w-8 mx-auto mb-2 opacity-50"/>
                                    <p className="font-mono text-sm">ALPHA FEED IS QUIET</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <div>
                        <h2 className="font-heading text-xl text-white uppercase mb-4 flex items-center gap-2">
                            <Icons.Shield className="h-5 w-5 text-[#00FFC0]" /> GRID RECON
                        </h2>
                        <Card className="p-5 bg-[#0c0c0e] border-[#00FFC0]/30 relative overflow-hidden group">
                           <div className="text-center py-10 text-[#8d8c9e]">
                                <Icons.Server className="h-8 w-8 mx-auto mb-2 opacity-50"/>
                                <p className="font-mono text-sm">NO OPERATORS FOUND</p>
                                <Button variant="link" size="sm" className="mt-2" onClick={() => navigate('/casinos')}>
                                    BROWSE GRID
                                </Button>
                           </div>
                        </Card>
                    </div>

                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <h2 className="font-heading text-lg text-white uppercase mb-4 flex items-center gap-2">
                            <Icons.Settings className="h-5 w-5 text-[#8d8c9e]" /> QUICK COMMS
                        </h2>
                        <div className="divide-y divide-[#333]">
                             <Toggle 
                                checked={quickAesthetic} 
                                onChange={setQuickAesthetic} 
                                label={<span className="text-sm font-mono text-[#8d8c9e] uppercase">DARK OPS MODE</span>}
                            />
                             <Toggle 
                                checked={quickData} 
                                onChange={setQuickData} 
                                label={<span className="text-sm font-mono text-[#8d8c9e] uppercase">DATA: PERCENTAGE</span>}
                            />
                        </div>
                        <Button 
                            variant="secondary" 
                            onClick={() => navigate('/settings')}
                            className="w-full mt-4 border-[#333] text-[#8d8c9e] hover:text-white hover:border-[#00FFC0] transition-colors font-mono uppercase text-xs"
                        >
                            FULL CONSOLE ACCESS
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};
