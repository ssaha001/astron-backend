const express = require("express");
const { addUser, loginUser, postRequirement, getAllRequirement } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", addUser);
router.post("/login", loginUser);
router.post("/addRequirement", postRequirement)
router.get("/getRequirements/:id", getAllRequirement);

module.exports = router;
