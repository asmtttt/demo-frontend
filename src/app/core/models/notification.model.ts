export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
  is_read: boolean;
  simulation_id?: string;
  created_at: string;
}
