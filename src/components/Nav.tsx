import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import { getFullDate } from "../utils/dateFunctions";
import { Icon } from "@material-ui/core";

const Nav: React.FC = () => {
  const [todos, setTodos] = useContext(TodoContext);

  const countComplete = () => {
    const count = todos.filter((t) => t.completed).length;
    return `${count} / ${todos.length} tasks done!`;
  };

  const countOldTodos = () => {
    const today = new Date(Date.now());
    const count = todos
      .filter((t) => !t.completed)
      .filter((t) => getFullDate(t.date) !== getFullDate(today)).length;

    return count > 0
      ? count + " old unfinished todos"
      : "All old todos are done!";
  };

  return (
    <div className="Nav">
      <p> User Userson </p>

      <p> {countComplete()}</p>

      <p> {countOldTodos()} </p>
    </div>
  );
};

export default Nav;
