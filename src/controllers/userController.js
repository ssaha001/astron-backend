const { User, Employee } = require("../tables");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtOptions } = require("../auth");

const addUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      fName: req.body.fname,
      lName: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.type,
    });
    let payload = {
      _id: user.id,
      userName: user.userName,
      fullName: user.fullName,
      type: user.userType,
    };
    let token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.status(201).json({
      message: "User created successfully",
      user: {
        name: user.fName,
        type: user.userType,
        id: user.id,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    let user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });
    //1y,wD#
    if(user.length===0){
      user=await Employee.findAll({
        where: {
          email: req.body.email,
        },
      })
    }
    console.log("Lets login")
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (result) {
        let payload = {
          id: user[0].id,
          lName: user[0].lName,
          fName: user[0].fName,
          type: user[0].userType,
        };

        let token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(200).json({
          message: "Login Successful",
          user: {
            name: user[0].fName,
            type: user[0].userType,
            id: user[0].id,
            token: token,
          },
        });
      } else {
        // Passwords do not match
        res.status(401).json({
          message: "Unauthorized",
        });
      }
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addUser,
  loginUser,
};
