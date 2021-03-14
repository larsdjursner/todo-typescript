import React, { createContext, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { InitialValues } from "./utils/InitialValues";

export interface ITodo {
  id: number;
  content: string;
  completed: boolean;
  date: Date;
}

type Context = {
  todos: ITodo[];
  deleteTodo(id: number): void;
  completeTodo(id: number): void;
  createTodo(id: number, content: string): void;
  handleOnDragEnd(res: DropResult) : void;
};

export const TodoContext = createContext<Context>({
  todos: [],
  deleteTodo: () => {},
  completeTodo: () => {},
  createTodo: () => {},
  handleOnDragEnd: () => {},
});

export const TodoProvider = (props: { children: any }) => {
  const [todos, setTodos] = useState<ITodo[]>(InitialValues);
  // const [state, dispatch] = useReducer(reducer, InitialValues);
  return (
    <TodoContext.Provider
      value={{
        todos,
        deleteTodo: (id: number) => {
          const newTodos = [...todos];
          const index = newTodos.findIndex((t) => t.id === id);

          newTodos.splice(index, 1);
          setTodos(newTodos);
        },
        completeTodo: (id: number) => {
          const newTodos = [...todos];
          const index = newTodos.findIndex((t) => t.id === id);

          newTodos[index].completed = !newTodos[index].completed;
          setTodos(newTodos);
        },
        createTodo: (id: number, content: string) => {
          const newTodo = {
            id,
            content,
            completed: false,
            date: new Date(Date.now()),
          };
          const newTodos = [...todos, newTodo];
          setTodos(newTodos);
        },
        handleOnDragEnd: (res: DropResult) => {
          if (!res.destination) return;

          const newTodos = [...todos];
          const [reorderedTodos] = newTodos.splice(res.source.index, 1);
          newTodos.splice(res.destination.index, 0, reorderedTodos);
        
          setTodos(newTodos);
        }
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

// import React, {
//   Reducer,
//   useState,
//   createContext,
//   useReducer,
//   useContext,
// } from "react";
// // import { InitialValues } from "./utils/InitialValues";

// export interface ITodo {
//   id: number;
//   content: string;
//   completed: boolean;
//   date: Date;
// }

// interface ITodos extends Array<ITodo> {
//   todos: ITodo[];
// }

// type State = {
//   todos: ITodos;
// };

// type DeleteTodo = {
//   readonly type: "DeleteTodo";
//   readonly payload: ITodo;
// };

// type CompleteTodo = {
//   readonly type: "CompleteTodo";
//   readonly payload: ITodo;
// };

// type Action =  
//  | DeleteTodo 
//  | CompleteTodo



// const InitialValues = {
//   todos: [],
//   DeleteTodo: () => {},
//   CompleteTodo: () => {}
// }

// // function reducer(state: State, action:Action)  {
// export const reducer: Reducer<State, Action> = (state, action): State => {
//   switch (action.type) {
//     case 'DeleteTodo': {
//       const newTodos = { ...state.todos };
//       const { id } = action.payload;
//       newTodos.filter((t) => t.id !== id);
//       return { ...(state.todos = newTodos) };
//     }
//     case 'CompleteTodo': 
//     {
//       const newTodos = { ...state.todos };
//       const { id } = action.payload;
//       const index = newTodos.findIndex((t) => t.id === id);
//       newTodos[index].completed = !newTodos[index].completed;
//       return { ...(state.todos = newTodos) };
//     }
//     default:
//       return state;
//   }
// };

// type ITodoContext = {
//   todos: ITodos;
//   DeleteTodo: () => void;
//   CompleteTodo: () => void;
// };

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
