const express = require("express");

const userRouter = require("../controlers/user.control");

const router = express.Router();

router.post("/create", userRouter.createUser);

router.post("/login", userRouter.loginUser);

router.patch("/update/:id", userRouter.updateUser);

module.exports = router;