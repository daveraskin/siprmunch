/**
* UserInfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    userId: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
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
    }

  }
};

