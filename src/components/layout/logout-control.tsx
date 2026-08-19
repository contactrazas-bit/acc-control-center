"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth/logout";

export function LogoutControl() {
  const router = useRouter();

  async function onLogout() {
    await logout();
    router.replace("/login");
    router.refresh();
  }

  return (
    <Button aria-label="Log out" title="Log out" variant="ghost" onClick={onLogout}>
      <LogOut aria-hidden size={18} />
    </Button>
  );
}
