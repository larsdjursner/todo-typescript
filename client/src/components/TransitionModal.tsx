import React, { FC, useContext } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IModal } from "../common/types";

import CloseIcon from "@material-ui/icons/Close";

// import "../styles/Modal.css";
import { Action } from "../common/actions";
import { TodoContext } from "../state";
import { SubTodoForm } from "./SubTodoForm";
import { SubTodo } from "./SubTodo";
import { DatePicker } from "./DatePicker";
import { EditableTextField } from "./EditableTextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    styledmodal: {
      width: "45em",
      height: "40em",
      borderRadius: "0.5em",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    headerChild: {
      display: "inline-block",
      wordwrap: "break-word",
      overflowX: "hidden",
    },
    static: {
      borderTop: "1px solid #e0e0e0",
    },
    content: {
      overflowY: "scroll",
    },
  })
);

export const TransitionModal: FC<IModal> = ({ id }) => {
  const { state, dispatch } = useContext(TodoContext);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const todo = state.todos.find((t) => t.id === id);
  const header = todo!.content;
  const date = new Date(Date.parse(todo!.date));
  const subTodos = state.subTodos.filter((t) => t.parentId === id);

  const updateDate = (date: Date) => {
    dispatch({ type: Action.UPDATEDATETODO, payload: { id, date } });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <IconButton size="small" className="IconButton">
          <MoreVertIcon />
        </IconButton>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.styledmodal}>
            <div className={classes.header}>
              <EditableTextField initialContent={header} id={id}/>
              <IconButton className={classes.headerChild} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className={classes.static}>
              <DatePicker date={date} id={id} updateDate={updateDate} />
              <SubTodoForm parentId={id} />
            </div>
            <div className={classes.content}>
              <ul className="todolist">
                {subTodos.map((sub) => (
                  <SubTodo
                    key={sub.id}
                    id={sub.id}
                    parentId={sub.parentId}
                    parent={undefined} //temporary solution
                    content={sub.content}
                    completed={sub.completed}
                    date={sub.date}
                    rank={sub.rank}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
