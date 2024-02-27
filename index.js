var express = require("express")
require("dotenv").config();
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")
var { ruruHTML } = require("ruru/server")
const db=require('./db_config/db.js');
const UserModel = require('./models/UserModel.js');

// Test the connection
db.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    users: [User]
    getUserById(id: ID!): User
  }
    type User {
        id: ID
        name: String
        email: String
    }
`)

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!"
  },
    users: async () => {
        return await UserModel.findAll();
    }
    ,
    getUserById: async (args) => {
        console.log(args);
        return await UserModel.findByPk(args.id);
    }
}

var app = express()

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")