'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'articles_media',
      'url', 'fileUrl'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'articles_media',
      'fileUrl', 'url'
    );
  }
};
