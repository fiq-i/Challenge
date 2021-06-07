const fs = require("fs");
const readline = require('readline');

let read = process.argv[2];
if(read == undefined){
    console.log(`Tolong sertakan nama file dengan inputan soalnya.\nMisalnya 'node solution.js data.json'`);
    process.exit(0);
}
fs.readFile(read, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file:", err)
    }
    let obj = JSON.parse(jsonString);
    let i = 0;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Jawaban :'
    });
    console.log(`Selamat datang di permainan Tebak-tebakan. kamu akan diberikan pertanyaan dari file ini ${read}.\nUntuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.\n`);
    let count = 0;
    console.log(obj[count].question)
    rl.prompt();

    rl.on('line', (guess) => {
        if (guess.trim().toLowerCase() == 'skip') {
            obj.push(obj[i]);
            i++;
            console.log("\nPertanyaan: " + obj[i].question);
        } else {
            if (guess.toLowerCase() == obj[i].answer.toLowerCase()) {
                console.log('Anda beruntung!\n')
                count = 0;
                i++;
                if (i == obj.length) {
                    console.log('Anda Berhasil!')
                    rl.close();
                } else {
                    console.log(obj[i].question)
                }
            } else {
                count++;
                console.log(`\nAnda kurang beruntung. Anda telah salah ${count} kali, silahkan coba lagi.`)
            }
        }
        rl.prompt();
    }).on('close', () => {
        process.exit(0);
    });
});