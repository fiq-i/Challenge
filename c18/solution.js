// import {studentMenu, subjectMenu, classMenu, lecturerMenu, majorMenu} from './functional.js'
// const readline = require('readline');
import readline from 'readline'
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('universitas.db', err => {
    if (err) {
        return console.log('database error');
    }
});
// const Table = require('cli-table');
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
    [5] Kelas
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
                let opsi5 = new classMenu;
                opsi5.menu('kelas')
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



login()
// logout()
