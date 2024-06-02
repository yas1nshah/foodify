"use server"
import { db } from "@/lib/db";

export const createMenuItem = async (name: string, description: string, price: number, categoryId: number) => {
    const createdMenuItem = await db.$queryRaw`
        INSERT INTO MenuItem (name, description, price, categoryId)
        VALUES (${name}, ${description}, ${price}, ${categoryId})
        RETURNING *
    `;
    return createdMenuItem;
}

export interface MenuItemWithCategory {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    category: {
        id: number;
        name: string;
    };
}

export const getAllMenuItems = async (): Promise<MenuItemWithCategory[]> => {
    const menuItems:MenuItemWithCategory[] = await db.$queryRaw`
        SELECT MenuItem.id, MenuItem.name, MenuItem.description, MenuItem.price, MenuItem.categoryId, Category.id as "category:id", Category.name as "category:name"
        FROM MenuItem
        INNER JOIN Category ON MenuItem.categoryId = Category.id
    `;

    console.log(menuItems)
    return menuItems;
}

export const getMenuItemById = async (id: number) => {
    const menuItem = await db.$queryRaw`
        SELECT * FROM MenuItem WHERE id = ${id}
    `;
    return menuItem;
}

export const updateMenuItem = async (id: number, name: string, description: string, price: number, categoryId: number) => {
    const updatedMenuItem = await db.$queryRaw`
        UPDATE MenuItem
        SET name = ${name}, description = ${description}, price = ${price}, categoryId = ${categoryId}
        WHERE id = ${id}
        RETURNING *
    `;
    return updatedMenuItem;
}

export const deleteMenuItem = async (id: number) => {
    const deletedMenuItem = await db.$queryRaw`
        DELETE FROM MenuItem WHERE id = ${id}
        RETURNING *
    `;
    return deletedMenuItem;
}
