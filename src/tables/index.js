const { Sequelize } = require("sequelize");
const UserModel = require("./User");
const EmployeeModel = require("./Employee");
const ScheduleModel = require("./Schedule");
const ProjectModel = require("./Project");
const RequirementModel = require("./Requirement");
const BidModel = require("./Bid");
const env = require("dotenv");

env.config();

const DATABASE = process.env.PGDATABASE;
const USER = process.env.PGUSER;
const PASSWORD = process.env.PGPASSWORD;
const HOST = process.env.PGHOST;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

const User = UserModel(sequelize, Sequelize);
const Employee = EmployeeModel(sequelize, Sequelize);
const Schedule = ScheduleModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const Requirement = RequirementModel(sequelize, Sequelize);
const Bid= BidModel(sequelize, Sequelize);

Employee.hasOne(User);
Schedule.belongsTo(Employee);
User.hasMany(Employee);
User.hasMany(Project);
User.hasMany(Requirement);
Requirement.hasOne(User)
Requirement.hasMany(Bid);
Bid.hasOne(User);
Project.hasMany(User);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    // Continue with your application logic
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = {
  User,
  Employee,
  Schedule,
  Project,
  Requirement,
  Bid,
  sequelize,
};
