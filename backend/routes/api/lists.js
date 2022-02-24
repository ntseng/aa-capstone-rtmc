const express = require("express");
const asyncHandler = require("express-async-handler");

const { List } = require("../../db/models");

const router = express.Router();

router.get("/:ownerId(\\d+)/", asyncHandler(async (req, res) => {
	const { ownerId } = req.params;
	const lists = await List.findAll({ where: { ownerId } });

	return res.json({ lists });
}))

router.post("/", asyncHandler(async (req, res) => { //TODONOW validate too many characters for list title
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
