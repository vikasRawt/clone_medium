import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@neko_vicky/common";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_secret: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const payload = {
      id: user.id,
    };
    const token = await sign(payload, c.env.JWT_secret);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    console.log(e);
    c.status(500); // Set appropriate status code for internal server error
    return c.json({
      message: "An error occurred while signing up the user.",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const success = signinInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "wrong credentials",
    });
  }
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

export default userRouter;
