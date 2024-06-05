"use server"
import { db } from "@/lib/db";
import { cookies } from 'next/headers'

// Create Order
export const createOrder = async (status: string) => {
    const cookieStore = await cookies();
    const userId = cookieStore.get('id');
    console.log("---------------------------------------");
    console.log(userId?.value);
    if (userId) {
        const userInt = parseInt(userId?.value);
        const createdOrder = await db.$queryRaw`
            INSERT INTO "Order" (userId, status)
            VALUES (${userInt}, ${status})
            RETURNING *
        `;

        return createdOrder;
    }
}

// Get All Orders
export const getAllOrders = async () => {
    const orders = await db.$queryRaw`
        SELECT 
            "Order".id as orderId, 
            "Order".userId as orderUserId, 
            "Order".createdAt as orderCreatedAt, 
            "Order".status as orderStatus, 
            "Order".placedAt as orderPlacedAt,
            "User".username as userUsername,
            "User".email as userEmail,
            "User".password as userPassword,
            "User".address as userAddress,
            "User".isAdmin as userIsAdmin
        FROM 
            "Order"
        LEFT JOIN 
            "User" ON "Order".userId = "User".id
        ORDER BY 
            "Order".id`;

    
   
    return orders;
}


// Get Order By ID
export const getOrderById = async (id: number) => {
    const order = await db.$queryRaw`
        SELECT 
            "Order".id as orderId, 
            "Order".userId as orderUserId, 
            "Order".createdAt as orderCreatedAt, 
            "Order".status as orderStatus, 
            "Order".placedAt as orderPlacedAt,
            "User".username as userUsername,
            "User".email as userEmail,
            "User".password as userPassword,
            "User".address as userAddress,
            "User".isAdmin as userIsAdmin
        FROM 
            "Order"
        LEFT JOIN 
            "User" ON "Order".userId = "User".id
        WHERE 
            "Order".id = ${id}
    `;
    
    return order;
}


// Update Order
export const updateOrder = async (id: number, status: string) => {
    const updatedOrder = await db.$queryRaw`
        UPDATE "Order"
        SET status = ${status}
        WHERE id = ${id}
        RETURNING *
    `;
    return updatedOrder;
}

// Delete Order
export const deleteOrder = async (id: number) => {
    console.log("DELETEING")
    const deletedOrderItem = await db.$queryRaw`
        DELETE FROM "OrderItem" WHERE orderId = ${id}
        RETURNING *
    `;
    const deletedOrder = await db.$queryRaw`
        DELETE FROM "Order" WHERE id = ${id}
        RETURNING *
    `;
    return deletedOrder;
}