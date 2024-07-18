import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("addressLine1 must be string"),
  body("city").isString().notEmpty().withMessage("city must be string"),
  body("country").isString().notEmpty().withMessage("country must be string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("city  is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("deliveryPrice is required"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("estimatedDeliveryTime is required"),
  body("cuisines")
    .isArray()
    .withMessage("cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("cuisines must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("price is required"),
  handleValidationErrors,
];
