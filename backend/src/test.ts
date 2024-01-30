import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.organization.findUnique({
  where: {
    id: "",
    profileId: "sd",
  },
  include: {
    profile: true,
  },
});
