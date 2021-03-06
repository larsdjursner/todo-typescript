import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { TodoContext } from "../state";
import { toast } from "react-toastify";
import { IUser } from "../common/types";
import { Avatar, IconButton } from "@material-ui/core";
import { Action } from "../common/actions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  NavLink,
} from "react-router-dom";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { state, dispatch } = useContext(TodoContext);
  const avatar = state.user.name;

  const logout = async (e: React.MouseEvent) => {
    e.preventDefault();

    handleClose();

    toast.success(`Bye ${state.user.name}`);

    localStorage.removeItem("token");
    dispatch({ type: Action.SETUSER, payload: { user: {} as IUser } });
    dispatch({ type: Action.SETAUTH, payload: { auth: false } });
    state.user = {} as IUser;
    state.isAuthenticated = false;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <Avatar>{avatar === undefined ? avatar : avatar.charAt(0)}</Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled={true} >{avatar}</MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/account" style={{ textDecoration: "none", color: "#000000"}}>
            {"Account"}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/" style={{ textDecoration: "none",color: "#000000"}}>
            {"Todo"}
          </Link>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
