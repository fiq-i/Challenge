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
class menu {
    constructor(type) {
        this.type = type;
    }
    list(type) { this.menu(type) }
    search(type) { this.menu(type)}
    add(type) { this.menu(type)}
    erase(type) { this.menu(type) }
    menu = (type) => {
        console.log(`==========================================================================
        silahkan pilih opsi dibawah ini 
        [1] daftar ${type}
        [2] cari ${type}
        [3] tambah ${type}
        [4] hapus ${type}
        [5] kembali\n==========================================================================
        `);
        rl.question("Masukan salah satu no. opsi di atas:", (option) => {
            switch (option) {
                case "1":
                    this.list();
                    // this.menu(type);
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
                    // menu();
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
            }
        super.list('mahasiswa')
        // super.menu('mahasiswa')
        })
        
    }

    search = () => {
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
                else {
                    console.log("NIM tidak terdaftar!");
                    searchStudent();
                }
            })
        })
        super.search()
    }

    add = () => {
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
        super.add()
    }
    erase = () => {
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
        super.erase()
    }
}


login()
// logout()
