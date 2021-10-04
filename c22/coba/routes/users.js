var express = require('express');
var router = express.Router();

const util = require('../helpers/util');
const ObjectId = require ('mongodb').ObjectId;
module.exports = function(db){
const collection = db.collection('bread');
const MongoClient = require('mongodb').MongoClient;

  // Connection URL
  function connect(cb){
    var url = 'mongodb://localhost:27017/bread';
    // Use connect method to connect to the Server
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
      if(err) throw err;
      const db = client.db('bread');
      cb(db);
      // client.close();
    });
  }

  function findData(limit, skip, where, cb){
    connect(function(db){
      db.collection('bread').find(where).count(function(err, count){
        db.collection('bread').find(where).skip(skip).limit(limit).toArray(function(err, result){
          if(err) throw err;
          cb(result, count);
        });
      });
    });
  }
  function showTable(myQuery, res, req){
    var skip = parseInt(req.query.o) || 0;
    var cpage = req.query.c || 1;
    findData(5, skip, myQuery, function(result, count){
      var page = Math.ceil(count/5);
      res.render('index', { data: result, page: page, cpage: cpage, util: util });
    });
  }
  // router.get('/', function(req, res, next){
  //   showTable({}, res, req);
  // });
  
  router.get('/', async function(req, res, next) {
    showTable({}, res, req)
  try{
   const data = await collection.find({}).toArray();
    res.json(data)
  } catch (err){
    res.status(500).json({ err })
  }
});

router.post('/', async function(req, res, next) {
   
  try{
   const data = await collection.insertOne({
     string: req.body.string,
     integer: req.body.integer,
     float: req.body.float,
     date: req.body.date,
     boolean: req.body.boolean,
     })
      const item = await collection.findOne({_id: data.insertedId})
      res.json(item)
     
  } catch (err){
    res.status(500).json({ err })
  }
});

router.put('/:id', async function(req, res, next) {
  try{
   const data = await collection.updateOne(
     {_id: new ObjectId (req.body.id)},
     {$set: {string: req.body.string,
     integer: req.body.integer,
     float: req.body.float,
     date: req.body.date,
     boolean: req.body.boolean,
     }}, {upsert: true})
      const item = await collection.findOne({_id: data.id})
      res.json(data)
     
  } catch (err){
    console.log(err)
    res.status(500).json({ err })
  }
});

// router.put('/user/:id', (req, res) => {
//   let id = req.params.id;
//   let personInfo = req.body;

//   User.update({ unique_id: id }, {
//     string: personInfo.string,
//     integer: personInfo.integer,
//     float: personInfo.float,
//     date: personInfo.date,
//     boolean: personInfo.boolean
//   }, (err, rawResponse) => {
//     // console.log(rawResponse);
//   });
// });


router.delete('/:id', async function(req, res, next) {
  console.log(req.params.id)
 try{
  const data = await collection.deleteOne(
    {_id: new ObjectId (req.params.id)})
     const item = await collection.findOne({_id: data.insertedId})
     res.json(data)
    
 } catch (err){
   console.log(err)
   res.status(500).json({ err })
 }
});

return router;
}
