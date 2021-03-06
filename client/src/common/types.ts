export interface ITodo {
  id: number;
  content: string;
  completed: boolean;
  date: string;
  userId: string | undefined;
  rank: number;
  subtodos: ISubTodo[];
}

export interface ISubTodo {
  id: number;
  content: string;
  completed: boolean;
  date: string;
  parent: ITodo | undefined;
  parentId: number;
  rank: number;
}

export interface IUser {
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
  loaded: Boolean;
}

export interface IModal {
  id: number;
}

export interface IDeleteModal extends IModal {
  deleteUser(): void;
}

export enum DetailsType {
  Name = "Name",
  Email ="Email",
  Password = "Password"
}
export interface IChangeModal extends IModal {
  detailsType : DetailsType
}
export interface IDatePicker {
  id: number;
  date: Date;
  updateDate: (date: Date) => void;
}

export interface IEditableTextField {
  initialContent: string;
  id: number;
}
