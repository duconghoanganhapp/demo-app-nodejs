'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    idUser: DataTypes.NUMBER,
    idProduct: DataTypes.NUMBER,
    message: DataTypes.STRING
  }, {});
  Messages.associate = function(models) {
    // associations can be defined here
  
  };
  return Messages;
};