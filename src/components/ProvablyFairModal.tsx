import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

interface ProvablyFairModalProps {
    isOpen: boolean;
    onClose: () => void;
    gameName: string;
    serverSeedHash: string;
    clientSeed: string;
    nonce: number;
    onRotateSeeds: (newClientSeed: string) => void;
}

export const ProvablyFairModal: React.FC<ProvablyFairModalProps> = ({
    isOpen,
    onClose,
    gameName,
    serverSeedHash,
    clientSeed,
    nonce,
    onRotateSeeds
}) => {
    const [newClientSeed, setNewClientSeed] = useState(clientSeed);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
            
            <div className="relative w-full max-w-md bg-[#0c0c0e] border border-[#00FFC0]/30 rounded-xl shadow-2xl animate-depth-in overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-[#14131c] border-b border-[#333] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Icons.Lock className="h-5 w-5 text-[#00FFC0]" />
                        <h3 className="font-heading text-white text-sm uppercase tracking-widest">
                            FAIRNESS PROTOCOL: {gameName}
                        </h3>
                    </div>
                    <button onClick={onClose} className="text-[#8d8c9e] hover:text-white transition-colors">
                        <Icons.X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Info Banner */}
                    <div className="bg-[#00FFC0]/5 border-l-2 border-[#00FFC0] p-3 text-xs font-mono text-[#8d8c9e] leading-relaxed">
                        <strong className="text-[#00FFC0]">VERIFICATION ACTIVE:</strong> Outcomes are predetermined by this seed pair. Change your Client Seed to randomize the future chain.
                    </div>

                    {/* Active Seeds */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-1">Active Server Seed (Hashed)</label>
                            <div className="bg-[#1A1A1A] border border-[#333] rounded p-2.5 flex items-center gap-2">
                                <Icons.Lock className="h-3 w-3 text-[#00FFC0] shrink-0" />
                                <code className="text-xs text-white truncate font-mono">{serverSeedHash}</code>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-1">Client Seed</label>
                                <Input 
                                    value={newClientSeed}
                                    onChange={(e) => setNewClientSeed(e.target.value)}
                                    className="font-mono text-xs h-10 bg-[#0A0A0A] border-[#333] focus:border-[#00FFC0]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-1">Nonce</label>
                                <div className="h-10 bg-[#1A1A1A] border border-[#333] rounded flex items-center px-3 font-mono text-white">
                                    {nonce}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-2">
                        <Button 
                            onClick={() => {
                                onRotateSeeds(newClientSeed);
                                onClose();
                            }}
                            className="w-full font-heading uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,192,0.2)]"
                        >
                            ROTATE SEED PAIR
                        </Button>
                    </div>

                </div>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(0,255,192,0.02)_50%,transparent_100%)] bg-[length:100%_3px] animate-scanline"></div>
            </div>
        </div>
    );
};
