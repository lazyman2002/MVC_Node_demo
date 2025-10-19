"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                email: "1example@example.com",
                password: "Doe",
                username: "John1",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "2example@example.com",
                password: "Doe",
                username: "John2",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "3example@example.com",
                password: "Doe",
                username: "John3",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    },
};
