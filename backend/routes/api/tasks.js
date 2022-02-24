const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

const { Task } = require("../../db/models");

const router = express.Router();

router.get("/:ownerId(\\d+)/:listId(\\d+)", asyncHandler(async (req, res) => {
	const { ownerId, listId } = req.params;
	const tasks = await Task.findAll({ where: { ownerId, listId: Number(listId) } });
	return res.json({
		tasks
	})
}))

router.get("/search/:ownerId(\\d+)/:searchTerm", asyncHandler(async (req, res) => {
	const { ownerId, searchTerm } = req.params;
	const tasks = await Task.findAll({ where: { ownerId, title: { [Op.iLike]: `%${searchTerm}%` } } });

	return res.json({
		tasks
	})
}))

router.get("/:ownerId(\\d+)", asyncHandler(async (req, res) => {
	const { ownerId } = req.params;
	const tasks = await Task.findAll({ where: { ownerId } });

	return res.json({
		tasks
	})
}))

router.post("/", asyncHandler(async (req, res) => { //TODONOW validate too many characters in title
	const { ownerId, listId, title } = req.body;
	const task = await Task.create({ ownerId, listId, title, done: false, notes: "" });

	return res.json({ task });
}))

router.patch("/", asyncHandler(async (req, res) => { //TODONOW validate too many characters in title or notes
	const { taskId, listId, title, done, dueDate, notes } = req.body;
	const task = await Task.findByPk(taskId);
	if (task) {
		await task.update({ listId, title, done, dueDate, notes });
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
