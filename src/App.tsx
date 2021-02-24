
import React, { useState } from "react";
import "./App.css";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";

const initialValues = [
  { content: "learn about react hooks", completed: false },
  { content: "add more functionality", completed: true },
  { content: "add more functionality", completed: false },
  {
    content:
      "add more functionalityadd more functionalityadd more functionalityadd more functionalityadd more functionality",
    completed: false,
  },
  {
    content:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    completed: false,
  },
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(initialValues);

  const createTodo = (content: string) => {
    const newTodos = [...todos, { content, completed: false }];
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="apptodo">
        <div className="todolist">
          <TodoForm createTodo={createTodo} />
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              index={index}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
