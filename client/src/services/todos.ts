export function getTodos() {
  return fetch("http://localhost:3001/todos").then((data) => data.json());
}
