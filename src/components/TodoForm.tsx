import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { getCurrentDate } from "../utils/dateFunctions";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

interface ITodoForm {
  createTodo(id: number, value: string): void;
}

export const TodoForm: React.FC<ITodoForm> = ({ createTodo }) => {
  const [value, setValue] = useState("");
  const [currentId, setCurrentId] = useState(10); //hacky id assign until an api can be called
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    createTodo(currentId, value);

    const newId = currentId + 1;
    setCurrentId(newId);
    setValue("");
  };

  const toggleForm = () => {
    setValue("");
    setShowForm(!showForm);
  };

  return (
    <div className="todoform">
      <div className="todoform-header">
        <h2>Todo Today</h2>
        <p className="date"> {getCurrentDate()} </p>
      </div>

      {showForm ? (
        <div className="todoform-content">
          <form id="submit-form" action="/" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              className="todoform-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={"Enter a todo!"}
            />
          </form>

          <div className="todoform-buttons">
            <Button
              type="submit"
              form="submit-form"
              variant="outlined"
              color="primary"
            >
              Add todo
            </Button>
            <Button
              onClick={toggleForm}
              form="submit-form"
              variant="outlined"
              color="secondary"
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
    </div>
  );
};
