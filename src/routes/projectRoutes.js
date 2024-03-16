const express = require("express");
const { addProject } = require("../controllers/projectController");

const router = express.Router();

router.post("/addProject/:id", addProject);

module.exports = router;
