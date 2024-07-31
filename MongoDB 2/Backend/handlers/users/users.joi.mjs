import Joi from "joi";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/;

export const UserLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const UserSignup = Joi.object({
    firstName: Joi.string().min(3).max(15).required().alphanum(),
    lastName: Joi.string().min(3).max(15).required().alphanum(),    
    email: Joi.string().email().required(),
    phone: Joi.string().required().min(9).max(15).regex(/^[0-9]+$/),
    password: Joi.string().regex(passwordRegex).required(),
});