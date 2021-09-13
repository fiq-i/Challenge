const fs = require("fs");
const readline = require('readline');
let read = process.argv[2];
if (read == undefined) {
    console.log(`Tolong sertakan nama file dengan inputan soalnya.\nMisalnya 'node solution.js data.json'`);
    process.exit(0);
}
fs.readFile(read, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file:", err)
    }
    let array = JSON.parse(jsonString);
    let current = 0;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Jawaban :'
    });
    console.log(`Selamat datang di permainan Tebak-tebakan. kamu akan diberikan pertanyaan dari file ini ${read}.\nUntuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.\n`);
    let counter = 0;
    console.log(array[counter].question)
    rl.prompt();

    rl.on('line', (guess) => {
        if (guess.trim().toLowerCase() == 'skip') {
            array.push(array[current]);
            current++;
            console.log("\nPertanyaan: " + array[current].question);
        } else {
            if (guess.toLowerCase() == array[current].answer.toLowerCase()) {
                console.log('Anda beruntung!\n')
                counter = 0;
                current++;
                if (current == array.length) {
                    console.log('Anda Berhasil!')
                    rl.close();
                } else {
                    console.log(array[current].question)
                }
            } else {
                counter++;
                console.log(`\nAnda kurang beruntung. Anda telah salah ${counter} kali, silahkan coba lagi.`)
            }
        }
        rl.prompt();
    }).on('close', () => {
        process.exit(0);
    });
});


