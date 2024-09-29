import { Context } from "hono";

export const protectAdmin = async (c: Context, next: Function) => {
  try {
    const user = c.get("user");

    console.log(user);
    if (user.admin) {
      await next();
      return;
    }
    return c.text("Unauthorized", 401);
  } catch (error) {
    return c.text("Unauthorized", 401);
  }
};
