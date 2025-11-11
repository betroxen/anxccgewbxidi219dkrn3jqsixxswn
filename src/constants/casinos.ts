export interface CasinoKYC {
    level1: string;
    level2: string;
    level3: string;
    level4: string;
}

export interface ZeroEdgeIntel {
    rtp: string;
    houseEdge: string;
    kycFriction: string;
    withdrawalLimits: string;
    leaderboardMonthly: string;
    mathThesis: string;
}

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
    status: 'VERIFIED' | 'UNVERIFIED';
    // Deep Intel Fields
    license: string;
    paymentMethods: string;
    founder: string;
    company: string;
    established: string;
    languages: string;
    kycPolicy: CasinoKYC;
    restrictedTerritories: string;
    companySize: string;
    specialRanking?: 'ETERNAL CROWN';
    zeroEdgeIntel?: ZeroEdgeIntel;
}

export const mockCasinosData: Casino[] = [
    {
        id: 'duel',
        name: 'Duel',
        logo: 'https://files.catbox.moe/p4z3v7.jpg',
        bonus: '$12M MONTHLY LEADERBOARDS',
        description: 'Pure-variance singularity. 100% RTP originals, true anon (username only), infinite withdrawals. The tactical manifesto against rigged empires.',
        tags: ['all', 'zero-edge', 'crypto-only', 'anon', 'new'],
        rating: 5.0,
        reviewCount: 420,
        withdrawalTime: 'INSTANT (∞ LIMITS)',
        certified: true,
        status: 'VERIFIED',
        specialRanking: 'ETERNAL CROWN',
        license: 'Anjouan (ALSI-202411026-FI1) — Full wagering authorization',
        paymentMethods: 'Crypto-exclusive (BTC, ETH, LTC, USDT); Fee-less, Unbounded',
        founder: 'Ossi "Monarch" Ketola (Ex-CSGOEmpire CEO)',
        company: 'Immortal Snail LLC (Nevis)',
        established: '2025',
        languages: 'English core; Crypto-universal',
        kycPolicy: {
            level1: 'NONE — Username + Password only. No email required.',
            level2: 'N/A — Pure Anon Deployment.',
            level3: 'N/A — AML shadows bypassed by design.',
            level4: 'N/A — VPN-optimized for global shadows.'
        },
        restrictedTerritories: 'USA, UK, Australia, France, Netherlands (Standard Anjouan)',
        companySize: '~25 staff; $12M+ monthly leaderboard expenditure (Founder-backed liquidity)',
        zeroEdgeIntel: {
            rtp: '100% (Originals)',
            houseEdge: '0%',
            kycFriction: 'ZERO (0)',
            withdrawalLimits: '∞ (INFINITE)',
            leaderboardMonthly: '$12,000,000+ USD',
            mathThesis: 'No tailwind + no caps = whale-scale explosions. Bankruptcy-risk model sustained by founder liquidity.'
        }
    },
    {
        id: 'stake',
        name: 'Stake',
        logo: 'https://files.catbox.moe/klt24q.jpg',
        bonus: '200% Welcome Surge',
        description: 'Crypto colossus with 11K+ games and VIP sportsbooks. The strategic nexus for global wager flows, balancing elite liquidity with KYC drag.',
        tags: ['all', 'high-bonus', 'sports', 'live', 'vip'],
        rating: 4.9,
        reviewCount: 2133,
        withdrawalTime: '~5 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao eGaming; Colombia, Mexico, Peru licensed',
        paymentMethods: '20+ Cryptos (BTC, ETH, USDT, DOGE, EOS...); Fiat On-Ramps',
        founder: 'Edward Craven & Bijan Tehrani',
        company: 'Medium Rare N.V.',
        established: '2017',
        languages: '15+ (English, Spanish, Portuguese, Japanese, etc.)',
        kycPolicy: {
            level1: 'Email/DOB on registration',
            level2: 'ID scan pre-withdrawal standard',
            level3: 'Address + Payment proof for >$10K',
            level4: 'Enhanced Due Diligence for VIPs; Mandatory for fiat exits'
        },
        restrictedTerritories: 'USA, UK, Australia, Netherlands, Czech Republic',
        companySize: '200+ staff; $1B+ annual (Crypto volume leader)'
    },
    {
        id: 'roobet',
        name: 'Roobet',
        logo: 'https://files.catbox.moe/of4dut.jpg',
        bonus: 'Up to $80 Wager-Free',
        description: 'Crypto speed-demon. High growth but strict AML and some historical offshore evasion noted.',
        tags: ['all', 'live', 'slots', 'famous'],
        rating: 4.2,
        reviewCount: 987,
        withdrawalTime: '~12 mins',
        certified: true,
        status: 'VERIFIED',
        license: 'Curaçao, Raw Entertainment B.V.',
        paymentMethods: 'BTC, ETH, LTC, USDT; Fiat hybrids (limited)',
        founder: 'Lifelong Gamers (Undisclosed)',
        company: 'Raw Entertainment B.V.',
        established: '2019',
        languages: 'English, Spanish, Portuguese, French',
        kycPolicy: {
            level1: 'Basic (Name, DOB)',
            level2: 'Full ID/Selfie for compliance',
            level3: 'Address proof often requested',
            level4: 'Strict AML; offshore evasion noted historically'
        },
        restrictedTerritories: 'USA, UK, Australia, Denmark, Germany',
        companySize: '100+ staff; $500M+ annual revenue'
    }
];
