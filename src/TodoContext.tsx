import React, {
	useState,
	createContext,
} from "react";



const initialValues = [
	{ id: 1, content: "learn about react hooks", completed: false, date: new Date('1988-03-21'), },
	{ id: 2, content: "add more functionality", completed: true, date: new Date('1994-02-18') },
	{ id: 3, content: "add more functionality", completed: false, date: new Date('2021-02-28') },
	{ id: 4, content: "add more functionality", completed: true, date: new Date('2011-03-21') },
	{ id: 5, content: "add more functionality", completed: false, date: new Date('2012-03-21') },
	{ id: 6, content: "add more functionality", completed: true, date: new Date('2015-12-28')},
	{ id: 7, content: "add more functionality", completed: false, date: new Date('2021-01-21')},
]


export interface ITodo {
	id: number;
	content: string;
	completed: boolean;
	date: Date;
}


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
