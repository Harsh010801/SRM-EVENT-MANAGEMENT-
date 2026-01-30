import { useState } from 'react';
import { Trophy, Users, Briefcase, Cpu, Palette, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { clubs } from '@/data/events';

const categoryIcons = {
  technical: Cpu,
  cultural: Palette,
  sports: Trophy,
  social: Heart,
  professional: Briefcase,
};

const categoryColors = {
  technical: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  cultural: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  sports: 'bg-green-500/20 text-green-400 border-green-500/30',
  social: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  professional: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const categoryLabels = {
  technical: 'Technical',
  cultural: 'Cultural',
  sports: 'Sports',
  social: 'Social',
  professional: 'Professional',
};

export function Clubs() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredClubs = activeCategory === 'all'
    ? clubs
    : clubs.filter(club => club.category === activeCategory);

  const categories = ['all', 'technical', 'cultural', 'sports', 'social', 'professional'];

  return (
    <section id="clubs" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-[#2B71F8]/20 text-[#2B71F8] border-[#2B71F8]/30 mb-4">
            <Users className="w-3 h-3 mr-1" />
            Student Organizations
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            SRM <span className="text-gradient">Clubs</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Discover 22+ student clubs at SRM University. From technical societies to cultural groups, 
            find your community and pursue your passions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#2B71F8] text-white shadow-lg shadow-[#2B71F8]/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat === 'all' ? 'All Clubs' : categoryLabels[cat as keyof typeof categoryLabels]}
            </button>
          ))}
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club, index) => {
            const Icon = categoryIcons[club.category];
            return (
              <div
                key={club.id}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10 hover:border-[#2B71F8]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#2B71F8]/10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColors[club.category].split(' ')[0]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge className={categoryColors[club.category]}>
                    {categoryLabels[club.category]}
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#5B9AFF] transition-colors">
                  {club.name}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-3">
                  {club.description}
                </p>

                {/* Events */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/40 text-xs mb-2">Key Events</p>
                  <div className="flex flex-wrap gap-2">
                    {club.events.slice(0, 3).map((event, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-white/70"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Clubs', value: '22+' },
            { label: 'Technical', value: '10' },
            { label: 'Cultural', value: '6' },
            { label: 'Annual Events', value: '50+' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-3xl font-bold text-[#2B71F8] mb-1">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
