const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {User, Role, UserRole } = require("../../models/index");
const {fetchRoleAndPermission} = require("../../../helpers/fetchRoleAndPermission");
const {verifyToken} = require("../../../middleware/authenticate");


const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
    const data = await fetchRoleAndPermission(req);
    res.status(200).json({status: "Authenticated", ...data})
});


router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({
      username,
      password,
    });

    const {_id: userId } = await user.save();
   
    let role = await Role.findOne({ role: "employee" });

    if (!role) {
      
      role = await new Role({ role: "employee" }).save();
    }

    const { _id: roleId } = role;

    await new UserRole({
        userId,
        roleId,
    }).save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Login and generate a JWT
router.post("/login", async (req, res) => {

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: "Authentication failed" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ error: "Authentication failed" });
    }

    req.user = {
        _id: user._id,
    };

    const token = jwt.sign(
        { userId: user._id, userName: user.username }, 
        "secret", 
        { expiresIn: "2h",}
    );

    const data = await fetchRoleAndPermission(req);

    res.status(200).json({ token, ...data });
    
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
