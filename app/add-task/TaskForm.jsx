"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const TaskForm = () => {
  const supabase = createClient();
  const router = useRouter();
  const [taskName, setTaskName] = useState("");
  const [taskCreated, setTaskCreated] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    try {
      if (taskName.length) {
        const { error } = await supabase
          .from("todos")
          .insert({ task: taskName, user_id: user.id });

        if (error) {
          console.error("Error:", error.message);
        } else {
          setTaskCreated(true);
          router.refresh();
          setTaskName("");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
