import React, { Fragment } from "react";
import "./styles/App.css";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Register from "./components/Register";
import { TodoProvider } from "./state";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route path="/">
              <div className="app">
                <Nav />
                <TodoList />
              </div>
            </Route>

          </Switch>
        </div>
      </Router>
    </TodoProvider>
  );
};

export default App;
