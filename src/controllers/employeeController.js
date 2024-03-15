const bcrypt = require("bcrypt");
const { Employee } = require("../tables");
const { Schedule } = require("../tables");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]};:'\",<.>/?\\|`~";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function generateDates() {
  const dates = [];
  let currentDate = new Date();

  for (let i = 0; i < 14; i++) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
const addEmployee = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = generateRandomString(6);
    const hashedPassword = await bcrypt.hash(password, salt);
    const emp = await Employee.create({
      fName: req.body.fname,
      lName: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
      userType: "employee",
      UserId: req.body.user,
    });
    const dates = generateDates();
    dates.forEach(async (date) => {
      await Schedule.create({
        date: date,
        EmployeeId: emp.id,
      });
    });
    res.status(201).json({
      message: "User created successfully",
      emp: {
        name: emp.fName,
        type: emp.userType,
        password: password,
      },
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const scheduleEmp = async (req, res) => {
  try {
    const emp = await Schedule.update(
      {
        status: "Scheduled",
        location: req.body.location,
        time: req.body.time,
      },
      {
        where: { EmployeeId: req.params.id.substring(1), date: req.query.date }, // only update user with id == 2
      }
    ).then((data) => {
      res.status(200).json({
        message: "Schedule updated",
      });
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEmp = async (req, res) => {
  const startDate =
    req.query.start_date || new Date().toISOString().split("T")[0];
  const endDate =
    req.query.end_date ||
    new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0];
  const dateArr = getDatesBetween(startDate, endDate);
  try {
    const emp = await Employee.findAll({
      where: {
        UserId: req.params.id.substring(1),
      },
    });

    const returnVal = await Promise.all(
      emp.map(async (e) => {
        let obj = { name: `${e.fName} ${e.lName}`, id: e.id };
        const schedule = await Schedule.findAll({
          where: {
            EmployeeId: e.id,
            date: dateArr,
          },
        });
        await Promise.all(
          schedule.map(async (s) => {
            if (s.location) {
              obj[s.date] = {
                location: s.location,
                time: s.time,
              };
            } else {
              obj[s.date] = s.status;
            }
          })
        );
        const missingData = dateArr.filter(
          (value) => !Object.keys(obj).includes(value)
        );
        missingData.forEach((date) => (obj[date] = "Unavailable"));
        return obj;
      })
    );

    res.status(201).json({
      emp: returnVal,
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addEmployee,
  getEmp,
  scheduleEmp,
};
