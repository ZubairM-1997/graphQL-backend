const mongoose = require("mongoose");
const Schema = mongoose.Schema

const statsSchema = Schema({
	height: {type: Number, required: true},
	weight: {type: Number, required: true},
	age: {type: Number, required: true},
	bodymassIndex: {type: Number, required: true},
	optimumCalories: {type: Number, required: true},
	bodyType: {type: String, required: true},
	gender: {type: String, required: true},
	userId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
})

module.exports = mongoose.model("Stats", statsSchema)