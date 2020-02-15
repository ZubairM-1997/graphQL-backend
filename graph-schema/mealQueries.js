const graphql = require("graphql")
const {MealType} = require("./schema")
const Meal = require("../models/Meal.js")
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList} = graphql;

const MealQuery = new GraphQLObjectType({
	name: "MealQueries",
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

const MealMutation = new GraphQLObjectType({
	name: "MealMutation",
	addMeal: {
		type: MealType,
		args: {
			name: {type: GraphQLString},
			servings: {type: GraphQLInt},
			calories: {type: GraphQLInt},
			nutrition: {
				carbohydrates: {type: GraphQLInt},
				proteins: {type: GraphQLInt},
				fats: {type: GraphQLInt}
			},
			userId: {type: GraphQLID}
		},
		resolve(parent, args){

			let meal = new Meal({
				userId: args.userId,
				name: args.name,
				servings: args.servings,
				calories: args.calories,
				nutrition: {
					carbohydrates: args.nutrition.carbohydrates,
					fats: args.nutrition.fats,
					proteins: args.nutrition.proteins
				}
			})

			return meal.save();
		}
	}

})

module.exports = new GraphQLSchema({
	query: MealQuery,
	mutation: MealMutation
})