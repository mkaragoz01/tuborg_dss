const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const home_router = require("./routers/home_router");
const form_router = require("./routers/form_router");
const index_router = require("./routers/index_router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, "/dist")));

app.use("/", index_router);
app.use("/api", home_router);
app.use("/form", form_router);

const port = process.env.PORT;

app.listen(port);
