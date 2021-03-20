import React, { useReducer } from "react";
import "./styles/App.css";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import { TodoReducer, initialState, TodoProvider,} from "./state";

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
