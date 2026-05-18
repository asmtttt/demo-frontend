import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = this.supabaseService.client;

  session$ = new BehaviorSubject<Session | null>(null);
  profile$ = new BehaviorSubject<Profile | null>(null);

  constructor(private supabaseService: SupabaseService, private router: Router) {
    this.supabase.auth.getSession().then(({ data }) => {
      this.session$.next(data.session);
      if (data.session) this.loadProfile(data.session.user.id);
    });

    this.supabase.auth.onAuthStateChange((_, session) => {
      this.session$.next(session);
      if (session) {
        this.loadProfile(session.user.id);
      } else {
        this.profile$.next(null);
      }
    });
  }

  get currentUser(): User | null {
    return this.session$.value?.user ?? null;
  }

  get currentProfile(): Profile | null {
    return this.profile$.value;
  }

  get isAdmin(): boolean {
    return this.profile$.value?.role === 'admin';
  }

  async signUp(email: string, password: string, fullName: string) {
    return this.supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role: 'user' } }
    });
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigate(['/auth/login']);
  }

  private async loadProfile(userId: string) {
    const { data } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    this.profile$.next(data);
  }

  async updateProfile(updates: Partial<Profile>) {
    const userId = this.currentUser?.id;
    if (!userId) return { error: new Error('Oturum açık değil') };
    const { data, error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    if (data) this.profile$.next(data);
    return { data, error };
  }

  async getAllProfiles(): Promise<Profile[]> {
    const { data } = await this.supabase.from('profiles').select('*').order('created_at');
    return data ?? [];
  }
}
