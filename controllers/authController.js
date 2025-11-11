
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ================== REGISTER USER ==================
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      phoneNumber,
      email,
      gender,
      username,
      password,
      confirmPassword,
      website,
      registrationOption,
      reasonToRegister,
      category
    } = req.body;

    // 🔸 Validate all required fields
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !gender ||
      !username ||
      !password ||
      !confirmPassword ||
      !registrationOption ||
      !reasonToRegister ||
      !category
    ) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // 🔸 Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: 'Email already exists' });

    // 🔸 Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: 'Username already exists' });

    // 🔸 Check password match
    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    // 🔸 Create new user
    const user = await User.create({
      firstName,
      middleName,
      lastName,
      phoneNumber,
      email,
      gender,
      username,
      password,
      confirmPassword,
      website,
      registrationOption,
      reasonToRegister,
      category
    });

    res.status(201).json({
      message: 'Registration successful 🎉',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        registrationOption: user.registrationOption,
        reasonToRegister: user.reasonToRegister,
        category: user.category,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// ================== LOGIN USER ==================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔸 Validation
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    // 🔸 Check user existence
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    // 🔸 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    // 🔸 Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful 🎬',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        registrationOption: user.registrationOption,
        reasonToRegister: user.reasonToRegister,
        category: user.category,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
