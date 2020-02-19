const graphql = require("graphql")
const {MealType, NutritionType} = require("./schema")
const Meal = require("../models/Meal.js")
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLInputObjectType} = graphql;

const NutritionInput = new GraphQLInputObjectType({
	name: "MealNutritionInput",
	fields: () => ({
		carbohydrates: {type: GraphQLInt},
		fats: {type: GraphQLInt},
		proteins: {type: GraphQLInt}
	})
})




const MealQuery = new GraphQLObjectType({
	name: "MealQueries",
	fields: () => ({
		meal: {
			type: MealType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				return Meal.findById(args.id)
			}
		},

		meals: {
			type: new GraphQLList(MealType),
			resolve(parent, args){
				return Meal.find({})
			}
		}

	})

})

const MealMutation = new GraphQLObjectType({
	name: "MealMutation",
	fields: () => ({
		addMeal: {
			type: MealType,
			args: {
				name: {type: GraphQLString},
				servings: {type: GraphQLInt},
				calories: {type: GraphQLInt},
				nutrition: {type: NutritionInput},
				userId: {type: GraphQLID}
			},
			resolve(parent, args){

				let nutritionObj = {
					carbohydrates: args.nutrition.carbohydrates,
					fats: args.nutrition.fats,
					proteins: args.nutrition.proteins
				}

				let meal = new Meal({
					userId: args.userId,
					name: args.name,
					servings: args.servings,
					calories: args.calories,
					nutrition: nutritionObj
				})

				return meal.save();
			}
		}
	})


})

module.exports = new GraphQLSchema({
	query: MealQuery,
	mutation: MealMutation
})