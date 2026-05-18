export interface EarthquakeSimulation {
  id: string;
  created_by: string;
  center_lat: number;
  center_lng: number;
  magnitude: number;
  radius_km: number;
  affected_buildings_count: number;
  destroyed_buildings_count: number;
  total_affected_people: number;
  created_at: string;
}

export interface CreateSimulationDto {
  center_lat: number;
  center_lng: number;
  magnitude: number;
  radius_km: number;
}
