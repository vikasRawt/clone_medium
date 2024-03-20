import { Hono } from "hono";
import api from "./Routes/routes";
import { verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.route("/api", api);

app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("authorization");
  if (!jwt) {
    c.status(400);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set('userId',payload.id);
  await next()
});

export default app;
