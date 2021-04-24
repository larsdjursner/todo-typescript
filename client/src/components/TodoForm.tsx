import React, { FC, FormEvent, useContext, useReducer, useState } from "react";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {TodoContext} from "../state";
import "../styles/TodoForm.css";
import { Action } from "../common/actions";



export const TodoForm: FC = () => {
  const [value, setValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { state, dispatch } = useContext(TodoContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    dispatch({ type: Action.CREATETODO, payload: { content: value } });
    setValue("");
  };

  const toggleForm = () => {
    setValue("");
    setShowForm(!showForm);
  };

  return (
    <>
      {showForm ? (
        <div className="todoform-content">
          <form id="submit-form" action="/" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              className="todoform-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Enter a todo!"}
              autoFocus={true}
            />
          </form>

          <div className="todoform-buttons">
            <Button
              type="submit"
              form="submit-form"
              color="primary"
            >
              Add
            </Button>
            <Button
              onClick={toggleForm}
              form="submit-form"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="noform-content" onClick={toggleForm}>
          <IconButton id="noform-content-addicon">
            <AddIcon />
          </IconButton>
          <p id="noform-content-text">Add todo</p>
        </div>
      )}
    </>
  );
};
