const express = require("express");
const asyncHandler = require("express-async-handler");

const { List } = require("../../db/models");

const router = express.Router();

router.get("/:ownerId(\\d+)/", asyncHandler(async (req, res) => {
	const { ownerId } = req.params;
	const lists = await List.findAll({ ownerId });

	return res.json({ lists });
}))

router.post("/", asyncHandler(async (req, res) => {
	const { ownerId, title } = req.body;
	const list = await List.create({ ownerId, title });

	return res.json({ list });
}))

module.exports = router;
