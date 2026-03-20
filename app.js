import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import { engine } from "express-handlebars";
import "dotenv/config";

import authRoutes from "./routes/AuthRoutes.js";
import todoRoutes from "./routes/TodoRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup handlebars
app.engine("handlebars", engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// setup encryption
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// setup routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

// setup server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
