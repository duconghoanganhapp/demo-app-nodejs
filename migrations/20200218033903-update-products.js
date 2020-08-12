'use strict';
//Update signle column
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'products',
        'name',
        {
          allowNull: false,
          type: Sequelize.STRING(100)
      
        }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'products',
        'name',
        {
          allowNull: false,
          type: Sequelize.STRING(255)
      
        }
      );
  }
};
