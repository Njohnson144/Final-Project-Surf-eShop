const db = require("../index");

exports.getAllProducts = (req, res) => {
    const query = `SELECT * FROM surfshop.products;`;
    db.query(query, (err, results) => {
  
  
      if (err) {
        res.status(500).send({
          message: "There was an error getting your gnarly surf gear.",
          error: err,
        });
      } else if (results.length == 0) {
        res.status(404).send({
          message: "No products found",
        });
      } else {
        res.send({
          products: results,
        });
      }
    });
  };
  
  exports.getProductsById = (req, res) => {
  
    let productId = req.params.id;
  
    const query = `
          SELECT * FROM surfshop.products
              WHERE id = ? ;
        `;
  
    const placeholders = [productId];
  
    db.query(query, placeholders, (err, results) => {
  
      if (err) {
        res.status(500)
          .send({
            message: "There was an error getting your gnarly surf gear.",
            error: err,
          });
      } else if (results.length == 0) {
        res.status(404).send({
          message: "No products found",
        });
      } else {
        res.send({
          product: results[0],
        });
      }
    });
  };
  
  exports.getProductsByBrand = (req, res) => {
  
    let productBrand = req.params.brand;
  
    const query = `
          SELECT * FROM surfshop.products
              WHERE brand = ? ;
        `;
  
    const placeholders = [productBrand];
  
    db.query(query, placeholders, (err, results) => {
  
      if (err) {
        res.status(500)
          .send({
            message: "There was an error getting your brand.",
            error: err,
          });
      } else if (results.length == 0) {
        res.status(404).send({
          message: "No brands found",
        });
      } else {
        res.send({
          products: results,
        });
      }
    });
  };
  
  exports.getProductsByStyle = (req, res) => {
  
    let productStyle = req.params.style;
  
    const query = `
          SELECT * FROM surfshop.products
              WHERE style = ? ;
        `;
  
    const placeholders = [productStyle];
  
    db.query(query, placeholders, (err, results) => {
  
      if (err) {
        res.status(500)
          .send({
            message: "There was an error getting your styling styles.",
            error: err,
          });
      } else if (results.length == 0) {
        res.status(404).send({
          message: "No styles found",
        });
      } else {
        res.send({
          products: results,
        });
      }
    });
  };

  exports.getProductsByCategory = (req, res) => {
  
    let productCategory = req.params.category;
  
    const query = `
          SELECT * FROM surfshop.products
              WHERE category = ? ;
        `;
  
    const placeholders = [productCategory];
  
    db.query(query, placeholders, (err, results) => {
  
      if (err) {
        res.status(500)
          .send({
            message: "There was an error getting your categories.",
            error: err,
          });
      } else if (results.length == 0) {
        res.status(404).send({
          message: "No categories found",
        });
      } else {
        res.send({
          products: results,
        });
      }
    });
  };
  
  exports.getProductsByColor = (req, res) => {
  
    let productColor = req.params.color;
  
    const query = `
          SELECT * FROM surfshop.products
              WHERE color = ? ;
        `;
  
    const placeholders = [productColor];
  
    db.query(query, placeholders, (err, results) => {
  
      if (err) {
        res.status(500)
          .send({
            message: "There was an error getting your specified color.",
            error: err,
          });
      } else if (results.length == 0) {
        res.status(404).send({
          message: "No colors found",
        });
      } else {
        res.send({
          products: results,
        });
      }
    });
  };
  
  
  exports.getProductsByQuery = (req, res) => {
  
    var filters = ``;
    var placeholders = []
  
    let entries = Object.entries(req.query)
    for (let [key, value] of entries) {
      filters += ` ?? LIKE ? AND`
      placeholders.push(key, `%${value}%`);
    }
  
    filters = filters.slice(0, -3);
  
    const query = `
          SELECT * FROM surfshop.products
          WHERE
          ${filters}  
          ;`;
  
    db.query(query, placeholders, (err, results) => {
  
      if (err) {
        res.status(500)
          .send({
            message: 'There was an error getting pri',
            error: err
          });
      } else if (results.length == 0) {
        res.status(404)
          .send({
            message: 'No products found',
            error: err
          })
      } else {
        res.send({
          products: results
        });
      }
    });
  }