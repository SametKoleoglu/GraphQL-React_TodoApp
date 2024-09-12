import React from "react";
import moment from "moment";
// import 'moment/locale/tr'

import { useMutation, useQuery } from "@apollo/client";
import { DELETE_TODO } from "../graphql/mutation";
import { GET_TODOS } from "../graphql/query";

export default function Todo({ item,onClick }) {
  // const isoDate = item.date; // ISO formatındaki tarih verisi
  // const date = new Date(isoDate); // Date nesnesine çevir

  // // Gerekli parçaları al
  // const day = date.getUTCDate();
  // const month = date.getUTCMonth() + 1; // Aylar 0-11 arasında olduğu için 1 ekliyoruz
  // const year = date.getUTCFullYear();
  // const hours = date.getUTCHours();
  // const minutes = date.getUTCMinutes();

  // // Formatlı olarak yazdır
  // const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

  const [deleteTodo] = useMutation(DELETE_TODO);
  function handleDelete(todoId) {
    try {
      deleteTodo({
        variables: {
          id: todoId,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });
      alert("Todo deleted successfully !!!");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="card w-25" style={{ cursor: "pointer" }} onClick={onClick}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{item.title}</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-warning btn-sm">
              <i className="fa-solid fa-pencil text-white"></i>
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(item.id)}
            >
              <i className="fa-solid fa-trash text-white"></i>
            </button>
          </div>
        </div>
        <p className="card-text">{item.description}</p>
        <h5>Status : {item.completed ? "Completed" : "Not Completed"}</h5>
        <h6>Date : {moment(item.date).format("DD-MM-YYYY HH:mm")}</h6>
      </div>
    </div>
  );
}
