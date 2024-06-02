"use server"
import { db } from "@/lib/db";
import { cookies } from 'next/headers'

export const createUser = async (username: string, email: string, address : string, password: string) => {
    const createdUser = await db.user.create({
        data: {
            username,
            email,
            address,
            password
        }
    });

    // const createdUser = await db.$queryRaw`SELECT * from User WHERE `;

    cookies().set('name', username)
    cookies().set('email', email)
    cookies().set('id', createdUser.id.toString() )
    cookies().set('role', createdUser.isAdmin.toString())
    return createdUser;
}

export const getAllUsers = async () => {
    const users = await db.user.findMany({ include: { orders: true } });
    return users;
}

export const getUserById = async (id: number) => {
    const user = await db.user.findUnique({
        where: { id },
        include: { orders: true }
    });
    return user;
}

export const getUserByUserPass = async (username: string, password: string) => {
    // const user = await db.user.findUnique({
    //     where: { 
    //         username,
    //         password
    //      }
    // });

    const user : {
        id: number;
        username: string;
        email: string;
        password: string;
        address: string;
        isAdmin: boolean;
    }[] | null  =  await db.$queryRaw`SELECT * from User WHERE username= ${username} AND password= ${password} LIMIT 1`;

    console.log(user)
    if(user){
        cookies().set('name', user[0].username)
        cookies().set('email', user[0].email)
        cookies().set('id', user[0].id.toString())
        cookies().set('role', user[0].isAdmin.toString())
        // cookies().set('name', user.username)
        // cookies().set('email', user.email)
        // cookies().set('id', user.id.toString())
        // cookies().set('role', user.isAdmin.toString())
        return true;
    }
    return false;
}

export const updateUser = async (id: number, username: string, email: string, password: string) => {
    const updatedUser = await db.user.update({
        where: { id },
        data: {
            username,
            email,
            password
        }
    });
    return updatedUser;
}

export const deleteUser = async (id: number) => {
    const deletedUser = await db.user.delete({
        where: { id }
    });
    return deletedUser;
}
