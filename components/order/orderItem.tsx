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
import { deleteOrder } from '@/actions/order'


const OrderItem = (params: any) => {
    const order = params.order
    const router = useRouter()
    const deleteOrderSubmit = async ()=> {
        await deleteOrder(order.orderId);
        router.refresh()
    }
  return (
    
    <TableRow>
        <TableCell className="font-medium">{order.orderId}
        {
            // JSON.stringify(order)
        }
        </TableCell>
        <TableCell className="font-medium">{params.order.userUsername}</TableCell>
        <TableCell className="font-medium"><Badge variant="default">{params.order.orderStatus}</Badge>
</TableCell>
     
        <TableCell className="text-right">
        <DropdownMenu>
            <DropdownMenuTrigger>...</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`/admin/orders/${params.order.orderId}`}>
                        <Button variant={'outline'} size={"sm"}>Order Details</Button>
                    </Link>
                </DropdownMenuItem>             
                <DropdownMenuItem>
                    <form action={deleteOrderSubmit}>
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