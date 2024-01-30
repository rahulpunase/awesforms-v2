import { PrismaClient } from "@prisma/client";
import ExpressRouter from "../ExpressRouter";
import RouteValidator from "../RouteValidators";
import { Request, Response } from "express";
import { Pages } from "../../data/fields";

class TestRouter extends ExpressRouter {
  private prisma: PrismaClient = new PrismaClient({
    log: ["query"],
  });

  constructor(middlewares: Array<any>) {
    super("/test", middlewares);
    this.getAddRoute();
    this.fetchRoute();
    this.createOrganization();
    this.updateOrganization();
    this.getOrg();
    this.createForm();
  }

  async getAddRoute() {
    this.post("/add", [], async (req: Request, res: Response) => {
      const profile = await this.prisma.profile.create({
        data: {
          email: "test21@gmail.com",
          imageUrl: "//",
          name: "Test Me 21",
          userId: "newuser21",
        },
      });
      return res.json({
        profile,
      });
    });
  }

  async fetchRoute() {
    this.get("/fetch", [], async (req: Request, res: Response) => {
      const profile = await this.prisma.profile.findUnique({
        where: {
          id: "65780b41cdcc2bd6c11fc2b8",
        },
      });
      res.json({ profile });
    });
  }

  async createOrganization() {
    this.post("/org", [], async (req: Request, res: Response) => {
      const org = await this.prisma.organization.create({
        data: {
          imageUrl: "org",
          name: "Org name",
        },
      });

      res.json({ org });
    });
  }

  async updateOrganization() {
    this.post("/org-update", [], async (req: Request, res: Response) => {
      const org = await this.prisma.organization.update({
        where: {
          id: "657810b0cf2a893589d00b5f",
        },
        data: {
          profileOrgRelation: {
            create: {
              role: "ADMIN",
              profileId: "65781265b551e4a35626c240",
            },
          },
        },
      });

      res.json({ org });
    });
  }

  async getOrg() {
    this.get("/get-org", [], async (req: Request, res: Response) => {
      const org = await this.prisma.organization.findMany({
        where: {
          id: "657810b0cf2a893589d00b5f",
        },
        select: {
          id: true,
          name: true,
          profileOrgRelation: {
            select: {
              Profile: true,
              role: true,
            },
          },
        },
      });

      res.json({ org });
    });
  }

  async createForm() {
    this.get("/get-form", [], async (req: Request, res: Response) => {
      const form = await this.prisma.formDetails.create({
        data: {
          description: "DESC",
          displayName: "NEW FORM",
          pages: Pages,
        },
      });

      res.json({ form });
    });
  }
}

export default TestRouter;
