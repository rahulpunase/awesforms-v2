import { Request, Response } from "express";
import { HttpStatusCode } from "../../models";
import { PrismaClient } from "@prisma/client";
import { notAvailableValidate } from "../../utils";
import ExpressRouter from "../ExpressRouter";
import APIError from "../../Errors/ApiError";
import UsersController from "../../controllers/UsersController";
import SessionController from "../../controllers/SessionsController";
import ProfileController from "../../controllers/ProfileController";
import PasswordController from "../../controllers/PasswordController";
import RouteValidator from "../RouteValidators";

class AuthenticateRoute extends ExpressRouter {
  private prisma: PrismaClient = new PrismaClient({
    log: ["query"],
  });

  constructor(middlewares: Array<any>) {
    super("/authenticate", middlewares);
    this.getLoginRoute();
    this.getRegisterRoute();
    this.updatePassword();
    this.userProfile();
  }

  private getLoginRoute(): void {
    this.post("/login", [], async (req: Request, res: Response) => {
      const body = req.body;

      const userController = new UsersController(this.prisma);
      const user = await userController.getUserWithEmail(body.email);

      const profileController = new ProfileController(this.prisma);
      const profile = await profileController.getProfileWithUserId(user.id);

      if (
        Number(profile.password_failure_attempt) ===
        ProfileController.PROFILE_LOCKED_COUNT
      ) {
        throw new APIError(
          "Incorrect info",
          HttpStatusCode.BAD_REQUEST,
          false,
          "Your profile is locked"
        );
      }

      const passwordController = new PasswordController(this.prisma);
      const isPasswordMatched = await passwordController.validatePassword(
        user.id,
        body.password
      );

      if (!isPasswordMatched) {
        const updatedProfile =
          await profileController.increasePasswordFailedAttempt(profile);
        throw new APIError(
          "Incorrect info",
          HttpStatusCode.UNAUTHORIZED,
          false,
          "Incorrect password.",
          { profile_failure_count: updatedProfile?.password_failure_attempt }
        );
      }

      const sessionController = new SessionController(this.prisma);
      const token = await sessionController.createSession(
        user.id,
        user.name ?? "",
        user.surname ?? "",
        body.email,
        "test"
      );
      // on successfully logged in
      await profileController.resetPasswordFailureAttemptToZero(profile);
      res.cookie("srftoken", token);
      res.send({
        data: {
          userId: user.id,
          email: user.email,
          token: token,
        },
        success: true,
      });
    });
  }

  private getRegisterRoute(): void {
    this.post(
      "/register",
      [RouteValidator.validateRegister],
      async (req: Request, res: Response) => {
        const body = req.body;

        const userController = new UsersController(this.prisma);
        const sessionController = new SessionController(this.prisma);
        const profileController = new ProfileController(this.prisma);
        const passwordController = new PasswordController(this.prisma);

        const deviceId = body.deviceId ?? "test";

        const data = await this.prisma.$transaction(async (tx) => {
          const createdUser = await userController.createUser(
            body.name,
            body.surname,
            body.email
          );

          await profileController.createProfile(createdUser.id);

          await passwordController.createPassword(
            createdUser.id,
            body.password
          );

          const token = await sessionController.createSession(
            createdUser.id,
            body.name,
            body.surname,
            body.email,
            deviceId
          );

          return {
            userId: createdUser.id,
            email: createdUser.email,
            token: token,
          };
        });

        res.send({
          data,
          success: true,
        });
      }
    );
  }

  private updatePassword(): void {
    this.post("/update-password", [], async (req: Request, res: Response) => {
      const body = req.body;
      const userController = new UsersController(this.prisma);
      const profileController = new ProfileController(this.prisma);

      const notAvailable = notAvailableValidate(body, [
        "userId",
        "password",
        "passwordCode",
      ]);

      if (notAvailable) {
        throw new APIError(
          "Incorrect info",
          HttpStatusCode.BAD_REQUEST,
          false,
          `Insufficient data ${notAvailable} not provided`
        );
      }
      await this.prisma.$transaction(async (tx) => {
        const user = await userController.getUserWithUserId(body.userId);
        const passwordController = new PasswordController(this.prisma);
        await passwordController.updatePassword(user.id, body.password);
      });

      res.send({
        status: true,
        message: "Successfully updated password!",
      });
    });
  }

  private userProfile(): void {
    this.get(
      "/profile",
      [RouteValidator.authenticateUser(this.prisma)],
      async (req: Request, res: Response) => {
        const profileController = new ProfileController(this.prisma);
        const profile = await profileController.getProfileWithUserId(
          req.user.userId
        );
        res.send({
          profile,
          success: true,
        });
      }
    );
  }
}

export default AuthenticateRoute;
