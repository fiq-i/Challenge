const fs = require("fs");
const readline = require('readline');

fs.readFile('data.json', 'utf8', (err, jsonString) => {
	if (err) {
		console.log("Error reading file:", err);
	}
	let data = JSON.parse(jsonString);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: 'Tebakan:'
	})

	console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n');

	let counter = 0;
	console.log(`Pertanyaan: ${data[counter].question}`);

	rl.prompt();
	rl.on('line', (guess) => {
		if (guess.toLowerCase() == data[counter].answer.toLowerCase()) {
			console.log(`Selamat Anda Benar!\n`);
			counter += 1;
			if (counter == data.length) {
				console.log(`Hore Anda Menang!\n`);
				rl.close();
			}
			console.log(`Pertanyaan: ${data[counter].question} `)
		}
		else {
			console.log(`Wkwkwkwk, Anda kurang Beruntung!\n`)
		}
		rl.prompt();

	}).on('close', () => {
		process.exit(0);
	})
})
