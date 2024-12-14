import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponst from "../../../shared/sendResponst";
import { CustomerService } from "./Customer.service";


const getAllCustomer = catchAsync(async (req, res) => {
  const result = await CustomerService.getAllCustomer();

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customers Retrived successfully!",
    data: result,
  });
});

const getCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const result = await CustomerService.getCustomerByIdFromDB(id);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer Retrived successfully!",
    data: result,
  });
});

const updateCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.updateCustomerInfo(id, req.body);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customerupdated successfully!",
    data: result,
  });
});

const deleteCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.deleteCustomerFormDB(id);

  sendResponst(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer deleted successfully!",
    data: result,
  });
});

export const CustomersController = {
  getAllCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
