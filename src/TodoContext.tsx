import React, { useState, createContext } from "react";

const initialValues = [
  {
    id: 1,
    content: "learn about react hooks",
    completed: false,
    date: new Date("1988-03-21"),
  },
  {
    id: 2,
    content: "take out the trash",
    completed: true,
    date: new Date("1994-02-18"),
  },
  {
    id: 3,
    content: "wash the dishes",
    completed: false,
    date: new Date("2021-02-28"),
  },
  {
    id: 4,
    content: "endure specific lectures",
    completed: true,
    date: new Date("2011-03-21"),
  },
  { id: 5, content: "sleep", completed: false, date: new Date("2012-03-21") },
  { id: 6, content: "eat", completed: true, date: new Date("2015-12-28") },
  {
    id: 7,
    content: "sleep & eat",
    completed: false,
    date: new Date("2021-01-21"),
  },
];

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
