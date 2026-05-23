export type Language = 'en' | 'ar';

export interface Project {
  id: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  type: 'solar' | 'grid';
  status: 'completed' | 'ongoing';
  coords: { x: number; y: number }; // Relative positions on custom Libya SVG map
  specs: {
    kilometers: number;
    poles: number;
    co2Saved: number; // in tons
  };
  descriptionEn: string;
  descriptionAr: string;
  beforeImg: string; // Simulated/SVG colored lighting setup
  afterImg: string;
  image?: string; // Real-world project site capture path
}

export interface BlogPost {
  id: string;
  titleEn: string;
  titleAr: string;
  date: string;
  categoryEn: string;
  categoryAr: string;
  summaryEn: string;
  summaryAr: string;
  contentEn: string;
  contentAr: string;
  readTimeEn: string;
  readTimeAr: string;
}

export interface Tender {
  id: string;
  titleEn: string;
  titleAr: string;
  type: 'tender' | 'career';
  departmentEn: string;
  departmentAr: string;
  deadlineEn: string;
  deadlineAr: string;
  locationEn: string;
  locationAr: string;
  requirementsEn: string[];
  requirementsAr: string[];
}
