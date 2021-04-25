import { Button, makeStyles } from "@material-ui/core";
import { FC, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TodoContext } from "../state";
import { getFullDate } from "../utils/dateFunctions";
import ProfileMenu from "./ProfileMenu";

const useStyles = makeStyles({
  Nav: {
    backgroundColor : "hsl(224, 37%, 20%)",
    color: "white",
    height: "3.5em",
    display: "flex",
    justifyContent: "space-between"
  },
  NavItem: {
    display: "flex",
    margin: "0",
    width: "20em",
    justifyContent: "space-around"
  }
});



export const Nav: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);
  const { todos } = state;
  const classes = useStyles();

 

  const countComplete = () => {
    const count = todos.filter((t) => t.completed).length;
    return todos.length > 0
      ? `${count} / ${todos.length} tasks done!`
      : "Done!";
  };

  const countOldTodos = () => {
    const today = new Date(Date.now());
    today.setHours(0);
    const count = todos
      .filter((t) => new Date(Date.parse(t.date)) < today && !t.completed).length;

    return count > 0 ? count + " overdue todos" : "";
  };

  return (
    <div className={classes.Nav}>
      <div className={classes.NavItem}>
        <ProfileMenu/>
      </div>

      <div className={classes.NavItem}>
        <p> {countComplete()}</p>

        <p> {countOldTodos()} </p>
      </div>
    </div>
  );
};

export default Nav;
