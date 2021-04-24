import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useContext } from "react";
import { Action } from "../common/actions";
import { ISubTodo } from "../common/types";
import {  TodoContext } from "../state";

export const SubTodo: React.FC<ISubTodo> = ({
    id,
    parentId,
    parent,
    completed,
    content,
    date
  }) => {
    const { state, dispatch } = useContext(TodoContext);

  
    return (
      <li className="todo">
        <div className="todo-content-parent">
          <p
            className="todo-content"
            onClick={() =>
              dispatch({ type: Action.COMPLETESUBTODO, payload: { id: id, completed: completed} })
            }
            style={{
              textDecoration: completed ? "line-through" : "",
              color: completed ? "gray" : "",
            }}
          >
            {content}
          </p>
        </div>
        <div className="todo-buttons">  
          <div
            onClick={() => dispatch({ type: Action.DELETESUBTODO, payload: { id: id } })}
          >
            <IconButton className="IconButton" style={{ backgroundColor: 'transparent' }}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </li>
    );
  };