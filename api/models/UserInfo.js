/**
* UserInfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    username: {
      type: 'string',
      minLength: 4,
      maxLength: 20
    },
    firstName: {
      type: 'string',
      required: false,
      minLength: 2,
      maxLength: 20
    },
    lastName: {
      type: 'string',
      required: false,
      minLength: 2,
      maxLength: 20
    },
    posts: {
      collection: 'Post',
      via: 'user'
    },
    user: {
      model: 'User'
    },
    pictures: {
      collection: 'Picture',
      via: 'userInfo'
    },
    messages: {
      collection: 'Message',
      via: 'user'
    },
    attending: {
      type: 'string'
    }
  }
};

