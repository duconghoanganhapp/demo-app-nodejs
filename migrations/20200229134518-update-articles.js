'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Articles', 'mediaArticlesId'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Articles', 'mediaArticlesId', {
      type: Sequelize.INTEGER
    });
  }
};
