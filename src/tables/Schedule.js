module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define(
      "Schedule",
      {
        date:DataTypes.STRING,
        status:{
            type:DataTypes.STRING,
            defaultValue:"Available"
        },
        location:DataTypes.STRING,
        time:DataTypes.STRING,
      },
      {
        createdAt: false, // disable createdAt
        updatedAt: false, // disable updatedAt
      }
    );
  
    return Schedule;
  };
  