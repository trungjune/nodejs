const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const Handlebars = require("handlebars");
const methodOverride = require("method-override");
const SortMiddleware = require("./app/middlewares/SortMiddleware");

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

// Custom middlewares
app.use(SortMiddleware);

Handlebars.registerHelper("sum", function (a, b) {
  return a + b;
});

Handlebars.registerHelper("sortable", function (field, sort) {
  const sortType = field === sort.column ? sort.type : "default";

  const icons = {
    default: "oi oi-elevator",
    asc: "oi oi-sort-ascending",
    desc: "oi oi-sort-descending",
  };
  const types = {
    default: "desc",
    asc: "desc",
    desc: "asc",
  };

  const icon = icons[sortType];
  const type = types[sortType];

  return `
                <a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>
    `;
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
