import { createContext } from "react";
import { DropResult } from "react-beautiful-dnd";
import { InitialValues } from "./utils/InitialValues";

export interface ITodo {
  id: number;
  content: string;
  completed: boolean;
  date: Date;
}

export type Context = {
  todos: ITodo[];
};

type ACTIONTYPE =
  | { type: "deleteTodo"; payload: { id: number } }
  | { type: "completeTodo"; payload: { id: number } }
  | { type: "createTodo"; payload: { content: string } }
  | { type: "handleOnDragEnd"; payload: { res: DropResult } }
  | { type: "completeAllTodos"; }
  | { type: "deleteCompleteTodos"; }

export const initialState: Context = {
  todos: InitialValues,
};

export const TodoReducer = (state: Context, action: ACTIONTYPE): Context => {
  switch (action.type) {
    case "deleteTodo": {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== id),
      };
    };
    case "completeTodo": {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id
            ? { ...t, completed: !t.completed }
            : { ...t }
        ),
      };
    };
    case "createTodo": {
      const { content } = action.payload;
      return {
        todos: [
          ...state.todos,
          {
            id: state.todos.length,
            content: content,
            completed: false,
            date: new Date(Date.now()),
          },
        ],
      };
    };
    case "handleOnDragEnd": {
      const { res } = action.payload;
      if (!res.destination) return{...state}
      
      return {
        ...state,
        todos : reorderTodos(state.todos, res.source.index, res.destination.index)
      };
    };
    case "completeAllTodos": {
      return {
        ...state,
        todos: completeAllTodos(state.todos)
      }
    }
    case "deleteCompleteTodos": {
      return {
        ...state,
        todos: state.todos.filter((t) => !t.completed)
      }
    }
    default:
      return {
        ...state,
        todos: InitialValues,
      };
  }
};

const completeAllTodos = (todos: ITodo[]) : ITodo[] => {
  const newTodos = [...todos];
  newTodos.map((t) => t.completed = true);
  return newTodos;
}

const reorderTodos = (todos: ITodo[], src: number, dest:number): ITodo[] => {
  const newTodos = [...todos];
  const [reorderedTodos] = newTodos.splice(src, 1);
  newTodos.splice(dest, 0, reorderedTodos);
  return newTodos;
}


export const TodoContext = createContext<{
  state: Context;
  dispatch: Function;
}>({
  state: initialState,
  dispatch: () => 0,
});

export const TodoProvider = TodoContext.Provider;

// // export const TodoContext = createContext<ITodoContext>(InitialValues);

// export const TodoProvider = (props: { children: any }) => {
//   const [state, dispatch] = useReducer(TodoReducer, InitialValues);

//   return (
//     <TodoContext.Provider value={{ state, dispatch}}>
//       {props.children}
//     </TodoContext.Provider>
//   );
// };