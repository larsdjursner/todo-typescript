import { createContext, useEffect, useReducer } from "react";
import { DropResult } from "react-beautiful-dnd";
import { AddSubTodo, AddTodo, CompleteSubTodo, CompleteTodo, DeleteTodo, getTodos } from "./services/todos";

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
  | { type: "deleteTodo"; payload: { id: number; } }
  | { type: "completeTodo"; payload: { id: number; completed: boolean} }
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
      payload: { id: number; completed: boolean};
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
      const sortedTodos = todos.sort((a: ITodo, b: ITodo) => {
        if(a.rank < b.rank) {
          return -1;
        }
        if(a.rank > b.rank) {
          return 1;
        }
        return 0;
      });

      return { ...state, todos: sortedTodos, subTodos };
    }
    case "deleteTodo": {
      const { id } = action.payload;
      DeleteTodo(id);
      return {
        ...state,
        refresh : true
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
      const { id, completed } = action.payload;
      const newStatus = !completed;
      CompleteTodo(id, newStatus);
      
      return {
        ...state,
        refresh: true
      };
    }
    case "completeSubTodo": {
      const { id, completed } = action.payload;
      const newStatus = !completed;
      CompleteSubTodo(id, newStatus);
      return {
        ...state,
        refresh: true
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
      AddSubTodo(content, parentId);
      return {
        ...state,
        refresh: true
      };
    }
    case "handleOnDragEnd": {
      const { res } = action.payload;

      if (!res.destination) return { ...state };


      
      // return {
      //   ...state,
      //   todos: reorderTodos(
      //     state.todos,
      //     res.source.index,
      //     res.destination.index
      //   ),
      // };
      return {
        ...state, 
        refresh: true
      }
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
    getTodos()
      .then((res) => {
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



export const TodoContext = createContext<{
  state: Context;
  dispatch: Function;
}>({
  state: initialState,
  dispatch: () => 0,
});