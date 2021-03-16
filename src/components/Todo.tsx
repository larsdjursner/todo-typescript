import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import React, { useContext } from "react";
import { useModal } from "../hooks/useModal";
import { ITodo, TodoContext } from "../state";
import { getDate } from "../utils/dateFunctions";
import { Modal } from "./Modal";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface ITodoFunctions extends ITodo {
  dragHandle: DraggableProvidedDragHandleProps | undefined;
}

//TODO: move the draghandle out from Todo or clean up the interface
export const Todo: React.FC<ITodoFunctions> = ({
  id,
  completed,
  content,
  date,
  dragHandle
}) => {
  const { state, dispatch } = useContext(TodoContext);
  const { isShown, toggle } = useModal();
  const children = state.subTodos.filter(t => t.parentId === id);

  return (
    <li className="todo">
      <div>
        <IconButton className="todo-draghandle" {...dragHandle}>
          <DragIndicatorIcon id="drag" />
        </IconButton>
      </div>

      <div className="todo-content-parent">
        <p
          className="todo-content"
          onClick={() =>
            dispatch({ type: "completeTodo", payload: { id: id } })
          }
          style={{
            textDecoration: completed ? "line-through" : "",
            color: completed ? "gray" : "",
          }}
        >
          {content}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
          }}
        >
          <p className="date">{getDate(date)}</p>
          <p className="date">{children.length + " subtodos"}</p>
        </div>
      </div>
      <div className="todo-buttons">
        <Modal
          id={id}
          isShown={isShown}
          hide={toggle}
        />

        <div onClick={toggle}>
          <IconButton className="IconButton">
            <MoreVertIcon />
          </IconButton>
        </div>

        <div
          onClick={() => dispatch({ type: "deleteTodo", payload: { id: id } })}
        >
          <IconButton className="IconButton">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </li>
  );
};
