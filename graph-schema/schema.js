const graphql = require("graphql")
const Workout = require("../models/Workout.js")
const User = require("../models/User.js")
const Meal = require("../models/Meal")
const Goal = require("../models/Goal")
const Stats = require("../models/Stats")


const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList} = graphql;

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
				return Workout.find({userId: parent.id})
			}
		},
		meals: {
			type: new GraphQLList(MealType),
			resolve(parent, args){
				//returns all the meals created by a user
				return Meal.find({userId: parent.id})
			}
		},
		stats: {
			//returns the stats object created by a user
			type: new GraphQLList(StatsType),
			resolve(parent, args){
				return Stats.find({userId: parent.id})
			}
		},

		goals: {
			//returns the goals object created by the user
			type: new GraphQLList(GoalType),
			resolve(parent, args){
				return Goal.find({userId: parent.id})
			}
		}

	})
})


const GoalType = new GraphQLObjectType({
	name: "Goal",
	fields: () => ({
		id: {type: GraphQLID},
		goalWeight: {type: GraphQLInt},
		caloricGoal: {type: GraphQLInt},
		healthGoal: {type: GraphQLString},
		user: {
			type: UserType,
			resolve(parent, args){
				//returns the user from the database that created the workout instance
				return User.findById(parent.userId)
			}
		}
	})
})

const StatsType = new GraphQLObjectType({
	name: "Stats",
	fields: () => ({
		height: {type: GraphQLInt},
		weight: {type: GraphQLInt},
		age: {type: GraphQLInt},
		bodymassIndex: {type: GraphQLInt},
		optimumCalories: {type: GraphQLInt},
		bodyType: {type: GraphQLString},
		gender: {type: GraphQLString},
		user: {
			type: UserType,
			resolve(parent, args){
				//returns the user from the database that created the workout instance
				return User.findById(parent.userId)
			}
		}

	})
})

const NutritionType = new GraphQLObjectType({
	name: "Nutrition",
	fields: () => ({
		carbohydrates: {type: GraphQLInt},
		fats: {type: GraphQLInt},
		proteins: {type: GraphQLInt}
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
		name: {type: GraphQLString},
		calories: {type: GraphQLInt},
		servings: {type: GraphQLInt},
		nutrition: {type: NutritionType},
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
	MealType,
	NutritionType,
	GoalType,
	StatsType
}



