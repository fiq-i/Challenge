var express = require('express');
var router = express.Router();
const ObjectId = require ('mongodb').ObjectId;
module.exports = function(db){
  const collection = db.collection('bread');

  router.get('/', async function(req, res, next) {
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
   console.log(req.params.id)
  try{
   const data = await collection.updateOne(
     {_id: new ObjectId (req.params.id)},
     {$set: {string: req.body.string,
     integer: req.body.integer,
     float: req.body.float,
     date: req.body.date,
     boolean: req.body.boolean,
     }}, {upsert: true})
      const item = await collection.findOne({_id: data.insertedId})
      res.json(data)
     
  } catch (err){
    console.log(err)
    res.status(500).json({ err })
  }
});

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
