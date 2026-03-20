import express from "express";
import { body } from "express-validator";
import {
  showRegister,
  showLogin,
  register,
  login,
  logout,
} from "../controllers/AuthController.js";
import { validate } from "../middlewares/ValidationMiddleware.js";
import { isGuest } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// VALIDATION RULES
const registerValidation = [
  body("email").isEmail().withMessage("Email tidak valid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password minimal 5 karakter"),
];

const loginValidation = [body("email").isEmail(), body("password").notEmpty()];

// ROUTES
router.get("/register", isGuest, showRegister);
router.post("/register", registerValidation, validate, register);

router.get("/login", isGuest, showLogin);
router.post("/login", loginValidation, validate, login);

router.post("/logout", logout);

export default router;
