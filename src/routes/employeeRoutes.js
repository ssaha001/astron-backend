const express = require("express");
const { addEmployee, getEmp, scheduleEmp } = require("../controllers/employeeController");

const router = express.Router();

router.post("/signup", addEmployee);

router.get("/getEmp/:id", getEmp);

router.patch("/schedule/:id", scheduleEmp);

module.exports = router;
