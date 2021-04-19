import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { TodoContext } from "../state";
import { toast } from "react-toastify";
import { IUser } from "../common/types";
import { Avatar, IconButton } from "@material-ui/core";


export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { state, dispatch } = useContext(TodoContext);
  const avatar = state.user.name;

  const logout = async (e: React.MouseEvent) => {
    e.preventDefault();

    handleClose();

    toast.success(`Bye ${state.user.name}`);

    localStorage.removeItem("token");
    dispatch({ type: "setUser", payload: { user: {} as IUser } });
    dispatch({ type: "setAuth", payload: { auth: false } });
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
       <Avatar>{ avatar }</Avatar> 
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{state.user.name}</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
