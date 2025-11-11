import React, { useState, useContext } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { ToastContext } from '../context/ToastContext';
import { Toggle } from '../components/Toggle';

// --- MOCK INTEL STREAM DATA ---
const INTEL_POSTS: any[] = [];

export const CommunityHubPage = () => {
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };
    const [filterPriority, setFilterPriority] = useState('ALL');
    const [filterVerified, setFilterVerified] = useState(false);
    const [intelMessage, setIntelMessage] = useState('');

    const handleTransmit = () => {
        if (intelMessage.length < 10) {
            showToast("TRANSMISSION FAILED: Intel too short.", "error");
            return;
        }
        showToast("SIGNAL TRANSMITTED to the Grid.", "success");
        setIntelMessage('');
    };

    const handleCopyReferral = () => {
        navigator.clipboard.writeText("ZAP-DG42-INTEL");
        showToast("REFERRAL HANDLE COPIED.", "success");
    };

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'BIG WIN': return 'text-[#00FFC0] border-[#00FFC0] bg-[#00FFC0]/10';
            case 'CRITICAL': return 'text-red-500 border-red-500 bg-red-950/30 animate-pulse';
            default: return 'text-blue-400 border-blue-400 bg-blue-950/30';
        }
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 py-6 md:p-10 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Icons.Activity className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                        ZAP INTEL STREAM: <span className="text-[#00FFC0] text-glow">REAL-TIME ALPHA</span>
                    </h1>
                </div>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                    // STATUS: LIVE SIGNAL. UNFILTERED INSIGHTS FROM THE FRONT LINE.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* LEFT COLUMN: FILTERS & TRANSMIT (1/4) */}
                <div className="space-y-6">
                    {/* 3. TRANSMIT SIGNAL */}
                    <Card className="p-5 bg-[#0c0c0e] border-[#00FFC0]/30">
                        <h2 className="font-heading text-white uppercase mb-4 flex items-center gap-2 text-sm">
                            <Icons.Zap className="h-4 w-4 text-[#00FFC0]" /> TRANSMIT SIGNAL
                        </h2>
                        <textarea 
                            className="w-full bg-[#1A1A