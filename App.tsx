import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      let totalCount = 0;

      while (totalCount < 15) {
        // setIsLoading(true);
        const chunkTodos = await Promise.all(
          // Storing each chunk of 5 promises inside the new array being created here
          Array.from({ length: 5 }, (_, index) => {
            const id = totalCount + index + 1;
            return fetch(
              `https://jsonplaceholder.typicode.com/todos/${id}`
            ).then((response) => response.json());
          })
        );

        // Appending newly fetched todos to previously stored todos
        setTodos((prevTodos) => [...prevTodos, ...chunkTodos]);
        // setIsLoading(false);
        totalCount += 5;

        if (totalCount >= 15) {
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
    </div>
  );
}

