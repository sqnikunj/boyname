import React, { useState } from 'react';
import { Plus, AlertCircle, BookOpen, Sparkles } from 'lucide-react';
import { NameSubmission } from '../types';

interface NameFormProps {
  onSubmit: (submission: NameSubmission) => Promise<void>;
  isSubmitting: boolean;
}

const NameForm: React.FC<NameFormProps> = ({ onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [meaning, setMeaning] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [error, setError] = useState('');

  const validateName = (name: string): boolean => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter a name');
      return false;
    }
    
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters long');
      return false;
    }

    const firstLetter = trimmedName.charAt(0).toUpperCase();
    if (firstLetter !== 'R' && firstLetter !== 'T') {
      setError('Name must start with R or T (Tula Rashi requirement)');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateName(name)) {
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        meaning: meaning.trim() || undefined,
        submittedBy: submittedBy.trim() || undefined
      });
      
      setName('');
      setMeaning('');
      setSubmittedBy('');
    } catch (err) {
      setError('Failed to submit name. Please try again.');
    }
  };

  return (
    <div className="glass-card-strong rounded-3xl p-8 mb-8 liquid-border floating-animation">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="glass-card p-2 rounded-xl">
          <Plus className="h-6 w-6 text-blue-300" />
        </div>
        Suggest a Name
        <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-3">
            Baby Name <span className="text-pink-300">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name starting with R or T..."
            className="w-full px-6 py-4 glass-input rounded-2xl text-lg font-medium"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="meaning" className="block text-sm font-semibold text-white/90 mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-300" />
              Name Meaning (Optional)
            </div>
          </label>
          <input
            type="text"
            id="meaning"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            placeholder="What does this name mean? (e.g., Light, King, Blessed)"
            className="w-full px-6 py-4 glass-input rounded-2xl font-medium"
            disabled={isSubmitting}
          />
          <p className="text-xs text-white/60 mt-2 ml-1">
            Adding the meaning helps others understand the significance of the name
          </p>
        </div>

        <div>
          <label htmlFor="submittedBy" className="block text-sm font-semibold text-white/90 mb-3">
            Your Name (Optional)
          </label>
          <input
            type="text"
            id="submittedBy"
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            placeholder="Leave empty to remain anonymous"
            className="w-full px-6 py-4 glass-input rounded-2xl font-medium"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="flex items-center gap-3 text-red-300 glass-card p-4 rounded-2xl border border-red-400/30">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full glass-button py-4 px-8 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 hover:shadow-2xl"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <Plus className="h-6 w-6" />
              Add Name
              <Sparkles className="h-5 w-5 animate-pulse" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default NameForm;