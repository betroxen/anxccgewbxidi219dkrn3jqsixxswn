
import React, { useContext } from 'react';
import { Icons } from '../components/icons';
import { ProgressBar } from '../components/ProgressBar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { AppContext } from '../context/AppContext';

// --- MOCK DATA ---
const DAILY_MISSIONS = [
    { id: 'd1', title: "DAILY LOGIN SIGNAL", payload: "5 ZP", progress: 100, status: "COMPLETE", action: "CLAIM REWARD" },
    { id: 'd2', title: "COMMUNITY VOICE", payload: "15 ZP + 5 XP", progress: 33, status: "IN PROGRESS", action: "POST IN ALPHA FEED" },
    { id: 'd3', title: "INTEL ACQUISITION", payload: "10 ZP", progress: 60, status: "IN PROGRESS", action: "VIEW BONUS PAGES" },
    { id: 'd4', title: "EDGE FINDER AUDIT", payload: "10 ZP", progress: 0, status: "ACTIVE", action: "LAUNCH EDGE FINDER" },
];

const WEEKLY_MISSIONS = [
    { id: 'w1', title: "WEEKLY WAGER CHALLENGE", payload: "50 ZP + 25 XP", progress: 80, status: "IN PROGRESS", action: "VIEW STATS" },
    { id: 'w2', title: "VPR TRANSMISSION", payload: "25 ZP + 50 XP", progress: 50, status: "IN PROGRESS", action: "SUBMIT REPORT" },
    { id: 'w3', title: "OPERATOR CROSS-REFERENCE", payload: "30 ZP", progress: 0, status: "ACTIVE", action: "COMPARE OPERATORS" },
    { id: 'w4', title: "FORUM ANALYTICS", payload: "15 ZP", progress: 100, status: "COMPLETE", action: "CLAIM REWARD" },
];

const MASTERY_MISSIONS = [
    { id: 'm1', title: "ACTIVATE MFA PROTOCOL", payload: "500 XP", status: "IN PROGRESS", action: "ACCESS SECURITY" },
    { id: 'm2', title: "SSP WALLET INTEGRATION", payload: "250 ZP + 100 XP", status: "CLAIMED", action: "COMPLETE" },
    { id: 'm3', title: "FIRST VETO CONTRIBUTION", payload: "1,000 ZP", status: "ACTIVE", action: "N/A" },
    { id: 'm4', title: "LINK EXTERNAL ACCOUNT", payload: "50 ZP", status: "IN PROGRESS", action: "ACCESS DOSSIER" },
];

