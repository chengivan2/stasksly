import React from "react";
import Taskform from "../add-task/TaskForm";
import Todos from "../todos/Todos";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    revalidatePath("/dashboard");
  }

  return (
    <div>
      {
      user?
      <>
      <Taskform />
      <Todos />
      </>:
      <p>You have to <u><Link href="/siflow">Log in</Link></u></p>
      }
      
    </div>
  );
}
