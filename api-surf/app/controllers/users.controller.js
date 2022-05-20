const db = require("../index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const TOKEN_KEY = 4206969420;
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
  SELECT * FROM urls.users
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

        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          'abc123',

          {
            expiresIn: "2h",
          }
        );
        user.token = token;

        res.send({
          message: "You have logged in brah/brahette/brahthem",
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
    INSERT INTO urls.users (id, email, password)
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


// exports.addBookToList = (req, res) => {
    
//     let { userId, bookId } = req.body;
  
//     if (!userId || !bookId) {
//       res.status(400).send({
//         message: "UserId and BookId was not defined",
//       });
//       return;
//     }
  
//     const query = `
//       INSERT INTO list_items (userId, bookId)
//           VALUES (?, ?);
//       `;
//     const placeholders = [userId, bookId];
  
//     db.query(query, placeholders, (err, results) => {
//       if (err) {
//           res.status(500)
//           .send({
//               error: err,
//             message:
//               "There was an error creating your account. Please try again later.",
//           });
        
//       } else {
//         res.send({
//           message: "Your book was sucessfully added! 👏",
//         });
//       }
//     });
//   };

// exports.updateFavoriteBookById = async (req, res) => {
//   let bookId = req.params.favoriteBookId;
//   let userId = req.body.id;

//   if (!bookId || !userId) {
//     res.status(400).send({
//       message: "User or Book was not defined",
//     });
//     return;
//   }

//   const query = ` 
//     UPDATE urls.users 
//         SET 
//             favoriteBook = ?
//         WHERE (id = ?);
//   `;
//   const placeholders = [bookId, userId];

//   db.query(query, placeholders, (err, results) => {
//     if (err) {
//       res.status(500).send({
//         message: "There was an error updating favorite book",
//         error: err,
//       });
//     } else {
//       res.send({
//         message: "Your account was sucessfully updated! 👏",
//       });
//     }
//   });
// };

exports.deleteUserById = (req, res) => {
  let { id } = req.params;

  id = Number(id);

  const query = ` 
    DELETE FROM urls.users
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
