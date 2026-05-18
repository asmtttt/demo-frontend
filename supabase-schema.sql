-- =============================================
-- DISASTER - Deprem Analiz Sistemi
-- Supabase SQL Şeması
-- =============================================

-- Profiles tablosu (auth.users'ı extend eder)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Binalar tablosu
CREATE TABLE buildings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  district TEXT,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  construction_year INTEGER,
  floor_count INTEGER,
  building_type TEXT CHECK (building_type IN ('betonarme', 'yigma', 'celik', 'ahsap', 'diger')),
  current_occupancy INTEGER DEFAULT 0,
  status TEXT DEFAULT 'standing' CHECK (status IN ('standing', 'damaged', 'destroyed')),
  damage_score INTEGER DEFAULT 0 CHECK (damage_score >= 0 AND damage_score <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deprem simülasyonları tablosu
CREATE TABLE earthquake_simulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  center_lat DOUBLE PRECISION NOT NULL,
  center_lng DOUBLE PRECISION NOT NULL,
  magnitude DECIMAL(3,1) NOT NULL CHECK (magnitude >= 1.0 AND magnitude <= 10.0),
  radius_km DECIMAL(6,2) NOT NULL,
  affected_buildings_count INTEGER DEFAULT 0,
  destroyed_buildings_count INTEGER DEFAULT 0,
  total_affected_people INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mesajlar tablosu (chat)
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bildirimler tablosu
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'danger')),
  is_read BOOLEAN DEFAULT FALSE,
  simulation_id UUID REFERENCES earthquake_simulations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TRIGGER: Yeni kullanıcı kaydında profil oluştur
-- =============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Kullanıcı'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- TRIGGER: buildings.updated_at otomatik güncelle
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER buildings_updated_at
  BEFORE UPDATE ON buildings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- =============================================
-- YARDIMCI FONKSİYON: RLS döngüsünü önlemek için
-- =============================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT role = 'admin' FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE earthquake_simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
-- Chat özelliği için tüm giriş yapmış kullanıcılar profilleri görebilir
CREATE POLICY "Giris yapmis kullanici profilleri gorebilir"
  ON profiles FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Kullanici kendi profilini guncelleyebilir"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- BUILDINGS policies
CREATE POLICY "Kullanici kendi binalarini gorebilir"
  ON buildings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin tum binalari gorebilir"
  ON buildings FOR SELECT
  USING (is_admin());

CREATE POLICY "Kullanici bina ekleyebilir"
  ON buildings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanici kendi binasini guncelleyebilir"
  ON buildings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admin tum binalari guncelleyebilir"
  ON buildings FOR UPDATE
  USING (is_admin());

CREATE POLICY "Kullanici kendi binasini silebilir"
  ON buildings FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admin tum binalari silebilir"
  ON buildings FOR DELETE
  USING (is_admin());

-- EARTHQUAKE SIMULATIONS policies
CREATE POLICY "Herkes simülasyonları görebilir"
  ON earthquake_simulations FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Sadece admin simülasyon ekleyebilir"
  ON earthquake_simulations FOR INSERT
  WITH CHECK (is_admin());

-- MESSAGES policies
CREATE POLICY "Kullanici kendi mesajlarini gorebilir"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Kullanici mesaj gonderebilir"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Kullanici mesaji okundu isaretleyebilir"
  ON messages FOR UPDATE
  USING (auth.uid() = receiver_id);

-- NOTIFICATIONS policies
CREATE POLICY "Kullanici kendi bildirimlerini gorebilir"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanici bildirimini okundu isaretleyebilir"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- REALTIME: Tabloları realtime için aktif et
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE buildings;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
