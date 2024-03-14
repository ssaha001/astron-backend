const { User } = require("../tables");

const addUser = async (req, res) => {
  try {
    console.log("This is req", await req);
    const users = await User.create({
      fName: req.body.fname,
      lName: req.body.lname,
    });
    console.log("USer created");
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addUser,
};
