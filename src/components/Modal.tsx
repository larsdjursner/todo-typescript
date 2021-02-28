import React, { FC } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import {
	Wrapper,
	Header,
	StyledModal,
	HeaderText,
	Content,
	Backdrop,
} from "./modal.style";

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
		<React.Fragment>
			<Backdrop/>
			<Wrapper>
				<StyledModal>
					<Header>
						<HeaderText>{headerText}</HeaderText>
						<IconButton className="IconButton">
							<CloseIcon onClick={hide}/>
						</IconButton>
					</Header>
					<Content>{date}</Content>
					<Content>{modalContent}</Content>
				</StyledModal>
			</Wrapper>
		</React.Fragment>
	);
	return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
