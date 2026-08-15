import express from "express";
import swaggerUi from "swagger-ui-express";
import postsRouter from "./routes/posts";
import { swaggerSpec } from "./swagger";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://frontdev-testing.click",
    ],
}));

app.get("/health", (_req, res) => res.status(200).send('ok'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/posts", postsRouter);

export default app;
