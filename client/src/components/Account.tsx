import { makeStyles } from "@material-ui/core";
import { SatelliteSharp } from "@material-ui/icons";
import { FC, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Action } from "../common/actions";
import { IUser } from "../common/types";
import { DeleteAccount } from "../services/TodosService";
import { TodoContext } from "../state";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    // display: "flex",
    paddingTop: "5em",
    alignItems: "center",
    // justifyContent: "center",
    maxWidth: "40%",
    width: "40%",
  },
  section: {
    border: "1px solid rgb(221, 218, 218)",
  },
  subsection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
});

//   export default function MediaCard() {
export const Account: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);
  const classes = useStyles();

  const logout = async () => {
    toast.success(`Account deleted, bye ${state.user.name}`);
    localStorage.removeItem("token");
    dispatch({ type: Action.SETUSER, payload: { user: {} as IUser } });
    dispatch({ type: Action.SETAUTH, payload: { auth: false } });
    state.user = {} as IUser;
    state.isAuthenticated = false;
  };

  const deleteuser = () => {
    DeleteAccount(state.user.id, state.user.email);
    logout();
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <h2>{state.user.name}</h2>
        </div>
        <div className={classes.section}>
          <h3>Account Details</h3>

          <div className={classes.subsection}>
            <p>Name</p>
            <p>{state.user.name}</p>
            <p>Change name</p>
          </div>
          <div className={classes.subsection}>
            <p>Email</p>
            <p>{state.user.email}</p>
            <p>Change Email</p>
          </div>
          <div className={classes.subsection}>
            <p>Password</p>
            <button>Change password</button>
          </div>
        </div>
        <div className={classes.section}>
            <p>deletion of your account is permanent, along with all of your data attached to the account.</p>
          <button onClick={deleteuser}>delete account</button>
        </div>
      </div>
    </div>
  );
};
