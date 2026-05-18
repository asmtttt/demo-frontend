import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Building } from '../models/building.model';
import { CreateSimulationDto, EarthquakeSimulation } from '../models/earthquake-simulation.model';

@Injectable({ providedIn: 'root' })
export class EarthquakeService {
  private supabase = this.supabaseService.client;

  constructor(private supabaseService: SupabaseService) {}

  async getSimulations(): Promise<EarthquakeSimulation[]> {
    const { data } = await this.supabase
      .from('earthquake_simulations')
      .select('*')
      .order('created_at', { ascending: false });
    return data ?? [];
  }

  async runSimulation(dto: CreateSimulationDto, createdBy: string, allBuildings: Building[]) {
    const affected = this.calculateAffectedBuildings(dto, allBuildings);

    let destroyedCount = 0;
    let totalPeople = 0;

    for (const { building, distance } of affected) {
      const damageScore = this.calculateDamageScore(dto.magnitude, distance, dto.radius_km, building);
      let status: 'standing' | 'damaged' | 'destroyed' = 'standing';
      if (damageScore >= 75) { status = 'destroyed'; destroyedCount++; }
      else if (damageScore >= 40) { status = 'damaged'; }

      if (status !== 'standing') {
        totalPeople += building.current_occupancy;
        await this.supabase
          .from('buildings')
          .update({ status, damage_score: damageScore })
          .eq('id', building.id);
      }
    }

    const { data: simulation } = await this.supabase
      .from('earthquake_simulations')
      .insert({
        ...dto,
        created_by: createdBy,
        affected_buildings_count: affected.length,
        destroyed_buildings_count: destroyedCount,
        total_affected_people: totalPeople
      })
      .select()
      .single();

    return { simulation, affectedCount: affected.length, destroyedCount, totalPeople };
  }

  async resetBuildings() {
    return this.supabase
      .from('buildings')
      .update({ status: 'standing', damage_score: 0 })
      .neq('status', 'standing');
  }

  private calculateAffectedBuildings(dto: CreateSimulationDto, buildings: Building[]) {
    return buildings
      .map(building => ({
        building,
        distance: this.getDistanceKm(dto.center_lat, dto.center_lng, building.lat, building.lng)
      }))
      .filter(({ distance }) => distance <= dto.radius_km);
  }

  private calculateDamageScore(magnitude: number, distance: number, radius: number, building: Building): number {
    const distanceFactor = 1 - (distance / radius);
    const magnitudeFactor = (magnitude - 1) / 9;
    let baseScore = distanceFactor * magnitudeFactor * 100;

    const age = building.construction_year ? new Date().getFullYear() - building.construction_year : 30;
    const ageFactor = Math.min(age / 80, 1) * 20;

    const floorFactor = (building.floor_count ?? 3) > 8 ? 10 : 0;

    const typeFactor = building.building_type === 'yigma' ? 15
      : building.building_type === 'ahsap' ? 10 : 0;

    return Math.min(100, Math.round(baseScore + ageFactor + floorFactor + typeFactor));
  }

  private getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2
      + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
      * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}
