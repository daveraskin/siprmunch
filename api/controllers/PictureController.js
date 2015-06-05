/**
 * PictureController
 *
 * @description :: Server-side logic for managing pictures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cloudinary = require('cloudinary');

module.exports = {

   upload: function(req,res){
    console.log('made it this far ')
    req.file('newPicture').upload(function(err,files){
    cloudinary.uploader.upload(files[0].fd,function(result){
      console.log(result)
    newFile = result;
    res.send(result)
    })
  })
 },
  get: function(req,res){
    Picture.find({business: req.body.businessId})
    .then(function(data){
      res.send(data)
    })
  }
}



