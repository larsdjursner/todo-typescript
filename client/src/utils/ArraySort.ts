import { ISubTodo, ITodo } from "../state";

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
} 

export const SubRankSort = (subTodos: ISubTodo[] ) => {
    subTodos.sort((a: ISubTodo, b: ISubTodo) => {
        if (a.rank < b.rank) {
          return -1;
        }
        if (a.rank > b.rank) {
          return 1;
        }
        return 0;
      });
    return subTodos;
} 