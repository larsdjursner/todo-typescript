import { createContext, useEffect, useReducer, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { AddSubTodo, AddTodo, CompleteTodo, getTodos } from "./services/todos";

export interface ITodo {
  id: number;
  content: string;
  completed: boolean;
  date: Date;
  userId: string | undefined;
}

export interface ISubTodo {
  id: number;
  content: string;
  completed: boolean;
  date: Date;
  parent: ITodo | undefined;
  parentId: number;
}

export type Context = {
  todos: ITodo[];
  subTodos: ISubTodo[];
  refresh: Boolean;
};

type ACTIONTYPE =
  | { type: "deleteTodo"; payload: { id: number; parentId: number | null } }
  | { type: "completeTodo"; payload: { id: number; parentId: number | null } }
  | {
      type: "createTodo";
      payload: { content: string };
    }
  | {
      type: "createSubTodo";
      payload: { content: string; parentId: number };
    }
  | { type: "completeAllTodos" }
  | { type: "handleOnDragEnd"; payload: { res: DropResult } }
  | { type: "deleteCompleteTodos" }
  | { type: "deleteSubTodo"; payload: { id: number } }
  | {
      type: "completeSubTodo";
      payload: { id: number; parentId: number | null };
    }
  | { type: "FETCHTODOS"; payload: { todos: ITodo[], subTodos: ISubTodo[] } };

export const initialState: Context = {
  todos: [],
  subTodos: [],
  refresh: false
};


export const TodoReducer = (state: Context, action: ACTIONTYPE): Context => {
  switch (action.type) {
    case "FETCHTODOS": {
      const { todos, subTodos } = action.payload;
      return { ...state, todos, subTodos };
    }
    case "deleteTodo": {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== id),
        subTodos: state.subTodos.filter((t) => t.parentId !== id),
      };
    }
    case "deleteSubTodo": {
      const { id } = action.payload;
      return {
        ...state,
        subTodos: state.subTodos.filter((t) => t.id !== id),
      };
    }
    case "completeTodo": {
      const { id } = action.payload;
      const todo = state.todos.filter((t) => t.id === id)[0];
      const status = !todo.completed;
      CompleteTodo(id, status);
      
      return {
        ...state,
        refresh: true
        // todos: state.todos.map((t) =>
        //   t.id === id ? { ...t, completed: status } : { ...t }
        // ),
        // subTodos: state.subTodos.map((t) =>
        //   t.parentId === id ? { ...t, completed: status } : { ...t }
        // ),
      };
    }
    case "completeSubTodo": {
      const { id } = action.payload;
      return {
        ...state,
        subTodos: state.subTodos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : { ...t }
        ),
      };
    }
    case "createTodo": {
      const { content } = action.payload;
      AddTodo(content, 1);
      return {
        ...state, refresh: true
      };
    }
    case "createSubTodo": {
      const { content, parentId } = action.payload;
      // const newTodo: ISubTodo = {
      //   id: state.subTodos.length + 600,
      //   parentId: parentId,
      //   parent: state.todos.find((t) => t.id === parentId),
      //   content: content,
      //   completed: false,
      //   date: new Date(Date.now()),
      // };
      AddSubTodo(content, parentId);
      return {
        ...state,
        refresh: true
        // subTodos: [...state.subTodos, newTodo],
      };
    }
    case "handleOnDragEnd": {
      const { res } = action.payload;
      if (!res.destination) return { ...state };

      return {
        ...state,
        todos: reorderTodos(
          state.todos,
          res.source.index,
          res.destination.index
        ),
      };
    }
    case "completeAllTodos": {
      return {
        ...state,
        todos: completeAllTodos(state.todos),
        subTodos: completeSubTodos(state.subTodos),
      };
    }
    case "deleteCompleteTodos": {
      return {
        ...state,
        todos: state.todos.filter((t) => !t.completed),
        subTodos: state.subTodos.filter((t) => !t.completed),
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export const TodoProvider = (props: { children: any }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  useEffect(() => {
    getTodos().then((res) => {
      if(state.refresh) state.refresh = false;
      dispatch({ type: "FETCHTODOS", payload: { todos: res[0], subTodos:res[1] } });
    });
  }, [state.refresh]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};
const completeAllTodos = (todos: ITodo[]): ITodo[] => {
  const newTodos = [...todos];
  newTodos.map((t) => (t.completed = true));
  return newTodos;
};

const completeSubTodos = (todos: ISubTodo[]): ISubTodo[] => {
  const newTodos = [...todos];
  newTodos.map((t) => (t.completed = true));
  return newTodos;
};

const reorderTodos = (todos: ITodo[], src: number, dest: number): ITodo[] => {
  const newTodos = [...todos];
  const [reorderedTodos] = newTodos.splice(src, 1);
  newTodos.splice(dest, 0, reorderedTodos);
  return newTodos;
};

export const TodoContext = createContext<{
  state: Context;
  dispatch: Function;
}>({
  state: initialState,
  dispatch: () => 0,
});