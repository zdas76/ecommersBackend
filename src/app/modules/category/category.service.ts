import prisma from "../../../shared/prisma"


const createCategory = async()=> {
    const result = await prisma.category.create({
        data: data
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