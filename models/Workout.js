const mongoose = require("mongoose");
const Schema = mongoose.Schema

const workoutSchema = new Schema({
	name: {type: String, required: true},
	reps: {type: Number, required: true},
	sets: {type: Number, required: true},
	burnedCalories: {type: Number, required: true},
	userId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
})

module.exports = mongoose.model("Workout", workoutSchema )