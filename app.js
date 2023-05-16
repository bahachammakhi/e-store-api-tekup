import express from "express";
import usersRouter from "./routes/users.router.js";
import ordersRouter from "./routes/orders.router.js";
import itemsRouter from "./routes/items.router.js";
import cors from "cors";
import authController from "./controllers/auth.controller.js";

const app = express();

app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/auth", usersRouter);
app.use("/api/v1/items", authController.protect, itemsRouter);

app.use("/api/v1/orders", authController.protect, ordersRouter);

export default app;
