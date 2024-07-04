import { revalidateTag } from "next/cache";

export default async function revalidateTodos() {
  revalidateTag("/todos/Todos.jsx");
}
