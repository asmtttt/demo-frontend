-- 100 İstanbul Binası Seed Verisi
-- Supabase SQL Editor'da çalıştırın (RLS bypass ile).
-- Admin kullanıcı otomatik bulunur; önce admin hesabı oluşturun.

INSERT INTO buildings (id, user_id, name, address, city, district, lat, lng, status, damage_score, current_occupancy, floor_count, building_type, construction_year, created_at)
SELECT
  gen_random_uuid(),
  (SELECT id FROM profiles LIMIT 1),
  d.name, d.address, 'İstanbul', d.district, d.lat, d.lng,
  d.status::text, d.damage_score, d.occupancy, d.floors, d.btype, d.yr, NOW()
FROM (VALUES
  -- KADIKÖY (5)
  ('Kadıköy Merkez Plaza','Moda Cad. No:15','Kadıköy',40.9912,29.0243,'standing',5,340,15,'betonarme',2005),
  ('Bağdat Caddesi Rezidans','Bağdat Cad. No:287','Kadıköy',40.9773,29.0489,'standing',12,180,18,'betonarme',2012),
  ('Moda Deniz Apartmanı','Moda Cad. No:62','Kadıköy',40.9832,29.0211,'damaged',48,85,6,'yigma',1964),
  ('Göztepe Konut Sitesi','Göztepe Mah. No:11','Kadıköy',40.9695,29.0671,'standing',9,210,10,'betonarme',1998),
  ('Hasanpaşa İş Hanı','Hasanpaşa Mah. No:3','Kadıköy',40.9934,29.0318,'destroyed',91,0,4,'yigma',1952),
  -- BEŞİKTAŞ (4)
  ('Çarşı Ticaret Merkezi','Çarşı Cad. No:44','Beşiktaş',41.0425,29.0042,'standing',7,420,12,'betonarme',2008),
  ('Levent Tower','Büyükdere Cad. No:201','Beşiktaş',41.0774,29.0098,'standing',3,850,32,'celik',2018),
  ('Balmumcu Apartmanı','Balmumcu Mah. No:17','Beşiktaş',41.0538,29.0176,'damaged',57,42,5,'yigma',1971),
  ('Sinanpaşa Konut','Sinanpaşa Mah. No:9','Beşiktaş',41.0482,29.0091,'standing',15,95,8,'betonarme',1990),
  -- ŞİŞLİ (4)
  ('Şişli Merkez AVM','Halaskargazi Cad. No:100','Şişli',41.0618,28.9887,'standing',4,1200,8,'betonarme',2010),
  ('Fulya Rezidans','Fulya Mah. No:22','Şişli',41.0643,28.9942,'standing',11,320,22,'betonarme',2006),
  ('Pangaltı Apartmanı','Pangaltı Mah. No:56','Şişli',41.0571,28.9842,'damaged',45,78,7,'yigma',1958),
  ('Bomonti Loft','Bomonti Mah. No:33','Şişli',41.0672,28.9798,'standing',8,190,14,'betonarme',2014),
  -- BEYOĞLU (4)
  ('İstiklal Ticaret Hanı','İstiklal Cad. No:180','Beyoğlu',41.0322,28.9775,'damaged',62,30,6,'yigma',1932),
  ('Taksim Residence','Gümüşsuyu Mah. No:12','Beyoğlu',41.0362,28.9843,'standing',6,280,20,'betonarme',2003),
  ('Karaköy Loft','Karaköy Mah. No:4','Beyoğlu',41.0228,28.9743,'standing',14,155,10,'betonarme',2011),
  ('Cihangir Klasik Apt.','Cihangir Mah. No:8','Beyoğlu',41.0289,28.9818,'destroyed',88,0,4,'yigma',1948),
  -- FATİH (4)
  ('Fatih Tarihi Han','Şehzadebaşı Cad. No:22','Fatih',41.0122,28.9512,'damaged',71,15,4,'yigma',1928),
  ('Aksaray Plaza','Turgut Özal Cad. No:55','Fatih',41.0088,28.9523,'standing',9,380,11,'betonarme',1995),
  ('Laleli Ticaret Merkezi','Ordu Cad. No:14','Fatih',41.0065,28.9581,'standing',18,520,9,'betonarme',1988),
  ('Balat Apartmanı','Vodina Cad. No:7','Fatih',41.0248,28.9438,'destroyed',95,0,3,'ahsap',1920),
  -- ÜSKÜDAR (4)
  ('Üsküdar Marina Rezidans','Sahil Yolu No:8','Üsküdar',41.0232,29.0137,'standing',6,290,16,'betonarme',2009),
  ('Bağlarbaşı Konut','Bağlarbaşı Mah. No:44','Üsküdar',41.0054,29.0289,'standing',13,145,8,'betonarme',1997),
  ('Çengelköy Yalısı','Çengelköy Cad. No:2','Üsküdar',41.0388,29.0612,'damaged',43,60,3,'ahsap',1885),
  ('Altunizade İş Hanı','Altunizade Mah. No:17','Üsküdar',41.0144,29.0418,'standing',21,480,14,'betonarme',1993),
  -- ATAŞEHİR (4)
  ('Ataşehir Finans Merkezi','Atatürk Cad. No:80','Ataşehir',40.9912,29.1245,'standing',2,1100,35,'celik',2017),
  ('Palladium Tower','Küçükbakkalköy Mah. No:5','Ataşehir',40.9845,29.1189,'standing',7,680,28,'betonarme',2014),
  ('Ataşehir Konut Sitesi','Yenişehir Mah. No:33','Ataşehir',40.9932,29.1312,'standing',16,350,12,'betonarme',2002),
  ('İçerenköy İş Merkezi','İçerenköy Mah. No:22','Ataşehir',40.9784,29.1155,'damaged',39,120,9,'betonarme',1991),
  -- MALTEPE (4)
  ('Maltepe Park Rezidans','Bağdat Cad. No:450','Maltepe',40.9321,29.1287,'standing',8,215,14,'betonarme',2007),
  ('Cevizli Konut','Cevizli Mah. No:18','Maltepe',40.9234,29.1342,'standing',11,178,10,'betonarme',1999),
  ('Maltepe Sahil Apartmanı','Sahil Cad. No:7','Maltepe',40.9412,29.1198,'damaged',54,88,6,'yigma',1972),
  ('Başıbüyük Mahallesi Konut','Başıbüyük Mah. No:4','Maltepe',40.9143,29.1424,'destroyed',83,0,5,'yigma',1965),
  -- KARTAL (3)
  ('Kartal İş Merkezi','İstasyon Cad. No:30','Kartal',40.9122,29.1888,'standing',6,320,12,'betonarme',2001),
  ('Uğur Mumcu Apartmanı','Uğur Mumcu Cad. No:15','Kartal',40.9065,29.1944,'damaged',66,40,5,'yigma',1969),
  ('Soğanlık Konut','Soğanlık Mah. No:22','Kartal',40.9187,29.1812,'standing',14,195,9,'betonarme',1994),
  -- PENDİK (3)
  ('Pendik Marina Sitesi','Sahil Blv. No:12','Pendik',40.8712,29.2321,'standing',4,380,16,'betonarme',2010),
  ('Kaynarca Konut','Kaynarca Mah. No:9','Pendik',40.8834,29.2189,'standing',19,220,10,'betonarme',1996),
  ('Pendik Eski Çarşı Apt.','Çarşı Cad. No:3','Pendik',40.8643,29.2412,'destroyed',78,0,4,'yigma',1958),
  -- ÜMRANİYE (4)
  ('Ümraniye İş Hanı','Alemdağ Cad. No:120','Ümraniye',41.0165,29.1023,'standing',10,410,12,'betonarme',2000),
  ('Dudullu OSB Binası','OSB Cad. No:5','Ümraniye',41.0287,29.1234,'standing',5,650,6,'celik',2015),
  ('Yamanevler Konut','Yamanevler Mah. No:44','Ümraniye',41.0023,29.0987,'damaged',42,110,8,'betonarme',1987),
  ('Çakmak Mahallesi Apt.','Çakmak Mah. No:11','Ümraniye',41.0234,29.1156,'standing',17,280,11,'betonarme',1993),
  -- BAĞCILAR (3)
  ('Bağcılar Merkez AVM','Bağcılar Cad. No:88','Bağcılar',41.0412,28.8512,'standing',9,890,7,'betonarme',2004),
  ('Kirazlı Konut Sitesi','Kirazlı Mah. No:24','Bağcılar',41.0534,28.8423,'standing',16,340,12,'betonarme',1999),
  ('Güneşli Sanayi Binası','Güneşli Mah. No:7','Bağcılar',41.0312,28.8634,'damaged',51,70,4,'yigma',1976),
  -- BAHÇELİEVLER (3)
  ('Bahçelievler İş Merkezi','Adnan Kahveci Blv. No:35','Bahçelievler',40.9987,28.8612,'standing',7,450,10,'betonarme',2001),
  ('Yenibosna Rezidans','Yenibosna Mah. No:16','Bahçelievler',41.0054,28.8523,'standing',13,290,18,'betonarme',2008),
  ('Soğanlı Apartmanı','Soğanlı Mah. No:5','Bahçelievler',40.9934,28.8734,'destroyed',92,0,4,'yigma',1962),
  -- BAKIRKÖY (3)
  ('Bakırköy Sahil Rezidans','Sahilyolu Cad. No:18','Bakırköy',40.9812,28.8723,'standing',6,360,20,'betonarme',2006),
  ('İncirli Ticaret Merkezi','İncirli Cad. No:55','Bakırköy',40.9876,28.8612,'standing',11,510,8,'betonarme',1997),
  ('Yeşilköy Konut','Yeşilköy Mah. No:22','Bakırköy',40.9712,28.8434,'damaged',37,95,7,'yigma',1978),
  -- KÜÇÜKÇEKMECE (3)
  ('Göl Rezidans','Göl Cad. No:8','Küçükçekmece',40.9923,28.7812,'standing',5,420,16,'betonarme',2011),
  ('Atakent Konut Sitesi','Atakent Mah. No:44','Küçükçekmece',40.9834,28.7723,'standing',18,285,12,'betonarme',2003),
  ('Halkalı İş Hanı','Halkalı Cad. No:33','Küçükçekmece',40.9987,28.7934,'damaged',59,55,6,'betonarme',1985),
  -- ESENYURT (3)
  ('Esenyurt Merkez Konut','Esenyurt Cad. No:100','Esenyurt',41.0312,28.6712,'standing',8,560,18,'betonarme',2009),
  ('Tahtakale Rezidans','Tahtakale Mah. No:7','Esenyurt',41.0234,28.6823,'standing',22,380,14,'betonarme',2004),
  ('Atatürk Mah. Apt.','Atatürk Mah. No:18','Esenyurt',41.0398,28.6634,'destroyed',85,0,5,'yigma',1968),
  -- BEYLİKDÜZÜ (3)
  ('Kristal Rezidans','E-5 Yan Yol No:12','Beylikdüzü',41.0023,28.6434,'standing',4,490,22,'betonarme',2013),
  ('Marmara Konut Sitesi','Marmara Mah. No:55','Beylikdüzü',40.9934,28.6512,'standing',11,320,16,'betonarme',2007),
  ('Cumhuriyet Mah. Apt.','Cumhuriyet Mah. No:9','Beylikdüzü',41.0112,28.6343,'damaged',44,88,8,'betonarme',1992),
  -- AVCILAR (3)
  ('Avcılar Marina Sitesi','Sahil Cad. No:20','Avcılar',40.9812,28.7212,'standing',7,310,12,'betonarme',2002),
  ('Cihangir Mah. Konut','Cihangir Mah. No:33','Avcılar',40.9734,28.7334,'standing',15,180,10,'betonarme',1996),
  ('Firuzköy İş Hanı','Firuzköy Cad. No:5','Avcılar',40.9887,28.7112,'damaged',67,25,5,'yigma',1971),
  -- BAŞAKŞEHİR (3)
  ('İnönü Sitesi','İnönü Cad. No:44','Başakşehir',41.0923,28.8012,'standing',5,720,20,'betonarme',2010),
  ('Kayaşehir Rezidans','Kayaşehir Mah. No:8','Başakşehir',41.0834,28.7923,'standing',9,480,18,'betonarme',2014),
  ('Başak Mah. Konut','Başak Mah. No:22','Başakşehir',41.1012,28.8134,'standing',17,360,14,'betonarme',2006),
  -- ESENLER (3)
  ('Esenler Çarşı Apt.','Çarşı Cad. No:15','Esenler',41.0412,28.8812,'damaged',55,65,5,'yigma',1975),
  ('Oruçreis Konut','Oruçreis Mah. No:28','Esenler',41.0523,28.8723,'standing',12,280,11,'betonarme',1998),
  ('Menderes İş Merkezi','Menderes Mah. No:6','Esenler',41.0312,28.8923,'standing',8,390,9,'betonarme',2005),
  -- GÜNGÖREN (3)
  ('Güngören İş Hanı','Merkez Mah. No:12','Güngören',41.0212,28.8812,'standing',11,330,8,'betonarme',1999),
  ('Tozkoparan Apartmanı','Tozkoparan Mah. No:7','Güngören',41.0134,28.8923,'damaged',48,72,6,'yigma',1967),
  ('Güngören Yeşil Konut','Yeşil Mah. No:34','Güngören',41.0287,28.8734,'standing',16,210,10,'betonarme',1994),
  -- BAYRAMPAŞA (3)
  ('Bayrampaşa İş Merkezi','Vatan Cad. No:88','Bayrampaşa',41.0512,28.9134,'standing',9,420,10,'betonarme',2000),
  ('Muratpaşa Mah. Apt.','Muratpaşa Mah. No:15','Bayrampaşa',41.0434,28.9212,'destroyed',89,0,4,'yigma',1959),
  ('Kartaltepe Konut','Kartaltepe Mah. No:9','Bayrampaşa',41.0587,28.9056,'standing',14,175,8,'betonarme',1996),
  -- EYÜPSULTAN (3)
  ('Eyüpsultan Tarihi Han','Eyüp Cad. No:5','Eyüpsultan',41.0623,28.9312,'damaged',73,20,3,'yigma',1935),
  ('Alibeyköy Konut','Alibeyköy Mah. No:44','Eyüpsultan',41.0834,28.9423,'standing',10,340,12,'betonarme',2002),
  ('Göktürk Rezidans','Göktürk Mah. No:18','Eyüpsultan',41.1012,28.9234,'standing',6,260,14,'betonarme',2016),
  -- GAZİOSMANPAŞA (3)
  ('Gaziosmanpaşa Çarşı','İsmet Paşa Cad. No:33','Gaziosmanpaşa',41.0723,28.9112,'standing',13,380,9,'betonarme',1997),
  ('Karadeniz Apt.','Karadeniz Cad. No:21','Gaziosmanpaşa',41.0645,28.9034,'damaged',61,48,5,'yigma',1973),
  ('Sarıgöl Konut','Sarıgöl Mah. No:8','Gaziosmanpaşa',41.0812,28.9234,'destroyed',96,0,3,'yigma',1944),
  -- SULTANGAZİ (3)
  ('Sultangazi Konut','Sultanahmet Cad. No:60','Sultangazi',41.1112,28.9134,'standing',8,460,14,'betonarme',2006),
  ('Uğur Sokak Apt.','Uğur Sok. No:14','Sultangazi',41.1034,28.9045,'standing',19,290,10,'betonarme',1993),
  ('Ziya Gökalp Konut','Ziya Gökalp Mah. No:5','Sultangazi',41.1187,28.9223,'damaged',38,95,8,'betonarme',1989),
  -- KAĞITHANE (3)
  ('Kağıthane Merkez Plaza','Merkez Mah. No:45','Kağıthane',41.0923,28.9712,'standing',6,510,16,'betonarme',2007),
  ('Çağlayan Apt.','Çağlayan Mah. No:12','Kağıthane',41.0845,28.9634,'standing',11,340,12,'betonarme',2000),
  ('Seyrantepe Konut','Seyrantepe Mah. No:8','Kağıthane',41.1023,28.9823,'damaged',46,80,7,'betonarme',1985),
  -- SARIYER (3)
  ('Boğaz Rezidans','Boğaziçi Cad. No:22','Sarıyer',41.1712,29.0523,'standing',4,280,18,'betonarme',2009),
  ('Maslak Tower','Büyükdere Cad. No:255','Sarıyer',41.1534,29.0234,'standing',2,1400,42,'celik',2020),
  ('Tarabya Yalısı','Tarabya Mah. No:5','Sarıyer',41.1867,29.0634,'damaged',35,90,3,'ahsap',1890),
  -- BEYKOZ (3)
  ('Çayırbaşı Konut','Çayırbaşı Mah. No:11','Beykoz',41.1223,29.0912,'standing',7,165,8,'betonarme',2001),
  ('Paşabahçe İş Merkezi','Paşabahçe Cad. No:8','Beykoz',41.1112,29.0834,'damaged',63,35,5,'yigma',1969),
  ('Kavacık Rezidans','Kavacık Mah. No:24','Beykoz',41.1345,29.1012,'standing',12,220,12,'betonarme',2012),
  -- SANCAKTEPE (3)
  ('Sancaktepe Yeni Konut','Yeni Mah. No:30','Sancaktepe',41.0023,29.2212,'standing',8,380,14,'betonarme',2013),
  ('Samandıra Apt.','Samandıra Mah. No:16','Sancaktepe',40.9934,29.2134,'standing',15,240,10,'betonarme',2005),
  ('Sarıgazi İş Hanı','Sarıgazi Mah. No:7','Sancaktepe',41.0123,29.2334,'destroyed',82,0,4,'yigma',1966),
  -- ZEYTİNBURNU (3)
  ('Zeytinburnu Marina','Sahil Yolu No:10','Zeytinburnu',41.0012,28.9012,'standing',9,430,16,'betonarme',2004),
  ('Kazlıçeşme İş Merkezi','E-5 Cad. No:22','Zeytinburnu',40.9934,28.8934,'damaged',53,75,8,'betonarme',1988),
  ('Seyitnizam Apt.','Seyitnizam Mah. No:8','Zeytinburnu',41.0087,28.9112,'standing',21,195,7,'betonarme',1995)
) AS d(name, address, district, lat, lng, status, damage_score, occupancy, floors, btype, yr);
