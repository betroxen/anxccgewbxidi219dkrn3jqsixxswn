
import React from 'react';
import { Button } from './Button';
import { Icons } from './icons';
import { Tooltip } from './Tooltip';

export interface Casino {
    id: string;
    name: string;
    logo: string;
    bonus: string;
    description: string;
    tags: string[];
    rating: number;
    reviewCount: number;
    withdrawalTime: string;
    certified: boolean;
}

interface CasinoCardProps {
    casino: Casino;
    onViewDetails: (id: string) => void;
}

export const CasinoCard: React.FC<CasinoCardProps> = ({ casino, onViewDetails }) => (
    <div className="card-hover flex flex-col bg-[#14131c] rounded-lg border border-[#3a3846] overflow-hidden transition-all duration-300 hover:border-[#1ed760]/50 hover:shadow-[0_0_20px_rgba(29,215,96,0.1)]">
        <div className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <img src={casino.logo} alt={`${casino.name} Logo`} className="w-16 h-16 rounded-md" loading="lazy" />
                    <div>
                        <h3 className="text-xl font-bold text-white font-heading">{casino.name}</h3>
                        {casino.certified && (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1ed760] mt-1">
                                <Icons.Shield className="w-3.5 h-3.5" /> Zap Certified
                                <Tooltip content="This casino meets our standards for fairness, security, and fast withdrawals.">
                                    <Icons.Info className="w-3.5 h-3.5 text-[#8d8c9e] cursor-pointer" />
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="my-5">
                <p className="text-xs text-[#8d8c9e] uppercase font-semibold mb-1">Welcome Bonus</p>
                <p className="text-lg font-bold text-[#1ed760]">{casino.bonus}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-[#000000]/50 p-3 rounded-md">
                    <p className="text-[#8d8c9e] flex items-center gap-1"><Icons.Star className="w-4 h-4 text-yellow-400"/> Rating</p>
                    <p className="font-semibold text-white mt-1">{casino.rating}/5 <span className="text-[#8d8c9e]">({casino.reviewCount})</span></p>
                </div>
                 <div className="bg-[#000000]/50 p-3 rounded-md">
                    <p className="text-[#8d8c9e] flex items-center gap-1"><Icons.Zap className="w-4 h-4 text-cyan-400"/> Payout</p>
                    <p className="font-semibold text-white mt-1">{casino.withdrawalTime}</p>
                </div>
            </div>

        </div>
        <div className="mt-auto p-6 pt-0">
             <Button onClick={() => onViewDetails(casino.id)} className="w-full">
                View Details & Claim
            </Button>
        </div>
    </div>
);
