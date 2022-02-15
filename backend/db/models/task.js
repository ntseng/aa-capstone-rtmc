'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Task.belongsTo(models.User, { foreignKey: "ownerId" });
		}
	}
	Task.init({
		ownerId: DataTypes.INTEGER,
		listId: DataTypes.INTEGER,
		title: DataTypes.STRING,
		done: DataTypes.BOOLEAN,
		notes: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Task',
	});
	return Task;
};
