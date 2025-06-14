import React, { useState } from 'react';
import { Heart, User, Calendar, BookOpen, Crown } from 'lucide-react';
import { BabyName } from '../types';

interface NameCardProps {
  name: BabyName;
  onVote: (nameId: string) => Promise<boolean>;
  hasVoted: boolean;
  isTopName?: boolean;
}

const NameCard: React.FC<NameCardProps> = ({ name, onVote, hasVoted, isTopName }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [voteCount, setVoteCount] = useState(name.votes);

  const handleVote = async () => {
    if (hasVoted || isVoting) return;
    
    setIsVoting(true);
    const success = await onVote(name.id);
    
    if (success) {
      setVoteCount(prev => prev + 1);
    }
    
    setIsVoting(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`glass-card-strong rounded-3xl p-6 liquid-border floating-animation hover:scale-105 transition-all duration-500 relative ${
      isTopName ? 'ring-2 ring-yellow-400/50' : ''
    }`}>
      {isTopName && (
        <div className="absolute -top-3 -right-3 glass-card p-2 rounded-full border border-yellow-400/50">
          <Crown className="h-5 w-5 text-yellow-300" />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-white mb-3 flex items-center gap-2">
            {name.name}
            {isTopName && <Crown className="h-6 w-6 text-yellow-300" />}
          </h3>
          
          {name.meaning && (
            <div className="glass-card p-4 rounded-2xl mb-4 border border-blue-400/30">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-1">Meaning</p>
                  <p className="text-white/90 font-medium">{name.meaning}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{name.submittedBy || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{formatDate(name.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleVote}
          disabled={hasVoted || isVoting}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
            hasVoted
              ? 'glass-card text-pink-300 cursor-not-allowed border border-pink-400/30'
              : 'glass-button text-white hover:scale-110 hover:shadow-2xl'
          }`}
        >
          <Heart 
            className={`h-6 w-6 ${hasVoted ? 'fill-current text-pink-300' : 'text-white'} ${isVoting ? 'animate-pulse' : ''}`} 
          />
          <span>{voteCount}</span>
        </button>
      </div>
      
      {hasVoted && (
        <div className="glass-card px-4 py-2 rounded-full inline-flex items-center gap-2 border border-pink-400/30">
          <Heart className="h-4 w-4 text-pink-300 fill-current" />
          <span className="text-sm text-pink-300 font-semibold">You voted for this name!</span>
        </div>
      )}
    </div>
  );
};

export default NameCard;