import { NextFunction, Request, Response } from "express";
import { body, query, validationResult, ValidationChain } from "express-validator";

export const validationRules: ValidationChain[] = [
    query('city')
        .notEmpty()
        .withMessage('Le paramètre city est requis')
        .isString()
        .withMessage('Le paramètre city doit être une string')
        .isAlpha()
        .withMessage('Le nom de ville contient des caractères non valides')
        .escape()
]

export const validateRules = (req : Request, res : Response, next : NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
        errors: errors.array().map((err:any) => ({
            message: err.msg,
            param: err.param,
            value: err.value
        }))
    })
  }

  next();
}