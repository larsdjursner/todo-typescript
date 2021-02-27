import React, {
	useState,
	createContext,
	SetStateAction,
	Dispatch,
} from "react";

const initialValues = [
	{ id: 1, content: "learn about react hooks", completed: false },
	{ id: 2, content: "add more functionality", completed: true },
	{ id: 3, content: "add more functionality", completed: false },
	{ id: 4, content: "add more functionality", completed: true },
	{ id: 5, content: "add more functionality", completed: false },
	{ id: 6, content: "add more functionality", completed: true },
	{ id: 7, content: "add more functionality", completed: false },
]


type ITodo = {
	id: number;
	content: string;
	completed: boolean;
};

type ITodoContext = [ITodo[], React.Dispatch<React.SetStateAction<ITodo[]>>];

export const TodoContext = createContext<ITodoContext>([[], () => null]);

export const TodoProvider = (props: { children: any }) => {
	const [todos, setTodos] = useState<ITodo[]>(initialValues);
	return (
		<TodoContext.Provider value={[todos, setTodos]}>
			{props.children}
		</TodoContext.Provider>
	);
};

;

// type TodoState = {
//     id: number,
//     content: string,
//     completed: boolean,
// }

// type TodoDispatch = (setTodos:Dispatch<SetStateAction<TodoState[]>>) => void

// type TodoProviderProps = {children: React.ReactNode}

// const TodoStateContext  = createContext<TodoState[] | undefined>(undefined);

// const TodoDispatchContext = React.createContext<TodoDispatch[] | undefined>(undefined);

// export const TodoProvider = (props: TodoProviderProps) => {
//     const [todos, setTodos] = useState(initialValues);

//     return (
//         <TodoStateContext.Provider value={todos}>
//             <TodoDispatchContext.Provider value={setTodos}>
//                 {props.children}
//             </TodoDispatchContext.Provider>
//         </TodoStateContext.Provider>
//     )
// };

// { id: 2, content: "add more functionality", completed: true },
// { id: 3, content: "add more functionality", completed: false },
// { id: 4, content: "add more functionality", completed: true },
// { id: 5, content: "add more functionality", completed: false },
// { id: 6, content: "add more functionality", completed: true },
// { id: 7, content: "add more functionality", completed: false },

// const initialContext : ITodoCtx = {
//     id: -1,
//     content: '',
//     completed: false,
//     setTodos: (): void => {}
// }
