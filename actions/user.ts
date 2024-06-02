"use server"
import { db } from "@/lib/db";
import { cookies } from 'next/headers';

export const createUser = async (username: string, email: string, address: string, password: string) => {
    const createdUser: any = await db.$queryRaw`
        INSERT INTO User (username, email, address, password)
        VALUES (${username}, ${email}, ${address}, ${password})
        RETURNING id, isAdmin
    `;

    if (createdUser) {
        cookies().set('name', username);
        cookies().set('email', email);
        cookies().set('id', createdUser[0].id.toString());
        cookies().set('role', createdUser[0].isAdmin.toString());
    }

    return createdUser;
}

export const getAllUsers = async () => {
    const users = await db.$queryRaw`
        SELECT * FROM User
    `;
    return users;
}

export const getUserById = async (id: number) => {
    const user = await db.$queryRaw`
        SELECT * FROM User WHERE id = ${id}
    `;
    return user;
}

export const getUserByUserPass = async (username: string, password: string) => {
    const user: any = await db.$queryRaw`
        SELECT id, username, email, isAdmin FROM User
        WHERE username = ${username} AND password = ${password}
        LIMIT 1
    `;

    if (user && user.length > 0) {
        cookies().set('name', user[0].username);
        cookies().set('email', user[0].email);
        cookies().set('id', user[0].id.toString());
        cookies().set('role', user[0].isAdmin.toString());
        return true;
    }
    return false;
}

export const updateUser = async (id: number, username: string, email: string, password: string) => {
    const updatedUser = await db.$queryRaw`
        UPDATE User
        SET username = ${username}, email = ${email}, password = ${password}
        WHERE id = ${id}
        RETURNING id
    `;
    return updatedUser;
}

export const deleteUser = async (id: number) => {
    const deletedUser = await db.$queryRaw`
        DELETE FROM User WHERE id = ${id}
        RETURNING id
    `;
    return deletedUser;
}
