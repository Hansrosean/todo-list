import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
} from "../controllers/TodoController.js";
import { isAuthenticated } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getTodos);
router.post("/add", isAuthenticated, createTodo);
router.post("/delete/:id", isAuthenticated, deleteTodo);

export default router;
