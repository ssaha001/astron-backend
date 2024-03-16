const express = require("express");
const { Project } = require("../tables");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const addProject = async (req, res) => {
  try {
    const userId = req.params.id.substring(1);
    console.log(req.body); // Log the entire req.body to see its contents
    Project.create({
      name: req.body.name,
      location: req.body.location,
      developmentPhase: req.body.phase,
      UserId: userId,
    }).then((prj) => {
      res.status(201).json({
        message: "Project Added",
        project: {
          name: prj.name,
          location: req.body.location,
          developmentPhase: req.body.phase,
        },
      });
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const userId = req.params.id.substring(1);
    console.log(req.body); // Log the entire req.body to see its contents
    Project.findAll({
      where: {
        UserId: userId,
      },
    }).then(async (prj) => {
      const projects = [];
      await prj.forEach((p) => {
        projects.push({
          name: p.name,
          location: p.location,
          phase: p.developmentPhase,
          id: p.id,
        });
      });
      res.status(201).json({
        projects: projects,
      });
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProject = async (req, res) => {
  try {
    const id = req.params.id.substring(1);
    console.log(req.body); // Log the entire req.body to see its contents
    Project.findAll({
      where: {
        id: id,
      },
    }).then(async (prj) => {
      const projects = [];
      await prj.forEach((p) => {
        projects.push({
          name: p.name,
          location: p.location,
          phase: p.developmentPhases,
          id:p.id
        });
      });
      res.status(201).json({
        projects: projects,
      });
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addProject,
  getAllProjects,
  getProject
};

// Example route
app.post("/addProject", addProject);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
