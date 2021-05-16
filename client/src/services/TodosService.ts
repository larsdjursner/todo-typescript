import { ITodo } from "../common/types";

const APIRoute = "http://localhost:3001";

//refactor
//auth and user -> move to userservice.ts
export async function SignUpAPI(name: string, email: string, password: string) {
  try {
    const req = await fetch(`${APIRoute}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return req.json();
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

    return req.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export const ChangePasswordAPI = async (userId: number, password: string, newPassword: string) => {
  try {
    console.log("inside changepasswordapi")
    console.log(password, newPassword);
    const req = await fetch(`${APIRoute}/auth/changepassword/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
      body: JSON.stringify({ password, newPassword }),
    });
    return req.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export const isAuth = async () => {
  try {
    const req = await fetch(`${APIRoute}/auth/verify`, {
      method: "POST",
      headers: {
        token: localStorage.token,
      },
    });
    return await req.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function DeleteAccount(userId: number) {
  await fetch(`${APIRoute}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export const ChangeDetails = async (
  userId: number,
  name: string,
  email: string
) => {
  await fetch(`${APIRoute}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
    body: JSON.stringify({ name, email }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

//todos
export const getTodos = async () => {
  return await fetch(`${APIRoute}/todos`, {
    method: "GET",
    headers: {
      token: localStorage.token,
    },
  }).then((data) => data.json());
};

export async function AddTodo(content: string, userId: number) {
  await fetch(`${APIRoute}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
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
  await fetch(`${APIRoute}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
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

export async function UpdateDateTodo(id: number, date: Date) {
  await fetch(`${APIRoute}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
    body: JSON.stringify({ date }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function UpdateNameTodo(id: number, content: string) {
  await fetch(`${APIRoute}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
    body: JSON.stringify({ content }),
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
  await fetch(`${APIRoute}/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: localStorage.token },
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
  fetch(`${APIRoute}/subtodos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
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
  fetch(`${APIRoute}/subtodos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
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
  fetch(`${APIRoute}/subtodos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", token: localStorage.token },
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
  fetch(`${APIRoute}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
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
  userId: number,
  todos: ITodo[],
  src: number,
  dest: number
): ITodo[] => {
  const newTodos = [...todos];
  const [reorderedTodos] = newTodos.splice(src, 1);
  newTodos.splice(dest, 0, reorderedTodos);
  let i = userId * 1000;
  //hacky solution so far, optimizations are due
  newTodos.forEach((t) => ReorderTodo(t.id, i++));

  return newTodos;
};
