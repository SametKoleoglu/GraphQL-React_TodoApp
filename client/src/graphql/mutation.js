import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation addTodo(
    $title: String!
    $description: String
    $completed: Boolean
    $date: Date
  ) {
    addTodo(
      title: $title
      description: $description
      completed: $completed
      date: $date
    ) {
      id
      title
      description
      completed
      date
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo(
    $id: ID!
    $title: String
    $description: String
    $completed: Boolean
    $date: Date
  ) {
    updateTodo(
      id: $id
      title: $title
      description: $description
      completed: $completed
      date: $date
    ) {
      id
      title
      description
      completed
      date
    }
  }
`;
