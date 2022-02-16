const express = require("express");
const asyncHandler = require("express-async-handler");

const { List } = require("../../db/models");

const router = express.Router();

router.get("/:ownerId(\\d+)/", asyncHandler(async (req, res) => {
	const { ownerId } = req.params;
	const lists = await List.findAll({ ownerId });

	return res.json({ lists });
}))

module.exports = router;
