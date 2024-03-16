module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    location: DataTypes.STRING, // first Name
    name: DataTypes.STRING, // Last Name
    developmentPhase: DataTypes.STRING,
  });

  return Project;
};
