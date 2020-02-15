const mongoose = require("mongoose");
const Schema = mongoose.Schema


const mealSchema = new Schema({
	name: String,
	calories: Number,
	servings: Number,
	nutrition: {
		carbohydrates: Number,
		fats: Number,
		protein: Number
	},
	userId: String
})

module.exports = mongoose.model("Meal", mealSchema)