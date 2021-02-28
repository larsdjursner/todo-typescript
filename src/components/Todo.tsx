import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import React from "react";
import { useModal } from "../hooks/useModal";
import { ITodo } from "../TodoContext";
import { getDate } from "../utils/currentdate";
import { Modal } from "./Modal";

interface ITodoFunctions extends ITodo {
	deleteTodo(id: number) : void;
	completeTodo(id: number): void;
}

export const Todo: React.FC<ITodoFunctions> = ({
	id,
	completed,
	content,
	date,
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
					textDecoration: completed ? "line-through" : "",
					color: completed ? "gray" : "",
				}}
			>
				{content}
			</p>
			<div className="todo-buttons">
				<div onClick={toggle}>
					<Modal
						headerText={content}
						isShown={isShown}
						hide={toggle}
						modalContent={completed ? 'completed' : 'not completed'}
						date={getDate(date)}
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
