
import React, { useState, useMemo } from 'react';
import { CasinoCard, Casino } from './CasinoCard';
import { Icons } from './icons';

interface CasinoListPageProps {
    title: string;
    subtitle: string;
    casinos: Casino[];
    setViewingCasinoId: (id: string | null) => void;
}

export const CasinoListPage: React.FC<CasinoListPageProps> = ({ title, subtitle, casinos, setViewingCasinoId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rating'); // 'rating', 'bonus', 'newest'

    const sortOptions = [
        { value: 'rating', label: 'Community Rating' },
        { value: 'bonus', label: 'Bonus Value' },
        { value: 'newest', label: 'Newest' },
    ];
    
    const selectClassName = "h-10 rounded-md border border-[#3a3846] bg-[#24232d] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760] focus:border-transparent";

    const filteredAndSortedCasinos = useMemo(() => {
        let processedCasinos = [...casinos]
            .filter(casino => {
                const matchesSearch = casino.name.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesSearch;
            });

        switch (sortBy) {
            case 'rating':
                processedCasinos.sort((a, b) => b.rating - a.rating);
                break;
            case 'bonus':
                // This is a naive sort, a real one would parse the bonus string.
                processedCasinos.sort((a, b) => (b.tags.includes('high-bonus') ? 1 : -1) - (a.tags.includes('high-bonus') ? 1 : -1));
                break;
            case 'newest':
                processedCasinos.sort((a, b) => (b.tags.includes('new') ? 1 : -1) - (a.tags.includes('new') ? 1 : -1));
                break;
        }

        return processedCasinos;

    }, [searchTerm, sortBy, casinos]);

    return (
        <div className="container mx-auto max-w-7xl p-4 py-10 md:p-12 page-fade-in">
            <div className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-heading">{title}</h1>
                <p className="text-lg md:text-xl text-[#8d8c9e] max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: subtitle }} />
            </div>

            <div className="py-4 border-b border-[#3a3846] mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div className="relative flex-grow md:max-w-xs lg:max-w-sm">
                         <input
                            type="search"
                            placeholder="Search casinos..."
                            className="w-full h-10 rounded-md border border-[#3a3846] bg-[#24232d] pl-10 pr-4 text-white placeholder:text-[#8d8c9e] focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d8c9e]" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort-by" className="text-sm text-[#8d8c9e] flex-shrink-0">Sort by:</label>
                        <select id="sort-by" value={sortBy} onChange={e => setSortBy(e.target.value)} className={selectClassName}>
                           {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {filteredAndSortedCasinos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedCasinos.map(casino => (
                        <CasinoCard key={casino.id} casino={casino} onViewDetails={setViewingCasinoId} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <Icons.Search className="w-16 h-16 text-[#3a3846] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white font-heading">No Casinos Found</h3>
                    <p className="text-[#8d8c9e] mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};
