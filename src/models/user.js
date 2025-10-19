"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Group, {
                foreignKey: "groupId",
                onDelete: "SET NULL",
            });
            User.belongsToMany(models.Project, {
                through: models.Project_User,
                foreignKey: "userId",
                otherKey: "projectId",
            });
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            sex: DataTypes.STRING,
            groupId: DataTypes.INTEGER,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
};
