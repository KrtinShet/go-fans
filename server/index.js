const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
cookieParser = require('cookie-parser')
require("colors");


const dbconfig = require("./config/dbconfig");
const ErrorController = require("./controllers/ErrorController");
const {
  seralizeUser
} = require("./controllers/AuthController")

const AuthApi = require("./apis/AuthAPI");
const CommentApi = require("./apis/CommentAPI")
const FeedApi = require("./apis/FeedAPI")
const UserApi = require("./apis/UserAPI")
const PaymentApi = require("./apis/PaymentAPI")
const SubscriptionApi = require("./apis/SubscriptionAPI")



dbconfig();
const app = express()
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "..", "client", "build")));
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
 * API Endpoints
 */

app.use("/api/v1/auth", AuthApi)
app.use("/api/v1/comment", CommentApi)
app.use("/api/v1/feed", FeedApi)
app.use("/api/v1/user", UserApi)
app.use("/api/v1/subscription", SubscriptionApi)
app.use("/api/v1/payment", PaymentApi)


app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  // if (req.method === "GET") {
  //   res.sendFile(path.join(__dirname, "public", "index.html"));
  // }
  // next(new AppError(`URL: "${req.originalUrl}" cannot be found`, 404));
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
