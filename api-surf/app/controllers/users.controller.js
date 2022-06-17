const db = require("../index");
const bcrypt = require("bcrypt");
const { v4: uuid } = require('uuid');
const saltRounds = 10;

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: "Could not log in. Username or Password was missing",
    });
    return;
  }

  const query = `
  SELECT * FROM surfshop.users
    WHERE email = ?;
  `;
  const placeholders = [email];

  db.query(query, placeholders, async (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error logging in. Please try again",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "Username or password was incorrect",
      });
    } else {
      const passwordMatched = await bcrypt.compare(
        password,
        results[0].password
      );
      if (passwordMatched) {
        //successful login

        let user = results[0];


        res.send({
          message: "You're logged in brah",
          user,
        });
      } else {
        res.status(404).send({
          message: "Username or Password was incorrect",
        });
      }
    }
  });
};

exports.createNewUser = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: "Username or password was not defined",
    });
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `
    INSERT INTO surfshop.users (id, email, password)
        VALUES (?, ?, ?);
    `;
  const placeholders = [uuid(), email, encryptedPassword];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      if (err.errno === 1062) {
        res.status(400).send({
          message: "Username already taken",
          error: err,
        });
      } else {
        res.status(500).send({
          message:
            "There was an error creating your account. Please try again later.",
          error: err,
        });
      }
    } else {
      //success
      this.login(req, res);
    }
  });
};




exports.deleteUserById = (req, res) => {
  let { id } = req.params;

  id = Number(id);

  const query = ` 
    DELETE FROM surfshop.users
         WHERE (id = ?)
         `;
  const placeholders = [id];
  // tell the daatabase to execute that script
  db.query(query, placeholders, (err, results) => {
    // this code will exectue when the database responds

    // 3 possible cases: 404 - Nothing Found
    //                       - whole error
    //                       - Success

    if (err) {
      res.status(500).send({
        message: "There was an error deleting you.",
        error: err,
      });
    } else if (results.affectedRows == 0) {
      res.status(404).send({
        message: "No Account found",
      });
    } else {
      res.send({
        message: "You Gone!",
      });
    }
  });
};
