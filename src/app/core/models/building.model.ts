export type BuildingStatus = 'standing' | 'damaged' | 'destroyed';
export type BuildingType = 'betonarme' | 'yigma' | 'celik' | 'ahsap' | 'diger';

export interface Building {
  id: string;
  user_id: string;
  name: string;
  address?: string;
  city?: string;
  district?: string;
  lat: number;
  lng: number;
  construction_year?: number;
  floor_count?: number;
  building_type?: BuildingType;
  current_occupancy: number;
  status: BuildingStatus;
  damage_score: number;
  created_at: string;
  updated_at: string;
  profiles?: { full_name: string };
}

export interface CreateBuildingDto {
  name: string;
  address?: string;
  city?: string;
  district?: string;
  lat: number;
  lng: number;
  construction_year?: number;
  floor_count?: number;
  building_type?: BuildingType;
}
