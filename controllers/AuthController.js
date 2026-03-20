import prisma from "../config/Prisma.js";
import bcrypt from "bcrypt";

// REGISTER PAGE
export const showRegister = (req, res) => {
  res.render("auth/register");
};

// LOGIN PAGE
export const showLogin = (req, res) => {
  res.render("auth/login");
};

// REGISTER PROCESS
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.render("auth/register", {
        error: "Email sudah terdaftar",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    });

    req.session.user = {
      id: user.id,
      email: user.email,
    };

    res.redirect("/todos");
  } catch (err) {
    console.error(err);
    res.send("Internal Server Error");
  }
};

// LOGIN PROCESS
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.render("auth/login", {
        error: "Email atau password salah",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.render("auth/login", {
        error: "Email atau password salah",
      });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
    };

    res.redirect("/todos");
  } catch (err) {
    console.error(err);
    res.send("Internal Server Error");
  }
};

// LOGOUT
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
