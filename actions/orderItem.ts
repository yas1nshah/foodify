"use server"
import { db } from "@/lib/db";

// Create OrderItem
export const createOrderItem = async (orderId: number, menuItemId: number, quantity: number) => {
    const createdOrderItem = await db.orderItem.create({
        data: {
            orderId,
            menuItemId,
            quantity,
        }
    });
    return createdOrderItem;
}

// Get All OrderItems
export const getAllOrderItems = async () => {
    const orderItems = await db.orderItem.findMany();
    return orderItems;
}

// Get All OrderItems
export const getCurrentOrderItems = async (id:number) => {
    const orderItems = await db.orderItem.findMany({
        where: {
            orderId: id
        },
        include: {
            menuItem: true,
        }
    });
    return orderItems;
}

// Get OrderItem By ID
export const getOrderItemById = async (id: number) => {
    const orderItem = await db.orderItem.findMany({
        where: { id },
        include: {
            menuItem: true,
        }
    });
    return orderItem;
}

// Update OrderItem
export const updateOrderItem = async (id: number, quantity: number) => {
    const updatedOrderItem = await db.orderItem.update({
        where: { id },
        data: {
            quantity
        }
    });
    return updatedOrderItem;
}

// Delete OrderItem
export const deleteOrderItem = async (id: number) => {
    const deletedOrderItem = await db.orderItem.delete({
        where: { id }
    });
    return deletedOrderItem;
}
