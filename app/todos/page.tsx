import { createClient } from '@/utils/supabase/server';

export default async function Todos() {
  const supabase = createClient();
  const { data: todos } = await supabase.from("todos").select();
  

  return <div>
    <p>{todos && todos[0]["task"]}</p>
  </div>
}