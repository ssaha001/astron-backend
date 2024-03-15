const { Sequelize } = require("sequelize");
const UserModel = require("./User");
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
  sequelize,
};
