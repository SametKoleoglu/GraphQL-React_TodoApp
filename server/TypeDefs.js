import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date
  type Todo {
    id: ID
    title: String
    description: String
    completed: Boolean
    date: Date
  }
  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
  }

  type Mutation {
    addTodo(
      title: String
      description: String
      completed: Boolean
      date: Date
    ): Todo,
    deleteTodo(id: ID!): String,
    updateTodo(id: ID!, title: String, description: String, completed: Boolean, date: Date): Todo
  }
`;

export default typeDefs;
