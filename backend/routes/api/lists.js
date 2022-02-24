const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { List } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/:ownerId(\\d+)/", asyncHandler(async (req, res) => {
	const { ownerId } = req.params;
	const lists = await List.findAll({ where: { ownerId } });

	return res.json({ lists });
}))

const validateList = [
	check('title')
		.exists({ checkFalsy: true })
		.isLength({ min: 1, max: 50 })
		.withMessage('Please ensure title is between 1 and 50 characters.'),
	handleValidationErrors
];

router.post("/", validateList, asyncHandler(async (req, res) => {
	const { ownerId, title } = req.body;
	const list = await List.create({ ownerId, title });

	return res.json({ list });
}))

router.patch("/", asyncHandler(async (req, res) => {
	const { listId, ownerId, title } = req.body;
	const list = await List.findByPk(listId);
	if (list) {
		if (ownerId) {
			await list.update({ ownerId });
		} else {
			await list.update({ title });
		}
		list.save();
		return res.json({ list });
	} else {
		return res.status(404).json({ errors: ["List could not be found."] })
	}
}))

router.delete("/", asyncHandler(async (req, res) => {
	const { listId } = req.body;
	const list = await List.findByPk(listId);
	if (list) {
		await list.destroy();
		return res.json({ errors: false });
	} else {
		return res.status(404).json({ errors: ["List could not be found."] });
	}
}))

module.exports = router;
