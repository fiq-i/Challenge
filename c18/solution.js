const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('universitas.db', err => {
    if (err) {
        return console.log('database error');
    }
});
const Table = require('cli-table');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
login = () => {

  console.log(`====================================================
     WELCOME to Universitas Pendidikan Indonesia
                  Jl setiabudi No. 255\n====================================================`);
                
    let sqlIdentity = `SELECT * FROM admin WHERE id=?`;
    let sqlPassword = `SELECT * FROM admin WHERE pw=?`;

    rl.question("username: ", name => {
        id = name;
        db.all(sqlIdentity, [id], (err, row) => {
            if (err) throw err;

            if (row.length > 0) {
                rl.question("password: ", passwords => {
                    pw = passwords;
                    db.all(sqlPassword, [pw], (err, rows) => {
                        if (err) throw err;

                        if (rows.length > 0) {
                            console.log(`Welcome, ${name} your acces level is: ADMIN `);
                            console.log('==================================================================');
                            mainMenu()
                        } else {
                            console.log("Password salah !!");
                            console.log('=================================================================');
                            return login();
                        }
                    })
                })
            } else {
                console.log('coba kembali');
                return login();
            }
        })
    });
}

logout = () => {
    console.log("Anda telah keluar.");
    login();
}
 mainMenu = () => {
    console.log(`==================================================================
    silahkan pilih opsi dibawah ini MENU UTAMA
    [1] Mahasiswa
    [2] Jurusan
    [3] Dosen
    [4] Matakuliah
    [5] Kontrak
    [6] Keluar\n==================================================================
    `);
    rl.question("Masukan salah satu no.  dari opsi di atas:", (Number) => {
        switch (Number) {
            case "1":
                menuStudent();
                break;
            case "2":
                menuMajor();
                break;
            case "3":
                menuLecturer();
                break;
            case "4":
                menuSubject();
                break;
            case "5":
                menuContract();
                break;
            case "6":
                logout();
                break;
            default:
                console.log('tidak ada pilihan');
                mainMenu();
                break;
        }
    })
}


 menuStudent = () => {
    console.log(`==========================================================================
    silahkan pilih opsi dibawah ini MENU MAHASISWA
    [1] daftar murid
    [2] cari murid
    [3] tambah murid
    [4] hapus murid
    [5] kembali\n==========================================================================
    `);
    rl.question("Masukan salah satu no. opsi di atas:", (Number) => {
        switch (Number) {
            case "1":
                listStudent();
                break;
            case "2":
                searchStudent();
                break;
            case "3":
                addStudent();
                break;
            case "4":
                deleteStudent();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Tidak ada pilihan");
                menuStudent();
                break;
        }
    })
}

 listStudent = () => {
    let sql = `SELECT mahasiswa.*
    FROM mahasiswa`
    db.all(sql, (err, row) => {
        if (err) throw err;
        if (row) {
            let table = new Table({
                head: ['NIM', 'NAMA', 'ALAMAT', 'Nama Jurusan']
            });
            row.forEach((mahasiswa) => {
                table.push(
                    [`${mahasiswa.nim}`, `${mahasiswa.nama}`, `${mahasiswa.alamat}`, `${mahasiswa.jurusan}`]
                );
            });
            console.log(table.toString());
            menuStudent();
        }
    })
}
 searchStudent = () => {
    console.log('=======================================================');
    rl.question("Masukan Nim:", (nim) => {
        let sql = `SELECT * FROM mahasiswa WHERE nim=?`;
        db.get(sql, [nim], (err, mahasiswa) => {
            if (err) throw err;
            if (mahasiswa) {
                console.log('NIM        : ', `${mahasiswa.nim}`);
                console.log('nama       : ', `${mahasiswa.nama}`);
                console.log('alamat     : ', `${mahasiswa.alamat}`);
                console.log('jurusan    : ', `${mahasiswa.jurusan}`);
                menuStudent();
            }
            
            else{
                console.log("NIM tidak terdaftar!");
                searchStudent();
            }
               
        })
    })
}

 addStudent = () => {
    console.log('Lengkapi data di bawah ini ');
        rl.question("Nama Mahasiswa:", (nama_mhs) => {
                rl.question("jurusan:", (jurusan) => {
                    rl.question("alamat:", (alamat) => {
                        const sql = `INSERT INTO mahasiswa (nama, jurusan, alamat)VALUES (?,?,?)`;
                        id_nama = nama_mhs;
                        id_jurusan = jurusan;
                        id_alamat = alamat;
                        db.all(sql, [id_nama, id_jurusan, id_alamat], (err) => {
                            if (err) throw err;
                            console.log('sukses menambahkan mahasiswa');
                            listStudent();
                        })
            })
        })
    })
}
 deleteStudent = () => {

    const sql = `DELETE FROM mahasiswa WHERE nim=?`;
    rl.question("Masukan NIM mahasiswa yang akan dihapus:", nim => {
        identitasmhs = nim;
        db.run(sql, [identitasmhs], (err, row) => {
            if (err) throw err;
            console.log(`mahasiswa dengan nim ${identitasmhs} telah dihapus`)
            listStudent();
            menuStudent();
        })
    })
}

