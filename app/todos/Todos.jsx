import { createClient } from "@/utils/supabase/server";
import TodoItem from "./TodoItem"

export default async function Todos() {
  const supabase = createClient();
  const { data: todos } = await supabase.from("todos").select();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h4>Hello, {user?.user_metadata["first_name"]}</h4>
      <div>
        <div>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <TodoItem key={todo.id} todo={todo} />
          </div>
        ))}
    </div>
      </div>
    </div>
  );
}
