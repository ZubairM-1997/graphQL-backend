# graphQL-backend
For this mini-project, I decided to challenge myself and started learning the basics of GraphQL, an alternative to REST API's for applications to send or recieve requests. This application is made with Express.js, GraphQL, and MongoDB. Still on the verge of completing it, hopefully when I fully understand this, it will become a fully-fledged web app.

There are two models, User and Workout. The architecture is a simple MVC model (kind of, it doesn't have the views yet). The relationship between those models is a HAS MANY relationship. A User has many workouts.
Currently, I have added functionality via GraphQL that allows a User to created, A workout to be created and authentication while a user logs in.

### Why learn GraphQL?
GraphQL is one of the latest technologies to date. It was released in 2015. It's an alternative to REST API's as it allows the client to specify what type of data it needs, which allows you to aggregate data from multiple source. If that confused you then don't worry.

If you know a traditional REST API, you know there are multiple endpoints you can have and each of these endpoints can do a variety of things, (GET, POST, etc). But the issue becomes complex when increasing the number of endpoints. Think of this problem, lets say we have an endpoint

		GET /post
		This gets all the posts from a REST API, which is an array of objects like below

		[...
			{
				title: "Happy Holidays",
				summary: "merry christmas from my family"
				creator: "Zubair"
			}
		]

What if we only want the title and id from the list of posts?
Solution 1: Create a new REST API Endpoint
Problem: We need to make our code more efficient for performance too, too many endpoints hinder that.

Solution 2: Use Query Parameters
Problem: Our code can be hard to understand, we need our code to be readable by other developers in the team.

Solution 3: Use GraphQL
We have one "supercharged" endpoint where we send requests to and its handled by GraphQL. On the client-side, we send queries to that endpoint which tells the server what data it wants to be returned from the back-end

It is good to note that from the front-end, we can only do post requests to the GraphQL API, within that post request, we have queries which GraphQL accepts and returns the data that represents the query request.

### Anatomy of a "Query" Request

	{query {
			user{
				name,
				age
			}
		}
	}

Above is what the query would look like from the client-side
The "query" key word is an Operation Type, which basically you can think of a "GET" request in the world of GraphQL API. That request hits the user endpoint and asks it to return the attributes of name and age which are defined in the server and database. If you have a decent understanding now, maybe you can realise the awesome felxibility of GraphQL. We have complete freedom of attributes we want to be return from the server.

Another Operation Type is "mutation" which correspond to POST, DELETE, PATCH or PUT. Basically if the client wants to alter something within the database, its handled by the Mutation operation
