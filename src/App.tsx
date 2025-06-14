import React, { useState, useEffect } from 'react';
import { BabyName, NameSubmission } from './types';
import { googleSheetsService } from './services/googleSheets';
import { useUserSession } from './hooks/useUserSession';
import Header from './components/Header';
import NameForm from './components/NameForm';
import NamesList from './components/NamesList';
import Footer from './components/Footer';

function App() {
  const [names, setNames] = useState<BabyName[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userSession = useUserSession();

  // Load names on component mount
  useEffect(() => {
    loadNames();
  }, []);

  const loadNames = async () => {
    try {
      setIsLoading(true);
      const fetchedNames = await googleSheetsService.getAllNames();
      setNames(fetchedNames);
    } catch (error) {
      console.error('Failed to load names:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitName = async (submission: NameSubmission) => {
    setIsSubmitting(true);
    try {
      const newName = await googleSheetsService.addName(submission);
      setNames(prev => [newName, ...prev]);
    } catch (error) {
      console.error('Failed to submit name:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (nameId: string): Promise<boolean> => {
    try {
      const success = await googleSheetsService.voteForName(nameId, userSession);
      if (success) {
        setNames(prev => 
          prev.map(name => 
            name.id === nameId 
              ? { ...name, votes: name.votes + 1 }
              : name
          )
        );
      }
      return success;
    } catch (error) {
      console.error('Failed to vote:', error);
      return false;
    }
  };

  const hasUserVoted = (nameId: string, userSession: string): boolean => {
    return googleSheetsService.hasUserVoted(nameId, userSession);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="text-center relative z-10">
          <div className="glass-card p-8 rounded-3xl">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white/80 mx-auto mb-6"></div>
            <p className="text-white/90 text-lg font-medium">Loading baby names...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <NameForm 
            onSubmit={handleSubmitName}
            isSubmitting={isSubmitting}
          />
          
          <NamesList 
            names={names}
            onVote={handleVote}
            userSession={userSession}
            hasUserVoted={hasUserVoted}
          />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;