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
  UpdateDateTodo,
  UpdateNameTodo,
  SignInAPI,
} from "./services/TodosService";
import { RankSort, SubRankSort } from "./utils/ArraySort";
import { Action } from "./common/actions";

type ACTIONTYPE =
  | { type: Action.SETAUTH; payload: { auth: boolean } }
  | { type: Action.SETUSER; payload: { user: IUser } }
  | { type: Action.DELETETODO; payload: { id: number } }
  | { type: Action.UPDATEDATETODO; payload: { id: number; date: Date } }
  | { type: Action.UPDATENAMETODO; payload: { id: number; content: string } }
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
  | { type: Action.FETCHTODOS; payload: { todos: ITodo[] } }
  | { type: Action.DELETEACCOUNT; payload: { } }
  | { type: Action.CHANGEDETAILS; payload: {name:string, email:string } }

export const initialState: Context = {
  user: {} as IUser,
  isAuthenticated: false,
  todos: [],
  subTodos: [],
  refresh: false,
  loaded: false,
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
    case Action.CHANGEDETAILS: {
      const {name, email} = action.payload;

      return {...state, user: { ...state.user, name: name, email: email}}
    }
    case Action.FETCHTODOS: {
      const { todos } = action.payload;
      const subtodos = todos.flatMap((t) => t.subtodos);

      return {
        ...state,
        loaded: true,
        todos: RankSort(todos),
        subTodos: SubRankSort(subtodos),
      };
    }
    case Action.CREATETODO: {
      const { content } = action.payload;
      const dto = AddTodo(content, state.user.id);

      return {
        ...state,
        refresh: true,
      };
    }
    case Action.COMPLETETODO: {
      const { id, completed } = action.payload;
      const status = !completed;
      CompleteTodo(id, status);

      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: status,
              }
            : { ...t }
        ),
        subTodos: state.subTodos.map((t) =>
          t.parentId === id ? { ...t, completed: status } : { ...t }
        ),
      };
    }
    case Action.DELETETODO: {
      const { id } = action.payload;
      DeleteTodo(id);

      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== id),
      };
    }

    case Action.UPDATEDATETODO: {
      const { id, date } = action.payload;
      UpdateDateTodo(id, date);

      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, date: date.toDateString() } : { ...t }
        ),
      };
    }
    case Action.UPDATENAMETODO: {
      const { id, content } = action.payload;
      UpdateNameTodo(id, content);

      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, content: content } : { ...t }
        ),
      };
    }
    case Action.CREATESUBTODO: {
      const { content, parentId } = action.payload;
      AddSubTodo(content, parentId);

      return {
        ...state,
        refresh: true, //easier for now
      };
    }
    case Action.COMPLETESUBTODO: {
      const { id, completed } = action.payload;
      const newStatus = !completed;
      CompleteSubTodo(id, newStatus);

      return {
        ...state,
        subTodos: state.subTodos.map((st) =>
          st.id === id ? { ...st, completed: newStatus } : { ...st }
        ),
      };
    }
    case Action.DELETESUBTODO: {
      const { id } = action.payload;
      DeleteSubTodo(id);

      return {
        ...state,
        subTodos: state.subTodos.filter((s) => s.id !== id),
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
        todos: state.todos.map((t) => {
          return { ...t, completed: true };
        }),
        subTodos: state.subTodos.map((t) => {
          return { ...t, completed: true };
        }),
      };
    }
    case Action.DELETECOMPLETETODOS: {
      state.todos
        .filter((t) => t.completed === true)
        .forEach((t) => DeleteTodo(t.id));

      return {
        ...state,
        todos: state.todos.filter((t) => t.completed !== true),
        subTodos: state.subTodos.filter((t) => t.completed !== true),
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
    isAuth().then((res) => {
      if (!res.isAuth) {
        return Promise.reject("not auth yet");
      }
      dispatch({ type: Action.SETAUTH, payload: { auth: res.isAuth } });
      dispatch({ type: Action.SETUSER, payload: { user: res.user } });
    });

    return () => {
      localStorage.removeItem("token");
      dispatch({ type: Action.SETAUTH, payload: { auth: false } });
      dispatch({ type: Action.SETUSER, payload: { user: {} as IUser} });
    }
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
