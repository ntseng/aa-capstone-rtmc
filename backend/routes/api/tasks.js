const express = require("express");
const asyncHandler = require("express-async-handler");

const { Task } = require("../../db/models");
const { Op } = require("sequelize/types");

const router = express.Router();

router.get("/:userId(\\d+)", asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const tasks = await Task.findAll({ userId });

	return res.json({
		tasks
	})
}))

router.get("/:userId(\\d+)/:listId(\\d+)/:searchTerm", asyncHandler(async (req, res) => {
	const { userId, listId, searchTerm } = req.params;
	const tasks = await Task.findAll({
		userId,
		[Op.and]: [
			{
				[Op.or]:
					listId,
				title: { [Op.iLike]: searchTerm }
			}
		]
	});

	return res.json({
		tasks
	})
}))

module.exports = router;
