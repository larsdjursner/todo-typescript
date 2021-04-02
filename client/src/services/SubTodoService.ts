export async function getTodos() {
    fetch("http://localhost:3001/subtodos").then((data) => data.json())
}


export async function AddSubTodo(content: string, parentId: number) {
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