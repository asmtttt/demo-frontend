export interface Profile {
  id: string;
  full_name: string;
  role: 'admin' | 'user';
  phone?: string;
  created_at: string;
}
