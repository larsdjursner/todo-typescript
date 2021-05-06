import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import React, { useState, FC, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TodoContext } from "../state";
import ProfileMenu from "./ProfileMenu";

const useStyles = makeStyles({
  Nav: {
    backgroundColor: "hsl(224, 37%, 20%)",
    color: "white",
    height: "3.5em",
    display: "flex",
    justifyContent: "space-between",
  },
  NavItem: {
    display: "flex",
    margin: "0",
    width: "20em",
    justifyContent: "space-around",
  },
  Circ: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const Nav: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);
  const classes = useStyles();
  const { todos } = state;

  const getProgress = () => {
    return (todos.filter((t) => t.completed).length * 100) / todos.length;
  };

  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, [state.todos]);

  return (
    <div className={classes.Nav}>
      <div className={classes.NavItem}>
        <ProfileMenu />
      </div>

      <div className={classes.NavItem}>
        <div className={classes.Circ}>
          <CircularProgress
            variant="determinate"
            size="2em"
            thickness={10}
            color="inherit"
            value={progress}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
