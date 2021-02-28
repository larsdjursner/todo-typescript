import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import { getDate } from "../utils/currentdate";

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
			.filter((t) => getDate(t.date) !== getDate(today)).length;
		return count;
	};

	return (
		<div className="Nav">
			<p> {countComplete()} </p>
			<p> {countOldTodos() + " todos are missing from previous days"} </p>
		</div>
	);
};

export default Nav;
