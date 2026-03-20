import prisma from "../config/Prisma.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await prisma.note.findMany({
      where: { userId: req.session.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.render("todos", { todos });
  } catch (err) {
    res.status(500).send("Error fetching todos");
  }
};

export const createTodo = async (req, res) => {
  const { title, content } = req.body;
  try {
    await prisma.note.create({
      data: {
        title,
        content,
        status: "pending",
        slug: `todo-${Date.now()}`,
        userId: req.session.user.id,
      },
    });
    res.redirect("/todos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating todo");
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.note.delete({
      where: { id: parseInt(id) },
    });
    res.redirect("/todos");
  } catch (err) {
    res.status(500).send("Error deleting todo");
  }
};
