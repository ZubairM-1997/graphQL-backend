const graphql = require("graphql")
const {WorkoutType} = require("./schema")
const Workout = require("../models/Workout.js")
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList} = graphql;

const WorkoutQuery = new GraphQLObjectType({
	name: "WorkoutQuery",
	fields: () => ({
		workout: {
			type: WorkoutType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				//returns the workout instance from the database
				return Workout.findById(args.id)
			}

		},

		workouts: {
			type: new GraphQLList(WorkoutType),
			resolve(parent, args){
				//returns all workouts from the databse
				return Workout.find({})
			}
		}
	})

})

const WorkoutMutation = new GraphQLObjectType({
	name: "WorkoutMutation",
	fields: () => ({
		addWorkout: {
			type: WorkoutType,
			args: {
				name: {type: GraphQLString},
				reps: {type: GraphQLInt},
				sets: {type: GraphQLInt},
				burnedCalories: {type: GraphQLInt},
				userId: {type: GraphQLID},

			},
			resolve(parent, args){
				let workout = new Workout({
					name: args.name,
					reps: args.reps,
					sets: args.sets,
					burnedCalories: args.burnedCalories,
					userId: args.userId
				})

				return workout.save();
			}
		}
	})


})

module.exports = new GraphQLSchema({
	query: WorkoutQuery,
	mutation: WorkoutMutation
})