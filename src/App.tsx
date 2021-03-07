import React, { useContext, useReducer } from "react";
import "./App.css";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
// import { TodoProvider } from "./TodoCtx";
import { TodoReducer, initialState, TodoProvider, TodoContext} from "./state";

const App: React.FC = () => {

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  return (
    <TodoProvider value = {{state, dispatch}}>
      <div className="app">
        <Nav />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
