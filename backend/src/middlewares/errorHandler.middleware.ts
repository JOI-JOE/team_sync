import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { z, ZodError } from "zod";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    // error.issues[0].path === ['user', 'profile', 'name']
    // "path": ["user", "profile", "name"]
    // "field": "user.profile.name"
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.error(`Error Occured on Path ${req.path}`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check your request",
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknow error occurred",
  });
};
