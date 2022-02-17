'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Tasks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			ownerId: {
				references: { model: "Users" },
				type: Sequelize.INTEGER,
				allowNull: false
			},
			listId: {
				type: Sequelize.INTEGER
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING
			},
			done: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				default: false
			},
			dueDate: {
				type: Sequelize.DATE
			},
			notes: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Tasks');
	}
};
