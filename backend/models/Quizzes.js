const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard', 'advance'], // Adjust according to your needs
  },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      answer: { type: String, required: true }, // Correct answer
    },
  ],
});

const Quizzes = mongoose.model('Quizzes', quizSchema);
module.exports = Quizzes;
