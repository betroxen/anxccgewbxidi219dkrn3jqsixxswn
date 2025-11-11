
import React from 'react';
import { Icons } from '../components/icons';

export const AboutSection = () => {
  return (
    <section id="about" className="bg-[#000000] py-16 md:py-24 relative overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1ed760]/5 to-transparent pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 md:grid-cols-2 relative z-10">
        <div className="flex flex-col justify-center">
          <span className="mb-3 font-heading text-sm font-bold text-[#1ed760] uppercase tracking-widest">Built by Degens, For the Edge</span>
          <h2 className="font-heading mb-6 text-3xl font-bold text-white md:text-5xl leading-tight">
            We're Not a Casino. <br />We're a Revolution.
          </h2>
          <div className="space-y-6 text-lg text-[#8d8c9e]">
            <p>
              The crypto gaming frontier is a wild one. It’s exhilarating, fast, and packed with opportunity. But let’s be real: it’s a chaotic mess of confusing platforms, opaque systems, and operators who don't have your back.
            </p>
            <p>
              <strong className="text-white">That's why ZAP exists.</strong> We're a team of degens, data scientists, and developers who hit the wall. We were tired of the status quo—shady actors, hollow 'rewards,' and zero community cohesion. We didn't find the platform we needed, so we built it ourselves.
            </p>
            <p>
              ZAP was born from pure frustration. We’re not another affiliate site chasing commissions; we are the alternative—a smarter, fairer ecosystem built by the community, for the community.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full rounded-2xl bg-[#14131c] border border-[#3a3846] p-8 md:p-10 shadow-2xl">
            <h3 className="font-heading mb-6 text-2xl font-bold text-white flex items-center gap-3">
              <Icons.Target className="h-6 w-6 text-[#1ed760]" />
              The Core Problem
            </h3>
            <p className="mb-8 text-lg text-[#8d8c9e]">The current landscape is broken. It leaves money on the table and power in the wrong hands. We’re here to fix it.</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white">
                <div className="mt-1 p-1 bg-red-500/20 rounded-full">
                    <Icons.X className="h-4 w-4 text-red-500" />
                </div>
                <span className="text-[#8d8c9e]"><strong className="text-white">Shady Operators:</strong> Untrustworthy platforms with hidden fees and rigged RTPs.</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <div className="mt-1 p-1 bg-red-500/20 rounded-full">
                    <Icons.X className="h-4 w-4 text-red-500" />
                </div>
                 <span className="text-[#8d8c9e]"><strong className="text-white">Hollow Rewards:</strong> Meaningless 'bonus cash' with impossible wagering requirements.</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <div className="mt-1 p-1 bg-[#1ed760]/20 rounded-full">
                    <Icons.CheckCircle className="h-4 w-4 text-[#1ed760]" />
                </div>
                 <span className="text-[#8d8c9e]"><strong className="text-white">The ZAP Fix:</strong> Radical transparency, real data, and rewards that actually matter.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
