const readline = require('readline');
// import readline from 'readline';
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
    silahkan pilih opsi dibawah ini
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
                let opsi1 = new studentMenu;
                opsi1.menu('mahasiswa')
                break;
            case "2":
                let opsi2 = new majorMenu;
                opsi2.menu('jurusan')
                break;
            case "3":
                let opsi3 = new lecturerMenu;
                opsi3.menu('dosen')
                break;
            case "4":
                let opsi4 = new subjectMenu;
                opsi4.menu('mata_kuliah')
                break;
            case "5":
                let opsi5 = new contractMenu;
                opsi5.menu('kontrak')
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
class menu {
    constructor(type) {
        this.type = type;
    }
    list(type) { this.menu(type) }
    search(type) { this.menu(type) }
    add(type) { this.menu(type) }
    erase(type) { this.menu(type) }
    menu = (type) => {
        console.log(`================================================================
        silahkan pilih opsi dibawah ini 
        [1] daftar ${type}
        [2] cari ${type}
        [3] tambah ${type}
        [4] hapus ${type}
        [5] kembali\n================================================================
        `);
        rl.question("Masukan salah satu no. opsi di atas:", (option) => {
            switch (option) {
                case "1":
                    this.list();
                    break;
                case "2":
                    this.search();
                    break;
                case "3":
                    this.add();
                    break;
                case "4":
                    this.erase();
                    break;
                case "5":
                    mainMenu();
                    break;
                default:
                    console.log("Tidak ada pilihan");
                    break;
            }
        })
    }
}

class studentMenu extends menu {
    constructor(type) {
        super(type)
        this.type = type
    }
    list = () => {
        let sql1 = `SELECT mahasiswa.*
        FROM mahasiswa`
        db.all(sql1, (err, row) => {
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
            }
            super.list('mahasiswa')
        })

    }

    search = () => {
        console.log('=======================================================');
        rl.question("Masukan Nim:", (nim) => {
            let sql2 = `SELECT * FROM mahasiswa WHERE nim=?`;
            db.get(sql2, [nim], (err, mahasiswa) => {
                if (err) throw err;
                if (mahasiswa) {
                    console.log('NIM        : ', `${mahasiswa.nim}`);
                    console.log('nama       : ', `${mahasiswa.nama}`);
                    console.log('alamat     : ', `${mahasiswa.alamat}`);
                    console.log('jurusan    : ', `${mahasiswa.jurusan}`);
                    super.search('mahasiswa')
                }
                else {
                    console.log("NIM tidak terdaftar!");
                    this.search()
                }
            })
            super.search('mahasiswa')
        })
    }

    add = () => {
        console.log('Lengkapi data di bawah ini ');
        rl.question("Nama Mahasiswa:", (nama_mhs) => {
            rl.question("jurusan:", (jurusan) => {
                rl.question("alamat:", (alamat) => {
                    let sql3 = `INSERT INTO mahasiswa (nama, jurusan, alamat)VALUES (?,?,?)`;
                    let id_nama = nama_mhs;
                    let id_jurusan = jurusan;
                    let id_alamat = alamat;
                    db.all(sql3, [id_nama, id_jurusan, id_alamat], (err) => {
                        if (err) throw err;
                        console.log('sukses menambahkan mahasiswa');
                        super.list('mahasiswa');
                    })
                })
            })
        })
    }

    erase = () => {
        let sql4 = `DELETE FROM mahasiswa WHERE nim=?`;
        rl.question("Masukan NIM mahasiswa yang akan dihapus:", nim => {
            let identitasmhs = nim;
            db.run(sql4, [identitasmhs], (err, row) => {
                if (err) throw err;
                console.log(`mahasiswa dengan nim ${identitasmhs} telah dihapus`)
                super.list('mahasiswa');
            })
        })
    }
}
class majorMenu extends menu {
    constructor(type) {
        super(type)
        this.type = type
    }

