import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import { getFullDate } from "../utils/dateFunctions";

const Nav: React.FC = () => {
	const [todos, setTodos] = useContext(TodoContext);

	const countComplete = () => {
		const count = todos.filter((t) => t.completed).length;
		return `${count} / ${todos.length}`;
		// return (count !== todos.length) ? (`${count} / ${todos.length}`) : (`${count} / ${todos.length} you've finished all your todos!`);
	};

	const countOldTodos = () => {
		const today = new Date(Date.now());
		const count = todos
			.filter((t) => !t.completed)
			.filter((t) => getFullDate(t.date) !== getFullDate(today)).length;
		return count;
	};

	return (
		<div className="Nav">
            <p> User Userson </p>
			<p> {countComplete()} </p>
			<p> {countOldTodos() + " todos are missing from previous days"} </p>
		</div>
	);
};

export default Nav;
