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
    newFile = result;
    Picture.create({hash: newFile.public_id, user: '22jij3oijoij', post: 'oaisjfeo'})
    .exec(function(err, data) {
      if(err) res.send(err);
      res.send(data)
    })

  })
});
}

}

