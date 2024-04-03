const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const Handlebars = require("handlebars");
const methodOverride = require("method-override");

const app = express();
const port = 3000;
const db = require("./config/db");

// Connect DB
db.connect();

const route = require("./routes/index");

// Use static folder
app.use(express.static(path.join(__dirname, "/public")));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(methodOverride("_method"));

Handlebars.registerHelper("sum", function (a, b) {
  return a + b;
});
// HTTP logger
// app.use(morgan('combined'))

// template engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
