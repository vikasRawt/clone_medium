import { Hono } from "hono";
import userRouter from "./Routes/UserRoutes";
import blogRoutes from "./Routes/BlogRoutes";
import { cors } from "hono/cors";

const app = new Hono();
app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRoutes);


export default app;
