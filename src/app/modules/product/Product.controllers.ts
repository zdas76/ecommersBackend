import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponst from "../../../shared/sendResponst";
import { ProuctService } from "./Product.service";
import pick from "../../../shared/pick";
import { filtersFields } from "./Product.Constant";

const createProduct = catchAsync(async(req, res) => {
    
    const result = await ProuctService.createProduct(req);

    sendResponst(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Product created successfully!",
        data: result
    })
})


const getAllProduct = catchAsync(async(req, res) => {
    const filters = pick(req.query, filtersFields);
    const paginat = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])    

    const result = await ProuctService.getAllProduct(filters, paginat)

})


export const ProductController = {
    createProduct,
    getAllProduct   
}