    list = () => {
        let sql = `SELECT * FROM jurusan`;
        db.all(sql, (err, row) => {
            if (err) throw err;
            if (row) {
                let table = new Table({
                    head: ['KODE JURUSAN', 'NAMA JURUSAN']
                });
                row.forEach((jurusan) =>
                    table.push(
                        [`${jurusan.kode_jurusan}`, `${jurusan.nama}`]
                    ))
                console.log(table.toString());
            }
            super.list('jurusan')
        })
    }
    search = () => {
        console.log('=======================================================');
        rl.question('Masukan Kode Jurusan :', (kode) => {
            let sql = `SELECT * FROM jurusan WHERE kode_jurusan =?`;
            db.get(sql, [kode], (err, jurusan) => {
                if (err) throw err;
                if (jurusan) {
                    console.log('KODE JURUSAN :', `${jurusan.kode_jurusan}`);
                    console.log('NAMA JURUSAN', `${jurusan.nama}`);
                    super.search('jurusan')
                }
                else {
                    console.log('Kode Jurusan tidak terdaftar!');
                    super.search('jurusan')
                }
            })
        })
        super.search('jurusan')
    }
    add = () => {
        console.log('Lengkapi data di bawah ini');
        rl.question("Kode Jurusan :", (kode) => {
            rl.question("Nama Jurusan :", (nama) => {
                let sql = 'INSERT INTO jurusan (kode_jurusan, nama) VALUES (?, ?)';
                let kd = kode;
                let nm = nama;
                db.all(sql, [kd, nm], (err) => {
                    if (err) throw err;
                    console.log('Sukses menambahkan jurusan');
                    super.list('jurusan');
                })
            })
        })
    }
    erase = () => {
        let sql = `DELETE FROM jurusan WHERE kode_jurusan=?`;
        rl.question("Masukan kode jurusan yang akan dihapus :", kode => {
            let kd = kode;
            db.run(sql, [kd], (err, row) => {
                if (err) throw err;
                console.log(`Jurusan dengan kode jurusan ${kd} telah dihapus`)
                super.list('jurusan')
            })
        })
    }
}

class lecturerMenu extends menu {
    constructor(type) {
        super(type)
        this.type = type
    }

    list = () => {
        let sql = `SELECT * FROM dosen`;
        db.all(sql, (err, row) => {
            if (err) throw err;
            if (row) {
                let table = new Table({
                    head: ['NIP', 'NAMA']
                });
                row.forEach((dosen) =>
                    table.push(
                        [`${dosen.nip}`, `${dosen.nama}`]
                    ))
                console.log(table.toString());
            }
            super.list('dosen')
        })
    }
    search = () => {
        console.log('=======================================================');
        rl.question("Masukan kode dosen :", (kd) => {
            let sql = `SELECT * FROM dosen WHERE nip =?`
            db.get(sql, [kd], (err, dosen) => {
                if (err) throw err;
                if (dosen) {
                    console.log(`Kode Dosen :`, `${dosen.nip}`)
                    console.log(`Nama Dosen :`, `${dosen.nama}`)
                    super.search('dosen')
                }
                else {
                    console.log(`Kode dosen tidak terdaftar!`)
                    super.search('dosen')
                }
            })
        })
    }
    add = () => {
        console.log(`Lengkapi data di bawah ini`);
        rl.question("Kode Dosen :", (kode) => {
            rl.question("Nama Dosen :", (nama) => {
                let sql = `INSERT INTO dosen (nip, nama) VALUES (?, ?)`;
                let kd = kode;
                let nm = nama;
                db.all(sql, [kd, nm], (err) => {
                    if (err) throw err;
                    console.log(`sukses menambahkan dosen`);
                    super.list('dosen');
                })
            })
        })
    }
    erase = () => {
        let sql = 'DELETE FROM dosen WHERE nip=?';
        rl.question('Masukkan kode dosen yang akan dihapus :', kode => {
            let kd = kode;
            db.run(sql, [kd], (err, row) => {
                if (err) throw err;
                console.log(`Dosen dengan kode dosen ${kd} telah dihapus`)
                super.list('dosen')
            })
        })
    }
}
class subjectMenu extends menu {
    constructor(type) {
        super(type)
        this.type = type
    }
    list = () => {
        let sql = `SELECT * FROM mata_kuliah`;
        db.all(sql, (err, row) => {
            if (err) throw err;
            if (row) {
                let table = new Table({
                    head: [`KODE MATA KULIAH`, `NAMA MATA KULIAH`, 'SKS', 'KODE PENGAJAR']
                });
                row.forEach((mata_kuliah) =>
                    table.push(
                        [`${mata_kuliah.kode_matkul}`, `${mata_kuliah.nama}`, `${mata_kuliah.sks}`, `${mata_kuliah.kode_pengajar}`]
                    ))
                console.log(table.toString());
            }
            super.list('mata_kuliah')
        })
    }
    search = () => {
        console.log('=======================================================');
        rl.question("Masukan kode mata kuliah :", (kode) => {
            let sql = `SELECT * FROM mata_kuliah WHERE kode_matkul=?`;
            db.get(sql, [kode], (err, mata_kuliah) => {
                if (err) throw err;
                if (mata_kuliah) {
                    console.log('Kode Mata Kuliah :', `${mata_kuliah.kode_matkul}`);
                    console.log('Nama Mata Kuliah :', `${mata_kuliah.nama}`);
                    console.log('SKS :', `${mata_kuliah.sks}`);
                    console.log('Kode Pengajar :', `${mata_kuliah.kode_pengajar}`);
                    super.search('mata_kuliah')
                }
                else {
                    console.log(`Kode Mata Kuliah tidak terdaftar!`);
                    super.search('mata_kuliah');
                }
            })
            super.search('mata_kuliah');
        })

    }
    add = () => {
        console.log('Lengkapi data dibawah ini');
        rl.question("Kode Mata Kuliah :", (kode) => {
            rl.question("Nama Mata Kuliah :", (nama) => {
                rl.question("SKS Mata Kuliah :", (sks) => {
                    rl.question("Kode Pengajar :", (kodepengajar) => {
                        let sql = 'INSERT INTO mata_kuliah (kode_matkul, nama, sks, kode_pengajar) VALUES (?,?,?,?)';
                        let kd = kode;
                        let nm = nama;
                        let s = sks;
                        let kp = kodepengajar;
                        db.all(sql, [kd, nm, s, kp], (err) => {
                            if (err) throw err;
                            console.log('Sukses menambahkan mata kuliah');
                            super.list('mata_kuliah')
                        })
                    })
                })
            })
        })
    }
    erase = () => {
        let sql = `DELETE FROM mata_kuliah where kode_matkul=?`;
        rl.question("Masukkan kode mata kuliah yang akan dihapus:", kode => {
            let kd = kode;
            db.run(sql, [kd], (err, row) => {
                if (err) throw err;
                console.log(`mata kuliah dengan kode ${kd} telah dihapus`)
                super.list('mata_kuliah');
            })
        })
    }
}



