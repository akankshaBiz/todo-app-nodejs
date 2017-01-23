var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
mongoose.connect('mongodb://akku:akkujiggu@jello.modulusmongo.net:27017/vEtixy8r');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());


//app.use('/', index);
//app.use('/users', users);
var todo = mongoose.model('todo',{
  text: String
});
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

app.get('/api/todos', function (req, res) {
    console.log("get page");
  todo.find(function (err,todos) {
    if(err)
      res.send(err);

    res.json(todos);

  });
    
});
app.post('/api/add', function (req, res) {
    console.log("add page");
    todo.create({
      text: req.body.text,
      done: false
    }, function (err, todos) {

        if(err)
          res.send(err);
        todo.find(function (err, todo) {
            if(err)
              res.send(err);
            res.json(todo);

        });
        
    });
});

app.delete('/api/delete/:todo_id', function (req, res) {
    console.log("delete page"+req.params.todo_id);
    todo.remove({
      _id: req.params.todo_id
    }, function (err, todos) {
        if(err)
          res.send(err);
        todo.find(function (err, todo) {
          if(err)
            res.send(err);
          console.log('after delete : '+todo);
          res.json(todo);

        });

    });
});
app.get('*', function (req, res) {
    console.log("landing page");
    res.sendfile('./public/index.html');

});
//module.exports = app;
app.listen(8080);
console.log("app listening at 8080");