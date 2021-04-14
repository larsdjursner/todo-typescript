import { ISubTodo, ITodo } from "../state";

const APIRoute = "http://localhost:3001";

//refactor
//auth
export async function SignUpAPI(name: string, email: string, password: string) {
  try {
    const req = await fetch(`${APIRoute}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const res = await req.json();
    localStorage.setItem("token", res.token);
    return res.token;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function SignInAPI(email: string, password: string) {
  try {
    const req = await fetch(`${APIRoute}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const res = await req.json();
    localStorage.setItem("token", res.token);
    return res.token;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const getName = async () => {
  try {
    const req = await fetch(`${APIRoute}/users/`, {
      method: "POST",
      headers: { token: localStorage.token },
    });

    const res = await req.json();
    return res;
  } catch (error) {
    console.error("Error:", error);
  }

};

//todos
export async function getTodos() {
  return await Promise.all([
    fetch(`${APIRoute}/todos`).then((data) => data.json()),
    fetch(`${APIRoute}/subtodos`).then((data) => data.json()),
  ]);
}

export async function AddTodo(content: string, userId: number | undefined) {
  fetch(`${APIRoute}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, userId }),
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
  fetch(`${APIRoute}/todos/${id}`, {
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

export async function DeleteTodo(id: number) {
  fetch(`${APIRoute}/todos/${id}`, {
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

export async function AddSubTodo(
  content: string,
  parentId: number | undefined
) {
  fetch(`${APIRoute}/todos/subtodos`, {
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
  fetch(`${APIRoute}/todos/subtodos/${id}`, {
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
  fetch(`${APIRoute}/todos/subtodos/${id}`, {
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
  fetch(`${APIRoute}/todos/todos/${id}`, {
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

export const reorderTodos = (
  todos: ITodo[],
  src: number,
  dest: number
): ITodo[] => {
  const newTodos = [...todos];
  const [reorderedTodos] = newTodos.splice(src, 1);
  newTodos.splice(dest, 0, reorderedTodos);
  let i = 1;
  //hacky solution so far, optimizations are due
  newTodos.forEach((t) => ReorderTodo(t.id, i++));

  return newTodos;
};
