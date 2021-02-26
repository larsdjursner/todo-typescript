import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import getCurrentDate from '../utils/currentdate'

interface ITodoForm {
	createTodo(id: number, value: string): void;
}

export const TodoForm: React.FC<ITodoForm> = ({ createTodo }) => {
	const [value, setValue] = useState("");
	const [currentId, setCurrentId] = useState(10); //hacky id assign until an api can be called

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!value) return;

		createTodo(currentId, value);

		const newId = currentId + 1;
		setCurrentId(newId);
		setValue("");
	};

	const handleCancel = () => {
		setValue("");
	};


	return (
		<div className="todoform">
			<div className="todo-header">
				<h2>Todo Today</h2>
				<p className="date"> {getCurrentDate} </p>
			</div>

			<form id="submit-form" action="/" onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					className="input"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={"Enter a todo!"}
				/>
			</form>
			<div className="todoform-buttons">
				<Button
					type="submit"
					form="submit-form"
          variant="outlined"
					color="primary"
				>
					Add todo
				</Button>
				<Button
					onClick={handleCancel}
					form="submit-form"
          variant="outlined"
					color="secondary"
				>
					Cancel
				</Button>
			</div>
		</div>
	);
};
