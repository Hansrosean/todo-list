export const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("auth/login");
  }
  next();
};

export const isGuest = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/todos");
  }
  next();
};
