'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Articles', 'mediaArticlesId', {
      allowNull: true,
      type: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Articles', 'mediaArticlesId', {
      allowNull: false,
      type: Sequelize.INTEGER
    });
  }
};
