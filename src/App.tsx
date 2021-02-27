import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import { TodoProvider } from './TodoContext'

const App: React.FC = () => {
    return (
        <TodoProvider>
            <div className="app">
                <Nav />
                <TodoList />
            </div>
        </TodoProvider>
    )
}

export default App;