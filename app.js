const express = require("express")
const app = express();
const userSchema = require("./graph-schema/userQueries")
const workoutSchema = require("./graph-schema/workoutQueries")
const mealSchema = require("./graph-schema/mealQueries")
const mongoose = require("mongoose")

//connect to mongoDB atlase database
mongoose.connect("mongodb+srv://Zubair97:superman2008@cluster0-epauj.mongodb.net/test?retryWrites=true&w=majority")
mongoose.connection.once("open", () => {
	console.log("Connected to database")
})






//this module allows express to communicate with graphql ;
//we use it as a single endpoint
const graphqlHTTP = require("express-graphql")

app.use("/graphql" , graphqlHTTP({
	userSchema,
	workoutSchema,
	mealSchema,
	graphiql: true


}))


app.listen(4000, () => {
	console.log(`Listening on port 4000`)
})