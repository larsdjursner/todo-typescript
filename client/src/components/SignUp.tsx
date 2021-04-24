import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { RouteComponentProps } from "react-router";
import { SignUpAPI } from "../services/TodosService";
import { TodoContext } from "../state";
import { LockOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Action } from "../common/actions";


// template from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);
  const classes = useStyles();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const { name, email, password } = input;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password) {
      return;
    }
    const response = await SignUpAPI(input.name, input.email, input.password);

    if (response.token) {
      localStorage.setItem("token", response.token);
      await dispatch({ type: Action.SETUSER, payload: { user: response.newUser } });
      await dispatch({ type: Action.SETAUTH, payload: { auth: true } });
      toast.success(`Welcome ${response.newUser.name} !`)
      return;
    }
    toast.error(response);

  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onClick={(e) => handleSubmit(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">{"Already have an account? Sign in"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
