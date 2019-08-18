const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./Members");

const logger = require("./middleware/logger");

const app = express();

// app.get("/", (req, res) => {
//   //   res.send("<h1>Hello World!!</h1>");
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });   shoule be the same as follows, using use.

//init middleware
// app.use(logger);

//handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//home page
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members
  })
);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

//members api routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server runs on port ${PORT}`));
