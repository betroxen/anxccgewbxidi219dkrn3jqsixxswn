
import React, { useState, useEffect, useMemo } from 'react';
import { Icons } from '../icons';
import { Button } from '../Button';
import { Input } from '../Input';
import { useToast } from '../../context/ToastContext';
import { mockCasinosData } from '../../constants/casinos';
import { useSound } from '../../context/SoundContext';
import { useUI } from '../../context/UIContext';

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

export const ReviewModal: React.FC = () => {
  const { isReviewModalOpen: isOpen, closeReviewModal: onClose, reviewCasinoId: initialCasinoId } = useUI();
  const { showToast } = useToast();
  const { playSound } = useSound();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
      if (isOpen) {
          playSound('ui_open');
          setCurrentStep(initialCasinoId ? 1 : 1);
          setFormData({
              targetOperator: initialCasinoId || '',
              incidentDate: new Date().toISOString().split('T')[0],
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
  }, [isOpen, initialCasinoId, playSound]);

  const selectedCasino = useMemo(() => mockCasinosData.find(c => c.id === formData.targetOperator), [formData.targetOperator]);
  const filteredCasinos = useMemo(() => {
      if (!searchTerm) return mockCasinosData.slice(0, 5);
      return mockCasinosData.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleInputChange = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
      // Validation logic...
      return true;
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
        {/* Modal content from original file */}
        <div className="p-6 border-b border-[#3a3846] bg-[#0c0c0e] rounded-t-xl">
            {/* Header content */}
        </div>
        <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar bg-[#14131c]">
            {/* Step content */}
        </div>
        <div className="p-6 border-t border-[#3a3846] bg-[#0c0c0e] rounded-b-xl flex justify-between items-center">
            {currentStep > 1 ? (
                <Button variant="ghost" onClick={handleBack} className="text-[#8d8c9e] hover:text-white">
                    <Icons.ChevronLeft className="mr-2 h-4 w-4" /> BACK
                </Button>
            ) : (
                <div /> 
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
