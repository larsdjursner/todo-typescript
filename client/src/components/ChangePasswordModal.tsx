import React, { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
} from "@material-ui/core";
import { DetailsType, IChangeModal, IModal } from "../common/types";

import CloseIcon from "@material-ui/icons/Close";

import { TodoContext } from "../state";
import {
  ChangeDetails,
  ChangePasswordAPI,
  SignInAPI,
} from "../services/TodosService";
import { toast } from "react-toastify";
import { Action } from "../common/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    styledmodal: {
      width: "30em",
      height: "30em",
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
    content: {},
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

export const ChangePasswordModal: FC<IChangeModal> = ({ id, detailsType }) => {
  const { state, dispatch } = useContext(TodoContext);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
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
      toast.error("Incorrect password");
      return;
    }
    if (
      input.newPassword.length === 0 ||
      input.confirmNewPassword.length === 0 ||
      input.newPassword !== input.confirmNewPassword
    ) {
      toast.error("Password is not matching");
      return;
    }

    const response = await SignInAPI(state.user.email, input.password);

    if (response.token) {
      try {
        const responseToken = await ChangePasswordAPI(
          state.user.id,
          input.password,
          input.newPassword
        );
        handleClose();

        if (responseToken.token) {
          localStorage.setItem("token", responseToken.token);
          dispatch({
            type: Action.SETUSER,
            payload: { user: responseToken.updatedUser },
          });
          dispatch({ type: Action.SETAUTH, payload: { auth: true } });
          toast.success(`${detailsType} changed!`);
          return;
        }
      } catch (error) {
        toast.error(error);
      }
      return;
    }
    toast.error(response);
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <Link href="#" variant="body2">
          {`Change ${detailsType}`}
        </Link>
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
              <Typography variant={"h6"} className={classes.headerChild}>
                {`Change ${detailsType}`}
              </Typography>
              <IconButton className={classes.headerChild} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className={classes.content}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="current password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={(e) => handleChange(e)}
              />
              <Typography variant={"caption"}>
                Please provide your current password
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="new password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmNewPassword"
                label="confirm new password"
                type="password"
                id="confirmNewPassword"
                autoComplete="confirmNewPassword"
                onChange={(e) => handleChange(e)}
              />
              <form
                className={classes.form}
                noValidate
                onClick={(e) => handleSubmit(e)}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {`Update ${detailsType}`}
                </Button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
