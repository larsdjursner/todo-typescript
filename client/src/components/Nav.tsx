import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { TodoContext } from "../state";
import { getFullDate } from "../utils/dateFunctions";

const Nav: React.FC = () => {
  const {state, dispatch} = useContext(TodoContext);
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
      .filter((t) => !t.completed)
      // .filter((t) => getFullDate(t.date) !== getFullDate(today))
      .length;

    return count > 0 ? count + " overdue todos" : "";
  };

  return (
    <div className="Nav">

      <Button onClick={() => dispatch({ type: "setAuth", payload: { auth: false } })}>Log out</Button>
      
      <p> User Userson </p>

      <p> {countComplete()}</p>

      <p> {countOldTodos()} </p>
    </div>
  );
};

export default Nav;
