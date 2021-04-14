import React, { FC, Fragment, useContext } from "react";
import { RouteComponentProps } from "react-router";
import { TodoContext } from "../state";

const SignIn: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);

  return (
    <Fragment>
      <h1>Sign in</h1>
      <button
        onClick={() => dispatch({ type: "setAuth", payload: { auth: true } })}
      >
        Sign in
      </button>
    </Fragment>
  );
};

export default SignIn;
