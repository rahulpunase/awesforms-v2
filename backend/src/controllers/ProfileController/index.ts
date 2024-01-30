import crypto from "crypto";
import bcrypt from "bcrypt";
import { Organization, PrismaClient, Profile, profile } from "@prisma/client";
import APIError from "../../Errors/ApiError";
import {
  GetProfilePayload,
  HttpStatusCode,
  ProfileAndOrganization,
} from "../../models";

export default class ProfileController {
  prisma: PrismaClient | null = null;

  static readonly PROFILE_LOCKED_COUNT = 3;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getOrgFromProfileId(profileId: string): Promise<any> {
    const org = await this.prisma?.profileOrgRelation.findFirst({
      where: {
        profileId: profileId,
      },
    });
    return org;
  }

  async getProfileFromUserId(
    userId: string
  ): Promise<Profile | undefined | null> {
    return await this.prisma?.profile.findFirst({
      where: {
        userId,
      },
    });
  }
  async createProfileAndOrganization(
    userId: string,
    data: GetProfilePayload
  ): Promise<ProfileAndOrganization | undefined> {
    const profileOrgRelation = await this.prisma?.profileOrgRelation.create({
      data: {
        Profile: {
          create: {
            email: data.email,
            imageUrl: data.imageUrl,
            name: data.name,
            userId: userId,
          },
        },
        Organization: {
          create: {
            name: "",
            imageUrl: "",
          },
        },
      },
      select: {
        Profile: true,
        Organization: true,
      },
    });

    return profileOrgRelation;
  }

  async getOrganizationFromProfile(profileId: string): Promise<
    | {
        Organization: Organization | undefined | null;
      }
    | null
    | undefined
  > {
    return await this.prisma?.profileOrgRelation.findFirst({
      where: {
        profileId: profileId,
      },
      select: {
        Organization: true,
      },
    });
  }

  async updateOrganizationDetails(
    profileId: string,
    data
  ): Promise<ProfileAndOrganization | undefined> {
    const profileOrg = await this.prisma?.profileOrgRelation.findFirst({
      where: {
        profileId: profileId,
      },
    });
    const relationId = profileOrg?.id;
    const org = await this.prisma?.profileOrgRelation.update({
      where: {
        id: relationId,
        profileId: profileId,
      },
      data: {
        Organization: {
          update: {
            name: data.orgName,
          },
        },
      },
      select: {
        Profile: true,
        Organization: true,
      },
    });
    return org;
  }
}
