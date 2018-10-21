const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
var port = process.env.PORT || 4000;

var app = express();
app.use(function (req, res, next) {
	console.log(req.method);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
	 Login(email:String, password:String): User
	 Register(name:String, email:String, password:String): User
  } 
    type User {
	  password:String
	  email:String
  }
`);


var userlogin = function (args) {
	console.log(args);
	var user = args;
	return user;
};
var usercreate = function (args) {
	console.log(args);
	var user = args;
	return user;
};

// The root provides a resolver function for each API endpoint
var root = {
	Login: userlogin,
	Register: usercreate
};

var graphql = graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
});

app.use('/graphql', graphql);

app.listen(port);
console.log('Running a GraphQL API server at localhost:' + port + '/graphql');