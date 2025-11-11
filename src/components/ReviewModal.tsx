import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';
import { ToastContext, ToastContextType } from '../context/ToastContext';
import { mockCasinosData } from '../constants/casinos';
import { useSound } from '../context/SoundContext';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCasinoId: string | null;
}

// V2.0 VPR Protocol Steps
const STEPS = ['TARGET', 'SIGNAL', 'DATA', 'EVIDENCE', 'TRANSMIT'];

const CATEGORIES = [
    { value: 'PAYOUT', label: 'PAYOUT SPEED', desc: 'Time from request to wallet.' },
    { value: 'SUPPORT', label: 'SUPPORT CIRCUIT', desc: 'Competence & speed of service.' },
    { value: 'BONUS', label: 'BONUS T&C', desc: 'Clarity & fairness of terms.' },
    { value: 'UX', label: 'GENERAL UX', desc: 'Interface, mobile, loading.' },
];

const PRIORITIES = [
    { value: 'STANDARD', label: 'STANDARD', color: 'text-[#8d8c9e]' },
    { value: 'ELEVATED', label: 'ELEVATED (Severe Delay)', color: 'text-yellow-500' },
    { value: 'CRITICAL', label: 'CRITICAL (Security/Fraud)', color: 'text-red-500' },
];

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, initialCasinoId }) => {
  const toastCtx = useContext(ToastContext) as ToastContextType | undefined;
  const showToast = toastCtx?.showToast ?? (() => {});
  const { playSound } = useSound();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State - VPR Protocol V2.0
  const [formData, setFormData] = useState({
      targetOperator: initialCasinoId || '',
      incidentDate: '',
      category: 'PAYOUT',
      priority: 'STANDARD',
      ratingPayout: 0,
      ratingTerms: 0,
      ratingSupport: 0,
      summary: '',
      evidenceUrl: '',
      txId: '',
      attestData: false,
      attestTerms: false
  });

  // Reset on open
  useEffect(() => {
      if (isOpen) {
          setCurrentStep(initialCasinoId ? 1 : 1);
          setFormData({
              targetOperator: initialCasinoId || '',
              incidentDate: new Date().toISOString().split('T')[0], // Default to today
              category: 'PAYOUT',
              priority: 'STANDARD',
              ratingPayout: 0,
              ratingTerms: 0,
              ratingSupport: 0,
              summary: '',
              evidenceUrl: '',
              txId: '',
              attestData: false,
              attestTerms: false
          });
          setSearchTerm('');
      }
  }, [isOpen, initialCasinoId]);

  const selectedCasino = useMemo(() => mockCasinosData.find(c => c.id === formData.targetOperator), [formData.targetOperator]);
  const filteredCasinos = useMemo(() => {
      if (!searchTerm) return mockCasinosData.slice(0, 5);
      return mockCasinosData.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleInputChange = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
      switch (currentStep) {
          case 1: // TARGET
              if (!formData.targetOperator) { showToast("VPR ERROR: Target Operator required.", "error"); return false; }
              if (!formData.incidentDate) { showToast("VPR ERROR: Incident Date required.", "error"); return false; }
              return true;
          case 2: // SIGNAL
              return true;
          case 3: // DATA CONTRACT
              if (formData.ratingPayout === 0 || formData.ratingTerms === 0 || formData.ratingSupport === 0) {
                  showToast("DATA INCOMPLETE: All metrics must be graded (1-5).", "error"); return false;
              }
              if (formData.summary.length < 50) {
                   showToast("DATA INCOMPLETE: Summary must be detailed (min 50 chars).", "error"); return false;
              }
              return true;
          case 4: // EVIDENCE
              if (!formData.evidenceUrl) {
                  showToast("EVIDENCE MISSING: VPR requires verifiable proof URL.", "error"); return false;
              }
              return true;
          case 5: // ATTESTATION
              if (!formData.attestData || !formData.attestTerms) {
                   showToast("TRANSMISSION FAILED: Mandatory attestations required.", "error"); return false;
              }
              return true;
          default: return true;
      }
  };

  const handleNext = () => {
      if (validateStep()) {
          setCurrentStep(prev => prev + 1);
      }
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = () => {
      if (!validateStep()) return;
      showToast("VPR TRANSMITTED. Validation Queue activated. +50 SSP Pending.", "success");
      onClose();
  };

  // Custom Metric Rater Component
  const MetricRater = ({ label, field }: { label: string, field: 'ratingPayout' | 'ratingTerms' | 'ratingSupport' }) => (
    <div className="bg-[#0c0c0e] p-4 rounded-lg border border-[#3a3846]">
        <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-3">{label}</label>
        <div className="flex justify-between items-center gap-2">
            <span className="text-xs text-[#8d8c9e] font-mono">FAIL (1)</span>
            <div className="flex gap-1 flex-1 justify-center">
                {[1, 2, 3, 4, 5].map((val) => (
                    <button
                        key={val}
                        onClick={() => {
                            handleInputChange(field, val);
                            playSound('click_secondary', 0.1 + (val * 0.05));
                        }}
                        className={`h-10 flex-1 max-w-[50px] rounded-sm font-bold transition-all border ${
                            formData[field] >= val 
                            ? 'bg-[#00FFC0] border-[#00FFC0] text-black shadow-[0_0_10px_rgba(0,255,192,0.3)]' 
                            : 'bg-[#14131c] border-[#3a3846] text-[#8d8c9e] hover:border-white/30'
                        }`}
                    >
                        {val}
                    </button>
                ))}
            </div>
            <span className="text-xs text-[#8d8c9e] font-mono">OPTIMAL (5)</span>
        </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-xl bg-[#14131c] border border-[#3a3846] shadow-2xl animate-fadeIn flex flex-col my-auto max-h-[95vh]">
        
        {/* PROTOCOL HEADER */}
        <div className="p-6 border-b border-[#3a3846] bg-[#0c0c0e] rounded-t-xl">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-white flex items-center gap-3 uppercase">
                        <Icons.Database className="h-6 w-6 text-[#00FFC0] animate-pulse" /> 
                        ZAP VPR SUBMISSION PROTOCOL
                    </h2>
                    <p className="text-[#00FFC0] font-mono text-xs uppercase tracking-widest mt-1">
                        // VALIDATED PLAYER REPORT // STATUS: ACTIVE
                    </p>
                </div>
                <button onClick={onClose} className="text-[#8d8c9e] hover:text-white bg-[#14131c] p-2 rounded-md border border-[#3a3846] hover:border-red-500 transition-colors">
                    <Icons.X className="h-5 w-5" />
                </button>
            </div>

            {/* TACTICAL PROGRESS BAR */}
            <div className="mb-2 flex justify-between text-xs font-mono uppercase tracking-wider">
                {STEPS.map((step, i) => (
                    <span key={step} className={`${currentStep > i + 1 ? 'text-[#00FFC0]' : currentStep === i + 1 ? 'text-white font-bold' : 'text-[#3a3846]'}`}>
                        [{i + 1}] {step}
                    </span>
                ))}
            </div>
            <div className="relative h-1.5 bg-[#24232d] rounded-full overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-[#00FFC0] transition-all duration-300 ease-out shadow-[0_0_10px_#00FFC0]"
                    style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                />
            </div>
        </div>

        {/* MISSION DIRECTIVE */}
        <div className="bg-[#00FFC0]/5 border-b border-[#00FFC0]/10 p-3 px-6 text-xs text-[#8d8c9e] font-mono">
            <strong className="text-[#00FFC0]">MISSION DIRECTIVE:</strong> We only accept raw, verifiable data. Subjective noise will be purged by the validation queue.
        </div>

        {/* SCROLLABLE INTEL AREA */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar bg-[#14131c]">
            
            {/* STEP 1: TARGET IDENTIFICATION */}
            {currentStep === 1 && (
                <div className="animate-fadeIn space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Target Operator (The Subject)</label>
                             {selectedCasino ? (
                                <div className="flex items-center justify-between p-3 bg-[#00FFC0]/10 border border-[#00FFC0] rounded-md">
                                    <div className="flex items-center gap-3">
                                        <img src={selectedCasino.logo} alt={selectedCasino.name} className="w-8 h-8 rounded-md" />
                                        <span className="font-bold text-white">{selectedCasino.name}</span>
                                    </div>
                                    <button onClick={() => handleInputChange('targetOperator', '')} className="text-[#8d8c9e] hover:text-white text-xs uppercase">Change</button>
                                </div>
                            ) : (
                                <div className="relative">
                                    <Icons.Search className="absolute left-3 top-3 text-[#8d8c9e] h-4 w-4" />
                                    <Input 
                                        placeholder="SEARCH GRID..." 
                                        className="pl-10 font-mono"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        autoFocus
                                    />
                                    {searchTerm && (
                                        <div className="absolute top-full left-0 w-full bg-[#14131c] border border-[#3a3846] rounded-md mt-1 max-h-40 overflow-y-auto z-20">
                                            {filteredCasinos.map(c => (
                                                <button key={c.id} onClick={() => { handleInputChange('targetOperator', c.id); setSearchTerm(''); }} className="w-full text-left p-2 hover:bg-[#24232d] flex items-center gap-2">
                                                    <img src={c.logo} className="w-6 h-6 rounded" alt="" /> <span className="text-white">{c.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Your Handle (Alias)</label>
                            <Input value="DegenGambler [LVL 42]" readOnly className="font-mono bg-[#0c0c0e] border-[#3a3846] text-[#00FFC0] opacity-80 cursor-not-allowed" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Date of Incident *</label>
                        <Input 
                            type="date" 
                            value={formData.incidentDate} 
                            onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                            className="font-mono" 
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>
            )}

            {/* STEP 2: SIGNAL & FOCUS */}
            {currentStep === 2 && (
                <div className="animate-fadeIn space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Report Category (Focus)</label>
                            <div className="space-y-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.value}
                                        onClick={() => handleInputChange('category', cat.value)}
                                        className={`w-full p-3 rounded-md border text-left transition-all ${
                                            formData.category === cat.value 
                                            ? 'bg-[#00FFC0]/10 border-[#00FFC0] text-white' 
                                            : 'bg-[#0c0c0e] border-[#3a3846] text-[#8d8c9e] hover:border-[#8d8c9e]'
                                        }`}
                                    >
                                        <div className="font-bold font-heading uppercase text-sm">{cat.label}</div>
                                        <div className="text-xs opacity-70">{cat.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Signal Priority</label>
                            <div className="space-y-2">
                                {PRIORITIES.map(pri => (
                                    <button
                                        key={pri.value}
                                        onClick={() => handleInputChange('priority', pri.value)}
                                        className={`w-full p-4 rounded-md border text-left transition-all font-heading uppercase ${
                                            formData.priority === pri.value 
                                            ? `bg-[#14131c] border-current ${pri.color}` 
                                            : 'bg-[#0c0c0e] border-[#3a3846] text-[#8d8c9e] hover:border-[#8d8c9e]'
                                        }`}
                                    >
                                        {pri.label}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-[#8d8c9e] mt-4 p-3 bg-[#0c0c0e] rounded border border-[#3a3846]">
                                <Icons.Info className="inline-block w-3 h-3 mr-1" /> Misusing "CRITICAL" priority will result in immediate VPR rejection and potential reputation loss.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 3: THE RAW DATA CONTRACT */}
            {currentStep === 3 && (
                <div className="animate-fadeIn space-y-6">
                    <p className="text-sm text-[#8d8c9e] mb-4">Grade the operator based on measurable ZAP metrics. Be purely objective.</p>
                    
                    <div className="space-y-4">
                        <MetricRater label="PAYOUT EFFICIENCY (Speed vs Advertised)" field="ratingPayout" />
                        <MetricRater label="CLARITY OF TERMS (No Hidden Clauses)" field="ratingTerms" />
                        <MetricRater label="SUPPORT COMPETENCE (Resolution Time)" field="ratingSupport" />
                    </div>

                    <div className="mt-8">
                        <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-2">
                            Report Summary (The Evidence-Backed Story) *
                        </label>
                        <textarea 
                            rows={6}
                            className="w-full rounded-md border border-[#3a3846] bg-[#0c0c0e] p-4 text-white placeholder:text-[#8d8c9e] focus:outline-none focus:ring-2 focus:ring-[#00FFC0] resize-none font-mono text-sm"
                            placeholder="STATE THE FACTS: What happened, expected outcome, actual outcome. No emotion, just data. (Min 50 chars)"
                            value={formData.summary}
                            onChange={(e) => handleInputChange('summary', e.target.value)}
                        />
                        <div className={`text-xs text-right mt-1 ${formData.summary.length < 50 ? 'text-red-500' : 'text-[#00FFC0]'}`}>
                            {formData.summary.length} / 50 minimum chars
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 4: EVIDENCE UPLOAD */}
            {currentStep === 4 && (
                <div className="animate-fadeIn space-y-8">
                    <div className="bg-[#0c0c0e] p-6 rounded-lg border border-[#3a3846] text-center">
                        <Icons.Shield className="w-12 h-12 mx-auto text-[#3a3846] mb-4" />
                        <h3 className="text-white font-heading uppercase mb-2">Trust requires verification</h3>
                        <p className="text-[#8d8c9e] text-sm max-w-md mx-auto">
                            A VPR without evidence is just noise. Upload screenshots, screen recordings, or chat logs to a secure host (Imgur, Google Drive, etc.) and link it below.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-2">Evidence URL (Immutable Link) *</label>
                        <div className="relative">
                            <Icons.Link className="absolute left-3 top-3 text-[#8d8c9e] h-5 w-5" />
                            <Input 
                                placeholder="https://..." 
                                className="pl-10 font-mono"
                                type="url"
                                value={formData.evidenceUrl}
                                onChange={(e) => handleInputChange('evidenceUrl', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Transaction ID / Hash (Optional)</label>
                        <Input 
                            placeholder="0x..." 
                            className="font-mono"
                            value={formData.txId}
                            onChange={(e) => handleInputChange('txId', e.target.value)}
                        />
                        <p className="text-xs text-[#8d8c9e] mt-2">If this report concerns a specific deposit or withdrawal, the TxID significantly speeds up validation.</p>
                    </div>
                </div>
            )}

            {/* STEP 5: FINAL ATTESTATION */}
            {currentStep === 5 && (
                <div className="animate-fadeIn space-y-6">
                    <div className="border-l-4 border-red-500 bg-red-950/10 p-4 rounded-r-lg mb-6">
                        <h3 className="font-heading text-red-500 uppercase mb-2 flex items-center gap-2">
                            <Icons.Lock className="h-5 w-5" /> Mandatory Checkpoint
                        </h3>
                        <p className="text-[#8d8c9e] text-sm">
                            Submitting false data to manipulate the ZAP Score is a violation of the Circuit Rules. Violators will be permanently unplugged and forfeit all SSP rewards.
                        </p>
                    </div>

                    <div className="space-y-4 bg-[#0c0c0e] p-6 rounded-lg border border-[#3a3846]">
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="peer sr-only"
                                    checked={formData.attestData}
                                    onChange={(e) => handleInputChange('attestData', e.target.checked)}
                                />
                                <div className="h-6 w-6 border-2 border-[#3a3846] rounded bg-[#14131c] peer-checked:bg-[#00FFC0] peer-checked:border-[#00FFC0] transition-all flex items-center justify-center">
                                    <Icons.CheckCircle className={`h-4 w-4 text-black ${formData.attestData ? 'opacity-100' : 'opacity-0'}`} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <strong className="text-white font-heading uppercase text-sm block mb-1">DATA INTEGRITY ATTESTATION</strong>
                                <p className="text-xs text-[#8d8c9e] leading-relaxed">
                                    I confirm this VPR contains raw, un-fictionalized data and verifiable facts. I attest that I am being 100% honest and have not manipulated any evidence.
                                </p>
                            </div>
                        </label>

                         <div className="h-px bg-[#3a3846]/50 w-full my-2"></div>

                         <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="peer sr-only"
                                    checked={formData.attestTerms}
                                    onChange={(e) => handleInputChange('attestTerms', e.target.checked)}
                                />
                                <div className="h-6 w-6 border-2 border-[#3a3846] rounded bg-[#14131c] peer-checked:bg-[#00FFC0] peer-checked:border-[#00FFC0] transition-all flex items-center justify-center">
                                    <Icons.CheckCircle className={`h-4 w-4 text-black ${formData.attestTerms ? 'opacity-100' : 'opacity-0'}`} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <strong className="text-white font-heading uppercase text-sm block mb-1">T&C CONTRACT ACCEPTANCE</strong>
                                <p className="text-xs text-[#8d8c9e] leading-relaxed">
                                    I accept the ZAP Terms & Conditions and understand that submitting false data will result in account suspension and removal of all accrued SSP rewards.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            )}

        </div>

        {/* TACTICAL FOOTER */}
        <div className="p-6 border-t border-[#3a3846] bg-[#0c0c0e] rounded-b-xl flex justify-between items-center">
            {currentStep > 1 ? (
                <Button variant="ghost" onClick={handleBack} className="text-[#8d8c9e] hover:text-white">
                    <Icons.ChevronLeft className="mr-2 h-4 w-4" /> BACK
                </Button>
            ) : (
                <div></div> 
            )}
            
            {currentStep < STEPS.length ? (
                 <Button onClick={handleNext} className="font-heading uppercase tracking-wider px-8">
                    NEXT PHASE <Icons.ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                 <Button 
                    onClick={handleSubmit} 
                    className="shadow-[0_0_30px_rgba(0,255,192,0.4)] font-heading uppercase tracking-widest py-4 px-6 h-auto text-sm md:text-base"
                    disabled={!formData.attestData || !formData.attestTerms}
                >
                    <Icons.Zap className="mr-2 h-5 w-5" /> TRANSMIT VPR & ACTIVATE QUEUE
                </Button>
            )}
        </div>

      </div>
    </div>
  );
};
