import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

const maxTodos = 15;

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      let totalCallsCount = 0;

      while (totalCallsCount < 15) {
        const chunkOfTodos = await Promise.all(
          // Storing each chunk of 5 promises inside the new array being created here
          Array.from({ length: 5 }, (_, index) => {
            const id = totalCallsCount + index + 1;
            return fetch(
              `https://jsonplaceholder.typicode.com/todos/${id}`
            ).then((response) => response.json());
          })
        );

        // Appending newly fetched todos to previously stored todos
        setTodos((prevTodos) => [...prevTodos, ...chunkOfTodos]);
        totalCallsCount += 5;

        if (totalCallsCount >= maxTodos) {
          alert('done');
          break;
        }

        // Setting timeout of 3 secs for each chunk of api calls
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            <a href="#">{todo.id} - {todo.title}</a>
          </li>
        ))}
      </ol>
      {/* Displaying alert message when all API calls are completed */}
      {todos.length === 15 && (
        <div className="alert">All <span>{todos.length}</span> API calls are completed!</div>
      )}
    </div>
  );
}

