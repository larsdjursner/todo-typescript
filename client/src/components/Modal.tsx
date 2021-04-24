import React, { FC, useContext } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import { SubTodoForm } from "./SubTodoForm";
import { TodoContext } from "../state";
import { getFullDate } from "../utils/dateFunctions";
import { SubTodo } from "./SubTodo";
import { IModal } from "../common/types";
import { DatePicker } from "./DatePicker";

import "../styles/Modal.css";
import { Action } from "../common/actions";


export const Modal: FC<IModal> = ({ id, isShown, hide }) => {
  const { state, dispatch } = useContext(TodoContext);
  const todo = state.todos.find((t) => t.id === id);

  const header = todo!.content;

  const date : Date = new Date(Date.parse(todo!.date));

  const subTodos = state.subTodos.filter((t) => t.parentId === id);

  const updateDate = (date : Date) => {
    dispatch({ type: Action.UPDATEDATETODO, payload: { id, date } });
  }

  const modal = (
    <>
      <div className="Backdrop" onClick={hide} />
        <div className="Wrapper">
          <div className="StyledModal">
            <div className="Header">
              <IconButton className="IconButton" onClick={hide}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="HeaderText">{header}</div>

            <div className="Content-Date Content date">
              <DatePicker date={date} id={id} updateDate={updateDate} />
              <SubTodoForm parentId={id} />
            </div>
            <div className="Content">
              <ul className="todolist">
                {subTodos.map((sub) => (
                  <SubTodo
                    key={sub.id}
                    id={sub.id}
                    parentId={sub.parentId}
                    parent={undefined} //temporary solution
                    content={sub.content}
                    completed={sub.completed}
                    date={sub.date}
                    rank={sub.rank}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
    </>
  );
  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

