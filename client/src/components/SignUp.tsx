import { Avatar,  Button,  Container, CssBaseline,  Grid, Link, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { ChangeEvent, FC, FormEvent, useState, } from "react";
import { RouteComponentProps } from "react-router";
import { SignUpAPI } from "../services/todos"

// from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: FC<RouteComponentProps> = () => {
  const classes = useStyles();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  })
  const { name, email, password} = input;

  const handleChange = (e : ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => {
    setInput({...input, [e.target.name] : e.target.value})
  }


  const handleSubmit  = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!input.name || !input.email || !input.password) { return;}
    SignUpAPI(input.name, input.email, input.password);
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onClick={e => handleSubmit(e)}>
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
                onChange = {e => handleChange(e)}
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
                onChange = {e => handleChange(e)}
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
                onChange = {e => handleChange(e)}
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
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
  // return (
  //   <Fragment>
  //     <h1>Register</h1>

  //     <form>
  //       <input type="email" name="email" placeholder="email"/>
  //       <input type="password" name="password" placeholder="password"/>
  //       <input type="text" name="name" placeholder="name"/>

  //       <Button></Button>
  //     </form>
  //   </Fragment>
  // );
};

export default SignUp;
