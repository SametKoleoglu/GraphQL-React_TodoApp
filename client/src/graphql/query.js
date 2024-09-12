import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  {
    todos {
      id
      title
      description
      completed
      date
    }
  }
`;

export const GET_TODO = gql`
  query todo($id: ID!) {
    todo(id: $id) {
      id
      title
      description
      completed
      date
    }
  }
`;
