import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Building, BuildingStatus, CreateBuildingDto } from '../models/building.model';

@Injectable({ providedIn: 'root' })
export class BuildingService {
  private supabase = this.supabaseService.client;

  constructor(private supabaseService: SupabaseService) {}

  async getMyBuildings(): Promise<Building[]> {
    const { data } = await this.supabase
      .from('buildings')
      .select('*')
      .order('created_at', { ascending: false });
    return data ?? [];
  }

  async getAllBuildings(): Promise<Building[]> {
    const { data } = await this.supabase
      .from('buildings')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false });
    return data ?? [];
  }

  async getBuilding(id: string): Promise<Building | null> {
    const { data } = await this.supabase
      .from('buildings')
      .select('*, profiles(full_name)')
      .eq('id', id)
      .single();
    return data;
  }

  async createBuilding(dto: CreateBuildingDto & { user_id: string }) {
    return this.supabase.from('buildings').insert(dto).select().single();
  }

  async updateBuilding(id: string, updates: Partial<Building>) {
    return this.supabase.from('buildings').update(updates).eq('id', id).select().single();
  }

  async deleteBuilding(id: string) {
    return this.supabase.from('buildings').delete().eq('id', id);
  }

  async updateOccupancy(id: string, delta: number) {
    const building = await this.getBuilding(id);
    if (!building) return;
    const newOccupancy = Math.max(0, building.current_occupancy + delta);
    return this.supabase
      .from('buildings')
      .update({ current_occupancy: newOccupancy })
      .eq('id', id);
  }

  async updateStatus(id: string, status: BuildingStatus, damageScore: number) {
    return this.supabase
      .from('buildings')
      .update({ status, damage_score: damageScore })
      .eq('id', id);
  }

  subscribeToBuildings(callback: (building: Building) => void) {
    return this.supabase
      .channel('buildings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'buildings' }, payload => {
        callback(payload.new as Building);
      })
      .subscribe();
  }
}
