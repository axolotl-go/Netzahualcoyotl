import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  if (url.pathname.startsWith("/contact")) {
    const token = cookies.get("token")?.value;

    // Si no hay token, redirigir sin hacer fetch
    if (!token) {
      return redirect("/");
    }

    try {
      const response = await fetch(`http://localhost:8080/api/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        cookies.delete("token");
        return redirect("/");
      }
    } catch (error) {
      console.error("Auth verification failed:", error);
      return redirect("/");
    }
  }

  return next();
});
