const mongoose = require('mongoose');

const DietPlanRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  personalInfo: {
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    height: { type: Number, required: true }, // in cm
    weight: { type: Number, required: true }, // in kg
  },
  healthGoals: {
    primaryGoal: { type: String, required: true }, // e.g., 'Weight Loss', 'Muscle Gain'
    targetWeight: { type: Number },
  },
  dietaryPreferences: {
    foodType: { type: String, required: true }, // 'Vegetarian', 'Non-Vegetarian', 'Vegan'
    allergies: [String],
    dislikedFoods: [String],
  },
  medicalHistory: {
    conditions: [String], // e.g., 'Diabetes', 'PCOD'
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('dietPlanRequest', DietPlanRequestSchema);
