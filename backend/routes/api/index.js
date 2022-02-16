const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const tasksRouter = require("./tasks.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);

module.exports = router;
