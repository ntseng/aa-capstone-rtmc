const express = require("express");
const asyncHandler = require("express-async-handler");

const { Task } = require("../../db/models");

const router = express.Router();

router.get("/:userId(\\d+)/:listId(\\d+)", asyncHandler(async (req, res) => {
	const { userId, listId } = req.params;
	const tasks = await Task.findAll({ userId });

	return res.json({
		tasks: tasks.filter(task => task.listId === Number(listId))
	})
}))

router.get("/search/:userId(\\d+)/:searchTerm", asyncHandler(async (req, res) => {
	const { userId, searchTerm } = req.params;
	const tasks = await Task.findAll({ userId });

	return res.json({
		tasks: tasks.filter(task => task.title?.includes(searchTerm))
	})
}))

router.get("/:userId(\\d+)", asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const tasks = await Task.findAll({ userId });

	return res.json({
		tasks
	})
}))

module.exports = router;
