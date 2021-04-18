import { ISubTodo, ITodo } from "../common/types";


export const RankSort = (todos: ITodo[] ) => {
  todos.sort((a: ITodo, b: ITodo) => {
    if (a.rank < b.rank) {
      return -1;
    }
    if (a.rank > b.rank) {
      return 1;
    }
    return 0;
  });
  return todos;
};

export const SubRankSort = (todos: ISubTodo[] ) => {
  todos.sort((a: ISubTodo, b: ISubTodo) => {
    if (a.rank < b.rank) {
      return -1;
    }
    if (a.rank > b.rank) {
      return 1;
    }
    return 0;
  });
  return todos;
};

