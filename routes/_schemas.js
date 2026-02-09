const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(72).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(72).required()
});

const updateProfileSchema = Joi.object({
  username: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).max(72).optional()
}).min(1);

const createPlaylistSchema = Joi.object({
  name: Joi.string().max(80).required(),
  description: Joi.string().max(300).allow("").optional(),
  songs: Joi.array().items(Joi.string().hex().length(24)).default([])
});

const updatePlaylistSchema = Joi.object({
  name: Joi.string().max(80).optional(),
  description: Joi.string().max(300).allow("").optional(),
  songs: Joi.array().items(Joi.string().hex().length(24)).optional()
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  createPlaylistSchema,
  updatePlaylistSchema
};
