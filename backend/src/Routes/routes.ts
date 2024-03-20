import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const api = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_secret: string;
  };
}>().basePath("/v1");

api.post("/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  const payload = {
    id: user.id,
  };
  const token = await sign(payload, c.env.JWT_secret);
  return c.json({
    jwt: token,
  });
});
api.post("/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  const jwt = await sign({ id: user?.id }, c.env.JWT_secret);
  return c.json({
    jwt,
  });
});

api.post("/blog", (c) => {
  return c.text("Hello Hono!");
});
api.put("/blog", (c) => {
  return c.text("Hello Hono!");
});
api.get("/blog/:id", (c) => {
  return c.text("Hello Hono!");
});
api.get("/blog/bulk", (c) => {
  return c.text("Hello Hono!");
});

export default api;
