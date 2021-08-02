const express = require('express');
const path = require('path');
const sqlite3 = require("sqlite3").verbose();
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let db = new sqlite3.Database('jl.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Successful connection to the jl.db database.');
});




const sql_create = `CREATE TABLE IF NOT EXISTS superhero (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  name	varchar(20) NOT NULL,
  weight integer NOT NULL,
  height float NOT NULL,
  birthdate date NOT NULL,
  status Boolean NOT NULL
);`;


var current_page = 1;
var records_per_page = 2;

var obj = []; 
const sqlSelect = "SELECT * FROM superhero"
db.all(sqlSelect, (err, rows) => {
  if (err) { return console.error(err.message) }
  rows.forEach(element => {
    obj.push(element)
  });
});



app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



app.get('/add', (req, res) => res.render('add'))
app.post('/add', (req, res) => {
  const sqlAdd = `INSERT INTO superhero (name, weight, height, birthdate, status) VALUES(?,?,?,?,?)`
  db.run(sqlAdd, [req.body.name, req.body.weight, req.body.height, req.body.birthdate, req.body.status], (err) => {
    if (err) throw err;
    console.log('error adding');
  })
  res.redirect('/');
});



app.get('/erase', (req, res) => res.redirect('/'))

app.get('/erase/:ID', (req, res) => {
  let x = (req.params.ID)
  let sqlErase = `DELETE FROM superhero WHERE ID=?`;
  db.run(sqlErase, x, (err) => {
    if (err) throw err;
    console.log('Successfully erasing data!')
  })
  res.redirect('/erase');
})


app.get('/edit/:ID', (req, res) => {
  let x = req.params.ID;
  let sqlEdit = `SELECT * FROM superhero WHERE ID=${x}`
  db.all(sqlEdit, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("edit", { choice: { ...rows[0] } });
    // console.log(rows[0])
  });
})

app.post('/edit/:ID', (req, res) => {

  let sqlEdit = `UPDATE superhero 
  SET 
  name = '${req.body.name}', 
  weight = ${req.body.weight}, 
  height = ${req.body.height}, 
  birthdate = '${req.body.birthdate}', 
  status = '${req.body.status}'
  WHERE ID=${req.body.ID}`
  db.all(sqlEdit, (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect('/');
  });
})


app.get('/', (req, res) => {    
  let { x1, x2, x3, x4, x5, x6, xID, xname, xweight, xheight, xdatestart, xdateend,
       xstatus } = req.query;
  let filter = []
  let flag = false
  if (x1 && xID) {
      filter.push(`ID = ${xID}`)
      flag = true
  }
  if (x2 && xname) {
      filter.push(`name = '${xname}'`)
      flag = true
  }
  if (x3 && xweight) {
    filter.push(`weight = ${xweight}`)
      flag = true
  }
  if (x4 && xheight) {
    filter.push(`height = ${xheight}`)
      flag = true
  }
  if (x5 && xdatestart && xdateend) {
    filter.push(`birthdate BETWEEN '${xdatestart}' and '${xdateend}'`)
      flag = true
  }
  if (x6 && xstatus) {
    filter.push(`status = '${xstatus}'`)
      flag = true
  }
   let joineddata = filter.join(' and ');
   console.log(joineddata);
   let sql = "SELECT count(*) as total FROM superhero";
   
   if (flag == true) {
       sql += ` where ${joineddata} `
      }
      db.all(sql, [], (err, count) => {
          let rows = count[0].total 
          let page = req.query.page || 1; // initial page
          let limit = 3;  
          let totalPage = Math.ceil(rows / limit) 
          let pages = (page - 1) * limit
          let queries = req.url === '/' ? '/?page=1' : req.url;
          let test = req.query;
          sql = `select * from superhero`;
          if (flag == true) {
              sql += ` where ${joineddata} `
          }
          sql += ` LIMIT ${limit} OFFSET ${pages}`
          // showing all data in the data table
          db.all(sql, [], (err, row) => {
              console.log(sql);
          res.render('index.ejs', { data: row,pages: totalPage, current: page, query:queries, test:test})
      })
  })
});



app.listen(3000, () => {
  console.log('listening on 3000')
})
