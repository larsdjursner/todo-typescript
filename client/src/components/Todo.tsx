import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import TocIcon from "@material-ui/icons/Toc";
import React, { useContext } from "react";
import { TodoContext } from "../state";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Checkbox } from "@material-ui/core";
import { ITodo } from "../common/types";
import EventIcon from "@material-ui/icons/Event";
import { format } from "date-fns";
import { Action } from "../common/actions";
import { TransitionModal } from "./TransitionModal";

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
  const subTodos = state.subTodos.filter(st => st.parentId === id);
  const handleComplete = () => {
    dispatch({
      type: Action.COMPLETETODO,
      payload: { id: id, completed: completed },
    });
  };
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
          onClick={handleComplete}
          style={{
            textDecoration: completed ? "line-through" : "",
            color: completed ? "gray" : "",
          }}
        >
          {content}
        </p>

        <div className="todo-content-additional">
          <div className="todo-content-additional-icon">
            <EventIcon id={ 
              format(new Date(date), "dd MM yyyy") >=
              format(Date.now(), "dd MM yyyy") || completed
              ? "DateIcon" 
              : "OverdueDateIcon"}/>
            <p className="date">
              {format(new Date(date), "dd MM yyyy") ===
              format(Date.now(), "dd MM yyyy")
                ? "Today"
                : format(new Date(date), "dd LLL")}
            </p>
          </div>
          <div className="todo-content-additional-icon">
            {subTodos.length > 0 ? (
              <>
                <TocIcon id="TocIcon" />
                <p className="date">
                  {`${subTodos.filter((t) => t.completed === true).length}/${
                    subTodos.length
                  }`}
                </p>
              </>
            ) : (
              <TocIcon id="TocIconHidden" />
            )}
          </div>
        </div>
      </div>
      <div className="todo-buttons">
        <Checkbox
          size="small"
          onClick={handleComplete}
          checked={completed}
          color="default"
        />

        <TransitionModal id={id} />

        <div
          onClick={() =>
            dispatch({ type: Action.DELETETODO, payload: { id: id } })
          }
        >
          <IconButton size="small" className="IconButton">
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </li>
  );
};
