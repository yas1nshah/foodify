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

  
import { getAllCategory } from '@/actions/categories'

import CategoryItem from '@/components/category/categoryItem'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllMenuItems } from '@/actions/product'
import { getAllOrders } from '@/actions/order'
import OrderItem from '@/components/order/orderItem'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
  

const ProductPage = async () => {
    const allOrders:any = await getAllOrders() 
   
  return (
    <div className='p-6'>
        <Link href={'/admin'}>
        <h1 className='flex text-2xl gap-2 items-center m-2'> <MoveLeft/> Back </h1>
      </Link>   
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Manage Orders</CardTitle>
        <CardDescription>Recent Menu Items of your store.</CardDescription>
      </CardHeader>
      <CardContent>
      <Table>
        <TableCaption>Page 1-1</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead className="">user</TableHead>
            <TableHead className="">status</TableHead>
            <TableHead className="text-right">Action</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                allOrders.map((item:any)=> (
                    <OrderItem key={item.id} order={item}/>
                ))
            }
            
        </TableBody>
        </Table>
      </CardContent>
    </Card>


        


    </div>
  )
}

export default ProductPage