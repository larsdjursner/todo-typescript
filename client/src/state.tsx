import { createContext, useEffect, useReducer, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { InitialTodos } from "./utils/InitialValues";
import { getTodos } from "./services/todos";
import { Todo } from "./components/Todo";

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
  | { type: "FETCHTODOS"; payload: { todos: ITodo[] } };

export const initialState: Context = {
  todos: [],
  subTodos: [],
};

export const TodoReducer = (state: Context, action: ACTIONTYPE): Context => {
  switch (action.type) {
    case "FETCHTODOS": {
      const { todos } = action.payload;
      console.log(todos);

      // return {...state };
      return { ...state, todos };
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

      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, completed: status } : { ...t }
        ),
        subTodos: state.subTodos.map((t) =>
          t.parentId === id ? { ...t, completed: status } : { ...t }
        ),
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
      const newTodo: ITodo = {
        id: state.todos.length,
        content: content,
        completed: false,
        date: new Date(Date.now()),
        userId: undefined,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }
    case "createSubTodo": {
      const { content, parentId } = action.payload;
      const newTodo: ISubTodo = {
        id: state.subTodos.length + 600,
        parentId: parentId,
        parent: state.todos.find((t) => t.id === parentId),
        content: content,
        completed: false,
        date: new Date(Date.now()),
      };

      return {
        ...state,
        subTodos: [...state.subTodos, newTodo],
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
        todos: InitialTodos,
      };
  }
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
// export const TodoProvider = TodoContext.Provider;

// export const TodoContext = createContext<ITodoContext>(InitialValues);

export const TodoProvider = (props: { children: any }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  useEffect(() => {
    getTodos().then((res) => {
      console.log(res);
      dispatch({ type: "FETCHTODOS", payload: {todos: res} });
    });
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};
