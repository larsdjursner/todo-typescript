import React, { useContext } from "react";
import { TodoForm } from "./TodoForm";
import { TodoContext } from "../TodoContext";
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

const TodoList: React.FC = () => {
  const {todos, createTodo, handleOnDragEnd} = useContext(TodoContext);

  
  // const deleteCompletedTodos = () => {
  //   const newTodos = [...todos];
  //   const filtered = newTodos.filter((t) => !t.completed);
  //   setTodos(filtered);
  // };


  // const completeAllTodos = () => {
  //   const newTodos = [...todos];
  //   newTodos.forEach((t) => (t.completed = true));

  //   setTodos(newTodos);
  // };

  return (
    <div className="parent-todo">
      <div className="child-todo">
        <TodoForm createTodo={createTodo} />
        {todos.length > 0 ? (
          <div className="completion-button-parent">
            {/* <div className="completion-button" onClick={completeAllTodos}> */}
            <div className="completion-button">
              <IconButton>
                <CheckIcon />
              </IconButton>
              <p>Mark all as complete</p>
            </div>
            {/* <div className="completion-button" onClick={deleteCompletedTodos}> */}
            <div className="completion-button">
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
              handleOnDragEnd(res);
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
