import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import React from "react";
import { useModal } from "../hooks/useModal";
import { Modal } from "./Modal";

interface ITodo {
	id: number;
	todo: any;
	deleteTodo(id: number): void;
	completeTodo(id: number): void;
}

export const Todo: React.FC<ITodo> = ({
	id,
	todo,
	deleteTodo,
	completeTodo,
}) => {
	const { isShown, toggle } = useModal();

	return (
		<li className="todo">
			<p
				className="todo-content"
				onClick={() => completeTodo(id)}
				style={{
					textDecoration: todo.completed ? "line-through" : "",
					color: todo.completed ? "gray" : "",
				}}
			>
				{todo.content}
			</p>
			<div className="todo-buttons">
				<div onClick={toggle}>
					<Modal
						headerText={todo.id}
						isShown={isShown}
						hide={toggle}
						modalContent={todo.content}
					/>
					<IconButton className="IconButton">
						<MoreVertIcon />
					</IconButton>
				</div>

				<div onClick={() => deleteTodo(id)}>
					<IconButton className="IconButton">
						<DeleteIcon />
					</IconButton>
				</div>
			</div>
		</li>
	);
};
