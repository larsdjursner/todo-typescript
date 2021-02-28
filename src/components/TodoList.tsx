import React, { useContext } from "react";
import { TodoForm } from "./TodoForm";
import { TodoContext } from '../TodoContext'
import "../App.css";
import { Todo } from "./Todo";



const TodoList: React.FC = () => {

	const [todos, setTodos] = useContext(TodoContext);

	const createTodo = (id: number, content: string) => {
		const newTodo = { id, content, completed: false, date: new Date(Date.now())};
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
							content={todo.content}
							completed={todo.completed}
							date={todo.date}
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
