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
    umur INTEGER NOT NULL,
    totalsks INTEGER NOT NULL,
    FOREIGN KEY (jurusan) REFERENCES jurusan(nama)
);

CREATE TABLE kontrak (
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	nim	INTEGER NOT NULL,
	kode_matkul	varchar(20) NOT NULL,
	FOREIGN KEY(kode_matkul) REFERENCES mata_kuliah(kode_matkul));

INSERT INTO mahasiswa (nama, alamat, jurusan, umur, totalsks)
VALUES ('Fiqi', 'Cirebon', 'Kuliner', 20, 22),
       ('Bambang', 'Bengkulu', 'Programming', 18, 25),
       ('Fajar', 'Bandung', 'Desain', 17, 10),
       ('Alex', 'Bandung', 'Programming', 19 , 10) ;

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
    FOREIGN KEY (kode_matkul)
        REFERENCES mata_kuliah (kode_matkul)
    PRIMARY KEY (jadwal, hari, kode_matkul)
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
    FOREIGN KEY (nim_siswa)
        REFERENCES mahasiswa (nim)
    FOREIGN KEY (kode_matkul)
        REFERENCES mata_kuliah (kode_matkul)
    PRIMARY KEY (nim_siswa, kode_matkul)
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

1. SELECT * FROM mahasiswa;
2. SELECT * FROM mahasiswa WHERE umur < 20;
3. SELECT * FROM mahasiswa, nilai WHERE mahasiswa.nim = nilai.nim_siswa AND  nilai.nilai_matkul <= 'B';
4. SELECT * FROM mahasiswa WHERE mahasiswa.totalsks > 10;
5. SELECT mahasiswa.*, mata_kuliah.nama FROM mata_kuliah, nilai, mahasiswa WHERE mata_kuliah.nama = 'data mining' AND mata_kuliah.kode_matkul = nilai.kode_matkul AND nilai.nim_siswa = mahasiswa.nim;
6. SELECT dosen.nama, kelas.jumlah_mhs FROM dosen, mata_kuliah, kelas WHERE dosen.nip = mata_kuliah.kode_pengajar AND mata_kuliah.kode_matkul == kelas.kode_matkul;
7. SELECT nama, umur FROM mahasiswa ORDER BY umur DESC;
8. (SOLUSI WHERE) SELECT mahasiswa.*, mata_kuliah.nama, nilai.nilai_matkul, dosen.* FROM mahasiswa, nilai, mata_kuliah, dosen WHERE mahasiswa.nim = nilai.nim_siswa AND nilai.kode_matkul = mata_kuliah.kode_matkul AND mata_kuliah.kode_pengajar = dosen.nip
    AND nilai.nilai_matkul >= 'D';
   (SOLUSI JOIN) SELECT mahasiswa.*, mata_kuliah.nama, nilai.nilai_matkul, dosen.* FROM mahasiswa JOIN nilai ON mahasiswa.nim = nilai.nim_siswa JOIN mata_kuliah ON nilai.kode_matkul = mata_kuliah.kode_matkul JOIN dosen ON mata_kuliah.kode_pengajar = dosen.nip WHERE nilai.nilai_matkul >= 'D';







