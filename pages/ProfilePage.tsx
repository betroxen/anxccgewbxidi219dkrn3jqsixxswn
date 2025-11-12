
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { ProgressBar } from '../components/ProgressBar';
import { Input } from '../components/Input';
import { useToast } from '../context/ToastContext';
import { mockCasinosData } from '../constants/casinos';

interface LinkedAccount {
    id: string;
    casinoId: string;
    casinoName: string;
    username: string;
    email: string;
    verified: boolean;
    public: boolean;
}

export const ProfilePage = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();

    // Editable Profile State
    const [bannerGradient, setBannerGradient] = useState<'green' | 'purple'>('green');
    const [profileImage, setProfileImage] = useState('https://placehold.co/150x150/00FFC0/000000?text=DG');
    
    // Operator Linkage State
    const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([
         { id: '1', casinoId: 'stake', casinoName: 'Stake', username: 'DegenG_Official', email: '***@zap.gg', verified: true, public: true }
    ]);
    const [linkForm, setLinkForm] = useState({
        targetCasino: '',
        username: '',
        email: '',
        attestation: false
    });

    // Verification Matrix State (Mocked)
    const mfaStatus = true;
    const walletStatus = true;
    const discordHandle = "@DegenGambler";

    const toggleBanner = () => {
        setBannerGradient(prev => prev === 'green' ? 'purple' : 'green');
        showToast("Profile theme updated.", "success");
    };

    const cycleProfileImage = () => {
        // Mock functionality to cycle through a few placeholder images
        const images = [
            'https://placehold.co/150x150/00FFC0/000000?text=DG',
            'https://placehold.co/150x150/8b5cf6/000000?text=DG',
            'https://placehold.co/150x150/3b82f6/000000?text=DG'
        ];
        const currentIndex = images.indexOf(profileImage);
        const nextIndex = (currentIndex + 1) % images.length;
        setProfileImage(images[nextIndex]);
        showToast("Profile picture updated.", "success");
    };

    const handleLinkAccount = (e: React.FormEvent) => {
        e.preventDefault();
        if (linkedAccounts.length >= 50) {
            showToast("LINKAGE ERROR: Maximum of 50 accounts reached.", "error");
            return;
        }
        if (!linkForm.targetCasino || !linkForm.username || !linkForm.email || !linkForm.attestation) {
             showToast("LINKAGE FAILED: All fields and attestation are mandatory.", "error");
             return;
        }

        const casino = mockCasinosData.find(c => c.id === linkForm.targetCasino);
        if (!casino) return;

        const newAccount: LinkedAccount = {
            id: Math.random().toString(36).substr(2, 9),
            casinoId: casino.id,
            casinoName: casino.name,
            username: linkForm.username,
            email: linkForm.email,
            verified: false, // Pending verification in real app
            public: false // Default to private
        };

        setLinkedAccounts([...linkedAccounts, newAccount]);
        setLinkForm({ targetCasino: '', username: '', email: '', attestation: false });
        showToast(`LINK INITIATED: Verifying ${casino.name} account...`, "info");
        
        // Simulate verification success after 2s
        setTimeout(() => {
             setLinkedAccounts(prev => prev.map(acc => acc.id === newAccount.id ? { ...acc, verified: true } : acc));
             showToast(`LINK ESTABLISHED: ${casino.name} account verified.`, "success");
        }, 2000);
    };

    const removeLinkedAccount = (id: string) => {
        if (window.confirm("WARNING: Disconnecting this account will remove its verified history from your ZAP Score. Continue?")) {
            setLinkedAccounts(prev => prev.filter(acc => acc.id !== id));
            showToast("LINK TERMINATED. Account disconnected.", "info");
        }
    };

    const togglePublicStatus = (id: string) => {
        setLinkedAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, public: !acc.public } : acc));
    };

    const bannerClasses = bannerGradient === 'green' 
        ? 'bg-gradient-to-r from-[#121212] via-[#0A2A20] to-[#121212]' 
        : 'bg-gradient-to-r from-[#12121