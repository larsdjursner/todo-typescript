import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import TocIcon from "@material-ui/icons/Toc";
import React, { useContext } from "react";
import { useModal } from "../hooks/useModal";
import { ITodo, TodoContext } from "../state";
import { getDate } from "../utils/dateFunctions";
import { Modal } from "./Modal";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Checkbox } from "@material-ui/core";

interface ITodoFunctions extends ITodo {
  dragHandle: DraggableProvidedDragHandleProps | undefined;
}

//TODO: move the draghandle out from Todo or clean up the interface
export const Todo: React.FC<ITodoFunctions> = ({
  id,
  completed,
  content,
  date,
  dragHandle,
}) => {
  const { state, dispatch } = useContext(TodoContext);
  const { isShown, toggle } = useModal();
  const children = state.subTodos.filter((t) => t.parentId === id);

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

        <div className="todo-content-additional">
            <div className="todo-content-additional-icon">
            {children.length > 0 ? (
              <>
                <TocIcon id="TocIcon" />
                <p className="date">
                  {`${children.filter((t) => t.completed === true).length}/${
                    children.length
                  }`}
                </p>
                </>
                ) : (
                  <TocIcon id="TocIconHidden" />
                )}
            </div>
        

          {/* <p className="date">{getDate(date)}</p> */}
        </div>
      </div>
      <div className="todo-buttons">
        <Modal id={id} isShown={isShown} hide={toggle} />
        <Checkbox   
          onClick={() =>
            dispatch({ type: "completeTodo", payload: { id: id } })
          }
          checked = { completed ? true : false}
          color="default"
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
