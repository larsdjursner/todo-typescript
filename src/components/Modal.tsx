import { FC } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import "./modal.style.css";
import { ISubTodo } from "../state";
import { SubTodoForm } from "./SubTodoForm";

export interface IModal {
  id: number;
  isShown: boolean;
  hide: () => void;
  modalContent: ISubTodo[];
  headerText: string;
  date: string;
}

export const Modal: FC<IModal> = ({
  id,
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
            <div className="Content-Date Content date">{date}</div>

            <IconButton className="IconButton" onClick={hide}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="HeaderText">{headerText}</div>
          <div className="Content">
            <SubTodoForm parentId={id} />
            <ul className="todolist">
              {modalContent.map((sub) => (
                <li className="todo" key={sub.id + 400}>
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
