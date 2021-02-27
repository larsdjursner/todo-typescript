import React, { useContext } from "react";
import {TodoContext} from '../TodoContext';




const Nav: React.FC = () => {
    const [todos, setTodos] = useContext(TodoContext);


    const countComplete = () => {
        const count = todos.filter((t) => t.completed).length
        return(`${count} / ${todos.length}`);
    }


    return (
        <div className="Nav">
            <p> {countComplete()} </p>
        </div>
    )
}

export default Nav;