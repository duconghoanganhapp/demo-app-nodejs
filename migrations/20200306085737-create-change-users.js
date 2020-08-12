'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.addColumn('users', 'id_google', {
        allowNull: true,
        type: Sequelize.STRING,
        after: 'id'
    }),
    queryInterface.addColumn('users', 'id_facebook', {
      allowNull: true,
      type: Sequelize.STRING,
      after: 'id'
  }),
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', {
        id_facebook,
        id_google
      })
    ]);
  }
};