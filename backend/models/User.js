const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true},
  email: { type: String, required: true},
  username: { type: String, required: true},
  password: { type: String, required: true },
  unlockedLevels: { type: [String], default: ['easy'] },
  completedLevels: { type: [String], default: [] }
});

// Method to generate JWT
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
