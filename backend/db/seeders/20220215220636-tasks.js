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
		await queryInterface.bulkInsert("Tasks", [
			{
				ownerId: 1,
				listId: 2,
				title: "Create Seed Data",
				done: true,
				notes: "Yay recursion",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				ownerId: 1,
				listId: 1,
				title: "Update Project Wiki",
				done: false,
				notes: "Documentation: out of date the moment it goes into print",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				ownerId: 1,
				listId: 2,
				title: "Home Page: elements",
				done: false,
				notes: "",
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString()
			},
			{
				ownerId: 1,
				listId: 2,
				title: "Home Page: styling",
				done: false,
				notes: "Don't forget the cute mascot!",
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
		await queryInterface.bulkDelete("Tasks", null, {});
	}
};
