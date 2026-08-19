import {
  Activity,
  Gauge,
  KeyRound,
  LockKeyhole,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const navigationItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/security", label: "Security", icon: ShieldCheck },
  { href: "/devices", label: "Devices", icon: LockKeyhole },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/password-managers", label: "Vaults", icon: KeyRound },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
];
