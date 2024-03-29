module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define(
      "Employee",
      {
        fName: DataTypes.STRING, // first Name
        lName: DataTypes.STRING, // Last Name
        email: { unique: true, type: DataTypes.STRING },
        password: DataTypes.TEXT,
        userType: DataTypes.STRING,
      },
      {
        createdAt: false, // disable createdAt
        updatedAt: false, // disable updatedAt
      }
    );
  
    return Employee;
  };
  