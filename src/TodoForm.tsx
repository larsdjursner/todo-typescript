import React, { useState } from "react";

interface ITodoForm {
    createTodo(id: number, value: string): void;
  }

export const TodoForm: React.FC<ITodoForm> = ({ createTodo }) => {
    const [value, setValue] = useState("");
    const [currentId, setCurrentId] = useState(10); //hacky id assign until an api can be called
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!value ) return;
      createTodo(currentId, value);

      const newId = currentId + 1; 
      setCurrentId(newId)
      setValue("");
    };
  
    return (
      <div className="todoform">
        <h2>Todo</h2>
  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Enter a todo!"}
          />
        </form>
      </div>
    );
  };