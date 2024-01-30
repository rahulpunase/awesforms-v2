import { PrismaClient } from "@prisma/client";
import ExpressRouter from "../ExpressRouter";
import ProfileController from "../../controllers/ProfileController";
import RouteValidator from "../RouteValidators";
import { NextFunction, Request, Response } from "express";
import FormController from "../../controllers/FormController";
import APIError from "../../Errors/ApiError";
import { HttpStatusCode } from "../../models";

class FormRoute extends ExpressRouter {
  private prisma: PrismaClient = new PrismaClient({
    log: ["query"],
  });

  constructor(middlewares: Array<any>) {
    super("/form", middlewares);
    this.createForm();
    this.getAllForms();
    this.getFormFromId();
    this.updateForm();
    this.getFormForPublicDetails();
  }

  async createForm() {
    this.post(
      "/create",
      [RouteValidator.authenticateUser(this.prisma)],
      async (req: Request, res: Response) => {
        const profileController = new ProfileController(this.prisma);
        const formController = new FormController(this.prisma);
        const profile = await profileController.getProfileFromUserId(
          req.userId
        );

        if (!profile) {
          throw new APIError("Profile", HttpStatusCode.NOT_FOUND);
        }

        const form = await formController.createFormForUser(
          profile?.id,
          req.body
        );

        return res.json({
          success: true,
          form,
        });
      }
    );
  }

  async getAllForms() {
    this.get(
      "/all",
      [RouteValidator.authenticateUser(this.prisma)],
      async (req: Request, res: Response) => {
        const profileController = new ProfileController(this.prisma);
        const profile = await profileController.getProfileFromUserId(
          req.userId
        );
        if (!profile) {
          throw new APIError("Profile", HttpStatusCode.NOT_FOUND);
        }

        const organizationId = req.query.organizationId as string;

        if (!organizationId) {
          throw new APIError(
            "Profile",
            HttpStatusCode.BAD_REQUEST,
            false,
            "Organization id not found"
          );
        }

        const formController = new FormController(this.prisma);

        const formDetails = await formController.getAllForms(
          profile.id,
          organizationId
        );
        return res.json({
          success: true,
          formDetails,
        });
      }
    );
  }

  async getFormFromId() {
    this.get(
      "/get",
      [RouteValidator.authenticateUser(this.prisma)],
      async (req: Request, res: Response) => {
        const profileController = new ProfileController(this.prisma);
        const profile = await profileController.getProfileFromUserId(
          req.userId
        );
        if (!profile) {
          throw new APIError("Profile", HttpStatusCode.NOT_FOUND);
        }

        const organizationId = req.query.organizationId as string;
        const formId = req.query.formId as string;

        if (!organizationId || !formId) {
          throw new APIError(
            "Profile",
            HttpStatusCode.BAD_REQUEST,
            false,
            "Organization or FormId id not found"
          );
        }

        const formController = new FormController(this.prisma);

        const formDetails = await formController.getFormFromFormId(
          profile.id,
          organizationId,
          formId
        );

        if (!formDetails) {
          throw new APIError(
            "No Form Found",
            HttpStatusCode.NOT_FOUND,
            false,
            "No form Found"
          );
        }
        return res.json({
          success: true,
          form: formDetails,
        });
      }
    );
  }

  async updateForm() {
    this.post(
      "/update",
      [RouteValidator.authenticateUser(this.prisma)],
      async (req: Request, res: Response) => {
        const profileController = new ProfileController(this.prisma);
        const formController = new FormController(this.prisma);
        const profile = await profileController.getProfileFromUserId(
          req.userId
        );

        if (!profile) {
          throw new APIError("Profile", HttpStatusCode.NOT_FOUND);
        }

        const form = await formController.updateForm(
          profile.id,
          req.body.formId,
          req.body.pages
        );

        return res.json({
          success: true,
          form,
        });
      }
    );
  }

  async getFormForPublicDetails() {
    this.get("/get-form", [], async (req: Request, res: Response) => {
      const formId = req.query.formId as string;
      if (!formId) {
        throw new APIError(
          "Form Id not provided",
          HttpStatusCode.BAD_REQUEST,
          false,
          "Form Id not found"
        );
      }
      const formController = new FormController(this.prisma);
      const formDetails = await formController.getPublicFormFromFormId(formId);
      if (!formDetails) {
        return res.json({
          success: false,
          formDetails: null,
        });
      }
      return res.json({
        success: true,
        formDetails,
      });
    });
  }
}

export default FormRoute;
