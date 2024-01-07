import * as Joi from "joi";
import { user } from "../interfaces/user";

export const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be minimum 8 characters long, should contain one uppercase letter,one lowercase letter,one number and a special character.",
    }),
});