export const MissionsPage = () => {
  const appContext = useContext(AppContext);

  const MissionCard: React.FC<{ mission: any, isMastery?: boolean }> = ({ mission, isMastery = false }) => {
      const isClaimable = mission.status === 'COMPLETE';
      const isClaimed = mission.status === 'CLAIMED';

      return (
        <Card className={`p-4 md:p-5 flex flex-col md:flex-row items-center gap-4 transition-all duration-300 
            ${isClaimable ? 'border-[#00FFC0] shadow-[0_0_15px_rgba(0,255,192,0.15)] bg-[#00FFC0]/5' : 'border-[#333] bg-[#14131c]'}
            ${isClaimed ? 'opacity-50 grayscale' : ''}
        `}>
            {/* Icon & Title */}
            <div className="flex items-center gap-4 w-full md:w-1/3">
                <div className={`p-3 rounded-lg flex-shrink-0 ${isClaimable ? 'bg-[#00FFC0] text-black' : 'bg-[#0A0A0A] border border-[#333] text-[#00FFC0]'}`}>
                    {isMastery ? <Icons.Trophy className="h-6 w-6" /> : <Icons.Target className="h-6 w-6" />}
                </div>
                <div>
                    <h3 className="font-heading text-sm md:text-base text-white uppercase">{mission.title}</h3>
                    <span className="font-mono text-xs text-[#00FFC0] bg-[#00FFC0]/10 px-2 py-0.5 rounded border border-[#00FFC0]/20 inline-block mt-1">
                        [{mission.payload}]
                    </span>
                </div>
            </div>

            {/* Progress (Hidden for some Mastery items if needed, but showing here for consistency if data exists) */}
            {!isMastery && mission.progress !== undefined && (
                <div className="w-full md:flex-1">
                    <div className="flex justify-between text-xs font-mono text-[#8d8c9e] mb-1.5 uppercase">
                        <span>Mission Progress</span>
                        <span className={mission.progress > 0 ? "text-white" : ""}>{mission.progress}%</span>
                    </div>
                    <ProgressBar progress={mission.progress} className="h-2 bg-[#0A0A0A]" />
                </div>
            )}
            {isMastery && (
                <div className="w-full md:flex-1 flex items-center">
                     <span className={`font-mono text-xs uppercase tracking-widest ${isClaimed ? 'text-[#00FFC0]' : 'text-[#8d8c9e]'}`}>
                        // STATUS: {mission.status}
                     </span>
                </div>
            )}

            {/* Action Button */}
            <div className="w-full md:w-auto flex-shrink-0">
                {isClaimable ? (
                    <Button className="w-full animate-pulse-glow font-heading uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,192,0.3)]">
                        CLAIM REWARD
                    </Button>
                ) : isClaimed ? (
                    <Button variant="ghost" disabled className="w-full border border-[#333] text-[#666] font-mono uppercase">
                        PAYLOAD SECURED
                    </Button>
                ) : (
                    <Button 
                        variant="secondary" 
                        className="w-full font-mono uppercase text-xs border-[#333] hover:border-[#00FFC0]/50"
                        disabled={mission.action === 'N/A'}
                        onClick={() => {
                            if (mission.title.includes('MFA')) appContext?.setCurrentPage('Command Console');
                            if (mission.title.includes('LINK')) appContext?.setCurrentPage('Profile');
                            if (mission.title.includes('ALPHA')) appContext?.setCurrentPage('Alpha Feed');
                        }}
                    >
                        {mission.action}
                    </Button>
                )}
            </div>
        </Card>
      );
  };

  return (
    <div className="container mx-auto max-w-6xl p-4 py-6 md:p-10 page-fade-in">
        
        {/* HEADER & HUD */}
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
                <Icons.Target className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                    ZAP MISSION PROTOCOL: <span className="text-[#00FFC0] text-glow">ASSET ACQUISITION</span>
                </h1>
            </div>

            {/* PERSISTENT TARGET ACQUISITION HUD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0c0c0e] p-4 rounded-xl border border-[#333]">
                <div className="flex items-center gap-4 p-4 bg-[#14131c] rounded-lg border border-[#333]">
                    <div className="p-3 bg-[#00FFC0]/10 rounded-full">
                        <Icons.Zap className="h-6 w-6 text-[#00FFC0]" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-heading uppercase text-white">Operational Level 42</span>
                            <span className="font-mono text-[#8d8c9e]">750 XP TO LVL 43</span>
                        </div>
                        <ProgressBar progress={85} className="h-2.5" />
                    </div>
                    <Button variant="ghost" size="icon" className="hidden md:flex text-[#8d8c9e] hover:text-white" onClick={() => appContext?.setCurrentPage('Profile')}>
                        <Icons.ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#14131c] rounded-lg border border-[#333]">
                     <div className="p-3 bg-blue-500/10 rounded-full">
                        <Icons.Clock className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="font-heading uppercase text-xs text-[#8d8c9e] mb-1">Cycle Time Remaining</p>
                        <p className="font-mono text-2xl text-white font-bold tracking-tight">14:32:10</p>
                    </div>
                </div>
            </div>
        </div>

        {/* CIRCUIT I: DAILY */}
        <section className="mb-12">
            <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                <span className="text-[#00FFC0]">I //</span> DAILY INITIATIVES <span className="text-xs text-[#8d8c9e] ml-2 font-mono normal-case opacity-70">// Resets 00:00 UTC</span>
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {DAILY_MISSIONS.map(m => <MissionCard key={m.id} mission={m} />)}
            </div>
        </section>

        {/* CIRCUIT II: WEEKLY */}
        <section className="mb-12">
            <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                 <span className="text-[#00FFC0]">II //</span> WEEKLY DEPLOYS <span className="text-xs text-[#8d8c9e] ml-2 font-mono normal-case opacity-70">// Resets Sunday</span>
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {WEEKLY_MISSIONS.map(m => <MissionCard key={m.id} mission={m} />)}
            </div>
        </section>

        {/* CIRCUIT III: MASTERY */}
        <section className="mb-16">
            <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                 <span className="text-[#00FFC0]">III //</span> PROTOCOL MASTERY <span className="text-xs text-[#8d8c9e] ml-2 font-mono normal-case opacity-70">// One-time High Value Targets</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MASTERY_MISSIONS.map(m => <MissionCard key={m.id} mission={m} isMastery={true} />)}
            </div>
        </section>

        {/* FOOTER LINKS */}
        <div className="border-t border-[#333] pt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <Button variant="ghost" className="text-[#8d8c9e] hover:text-white font-heading uppercase text-xs border border-[#333] bg-[#0c0c0e]" onClick={() => appContext?.setCurrentPage('Rewards')}>
                VIEW PAYOUT HISTORY LOG <Icons.ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="ghost" className="text-[#8d8c9e] hover:text-white font-heading uppercase text-xs border border-[#333] bg-[#0c0c0e]" onClick={() => appContext?.setCurrentPage('Rewards')}>
                ACCESS ZAP POINTS STORE <Icons.ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </div>

    </div>
  );
};
