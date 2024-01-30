import { PrismaClient } from "@prisma/client";
import ExpressRouter from "../ExpressRouter";
import RouteValidator from "../RouteValidators";
import { Request, Response } from "express";
import ProfileController from "../../controllers/ProfileController";
import APIError from "../../Errors/ApiError";
import { HttpStatusCode } from "../../models";

class ProfileRoute extends ExpressRouter {
  private prisma: PrismaClient = new PrismaClient({
    log: ["query"],
  });

  constructor(middlewares: Array<any>) {
    super("/profile", middlewares);
    this.getProfileGetRoute();
    this.updateOrganizationForUser();
  }

  async getProfileGetRoute() {
    this.post(
      "/me",
      [RouteValidator.authenticateUser(this.prisma)],
      async (req: Request, res: Response) => {
        const profileController = new ProfileController(this.prisma);
        const profile = await profileController.getProfileFromUserId(
          req.userId
        );
        if (profile) {
          const org = await profileController.getOrganizationFromProfile(
            profile.id
          );

          return res.json({
            success: true,
            profile: {
              name: profile.name,
              email: profile.email,
              imageUrl: profile.imageUrl,
              org: org?.Organization?.name ? org.Organization : null,
            },
          });
        }
        const profileOrgRelation =
          await profileController.createProfileAndOrganization(
            req.userId,
            req.body
          );

        if (
          profileOrgRelation &&
          profileOrgRelation.Organization &&
          profileOrgRelation.Profile
        ) {
          console.log(profileOrgRelation);
          return res.json({
            success: true,
            profile: {
              name: profileOrgRelation.Profile.name,
              email: profileOrgRelation.Profile.email,
              imageUrl: profileOrgRelation.Profile.imageUrl,
              ...(profileOrgRelation.Organization.name
                ? {
                    org: profileOrgRelation.Organization,
                  }
                : {
                    org: null,
                  }),
            },
          });
        }

        return res.json({
          success: false,
        });
      }
    );
  }

  async updateOrganizationForUser() {
    this.post(
      "/update-org",
      [RouteValidator.authenticateUser(this.prisma)],
      async (req: Request, res: Response) => {
        const profileController = new ProfileController(this.prisma);
        const profile = await profileController.getProfileFromUserId(
          req.userId
        );

        if (!profile) {
          return res.json({
            success: false,
          });
        }

        const profileOrgRelation =
          await profileController.updateOrganizationDetails(
            profile.id,
            req.body
          );
        if (
          profileOrgRelation &&
          profileOrgRelation.Organization &&
          profileOrgRelation.Profile
        ) {
          return res.json({
            success: true,
            profile: {
              name: profileOrgRelation.Profile.name,
              email: profileOrgRelation.Profile.email,
              imageUrl: profileOrgRelation.Profile.imageUrl,
              org: profileOrgRelation.Organization,
            },
          });
        }
        return res.json({
          success: false,
        });
      }
    );
  }
}

export default ProfileRoute;
