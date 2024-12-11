import { Product } from "@prisma/client";
import prisma from "../../../shared/prisma";


const createProduct = async (payLoad:Product) => {
    console.log(payLoad)
    
    await prisma.product.findFirstOrThrow({
        where: {
            title: payLoad.title,
            vendorId: payLoad.vendorId
        }
    })
    
    const result = await prisma.product.create({
        data: payLoad
    })
    
    return result;
}

const getAllProduct = async()=> {
    
}


export const ProuctService = {
    createProduct,
    getAllProduct
}