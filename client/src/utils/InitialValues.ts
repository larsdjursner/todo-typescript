import { ISubTodo, ITodo } from "../state";

export const InitialTodos: Array<ITodo> = [
  {
    id: 0,
    content: "sleep & eat",
    completed: false,
    date: new Date("2021-01-21"),
  },
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
  {
    id: 5,
    content: "sleep",
    completed: false,
    date: new Date("2012-03-21"),
  },
  {
    id: 6,
    content: "eat",
    completed: true,
    date: new Date("2015-12-28"),
  },
];

// export const InitialSubTodos: Array<ISubTodo> = [
//   {
//     id: 600,
//     parent: 
//     parentId: 0,
//     content: "learn about react hooks",
//     completed: false,
//     date: new Date(Date.now()),
//   },
//   {
//     id: 601,
//     parentId: 0,
//     content: "do the thingie",
//     completed: false,
//     date: new Date(Date.now()),
//   },
//   {
//     id: 602,
//     parentId: 1,
//     content: "scrub the floor",
//     completed: false,
//     date: new Date(Date.now()),
//   },
// ];
