import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Trophy, Clock, Sparkles, Crown } from 'lucide-react';
import { BabyName } from '../types';
import NameCard from './NameCard';

interface NamesListProps {
  names: BabyName[];
  onVote: (nameId: string) => Promise<boolean>;
  userSession: string;
  hasUserVoted: (nameId: string, userSession: string) => boolean;
}

type SortOption = 'votes' | 'recent';

const NamesList: React.FC<NamesListProps> = ({ names, onVote, userSession, hasUserVoted }) => {
  const [sortBy, setSortBy] = useState<SortOption>('votes');

  const sortedNames = useMemo(() => {
    const sorted = [...names];
    
    if (sortBy === 'votes') {
      sorted.sort((a, b) => b.votes - a.votes);
    } else {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    return sorted;
  }, [names, sortBy]);

  const topName = sortedNames[0];
  const totalVotes = names.reduce((sum, name) => sum + name.votes, 0);

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="glass-stats rounded-3xl p-8 liquid-border floating-animation">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-4xl font-bold text-blue-300 mb-2">{names.length}</div>
            <div className="text-white/80 font-medium">Names Suggested</div>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-4xl font-bold text-pink-300 mb-2">{totalVotes}</div>
            <div className="text-white/80 font-medium">Total Votes</div>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-4xl font-bold text-yellow-300 mb-2 flex items-center justify-center gap-2">
              <Crown className="h-8 w-8" />
              {topName?.name || 'None'}
            </div>
            <div className="text-white/80 font-medium">Leading Name</div>
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between glass-card-strong rounded-2xl p-6 liquid-border">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-300" />
          All Suggestions
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-white/70 font-medium">Sort by:</span>
          <button
            onClick={() => setSortBy('votes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              sortBy === 'votes'
                ? 'glass-card-strong text-yellow-300 border border-yellow-400/30'
                : 'glass-button text-white/80 hover:text-white'
            }`}
          >
            <Trophy className="h-4 w-4" />
            Most Votes
          </button>
          <button
            onClick={() => setSortBy('recent')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              sortBy === 'recent'
                ? 'glass-card-strong text-blue-300 border border-blue-400/30'
                : 'glass-button text-white/80 hover:text-white'
            }`}
          >
            <Clock className="h-4 w-4" />
            Newest
          </button>
        </div>
      </div>

      {/* Names Grid */}
      {sortedNames.length === 0 ? (
        <div className="text-center py-16 glass-card-strong rounded-3xl liquid-border">
          <div className="text-white/40 mb-6">
            <ArrowUpDown className="h-16 w-16 mx-auto" />
          </div>
          <p className="text-white/80 text-2xl font-bold mb-2">No names suggested yet.</p>
          <p className="text-white/60 text-lg">Be the first to suggest a name!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedNames.map((name, index) => (
            <NameCard
              key={name.id}
              name={name}
              onVote={onVote}
              hasVoted={hasUserVoted(name.id, userSession)}
              isTopName={sortBy === 'votes' && index === 0 && name.votes > 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NamesList;