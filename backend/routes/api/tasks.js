const express = require("express");
const asyncHandler = require("express-async-handler");

const { Task } = require("../../db/models");

const router = express.Router();

router.get("/:ownerId(\\d+)/:listId(\\d+)", asyncHandler(async (req, res) => {
	const { ownerId, listId } = req.params;
	const tasks = await Task.findAll({ ownerId });

	return res.json({
		tasks: tasks.filter(task => task.listId === Number(listId))
	})
}))

router.get("/search/:ownerId(\\d+)/:searchTerm", asyncHandler(async (req, res) => {
	const { ownerId, searchTerm } = req.params;
	const tasks = await Task.findAll({ ownerId });

	return res.json({
		tasks: tasks.filter(task => task.title?.includes(searchTerm))
	})
}))

router.get("/:ownerId(\\d+)", asyncHandler(async (req, res) => {
	const { ownerId } = req.params;
	const tasks = await Task.findAll({ ownerId });

	return res.json({
		tasks
	})
}))

router.post("/", asyncHandler(async (req, res) => {
	const { ownerId, listId, title } = req.body;
	const task = await Task.create({ ownerId, listId, title, done: false, notes: "" });

	return res.json({ task });
}))

router.patch("/", asyncHandler(async (req, res) => {
	const { taskId, listId, title, done, notes } = req.body;
	const task = await Task.findByPk(taskId);
	if (task) {
		await task.update({ listId, title, done, notes });
		task.save();
		return res.json({ task });
	} else {
		return res.status(404).json({ errors: ["Task could not be found"] });
	}
}))

router.delete("/", asyncHandler(async (req, res) => {
	const { taskId } = req.body;
	const task = await Task.findByPk(taskId);
	if (task) {
		await task.destroy();
		return res.json({ errors: false });
	} else {
		return res.status(404).json({ errors: ["Task could not be found"] });
	}
}))

module.exports = router;
