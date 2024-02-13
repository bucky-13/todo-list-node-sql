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
      res.send(result);
    });
  });
});

// create new user
router.post('/', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let userName = req.body.userName;
    let userEmail = req.body.userEmail;

    let firstSql = `SELECT * FROM users WHERE userName="${userName}" OR userEmail="${userEmail}"`;

    // POST new user into database
    let secondSql = `INSERT INTO users (userName, userEmail) VALUES ("${userName}", "${userEmail}")`;

    req.app.locals.con.query(firstSql, function (err, result) {
      if (err) {
        console.log(err);
      }
      if (!result[0]) {
        console.log('user can be created');
        req.app.locals.con.query(secondSql, function (err, result) {
          if (err) {
            console.log(err);
          }
          res.send(result);
        });
      } else {
        res.status(409).json({ message: 'user name or email already exists' });
      }
    });
  });
});

router.post('/login', (req, res, next) => {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let userName = req.body.userName;
    let userEmail = req.body.userEmail;

    let sql = `SELECT userId FROM users WHERE userName="${userName}" AND userEmail="${userEmail}"`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }

      if (!result[0]) {
        res.status(401).json({
          message: 'Login failed, user name or email does not exist.',
        });
      } else {
        res.send(result);
      }
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
      res.send(result);
    });
  });
});

router.delete('/', (req, res, next) => {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let userId = Number(req.body.userId);

    let sql = `DELETE FROM users WHERE userId=${userId}`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });
});

module.exports = router;
