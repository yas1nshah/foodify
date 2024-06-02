"use server"
import { db } from "@/lib/db";
import { cookies } from 'next/headers'

// Create Order
export const createOrder = async (status: string) => {
    const cookieStore = await cookies()
    const userId =  cookieStore.get('id')
    console.log(userId?.value)
    if (userId){
        const userInt = parseInt(userId?.value)
        const createdOrder = await db.order.create({
            data: {
                userId : userInt,
                status : status,

            }
        });
        return createdOrder;
    }
}

// Get All Orders
export const getAllOrders = async () => {
    const orders = await db.order.findMany(
        {
            include: {
                user:true
            }
        }
    );
    return orders;
}

// Get Order By ID
export const getOrderById = async (id: number) => {
    const order = await db.order.findUnique({
        where: { id },
        include: {
            orderItems: true,
            user: true
        }
    });
    return order;
}

// Update Order
export const updateOrder = async (id: number, status: string) => {
    const updatedOrder = await db.order.update({
        where: { id },
        data: {
            status
        }
    });
    return updatedOrder;
}

// Delete Order
export const deleteOrder = async (id: number) => {
    const deletedOrder = await db.order.delete({
        where: { id }
    });
    return deletedOrder;
}
