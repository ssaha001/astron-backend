module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define("Property", {
    location: DataTypes.STRING, // first Name
    name: DataTypes.STRING, // Last Name
    developmentPhase: DataTypes.STRING,
  });

  return Property;
};
