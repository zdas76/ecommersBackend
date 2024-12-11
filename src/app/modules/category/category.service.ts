import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma"
import ApiErrors from "../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";


const createCategory = async(payLoad: Category)=> {
    
    const isExist = await prisma.category.findFirst({
        where: {
            categoryName: payLoad.categoryName
        }
    })

    if(isExist){
        throw new ApiErrors(StatusCodes.CREATED, "Already Existed")
    }

    const result = await prisma.category.create({
        data: payLoad
    })
    
    return result;
}

const getAllCategory = async()=> {
    const result = await prisma.category.findMany()
    
    return result;
}

const getOneCategory = async(id:string)=> {
    const result = await prisma.category.findUniqueOrThrow({
        where : {id}
    
    })
    
    return result;
}

const updateCategory = async(id:string, payLoad:Category)=> {

    const result = await prisma.category.updateMany({
        where: {
            id
        },
        data: {
            categoryName: payLoad.categoryName
        }
    })

    return result;
}




export const CategoryService = {
    createCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    
}