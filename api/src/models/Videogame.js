const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    rating:{
      type:DataTypes.FLOAT,
      
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    screenshop:{
      type:DataTypes.STRING,
      defaultValue: "",
    }
  } , {
      timestamps: false,
  });
};
