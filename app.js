var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');
let cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoitemsRouter = require('./routes/todoitems');

var app = express();

app.locals.con = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'todoList',
  password: 'todoList',
  database: 'todolist',
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todoitems', todoitemsRouter);

module.exports = app;