menuMajor = () => {
    console.log(`==================================================================
        silahkan pilih opsi dibawah ini MENU JURUSAN
        [1] daftar jurusan
        [2] cari jurusan
        [3] tambah jurusan
        [4] hapus jurusan
        [5] kembali
        ==================================================================`);
    rl.question("Masukan salah satu no. opsi di atas:", (Number) => {
        switch (Number) {
            case "1":
                listMajor();
                break;
            case "2":
                searchMajor();
                break;
            case "3":
                addMajor();
                break;
            case "4":
                deleteMajor();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Tidak ada pilihan");
                menuMajor();
                break;
        }
    })
}

 menuLecturer = () => {
    console.log(`==================================================================
    silahkan pilih opsi dibawah ini MENU DOSEN
    [1] daftar dosen
    [2] cari dosen
    [3] tambah dosen
    [4] hapus dosen
    [5] kembali
    ==================================================================
    `);
    rl.question("Masukan salah satu no. opsi di atas:", (Number) => {
        switch (Number) {
            case "1":
                listLecturer();
                break;
            case "2":
                searchLecturer();
                break;
            case "3":
                addLecturer();
                break;
            case "4":
                deleteLecturer();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Tidak ada pilihan");
                menu_dosen();
                break;
        }
    })
}
 menuSubject = () => {
    console.log(`==================================================================
    silahkan pilih opsi dibawah ini MENU MATA KULIAH
    [1] daftar mata kuliah
    [2] cari mata kuliah
    [3] tambah mata kuliah
    [4] hapus mata kuliah
    [5] kembali
    ==================================================================
    `);
    rl.question("Masukan salah satu no. opsi di atas:", (Number) => {
        switch (Number) {
            case "1":
                listSubject();
                break;
            case "2":
                seacrhSubject();
                break;
            case "3":
                addSubject();
                break;
            case "4":
                deleteSubject();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Tidak ada pilihan");
                menuSubject();
                break;
        }
    })
}

 menuContract = () =>{
    console.log(`==================================================================
    silahkan pilih opsi dibawah ini MENU KONTRAK
    [1] daftar kontrak
    [2] cari kontrak
    [3] tambah kontrak
    [4] hapus kontrak
    [5] kembali
    ==================================================================
    `);
    rl.question("Masukan salah satu no. opsi di atas:", (Number) => {
        switch (Number) {
            case "1":
                listContract();
                break;
            case "2":
                SeacrhContract();
                break;
            case "3":
                addkontrak();
                break;
            case "4":
                Deletekontrak();
                break;
            case "5":
                menuutama();
                break;
            default:
                console.log("Tidak ada pilihan");
                menu_kontrak();
                break;
        }
    })
}



login()
// logout()
