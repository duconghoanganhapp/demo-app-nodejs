'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Articles', 'mediaArticlesId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Articles_Media',
        key: 'id'
      },
      after: 'cateArticlesId'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Articles', {
      mediaArticlesId
    });
  }
};
