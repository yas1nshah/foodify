"use server"
import { db } from "@/lib/db";


export const createCategory= async (name: string) => {
    const createdCategory = await db.category.create({
        data: {
            name: name
        }
    })
} 


export const getCategoryById = async (id: number) => {
    const category = await db.category.findUnique({
        where: { id }
    });
    return category;
}

export const getAllCategory = async () => {
    const category = await db.category.findMany();
    return category;
}


export const updateCategory = async (id: number, name: string) => {
    const updatedCategory = await db.category.update({
        where: { id },
        data: { name }
    });
    return updatedCategory;
}

export const deleteCategory = async (id: number) => {
    const deletedCategory = await db.category.delete({
        where: { id }
    });
    return deletedCategory;
}



