module.exports = (sequelize, DataTypes) => {
    const Requirement = sequelize.define(
      "Requirement",
      {
        name: DataTypes.STRING,
        quantity: {
            type: DataTypes.INTEGER, // Corrected data type
        },
        unit: DataTypes.STRING,
        isFilled: DataTypes.BOOLEAN,
        bidAmount: DataTypes.FLOAT,
        supplierId: DataTypes.INTEGER,
      }
    );
  
    return Requirement;
};
