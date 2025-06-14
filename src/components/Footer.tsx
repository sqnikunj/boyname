import React from 'react';
import { Heart, Baby, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-footer mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="glass-card p-3 rounded-2xl floating-animation">
              <Baby className="h-8 w-8 text-blue-300" />
            </div>
            <span className="text-2xl font-bold text-white">Baby Name Suggestions</span>
            <div className="glass-card p-3 rounded-2xl floating-animation-delayed">
              <Heart className="h-8 w-8 text-pink-300 fill-current" />
            </div>
          </div>
          
          <p className="text-white/80 mb-6 text-lg font-medium">
            Thank you for helping us choose the perfect name for our little one!
          </p>
          
          <div className="glass-card-strong rounded-2xl p-6 max-w-2xl mx-auto liquid-border">
            <div className="text-white/70 space-y-2 font-medium">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <p>Following Tula Rashi (Libra) tradition</p>
                <Sparkles className="h-4 w-4 text-yellow-300" />
              </div>
              <p>Names starting with R or T only</p>
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-pink-300 font-semibold">Made with ❤️ for our growing Dudhat Family</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;