/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    body: {
      type:"string",
      required: true
    },
    user: {
      model: "UserInfo"
    },
    type: {
      type:"string",
      required: true
    },
    maxAttending: {
      type: 'integer'
    },
    currentAttending: {
      type: 'integer'
    },
    locationId: {
      type: 'string',
      required: true
    },
    locationName: {
      type: 'string',
      required: true
    }

  }
};

