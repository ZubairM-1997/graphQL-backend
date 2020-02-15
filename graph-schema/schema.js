const graphql = require("graphql")
const Workout = require("../models/Workout.js")
const User = require("../models/User.js")
const Meal = require("../models/Meal")

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList} = graphql;

//describes what attributes and its types, a User has in each query
const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		email: {type: GraphQLString},
		password: {type: GraphQLString},
		workouts: {
			type: new GraphQLList(WorkoutType),
			resolve(parent, args){
				//returns all the workouts created by a user
				return Workout.findById({userId: parent.id})
			}
		},
		meals: {
			type: new GraphQLList(MealType),
			resolve(parent, args){
				//returns all the meals created by a user
				return Meal.findById({userId: parent.id})
			}
		}

	})
})



const WorkoutType = new GraphQLObjectType({
	name: "Workout",
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		reps: {type: GraphQLInt},
		burnedCalories: {type: GraphQLInt},
		sets: {type: GraphQLInt},
		user: {
			type: UserType,
			resolve(parent, args){
				//returns the user from the database that created the workout instance
				return User.findById(parent.userId)

			}
		}

	})
})




const AuthType = new GraphQLObjectType({
	name: "Authentication",
	fields: () => ({
		token: {type: GraphQLString},
		userId: {type: GraphQLString}
	})
})



const MealType = new GraphQLObjectType({
	name: "Meal",
	fields: () => ({
		id: {type: GraphQLID},
		calories: {type: GraphQLInt},
		servings: {type: GraphQLInt},
		nutrition: {
			carbohydrates: {type: GraphQLInt},
			fats: {type: GraphQLInt},
			protein: {type: GraphQLInt}
		},
		user: {
			type: UserType,
			resolve(parent, args){
				//returns the user from the database that created the meal instance
				return User.findById(parent.userId)
			}
		}

	})
})




module.exports = {
	AuthType,
	WorkoutType,
	UserType,
	MealType
}



