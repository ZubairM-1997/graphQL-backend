const mongoose = require("mongoose");
const Schema = mongoose.Schema

const nutritionSchema = new Schema({
	carbohydrates: {type: Number},
	fats: {type: Number},
	proteins:{type: Number}
})


const mealSchema = new Schema({
	name: {type: String, required: true},
	calories: {type: Number, required: true},
	servings: {type: Number, required: true},
	nutrition: {type: nutritionSchema, required: true},
	userId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
})

module.exports = mongoose.model("Meal", mealSchema)