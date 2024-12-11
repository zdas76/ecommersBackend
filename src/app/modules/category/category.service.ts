import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma"


const createCategory = async(payLoad: Category)=> {
    
    await prisma.category.findUniqueOrThrow({
        where: {
            categoryName: payLoad.categoryName
        }
    })

    const result = await prisma.category.create({
        data: payLoad
    })
    
    return result;
}

const getAllCategory = async()=> {
    const result = await prisma.category.findMany()
    
    return result;
}

const getOneCategory = async()=> {
    const result = await prisma.category.findFirst()
    
    return result;
}

const updateCategory = async()=> {
    const result = await prisma.category.update({})

    return result;
}

const deleteCategory = async()=> {
    const result = await prisma.category.update({})
}



export const CategoryService = {
    createCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
}