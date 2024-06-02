"use server"
import { db } from "@/lib/db";

// Create OrderItem
export const createOrderItem = async (orderId: number, menuItemId: number, quantity: number) => {
    const createdOrderItem = await db.$queryRaw`
        INSERT INTO OrderItem (orderId, menuItemId, quantity)
        VALUES (${orderId}, ${menuItemId}, ${quantity})
        RETURNING *
    `;
    return createdOrderItem;
}

// Get All OrderItems
export const getAllOrderItems = async () => {
    const orderItems = await db.$queryRaw`
        SELECT * FROM OrderItem
    `;
    return orderItems;
}

// Get All OrderItems for a specific order
export const getCurrentOrderItems = async (id: number) => {
    const orderItems = await db.$queryRaw`
        SELECT OrderItem.*, MenuItem.*
        FROM OrderItem
        INNER JOIN MenuItem ON OrderItem.menuItemId = MenuItem.id
        WHERE orderId = ${id}
    `;

console.log(orderItems)
    return orderItems;
}

// Get OrderItem By ID
export const getOrderItemById = async (id: number) => {
    const orderItem = await db.$queryRaw`
        SELECT OrderItem.*, MenuItem.*
        FROM OrderItem
        INNER JOIN MenuItem ON OrderItem.menuItemId = MenuItem.id
        WHERE OrderItem.id = ${id}
    `;
    return orderItem;
}

// Update OrderItem
export const updateOrderItem = async (id: number, quantity: number) => {
    const updatedOrderItem = await db.$queryRaw`
        UPDATE OrderItem
        SET quantity = ${quantity}
        WHERE id = ${id}
        RETURNING *
    `;
    return updatedOrderItem;
}

// Delete OrderItem
export const deleteOrderItem = async (id: number) => {
    const deletedOrderItem = await db.$queryRaw`
        DELETE FROM OrderItem WHERE id = ${id}
        RETURNING *
    `;
    return deletedOrderItem;
}
