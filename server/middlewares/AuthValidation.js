import Joi from "joi";

export const signupValidation = (req, res, next) => {
  // Define the validation schema
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .trim()
      .required()
      .messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 50 characters",
      }),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org"] } }) // Restrict to common TLDs
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Please enter a valid email address",
      }),
      password: Joi.string()
      .min(6)
      .max(30)
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]+$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must not exceed 30 characters",
        "string.pattern.base":
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @$!%*?&-_).",
      }),
    
  });
  
  // Validate the request body
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  // If validation fails, return an array of error messages
  if (error) {
    const errors = error.details.map((err) => ({
      field: err.context.key,
      message: err.message,
    }));
    return res.status(400).json({ errors }); // Respond with error details
  }

  next(); // If validation succeeds, proceed
};


// Password Validation Requirements (Concise):

// Required Characters:
// At least 1 uppercase letter (A-Z)
// At least 1 lowercase letter (a-z)
// At least 1 digit (0-9)
// At least 1 special character: @, $, !, %, *, ?, &, -, _

// Length Constraints:
// Minimum: 6 characters
// Maximum: 30 characters

// Restrictions:
// No spaces allowed
// Only letters, digits, and allowed special characters.



export const loginValidation = (req, res, next) => {
  // Define the validation schema
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org"] } }) // Restrict to common TLDs
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Please enter a valid email address",
      }),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must not exceed 30 characters",
      }),
  });

  // Validate the request body
  const { error } = schema.validate(req.body, { abortEarly: false });

  // If validation fails, return an array of error messages
  if (error) {
    const errors = error.details.map((err) => ({
      field: err.context.key,
      message: err.message,
    }));
    return res.status(400).json({ errors }); // Respond with error details
  }

  next(); // If validation succeeds, proceed
};

