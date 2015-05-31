/**
 * PagesController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var yelp = require("yelp").createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

module.exports = {

  index: function(req,res){
    res.view('mainView')
  },
  get: function(req,res){
    if(req.session.authenticated === true){
      res.send(true)
    }else{
      res.send(false)
    }
  },
  yelp: function(req,res){
    yelp.search({term: req.param('searchTerm'), location: "Seattle, WA"}, function(error, data) {
      res.send({data: data, error: error})
});
  }

};

