export interface User {
  email: string;
  name: string;
  photoURL: string;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  gallery?: string[];
  amenities: string[];
  overview: string;
  rating: number;
  reviews: Review[];
  ownerEmail: string;
  ownerName: string;
  ownerPhoto?: string;
  createdAt: string;
}

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  hostEmail: string;
  userEmail: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  hourlyRate: number;
  total: number;
  securityDeposit: number;
  status: BookingStatus;
  createdAt: string;
}

export const CATEGORIES = ["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"] as const;
export const AMENITY_OPTIONS = [
  "Infinity cyc wall", "Strobe kit", "Continuous lighting", "Green screen", "Acoustic treatment", "Soundproof booth",
  "Mixing console", "Microphones", "Camera support", "Makeup station", "Changing room", "Props closet",
  "Free Wi-Fi", "Parking", "Kitchenette", "Air conditioning", "Loading dock", "Work tables",
];
