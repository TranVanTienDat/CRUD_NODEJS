const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./server/dataBase/connection");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(morgan("tiny"));
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname), "views/ejs");

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log("listen sever port 5000...");
});
