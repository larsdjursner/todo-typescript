import { ITodo } from "../state";

export const InitialTodos: Array<ITodo> = [
  {
    id: 0,
    parentId: null,
    content: "sleep & eat",
    completed: false,
    date: new Date("2021-01-21"),
  },
  {
    id: 1,
    parentId: null,
    content: "learn about react hooks",
    completed: false,
    date: new Date("1988-03-21"),
  },
  {
    id: 2,
    parentId: null,
    content: "take out the trash",
    completed: true,
    date: new Date("1994-02-18"),
  },
  {
    id: 3,
    parentId: null,
    content: "wash the dishes",
    completed: false,
    date: new Date("2021-02-28"),
  },
  {
    id: 4,
    parentId: null,
    content: "endure specific lectures",
    completed: true,
    date: new Date("2011-03-21"),
  },
  {
    id: 5,
    parentId: null,
    content: "sleep",
    completed: false,
    date: new Date("2012-03-21"),
  },
  {
    id: 6,
    parentId: null,
    content: "eat",
    completed: true,
    date: new Date("2015-12-28"),
  },
];

export const InitialSubTodos: Array<ITodo> = [
  {
    id: 600,
    parentId: 0,
    content: "learn about react hooks",
    completed: false,
    date: new Date(Date.now()),
  },
  {
    id: 601,
    parentId: 0,
    content: "do the thingie",
    completed: false,
    date: new Date(Date.now()),
  },
  {
    id: 602,
    parentId: 1,
    content: "scrub the floor",
    completed: false,
    date: new Date(Date.now()),
  },
];
