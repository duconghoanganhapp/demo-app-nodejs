'use strict';
module.exports = (sequelize, DataTypes) => {
  const changeUsers = sequelize.define('changeUsers', {
    a: DataTypes.STRING
  }, {});
  changeUsers.associate = function(models) {
    // associations can be defined here
  };
  return changeUsers;
};