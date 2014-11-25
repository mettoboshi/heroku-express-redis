var express = require('express');
var redis = require('redis');
var url = require('url');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (process.env.REDISTOGO_URL) {
    // inside if statement
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
  } else {
    var redis = require('redis').createClient();
  }

  redis.set('key','value', function(){
  });

  redis.get('key', function(err, val){
    if (err) return console.log(err);
    redis.quit();
    res.render('index', { title: val });
  });
  
});

module.exports = router;
