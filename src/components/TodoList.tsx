import React, { useContext } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { TodoContext } from '../TodoContext'
import "../App.css";



const TodoList: React.FC = () => {

	const [todos, setTodos] = useContext(TodoContext);

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
		console.log(countComplete());
	};

	const countComplete = () => {
		const count = todos.filter((t) => t.completed).length
		return(`${count} / ${todos.length}`);
	}

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
