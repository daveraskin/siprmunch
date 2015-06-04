/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    join: function(req,res){
      sails.sockets.join(req.socket, req.body.postId);
      console.log('data', req.body.postId)
      Message.find({post: req.body.postId}).populate('user')
      .then(function(data){
        res.send({data: data})
      })

    },
    post: function(req,res){
      sails.sockets.broadcast(req.body.post, 'addchat', {msg: req.body.body, user: req.body.user})
      res.send({result:true})
      // broadcast
    },
    leave: function(req,res){
      console.log(sails.sockets.socketRooms(req.socket))
      sails.sockets.leave(req.socket, req.body.post)
      console.log(sails.sockets.socketRooms(req.socket))
      res.send({result:true});
    },//Sails.sockets.leave(req.socket, req.body)
    getMessages: function(req,res){

    }
};

