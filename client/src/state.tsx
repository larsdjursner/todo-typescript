import { ContactSupportOutlined } from "@material-ui/icons";
import userEvent from "@testing-library/user-event";
import { createContext, useEffect, useReducer, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Context, ISubTodo, ITodo, IUser } from "./common/types";
import {
  AddSubTodo,
  AddTodo,
  CompleteSubTodo,
  CompleteTodo,
  DeleteSubTodo,
  DeleteTodo,
  getTodos,
  reorderTodos,
  isAuth,
} from "./services/todos";
import { RankSort, SubRankSort } from "./utils/ArraySort";

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
  | { type: "fetchTodos"; payload: { todos: ITodo[] } };

export const initialState: Context = {
  user: {} as IUser,
  isAuthenticated: false,
  todos: [],
  subTodos: [],
  refresh: false,
};

export const TodoReducer = (state: Context, action: ACTIONTYPE): Context => {
  switch (action.type) {
    case "setUser": {
      const { user } = action.payload;
      return { ...state, user: user};
    }
    case "setAuth": {
      const { auth } = action.payload;
      return { ...state, isAuthenticated: auth};
    }
    case "fetchTodos": {
      const { todos } = action.payload;

      return { ...state, todos: todos.length === 0 ? [] : RankSort(todos) };
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

      const todos = reorderTodos(state.user.id, tds, res.source.index, res.destination.index);

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
      // refactor
      // state.todos
      //   .filter((t) => t.completed === true)
      //   .forEach((t) => DeleteTodo(t.id));

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
    console.log("ISAUTH()");
    isAuth().then((res) => {
      if (!res.isAuth) {
        return Promise.reject("not auth yet");
      }
      dispatch({ type: "setAuth", payload: { auth: res.isAuth } });
      dispatch({ type: "setUser", payload: { user: res.user } });
    });

    // return () => {
    //   localStorage.removeItem("token");
    //   dispatch({ type: "setAuth", payload: { auth: false } });
    //   dispatch({ type: "setUser", payload: { user: {} as IUser} });
    // }
  }, []);

  

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
