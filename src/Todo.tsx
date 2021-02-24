import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import BathtubIcon from "@material-ui/icons/Bathtub";

import React from "react";

interface ITodo {
    todo: any;
    index: number;
    deleteTodo(index: number): void;
    completeTodo(index: number): void;
  }
  
export const Todo: React.FC<ITodo> = ({ todo, index, deleteTodo, completeTodo }) => {
    return (
      <li className="todo">
        <p
          className="todo-content"
          onClick={() => completeTodo(index)}
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
  
          <div onClick={() => deleteTodo(index)}>
            <IconButton aria-label="delete" disabled color="primary">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </li>
    );
  };