// const image = require('./logophoto.jpg');

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

    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },

    rating: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 1,
        max: 5,
      },
      defaultValue: 1
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

    background_image: {
      type: DataTypes.STRING,
      defaultValue: './logophoto.jpg'
    },

    createdOnDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
    
  });
};

// Definimos modelo de la tabla videogames que se guardará en nuestra base de datos creada previamente con psql, con las columnas id (primary key), name, descripition y platforms que no podrán ser null. Creamos la columna createdOnDb para luego diferenciar los videogames creados por los usuarios de los traídos de la API. Luego relacionaremos con la tabla genres.