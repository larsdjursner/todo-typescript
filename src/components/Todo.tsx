import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import BathtubIcon from "@material-ui/icons/Bathtub";
import Modal from "react-modal";

import React from "react";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};
Modal.setAppElement("#root");

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
	// modal
	var subtitle: HTMLHeadingElement | null;
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		if (subtitle) subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpen(false);
	}
	//modal

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
				{/* <button onClick={() => openModal}></button> */}
				<div>
					<IconButton aria-label="delete" disabled color="primary">
						<BathtubIcon />
					</IconButton>
				</div>

				<div onClick={() => deleteTodo(id)}>
					<IconButton aria-label="delete" disabled color="primary">
						<DeleteIcon />
					</IconButton>
				</div>
			</div>
			{/* <Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
				<button onClick={closeModal}>close</button>
				<div>I am a modal</div>
				<form>
					<input />
					<button>tab navigation</button>
					<button>stays</button>
					<button>inside</button>
					<button>the modal</button>
				</form>
			</Modal> */}
		</li>
	);
};
