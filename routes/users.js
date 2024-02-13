var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    //GET all fields from all users
    let sql = `SELECT * FROM users`;
    // GET userName & userEmail from all users
    // let sql = `SELECT userName, userEmail FROM users`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
      res.send(result);
    });
  });
});

/* GET one user */
router.get('/:id', function (req, res, next) {
  let userId = Number(req.params.id);
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    // GET userName & userEmail from all users
    let sql = `SELECT userName, userEmail FROM users WHERE userId="${userId}"`;

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

    let saveName = req.body.saveName;
    let saveEmail = req.body.saveEmail;

    // POST new user into database
    let sql = `INSERT INTO users (userName, userEmail) VALUES ("${saveName}", "${saveEmail}")`;

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

    let id = Number(req.body.findId);
    let newUserName = req.body.newUserName;
    let newEmail = req.body.newEmail;

    let sql = `UPDATE users SET userName="${newUserName}", userEmail="${newEmail}" WHERE id=${id}`;

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

    let id = Number(req.body.findId);

    let sql = `DELETE FROM users WHERE id=${id}`;

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
