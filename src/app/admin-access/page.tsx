import { redirect } from "next/navigation";

export default function AdminAccessRootPage() {
  redirect("/admin-access/login");
}
