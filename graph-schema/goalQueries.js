const graphql = require("graphql")
const {GoalType} = require("./schema")
const Goal = require("../models/Goal.js")
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLInputObjectType} = graphql


const GoalQueries = new GraphQLObjectType({
	name: "Goal Queries",
	fields: () => ({
		goal: {
			type: GoalType,
			args: {id:  {type: GraphQLID}},
			resolve(parent, args){
				return Goal.findById(args.id)
			}

		}
	})
})

const GoalMutations = new GraphQLObjectType({
	name: "Goal Mutations",
	fields: () => ({
		addGoal: {
			type: GoalType,
			args: {
				goalWeight: {type: GraphQLInt},
				caloricGoal: {type: GraphQLInt},
				healthGoal: {type: GraphQLString},
				userId: {type: GraphQLID}
			},
			resolve(parent, args){
				let userGoal = new Goal({
					goalWeight: args.goalWeight,
					caloricGoal: args.caloricGoal,
					healthGoal: args.healthGoal,
					userId: args.userId
				})

				return userGoal.save();
			}
		},

		deleteGoal: {
			type: GoalType,
			args: {userId: GraphQLID},
			resolve(parent, args){
				Goal.findOneAndDelete({userId: args.userId})
			}
		}
	})
})

module.exports = new GraphQLSchema({
	query: GoalQueries,
	mutation: GoalMutations
})