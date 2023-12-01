import { sql } from "@vercel/postgres";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function getTodos() {
  const todos = await fetch("http://localhost:3000/api/get-todos");
  if (!todos.ok) {
    throw new Error("Failed to fetch todos");
  }
  return todos.json();
}

export default async function ToDoList() {
  const todos: Todo[] = await getTodos();
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
