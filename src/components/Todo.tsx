import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import React from "react";
import { useModal } from "../hooks/useModal";
import { ITodo } from "../TodoContext";
import { getDate, getFullDate } from "../utils/dateFunctions";
import { Modal } from "./Modal";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface ITodoFunctions extends ITodo {
  deleteTodo(id: number): void;
  completeTodo(id: number): void;
  dragHandle: DraggableProvidedDragHandleProps | undefined;
}

export const Todo: React.FC<ITodoFunctions> = ({
  id,
  completed,
  content,
  date,
  deleteTodo,
  completeTodo,
  dragHandle,
}) => {
  const { isShown, toggle } = useModal();

  return (
    <li className="todo">
      <div>
        <IconButton className="todo-draghandle" {...dragHandle}>
          <DragIndicatorIcon id="drag"/>
        </IconButton>
      </div>

      <div className="todo-content-parent">
        <p
          className="todo-content"
          onClick={() => completeTodo(id)}
          style={{
            textDecoration: completed ? "line-through" : "",
            color: completed ? "gray" : "",
          }}
        >
          {content}
        </p>
        {/* <p className="date">{getDate(date)}</p> */}
      </div>
      <div className="todo-buttons">
        <Modal
          headerText={content}
          isShown={isShown}
          hide={toggle}
          modalContent={completed ? "completed" : "not completed"}
          date={getFullDate(date)}
        />

        <div onClick={toggle}>
          <IconButton className="IconButton">
            <MoreVertIcon />
          </IconButton>
        </div>

        <div onClick={() => deleteTodo(id)}>
          <IconButton className="IconButton">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </li>
  );
};
