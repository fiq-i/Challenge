/*let User = require('mongoose').model('User');*/
let express = require('express');
let router = express.Router();
let userControllers = require('../controllers/userController.js')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

function findData(limit, skip, where, cb){
  connect(function(db){
    db.collection("users").find(where).count(function(err, count){
      db.collection("users").find(where).skip(skip).limit(limit).toArray(function(err, result){
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

router.get('/', (req, res, next) => {
  
  //res.send('respond with a resource');
  return User.find(function (err, clients) {
    if (!err) {
      res.render('detail.ejs', {
        title: 'Details',
        clients: clients
      });
    } else {
      return console.log(err);
    }
  });
});

router.get('/search', function(req, res, next){
  let string = req.query.string || 0;
  let integer = req.query.integer || 0;
  let float = req.query.float || 0;
  let sdate = req.query.sdate || 0;
  let edate = req.query.edate || 0;
  let boolean = req.query.boolean || 0;
  let myQuery = {};

  if(string != 0)myQuery.string = string;
  if(integer != 0)myQuery.integer = integer;
  if(float != 0)myQuery.float = float;
  if(boolean != 0)myQuery.boolean = boolean;
  if(sdate != 0)myQuery.date = {"$gte": sdate};
  if(edate != 0)myQuery.date != undefined ? myQuery.date["$lte"] = edate : myQuery.date = {"$lte": edate};

  var skip = parseInt(req.query.o) || 0;
  var cpage = req.query.c || 1;

  if(Object.keys(myQuery).length !== 0){
    showTable(myQuery, res, req);
  }else{
    res.redirect('/');
  }
});

router.post('/', (req, res, next) => {
  // res.json(req.body);
  let personInfo = req.body; //Get the parsed information   

  if (!personInfo.string || !personInfo.integer || !personInfo.float|| !personInfo.date|| !personInfo.boolean) {
    res.send();
  } else {

    let c = 1;
    User.findOne({}, (err, data) => {

      if (data) {
        c = data.unique_id + 1;
      }

      let newPerson = new User({
        unique_id: c,
        string: personInfo.string,
        integer: personInfo.integer,
        float: personInfo.float,
        date: personInfo.date,
        boolean: personInfo.boolean,

      });

      newPerson.save((err, Person) => {
        if (err)
          console.log(err);
        else
          console.log('Success'); 
      });

    }).sort({ _id: -1 }).limit(1);

  }
  res.json({ Success: '1' });
});

router.get('/show', (req, res, next) => {

  User.find((err, response) => {
    res.json(response);
  });

});

router.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let personInfo = req.body;

  User.update({ unique_id: id }, {
    string: personInfo.string,
    integer: personInfo.integer,
    float: personInfo.float,
    date: personInfo.date,
    boolean: personInfo.boolean

  }, (err, rawResponse) => {
    // console.log(rawResponse);
  });

});

router.delete('/user/:id', (req, res) => {
  let id = req.params.id;
  /*User.find({unique_id:id}, function(err, data) {
    data.remove();
  });*/
  User.findOneAndRemove({ 'unique_id': id }, (err, offer) => {});
  res.send("Success");
});


module.exports = router;
