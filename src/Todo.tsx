import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import BathtubIcon from "@material-ui/icons/Bathtub";

import React from "react";

interface ITodo {
    id: number;
    todo: any;
    deleteTodo(id: number): void;
    completeTodo(id: number): void;
  }
  
export const Todo: React.FC<ITodo> = ({ id, todo, deleteTodo, completeTodo }) => {
    return (
      <li className="todo">
        <p
          className="todo-content"
          onClick={() => completeTodo(id)}
          style={{
            textDecoration: todo.completed ? "line-through" : "",
            color: todo.completed ? "gray" : "",
          }}
        >
          {todo.content}
        </p>
        <div className="todo-buttons">
          <div onClick={() => console.log("test")}>
            <IconButton aria-label="delete" disabled color="primary">
              <BathtubIcon />
            </IconButton>
          </div>
  
          <div onClick={() => deleteTodo(id)}>
            <IconButton aria-label="delete" disabled color="primary">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </li>
    );
  };