const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index.ejs', { data:JSON.parse(fs.readFileSync('data.json', 'utf8'))}))


app.get('/add', (req, res) => { res.render('add', { data:JSON.parse(fs.readFileSync('data.json', 'utf8')) }) })
app.post('/add', (req, res) => {
    let output = req.body;
    data.push({
        name: output.name,
        weight: output.weight,
        height: output.height,
        birthdate: output.birthdate,
        status: output.status
    })
    fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) return res.send(err)
        res.redirect('/');
    });
})

// app.get('/erase', (req, res) => res.redirect('/'))
app.get('/erase/:ID', (req, res) => {
    let x = (req.params.ID - 1);
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    data.splice(x, 1);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.redirect('/');
})

app.get('/edit/:ID', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    let x = (req.params.ID - 1);
    res.render('edit', { choice: data[x] })
})

app.post('/edit/:ID', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    let id = (req.params.ID - 1);
    let edit = {   name: req.body.name, 
                   weight: req.body.weight, 
                   height: req.body.height,
                   birthdate: req.body.birthdate,
                   status: req.body.status }
    data[id] = edit
    fs.writeFile("data.json", JSON.stringify(data), "utf8",(err) => {
        if (err) throw err;
        res.redirect('/');
    });
})

app.listen(3000, () => {
    console.log('listening on 3000')
})





