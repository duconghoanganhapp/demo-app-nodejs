'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Articles_Media', 'articles_media_ibfk_1');
    await queryInterface.removeIndex('Articles_Media', 'articlesId');
    return Promise.all([
      queryInterface.addConstraint('Articles_Media', ['articlesId'], {
        type: 'foreign key',
        references: { 
          table: 'articles',
          field: 'id'
        },
      }),
      queryInterface.changeColumn('Articles_Media', 'articlesId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true
      })
    ]);
      
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Articles_Media', 'articlesId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      unique: false
    });
  }
};
