import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import TocIcon from "@material-ui/icons/Toc";
import React, { useContext } from "react";
import { useModal } from "../hooks/useModal";
import { TodoContext } from "../state";
import { getDate } from "../utils/dateFunctions";
import { Modal } from "./Modal";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Checkbox } from "@material-ui/core";
import { ITodo } from "../common/types";

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
  subtodos
}) => {

  const { state, dispatch } = useContext(TodoContext);
  const { isShown, toggle } = useModal();

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
            dispatch({ type: "completeTodo", payload: { id: id, completed: completed} })
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
            {subtodos.length > 0 ? (
              <>
                <TocIcon id="TocIcon" />
                <p className="date">
                  {`${subtodos.filter((t) => t.completed === true).length}/${
                    subtodos.length
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
          size="small"   
          onClick={() =>
            dispatch({ type: "completeTodo", payload: { id: id, completed: completed} })
          }
          checked = { completed ? true : false}
          color="default"
        />

        <div onClick={toggle}>
          <IconButton size="small" className="IconButton" >
            <MoreVertIcon />
          </IconButton>
        </div>

        <div
          onClick={() => dispatch({ type: "deleteTodo", payload: { id: id } })}
        >
          <IconButton size="small" className="IconButton">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </li>
  );
};
