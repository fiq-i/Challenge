let command = process.argv[2]
const fs = require("fs");
const readline = require('readline');
fs.readFile('todo.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file:", err)
    }
    let array1 = JSON.parse(jsonString);

    switch (command) {
        case "add":
            let newTask = process.argv[3].toString();
            {
                obj = { "number": array1.length + 1, "status": false, "activity": newTask }
                array1.push(obj)
                arrayString = JSON.stringify(array1)
                fs.writeFileSync('todo.json', arrayString, function (err) {
                    if (err) {
                        return console.log(err);
                    }

                })
            }
            console.log(array1)
            break;

        case "list":
            let i = 1;
            array1.forEach(element => {
                let tick = " "
                if (element.status == true) {
                    tick = "x"
                    console.log(`${i++}. [${tick}] ${element.activity}`)
                }
                else
                    console.log(`${i++}. [${tick}] ${element.activity}`)
            });
            break;

        case "delete":
            let deletedId = process.argv[3];

            array1.splice(deletedId, 1)
            console.log(array1)
            arrayString = JSON.stringify(array1)
            fs.writeFileSync('todo.json', arrayString, function (err) {
                if (err) {
                    console.log(err);
                }
            })
            break;

        case `complete`:
            let completedId = process.argv[3];
            array1[completedId].status = true
            console.log(array1)
            arrayString = JSON.stringify(array1)
            fs.writeFileSync('todo.json', arrayString, function (err) {
                if (err) {
                    console.log(err);
                }
            })
            break;

        case `uncomplete`:
            let uncompletedId = process.argv[3];
            array1[uncompletedId].status = false
            console.log(array1)
            arrayString = JSON.stringify(array1)
            fs.writeFileSync('todo.json', arrayString, function (err) {
                if (err) {
                    console.log(err);
                }
            })
            break;

        case "list:outstanding":
            let j = 1
            let space = " "
            if (process.argv[3] == "asc") {
                for (j; j < array1.length; j++) {
                    if (array1[j].status == false) {
                        console.log(`${j + 1}. [${space}] ${array1[j].activity}`)
                    }
                }
            } else

                if (process.argv[3] == "desc") {
                    for (j = array1.length - 1; j >= 0; j--) {
                        if (array1[j].status == false) {
                            console.log(`${j + 1}. [${space}] ${array1[j].activity}`)
                        }
                    }
                }
            break;

        case "list:completed":
            let k = 0
            let symbol = "x"
            if (process.argv[3] == "asc") {
                for (k; k < array1.length; k++) {
                    if (array1[k].status == true) {
                        console.log(`${k + 1}. [${symbol}] ${array1[k].activity}`)
                    }
                }
            } else
                if (process.argv[3] == "desc") {
                    for (k = array1.length - 1; k >= 0; k--) {
                        if (array1[k].status == true) {
                            console.log(`${k + 1}. [${symbol}] ${array1[k].activity}`)
                        }
                    }
                }
            break;

        case "tag":
            let tags = [];
            for (let o = 4; o < process.argv.length; o++) {
                tags.push(process.argv[o])
            }
            // console.log(tags)
            for (let n = 0; n < array1.length; n++) {
                if (process.argv[3] == n) {
                    array1[n]["tag"] = tags
                }

            }
            console.log(array1)
            arrayString = JSON.stringify(array1)
            fs.writeFileSync('todo.json', arrayString, function (err) {
                if (err) {
                    console.log(err);
                }
            })
            break;

        case "filter:":
            let keyword = process.argv[3];
            array1.forEach(element => {
                {
                    let tick = " "

                    if (element.status == true) {
                        tick = "x"
                    }
                    if (element.tag !== undefined) {
                        for (let l = 0; l < element.tag.length; l++) {
                            if (element.tag[l] == keyword) {
                                {
                                    console.log(`${l + 1}. [${tick}] ${element.activity}`)
                                }
                            }
                        }
                    }
                }
            })
            break;

        default:
            console.log(`>>> JS TODO <<<
            $ node todo.js <command>
            $ node todo.js list
            $ node todo.js task <task_id>
            $ node todo.js add <task_content>
            $ node todo.js delete <task_id>
            $ node todo.js complete <task_id>
            $ node todo.js list:outstanding asc|desc
            $ node todo.js list completed asc |desc
            $ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
            $ node todo.js filter:<tag_name>`
            )
    }
})
