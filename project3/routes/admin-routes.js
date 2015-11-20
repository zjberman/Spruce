var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

// A list of users who are online:
var online = require('../lib/online').online;

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/list', (req, res) => {
  // TODO: Add the admin list route.
  // The admin list route lists the current users in the system and
  // provides a form to add a new user. You must make sure you do
  // the following in this route:

     var user = req.session.user;
     if(!user)
     {
        req.flash('login', 'User object does not exist!');
        res.redirect('/user/login');
     } 

     else if(user && !online[user.name])
     {
        req.flash('login', 'Login expired!');
        res.redirect('/user/login');
     }

     else if(user.admin === false)
     {
        req.flash('main', 'You need admin credentials to access this route!');
        res.redirect('/user/main'); 
     }

     else
     {
        var list = model.list(function(error, allUsers){

          if(error)
          {
              req.flash('login', 'User already exists in database!');
              res.redirect('/user/login');
          }

          else
          {
              var message = req.flash('user-list');
              res.render('user-list', {message: message, users: allUsers});
          }
        });
     }

  //   (1) Grab the user session object.
  //   (2) Test that the user session object exists. If not, a redirect
  //       back to the login view is necessary with a proper flash message.
  //   (3) Test if the user session exists and they are not online. If
  //       the user session exists and they are not online it means the
  //       server has been restarted and their session has expired. If
  //       this is the case you will need to redirect back to login with
  //       a proper flash message (e.g., login expired).
  //   (4) Test is the user is an admin. If they are not you need to
  //       redirect back to main with a proper flash message - indicate
  //       that the user needs admin credentials to access this route.
  //   (5) If the user is logged in, is online, and is an admin then
  //       you want to retrieve the list of users from the `lib/user.js`
  //       library and render the `user-list` view. The `user-list` view
  //       expects an array of users and a message. You should grab the
  //       flash message - if one exists, and pass it to the view template.
  //       A flash message will exist if the user tried to create a new
  //       user that already exists in our mock database.
  //
  //  You will be graded on each of the above items.

  // Replace below with your own implementation.
});

router.post('/user', (req, res) => {
  // TODO: Implement the /user route.
  // This route is similar to the /user/auth route in that it does not
  // have an associated view. Rather, its job is to add a new user and
  // redirect to /admin/list. Its job is to add a new user if the user
  // does not already exist in our model. You must make sure you do
  // the following in this route:

     var user = req.session.user;
     if(!user)
     {
        req.flash('login', 'User object does not exist!');
        res.redirect('/user/login');
     } 

     else if(user && !online[user.name])
     {
        req.flash('login', 'Login expired!');
        res.redirect('/user/login');
     }

     else if(user.admin === false)
     {
        req.flash('main', 'You need admin credentials to access this route!');
        res.redirect('/user/main'); 
     }

     else
     {
        var name  = req.body.name;
        var pass  = req.body.pass;
        var admin = req.body.admin;
        // console.log('name ' + name);
        // console.log('pass ' + pass);
        // console.log(!name);
        if(!name || !pass)
        {
            req.flash('user-list', 'Missing one or more required fields.');
            res.redirect('/admin/list');
        }

        else 
        {
          var newUser = {name, pass, admin};
            model.add(newUser, function(error, newUser){
              if(error)
              {
                  req.flash('user-list', error);
                  res.redirect('/admin/list');
              }

              else
              {
                  req.flash('user-list', 'User has been added!');
                  res.redirect('/admin/list');
              }
            });
        }
     }
  //   (1) Grab the user session object.
  //   (2) Test that the user session object exists. If not, a redirect
  //       back to the login view is necessary with a proper flash message.
  //   (3) Test if the user session exists and they are not online. If
  //       the user session exists and they are not online it means the
  //       server has been restarted and their session has expired. If
  //       this is the case you will need to redirect back to login with
  //       a proper flash message (e.g., login expired).
  //   (4) Test is the user is an admin. If they are not you need to
  //       redirect back to main with a proper flash message - indicate
  //       that the user needs admin credentials to access this route.
  //   (5) If the user is logged in, they are online, and they are an
  //       admin then you need to grab the form variables from the
  //       `req.body` object. Test to make sure they all exist. If they
  //       do not then you need to redirect back to the `/list` route
  //       defined above with a proper flash message.
  //   (6) If you have received the proper form variables then you must
  //       create a new user using the `model.add` function. If an error
  //       message is returned in the callback you should flash that message
  //       to the `list` route above passing it the error message returned
  //       from the `model.add` function and redirect to `list`.
  //       Otherwise, you should flash to `list` that the user has
  //       been added and redirect back to the `list` route.
  //
  //  You will be graded on each of the above items.

  // Replace below with your implementation.
  
});

module.exports = router;