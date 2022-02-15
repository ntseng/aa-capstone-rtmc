'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class List extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			List.belongsTo(models.User, { foreignKey: "ownerId" });
		}
	}
	List.init({
		title: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'List',
	});
	return List;
};
