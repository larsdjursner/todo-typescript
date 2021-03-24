export async function getTodos() {
  return await Promise.all([
    fetch("http://localhost:3001/todos").then((data) => data.json()),
    fetch("http://localhost:3001/subtodos").then((data) => data.json()),
  ]);
}

export function AddTodo(content: string, userId: number | undefined) {
  fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export function CompleteTodo(id: number, completed: boolean) {
  fetch(`http://localhost:3001/todos/${id}`, {
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

export function DeleteTodo(id: number) {
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

export function AddSubTodo(content: string, parentId: number | undefined) {
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
