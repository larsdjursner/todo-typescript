export interface ITodo {
    id: number;
    content: string;
    completed: boolean;
    date: Date;
    userId: string | undefined;
    rank: number;
  }
  
  export interface ISubTodo {
    id: number;
    content: string;
    completed: boolean;
    date: Date;
    parent: ITodo | undefined;
    parentId: number;
    rank: number;
  }
  
  export interface IUser  {
    id: number;
    email: string;
    todos: ITodo[];
    name: string;
  }
  
  export interface Context {
    user: IUser;
    isAuthenticated: boolean;
    todos: ITodo[];
    subTodos: ISubTodo[];
    refresh: Boolean;
  }