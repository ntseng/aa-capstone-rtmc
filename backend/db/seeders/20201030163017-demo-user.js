'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				email: 'demo@user.io',
				username: 'Demo-lition',
				avatarURL: "/images/dynamite.png",
				hashedPassword: bcrypt.hashSync('password'),
				inboxId: 1
			},
			{
				email: "alice@secret.io",
				username: "Alice",
				avatarURL: "/images/paper-frog.png",
				hashedPassword: bcrypt.hashSync("password"),
				inboxId: 5
			}
		], {});
	},

	down: async (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete('Users', {
			username: { [Op.in]: ['Demo-lition'] }
		}, {});
	}
};
