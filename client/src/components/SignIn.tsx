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
import { TodoContext } from "../state";
import { LockOutlined } from "@material-ui/icons";
import { SignInAPI } from "../services/todos";
import { Link } from "react-router-dom";

// template from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);
  const classes = useStyles();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  // const { email, password } = input;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      return;
    }
    const {token, newUser} = await SignInAPI(input.email, input.password);
    
    if (token) {
      localStorage.setItem("token", token);
      await dispatch({ type: "setUser", payload: { user: newUser } });
      await dispatch({ type: "setAuth", payload: { auth: true } });
      console.log("authenticated");
      return;
    }

    console.log("something went wrong")
 
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onClick={(e) => handleSubmit(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // autoFocus
            onChange={(e) => handleChange(e)}
          />
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />} redundant atm, already using localstorage
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              
              {/* <Link href="#" variant="body2">           implement
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
