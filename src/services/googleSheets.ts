// Google Sheets API integration
// In a real implementation, this would connect to Google Sheets API
// For demo purposes, we'll use localStorage to simulate the functionality

import { BabyName, NameSubmission } from '../types';

class GoogleSheetsService {
  private readonly STORAGE_KEY = 'baby-names-data';
  private readonly VOTES_KEY = 'user-votes';

  // Initialize with some sample data
  private getInitialData(): BabyName[] {
    return [
      {
        id: '1',
        name: 'Rivan',
        meaning: 'Star, Ambitious',
        votes: 15,
        createdAt: new Date('2025-01-01').toISOString(),
        submittedBy: 'Admin'
      },
      {
        id: '2',
        name: 'Ram',
        meaning: 'Lord Rama, Pleasing, Charming',
        votes: 18,
        createdAt: new Date('2025-01-02').toISOString(),
        submittedBy: 'Admin'
      },
      {
        id: '3',
        name: 'Taksh',
        meaning: 'Eyes like a Dove, King of Nagas',
        votes: 12,
        createdAt: new Date('2025-01-03').toISOString(),
        submittedBy: 'Admin'
      },
      {
        id: '4',
        name: 'Rudra',
        meaning: 'Lord Shiva, Roarer, Fierce',
        votes: 22,
        createdAt: new Date('2025-01-04').toISOString(),
        submittedBy: 'Admin'
      },
      {
        id: '5',
        name: 'Rudransh',
        meaning: 'Part of Lord Shiva, Divine',
        votes: 16,
        createdAt: new Date('2025-01-05').toISOString(),
        submittedBy: 'Admin'
      },
      {
        id: '6',
        name: 'Tanay',
        meaning: 'Son, Offspring',
        votes: 14,
        createdAt: new Date('2025-01-06').toISOString(),
        submittedBy: 'Admin'
      },
      {
        id: '7',
        name: 'Tasmay',
        meaning: 'To Him, Salutation',
        votes: 8,
        createdAt: new Date('2025-01-07').toISOString(),
        submittedBy: 'Admin'
      },
      {
        id: '8',
        name: 'Rey',
        meaning: 'King, Royal',
        votes: 11,
        createdAt: new Date('2025-01-08').toISOString(),
        submittedBy: 'Admin'
      },
      {
        id: '9',
        name: 'Tirth',
        meaning: 'Sacred Place, Pilgrimage',
        votes: 13,
        createdAt: new Date('2025-01-09').toISOString(),
        submittedBy: 'Admin'
      }
    ];
  }

  async getAllNames(): Promise<BabyName[]> {
    // Force refresh with new data
    const initialData = this.getInitialData();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }

  async addName(submission: NameSubmission): Promise<BabyName> {
    const names = await this.getAllNames();
    const newName: BabyName = {
      id: Date.now().toString(),
      name: submission.name,
      meaning: submission.meaning,
      votes: 0,
      createdAt: new Date().toISOString(),
      submittedBy: submission.submittedBy || 'Anonymous'
    };
    
    names.push(newName);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(names));
    return newName;
  }

  async voteForName(nameId: string, userSession: string): Promise<boolean> {
    // Check if user already voted for this name
    const userVotes = this.getUserVotes(userSession);
    if (userVotes.includes(nameId)) {
      return false; // Already voted
    }

    // Add vote
    const names = await this.getAllNames();
    const nameIndex = names.findIndex(n => n.id === nameId);
    if (nameIndex === -1) return false;

    names[nameIndex].votes += 1;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(names));

    // Record user vote
    userVotes.push(nameId);
    localStorage.setItem(`${this.VOTES_KEY}-${userSession}`, JSON.stringify(userVotes));
    
    return true;
  }

  private getUserVotes(userSession: string): string[] {
    const stored = localStorage.getItem(`${this.VOTES_KEY}-${userSession}`);
    return stored ? JSON.parse(stored) : [];
  }

  hasUserVoted(nameId: string, userSession: string): boolean {
    const userVotes = this.getUserVotes(userSession);
    return userVotes.includes(nameId);
  }

  async deleteName(nameId: string): Promise<boolean> {
    const names = await this.getAllNames();
    const filteredNames = names.filter(n => n.id !== nameId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredNames));
    return true;
  }
}

export const googleSheetsService = new GoogleSheetsService();