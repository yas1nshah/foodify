"use server"
import { db } from "@/lib/db";

export const createCategory = async (name: string) => {
    const createdCategory = await db.$queryRaw`
        INSERT INTO Category (name)
        VALUES (${name})
        RETURNING *
    `;
    return createdCategory;
}

export const getCategoryById = async (id: number) => {
    const category = await db.$queryRaw`
        SELECT * FROM Category WHERE id = ${id}
    `;
    return category;
}

export const getAllCategory = async () => {
    const categories = await db.$queryRaw`
        SELECT * FROM Category
    `;
    return categories;
}

export const updateCategory = async (id: number, name: string) => {
    const updatedCategory = await db.$queryRaw`
        UPDATE Category
        SET name = ${name}
        WHERE id = ${id}
        RETURNING *
    `;
    return updatedCategory;
}

export const deleteCategory = async (id: number) => {
    const deletedCategory = await db.$queryRaw`
        DELETE FROM Category WHERE id = ${id}
        RETURNING *
    `;
    return deletedCategory;
}
