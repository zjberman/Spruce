var express    = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.set('port', process.env.PORT || 3000);

var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

function testmw(req, res, next) {

  res.locals.showTests = app.get('env') !== 'production' &&
                         req.query.test;
  next();
}

app.use(testmw);

var spruce = require('./team.js');

app.get('/', (req, res) => {
  res.render('home', {});
});

app.get('/about', (req, res) => {
  res.render('about', {});
});

app.get('/team', (req,res) => {
  if (req.query.user != null){
    var result = spruce.one(req.query.user);
    if (!result.success) {
      notFound404(req, res);
    } else {
      res.render('team', {
        members: result.data,
        pageTestScript: '/qa/tests-team.js'
      });
    }
  }
  else {
    var result = spruce.all();
    if (!result.success) {
      notFound404(req, res);
    } else {
      res.render('team', {
        members: result.data,
        pageTestScript: '/qa/tests-team.js'
      });
    }
  }
});

function notFound404(req, res) {
  res.status(404);
  res.render('404');
}

function internalServerError500(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
}

app.use(notFound404);
app.use(internalServerError500);

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' +
              app.get('port') + '; press Ctrl-C to terminate');
});
