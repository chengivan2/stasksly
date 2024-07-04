"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const TodoItem = ({ todo }) => {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id) => {
    try {
      const response = await supabase.from("todos").delete().eq("id", id);
      router.refresh();
    } catch (error) {
      console.error("There was an error, ", error);
    }
  };

  return (
    <div>
      <span>{todo.task}</span>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
