var express = require("express");
var router = express.Router();
var moment = require("moment");
const { ObjectID } = require("mongodb");

module.exports = function (take) {
  const dbName = "bread";
  const db = take.db(dbName);
  router.get("/", function (req, res, next) {
    const { string, integer, float, date, boolean, start, end } = req.query;

    const url = req.url == "/" ? "/?page=1" : req.url;
    let page = parseInt(req.query.page || 1);
    const limit = 3;
    const offset = (page - 1) * limit;
    let params = [];
    if (string || integer || float || start || end || boolean) {
      params.push(
        { string },
        { integer },
        { float },
        { start },
        { end },
        { boolean }
      );
    }

    if (params.length > 0) {
      if (string) {
        var ObjectName = { string: string };
      }
      if (integer) {
        var ObjectWeight = { integer: `${integer}` };
      }
      if (float) {
        var ObjectHeight = { float: `${float}` };
      }
      if (boolean) {
        var ObjectStatus = { boolean: boolean };
      }

      var find = {
        ...ObjectName,
        ...ObjectWeight,
        ...ObjectHeight,
        ...ObjectStatus,
      };

      if (start && end) {
        var ObjectDate = { date: { $gte: start, $lte: end } };
        var find = {
          ...ObjectName,
          ...ObjectWeight,
          ...ObjectHeight,
          ...ObjectStatus,
          ...ObjectDate,
        };
      }

      db.collection("bread")
        .find(find)
        .toArray((err, result) => {
          let total = result.length;
          let pages = Math.ceil(total / limit);
          db.collection("bread")
            .find(find)
            .skip(offset)
            .limit(limit)
            .toArray((err, result) => {
              res.render("index", {
                nama: result,
                moment: moment,
                page,
                pages,
                url,
                query: req.query,
              });
            });
        });
    }

    db.collection("bread")
      .find()
      .toArray((err, result) => {
        let total = result.length;
        let pages = Math.ceil(total / limit);
        db.collection("bread")
          .find()
          .skip(offset)
          .limit(limit)
          .toArray((err, result) => {
            res.render("index", {
              nama: result,
              moment: moment,
              page,
              pages,
              url,
              query: req.query,
            });
          });
      });
  });

  router.get("/add", (req, res) => res.render("add"));
  router.post("/add", (req, res) => {
    db.collection("bread").insertOne(
      {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        tanggal: req.body.date,
        boolean: req.body.boolean,
      },
      (err, result) => {
        if (err) {
          throw err;
        }

        res.redirect("/");
      }
    );
  });

  router.get("/delete/:id", (req, res) => {
    db.collection("bread").deleteOne({
      _id: ObjectID(`${req.params.id}`),
    });

    res.redirect("/");
  });

  router.get("/edit/:id", (req, res) => {
    db.collection("bread")
      .find({ _id: ObjectID(`${req.params.id}`) })
      .toArray((err, result) => {
        res.render("edit", { nama: result[0], moment: moment });
      });
  });

  router.post("/edit/:id", (req, res) => {
    db.collection("bread").updateOne(
      {
        _id: ObjectID(`${req.params.id}`),
      },
      {
        $set: {
          string: req.body.string,
          integer: req.body.integer,
          float: req.body.float,
          date: req.body.date,
          boolean: req.body.boolean,
        },
      }
    );

    res.redirect("/");
  });

  return router;
};
