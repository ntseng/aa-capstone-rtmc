'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		await queryInterface.bulkInsert("Lists", [
			{
				ownerId: 1,
				title: "Inbox",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				ownerId: 1,
				title: "Work",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				ownerId: 1,
				title: "Personal",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				ownerId: 1,
				title: "Hobbies",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				ownerId: 2,
				title: "Inbox",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				ownerId: 2,
				title: "Work",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				ownerId: 2,
				title: "Personal",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			}
		])
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Lists", null, {});
	}
};
