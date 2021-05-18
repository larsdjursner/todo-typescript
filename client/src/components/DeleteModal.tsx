import React, { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, IconButton, TextField } from "@material-ui/core";
import { IDeleteModal, IModal } from "../common/types";

import CloseIcon from "@material-ui/icons/Close";

import { TodoContext } from "../state";
import { SignInAPI } from "../services/UserService";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    styledmodal: {
      width: "40em",
      height: "40em",
      borderRadius: "0.5em",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    headerChild: {
      display: "inline-block",
      wordwrap: "break-word",
    },
    static: {
      borderTop: "1px solid #e0e0e0",
    },
    content: {
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

export const DeleteModal: FC<IDeleteModal> = ({ deleteUser }) => {
  const { state, dispatch } = useContext(TodoContext);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState({ password: "" });
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.password) {
      return;
    }
    const response = await SignInAPI(state.user.email, input.password);
    if (response.token) {
      toast.success(`Account deleted, bye ${state.user.name}`);
      deleteUser();
      return;
    }
    toast.error(response);
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <Button type="submit" color="secondary" variant="contained">
          Delete Account
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.styledmodal}>
            <div className={classes.header}>
              <h2 className={classes.headerChild}> {"Account Deletion"}</h2>
              <IconButton className={classes.headerChild} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className={classes.static}></div>
            <div className={classes.content}>
              <p>{"Are you sure you want to delete your account?"}</p>
              <p>
                {
                  "Account deletion is permanent. All of your data will be deleted."
                }
              </p>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleChange(e)}
              />
              <p>
                {
                  "Deletion of your account will require you to enter your password."
                }
              </p>

              <form
                className={classes.form}
                noValidate
                onClick={(e) => handleSubmit(e)}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Delete Account
                </Button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
