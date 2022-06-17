module.exports = (app) => {
    
    const products = require('../controllers/products.controller.js');
    
    
    app.get('/api/products', products.getAllProducts);
    app.get('/api/products/:id', products.getProductsById);
    // app.get('/api/products/name/:name', products.getProductsByName);
    app.get('/api/products/color/:color', products.getProductsByColor);
    app.get('/api/products/style/:style', products.getProductsByStyle);
    app.get('/api/products/brand/:brand', products.getProductsByBrand);
    app.get('/api/products/search', products.getProductsByQuery);
    app.get('/api/products/category/:category', products.getProductsByCategory);


    }