import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponst from "../../../shared/sendResponst";
import { CategoryService } from "./category.service";

const createCagetory = catchAsync(async(req, res) => {
    console.log(req.body)

    const reselt = await CategoryService.createCategory(req.body)

    sendResponst(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Category Created Successfully",
        data: reselt,
      });
})

const getCagetory = catchAsync(async(req, res) => {

    const reselt = await CategoryService.getAllCategory()

    sendResponst(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Categories revers Successfully",
        data: reselt,
      });
})


const getOneCagetory = catchAsync(async(req, res) => {

    const reselt = await CategoryService.getOneCategory()

    sendResponst(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Category reversed Successfully",
        data: reselt,
      });
})


const updateCagetory = catchAsync(async(req, res) => {

    const reselt = await CategoryService.updateCategory()

    sendResponst(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Category updated Successfully",
        data: reselt,
      });
})


const deleteCagetory = catchAsync(async(req, res) => {

    const reselt = await CategoryService.deleteCategory()

    sendResponst(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Category deleted Successfully",
        data: reselt,
      });
})


export const CategoryController = {
    createCagetory,
    getCagetory,
    getOneCagetory,
    updateCagetory,
    deleteCagetory
}