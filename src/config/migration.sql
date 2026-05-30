CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS genre (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama_genre  VARCHAR(100) NOT NULL,
  slug        VARCHAR(100) UNIQUE NOT NULL,
  deskripsi   TEXT,
  ikon_url    VARCHAR(255),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS paket (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama_paket            VARCHAR(100) NOT NULL,
  deskripsi             TEXT,
  harga_bulanan         DECIMAL(12,2) NOT NULL,
  harga_tahunan         DECIMAL(12,2) NOT NULL,
  max_perangkat         INT DEFAULT 1,
  kualitas_stream       VARCHAR(10) DEFAULT 'HD' CHECK (kualitas_stream IN ('SD','HD','4K')),
  ada_download          BOOLEAN DEFAULT FALSE,
  ada_konten_eksklusif  BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "user" (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama           VARCHAR(150) NOT NULL,
  email          VARCHAR(150) UNIQUE NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  no_telpon      VARCHAR(20),
  avatar_url     VARCHAR(255),
  status         VARCHAR(10) DEFAULT 'aktif' CHECK (status IN ('aktif','nonaktif','banned')),
  created_at     TIMESTAMP DEFAULT NOW(),
  updated_at     TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "order" (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  paket_id         UUID NOT NULL REFERENCES paket(id),
  total_harga      DECIMAL(12,2) NOT NULL,
  status_order     VARCHAR(20) DEFAULT 'pending' CHECK (status_order IN ('pending','aktif','selesai','dibatalkan')),
  tanggal_order    TIMESTAMP DEFAULT NOW(),
  tanggal_mulai    TIMESTAMP,
  tanggal_selesai  TIMESTAMP,
  created_at       TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pembayaran (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id            UUID NOT NULL REFERENCES "order"(id) ON DELETE CASCADE,
  metode_pembayaran   VARCHAR(50) NOT NULL,
  nomor_referensi     VARCHAR(100),
  jumlah_bayar        DECIMAL(12,2) NOT NULL,
  status_pembayaran   VARCHAR(20) DEFAULT 'menunggu' CHECK (status_pembayaran IN ('menunggu','berhasil','gagal','dikembalikan')),
  waktu_bayar         TIMESTAMP,
  bukti_bayar_url     VARCHAR(255),
  created_at          TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS series_film (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul         VARCHAR(255) NOT NULL,
  sinopsis      TEXT,
  thumbnail_url VARCHAR(255),
  banner_url    VARCHAR(255),
  tahun_rilis   INT,
  sutradara     VARCHAR(150),
  pemeran       TEXT,
  tipe          VARCHAR(10) NOT NULL CHECK (tipe IN ('series','film')),
  rating_usia   VARCHAR(10) DEFAULT 'SU',
  imdb_score    DECIMAL(3,1),
  status_tayang VARCHAR(20) DEFAULT 'tayang' CHECK (status_tayang IN ('tayang','selesai','akan_tayang')),
  eksklusif     BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS episode_movie (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  series_film_id  UUID NOT NULL REFERENCES series_film(id) ON DELETE CASCADE,
  nomor_episode   INT DEFAULT 1,
  nomor_musim     INT DEFAULT 1,
  judul_episode   VARCHAR(255),
  deskripsi       TEXT,
  video_url       VARCHAR(255),
  thumbnail_url   VARCHAR(255),
  durasi_detik    INT,
  jumlah_penonton INT DEFAULT 0,
  tanggal_tayang  TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daftar_saya (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  series_film_id   UUID NOT NULL REFERENCES series_film(id) ON DELETE CASCADE,
  ditambahkan_pada TIMESTAMP DEFAULT NOW(),
  sudah_ditonton   BOOLEAN DEFAULT FALSE,
  progress_persen  DECIMAL(5,2) DEFAULT 0,
  UNIQUE(user_id, series_film_id)
);

CREATE TABLE IF NOT EXISTS series_genre (
  series_film_id  UUID NOT NULL REFERENCES series_film(id) ON DELETE CASCADE,
  genre_id        UUID NOT NULL REFERENCES genre(id) ON DELETE CASCADE,
  PRIMARY KEY (series_film_id, genre_id)
);

INSERT INTO genre (nama_genre, slug, deskripsi) VALUES
  ('Action',  'action',  'Film penuh aksi dan ketegangan'),
  ('Drama',   'drama',   'Cerita emosional dan penuh makna'),
  ('Komedi',  'komedi',  'Hiburan ringan mengundang tawa'),
  ('Sci-Fi',  'sci-fi',  'Fiksi ilmiah futuristik'),
  ('Horror',  'horror',  'Menegangkan dan menakutkan')
ON CONFLICT DO NOTHING;

INSERT INTO paket (nama_paket, deskripsi, harga_bulanan, harga_tahunan, max_perangkat, kualitas_stream, ada_download, ada_konten_eksklusif) VALUES
  ('Basic',    'Nikmati streaming standar',          29000,  290000, 1, 'SD',  FALSE, FALSE),
  ('Standard', 'Kualitas HD di 2 perangkat',         59000,  590000, 2, 'HD',  TRUE,  FALSE),
  ('Premium',  'Akses penuh 4K + konten eksklusif', 109000, 1090000, 4, '4K',  TRUE,  TRUE)
ON CONFLICT DO NOTHING;
