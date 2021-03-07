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
  | { type: "handleOnDragEnd"; payload: { res: DropResult } };

export const initialState: Context = {
  todos: InitialValues,
};

export const TodoReducer = (state: Context, action: ACTIONTYPE): Context => {

  switch (action.type) {
    case "deleteTodo":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload.id),
      };

    case "completeTodo":
      // return {...state, todos: state.todos.map( t => (t.id === action.payload.id) ? t.completed = !t.completed : t)};

    case "createTodo":
    case "handleOnDragEnd":
    default:
      return {
        ...state,
        todos: InitialValues,
      };
  }
};

export const TodoContext = createContext<{
  state: Context;
  dispatch: Function;
}>({
  state: initialState,
  dispatch: () => 0,
});

export const TodoProvider = TodoContext.Provider;

// case "completeTodo": {
//   return [
//     state,
// todos: state.todos.map((t) =>
//   t.id === action.payload.id
//     ? t.completed = !t.completed
//     : t.completed
// ),
// ]
// }
// case "createTodo":
//   {
//     return [
//         ...state.todos,
//         {
//           id: state.todos.length,
//           content : action.payload.content,
//           completed: false,
//           date: new Date(Date.now())
//         }
//       ];
//   }
// export const TodoContext = createContext<ITodoContext>(InitialValues);

// export const TodoProvider = (props: { children: any }) => {
//   // const [todos, setTodos] = useState<ITodo[]>(InitialValues);
//   const [state, dispatch] = useReducer(reducer, InitialValues);

//   return (
//     <TodoContext.Provider
//       value={{
//         todos: state.todos,
//         DeleteTodo: () => dispatch({type: 'DeleteTodo'}),
//         CompleteTodo: () => dispatch({type: 'CompleteTodo'})
//       }}
//     >
//       {props.children}
//     </TodoContext.Provider>
//   );
// };

// case "createTodo": {
//   const { id, content } = action.payload;
//   const newTodo = {
//     id,
//     content,
//     completed: false,
//     date: new Date(Date.now()),
//   };
//   const newTodos = [...state.todos, newTodo];
//   return { ...state, todos: newTodos };
// }
// case "handleOnDragEnd": {
//   const { res } = action.payload;
//   if (!res.destination) return { ...state };

//   const newTodos = [...state.todos];
//   const [reorderedTodos] = newTodos.splice(res.source.index, 1);
//   newTodos.splice(res.destination.index, 0, reorderedTodos);

//   return { ...state, todos: newTodos };
// }
