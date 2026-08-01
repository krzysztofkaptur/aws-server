import express from "express";
import swaggerUi from "swagger-ui-express";
import postsRouter from "./routes/posts";
import { swaggerSpec } from "./swagger";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => res.status(200).send('ok'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/posts", postsRouter);

export default app;
