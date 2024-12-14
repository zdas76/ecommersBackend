import { Vendor } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllVendor = async () => {
  const result = await prisma.vendor.findMany({
    where: { isDeleted: false },
  });

  return result;
};

const getVendorByIdFromDB = async (id: string) => {
  const result = await prisma.vendor.findFirst({
    where: { id, isDeleted: false },
  });

  return result;
};

const updateVendorInfo = async (id: string, payLoad: Partial<Vendor>) => {
  const result = await prisma.vendor.update({
    where: {
      id,
      isDeleted: false,
    },
    data: payLoad,
  });
  return result;
};

const deleteVendorFormDB = async (id: string) => {
  const result = await prisma.vendor.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const VendorService = {
  getAllVendor,
  getVendorByIdFromDB,
  updateVendorInfo,
  deleteVendorFormDB,
};
