import React, { FC, useContext, useEffect } from "react";
import { TodoForm } from "./TodoForm";
// import "../App.css";
import { Todo } from "./Todo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { TodoContext } from "../state";
import { getCurrentDate } from "../utils/dateFunctions";
import { RouteComponentProps } from "react-router-dom";
import { getTodos } from "../services/TodosService";
import { Action } from "../common/actions";
import MediaCard from "./MediaCard";
import { format } from "date-fns";

const TodoList: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(TodoContext);
  const todos = state.todos;

  useEffect(() => {
    getTodos()
      .then((res) => {
        if (state.refresh) state.refresh = false;
        dispatch({ type: Action.FETCHTODOS, payload: { todos: res } });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.refresh]);

  return (
    <>
      <div className="parent-todo">
        <div className="child-todo">
          <div className="todoform">
            <div className="todoform-header">
              <h2>Todo Today</h2>
              <p className="date"> {getCurrentDate()} </p>
            </div>
            <TodoForm />
            {todos.length > 0 ? (
              <div className="completion-button-parent">
                <div
                  className="completion-button"
                  onClick={() => dispatch({ type: Action.COMPLETEALLTODOS })}
                >
                  <IconButton>
                    <CheckIcon />
                  </IconButton>
                  <p>Mark all as complete</p>
                </div>
                <div
                  className="completion-button"
                  onClick={() => dispatch({ type: Action.DELETECOMPLETETODOS })}
                >
                  <IconButton>
                    <ClearIcon />
                  </IconButton>
                  <p>Clear completed</p>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <ul className="todolist">
              <DragDropContext
                onDragEnd={(res) => {
                  dispatch({
                    type: Action.HANDLEONDRAGEND,
                    payload: { res: res },
                  });
                }}
              >
                <Droppable droppableId="droppable-1">
                  {(provided, _) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {todos.map((todo, i) => (
                        <Draggable
                          key={todo.id}
                          draggableId={"draggable-" + todo.id}
                          index={i}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                                boxShadow: snapshot.isDragging
                                  ? "0 0 0.3rem #666"
                                  : "none",
                              }}
                            >
                              <Todo
                                key={todo.id}
                                id={todo.id}
                                content={todo.content}
                                completed={todo.completed}
                                date={todo.date}
                                userId={todo.userId}
                                dragHandle={provided.dragHandleProps}
                                rank={todo.rank}
                                subtodos={todo.subtodos}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </ul>
          </div>
        </div>
      </div>
      {state.todos.length === 0 && state.loaded ? <MediaCard /> : <></>}
    </>
  );
};

export default TodoList;
