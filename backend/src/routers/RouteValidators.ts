import Validator, { Rules } from "validatorjs";
import APIError from "../Errors/ApiError";
import { HttpStatusCode, UserJWTData } from "../models";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import UsersController from "../controllers/UsersController";

//
export default class RouteValidator {
  static async validateRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const rules: Rules = {
      name: "required",
      surname: "required",
      email: "required|email",
      password: "required|min:6",
    };
    const validator = new Validator(req.body, rules);
    if (validator.fails()) {
      throw new APIError(
        "FAILED",
        HttpStatusCode.BAD_REQUEST,
        false,
        `Route validator error at ${req.url}`,
        validator.errors.all()
      );
    }
    next();
  }

  static async validateLogin(req: Request, res: Response, next: NextFunction) {
    const rules: Rules = {
      email: "required|email",
      password: "required|min:6",
    };

    const validator = new Validator(req.body, rules);
    if (validator.fails()) {
      throw new APIError(
        "FAILED",
        HttpStatusCode.BAD_REQUEST,
        false,
        `Route validator error at ${req.url}`,
        validator.errors.all()
      );
    }
    next();
  }

  static authenticateUser(prisma: PrismaClient) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new APIError(
          "FAILED",
          HttpStatusCode.UNAUTHORIZED,
          false,
          `Route validator error at ${req.url}. Token not provided`
        );
      }
      // const data = jwt.verify(
      //   token,
      //   process.env.JSON_WEB_SECRET as string
      // ) as UserJWTData;
      // const userController = new UsersController(prisma);
      // if (!data) {
      //   throw new APIError(
      //     "FAILED",
      //     HttpStatusCode.UNAUTHORIZED,
      //     false,
      //     `Route validator error at ${req.url}. Token Expired`
      //   );
      // }
      // const user = await userController.getActiveUser(data.userId, data.email);
      // if (!user) {
      //   throw new APIError(
      //     "FAILED",
      //     HttpStatusCode.UNAUTHORIZED,
      //     false,
      //     `Route validator error at ${req.url}. No user found.`
      //   );
      // }
      req.userId = token;
      next();
    };
  }
}
