import * as Joi from 'joi';

export const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
    )
    .required(),
});
export default schema;
