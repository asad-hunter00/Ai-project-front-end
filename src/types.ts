export interface LocalizedText {
  uz: string;
  ru: string;
  en: string;
}
export interface Room {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  capacity: number;
  amenities: LocalizedText[];
  image?: string;
  published: boolean;
}
export interface MenuItem {
  id: string;
  name: LocalizedText;
  category?: LocalizedText;
  description?: LocalizedText;
  price?: number;
  portion?: LocalizedText;
  image?: string;
}
export interface GalleryImage {
  id: string;
  src: string;
  alt: LocalizedText;
}
export interface Announcement {
  id: string;
  title: LocalizedText;
  text: LocalizedText;
  active: boolean;
}
export interface Settings {
  name: string;
  address: string;
  hours: string;
  phones: string[];
}
export interface SiteContent {
  settings: Settings;
  rooms: Room[];
  gallery: GalleryImage[];
  announcements: Announcement[];
}
