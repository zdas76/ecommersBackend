import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponst from "../../../shared/sendResponst";
import { AdminService } from "./Admin.service";


const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdmin();

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admins Retrived successfully!",
    data: result,
  });
});

const getAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const result = await AdminService.getAdminByIdFromDB(id);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin Retrived successfully!",
    data: result,
  });
});

const updateAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.updateAdminInfo(id, req.body);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin updated successfully!",
    data: result,
  });
});

const deleteAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdminFormDB(id);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin deleted successfully!",
    data: result,
  });
});

export const AdminsController = {
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
