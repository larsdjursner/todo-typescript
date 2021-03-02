import React, { useContext } from "react";
import { TodoForm } from "./TodoForm";
import { TodoContext } from '../TodoContext'
import "../App.css";
import { Todo } from "./Todo";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import IconButton from "@material-ui/core/IconButton";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';


const TodoList: React.FC = () => {

	const [todos, setTodos] = useContext(TodoContext);

	const createTodo = (id: number, content: string) => {
		const newTodo = { id, content, completed: false, date: new Date(Date.now()) };
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

	const rearrangeTodo = (param: DropResult) => {
		const destIndex = param.destination?.index;
		const srcIndex = param.source.index;

		const moved = todos[srcIndex];
		const remaining = todos.filter((t) => t.id !== moved.id)
	  
		const reorderedItems = [
			...remaining.slice(0, destIndex),
			moved,
			...remaining.slice(destIndex)
		];
	  
		setTodos(reorderedItems);
	}

	return (
		<div className="parent-todo">
			<div className="child-todo">
				<DragDropContext onDragEnd={(param) => { 
						rearrangeTodo(param)
					}}>
					<div className="todolist">
						<TodoForm createTodo={createTodo} />
						<Droppable droppableId="droppable-1">
							{(provided, _) => (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									{todos.map((todo, i) => (
										<Draggable key={todo.id} draggableId={'draggable-' + todo.id} index={i}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													style={{ 
														...provided.draggableProps.style, 
														boxShadow: snapshot.isDragging ? '0 0 0.3rem #666' : 'none' 
													}}
												>
													
													<Todo
														key={todo.id}
														id={todo.id}
														content={todo.content}
														completed={todo.completed}
														date={todo.date}
														completeTodo={completeTodo}
														deleteTodo={deleteTodo}
														dragHandle={provided.dragHandleProps}
													/>
												</div>

											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>

					</div>
				</DragDropContext>
			</div>
		</div>
	);
};

export default TodoList;
