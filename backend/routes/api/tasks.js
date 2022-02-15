const express = require("express");
const asyncHandler = require("express-async-handler");

const { Task } = require("../../db/models");
const { Op } = require("sequelize/types");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
	const { userId } = req.body;
	const tasks = await Task.findAll({ userId });

	return res.json({
		tasks
	})
}))

router.get("/filtered", asyncHandler(async (req, res) => {
	const { userId, listId, searchTerm } = req.body;
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
