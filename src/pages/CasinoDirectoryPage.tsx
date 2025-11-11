import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCasinosData } from '../constants/casinos';
import { Icons } from '../components/common/icons';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Toggle } from '../components/common/Toggle';

export const CasinoDirectoryPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [filterCategory, setFilterCategory] = useState('ALL');
    const [minRating, setMinRating] = useState(0);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

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
                    </div>
                </div>
                <Button 
                    variant="secondary" 
                    className="md:hidden w-full"
                    onClick={() => setIsMobileFiltersOpen(true)}
                >
                    <Icons.Sliders className="h-4 w-4 mr-2" /> ADJUST PARAMETERS
                </Button>
            </div>

            <div className="flex flex-1 gap-8 relative">
                <div className={`fixed md:relative top-0 bottom-0 left-0 z-50 md:z-auto w-80 md:w-72 bg-[#0c0c0e] md:bg-transparent border-r border-[#333] md:border-none flex flex-col transition-transform duration-300 ease-out transform ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    <Card className="h-full md:h-auto flex-1 md:flex-none overflow-y-auto custom-scrollbar p-5 bg-[#0c0c0e] border-[#333]">
                        {/* Filter Content */}
                    </Card>
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    <div className="mb-6 p-1.5 bg-[#0c0c0e] border border-[#333] rounded-lg flex flex-col sm:flex-row gap-2">
                        <Input 
                            placeholder="> QUERY GRID..." 
                            className="pl-10 bg-[#14131c] border-transparent h-11"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select 
                            className="h-11 bg-[#14131c] border border-transparent rounded-md px-4 text-xs text-[#8d8c9e] font-heading uppercase"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="rating">SORT: ZAP SCORE</option>
                            <option value="newest">SORT: NEWEST</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <p className="font-mono text-xs text-[#8d8c9e] uppercase">
                            // DISPLAYING <span className="text-white font-bold">{filteredCasinos.length}</span> INTEL UNITS
                        </p>
                    </div>

                    {filteredCasinos.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
                            {filteredCasinos.map((casino, index) => (
                                <Card key={casino.id} className="p-0 overflow-hidden group">
                                    <Button onClick={() => navigate(`/casinos/${casino.id}`)} className="w-full">
                                        ACCESS INTEL UNIT →
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 bg-[#0c0c0e] border border-dashed border-[#333] rounded-xl">
                            <Icons.SearchX className="h-16 w-16 text-[#333] mb-4" />
                            <h3 className="font-heading text-xl text-white uppercase mb-2">NO OPERATORS FOUND</h3>
                            <p className="text-[#8d8c9e] font-mono text-sm">Broaden your scan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
