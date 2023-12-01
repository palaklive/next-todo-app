import { Todo } from "@/app/components/ToDoList";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(request: Request) {
  const { rows: todos }: { rows: Todo[] } = await sql`SELECT * FROM todos`;
  return Response.json(todos);
}
