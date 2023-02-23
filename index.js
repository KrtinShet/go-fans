const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
cookieParser = require('cookie-parser')
require("colors");


const AppError = require("./utils/AppError");
const dbconfig = require("./config/dbconfig");
const ErrorController = require("./controllers/ErrorController");
const {
  seralizeUser
} = require("./controllers/AuthController")

const AuthApi = require("./apis/AuthAPI");
const CommentApi = require("./apis/CommentAPI")
const FeedApi = require("./apis/FeedAPI")
const UserApi = require("./apis/UserAPI")

const ViewRoutes = require('./routes/index')


dbconfig();
const app = express()
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));
// app.set('views', express.static(path.join(__dirname, "views")));
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(cookieParser())
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(seralizeUser)


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}



app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "pong",
  });
});

/**
 * View Endpoints
 */

app.use('/', ViewRoutes)

/**
 * API Endpoints
 */

app.use("/api/v1/auth", AuthApi)
app.use("/api/v1/comment", CommentApi)
app.use("/api/v1/feed", FeedApi)
app.use("/api/v1/user", UserApi)


app.all("*", (req, res, next) => {
  // if (req.method === "GET" && process.env.NODE_ENV === "production") {
  //   res.sendFile(path.join(__dirname, "public", "index.html"));
  // }
  // if (req.method === "GET") {
  //   res.render("404");
  // }
  next(new AppError(`URL: "${req.originalUrl}" cannot be found`, 404));
});



app.use(ErrorController);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "server has started on:  " +
      `${process.env.NODE_ENV}`.yellow.bold +
      " mode"
    );
  } else {
    console.log(
      "server has started on:  " +
      `${process.env.NODE_ENV}`.green.bold +
      " mode"
    );
  }
  console.log(`url: ` + `http://localhost:${port}`.yellow);
});
