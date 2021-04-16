import { Button } from "@material-ui/core";
import React, { FC, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TodoContext } from "../state";
import { getFullDate } from "../utils/dateFunctions";

const Nav: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);
  const { todos } = state;

  const logout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({ type: "setUser", payload: { user: null } });
    dispatch({ type: "setAuth", payload: { auth: false }});
    console.log("logout")
  }

  const countComplete = () => {
    const count = todos.filter((t) => t.completed).length;
    return todos.length > 0
      ? `${count} / ${todos.length} tasks done!`
      : "Done!";
  };

  const countOldTodos = () => {
    const today = new Date(Date.now());
    const count =
      // .filter((t) => getFullDate(t.date) !== getFullDate(today))
      todos.filter((t) => !t.completed).length;

    return count > 0 ? count + " overdue todos" : "";
  };

  return (
    <div className="Nav">
      <Button variant="contained" size="small"
        onClick={(e) => logout(e)}
      >
        Log out
      </Button>

      <p> {state.user.name} </p>

      <p> {countComplete()}</p>

      <p> {countOldTodos()} </p>
    </div>
  );
};

export default Nav;
