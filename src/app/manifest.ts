import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ACC Control Center",
    short_name: "ACC",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#4f46e5",
    icons: [],
  };
}
