const express = require('express');
const Quizzes = require('../models/Quizzes');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// POST: Create a new quiz
router.post('/create', async (req, res) => {
  try {
    const { category, questions } = req.body;

    // Validate incoming data
    if (!category || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Invalid data. Category and questions are required.' });
    }

    // Create a new quiz
    const quiz = new Quizzes({ category, questions });
    await quiz.save();

    res.status(201).json(quiz); // Respond with the created quiz
  } catch (error) {
    console.error('Error creating quiz:', error); // Log error for debugging
    res.status(500).json({ error: 'Server error.', details: error.message });
  }
});

// Route to get quizzes by category
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  console.log(`Fetching quiz for category: ${category}`);
  try {
    const quiz = await Quizzes.findOne({ category });
    if (!quiz) {
      console.log(`No quiz found for category: ${category}`);
      return res.status(404).json({ error: 'Quiz not found' });
    }
    console.log('Quiz data:', quiz);
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get All Quizzes by Category
router.get('/:category/all', authenticate, async (req, res) => {
  try {
    const { category } = req.params;

    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated.' });
    }

    const user = await User.findById(req.user.id);

    // Check if the level is unlocked for the user
    if (!user.unlockedLevels.includes(category)) {
      return res.status(403).json({ error: "Level not unlocked." });
    }

    const quizzes = await Quizzes.find({ category });
    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ error: "No quizzes found for this category." });
    }

    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error); // Log error for debugging
    res.status(500).json({ error: "Server error." });
  }
});

// Submit Quiz and Unlock Next Level
router.post('/:category/submit', authenticate, async (req, res) => {
  try {
    const { category } = req.params;
    const { answers } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the quiz is already completed
    if (user.completedLevels.includes(category)) {
      return res.status(400).json({ error: "Quiz already completed." });
    }

    const quiz = await Quizzes.findOne({ category });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    // Validate if answers length matches questions length
    if (quiz.questions.length !== answers.length) {
      return res.status(400).json({ error: "Incomplete answers submitted." });
    }

    // Check answers and calculate score
    let score = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (quiz.questions[i].answer === answers[i]) {
        score++;
      }
    }

    // Set the passing score, e.g., 7 out of 10
    const passingScore = 7;

    // If the score is greater or equal to passing score, unlock the next level
    if (score >= passingScore) {
      user.completedLevels.push(category);

      const unlockNext = {
        easy: 'medium',
        medium: 'hard',
        hard: 'advance',
      }[category];

      if (unlockNext && !user.unlockedLevels.includes(unlockNext)) {
        user.unlockedLevels.push(unlockNext);
      }

      await user.save();
      res.json({ message: `Level ${unlockNext} unlocked!`, score });
    } else {
      res.json({ message: 'Quiz failed, try again.', score });
    }
  } catch (error) {
    console.error('Error submitting quiz:', error); // Log error for debugging
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
