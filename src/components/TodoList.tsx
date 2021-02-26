import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import "../App.css";

const initialValues = [
	{ id: 1, content: "learn about react hooks", completed: false },
	{ id: 2, content: "add more functionality", completed: true },
	{ id: 3, content: "add more functionality", completed: false },
	{ id: 4, content: "add more functionality", completed: true },
	{ id: 5, content: "add more functionality", completed: false },
	{ id: 6, content: "add more functionality", completed: true },
	{ id: 7, content: "add more functionality", completed: false },
];

const TodoList: React.FC = () => {
	const [todos, setTodos] = useState(initialValues);

	const createTodo = (id: number, content: string) => {
		const newTodo = { id, content, completed: false };
		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
	};

	const deleteTodo = (id: number) => {
		const newTodos = [...todos];
		const index = newTodos.findIndex((t) => t.id === id);

		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	const completeTodo = (id: number) => {
		const newTodos = [...todos];
		const index = newTodos.findIndex((t) => t.id === id);

		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};

	return (
		<div className="parent-todo">
			<div className="child-todo">
				<div className="todolist">
					<TodoForm createTodo={createTodo} />
					{todos.map((todo) => (
						<Todo
							key={todo.id}
							id={todo.id}
							todo={todo}
							completeTodo={completeTodo}
							deleteTodo={deleteTodo}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default TodoList;
