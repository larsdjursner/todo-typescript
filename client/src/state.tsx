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
  UpdateTodo,
} from "./services/TodosService";
import { RankSort, SubRankSort } from "./utils/ArraySort";
import { Action } from "./common/actions";

type ACTIONTYPE =
  | { type: Action.SETAUTH; payload: { auth: boolean } }
  | { type: Action.SETUSER; payload: { user: IUser } }
  | { type: Action.DELETETODO; payload: { id: number } }
  | { type: Action.UPDATEDATETODO; payload: { id: number; date: Date } }
  | { type: Action.COMPLETETODO; payload: { id: number; completed: boolean } }
  | {
      type: Action.CREATETODO;
      payload: { content: string };
    }
  | {
      type: Action.CREATESUBTODO;
      payload: { content: string; parentId: number };
    }
  | { type: Action.COMPLETEALLTODOS }
  | { type: Action.HANDLEONDRAGEND; payload: { res: DropResult } }
  | { type: Action.DELETECOMPLETETODOS }
  | { type: Action.DELETESUBTODO; payload: { id: number } }
  | {
      type: Action.COMPLETESUBTODO;
      payload: { id: number; completed: boolean };
    }
  | { type: Action.FETCHTODOS; payload: { todos: ITodo[] } };

export const initialState: Context = {
  user: {} as IUser,
  isAuthenticated: false,
  todos: [],
  subTodos: [],
  refresh: false,
};

export const TodoReducer = (state: Context, action: ACTIONTYPE): Context => {
  switch (action.type) {
    case Action.SETUSER: {
      const { user } = action.payload;
      return { ...state, user: user };
    }
    case Action.SETAUTH: {
      const { auth } = action.payload;
      return { ...state, isAuthenticated: auth };
    }
    case Action.FETCHTODOS: {
      const { todos } = action.payload;
      const subtodos = todos.flatMap((t) => t.subtodos);

      return {
        ...state,
        todos: RankSort(todos),
        subTodos: SubRankSort(subtodos),
      };
    }
    case Action.CREATETODO: {
      const { content } = action.payload;
      AddTodo(content, state.user.id);

      return {
        ...state,
        refresh: true,
      };
    }
    case Action.COMPLETETODO: {
      const { id, completed } = action.payload;
      const newStatus = !completed;
      CompleteTodo(id, newStatus);

      return {
        ...state,
        refresh: true,
      };
    }
    case Action.DELETETODO: {
      const { id } = action.payload;
      DeleteTodo(id);

      return {
        ...state,
        refresh: true,
      };
    }

    case  Action.UPDATEDATETODO: {
      const { id, date } = action.payload;
      UpdateTodo(id, date);

      return {
        ...state,
        refresh: true,
      };
    }
    case Action.CREATESUBTODO: {
      const { content, parentId } = action.payload;
      AddSubTodo(content, parentId);
      return {
        ...state,
        refresh: true,
      };
    }
    case Action.COMPLETESUBTODO: {
      const { id, completed } = action.payload;
      const newStatus = !completed;
      CompleteSubTodo(id, newStatus);

      return {
        ...state,
        refresh: true,
      };
    }
    case Action.DELETESUBTODO: {
      const { id } = action.payload;
      DeleteSubTodo(id);
      return {
        ...state,
        refresh: true,
      };
    }
    case Action.HANDLEONDRAGEND: {
      const { res } = action.payload;
      const tds = state.todos;
      if (!res.destination) return { ...state };

      const todos = reorderTodos(
        state.user.id,
        tds,
        res.source.index,
        res.destination.index
      );

      return {
        ...state,
        todos: todos,
      };
    }
    case Action.COMPLETEALLTODOS: {
      state.todos.forEach((t) => CompleteTodo(t.id, true));

      return {
        ...state,
        refresh: true,
      };
    }
    case  Action.DELETECOMPLETETODOS: {
      // refactor
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
    console.log("ISAUTH()");
    isAuth().then((res) => {
      if (!res.isAuth) {
        return Promise.reject("not auth yet");
      }
      dispatch({ type: Action.SETAUTH, payload: { auth: res.isAuth } });
      dispatch({ type: Action.SETUSER, payload: { user: res.user } });
    });

    

    // return () => {
    //   localStorage.removeItem("token");
    //   dispatch({ type: "setAuth", payload: { auth: false } });
    //   dispatch({ type: "setUser", payload: { user: {} as IUser} });
    // }
  }, []);

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
