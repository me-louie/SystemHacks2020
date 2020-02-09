const potusScraper = require('./potusScraper');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    server.setTimeout(10000);
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('./index.html', function(error, fileContent){
        if(error){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Error');
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(fileContent);
            res.end();
        }
    });

    // wrapping potusScraper() in async function to operate on resolve value
    // async function f() {
    //   return potusScraper();
    // }
    //
    // f().then((result) => {
    //   res.write(JSON.stringify(result));
    //   res.end("end good");
    // }).catch((err) => {
    //   res.write(err.toString())
    //   res.end("end bad");
    // });


  });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});