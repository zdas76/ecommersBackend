import { Customer } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllCustomer = async () => {
  const result = await prisma.customer.findMany({
    where: { isDeleted: false },
  });

  return result;
};

const getCustomerByIdFromDB = async (id: string) => {
  const result = await prisma.customer.findFirst({
    where: { id, isDeleted: false },
  });

  return result;
};

const updateCustomerInfo = async (id: string, payLoad: Partial<Customer>) => {
  const result = await prisma.customer.update({
    where: {
      id,
      isDeleted: false,
    },
    data: payLoad,
  });
  return result;
};

const deleteCustomerFormDB = async (id: string) => {
  const result = await prisma.customer.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const CustomerService = {
  getAllCustomer,
  getCustomerByIdFromDB,
  updateCustomerInfo,
  deleteCustomerFormDB,
};
