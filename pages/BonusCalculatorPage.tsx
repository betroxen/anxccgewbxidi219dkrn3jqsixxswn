
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

export const BonusCalculatorPage = () => {
    // Input States
    const [deposit, setDeposit] = useState<number | ''>(100);
    const [bonusPercent, setBonusPercent] = useState<number | ''>(100);
    const [wagering, setWagering] = useState<number | ''>(35);
    const [wagerType, setWagerType] = useState<'bonus' | 'deposit_bonus'>('bonus');

    // Analysis State (for kinetic feedback)
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState({
        bonusAmount: 0,
        totalFunds: 0,
        totalWager: 0,
        riskLevel: { text: "AWAITING INPUT", color: "text-[#8d8c9e]", border: "border-[#333]", bg: "bg-[#1A1A1A]", animate: "" }
    });

    const getRiskAnalysis = (wagerVal: number) => {
        if (wagerVal > 40) return { text: "HIGH RISK // AGGRESSIVE TERMS", color: "text-red-500", border: "border-red-500", bg: "bg-red-950/20", animate: "animate-pulse" };
        if (wagerVal >= 25) return { text: "MODERATE RISK", color: "text-yellow-500", border: "border-yellow-500", bg: "bg-yellow-950/20", animate: "" };
        return { text: "LOW RISK // OPTIMAL", color: "text-[#00FFC0]", border: "border-[#00FFC0]", bg: "bg-[#00FFC0]/10", animate: "" };
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);

        // Simulate brief processing time for kinetic effect
        setTimeout(() => {
            const dep = Number(deposit) || 0;
            const pct = Number(bonusPercent) || 0;
            const wag = Number(wagering) || 0;

            const bonusAmount = (dep * pct) / 100;
            const totalFunds = dep + bonusAmount;
            
            let totalWager = 0;
            // If type is D+B, the effective wagering on just the bonus is much higher.
            // For standard display, we just calculate the raw dollar amount needed.
            if (wagerType === 'bonus') {
                totalWager = bonusAmount * wag;
            } else {
                totalWager = (dep + bonusAmount) * wag;
            }

            // Calculate effective risk. If it's D+B, the 'stated' wagering is misleadingly low, so we bump it up for risk assessment.
            const effectiveRiskWager = wagerType === 'deposit_bonus' ? wag * (totalFunds / bonusAmount || 1) : wag;

            setResults({
                bonusAmount,
                totalFunds,
                totalWager,
                riskLevel: getRiskAnalysis(effectiveRiskWager)
            });

            setIsAnalyzing(false);
        }, 400); // 400ms "processing" delay
    };

    // Initial calculation on load
    React.useEffect(() => {
        handleAnalyze();
    }, []);

    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            {/* HEADER */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <Icons.Calculator className="text-[#00FFC0] h-8 w-8" />
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                        BONUS PROTOCOL ANALYZER
                    </h1>
                </div>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                    // DETERMINE THE TRUE COST OF OPERATOR INCENTIVES
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                
                {/* LEFT COLUMN: INPUT CIRCUIT (2/5 width) */}
                <Card className="lg:col-span-2 p-6 bg-[#0c0c0e] border-[#333]">
                    <h2 className="font-heading text-lg text-white uppercase mb-6 flex items-center gap-2 border-b border-[#333] pb-3">
                        <Icons.Settings className="h-5 w-5 text-[#00FFC0]" /> INPUT VARIABLES
                    </h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Deposit Amount ($)</label>
                            <Input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value === '' ? '' : Number(e.target.value))} min="0" className="font-mono text-lg" placeholder="100" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Bonus Percentage (%)</label>
                            <Input type="number" value={bonusPercent} onChange={(e) => setBonusPercent(e.target.value === '' ? '' : Number(e.target.value))} min="0" className="font-mono text-lg" placeholder="100" />
                        </div>
                         <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Wagering Requirement (x)</label>
                            <Input type="number" value={wagering} onChange={(e) => setWagering(e.target.value === '' ? '' : Number(e.target.value))} min="0" className="font-mono text-lg" placeholder="35" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Wagering Scope</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setWagerType('bonus')}
                                    className={`p-3 rounded-md border font-heading uppercase text-xs transition-all duration-200 active:scale-95 ${wagerType === 'bonus' ? 'bg-[#00FFC0] border-[#00FFC0] text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.3)]' : 'bg-[#14131c] border-[#333] text-[#8d8c9e] hover:text-white'}`}
                                >
                                    [ BONUS ONLY ]
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setWagerType('deposit_bonus')}
                                    className={`p-3 rounded-md border font-heading uppercase text-xs transition-all duration-200 active:scale-95 ${wagerType === 'deposit_bonus' ? 'bg-[#00FFC0] border-[#00FFC0] text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.3)]' : 'bg-[#14131c] border-[#333] text-[#8d8c9e] hover:text-white'}`}
                                >
                                    [ DEPOSIT + BONUS ]
                                </button>
                            </div>
                        </div>

                        <Button 
                            onClick={handleAnalyze} 
                            className="w-full mt-4 font-heading uppercase tracking-widest py-6 text-sm shadow-[0_0_20px_rgba(0,255,192,0.2)]"
                            disabled={isAnalyzing}
                        >
                            {isAnalyzing ? <Icons.Loader className="h-5 w-5 animate-spin" /> : 'ANALYZE WAGERING PROTOCOL'}
                        </Button>
                    </div>
                </Card>

                {/* RIGHT COLUMN: ANALYSIS OUTPUT CIRCUIT (3/5 width) */}
                <div className="lg:col-span-3 flex flex-col">
                     <Card className={`h-full p-6 md:p-8 bg-[#121212] border-[#333] relative overflow-hidden flex flex-col justify-center transition-all duration-300 ${isAnalyzing ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                        
                        {/* Background Grid Effect for Terminal feel */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,192,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                        {/* RISK METER */}
                        <div className={`mb-8 p-4 rounded-lg border-2 flex items-center justify-between ${results.riskLevel.bg} ${results.riskLevel.border} ${results.riskLevel.animate} transition-all duration-500`}>
                            <span className="font-heading uppercase text-sm text-white flex items-center gap-2">
                                <Icons.AlertTriangle className={`h-5 w-5 ${results.riskLevel.color}`} /> THREAT ASSESSMENT
                            </span>
                            <span className={`font-mono font-bold uppercase tracking-wider ${results.riskLevel.color}`}>
                                {results.riskLevel.text}
                            </span>
                        </div>

                        {/* PRIMARY METRIC */}
                        <div className="mb-10 text-center p-6 bg-[#0A0A0A] rounded-xl border border-[#333] shadow-2xl">
                            <p className="text-[#8d8c9e] font-heading uppercase tracking-widest text-sm mb-3">TOTAL WAGERING REQUIRED</p>
                            <p className="font-mono text-4xl md:text-6xl text-white font-bold tracking-tight">
                                <span className="text-[#00FFC0]">$</span>
                                {results.totalWager.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>

                        {/* SECONDARY METRICS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[#14131c] p-4 rounded-lg border border-[#333] flex justify-between items-center">
                                <span className="text-xs font-mono text-[#8d8c9e] uppercase">INITIAL STACK DEPLOYED</span>
                                <span className="font-mono text-xl text-white">${results.totalFunds.toLocaleString()}</span>
                            </div>
                             <div className="bg-[#14131c] p-4 rounded-lg border border-[#333] flex justify-between items-center">
                                <span className="text-xs font-mono text-[#8d8c9e] uppercase">ACQUIRED INTEL VALUE</span>
                                <span className="font-mono text-xl text-[#00FFC0]">+${results.bonusAmount.toLocaleString()}</span>
                            </div>
                        </div>

                    </Card>
                </div>
            </div>
        </div>
    );
};
