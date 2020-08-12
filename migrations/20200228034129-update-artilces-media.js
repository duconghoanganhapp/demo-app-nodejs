'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('Articles_Media', 'fileName', 'fileNameImg'),
      queryInterface.renameColumn('Articles_Media', 'fileUrl', 'fileUrlImg'),
      queryInterface.addColumn('Articles_Media', 'fileNameTxt', {
        allowNull: true,
        type: Sequelize.STRING,
        after: 'fileUrl'
      }),
      queryInterface.addColumn('Articles_Media', 'fileUrlTxt', {
        allowNull: true,
        type: Sequelize.STRING,
        after: 'fileNameTxt'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('Articles_Media', 'fileNameImg', 'fileName'),
      queryInterface.renameColumn('Articles_Media', 'fileUrlImg', 'fileUrl'),
      queryInterface.removeColumn('Articles_Media', {
        fileNameTxt
      }),
      queryInterface.removeColumn('Articles_Media', {
        fileUrlTxt
      })
    ]);
  }
};
