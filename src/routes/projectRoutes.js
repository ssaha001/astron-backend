const express = require("express");
const { addProject, getAllProjects, getProject } = require("../controllers/projectController");

const router = express.Router();

router.post("/addProject/:id", addProject);
router.get("/getAllProjects/:id", getAllProjects);
router.get("getProject/:id", getProject);

module.exports = router;
