export interface Mentor {
  id: string;
  userId: string;
  fullName: string;
  title: string;
  specialties: string[];
  yearsOfExperience: number;
  bio: string;
  availability: 'available' | 'limited' | 'unavailable';
}

export interface MentorFilter {
  specialty?: string;
  yearsOfExperience?: number;
  availability?: string;
}