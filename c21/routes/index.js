var express = require('express');
var router = express.Router();



/* GET home page. */
module.exports = (pool) => {

  router.get('/', function (req, res, next) {
    const {nmid, nmstring, nminteger, nmfloat, nmdatestart, nmdateend, nmboolean } = req.query;
    // data untuk menampung filter
    let temp = []
    let stat = false
    // ---------------------------- function filter ----------------------------
    if (nmid) {
      temp.push(`"ID" = ${nmid}`)
      stat = true
    }
    if (nmstring) {
      temp.push(`"name" = '${nmstring}'`)
      stat = true
    }
    if (nminteger) {
      temp.push(`"weight" = ${nminteger}`)
      stat = true
    }
    if (nmfloat) {
      temp.push(`"height" = ${nmfloat}`)
      stat = true
    }
    if (nmdatestart && nmdateend) {
      temp.push(`"birthdate" BETWEEN '${nmdatestart}' and '${nmdateend}'`)
      stat = true
    }
    if (nmboolean) {
      temp.push(`"status" = '${nmboolean}'`)
      stat = true
    }
    //------------------------------------------------------------------------------------ 
    // conversi dari array ke string
    let joindata = temp.join(' and ');

    console.log(joindata);

    let sql = `SELECT count(*) as total FROM superhero`;
    //  kondisi ketika filter
    if (stat == true) {
      sql += ` where ${joindata} `
    }
    pool.query(sql, [], (err, count) => {
      let rows = count.rows[0].total //jumlah data dalam table
      console.log(count[0]);

      let page = req.query.page || 1; // nilai awal page
      let limit = 3; // batas data yang di tampilkan 
      let totalPage = Math.ceil(rows / limit) // mencari jumlah data
      let pages = (page - 1) * limit
      let queries = req.url === '/' ? '/?page=1' : req.url;
      let Query = req.query;

      sql = `select * from superhero`;
      if (stat == true) {
        sql += ` where ${joindata} `
      }
      sql += ` LIMIT ${limit} OFFSET ${pages}`

      pool.query(sql, [], (err, row) => {

        console.log(sql);
        res.render('index', { data: row.rows, pages: totalPage, current: page, query: queries, Query: Query });

      })


    });
    //---------ADD-----------\\
    router.get('/add', (req, row) => row.render('add'))
    router.post('/add', (req, res) => {
      const sqladd = `INSERT INTO superhero ("name", "weight", "height", "birthdate", "status") VALUES($1,$2,$3,$4,$5)`
      pool.query(sqladd, [req.body.name, parseInt(req.body.weight), parseFloat(req.body.height), req.body.birthdate, req.body.status], (err) => {
        if (err) throw err;

        console.log('Added a new superhero');
        res.redirect('/');
      })
    });


    //------------------EDIT------------\\
    router.get('/edit/:ID', (req, res) => {
      let edit = req.params.ID;
      let sqlgetedit = `SELECT * FROM superhero WHERE "ID"=${edit}`;
      console.log(sqlgetedit);
      pool.query(sqlgetedit, (err, data) => {
        if (err) throw err;
        res.render('edit', { item: data.rows[0]})
      })
    })
    
    router.post('/edit/:ID', (req, res) => {
      let ID = req.params.ID;
      let sqlpostedit = `UPDATE superhero SET "name" =$1, "weight"=$2, "height" =$3, "birthdate"=$4, "status"=$5 WHERE "ID"=$6`
      pool.query(sqlpostedit, [req.body.name, parseInt(req.body.weight), parseFloat(req.body.height), req.body.birthdate, req.body.status, ID], (err, row) => {
        if (err) throw err;

        res.redirect('/');
      })
    })
  });

  router.get('/erase/:ID', (req, res) => {
    let erase = parseInt(req.params.ID);
    let sqlErased = `DELETE FROM superhero WHERE "ID"=${erase}`;
    console.log(erase);

    pool.query(sqlErased, (err) => {
      if (err) throw err;
      console.log('Superhero deleted!')
      res.redirect('/');
    })
  })
  return router;
}
