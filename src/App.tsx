import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";


const App: React.FC = () => {
    return (
        <div className="app">
            <Nav />
            <TodoList />
        </div>
    )
}

export default App;