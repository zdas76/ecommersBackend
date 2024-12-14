import { Admin } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllAdmin = async () => {
  const result = await prisma.admin.findMany({
    where: { isDeleted: false },
  });

  return result;
};

const getAdminByIdFromDB = async (id: string) => {
  const result = await prisma.admin.findFirst({
    where: { id, isDeleted: false },
  });

  return result;
};

const updateAdminInfo = async (id: string, payLoad: Partial<Admin>) => {
  const result = await prisma.admin.update({
    where: {
      id,
      isDeleted: false,
    },
    data: payLoad,
  });
  return result;
};

const deleteAdminFormDB = async (id: string) => {
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const AdminService = {
  getAllAdmin,
  getAdminByIdFromDB,
  updateAdminInfo,
  deleteAdminFormDB,
};
