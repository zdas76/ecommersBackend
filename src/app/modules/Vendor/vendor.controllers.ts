import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponst from "../../../shared/sendResponst";
import { VendorService } from "./vendor.service";

const getAllVendor = catchAsync(async (req, res) => {
  const result = await VendorService.getAllVendor();

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Venders Retrived successfully!",
    data: result,
  });
});

const getVendorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const result = await VendorService.getVendorByIdFromDB(id);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vender Retrived successfully!",
    data: result,
  });
});

const updateVendorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VendorService.updateVendorInfo(id, req.body);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vender updated successfully!",
    data: result,
  });
});

const deleteVendorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VendorService.deleteVendorFormDB(id);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vender deleted successfully!",
    data: result,
  });
});

export const VendorController = {
  getAllVendor,
  getVendorById,
  updateVendorById,
  deleteVendorById,
};
