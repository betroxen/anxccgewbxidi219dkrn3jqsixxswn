import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-[#14131c] border border-[#333333] rounded-xl p-0 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-5 border-b border-[#333] bg-[#0c0c0e]">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-[#2a2a35] animate-shimmer flex-shrink-0"></div>
                    <div className="space-y-2">
                        <div className="h-5 w-32 rounded bg-[#2a2a35] animate-shimmer"></div>
                        <div className="h-3 w-20 rounded bg-[#2a2a35] animate-shimmer"></div>
                    </div>
                </div>
                <div className="w-16 h-8 rounded bg-[#2a2a35] animate-shimmer"></div>
            </div>
        </div>
        
        {/* Body */}
        <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-px bg-[#333] border border-[#333] rounded overflow-hidden">
                <div className="bg-[#14131c] p-3 space-y-2">
                    <div className="h-3 w-10 rounded bg-[#2a2a35] animate-shimmer"></div>
                    <div className="h-4 w-16 rounded bg-[#2a2a35] animate-shimmer"></div>
                </div>
                <div className="bg-[#14131c] p-3 space-y-2">
                    <div className="h-3 w-8 rounded bg-[#2a2a35] animate-shimmer"></div>
                    <div className="h-4 w-12 rounded bg-[#2a2a35] animate-shimmer"></div>
                </div>
            </div>
            <div>
                <div className="h-3 w-24 rounded bg-[#2a2a35] animate-shimmer mb-2"></div>
                <div className="h-10 w-full rounded bg-[#2a2a35] animate-shimmer"></div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-5 pt-0 mt-2">
            <div className="h-11 w-full rounded bg-[#2a2a35] animate-shimmer"></div>
        </div>
    </div>
  );
};
