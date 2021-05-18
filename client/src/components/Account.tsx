import {
  Avatar,
  Button,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { FC, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Action } from "../common/actions";
import { DetailsType, IUser } from "../common/types";
import { DeleteAccount } from "../services/UserService";
import { TodoContext } from "../state";
import { ChangeDetailsModal } from "./ChangeDetailsModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { DeleteModal } from "./DeleteModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
    },
    wrapper: {
      paddingTop: "5em",
      alignItems: "center",
      // display: "flex",
      // justifyContent: "center",
      maxWidth: "40em",
      width: "40em",
    },
    section: {
      padding: "1em",
      borderTop: "1px solid rgb(221, 218, 218)",
      borderBottom: "1px solid rgb(221, 218, 218)",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      // color: theme.palette.text.secondary,
    },
  })
);

export const Account: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);
  const classes = useStyles();
  const avatar = state.user.name;

  const logout = async () => {
    localStorage.removeItem("token");
    dispatch({ type: Action.SETUSER, payload: { user: {} as IUser } });
    dispatch({ type: Action.SETAUTH, payload: { auth: false } });
    state.user = {} as IUser;
    state.isAuthenticated = false;
  };

  const deleteUser = () => {
    DeleteAccount(state.user.id);
    logout();
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <Typography variant={"h4"}>{state.user.name}</Typography>
        </div>
        <div className={classes.section}>
          <h3>Account Details</h3>

          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Typography variant={"body2"}>{"Avatar"}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Avatar>
                  {avatar === undefined ? avatar : avatar.charAt(0)}
                </Avatar>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Typography variant={"body2"}>{"Name"}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant={"body1"}>{state.user.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <ChangeDetailsModal
                  id={state.user.id}
                  detailsType={DetailsType.Name}
                />
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Typography variant={"body2"}>{"Mail"}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant={"body1"}>{state.user.email}</Typography>
              </Grid>
              <Grid item xs={4}>
                <ChangeDetailsModal
                  id={state.user.id}
                  detailsType={DetailsType.Email}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={8}>
                <Typography variant={"body2"}>{"Password"}</Typography>
              </Grid>
              <Grid item xs={4}>
                <ChangePasswordModal
                  id={state.user.id}
                  detailsType={DetailsType.Password}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <DeleteModal id={state.user.id} deleteUser={deleteUser} />

          <Typography variant={"caption"} display={"block"}>
            Deletion of your account is permanent, along with all of your data
            attached to the account.
          </Typography>
        </div>
      </div>
    </div>
  );
};
