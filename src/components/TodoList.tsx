import React, { useContext } from "react";
import { TodoForm } from "./TodoForm";
import { TodoContext } from "../TodoContext";
import "../App.css";
import { Todo } from "./Todo";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from '@material-ui/icons/Clear';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useContext(TodoContext);

  const createTodo = (id: number, content: string) => {
    const newTodo = {
      id,
      content,
      completed: false,
      date: new Date(Date.now()),
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const deleteTodo = (id: number) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((t) => t.id === id);

    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const deleteCompletedTodos = () => {
    const newTodos = [...todos];
    const filtered = newTodos.filter((t) => !t.completed);
    setTodos(filtered);
  };

  const completeTodo = (id: number) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((t) => t.id === id);

    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const completeAllTodos = () => {
    const newTodos = [...todos];
    newTodos.forEach((t) => (t.completed = true));

    setTodos(newTodos);
  };

  const handleOnDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    const newTodos = [...todos];
    const [reorderedTodos] = newTodos.splice(res.source.index, 1);
    newTodos.splice(res.destination.index, 0, reorderedTodos);

    setTodos(newTodos);
  };

  return (
    <div className="parent-todo">
      <div className="child-todo">
        <TodoForm createTodo={createTodo} />
        {todos.length > 0 ? (
          <div className="completion-button-parent">
             <div className="completion-button" onClick={completeAllTodos}>
              <IconButton>
                <CheckIcon />
              </IconButton>
              <p>Mark all as complete</p>
            </div>
            <div className="completion-button" onClick={deleteCompletedTodos}>
              <IconButton>
                <ClearIcon />
              </IconButton>
              <p>Clear completed</p>
            </div>
           
          </div>
        ) : (
          <div></div>
        )}

        <DragDropContext
          onDragEnd={(res) => {
            handleOnDragEnd(res);
          }}
        >
          <ul className="todolist">
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
                            completeTodo={completeTodo}
                            deleteTodo={deleteTodo}
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
          </ul>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TodoList;
