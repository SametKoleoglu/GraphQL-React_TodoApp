import React, { useState, useContext } from "react";
import { Form, Todo } from "../components";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../graphql/query";
import { TodoContext } from "../context/TodoContext";

const Home = () => {
  // STATES
  const [selectedId, setSelectedId] = useState(0);

  // USE QUERY IN GRAPHQL
  const { loading, error, data } = useQuery(GET_TODOS);

  if (error) return "Something went wrong !!!";

  return (
    <TodoContext.Provider value={{ selectedId, setSelectedId }}>
      <Form />
      <div className="my-5 container">
        <h1 className="text-warning text-center">TODOS</h1>
        <div className="row gap-5 mt-3 justify-content-center">
          {loading
            ? "Loading..."
            : data?.todos &&
              data?.todos?.map((todo) => (
                <Todo
                  key={todo.id}
                  item={todo}
                  onClick={() => setSelectedId(todo.id)}
                />
              ))}
        </div>
      </div>
    </TodoContext.Provider>
  );
};

export default Home;
