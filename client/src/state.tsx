import { createContext, useEffect, useReducer, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
  AddSubTodo,
  AddTodo,
  CompleteSubTodo,
  CompleteTodo,
  DeleteSubTodo,
  DeleteTodo,
  getTodos,
  reorderTodos,
} from "./services/todos";
import { RankSort, SubRankSort } from "./utils/ArraySort";

export interface ITodo {
  id: number;
  content: string;
  completed: boolean;
  date: Date;
  userId: string | undefined;
  rank: number;
}

export interface ISubTodo {
  id: number;
  content: string;
  completed: boolean;
  date: Date;
  parent: ITodo | undefined;
  parentId: number;
  rank: number;
}

export interface IUser {
  id: number;
  email: string;
  todos: ITodo[];
  name: string;
}

export interface Context  {
  user: IUser;
  isAuthenticated: boolean;
  todos: ITodo[];
  subTodos: ISubTodo[];
  refresh: Boolean;
};

type ACTIONTYPE =
  | { type: "setAuth"; payload: { auth: boolean } }
  | { type: "setUser"; payload: { user: IUser } }
  | { type: "deleteTodo"; payload: { id: number } }
  | { type: "completeTodo"; payload: { id: number; completed: boolean } }
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
      payload: { id: number; completed: boolean };
    }
  | { type: "fetchTodos"; payload: { todos: ITodo[]; subTodos: ISubTodo[] } };

export const initialState: Context = {
  user: {} as IUser,
  isAuthenticated: false,
  todos: [],
  subTodos: [],
  refresh: false,
};

// const SETAUTH = "setAuth";

export const TodoReducer = (state: Context, action: ACTIONTYPE): Context => {

  switch (action.type) {
    case "setUser": {
      const { user } = action.payload;
      return {...state, user: user}
    }
    case "setAuth": {
      const { auth } = action.payload;
      return { ...state, isAuthenticated: auth, refresh: true};
    }
    case "fetchTodos": {
      const { todos, subTodos } = action.payload;
      // const sortedTodos = RankSort(todos);
      // const sortedSubTodos = SubRankSort(subTodos);
      // const todos: ITodo[] = [];
      // const subTodos: ISubTodo[] = [];

      //todos and subtodos wont return proper arrays until auth has been fixed for client

      // return { ...state, todos: sortedTodos, subTodos: sortedSubTodos };
      return { ...state, todos, subTodos };
    }
    case "deleteTodo": {
      const { id } = action.payload;
      DeleteTodo(id);
      return {
        ...state,
        refresh: true,
      };
    }
    case "deleteSubTodo": {
      const { id } = action.payload;
      DeleteSubTodo(id);
      return {
        ...state,
        refresh: true,
      };
    }
    case "completeTodo": {
      const { id, completed } = action.payload;
      const newStatus = !completed;
      CompleteTodo(id, newStatus);

      return {
        ...state,
        refresh: true,
      };
    }
    case "completeSubTodo": {
      const { id, completed } = action.payload;
      const newStatus = !completed;
      CompleteSubTodo(id, newStatus);
      return {
        ...state,
        refresh: true,
      };
    }
    case "createTodo": {
      const { content } = action.payload;
      AddTodo(content, state.user.id);

      return {
        ...state,
        refresh: true,
      };
    }
    case "createSubTodo": {
      const { content, parentId } = action.payload;
      AddSubTodo(content, parentId);
      return {
        ...state,
        refresh: true,
      };
    }
    case "handleOnDragEnd": {
      const { res } = action.payload;
      const tds = state.todos;
      if (!res.destination) return { ...state };

      const todos = reorderTodos(tds, res.source.index, res.destination.index);

      return {
        ...state,
        todos: todos,
      };
    }
    case "completeAllTodos": {
      state.todos.forEach((t) => CompleteTodo(t.id, true));

      return {
        ...state,
        refresh: true,
      };
    }
    case "deleteCompleteTodos": {
      state.todos
        .filter((t) => t.completed === true)
        .forEach((t) => DeleteTodo(t.id));

      return {
        ...state,
        refresh: true,
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
      // if (state.refresh) state.refresh = false;
      dispatch({
        type: "fetchTodos",
        payload: { todos: res[0], subTodos: res[1] },
      });
    });
  }, [state.refresh]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export const TodoContext = createContext<{
  state: Context;
  dispatch: Function;
}>({
  state: initialState,
  dispatch: () => 0,
});
