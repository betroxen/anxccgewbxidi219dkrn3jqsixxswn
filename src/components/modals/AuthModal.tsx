import React, { useState, useEffect } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { useUI } from '@/context/UIContext';
import { Icons } from '@/components/icons';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ZapLogo } from '@/components/ZapLogo';

export const AuthModal: React.FC = () => {
  const { login, register } = useAuth();
  const { isAuthModalOpen: isOpen, closeAuthModal: onClose, authModalTab: initialTab } = useUI();
  
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      resetForm();
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
      if (!password) { setPasswordStrength(0); return; }
      let score = 0;
      if (password.length >= 12) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[!@#$%^&*]/.test(password)) score++;
      if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
      setPasswordStrength(score);
  }, [password]);

  const resetForm = () => {
      setEmail(''); setPassword(''); setUsername(''); setConfirmPassword('');
      setTermsAccepted(false); setPasswordStrength(0); setError(''); setIsLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        if (activeTab === 'login') {
            if (!email || !password) { throw new Error('CREDENTIALS MISSING'); }
            await login(email, password);
        } else {
            if (!username || !email || !password || !confirmPassword) { throw new Error('ALL FIELDS MANDATORY'); }
            if (password !== confirmPassword) { throw new Error('PASSKEY MISMATCH'); }
            if (passwordStrength < 3) { throw new Error('PASSKEY STRENGTH INSUFFICIENT'); }
            if (!termsAccepted) { throw new Error('AFFIRMATION PROTOCOL REQUIRED'); }
            await register({ username, email, password });
        }
        setTimeout(() => {
            onClose();
            resetForm();
        }, 400);
    } catch (err: any) {
        setError(err.message || 'AUTHENTICATION FAILED');
    } finally {
        setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  const isLoginValid = email.length > 0 && password.length > 0;
  const isRegisterValid = username.length > 0 && email.length > 0 && password.length >= 12 && password === confirmPassword && termsAccepted && passwordStrength >= 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:py-8">
      <div className="fixed inset-0 bg-[#000000]/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative w-full sm:max-w-[480px] max-h-[95vh] flex flex-col bg-[#0c0c0e] border border-[#00FFC0]/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-modal-enter overflow-hidden">
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#8d8c9e] hover:text-[#00FFC0] transition-colors p-2 z-20 bg-[#0c0c0e]/50 rounded-full sm:bg-transparent">
            <Icons.X className="h-5 w-5" />
        </button>
        <div className="flex-shrink-0 p-5 pb-0 sm:p-6 sm:pb-0 text-center group relative z-10 bg-[#0c0c0e]">
            <ZapLogo className="mx-auto mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-2xl inline-block" iconClassName="h-8 w-8 sm:h-10 sm:w-10" />
            <h2 className="font-heading text-lg sm:text-xl text-white uppercase tracking-widest">
                {activeTab === 'login' ? 'WELCOME BACK, OPERATOR' : 'INITIATE NEW PROFILE'}
            </h2>
            <p className="text-[10px] sm:text-xs font-mono text-[#00FFC0] mt-1 sm:mt-2 tracking-wider opacity-80">
                {activeTab === 'login' ? '// AUTHENTICATION REQUIRED TO PROCEED' : '// SECURE YOUR SPOT ON THE GRID'}
            </p>
        </div>
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {activeTab === 'register' && (
                    <div className="space-y-1">
                        <label className="text-[10px] sm:text-xs font-mono text-[#8d8c9e] uppercase ml-1">Handle (Alias)</label>
                        <Input placeholder="UNIQUE_ID..." value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                )}
                <div className="space-y-1">
                    <label className="text-[10px] sm:text-xs font-mono text-[#8d8c9e] uppercase ml-1">Email Protocol</label>
                    <Input type="email" placeholder="OPERATOR@ZAP.GG" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1">
                     <div className="flex justify-between">
                        <label className="text-[10px] sm:text-xs font-mono text-[#8d8c9e] uppercase ml-1">Passkey</label>
                        {activeTab === 'register' && (
                            <span className={`text-[10px] font-mono uppercase ${passwordStrength >= 3 ? 'text-[#00FFC0]' : passwordStrength >= 2 ? 'text-yellow-500' : 'text-[#8d8c9e]'}`}>
                                STRENGTH: {passwordStrength}/4
                            </span>
                        )}
                    </div>
                    <Input type="password" placeholder={activeTab === 'register' ? "MIN 12 CHARS (A-Z, 0-9, #$@)" : "••••••••"} value={password} onChange={(e) => setPassword(e.target.value)} />
                    {activeTab === 'register' && (
                        <div className="flex gap-1 h-1 mt-1.5">
                            {[1, 2, 3, 4].map(level => (
                                <div key={level} className={`flex-1 rounded-full transition-all duration-300 ${passwordStrength >= level ? (passwordStrength >= 3 ? 'bg-[#00FFC0]' : 'bg-yellow-500') : 'bg-[#333]'}`} />
                            ))}
                        </div>
                    )}
                </div>
                {activeTab === 'register' && (
                    <>
                        <div className="space-y-1">
                            <label className="text-[10px] sm:text-xs font-mono text-[#8d8c9e] uppercase ml-1">Confirm Passkey</label>
                            <Input type="password" placeholder="RE-ENTER PASSKEY" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer group p-2 sm:p-3 rounded border border-[#333] hover:border-[#3a3846] bg-[#0A0A0A] transition-colors">
                            <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 accent-[#00FFC0]" />
                            <span className="text-[10px] text-[#8d8c9e] leading-tight font-mono uppercase">
                                I AFFIRM I AM 18+ AND ACCEPT THE <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#00FFC0] hover:underline">TERMS</a> AND <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#00FFC0] hover:underline">PRIVACY POLICY</a>.
                            </span>
                        </label>
                    </>
                )}
                {error && (
                    <div className="p-3 bg-red-950/30 border border-red-900/50 rounded text-red-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                        <Icons.AlertTriangle className="h-4 w-4 shrink-0" /> {error}
                    </div>
                )}
                <Button type="submit" className="w-full mt-4" size="lg" loading={isLoading} disabled={(activeTab === 'login' ? !isLoginValid : !isRegisterValid) || isLoading}>
                    {activeTab === 'login' ? 'ESTABLISH CONNECTION' : 'CREATE OPERATOR PROFILE'}
                </Button>
            </form>
            <div className="mt-4 sm:mt-5 text-center">
                <p className="text-xs text-[#666] font-mono uppercase">
                    {activeTab === 'login' ? 'NEW TO THE GRID?' : 'ALREADY OPERATIVE?'}
                    <button onClick={() => { resetForm(); setActiveTab(activeTab === 'login' ? 'register' : 'login'); }} className="text-white hover:text-[#00FFC0] ml-1 font-bold transition-colors">
                        {activeTab === 'login' ? 'INITIATE NEW PROFILE' : 'ESTABLISH CONNECTION'}
                    </button>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
