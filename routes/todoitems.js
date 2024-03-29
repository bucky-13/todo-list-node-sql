var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

/* GET todoitems listing. */
router.get('/', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    //GET all fields from all todoitems
    let sql = `SELECT * FROM todoitems`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
      res.send(result);
    });
  });
});

/* GET todo items from ONE user */
router.get('/:id', function (req, res, next) {
  let userId = Number(req.params.id);
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    // GET userName & userEmail from all users
    let sql = `SELECT * FROM todoitems WHERE userId="${userId}"`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
      res.send(result);
    });
  });
});

router.post('/', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let userId = req.body.userId;
    let todoText = req.body.todoText;

    // POST new user into database
    let sql = `INSERT INTO todoitems (userId, todoText) VALUES ("${userId}", "${todoText}")`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
      res.send(result);
    });
  });
});

router.put('/check', (req, res, next) => {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let todoId = Number(req.body.todoId);
    let userId = Number(req.body.userId);
    let isCompleted = req.body.isCompleted;
    let sql = `UPDATE todoitems SET isCompleted="${isCompleted}" WHERE todoId=${todoId} AND userId=${userId}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
      res.send(result);
    });
  });
});
router.put('/', (req, res, next) => {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let todoId = Number(req.body.todoId);
    let userId = Number(req.body.userId);
    let isCompleted = req.body.isCompleted;
    let todoText = req.body.todoText;
    let sql = `UPDATE todoitems SET isCompleted="${isCompleted}", todoText="${todoText}" WHERE todoId=${todoId} AND userId=${userId}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
      res.send(result);
    });
  });
});

router.delete('/', (req, res, next) => {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let todoId = Number(req.body.todoId);
    let userId = Number(req.body.userId);

    let sql = `DELETE FROM todoitems WHERE todoId=${todoId} AND userId=${userId}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
      res.send(result);
    });
  });
});

module.exports = router;
