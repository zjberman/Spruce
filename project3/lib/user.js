// A library for representing a user "model".

// Represents the next user ID:
// var nextUID = 0;

// // A function for creating "users".
// function user(name, pass, admin) {
//   return {
//     name: name,
//     pass: pass,
//     uid : ++nextUID,
//     admin : admin
//   };
// }
var mongojs = require('mongojs');
var connstr = 'mongodb://eagles:thirdfloorlounge@ds045054.mongolab.com:45054/users';
var database = mongojs(connstr, [], {authMechanism: 'ScramSHA1'});
var users = database.collection('users');
// This is an in-memory mock database until we look at a real one!
// var db = {
//   'tim'  : user('tim', 'mit', true),
//   'hazel': user('hazel', 'lezah', false),
//   'caleb': user('caleb', 'belac', false)
// };

exports.lookup = (usr, pass, cb) => {
  var firstTime = true;
  var cursor = users.find({
    username: usr
  }).limit(1);
  cursor.forEach(function (err, doc){
    if(err)
    {
      if(firstTime)
      {
        console.log('error: ' + err);
        firstTime = false;
        return;
      }

      else
      {
        return;
      }
      
    }

    if(doc == null)
    {
      if (firstTime) 
      {
        firstTime = false;
        cb('user "' + usr + '" does not exist');
      }

      else
      {
        return;
      }
    }

    else if(doc.username === usr && doc.password === pass)
    {
      if(firstTime)
      {
        firstTime = false;
        cb(undefined, {name: doc.username, admin: doc.admin});
      }

      else
      {
        return;
      }
      
    }

    else if(doc.password !== pass)
    {
      if(firstTime)
      {
        firstTime = false;
        cb('password is invalid');
      }

      else
      {
        return;
      }
      
    }
  });
};
// Returns a user object if the user exists in the db.
// The callback signature is cb(error, userobj), where error is
// undefined if there is no error or a string indicating the error
// that occurred.
// exports.lookup = (usr, pass, cb) => {
//   if (usr in db) {
//     var u = db[usr];
//     if (pass == u.pass) {
//       cb(undefined, { name: u.name, admin: u.admin });
//     }
//     else {
//       cb('password is invalid');
//     }
//   }
//   else {
//     cb('user "' + usr + '" does not exist')
//   }
// };
  exports.list = (cb) => {
    var userList = [];
    var cursor = users.find(
        {username: {$exists: true}}
      );
    cursor.forEach(function(err, doc){
      if (err){
        console.log('error: ' + err);
        return;
      }

      if(doc == null)
      {
        cb(undefined, userList);
      }

      else
      {
        userList.push({name: doc.username, pass: doc.password, uid: doc.uid, admin: doc.admin, email: doc.email});
      }


    });
  };
// exports.list = (cb) => {
//   // TODO: Add the list functionality.
//   // The list function receives a callback with the following signature:
//   //
//   //   cb(error, array of users)
//   //
//   // An error (string) is given if there was a problem accessing the list of
//   // users. In this case, we are using a mock database - so, there are
//   // no errors that we will encounter. If we use a real database it is
//   // possible that we might have trouble connecting to the database.
//   // For this reason, we provide the necessary "hook" for when a
//   // database is added in the future.
//   //
//   // The array of users is an array that is a copy of all the current
//   // users in our system. You should make sure that you copy each
//   // user object in the `db` object and add it to the list of users
//   // that is returned by the callback.
//   //
//   // You will be graded on the following:
//   //   (1) You correctly copy each of the user objects.
//   //   (2) You correctly invoke the callback with the proper results.
//   //
//   var userList = [];
//   for(var user in db)
//   {
//     userList.push(db[user]);
//   }
//   cb(undefined, userList);
// };

exports.add = (u, cb) => {
  theUid = null;
  var firstTime = true;
  var cursor = users.find({
    $or:[
      {username: u.name},
      {email   : u.email}
    ]
  });
  cursor.forEach(function(err, doc) {
    if(err)
    {
      console.log('error: ' + err);
      return;
    }

    else if(doc === null && firstTime)
    {
      firstTime = false;
      var name  = u.name; //needed because u.name can't be in push for some reason.
      var pass  = u.pass;
      var admin = u.admin;
      var email = u.email;
      users.update(
        {isTheUid: true},
        {$inc: {uid: 1}}
      );
      var uid = users.find(
        {isTheUid: true}
      );
      uid.forEach(function(err, doc2){
        if(err)
        {
          console.log("error: " + err);
          return;
        }
        
        else if(doc2 !== null)
        {
          theUid = doc2.uid;
          var newUser = users.insert({
            username: name,
            password: pass,
            admin   : admin,
            uid     : theUid,
            email   : email
          });

          cb(undefined, newUser);
        }
      });
    }

    else if(doc === null && firstTime === false)
    {
      return;
    }
    else if(doc.username === u.name && firstTime)
    {
      firstTime = false;
      cb('Username already exists!');
    }

    else if(doc.email === u.email && firstTime)
    {
      firstTime = false;
      cb('Email already exists!');
    }

  });
};

exports.delete = (name, cb) => {
  var cursor = users.find({
    username: name
  });

  cursor.forEach(function(err, doc) {
    if(err)
    {
      console.log('error: ' + err);
      return;
    }

    else if(doc === null)
    {
      cb(name);
    }

    else if(doc.username === name)
    {
      users.remove({username: name});
    }
});
};

// exports.add = (u, cb) => {
//   // TODO: Add the add new user functionality.
//   // The add function receives two arguments. The first, `u`, is an
//   // object with user data. It has the following format:
//   //
//   //   { name, pass, admin }
//   //
//   // The `name` is the name of the user (string), the `pass` is the
//   // password (string), and the `admin` is a boolean (true/false).
//   //
//   // The callback `cb` has the following signature:
//   //
//   //   cb(error, newuser)
//   //
//   // The `error` (string) indicates if there was a problem. This would
//   // indicate if there was a problem accessing the database - but, we
//   // are not using a real database in this assignment. However, we should
//   // not allow users with duplicate names. So, you will need to check
//   // to make sure that you are given a user name that does not already
//   // exist in our mock database.
//   //
//   // If the user has a unique user name then you need to create the
//   // new user using the `user` function defined above. You must then
//   // copy the generated uid from the new user to the `u` object
//   // provided as an argument to this `add` function. Don't forget to
//   // add the new user to the mock database.
//   //
//   // If everything is successful, you should invoke the callback with
//   // an undefined for the error and the original `u` that was provided.
//   //
//   // Why do we not simply return the user object returned from the
//   // `user` function? Think about this one.

//     if(u.name in db)
//     {
//       cb('Could not add user. Username already exists.');
//     }

//     else
//     {
//       var name  = u.name; //needed because u.name can't be in push for some reason.
//       var pass  = u.pass;
//       var admin = u.admin;
//       if(admin === 'no')
//       {
//         admin = false;
//       }
//       else
//       {
//         admin = true;
//       }
//       var newUser = user(name, pass, admin);
//       u.uid = newUser.uid;
//       db[name] = newUser;
//       cb(undefined, newUser);
//     }
//   //
//   // You will be graded on the following:
//   //   (1) You correctly determine if the user already exists.
//   //   (2) You send a sensible error message to the callback.
//   //   (3) You correctly create a new user.
//   //   (4) You correctly add the new user to the database.
//   //   (5) You correctly copy the UID to the `u` argument.
//   //   (6) You correctly call the callback with the correct user information.
//   //
  
// };