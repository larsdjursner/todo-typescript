import React, { FC } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import './modal.style.css';


export interface IModal {
	isShown: boolean;
	hide: () => void;
	modalContent: JSX.Element | string;
	headerText: string;
	date: string;
}


export const Modal: FC<IModal> = ({
	isShown,
	hide,
	modalContent,
	headerText,
	date
}) => {
	const modal = (

		<div>
			<div className="Backdrop"  onClick={hide}/>
			<div className="Wrapper">
				<div className="StyledModal">
					<div className="Header">
						<div className="HeaderText">{headerText}</div>
						<IconButton className="IconButton" onClick={hide}>
							<CloseIcon/>
						</IconButton>
					</div>
					<div className="Content-Date Content">{date}</div>
					<div className="Content">{modalContent}</div>
				</div>
			</div>
		</div>
	);
	return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
