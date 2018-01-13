require('./associations');
const models = require('./models');

module.exports = {
  findOrCreateUser: function findOrCreateUser(userProfile) {
    models.User.findOrCreate({ where: { fbId: userProfile.id.slice(0, 7) }, defaults: { name: userProfile.displayName.slice(0, 4) } })
      .spread((user, created) => {
        console.log(user.get({
          plain: true,
        }));
        console.log(created);
    
        /*
         findOrCreate returns an array containing the object that was found or created and a boolean that will be true if a new object was created and false if not, like so:
    
        [ {
            username: 'sdepold',
            job: 'Technical Lead JavaScript',
            id: 1,
            createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
            updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
          },
          true ]
    
     In the example above, the "spread" on line 39 divides the array into its 2 parts and passes them as arguments to the callback function defined beginning at line 39, which treats them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "true".)
        */
      });
    // add database functions here
  }
};


