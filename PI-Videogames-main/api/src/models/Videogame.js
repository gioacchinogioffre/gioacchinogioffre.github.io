const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    relesead: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },

    rating: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0,
        max: 5,
      },
      defaultValue: 0
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

    background_image: {
      type: DataTypes.STRING,
      defaultValue: 'https://via.placeholder.com/300x200',
    },

    createdOnDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
    
  });
};
