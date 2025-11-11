import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCasinosData } from '../constants/casinos';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

export const BonusOffersPage = () => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState<'value' | 'wagering' | 'newest'>('value');

    const enrichedBonuses = useMemo(() => {
        return mockCasinosData
            .filter(c => c.tags.includes('high-bonus') || c.tags.includes('new'))
            .map(c => ({
                ...c,
                wagering: c.id === 'stake' ? 35 : c.id === 'duel' ? 40 : c.id === 'roobet' ? 45 : 30 + Math.floor(Math.random() * 15),
                minDeposit: c.id === 'stake' ? 20 : 50,
                maxCashout: c.id === 'stake' ? 'UNLIMITED' : '$5,000',
                code: c.id === 'stake' ? 'ZAPVIP' : 'AUTO'
            }))
            .sort((a, b) => {
                if (sortBy === 'wagering') return a.wagering - b.wagering;
                if (sortBy === 'newest') return (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0);
                return b.rating - a.rating;
            });
    }, [sortBy]);

    return (
        <div className="container mx-auto max-w-[1400px] p-4 py-6 md:p-10 page-fade-in">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase">ACTIVE BONUS OPERATIONS</h1>
            
            {enrichedBonuses.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
                    {enrichedBonuses.map((casino) => (
                        <Card key={casino.id} className="flex flex-col p-0">
                            <div className="p-5">
                                <h3 className="font-heading text-white">{casino.name}</h3>
                                <p className="text-sm text-[#00FFC0]">{casino.bonus}</p>
                            </div>
                            <Button onClick={() => navigate(`/casinos/${casino.id}`)} className="w-full mt-auto">
                                CLAIM BOUNTY
                            </Button>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-[#8d8c9e]">
                    <Icons.Gift className="h-16 w-16 mx-auto mb-4 opacity-50"/>
                    <p className="font-mono text-sm">NO ACTIVE BOUNTIES</p>
                </div>
            )}
        </div>
    );
};
