import { Organization, Profile } from "@prisma/client";
import { Request } from "express";

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export type UserJWTData = {
  userId: string;
  name: string;
  surname: string;
  email: string;
  deviceId: string;
  sessionId: string;
  iat: number;
};

export type GetProfilePayload = {
  name: string;
  imageUrl: string;
  email: string;
};

export type ProfileAndOrganization = {
  Profile: Profile | null | undefined;
  Organization: Organization | null | undefined;
};
