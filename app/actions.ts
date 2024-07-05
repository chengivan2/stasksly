import { redirect } from 'next/navigation'

export async function loggedin() {
  redirect("/dashboard")
}
