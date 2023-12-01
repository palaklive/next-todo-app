import ToDoList from "@/components/ToDoList";
import AddToDo from "@/components/AddToDo";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="m-4">
      <AddToDo />
      <hr className="my-4 border-700" />
      <Suspense fallback={<div>Loading...</div>}>
        <ToDoList />
      </Suspense>
    </main>
  );
}
