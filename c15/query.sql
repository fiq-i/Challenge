CREATE TABLE jurusan(
    kode_jurusan varchar(20) PRIMARY KEY NOT NULL,
    nama varchar(20) NOT NULL
);
INSERT INTO jurusan (kode_jurusan, nama)
VALUES ('MMX', 'Kuliner'),
    ('PPY', 'Programming'),
    ('DDZ', 'Desain');
CREATE TABLE mahasiswa(
    nim INTEGER PRIMARY KEY AUTOINCREMENT,
    nama varchar (40) NOT NULL,
    alamat text NOT NULL,
    jurusan varchar NOT NULL,
    ttl date NOT NULL,
    FOREIGN KEY (jurusan) REFERENCES jurusan(nama)
);
INSERT INTO mahasiswa (nama, alamat, jurusan, ttl)
VALUES ('Fiqi', 'Cirebon', 'Kuliner', '2001-01-01'),
    ('Bambang', 'Bengkulu','Programming','2000-02-02'),
    ('Fajar', 'Bandung', 'Desain', '2003-03-03'),
    ('Alex', 'Bandung', 'Programming', '2004-04-04');
CREATE TABLE dosen(
    nip varchar(20) PRIMARY KEY NOT NULL,
    nama varchar (40) NOT NULL
);
INSERT INTO dosen (nip, nama)
VALUES ('TTO', 'Aldy'),
    ('IIP', 'Rifqi'),
    ('RRL', 'Sofyan');
CREATE TABLE mata_kuliah(
    kode_matkul varchar(20) PRIMARY KEY NOT NULL,
    nama varchar(20) NOT NULL,
    sks SMALLINT NOT NULL,
    kode_pengajar varchar (20) NOT NULL,
    FOREIGN KEY (kode_pengajar) REFERENCES dosen (nip)
);
INSERT INTO mata_kuliah (kode_matkul, nama, sks, kode_pengajar)
VALUES ('tes123', 'kalkulus', 3, 'TTO'),
    ('oop555', 'fisika', 4, 'IIP'),
    ('abc999', 'kimia', 5, 'RRL'),
    ('vvv007', 'data mining', 5, 'RRL');
CREATE TABLE kelas(
    jadwal time NOT NULL,
    hari varchar(10) NOT NULL,
    ruangan varchar NOT NULL,
    kode_matkul varchar (20) NOT NULL,
    jumlah_mhs INTEGER NOT NULL,
    FOREIGN KEY (kode_matkul) REFERENCES mata_kuliah (kode_matkul) PRIMARY KEY (jadwal, hari, kode_matkul)
);
INSERT INTO kelas (jadwal, hari, ruangan, kode_matkul, jumlah_mhs)
VALUES ("12:50", 'senin', 'AA1', 'tes123', 10),
    ("19:30", 'selasa', 'B12', 'tes123', 20),
    ("08:30", 'rabu', 'C30', 'oop555', 15),
    ("10:00", 'kamis', 'Z03', 'vvv007', 30);
CREATE TABLE nilai(
    nim_siswa varchar NOT NULL,
    kode_matkul varchar(10) NOT NULL,
    nilai_matkul varchar(2) NOT NULL,
    FOREIGN KEY (nim_siswa) REFERENCES mahasiswa (nim) FOREIGN KEY (kode_matkul) REFERENCES mata_kuliah (kode_matkul) PRIMARY KEY (nim_siswa, kode_matkul)
);
INSERT INTO nilai (nim_siswa, kode_matkul, nilai_matkul)
VALUES (1, 'tes123', 'B'),
    (1, 'oop555', 'E'),
    (2, 'tes123', 'D'),
    (2, 'oop555', 'A'),
    (3, 'oop555', 'B'),
    (1, 'vvv007', 'C'),
    (3, 'vvv007', 'B'),
    (4, 'vvv007', 'D'),
    (4, 'tes123', 'E'),
    (4, 'oop555', 'A');

1. SELECT *
FROM mahasiswa;

2. SELECT *
FROM mahasiswa
WHERE umur < 20;

3. SELECT *
FROM mahasiswa,
    nilai
WHERE mahasiswa.nim = nilai.nim_siswa
    AND nilai.nilai_matkul <= 'B';

4. SELECT SUM(mata_kuliah.sks), mahasiswa.nama AS totalsks
FROM mahasiswa,
    nilai,
    mata_kuliah
WHERE mahasiswa.nim = nilai.nim_siswa
    AND nilai.kode_matkul = mata_kuliah.kode_matkul
    GROUP BY nim
    HAVING SUM(mata_kuliah.sks) > 10;


5. SELECT mahasiswa.*,
    mata_kuliah.nama
FROM mata_kuliah,
    nilai,
    mahasiswa
WHERE mata_kuliah.nama = 'data mining'
    AND mata_kuliah.kode_matkul = nilai.kode_matkul
    AND nilai.nim_siswa = mahasiswa.nim;

6. SELECT dosen.nama,
    SUM(kelas.jumlah_mhs)
FROM dosen,
    mata_kuliah,
    kelas
WHERE dosen.nip = mata_kuliah.kode_pengajar
    AND mata_kuliah.kode_matkul == kelas.kode_matkul
GROUP BY dosen.nama;

7. SELECT (strftime('%Y', 'now') - strftime('%Y', ttl)) - (
        strftime('%m-%d', 'now') < strftime('%m-%d', ttl)
    ) AS umur,
    nama
FROM mahasiswa
GROUP BY umur;

8. SELECT jurusan.*,
    mahasiswa.*,
    mata_kuliah.nama,
    nilai.nilai_matkul,
    dosen.*
FROM jurusan,
    mahasiswa,
    nilai,
    mata_kuliah,
    dosen
WHERE jurusan.nama = mahasiswa.jurusan
    AND mahasiswa.nim = nilai.nim_siswa
    AND nilai.kode_matkul = mata_kuliah.kode_matkul
    AND mata_kuliah.kode_pengajar = dosen.nip
    AND nilai.nilai_matkul >= 'D';
    
SELECT jurusan.*,
    mahasiswa.*,
    mata_kuliah.nama,
    nilai.nilai_matkul,
    dosen.*
FROM jurusan
    JOIN mahasiswa ON jurusan.nama = mahasiswa.jurusan
    JOIN nilai ON mahasiswa.nim = nilai.nim_siswa
    JOIN mata_kuliah ON nilai.kode_matkul = mata_kuliah.kode_matkul
    JOIN dosen ON mata_kuliah.kode_pengajar = dosen.nip
WHERE nilai.nilai_matkul >= 'D';