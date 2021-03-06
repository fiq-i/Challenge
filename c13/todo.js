let command = process.argv[2]
const fs = require("fs");
fs.readFile('todo.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file:", err)
    }
    let array1 = JSON.parse(jsonString);
    if (process.argv.length > 2) {
        let res = command.split(":")
        if (res[0] == "filter") {
            keywords = [];
            for (let p = 1; p < res.length; p++) {
                keywords.push(res[p])
            }
            let r = 1
            console.log(`Daftar Pekerjaan \n`)
            array1.forEach(element => {
                {
                    let tick = " "
                    if (element.status == true) {
                        tick = "x"
                    }
                    if (element.tag !== undefined) {
                        for (let l = 0; l < element.tag.length; l++) {
                            for (let q = 0; q < keywords.length; q++) {
                                if (element.tag[l] == keywords[q]) {
                                    {
                                        console.log(`${r}. [${tick}] ${element.activity}`)
                                    }
                                }
                            }
                        }
                    } r++
                }
            })
        }
    }
        switch (command) {
            case "add":
                let newTask = "";
                for (let u=3; u < process.argv.length ;u++){
                    {
                        if(u > 3){
                            newTask += " " + process.argv[u]
                        } else 
                        newTask += process.argv[u]
                    }
                }
                
                {
                    let obj = { "status": false, "activity": newTask, "tag": []}
                    array1.push(obj)
                    arrayString = JSON.stringify(array1)
                    fs.writeFileSync('todo.json', arrayString, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    })
                }
                console.log(`${newTask} telah ditambahkan.`)
                break;

            case "list":
                let i = 1;
                console.log(`Daftar Pekerjaan`)
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
                let deletedId = process.argv[3] - 1;
                let task = array1[deletedId].activity
                array1.splice(deletedId, 1)
                console.log(`${task} telah dihapus dari daftar`)
                arrayString = JSON.stringify(array1)
                fs.writeFileSync('todo.json', arrayString, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
                break;

            case `complete`:
                let completedId = process.argv[3] - 1;
                array1[completedId].status = true
                console.log(`${array1[completedId].activity} telah selesai`)
                arrayString = JSON.stringify(array1)
                fs.writeFileSync('todo.json', arrayString, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
                break;

            case `uncomplete`:
                let uncompletedId = process.argv[3] - 1;
                array1[uncompletedId].status = false
                console.log(`${array1[uncompletedId].activity} status selesai dibatalkan`)
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
                    if (process.argv[3] == "desc") {
                        for (j = array1.length - 1; j >= 0; j--) {
                            if (array1[j].status == false) {
                                console.log(`${j + 1}. [${space}] ${array1[j].activity}`)
                            }
                        }
                    } else
                    {
                        for (j = 0; j < array1.length; j++) {
                            if (array1[j].status == false) {
                                console.log(`${j + 1}. [${space}] ${array1[j].activity}`)
                            }
                        }
                    }
                break;

            case "list:completed":
                let k = 0
                let symbol = "x"
                    if (process.argv[3] == "desc") {
                        for (k = array1.length - 1; k >= 0; k--) {
                            if (array1[k].status == true) {
                                console.log(`${k + 1}. [${symbol}] ${array1[k].activity}`)
                            }
                        }
                    }
                else{
                        for (k; k < array1.length; k++) {
                            if (array1[k].status == true) {
                                console.log(`${k + 1}. [${symbol}] ${array1[k].activity}`)
                            }
                        }
                    } 
                break;

            case "tag":
                let id = process.argv[3];
                let tags = [];
                for (let o = 4; o < process.argv.length; o++) {
                    tags.push(process.argv[o])
                } 
                if (array1[id-1].tag.length == 0){
                            array1[id-1].tag = tags
                            console.log(`${tags} berhasil ditambahkan`)      
                }
                else {
                    for(let p = 0; p<tags.length ; p++){
                        for(let q = 0; q<array1[id-1].tag.length; q++){
    
                            if(tags[p] == array1[id-1].tag[q]){
                                q = array1[id-1].tag.length
                            }
                            if(q == array1[id-1].tag.length-1){
                                array1[id-1].tag.push(tags[p])
                                console.log(`${tags[p]} berhasil ditambahkan`)
                                q = array1[id-1].tag.length
                            }
                        }
                    }
                }
                
                arrayString = JSON.stringify(array1)
                fs.writeFileSync('todo.json', arrayString, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
                break;

                case undefined :
                console.log(`>>> JS TODO <<<
            $ node todo.js <command>
            $ node todo.js list
            $ node todo.js task <task_id>
            $ node todo.js add <task_content>
            $ node todo.js delete <task_id>
            $ node todo.js complete <task_id>
            $ node todo.js list:outstanding asc|desc
            $ node todo.js list completed asc|desc
            $ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
            $ node todo.js filter:<tag_name>`
                )
            }
    
})