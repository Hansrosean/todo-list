import { validationResult } from "express-validator";

// setup validation middlewar (reusable)
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};
