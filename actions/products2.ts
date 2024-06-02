"use server"
import { db } from "@/lib/db";


export const createMenuItem = async (name: string, description: string, price: number, categoryId: number) => {
    const createdMenuItem = await db.menuItem.create({
        data: {
            name,
            description,
            price,
            categoryId
        }
    });
    return createdMenuItem;
}

export const getAllMenuItems = async () => {
    const menuItems = await db.menuItem.findMany({include:{category: true}});
    return menuItems;
}


export const getMenuItemById = async (id: number) => {
    const menuItem = await db.menuItem.findUnique({
        where: { id }
    });
    return menuItem;
}

export const updateMenuItem = async (id: number, name: string, description: string, price: number, categoryId: number) => {
    const updatedMenuItem = await db.menuItem.update({
        where: { id },
        data: {
            name,
            description,
            price,
            categoryId
        }
    });
    return updatedMenuItem;
}


export const deleteMenuItem = async (id: number) => {
    const deletedMenuItem = await db.menuItem.delete({
        where: { id }
    });
    return deletedMenuItem;
}
