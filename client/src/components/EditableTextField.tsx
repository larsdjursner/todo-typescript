import * as React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { IEditableTextField } from "../common/types";
import { TodoContext } from "../state";
import { Action } from "../common/actions";
import { IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(
  createStyles({
    content: {
      "font-size": "30px",
      minWidth: "2em",
      width: "10em",
    },
    text: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export const EditableTextField: React.FC<IEditableTextField> = ({
  initialContent,
  id,
}) => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(TodoContext);

  const [content, setContent] = React.useState(initialContent);
  const [isContentFocused, setIsContentFocused] = React.useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsContentFocused(false);
    dispatch({ type: Action.UPDATENAMETODO, payload: { id, content } });
  };

  return (
    <div className="EditableTextField">
      {!isContentFocused ? (
        <Typography
          className={classes.content}
          onClick={() => {
            setIsContentFocused(true);
          }}
        >
          {content}
        </Typography>
      ) : (
        <div className={classes.text}>
          <TextField
            autoFocus
            fullWidth
            inputProps={{ className: classes.content }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <IconButton
            size="small"
            className="IconButton"
            onClick={(e) => handleSubmit(e)}
          >
            <CheckIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};
