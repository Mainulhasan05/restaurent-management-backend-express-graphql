import express from "express";
import dotenv from "dotenv";

dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


// const db=require('./db_config/db.js');
// const UserModel = require('./models/UserModel.js');
// import the above two lines from db_config/db.js and models/UserModel.js
import db from "./db_config/db.js";
import UserModel from "./models/UserModel.js";

// Test the connection
db.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const typeDefs = `#graphql
  type Book {
    name: String
    author: String
  }
  type Query {
    hello: String
    books: [Book]
    vungChung(author:String): [Book]
  }
`;

const books = [
  {
    name: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    name: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    hello: () => "world",
    books: () => books,
    vungChung: async (parent, args, context, info) => {
      
      const { author } = args;
      const result = books.filter((book) => book.author === author);
      return result;
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);