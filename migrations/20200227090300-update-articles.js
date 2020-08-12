'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Articles', 'desc', {
      allowNull: true,
      type: Sequelize.TEXT('long')
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Articles', 'desc', {
      allowNull: true,
      type: Sequelize.TEXT
    });
  }
};
