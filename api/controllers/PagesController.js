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
    var userInfo
    if(req.session.authenticated === true){
      UserInfo.findOne({user: req.user.id})
      .exec(function(err, data){
        userInfo = data
        res.send({authenticated: true, user: req.user.id,  userInfo: userInfo})
      })
    }else{
      res.send(false)
    }
  },
  yelp: function(req,res){
    yelp.search({term: req.params.searchTerm, ll: "47.623168,-122.330762"}, function(error, data) {
      res.send({data: data, error: error})
    });
  },
  yelpBusiness: function(req,res){
    yelp.business(req.params.searchTerm, function(error, data) {
      res.send({data: data, error: error})
    });
  }
  }



