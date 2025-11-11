import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCasinosData } from '../constants/casinos';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Icons } from '../components/common/icons';

export const BonusOffersPage = () => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState<'value' | 'wagering' | 'newest'>('value');

    const enrichedBonuses = useMemo(() => {
        return mockCasinosData
            // ... (sorting logic remains)
    }, [sortBy]);

    return (
        <div className="container mx-auto max-w-[1400px] p-4 py-6 md:p-10 page-fade-in">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase">ACTIVE BONUS OPERATIONS</h1>
            
            {enrichedBonuses.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
                    {enrichedBonuses.map((casino) => (
                        <Card key={casino.id} className="flex flex-col p-0">
                            {/* ... */}
                            <Button onClick={() => navigate(`/casinos/${casino.id}`)}>
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
