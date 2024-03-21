import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_secret: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoutes.use("*", async (c, next) => {
  const authHeader = c.req.header("authorization");
  if (!authHeader) {
    c.status(400);
    return c.json({ error: "unauthorized" });
  }
  const payload = await verify(authHeader, c.env.JWT_secret);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", payload.id);
  await next();
});

blogRoutes.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("userId");

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRoutes.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: post.id,
  });
});


blogRoutes.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const post = prisma.post.findMany({});
  
    return c.json({
      post,
    });
  });

blogRoutes.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  const post = await prisma.post.findFirst({
    where: {
      id:id,
    },
  });
  return c.json({
    post,
  });
});



export default blogRoutes;
