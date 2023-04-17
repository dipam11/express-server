const express = require("express");

const app = express();
app.use(express.json());
app.listen(5000);

let users = [
  {
    id: 1,
    name: "Zendaya",
  },
  {
    id: 2,
    name: "Tom",
  },
  {
    id: 3,
    name: "Robert",
  },
];

const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

authRouter.route("/signUp").get(middleware, getSignUp).post(postSignUp);

function middleware(req, res, next) {
  console.log("Hello from middleware");
  next();
}

function getUser(req, res) {
  res.send(users);
}

function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  res.json({
    message: "Data Received Successfully",
    user: req.body,
  });
}

function updateUser(req, res) {
  console.log(req.body);
  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.json({
    message: "Data Updated Successfully",
  });
}

function deleteUser(req, res) {
  users = {};
  res.json({
    message: "Data Deleted Successfully",
  });
}

function getSignUp(req, res) {
    console.log("Hello from getSignup");
  res.sendFile("./public/signUp.html", { root: __dirname });
}

function postSignUp(req, res) {
  let obj = req.body;
  console.log("backend", obj);
  res.json({
    data: obj,
    message: "Data Recieved",
  });
}
