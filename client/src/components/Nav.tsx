import { Button } from "@material-ui/core";
import { FC, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TodoContext } from "../state";
import { getFullDate } from "../utils/dateFunctions";

import "../styles/Nav.css";
import ProfileMenu from "./ProfileMenu";

export const Nav: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);
  const { todos } = state;

 

  const countComplete = () => {
    const count = todos.filter((t) => t.completed).length;
    return todos.length > 0
      ? `${count} / ${todos.length} tasks done!`
      : "Done!";
  };

  const countOldTodos = () => {
    const today = new Date(Date.now());
    const count = todos
      .filter((t) => getFullDate(new Date(Date.parse(t.date))) !== getFullDate(today) && !t.completed).length;
      // .filter((t) => !t.completed).length;

    return count > 0 ? count + " overdue todos" : "";
  };

  return (
    <div className="Nav">
      <div className="Nav-Item">
        <ProfileMenu/>
      </div>

      <div className="Nav-Item">
        <p> {countComplete()}</p>

        <p> {countOldTodos()} </p>
      </div>
    </div>
  );
};

export default Nav;
