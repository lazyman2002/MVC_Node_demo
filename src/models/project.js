"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Project.belongsToMany(models.User, {
                through: models.Project_User,
                foreignKey: "projectId",
                otherKey: "userId",
            });
        }
    }
    Project.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            startDate: DataTypes.DATE,
            customerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Project",
        }
    );
    return Project;
};
