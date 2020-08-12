'use strict';
//Update multiple columns
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('products', 'name', {
        allowNull: false,
        type: Sequelize.STRING(120)
      }),
      queryInterface.changeColumn('products', 'img', {
        allowNull: true,
        type: Sequelize.STRING
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('products', 'name', {
        allowNull: false,
        type: Sequelize.STRING(255)
      }),
      queryInterface.changeColumn('products', 'img', {
        allowNull: false,
        type: Sequelize.STRING
      })
    ]);
  },
};
