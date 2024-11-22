const express = require("express");
const { signup, signin, userlist } = require("../controllers/userController");
const verifyTokenMiddleware = require("../middlewares/sessionexpire");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", verifyTokenMiddleware, signin);
// userRouter.get("/users-list",userlist);

module.exports = userRouter;