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
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'


const OrderItem = (params: any) => {
    const router = useRouter()
    const deleteOrder = async (id: number)=> {
        await deleteOrder(id);
        router.refresh()
    }
  return (
    
    <TableRow>
        <TableCell className="font-medium">{params.order.id}</TableCell>
        <TableCell className="font-medium">{params.order.username}</TableCell>
        <TableCell className="font-medium"><Badge variant="default">{params.order.status}</Badge>
</TableCell>
     
        <TableCell className="text-right">
        <DropdownMenu>
            <DropdownMenuTrigger>...</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`/admin/orders/${params.order.id}`}>
                        <Button variant={'outline'} size={"sm"}>Order Details</Button>
                    </Link>
                </DropdownMenuItem>             
                <DropdownMenuItem>
                    <form action={()=> deleteOrder(params.order.id)}>
                        <Button variant={'destructive'} size={"sm"}>Delete</Button>
                    </form>
                </DropdownMenuItem>             
            </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>

  )
}

export default OrderItem