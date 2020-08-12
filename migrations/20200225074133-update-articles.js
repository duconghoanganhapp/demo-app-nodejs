'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'articles',
      'cateArticleId', 'cateArticlesId'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'articles',
      'cateArticlesId', 'cateArticleId'
    );
  }
};
