import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private supabase = this.supabaseService.client;

  constructor(private supabaseService: SupabaseService) {}

  async getConversation(userId: string, otherId: string): Promise<Message[]> {
    const { data } = await this.supabase
      .from('messages')
      .select('*, sender:profiles!sender_id(full_name), receiver:profiles!receiver_id(full_name)')
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${userId})`)
      .order('created_at', { ascending: true });
    return data ?? [];
  }

  async sendMessage(senderId: string, receiverId: string, content: string) {
    return this.supabase
      .from('messages')
      .insert({ sender_id: senderId, receiver_id: receiverId, content })
      .select()
      .single();
  }

  async markAsRead(senderId: string, receiverId: string) {
    return this.supabase
      .from('messages')
      .update({ is_read: true })
      .eq('sender_id', senderId)
      .eq('receiver_id', receiverId)
      .eq('is_read', false);
  }

  async getUnreadCount(userId: string): Promise<number> {
    const { count } = await this.supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('receiver_id', userId)
      .eq('is_read', false);
    return count ?? 0;
  }

  subscribeToMessages(userId: string, callback: (message: Message) => void) {
    return this.supabase
      .channel(`messages-${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `receiver_id=eq.${userId}`
      }, payload => {
        callback(payload.new as Message);
      })
      .subscribe();
  }
}
