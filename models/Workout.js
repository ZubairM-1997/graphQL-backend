const mongoose = require("mongoose");
const Schema = mongoose.Schema

const workoutSchema = new Schema({
	name: String,
	reps: Number,
	sets: Number,
	burnedCalories: Number,
	userId: String
})

module.exports = mongoose.model("Workout", workoutSchema )