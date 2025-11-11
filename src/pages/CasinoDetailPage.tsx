import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icons } from '../components/common/icons';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { mockCasinosData } from '../constants/casinos';
import { useUI } from '../context/UIContext';

export const CasinoDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { openReviewModal } = useUI();

    const [activeTab, setActiveTab] = useState('overview');
    const casino = useMemo(() => mockCasinosData.find(c => c.id === id), [id]);

    if (!casino) {
        return (
            <div className="p-10 flex flex-col items-center justify-center text-[#8d8c9e] h-full page-fade-in">
                <Icons.AlertTriangle className="h-16 w-16 mb-4 opacity-20 text-red-500" />
                <h2 className="text-2xl font-heading text-white mb-2 uppercase tracking-wider">OPERATOR NOT FOUND</h2>
                <p className="font-mono text-sm mb-8">// ERROR 404: TARGET INVALID OR DELISTED</p>
                <Button onClick={() => navigate('/casinos')} variant="secondary" className="font-mono uppercase">RETURN TO GRID</Button>
            </div>
        );
    }

    const isEternalCrown = casino.specialRanking === 'ETERNAL CROWN';
    const TABS = [
        { id: 'overview', label: 'OPERATIONAL INTEL', icon: Icons.LayoutDashboard },
        { id: 'kyc', label: 'KYC & COMPLIANCE PROTOCOL', icon: Icons.Shield },
        { id: 'vprs', label: 'VPR FEED (COMMUNITY)', icon: Icons.MessageSquare },
    ];

    return (
        <div className="container mx-auto max-w-7xl p-4 py-6 md:p-10 page-fade-in">
            <Button variant="ghost" onClick={() => navigate('/casinos')} className="mb-6">
                <Icons.ChevronLeft className="h-4 w-4 mr-2" /> BACK TO DIRECTORY
            </Button>

            <Card className={`p-6 md:p-10 mb-8`}>
                <h1 className="text-4xl font-heading font-bold text-white uppercase">{casino.name}</h1>
                 <Button onClick={() => openReviewModal(casino.id)} className="mt-4">
                    SUBMIT VPR INTEL <Icons.Edit className="h-4 w-4 ml-2" />
                </Button>
            </Card>
            
            {/* The rest of the detailed view... */}
        </div>
    );
};
