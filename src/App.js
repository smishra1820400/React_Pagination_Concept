import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);

  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const numOfTotalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const indexOfLastTodos = currentPage * todosPerPage;
  const indexOfFirstTodos = indexOfLastTodos - todosPerPage;

  const visibleTodos = todos.slice(indexOfFirstTodos, indexOfLastTodos);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);

  return (
    <div>
      {visibleTodos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <span> Prev </span>
      <p>
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${currentPage === page}? "active:"`}
          >
            {" "}
            {`${page} |`}
          </span>
        ))}
      </p>
      <span>Next</span>
    </div>
  );
};
export default App;
