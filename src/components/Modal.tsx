import React, { FC } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import "./modal.style.css";
import { ISubTodo, ITodo } from "../state";
import { TodoForm } from "./TodoForm";

export interface IModal {
  isShown: boolean;
  hide: () => void;
  modalContent: ISubTodo[];
  headerText: string;
  date: string;
}

export const Modal: FC<IModal> = ({
  isShown,
  hide,
  modalContent,
  headerText,
  date,
}) => {
  const modal = (
    <div>
      <div className="Backdrop" onClick={hide} />
      <div className="Wrapper">
        <div className="StyledModal">
          <div className="Header">
            <div className="HeaderText">{headerText}</div>
            <IconButton className="IconButton" onClick={hide}>
              <CloseIcon />
            </IconButton>
          </div>

          <TodoForm />
          <div className="Content-Date Content">{date}</div>
          <div className="Content">
            <ul className="todolist">
              {modalContent.map((sub, i) => (
                <li className="todo" key={sub.id}>
                  <p>{sub.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
