import { createContext, useEffect, useReducer } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
  AddSubTodo,
  CompleteSubTodo,
  DeleteSubTodo,
} from "./services/SubTodoService";
import {
  AddTodo,
  CompleteTodo,
  DeleteTodo,
  getTodos,
  reorderTodos,
} from "./services/TodoService";
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

export type Context = {
  todos: ITodo[];
  subTodos: ISubTodo[];
  refresh: Boolean;
};

type ACTIONTYPE =
  | { type: "deleteTodo"; payload: { id: number }; }
  | { type: "completeTodo"; payload: { id: number; completed: boolean }; }
  | { type: "createTodo"; payload: { content: string }; }
  | { type: "createSubTodo"; payload: { content: string; parentId: number }; }
  | { type: "completeAllTodos" }
  | { type: "handleOnDragEnd"; payload: { res: DropResult } }
  | { type: "deleteCompleteTodos" }
  | { type: "deleteSubTodo"; payload: { id: number } }
  | { type: "completeSubTodo"; payload: { id: number; completed: boolean }; }
  | { type: "FETCHTODOS"; payload: { todos: ITodo[]; subTodos: ISubTodo[] } };

export const initialState: Context = {
  todos: [],
  subTodos: [],
  refresh: false,
};

const USERID = 1;

export const TodoReducer = (state: Context, action: ACTIONTYPE): Context => {
  switch (action.type) {
    case "FETCHTODOS": {
      const { todos, subTodos } = action.payload;
      const sortedTodos = RankSort(todos);
      const sortedSubTodos = SubRankSort(subTodos);

      return { ...state, todos: sortedTodos, subTodos: sortedSubTodos };
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

      const subTodos = state.subTodos.filter(st => st.parentId == id);
      subTodos.forEach(st => CompleteSubTodo(st.id, newStatus));

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
      AddTodo(content, USERID);

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
      // state.subTodos.forEach(st => CompleteSubTodo(st.id, true));     //cascade

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
      if (state.refresh) state.refresh = false;
      dispatch({
        type: "FETCHTODOS",
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
