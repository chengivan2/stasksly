import React from "react";
import Taskform from "../add-task/TaskForm";
import Todos from "../todos/Todos";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/siflow");
  }

  return (
    <div>
      <Taskform />
      <Todos />
    </div>
  );
}
