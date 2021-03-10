import React, { useContext, useReducer } from "react";
import { TodoForm } from "./TodoForm";
import "../App.css";
import { Todo } from "./Todo";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { TodoContext} from "../state";

const TodoList: React.FC = () => {
  const {state, dispatch} = useContext(TodoContext);
  const todos = state.todos;



  return (
    <div className="parent-todo">
      <div className="child-todo">
        <TodoForm />
        {todos.length > 0 ? (
          <div className="completion-button-parent">
            <div className="completion-button" onClick={() => dispatch({type: "completeAllTodos"}) }>
              <IconButton>
                <CheckIcon />
              </IconButton>
              <p>Mark all as complete</p>
            </div>
            <div className="completion-button" onClick={() => dispatch({type: "deleteCompleteTodos"}) }>
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
              dispatch({type: "handleOnDragEnd", payload: {res : res}})
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
                            dragHandle={provided.dragHandleProps}
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
  );
};

export default TodoList;


