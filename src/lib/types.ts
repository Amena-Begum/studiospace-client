export interface User {
  email: string;
  name: string;
  photoURL: string;
}

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string; // YYYY-MM-DD
  creatorEmail: string;
  creatorName: string;
  createdAt: string;
  participants?: number;
}

export interface JoinedEvent {
  _id: string;
  eventId: string;
  title: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  joinedAt: string;
}

export const EVENT_TYPES = ["Cleanup", "Plantation", "Donation", "Food Drive", "Blood Donation", "Education", "Health Camp", "Other"] as const;
