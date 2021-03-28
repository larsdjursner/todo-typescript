import { ISubTodo, ITodo } from "../state";

export async function getTodos() {
  return await Promise.all([
    fetch("http://localhost:3001/todos").then((data) => data.json()),
    fetch("http://localhost:3001/subtodos").then((data) => data.json()),
  ]);
}

export async function AddTodo(content: string, userId: number | undefined) {
  fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, userId}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function CompleteTodo(id: number, completed: boolean) {
  fetch(`http://localhost:3001/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
    // body: JSON.parse({ completed })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function DeleteTodo(id: number) {
  fetch(`http://localhost:3001/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function AddSubTodo(content: string, parentId: number | undefined) {
  fetch("http://localhost:3001/subtodos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, parentId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


export async function CompleteSubTodo(id: number, completed: boolean) {
  fetch(`http://localhost:3001/subtodos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function DeleteSubTodo(id: number) {
  fetch(`http://localhost:3001/subtodos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function ReorderTodo(id: number, rank: number) {
  fetch(`http://localhost:3001/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rank }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


export const reorderTodos = (todos: ITodo[], src: number, dest: number): ITodo[] => {
  const newTodos = [...todos];
  const [reorderedTodos] = newTodos.splice(src, 1);
  newTodos.splice(dest, 0, reorderedTodos);
  let i = 1;

  newTodos.forEach(t => ReorderTodo(t.id, i++))

  return newTodos;
};

export const completeAllTodos = (todos: ITodo[]): ITodo[] => {
  const newTodos = [...todos];
  newTodos.map((t) => (t.completed = true));
  return newTodos;
};

export const completeSubTodos = (todos: ISubTodo[]): ISubTodo[] => {
  const newTodos = [...todos];
  newTodos.map((t) => (t.completed = true));
  return newTodos;
};