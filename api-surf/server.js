const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/index");
require("./app/routes/products.routes")(app);
require("./app/routes/users.routes")(app);
// require('.app/routes/foo.routes) (app);   this is what you copy/paste and then fill it in, dumb dumb

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}!`); //actually opening the server
});