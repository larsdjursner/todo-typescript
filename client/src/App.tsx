import React, { useContext } from "react";
import "./styles/App.css";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { TodoContext } from "./state";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const { isAuthenticated } = state;

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route
            exact
            path="/signin"
            render={(props) =>
              !isAuthenticated ? <SignIn {...props} /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/signup"
            render={(props) =>
              !isAuthenticated ? (
                <SignUp {...props} />
              ) : (
                <Redirect to="/signin" />
              )
            }
          />
          <Route
            exact
            path="/"
            render={() =>
              isAuthenticated ? (
                <div className="app">
                  <Nav />
                  <TodoList />
                </div>
              ) : (
                <Redirect to="/signin" />
              )
            }
          ></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
