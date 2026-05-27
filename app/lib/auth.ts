import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";

export function getSession() {
  return getServerSession(nextAuthOptions);
}
