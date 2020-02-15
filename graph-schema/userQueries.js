const graphql = require("graphql")
const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {AuthType, UserType} = require("./schema")
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList} = graphql;


const UserQuery = new GraphQLObjectType({
	name: "UserQuery",
	fields: {
		user: {
			type: UserType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				//returns the user from the database
				return User.findById(args.id)
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



const UserMutation = new GraphQLObjectType({
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
		}



	}
})


module.exports = new GraphQLSchema({
	query: UserQuery,
	mutation: UserMutation,
})