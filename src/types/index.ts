export interface BabyName {
  id: string;
  name: string;
  meaning?: string;
  votes: number;
  createdAt: string;
  submittedBy?: string;
}

export interface VoteData {
  nameId: string;
  userSession: string;
}

export interface NameSubmission {
  name: string;
  meaning?: string;
  submittedBy?: string;
}