import React, { useState, useMemo, useEffect } from 'react';
// FIX: Import useNavigate for routing
import { useNavigate } from 'react-router-dom';
import { mockCasinosData } from '../constants/casinos';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { SkeletonCard } from '../components/SkeletonCard';

// FIX: Removed 'setViewingCasinoId' prop to align with routing structure
export const CasinoDirectoryPage = () => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [filterCategory, setFilterCategory] = useState('ALL');
    const [minRating, setMinRating] = useState(0);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
    // FIX: Initialize useNavigate hook
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Process Data
    const filteredCasinos = useMemo(() => {
        return mockCasinosData
            .filter(c => {
                const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = filterCategory === 'ALL' || c.tags.includes(filterCategory.toLowerCase());
                const matchesRating = c.rating >= minRating;
                const matchesVerified = !showVerifiedOnly || c.status === 'VERIFIED';
                return matchesSearch && matchesCategory && matchesRating && matchesVerified;
            })
            .sort((a, b) => {
                if (sortBy === 'rating') return b.rating - a.rating;
                if (sortBy === 'newest') return parseInt(b.established) - parseInt(a.established);
                return 0;
            });
    }, [searchTerm, sortBy, filterCategory, minRating, showVerifiedOnly]);

    return (
        <div className="container mx-auto max-w-[1400px] p-4 py-6 md:p-10 min-h-[calc(100vh-8rem)] flex flex-col page-fade-in">
            
            {/* HEADER & DATABASE STATUS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 flex-shrink-0 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Icons.Server className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                            OPERATOR GRID
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest">
                        <p className="text-[#00FFC0]">// STATUS: LIVE</p>
                        <span className="text-[#333]">|</span>
                        <p className="text-[#8d8c9e]">TRACKING {mockCasinosData.length} UNITS</p>
                        <span className="text-[#333]">|</span>
                        <p className="text-[#8d8c9e]">LAST SYNC: NOV 09, 2025</p>
                    </div>
                </div>
                <Button 
                    variant="secondary" 
                    className="md:hidden w-full flex items-center gap-2 justify-center border-[#333] text-[#00FFC0] font-heading uppercase text-xs"
                    onClick={() => setIsMobileFiltersOpen(true)}
                >
                    <Icons.Sliders className="h-4 w-4" /> ADJUST PARAMETERS
                </Button>
            </div>

            {/* MAIN LAYOUT */}
            <div className="flex flex-1 gap-8 relative">

                {/* LEFT: FILTER SIDEBAR */}
                <>
                    {/* Mobile Backdrop */}
                    <div 
                        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                        onClick={() => setIsMobileFiltersOpen(false)}
                    />
                    
                    {/* Sidebar Container */}
                    <div className={`fixed md:relative top-0 bottom-0 left-0 z-50 md:z-auto w-80 md:w-72 bg-[#0c0c0e] md:bg-transparent border-r border-[#333] md:border-none flex flex-col transition-transform duration-300 ease-out transform ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                        
                        {/* Mobile Header */}
                        <div className="md:hidden p-4 border-b border-[#333] flex justify-between items-center bg-[#0c0c0e]">
                            <h3 className="font-heading text-white uppercase text-sm">SEARCH PARAMETERS</h3>
                            <button onClick={() => setIsMobileFiltersOpen(false)} className="text-[#8d8c9e] hover:text-white">
                                <Icons.X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Filter Content */}
                        <Card className="h-full md:h-auto flex-1 md:flex-none overflow-y-auto custom-scrollbar p-5 bg-[#0c0c0e] border-[#333]">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-heading text-white uppercase text-sm mb-4 flex items-center gap-2">
                                        <Icons.Filter className="h-4 w-4 text-[#00FFC0]" /> CLASSIFICATION
                                    </h3>
                                    <div className="space-y-1">
                                        {['ALL', 'ZERO-EDGE', 'HIGH-BONUS', 'NEW', 'LIVE', 'SPORTS', 'CRYPTO'].map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setFilterCategory(cat)}
                                                className={`w-full text-left px-3 py-2 rounded-[4px] font-heading uppercase text-xs transition-all flex justify-between items-center ${
                                                    filterCategory === cat 
                                                    ? 'bg-[#00FFC0]/10 text-[#00FFC0] border border-[#00FFC0]/30 font-bold' 
                                                    : 'text-[#8d8c9e] hover:bg-[#1A1A1A] hover:text-white border border-transparent'
                                                }`}
                                            >
                                                <span>{cat.replace('-', ' ')}</span>
                                                {filterCategory === cat && <Icons.Check className="h-3 w-3" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="h-px bg-[#333] w-full"></div>

                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3 flex justify-between">
                                        <span>MIN ZAP SCORE</span>
                                        <span className="text-white">{minRating.toFixed(1)}+</span>
                                    </label>
                                    <input 
                                        type="range" 
                                        min="0" max="5" step="0.1" 
                                        value={minRating}
                                        onChange={(e) => setMinRating(Number(e.target.value))}
                                        className="w-full accent-[#00FFC0] h-1.5 bg-[#333] rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-[#666] font-mono mt-2">
                                        <span>0.0</span><span>5.0</span>
                                    </div>
                                </div>

                                <div className="h-px bg-[#333] w-full"></div>

                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">INTEGRITY FILTER</label>
                                    <Toggle 
                                        checked={showVerifiedOnly} 
                                        onChange={setShowVerifiedOnly} 
                                        label={<span className="text-xs font-heading flex items-center gap-2"><Icons.Shield className="h-3 w-3 text-[#00FFC0]" /> VERIFIED ONLY</span>} 
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </>

                {/* RIGHT: RESULTS GRID */}
                <div className="flex-1 flex flex-col min-w-0">
                    
                    {/* Command Bar */}
                    <div className="mb-6 p-1.5 bg-[#0c0c0e] border border-[#333] rounded-lg flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d8c9e] h-4 w-4" />
                            <Input 
                                placeholder="> QUERY GRID..." 
                                className="pl-10 bg-[#14131c] border-transparent h-11 font-mono text-sm focus:border-[#00FFC0] rounded-md"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select 
                            className="h-11 bg-[#14131c] border border-transparent rounded-md px-4 text-xs text-[#8d8c9e] font-heading uppercase focus:outline-none focus:border-[#00FFC0] cursor-pointer hover:text-white transition-colors"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="rating">SORT: ZAP SCORE (HIGH)</option>
                            <option value="newest">SORT: ESTABLISHED DATE (NEW)</option>
                        </select>
                    </div>

                    {/* Results Status */}
                    <div className="mb-4 flex items-center justify-between px-1">
                        {!loading && (
                            <p className="font-mono text-xs text-[#8d8c9e] uppercase">
                                // DISPLAYING <span className="text-white font-bold">{filteredCasinos.length}</span> INTEL UNITS
                            </p>
                        )}
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                        ) : filteredCasinos.length > 0 ? (
                            filteredCasinos.map((casino, index) => {
                                const isEternalCrown = casino.specialRanking === 'ETERNAL CROWN';
                                return (
                                    <Card 
                                        key={casino.id} 
                                        className={`p-0 overflow-hidden bg-[#14131c] group flex flex-col animate-fadeIn relative
                                            ${isEternalCrown 
                                                ? 'border-[#00FFC0] shadow-[0_0_30px_rgba(0,255,192,0.15)] hover:shadow-[0_0_50px_rgba(0,255,192,0.3)]' 
                                                : 'border-[#333] hover:border-[#00FFC0]/50'}`} 
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {/* Card Header */}
                                        <div className={`p-5 border-b flex justify-between items-start bg-[#0c0c0e] relative ${isEternalCrown ? 'border-[#00FFC0]/30' : 'border-[#333]'}`}>
                                            {/* Eternal Crown Glow */}
                                            {isEternalCrown && (
                                                <div className="absolute inset-0 bg-[#00FFC0]/5 animate-pulse-slow pointer-events-none"></div>
                                            )}
                                            {/* Scanline effect on hover */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,192,0.2)_50%)] bg-[length:100%_4px]"></div>
                                            
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className="relative">
                                                    <img src={casino.logo} alt={casino.name} className={`w-14 h-14 rounded-lg border bg-[#14131c] p-0.5 ${isEternalCrown ? 'border-[#00FFC0]' : 'border-[#333]'}`} />
                                                    {isEternalCrown && (
                                                        <div className="absolute -top-2 -left-2 text-[#00FFC0] drop-shadow-[0_0_8px_#00FFC0]">
                                                            <Icons.Gem className="h-5 w-5 fill-[#00FFC0]" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-heading text-lg text-white uppercase flex items-center gap-2">
                                                        {casino.name}
                                                    </h3>
                                                    <div className="flex flex-col gap-1 mt-1">
                                                        {casino.status === 'VERIFIED' ? (
                                                            <span className="flex items-center gap-1 text-[9px] font-bold text-[#00FFC0] uppercase tracking-widest">
                                                                <Icons.CheckCircle className="h-3 w-3" /> VERIFIED
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1 text-[9px] font-bold text-[#8d8c9e] uppercase tracking-widest">
                                                                <Icons.AlertTriangle className="h-3 w-3" /> UNVERIFIED
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right relative z-10">
                                                <div className={`flex items-center justify-end gap-1 px-2 py-1 rounded border ${isEternalCrown ? 'bg-[#00FFC0]/10 border-[#00FFC0] text-[#00FFC0]' : 'bg-[#1A1A1A] border-[#333]'}`}>
                                                    <span className={`font-mono text-xl font-bold ${casino.rating >= 4.5 ? 'text-[#00FFC0] text-glow' : casino.rating >= 4.0 ? 'text-white' : 'text-yellow-500'}`}>
                                                        {casino.rating.toFixed(1)}
                                                    </span>
                                                </div>
                                                {isEternalCrown && <div className="text-[8px] text-[#00FFC0] font-mono uppercase tracking-widest mt-1 text-right">APEX RANK</div>}
                                            </div>
                                        </div>
                                        
                                        {/* Data Grid */}
                                        <div className="p-5 space-y-4 flex-1 relative">
                                            <div className="grid grid-cols-2 gap-px bg-[#333] border border-[#333] rounded overflow-hidden">
                                                <div className="bg-[#14131c] p-3 flex flex-col justify-center">
                                                    <span className="text-[#8d8c9e] text-[9px] font-mono uppercase mb-1 flex items-center gap-1">
                                                        <Icons.Zap className="h-3 w-3" /> SPEED
                                                    </span>
                                                    <span className="text-white font-heading text-sm truncate" title={casino.withdrawalTime}>{casino.withdrawalTime}</span>
                                                </div>
                                                    <div className="bg-[#14131c] p-3 flex flex-col justify-center">
                                                    <span className="text-[#8d8c9e] text-[9px] font-mono uppercase mb-1 flex items-center gap-1">
                                                        <Icons.Clock className="h-3 w-3" /> EST.
                                                    </span>
                                                    <span className="text-white font-heading text-sm">{casino.established}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-[#8d8c9e] text-[9px] font-mono uppercase block mb-2 flex items-center gap-1">
                                                    <Icons.Gift className="h-3 w-3" /> ACTIVE INTEL (BONUS)
                                                </span>
                                                <p className="text-sm text-white font-medium leading-tight bg-[#0c0c0e] p-3 rounded border border-[#333] line-clamp-2 min-h-[42px] flex items-center">
                                                    {casino.bonus}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Footer */}
                                        <div className="p-5 pt-0 mt-auto relative z-10">
                                            {/* FIX: Use navigate to go to detail page */}
                                            <Button 
                                                onClick={() => navigate(`/casinos/${casino.id}`)} 
                                                className={`w-full font-heading uppercase text-xs tracking-widest shadow-none border ${isEternalCrown ? 'bg-[#00FFC0] text-black border-[#00FFC0] hover:shadow-[0_0_30px_rgba(0,255,192,0.4)]' : 'border-[#00FFC0]/30 hover:shadow-[0_0_20px_rgba(0,255,192,0.2)]'}`}
                                            >
                                                ACCESS INTEL UNIT →
                                            </Button>
                                        </div>
                                    </Card>
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 bg-[#0c0c0e] border border-[#333] rounded-xl p-8 text-center animate-fadeIn lg:col-span-2 xl:col-span-3">
                                <Icons.SearchX className="h-16 w-16 text-[#333] mb-4" />
                                <h3 className="font-heading text-xl text-white uppercase mb-2">SIGNAL LOST</h3>
                                <p className="text-[#8d8c9e] font-mono text-sm max-w-md mx-auto">
                                    No operators matched your current parameters. Broaden your scan.
                                </p>
                                <Button variant="ghost" onClick={() => {setSearchTerm(''); setFilterCategory('ALL'); setMinRating(0); setShowVerifiedOnly(false);}} className="mt-6 text-[#00FFC0] border border-[#00FFC0]/30 hover:bg-[#00FFC0]/10 font-mono uppercase text-xs">
                                    RESET ALL PARAMETERS
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};