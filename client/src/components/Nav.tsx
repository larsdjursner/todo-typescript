import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getName } from "../services/todos";
import { IUser, TodoContext } from "../state";
import { getFullDate } from "../utils/dateFunctions";

const Nav: React.FC = () => {
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
    const count =
      // .filter((t) => getFullDate(t.date) !== getFullDate(today))
      todos.filter((t) => !t.completed).length;

    return count > 0 ? count + " overdue todos" : "";
  };

  const [user, setUser] = useState({} as IUser);

  const GetUserProfile = async () => {
    useEffect(() => {
      getName().then((res) => {setUser(res)});
    }, []);
  };

  GetUserProfile();
  console.log(user);

  return (
    <div className="Nav">
      {/* <Button onClick={() => dispatch({ type: "setAuth", payload: { auth: false } })}>Log out</Button> */}

      <p> {user!.name} </p>

      <p> {countComplete()}</p>

      <p> {countOldTodos()} </p>
    </div>
  );
};

export default Nav;
