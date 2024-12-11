import { Prisma, Product } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import { searchableFields } from "./Product.Constant";
import ApiErrors from "../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { fileUploaders } from "../../../helpers/fileUploaders";
import { Request } from "express";
import { IFile } from "../../interfaces/file";

const createProduct = async (req: Request) => {
  const files = req.files;

  if (files) {
    const uploadTOCloudinary: any =
      await fileUploaders.uploadToCloudinaryMultipu(files as IFile[]);
    req.body.product.productImage = uploadTOCloudinary;
  }

  const data = req.body.product;

  const isExist = await prisma.product.findFirst({
    where: {
      title: data.title,
      vendorId: data.vendorId,
    },
  });

  if (isExist) {
    throw new ApiErrors(
      StatusCodes.BAD_REQUEST,
      "This prodict already added by this vendor"
    );
  }

  const result = await prisma.product.create({
    data: data,
  });

  return result;
};

const getAllProduct = async (params: any, paginat: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.Pagination(paginat);

  const { searchTerm, ...filterData } = params;

  const andCondition: Prisma.ProductWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: searchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const wehreConditions: Prisma.ProductWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.product.findMany({
    where: wehreConditions,
    skip,
    take: limit,
    orderBy:
      paginat.sortBy && paginat.sortOrder
        ? {
            [paginat.sortBy]: paginat.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  console.log(result);
  const total = await prisma.product.count({
    where: wehreConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ProuctService = {
  createProduct,
  getAllProduct,
};
