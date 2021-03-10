import { Context } from "node:vm";
import { ITodo } from "../state";

export const InitialValues: Array<ITodo> = [
  {
    id: 0,
    content: "sleep & eat",
    completed: false,
    date: new Date("2021-01-21"),
    subTodos: [
      {
        parentId: 0,
        id: 0,
        content: "brush teeth",
        completed: false
      },
      {
        parentId: 0,
        id: 1,
        content: "eat something",
        completed: false
      },
    ],
  },
  {
    id: 1,
    content: "learn about react hooks",
    completed: false,
    date: new Date("1988-03-21"),
    subTodos: [],
  },
  {
    id: 2,
    content: "take out the trash",
    completed: true,
    date: new Date("1994-02-18"),
    subTodos: [],
  },
  {
    id: 3,
    content: "wash the dishes",
    completed: false,
    date: new Date("2021-02-28"),
    subTodos: [],
  },
  {
    id: 4,
    content: "endure specific lectures",
    completed: true,
    date: new Date("2011-03-21"),
    subTodos: [],
  },
  {
    id: 5,
    content: "sleep",
    completed: false,
    date: new Date("2012-03-21"),
    subTodos: [],
  },
  {
    id: 6,
    content: "eat",
    completed: true,
    date: new Date("2015-12-28"),
    subTodos: [],
  },
];
