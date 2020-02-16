const mongoose = require("mongoose");
const Schema = mongoose.Schema


const mealSchema = new Schema({
	name: {type: String, required: true},
	calories: {type: Number, required: true},
	servings: {type: Number, required: true},
	nutrition: {
		carbohydrates: {type: Number, required: true},
		fats: {type: Number, required: true},
		protein:{type: Number, required: true},
	},
	userId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
})

module.exports = mongoose.model("Meal", mealSchema)