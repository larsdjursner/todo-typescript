import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {TodoContext} from "../state";

interface ISubTodoForm {
    parentId: number;
}

export const SubTodoForm: React.FC<ISubTodoForm> = ({parentId}) => {
  const [value, setValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { state, dispatch } = useContext(TodoContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    dispatch({ type: "createTodo", payload: { parentId : parentId , content: value } });
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
          <form id="subtodo-submit-form" action="/" onSubmit={(e) => handleSubmit(e)}>
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
              form="subtodo-submit-form"
              variant="outlined"
              color="primary"
            >
              Add
            </Button>
            <Button
              onClick={toggleForm}
              form="subtodo-submit-form"
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
          <p id="noform-content-text">Add subtodo</p>
        </div>
      )}
    </>
  );
};
