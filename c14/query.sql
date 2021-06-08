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
    FOREIGN KEY (jurusan) REFERENCES jurusan(nama)
);

INSERT INTO mahasiswa (nama, alamat, jurusan)
VALUES ('Fiqi', 'Cirebon', 'Kuliner'),
       ('Bambang', 'Bengkulu', 'Programming'),
       ('Fajar', 'Bandung', 'Desain');

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
VALUES ('tes123', 'kalkulus', 6, 'TTO'),
       ('oop555', 'fisika', 8, 'IIP'),
       ('abc999', 'kimia', 100, 'RRL');

CREATE TABLE kelas(
    jadwal time NOT NULL,
    hari varchar(10) NOT NULL,
    ruangan varchar NOT NULL,
    kode_matkul varchar (20) NOT NULL,
    FOREIGN KEY (kode_matkul)
        REFERENCES mata_kuliah (kode_matkul)
    PRIMARY KEY (jadwal, hari, kode_matkul)
);

INSERT INTO kelas (jadwal, hari, ruangan, kode_matkul)
VALUES ("12:50", 'senin', 'AA1', 'tes123'),
       ("19:30", 'selasa', 'B12', 'tes123'),
       ("08:30", 'rabu', 'C30', 'oop555');

CREATE TABLE nilai(
    nim_siswa varchar NOT NULL,
    kode_matkul varchar(10) NOT NULL,
    nilai_matkul varchar(2) NOT NULL,
    FOREIGN KEY (nim_siswa)
        REFERENCES mahasiswa (nim)
    FOREIGN KEY (kode_matkul)
        REFERENCES mata_kuliah (kode_matkul)
    PRIMARY KEY (nim_siswa, kode_matkul)
);

INSERT INTO nilai (nim_siswa, kode_matkul, nilai_matkul)
VALUES (1, 'tes123', 'B'),
       (1, 'oop555', 'C'),
       (2, 'tes123', 'D'),
       (2, 'oop555', 'A'),
       (3, 'tes123', 'A'),
       (3, 'oop555', 'B');

SELECT nilai_matkul FROM nilai WHERE nim_siswa =1;