var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    firstName : { type: 'string', required: false},
    lastName  : { type: 'string', required: false},
    city      : { type: 'string', required: false},
    state     : { type: 'string', required: false},
    passports : { collection: 'Passport', via: 'user' }
  },
  posts:{
    collection: "Post",
    via: "user"
  }
};

module.exports = User;