CREATE TABLE "kontrak" (
	"id"	INTEGER,
	"nim"	INTEGER NOT NULL,
	"kode_matkul"	varchar(20) NOT NULL,
	"kode_pengajar"	varchar(20) NOT NULL,
	FOREIGN KEY("kode_matkul") REFERENCES "mata_kuliah"("kode_matkul"),
	FOREIGN KEY("kode_pengajar") REFERENCES "mata_kuliah"("kode_pengajar"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE "kontrak" (
	"id"	INTEGER,
	"nim"	INTEGER NOT NULL,
	"kode_matkul"	TEXT NOT NULL,
	"kode_pengajar"	TEXT NOT NULL,
	FOREIGN KEY("nim") REFERENCES "mahasiswa"("nim"),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("kode_matkul") REFERENCES "mata_kuliah"("kode_matkul"),
	FOREIGN KEY("kode_pengajar") REFERENCES "mata_kuliah"("kode_pengajar")
);

INSERT INTO kontrak
(nim, kode_matkul, kode_pengajar)
VALUES
(1, "tes123", "TTO"),
(2, "oop55", "IIP"),
(3, "abc999", "RRL");
 

   





 





















app.listen(3000, () => {
    console.log('web ini berjalan di port 3000!')
})






<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Belajar Coding</title>
    <link
    
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <script src="main.js"></script>
  </head>
  <body>
        <form action="/add" method="POST">
            <h1>Add Data</h1>
    
            <div class="form-group" >
                    <label for="input" class="col-sm-1 col-form-label"> ID</label>
                    <div class="col-sm-11">
                        <input type="text" readonly name="id" class="form-control" placeholder="Id" >
                    </div>
    
            </div>
    
            <div class="form-group">
                <label for="input" class="col-sm-1 col-form-label"> String</label>
                <div class="col-sm-11">
                    <input type="text" name="dataString" class="form-control" placeholder="String">
                </div>
            </div>
    
            <div class="form-group">
                <label for="input" class="col-sm-1 col-form-label"> Integer</label>
                <div class="col-sm-11">

                    <input type="text" name="dataInteger" class="form-control" placeholder="Integer">
                </div>
    
            </div>
    
            <div class="form-group">
    
                <label for="input" class="col-sm-1 col-form-label">Float</label>
                <div class="col-sm-11">

                    <input type="text" name="dataFloat" class="form-control" placeholder="Float">
                </div>
    
            </div>
    
            <div class="form-group row">
                
                <label for="colFormLabelSm" class="col-sm-1 col-form-label col-form-label-sm">Date</label>
                <div class="col-sm-10">
                    <input type="date" name="dataDate">
                </div>
    
            </div>
    
            <div class="form-group row">    
                <label for="colFormLabelSm" class="col-sm-1 col-form-label">Boolean</label>
                <div class="col-sm-10">                    
                    <select class="form-control" id_type="exampleFormControlSelect1" name="dataBoolean">
                    <option value="">--pilih type--</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                    </select>
                </div>    
            </div>
            <button type="submit" class="btn btn-primary">submit</button>
        </form>
        
        
    </body>
</html>


<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Belajar Coding</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossorigin="anonymous"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" media="screen" href="/main.css" />
    <script src="/main.js"></script>
  </head>
  <body>
        <form action="" method="POST">
            <h1>Edit Data</h1>
           
                  
            <div class="form-group">
                <input type="hidden" name="id"  class="form-control" placeholder="ID" >
    
            </div>
            <div class="form-group">
    
                    <label for="exampleInputEmail1">id</label>
                    <input type="text" name="id" value="<%= data.id %>" class="form-control"  readonly > 
        
                </div>
    
            <div class="form-group">
    
                <label for="exampleInputEmail1">String</label>
                <input type="text" name="dataString" value="<%= data.dataString %>" class="form-control" placeholder="String">
    
            </div>
    
            <div class="form-group">
    
                <label for="exampleInputEmail1">Integer</label>
                <input type="text" name="dataInteger" value="<%= data.dataInteger %>" class="form-control" placeholder="Integer">
    
            </div>
    
            <div class="form-group">
    
                <label for="exampleInputEmail1">Float</label>
                <input type="text" name="dataFloat" value="<%= data.dataFloat %>" class="form-control" placeholder="Float">
    
            </div>
    
            <div class="form-group">
    
                <label for="exampleInputEmail1">Date</label>
                <input type="date" name="dataDate" value="<%= data.dataDate %>" class="from-control" maxlength="100">
    
            </div>
    
            <div class="form-group">
    
                <label for="exampleInputEmail1">Boolean</label>
                <select id_type="month" name="dataBoolean" value="<%= data.dataBoolean %>>
                    <option value="">--pilih type--</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
    
            </div>
    
            <button type="submit" class="btn btn-primary">UPDATE</button>
    
        </form>
    
    </body>
</html>