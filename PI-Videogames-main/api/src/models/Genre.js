const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

  });
};

// Definimos modelo de la tabla genres que de guardará en nuestra base de datos creada previamente con psql, con las columnas id (primary key), name que no podrán ser null y que serán unicos. Luego relacionaremos con la tabla videogames.