const { query } = require('express');
var express = require('express');
var router = express.Router();

/* GET users listing. */
module.exports = function (pool) {

  // filter
  // router.get('/', (req, res, next) => {
  //   const {checkId, inputId, checkString, inputString, checkInteger, inputInteger, checkFloat, inputFloat, checkDate, inputStart, inputEnd, checkBoolean, inputBoolean } = req.query;

  //   let params = [];
  //   let isFilter = false;

  //   if (checkId && inputId) {
  //     params.push(`id='${inputId}'`);
  //     isFilter = true;

  //   }
  //   if (checkString && inputString) {
  //     params.push(`string = '${inputString}'`);
  //     isFilter = true;
  //   }
  //   if (checkInteger && inputInteger) {
  //     params.push(`integer='${inputInteger}'`);
  //     isFilter = true;
  //   }
  //   if (checkFloat && inputFloat) {
  //     params.push(`float='${inputFloat}'`);
  //     isFilter = true;
  //   }
  //   if (checkDate && inputStart && inputEnd) {
  //     params.push(`date between '${inputStart}' and '${inputEnd}'`);
  //     isFilter = true;
  //   }
  //   if (checkBoolean && inputBoolean) {
  //     params.push(`boolean='${inputBoolean}'`);
  //     isFilter = true;
  //   }

  //   let sql = `SELECT count(*) as total FROM data`;
  //   if (isFilter) {
  //     sql += ` WHERE ${params.join(' AND ')}`
  //   }

  //   const page = req.query.page || 1;
  //   const limit = 3;
  //   const offset = (page - 1) * limit;
  //   const url = req.url == '/' ? '/?page=1' : req.url

  //   pool.query(sql, (err, count) => {
  //     let total = count[0].total;
  //     const pages = Math.ceil(total / limit);
  //     sql = `SELECT * FROM data`;
  //     if (isFilter) {
  //       sql += ` WHERE ${params.join(' AND ')}`
  //     }
  //     sql += ` limit ${limit} offset ${offset}`;
  //     pool.query(sql, (err, rows) => {
  //       res.render('/', { rows, page, pages, query: req.query, url });
  //     });
  //   });
  // });




  router.get('/', function (req, res, next) {
    pool.query(`SELECT * FROM public.data`, (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.post" });
      res.json(resp.rows)
    })
  });

  // add data
  router.get('/add', function (req, res, next) {
    res.render('add')
  });
  router.post('/', function (req, res, next) {
    console.log(query);
    pool.query(`INSERT INTO data( string, integer, float, date, boolean) VALUES ('$1', $2, $3, '$4', $5)`, [req.body.string, Number(req.body.integer), Number(req.body.float), req.body.date, req.body.boolean], (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.post" });
      res.redirect('/')
    })
  });

  // edit data
  router.get('/edit/:id', function (req, res, next) {
    pool.query('SELECT * FROM data WHERE id=$1', [Number(req.params.id)], (err, item) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.delete" });
    res.render('edit', {item : item.rows[0]})
    })
  });
  
  router.post('/edit/:id', function (req, res, next) {
    pool.query('UPDATE data SET string=$1, integer=$2, float=$3, date=$4, boolean=$5 WHERE id=$6', [req.body.string, Number(req.body.integer), Number(req.body.float), req.body.date, req.body.boolean, Number(req.params.id)], (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.put" });
      res.send({message: "Succes"})
    })
  });

  router.delete('/:id', function (req, res, next) {
    pool.query('DELETE FROM data WHERE id=$1', [Number(req.params.id)], (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.delete" });
      res.send({message: "Succes"})
    })
  });


  return router;
}

