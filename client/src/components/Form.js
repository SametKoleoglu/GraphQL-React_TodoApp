import React, { useState, useRef, useEffect, useContext } from "react";
import { fields } from "../utils/constants";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, UPDATE_TODO } from "../graphql/mutation";
import { GET_TODO, GET_TODOS } from "../graphql/query";
import moment from "moment";
import { TodoContext } from "../context/TodoContext";

export default function Form() {
  // USE REF
  const inputAreaRef = useRef();

  // STATES
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
    date: "",
  });

  // DEFINE MUTATION
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  // DEFINE CONTEXT
  const { selectedId, setSelectedId } = useContext(TodoContext);

  // FUNCTIONS
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (selectedId === 0) {
        addTodo({
          variables: {
            title: todo.title,
            description: todo.description,
            completed: todo.completed || false,
            date: todo.date,
          },
          refetchQueries: [{ query: GET_TODOS }],
        });
      } else {
        updateTodo({
          variables: {
            id: selectedId,
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            date: todo.date,
          },
          refetchQueries: [{ query: GET_TODOS }],
        });
      }
    } catch (error) {
      console.log(error.message);
      throw error.message;
    } finally {
      setSelectedId(0);
      setTodo({
        title: "",
        description: "",
        completed: false,
        date: "",
      });
    }
  };

  useEffect(() => {
    const formIsClick = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("Form is not clicked");
        setSelectedId(0);
        setTodo({
          title: "",
          description: "",
          completed: false,
          date: "",
        });
      } else {
        console.log("Form is clicked");
      }
    };

    document.addEventListener("mousedown", formIsClick);

    return () => {
      document.removeEventListener("mousedown", formIsClick);
    };
  }, []);

  // USE QUERY
  const { loading, error, data } = useQuery(GET_TODO, {
    variables: {
      id: selectedId,
    },
    onCompleted: (data) => setTodo(data.todo),
  });

  return (
    <form className="form container" onSubmit={handleSubmit} ref={inputAreaRef}>
      <div className="d-flex align-items-center justify-content-center fw-bold">
        {selectedId === 0 ? "Add Todo" : "Update Todo"}
      </div>
      {fields.map((field) => (
        <div className="mt-3" key={field.id}>
          <label className="form-label text-info">{field.name}</label>
          {field.name === "description" ? (
            <textarea
              value={todo[field.name]}
              onChange={(e) =>
                setTodo({ ...todo, [field.name]: e.target.value })
              }
              className="form-control"
              placeholder={field.placeholder}
            ></textarea>
          ) : field.name === "completed" ? (
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={(e) =>
                setTodo({ ...todo, completed: e.target.checked })
              }
            />
          ) : (
            <input
              className="form-control"
              type={field.type}
              placeholder={field.placeholder}
              value={
                field.name === "date"
                  ? moment(todo.date).format("YYYY-MM-DD")
                  : todo[field.name]
              }
              onChange={(e) =>
                setTodo({ ...todo, [field.name]: e.target.value })
              }
            />
          )}
        </div>
      ))}
      <div className="mt-5 d-flex justify-content-center">
        <button type="submit" className="btn btn-lg btn-success px-5">
          {selectedId === 0 ? "ADD" : "Update"}
        </button>
      </div>
    </form>
  );
}
