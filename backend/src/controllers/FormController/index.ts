import { FormDetails, PrismaClient } from "@prisma/client";

export default class FormController {
  prisma: PrismaClient | null = null;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createFormForUser(
    profileId: string,
    data: {
      name: string;
      card: string;
      organizationId: string;
    }
  ): Promise<FormDetails | undefined> {
    const formDetails = await this.prisma?.formDetails.create({
      data: {
        description: "",
        displayName: data.name,
        organizationId: data.organizationId,
        profileId: profileId,
      },
    });

    return formDetails;
  }
  async getAllForms(
    profileId: string,
    organizationId: string
  ): Promise<FormDetails[] | undefined> {
    return await this.prisma?.formDetails.findMany({
      where: {
        profileId: profileId,
        organizationId: organizationId,
      },
    });
  }

  async getFormFromFormId(
    profileId: string,
    organizationId: string,
    formId: string
  ): Promise<FormDetails | undefined | null> {
    return await this.prisma?.formDetails.findUnique({
      where: {
        profileId,
        organizationId,
        id: formId,
      },
    });
  }

  async updateForm(profileId: string, formId: string, pages: any) {
    return await this.prisma?.formDetails.update({
      where: {
        profileId,
        id: formId,
      },
      data: {
        pages: pages,
      },
    });
  }

  async getPublicFormFromFormId(formId: string) {
    return await this.prisma?.formDetails.findUnique({
      where: {
        id: formId,
      },
    });
  }
}
