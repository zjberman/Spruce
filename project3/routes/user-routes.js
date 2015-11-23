var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// A list of users who are online:
var online = require('../lib/online').online;

// Provides a login view
router.get('/login', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user && online[user.name]) {
    res.redirect('/user/main');
  }
  else {
    // Grab any messages being sent to us from redirect:
    var message = req.flash('login') || '';
    res.render('login', { button  : 'Register', 
                          buttonwidth : 40,
                          link    : "/user/register" });
  }
});

// Performs **basic** user authentication.
router.post('/auth', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user && online[user]) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form:
    var name = req.body.name;
    var pass = req.body.pass;

    if (!name || !pass) {
      req.flash('login', 'did not provide the proper credentials');
      res.redirect('/user/login');
    }
    else {
      model.lookup(name, pass, function(error, user) {
        if (error) {
          // Pass a message to login:
          req.flash('login', error);
          res.redirect('/user/login');
        }
        else {
          // add the user to the map of online users:
          online[user.name] = user;

          // create a session variable to represent stateful connection
          req.session.user = user;

          // Pass a message to main:
          req.flash('main', 'authentication successful');
          res.redirect('/user/main');
        }
      });
    }
  }
});

// Performs logout functionality - it does nothing!
router.get('/logout', function(req, res) {
  // Grab the user session if logged in.
  var user = req.session.user;

  // If the client has a session, but is not online it
  // could mean that the server restarted, so we require
  // a subsequent login.
  if (user && !online[user.name]) {
    delete req.session.user;
  }
  // Otherwise, we delete both.
  else if (user) {
    delete online[user.name];
    delete req.session.user;
  }

  // Redirect to login regardless.
  res.redirect('/user/login');
});

// Renders the main user view.
router.get('/main', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else if (user && !online[user.name]) {
    req.flash('login', 'Login Expired');
    delete req.session.user;
    res.redirect('/user/login');
  }
  
  else if (user.admin) {
    var message = req.flash('main') || 'Login Successful';
    res.render('newsfeed', {username : user.name,
                          button   : 'Logout',
                          buttonwidth : 20,
                          link     :'/user/logout',
                          adminbutton: 
    "<a href = '/admin'><button class='sbtn'>Users</button></a>"
                          });
  }
  else {
    // capture the user object or create a default.
    var message = req.flash('main') || 'Login Successful';
    res.render('newsfeed', {username : user.name,
                          button   : 'Logout',
                          buttonwidth : 40,
                          link     :'/user/logout'});
  }
});

router.get('/branch', function(req,res) {
  var user = req.session.user;

  if(!user)
  {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  
  else if(user && !online[user.name])
  {
    req.flash('login', 'Login Expired');
    delete req.session.user;
    res.redirect('/user/login');
  }

  else if (user.admin) {
    var message = req.flash('main') || 'Login Successful';
    res.render('branch', {username : user.name,
                          button   : 'Logout',
                          buttonwidth : 20,
                          link     :'/user/logout',
                          adminbutton: 
    "<a href = '/admin'><button class='sbtn'>Users</button></a>"
                          });
  }
  else {
    // capture the user object or create a default.
    var message = req.flash('main') || 'Login Successful';
    res.render('branch', {username : user.name,
                          button   : 'Logout',
                          buttonwidth : 40,
                          link     :'/user/logout'});
  }

});

// Renders the users that are online.
router.get('/online', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else {
    res.render('online', {
      title : 'Online Users',
      online: online
    });
  }
});

router.get('/register', (req, res) => {
     var user = req.session.user;
    
     if(user && online[user.name])
     {
        req.flash('branch', 'Login expired!');
        res.redirect('/user/main');
     }

     else
     {
        res.render('register', {button : "Login",
                                buttonwidth : 40,
                                link   : "/user/login"});
        // var name  = req.body.name;
        // var pass  = req.body.pass;
        // var email = req.body.email;
        // // console.log('name ' + name);
        // // console.log('pass ' + pass);
        // // console.log(!name);
        // if(name && pass && email)
        // {
        //     req.flash('register', 'Missing one or more required fields.');
        //     res.redirect('/user/register');
        // }

        // else 
        // {
        //   var newUser = {name, pass, admin};
        //     model.add(newUser, function(error, newUser){
        //       if(error)
        //       {
        //           req.flash('register', error);
        //           res.render('/user/register');
        //       }

        //       else
        //       {
        //           req.flash('login', 'User has been added!');
        //           res.redirect('/user/login');
        //       }
        //     });
        // }
     }
  
});

router.post('/add', (req, res) => {
 
  // Pull the values from the form:
  var name  = req.body.name;
  var pass  = req.body.pass;
  var admin = false;
  var email = req.body.email;

  if (!name || !pass || !email) {
    req.flash('register', 'did not provide the proper credentials');
    res.redirect('/user/register');
  }
  else {
    var newUser = {name, pass, admin, email};
    model.add(newUser, function(error, user) {
      if (error) {
        // Pass a message to login:
        req.flash('register', error);
        res.redirect('/user/register');
      }
      else {
        
        // Pass a message to main:
        req.flash('login', 'authentication successful');
        res.redirect('/user/login');
      }
    });
  }
  
});

module.exports = router;
