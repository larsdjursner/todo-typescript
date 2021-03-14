import { createContext, useReducer } from "react";
import { DropResult } from "react-beautiful-dnd";
import { InitialValues } from "./utils/InitialValues";

// export interface ITodo {
//   id: number;
//   content: string;
//   completed: boolean;
//   date: Date;
// }

// export type Context = {
//   todos: ITodo[];
// };

// type ACTIONTYPE =
//   | { type: "deleteTodo"; payload: { id: number } }
//   | { type: "completeTodo"; payload: { id: number } }
//   | { type: "createTodo"; payload: { content: string } }
//   | { type: "handleOnDragEnd"; payload: { res: DropResult } };

// export const initialState = {
//   todos: InitialValues
// };

// export const TodoReducer = (state: Context, action: ACTIONTYPE)  => {
//   console.log(action.type);
//   console.log(state.todos.length);

//   switch (action.type) {
//     case "deleteTodo": {
//       return {
//         ...state,
//         todos: state.todos.filter((t) => t.id !== action.payload.id)
//       };
//     }
//     // case "completeTodo": {
//     //   return [
//     //     state,
//         // todos: state.todos.map((t) =>
//         //   t.id === action.payload.id
//         //     ? t.completed = !t.completed
//         //     : t.completed
//         // ),
//       // ]
//     // }
//     // case "createTodo":
//     //   {
//     //     return [
//     //         ...state.todos,
//     //         {
//     //           id: state.todos.length,
//     //           content : action.payload.content,
//     //           completed: false,
//     //           date: new Date(Date.now())
//     //         }
//     //       ];
//     //   }
//     case "handleOnDragEnd":
//     default:
//       return initialState;
//   }
// };

// export const TodoContext = createContext<{
//   state: Context;
//   dispatch: Function;
// }>({
//   state: initialState,
//   dispatch: () => 0,
// });

// // export const TodoProvider = TodoContext.Provider;


// // export const TodoContext = createContext<ITodoContext>(InitialValues);

// export const TodoProvider = (props: { children: any }) => {
//   const [state, dispatch] = useReducer(TodoReducer, InitialValues);

//   return (
//     <TodoContext.Provider value={{ state, dispatch}}>
//       {props.children}
//     </TodoContext.Provider>
//   );
// };


