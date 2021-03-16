import { isNull } from "node:util";
import { createContext } from "react";
import { DropResult } from "react-beautiful-dnd";
import { InitialTodos, InitialSubTodos } from "./utils/InitialValues";

export interface ITodo {
  parentId: number | null;
  id: number;
  content: string;
  completed: boolean;
  date: Date;
}

export type Context = {
  todos: ITodo[];
  subTodos: ITodo[];
};

type ACTIONTYPE =
  | { type: "deleteTodo"; payload: { id: number } }
  | { type: "completeTodo"; payload: { id: number } }
  | { type: "createTodo"; payload: { parentId: number | null; content: string; }}
  | { type: "completeAllTodos"; }
  | { type: "handleOnDragEnd"; payload: { res: DropResult } }
  | { type: "deleteCompleteTodos"; };

export const initialState: Context = {
  todos: InitialTodos,
  subTodos: InitialSubTodos,
};

export const TodoReducer = (state: Context, action: ACTIONTYPE): Context => {
  switch (action.type) {
    case "deleteTodo": {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== id),
        subTodos: state.subTodos.filter((t) => t.parentId !== id),
      };
    }
    case "completeTodo": {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : { ...t }
        ),
        subTodos: state.subTodos.map((t) =>
          t.parentId === id ? { ...t, completed: !t.completed } : { ...t }
        ),
      };
    }
    case "createTodo": {
      const { parentId, content } = action.payload;
      const newTodo : ITodo =
      {
        id: (parentId != null ? 600 + state.subTodos.length : state.todos.length ),
        parentId: parentId,
        content: content,
        completed: false,
        date: new Date(Date.now()),
      }
      
      if(parentId != null) {
        return {
          ...state,
          subTodos: [...state.subTodos, newTodo]
        };
      }
      else {
        return {
          ...state,
          todos: [...state.todos, newTodo]
        };
      }
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
      };
    }
    case "deleteCompleteTodos": {
      return {
        ...state,
        todos: state.todos.filter((t) => !t.completed),
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

export const TodoProvider = TodoContext.Provider;

// export const TodoContext = createContext<ITodoContext>(InitialValues);

// export const TodoProvider = (props: { children: any }) => {
//   const [state, dispatch] = useReducer(TodoReducer, InitialValues);

//   return (
//     <TodoContext.Provider value={{ state, dispatch}}>
//       {props.children}
//     </TodoContext.Provider>
//   );
// };
