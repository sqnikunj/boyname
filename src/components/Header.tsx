import React from 'react';
import { Baby, Heart, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="glass-header">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="glass-card p-4 rounded-2xl floating-animation">
              <Baby className="h-10 w-10 text-blue-300" />
            </div>
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-pink-200 bg-clip-text text-transparent">
                Baby Boy Names
              </h1>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-300 animate-pulse" />
            </div>
            <div className="glass-card p-4 rounded-2xl floating-animation-delayed">
              <Heart className="h-10 w-10 text-pink-300" />
            </div>
          </div>
          
          <div className="glass-card-strong rounded-2xl p-6 liquid-border max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
              Help us choose a name for our baby boy! 
              <span className="font-bold text-blue-300 block md:inline"> Names must start with 'R' or 'T'</span> 
              <br className="hidden sm:block" />
              following <span className="font-bold text-pink-300">Tula Rashi (Libra)</span> tradition.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-2 text-white/70">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">Each name carries deep meaning and tradition</span>
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;