class contractMenu extends menu {
    constructor(type) {
        super(type)
        this.type = type
    }
    list = () => {
        let sql = `SELECT * FROM kontrak`;
        db.all(sql, (err, row) => {
            if (err) throw err;
            if (row) {
                let table = new Table({
                    head: [`ID`, `NIM`, 'KODE MATA KULIAH', 'KODE PENGAJAR']
                });
                row.forEach((kontrak) =>
                    table.push(
                        [`${kontrak.id}`, `${kontrak.nim}`, `${kontrak.kode_matkul}`, `${kontrak.kode_pengajar}`]
                    ))
                console.log(table.toString());
            }
            super.list('kontrak')
        })
    }
    search = () => {
        console.log('=======================================================');

        rl.question('Masukan NIM mahasiswa :', (nim) => {
            let sql = `SELECT * FROM kontrak WHERE nim =?`;
            // db.all(sql, (err, row) => {
            //     if (err) throw err;
            //     if (row) {
            //         let table = new Table({
            //             head: [`ID`, `NIM`, 'KODE MATA KULIAH', 'KODE PENGAJAR']
            //         })
            //         row.forEach((kontrak) =>
            //             {if (kontrak.nim == x)
            //                 {table.push(
            //                 [`${kontrak.id}`, `${kontrak.nim}`, `${kontrak.kode_matkul}`, `${kontrak.kode_pengajar}`])
            //             }}
            //              ) , console.log(table.toString())
            //     } 
            //     super.list('kontrak')
            // })
            db.get(sql, [nim], (err, kontrak) => {
                if (err) throw err;
                if (kontrak) {
                    console.log('NIM :', `${kontrak.nim}`);
                    console.log('Kode Mata Kuliah', `${kontrak.kode_matkul}`);
                    console.log('Kode Pengajar', `${kontrak.kode_pengajar}`);

                super.search('kontrak')
                }
                else {
                    console.log('NIM tidak terdaftar di kontrak!');
                    super.search('kontrak')
                }
            })

        })
    }
    add = () => {
        console.log('Lengkapi data dibawah ini');
        rl.question("Nim :", (nim) => {

            let sql = `SELECT * FROM mata_kuliah`;

            db.all(sql, (err, row) => {
                if (err) throw err;
                if (row) {
                    let table = new Table({
                        head: [`KODE MATA KULIAH`, `NAMA MATA KULIAH`, 'SKS', 'KODE PENGAJAR']
                    });
                    row.forEach((mata_kuliah) =>
                        table.push(
                            [`${mata_kuliah.kode_matkul}`, `${mata_kuliah.nama}`, `${mata_kuliah.sks}`, `${mata_kuliah.kode_pengajar}`]
                        ))
                    console.log(table.toString());
                    rl.question("Kode Mata Kuliah :", (kode_matkul) => {
                        rl.question("Kode Pengajar :", (kode_pengajar) => {
                            let sql = 'INSERT INTO kontrak (nim, kode_matkul, kode_pengajar) VALUES (?,?,?)';
                            let kd = nim;
                            let nm = kode_matkul;
                            let s = kode_pengajar;
                            db.all(sql, [kd, nm, s], (err) => {
                                if (err) throw err;
                                console.log('Sukses menambahkan kontrak kuliah');
                                super.list('kontrak')
                            })
                        })
                    })
                }
            })


            

        })
    }
    erase = () => {
        let sql = `DELETE FROM mata_kuliah where id=?`;
        rl.question("Masukkan kode mata kuliah yang akan dihapus:", kode => {
            let kd = kode;
            db.run(sql, [kd], (err, row) => {
                if (err) throw err;
                console.log(`mata kuliah dengan kode ${kd} telah dihapus`)
                super.list('mata_kuliah');
            })
        })
    }
}


login()
// logout()
