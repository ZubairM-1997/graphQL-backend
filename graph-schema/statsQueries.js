const graphql = require("graphql")
const {StatsType} = require("./schema")
const Stats = require("../models/Stats.js")
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList} = graphql;

const StatsQuery = new GraphQLObjectType({
	name: "StatsQuery",
	fields: () => ({
		stats: {
			type: StatsType,
			args: {id: {type: GraphQLID}},
			resolve(parents, args){
				return Stats.find(args.id)
			}
		}
	})
})

const StatsMutation = new GraphQLObjectType({
	name: "StatsMutation",
	fields: () => ({
		addStats: {
			type: StatsType,
			args: {
				height: {type: GraphQLInt},
				weight: {type: GraphQLInt},
				age: {type: GraphQLInt},
				userId: {type: GraphQLID},
				gender: {type: GraphQLString}
			},
			resolve(parent, args){

					let height = args.height / 100
					let bmi = Math.floor(args.weight / (height * height))
					console.log(bmi)
					let gender = args.gender
					let optimumCaloricIntake;
					let bodyTypeClassification;

					switch(gender){
						case "Female":
							optimumCaloricIntake = Math.floor(655.1 + 9.6 * args.weight + 1.9 * args.height / (4.7 * args.age))

						break;

						case "Male":
							optimumCaloricIntake = Math.floor(66.5 + 13.8 * args.weight + 5 * args.height / (6.8 * args.age))
						break;
					}

					if (bmi <= 18.5){
						bodyTypeClassification = "Underweight"
					} else if (bmi > 18.5 && bmi <= 24.9){
						bodyTypeClassification = "Healthy Weight"
					}else if (bmi >= 25 && bmi <= 29.9){
						bodyTypeClassification = "Overweight"
					}else {
						bodyTypeClassification = "Obese"
					}


					let stats = new Stats({
						height: args.height,
						weight: args.weight,
						age: args.age,
						bodymassIndex: bmi,
						optimumCalories: optimumCaloricIntake,
						bodyType: bodyTypeClassification,
						gender: args.gender,
						userId: args.userId
					})

					return stats.save()
			}

		}
	})
})

module.exports = new GraphQLSchema({
	query: StatsQuery,
	mutation: StatsMutation
})