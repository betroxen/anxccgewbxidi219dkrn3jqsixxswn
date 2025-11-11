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

export const mockCasinosData: Casino[] = [];
