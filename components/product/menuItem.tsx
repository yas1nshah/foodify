"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { deleteCategory } from '@/actions/categories'
import { Button } from '../ui/button'

const MenuItem = (params: any) => {
    const router = useRouter()
    const deleteCat = async (id: number)=> {
        await deleteCategory(id);
        router.refresh()
    }
  return (
    <TableRow>
        <TableCell className="font-medium">{params.item.name}</TableCell>
        <TableCell className="font-medium">{params.item.description}</TableCell>
        <TableCell className="font-medium">Rs {params.item.price}</TableCell>
        <TableCell className="font-medium">{params.item['category:name']}</TableCell>
    
        <TableCell className="text-right">
        <DropdownMenu>
            <DropdownMenuTrigger>...</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form action={()=>deleteCat(params.item.id)}>
                        <Button variant={'destructive'} size={"sm"}>Delete</Button>
                    </form>
                </DropdownMenuItem>             
            </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>
  )
}

export default MenuItem