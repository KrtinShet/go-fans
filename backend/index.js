const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
require("colors");
const AppError = require("./utils/AppError");
const dbconfig = require("./config/dbconfig");
const ErrorController = require("./controllers/ErrorController");
const {
  seralizeUser
} = require("./controllers/AuthController")


dbconfig();

const UserAPI = require("./apis/UserAPI");
const CommentAPI = require("./apis/CommentAPI");
const FeedAPI = require("./apis/FeedAPI");
const AuthAPI = require("./apis/AuthAPI");

const app = express();


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.options('*', cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "..", "frontend", "public")));
app.use(seralizeUser)


app.use("/ping", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "pong",
  });
});


app.use("/api/v1/users", UserAPI);
app.use("/api/v1/comments", CommentAPI);
app.use("/api/v1/feeds", FeedAPI);
app.use("/api/v1/auth", AuthAPI);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.all("*", (req, res, next) => {
  if (req.method === "GET" && process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  }
  next(new AppError(`URL: "${req.originalUrl}" cannot be found`, 404));
});

app.use(ErrorController);

const port = process.env.PORT || 5001;
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
