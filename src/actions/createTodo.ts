"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { Todo } from "../components/ToDoList";

interface PreviousState {
  message: string;
}

const schema = z.object({
  todo: z.string(),
});

export async function createTodo(prevState: any, formData: FormData) {
  try {
    const { todo } = schema.parse({ todo: formData.get("todo") });
    console.log("todo", todo);
    if (todo === "") {
      return { success: false, message: "Please enter a task." };
    } else {
      const { rows: todos }: { rows: Todo[] } =
        await sql`INSERT INTO todos (title) VALUES (${todo}) RETURNING *`;

      revalidatePath("/");
      return { success: true, message: `${todo} created.`, data: todos };
    }
  } catch (error) {
    return { message: (error as Error).message };
  }
}
