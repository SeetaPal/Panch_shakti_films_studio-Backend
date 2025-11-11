
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },

    phoneNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },

    username: { type: String, required: true, unique: true, trim: true },

    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },

    website: { type: String, trim: true },

    // Main registration category (A / B / C)
    registrationOption: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C'],
    },

    // Detailed reason description
    reasonToRegister: {
      type: String,
      required: true,
      enum: [
        'Casting Agency / Production House hiring talent',
        'Model / Actor / Actress searching for work',
        'Client seeking creative or marketing services',
      ],
    },

    category: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// ✅ Hash password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    // Check confirm password match
    if (this.password !== this.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Remove confirmPassword before saving to DB
    this.confirmPassword = undefined;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
