const graphql = require("graphql")
const Workout = require("../models/Workout.js")
const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
				//returns all the workouts what are associated by a particular user
				return Workout.findById({authorId: parent.id})
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
		sets: {type: GraphQLInt},
		user: {
			type: UserType,
			resolve(parent, args){
				//finding a user which is associated with a single workout instance in the database
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





const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: {
			type: UserType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				//code to get data from database
				return User.findById(args.id)
			}
		},

		workout: {
			type: WorkoutType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				//code to get data from database
				return Workout.findById(args.id)
			}

		},

		workouts: {
			type: new GraphQLList(WorkoutType),
			resolve(parent, args){
				return Workout.find({})
			}
		},

		login: {
			type: AuthType,
			args: {email: {type: GraphQLString}, password: {type: GraphQLString}},
			resolve(parent, {email, password}){
				return User.findOne({email: email}).then((user) => {
					const isEqual = bcrypt.compare(password, user.password)
					if (!isEqual) {
						throw new Error('Password is incorrect!');
					}

					const token = jwt.sign({
						userId: user.id,
						email: user.email},
						"a_super_secret",
						{expiresIn: "1h"}
					)

					return {token: token, userId: user.id}


				})

			}
		}


	}


})






const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: {type: GraphQLString},
				email: {type: GraphQLString},
				password: {type: GraphQLString}
			},
			async resolve(parent, args){
				const existingUser =  await User.findOne({email: args.email})
				if (!existingUser){
					const error = new Error("User already exists");
				}

				const encryptedPassword =  await bcrypt.hash(args.password, 12)

				let user = new User({
					name: args.name,
					email: args.email,
					password: encryptedPassword
				})

				const createdUser =  user.save();
				return createdUser
			}
		},

		addWorkout: {
			type: WorkoutType,
			args: {
				name: {type: GraphQLString},
				reps: {type: GraphQLInt},
				sets: {type: GraphQLInt},
				userId: {type: GraphQLID}
			},
			resolve(parent, args){
				let workout = new Workout({
					name: args.name,
					reps: args.reps,
					sets: args.sets,
					userId: args.userId
				})

				return workout.save();
			}
		}

	}
})


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})