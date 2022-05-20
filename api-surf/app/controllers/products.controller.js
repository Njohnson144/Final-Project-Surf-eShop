const db = require("../index");

// exports.getRouteById = (req, res) => {
//     let id = req.params.id;
  
//     const query = `
//       SELECT * 
//       FROM urls.urls 
//       WHERE id = ?
//          ;`;
  
//     const placeholders = [id];
  
//     db.query(query, placeholders, (err, results) => {
//       if (err) {
//         res.status(500).send({
//           message: "There was an error finding ID.",
//           error: err,
//         });
//       } else if (results.length == 0) {
//         res.status(404).send({
//           message: "no route found",
//         });
//       } else {
//         res.send({
//           message: "Your ID was found Successfully",
//           url: results[0],
//         });
//       }
//     });
//   };
  
//   exports.getAllUrls = (req, res) => {
    
  
//     const query = `
//       SELECT * 
//       FROM urls.urls
//          ;`;
  
    
  
//     db.query(query, (err, results) => {
//       if (err) {
//         res.status(500).send({
//           message: "There was an error finding URLs.",
//           error: err,
//         });
//       } else if (results.length == 0) {
//         res.status(404).send({
//           message: "no route found",
//         });
//       } else {
//         res.send({
//           message: "Your URL was found Successfully",
//           urls: results,
//         });
//       }
//     });
//   };
  
  
//   exports.createNewUrl = (req, res) => {
//     let { id, url } = req.body;
  
//     if (!id || !url) {
//       res.status(400).send({
//         message: "404 not found.",
//       });
//       return;
//     }
//     console.log(req.body);
  
//     const query = `
//     INSERT INTO urls.urls (id, url) 
//     VALUES 
//         (?, ?);`;
//     const placeholders = [id, url];
  
//     db.query(query, placeholders, (err, results) => {
//       console.log(results);
  
//       if (err) {
//         res.status(500).send({
//           message: "There was an error creating a new url.",
//           error: err,
//         });
//       } else {
//         res.send({
//           message: "Your URL was Created Successfully",
//         });
//       }
//     });
//   };