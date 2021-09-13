var express = require('express');
var router = express.Router();


/* GET home page. */
module.exports = (pool) => {
  router.get('/', function (req, res, next) {
    const {xID, xname, xweight, xheight, xdatestart, xdateend, xstatus } = req.query;
    let filter = [];
    let flag = false;

    if (xID) {
      filter.push(`ID = ${xID}`)
      flag = true
    }
    if (xname) {
      filter.push(`"name" = '${xname}'`)
      flag = true
    }
    if (xweight) {
      filter.push(`"weight" = ${xweight}`)
      flag = true
    }
    if (xheight) {
      filter.push(`"height" = ${xheight}`)
      flag = true
    }
    if (xdatestart && xdateend) {
      filter.push(`"birthdate" BETWEEN '${xdatestart}' and '${xdateend}'`)
      flag = true
    }
    if (xstatus) {
      filter.push(`"status" = '${xstatus}'`)
      flag = true
    }
    let criteria = filter.join(" and ");
    console.log(criteria);
    let sql = `SELECT count(*) as total FROM superhero`;
    if (flag == true) {
      sql += ` WHERE ${criteria} `
    }
    pool.query(sql, [], (err, count) => {
      let rows = count.rows[0].total
      console.log(rows);
      let page = req.query.page || 1;
      let limit = 2;
      let totalPage = Math.ceil(rows / limit)
      let pages = (page - 1) * limit
      let queries = req.url === "/" ? "/?page=1" : req.url;
      let test = req.query;

      sql = `SELECT * FROM superhero`;
      if (flag == true) {
        sql += ` WHERE ${criteria} `
      }
      sql += ` LIMIT ${limit} OFFSET ${pages}`
      console.log(sql)
      pool.query(sql, [], (err, row) => {
        console.log(row.rows)
        res.render('index', { data: row.rows, pages: totalPage, current: page, query: queries, test: test })
      })
    })


    router.get('/add', (req, row) => row.render('add'))
    router.post('/add', (req, res) => {
      let sqlAdd = `INSERT INTO superhero ("name", "weight", "height", "birthdate", "status") VALUES ($a, $b, $c, $d, $e)`
      pool.query(sqlAdd, [req.body.name, parseInt(req.body.weight), parseFloat(req.body.height), req.body.birthdate, JSON.parse(req.status)], (err) => {
        if (err) throw err;
        console.log('Success adding a new superhero');
        res.redirect('/')
      })
    })
    

    router.get('/edit/:ID', (req, res) => {
      let edit = parseInt(req.params.id);
      let sqlGetEdit = `SELECT * FROM superhero WHERE ID = $1`;
      console.log(sqlGetEdit);
      pool.query(sqlGetEdit, [edit], (err, data) => {
        if (err) throw err;
        console.log("Success editing a superhero");
        res.render('edit', { item: data.rows[0] })
      })
    })
    
    router.post('/edit/:ID', (req, res) => {
      let sqlPostEdit = `UPDATE superhero SET 
      "name" = $a, "weight" = $b, "height" = $c, "birthdate" = $d, "status" = $e WHERE ID =$f`
      pool.query(sqlPostEdit [req.body.name, parseInt(req.body.weight), parseFloat(req.body.height), req.body.birthdate, JSON.parse(req.body.status), ID], (err, row) => {
        if (err) throw err;
        res.redirect("/");
      })
    })
  });
  
    router.get('/erase/:ID', (req, res)=> {
      let sqlErase = `DELETE FROM superhero WHERE id=$1`;
      let erase = parseInt(req.params.ID);
      console.log(erase);

      pool.query(sqlErase, [erase], (err) => {
        if (err) throw err;
        console.log ("Success deleting a superhero")
        res.redirect ('/');
      })
    
  }) 
  return router
}
