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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllMenuItems } from '@/actions/product'
import { Button } from '@/components/ui/button'
import { ArrowUpRightIcon, MoveLeft } from 'lucide-react'
import MenuItem from '@/components/product/menuItem'
  

const ProductPage = async () => {
    const allMenuItems = await getAllMenuItems() 
   
  return (
    <div className='p-6'>
         <Link href={'/admin'}>
        <h1 className='flex text-2xl gap-2 items-center m-2'> <MoveLeft/> Back </h1>
      </Link>
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Menu Items</CardTitle>
        <CardDescription>Recent Menu Items of your store.</CardDescription>
      </CardHeader>
      <CardContent>
      <Table>
        <TableCaption><Link href={"/admin/menu/add"}><Button>Add New Item</Button></Link></TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="">Description</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="">Category</TableHead>
            <TableHead className="text-right">Action</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                allMenuItems.map((item)=> (
                    <MenuItem key={item.id} item={item}/>
                ))
            }
            
        </TableBody>
        </Table>
      </CardContent>

      <CardFooter>
        <Link href={'/admin/menu/categories'}>
          <div className='rounded-xl bg-secondary p-6 flex justify-center items-end hover:bg-slate-300 ease-in-out transition-all duration-300 my-6'>
            <h1 className='text-xl pt-10 flex-grow'>Manage Categories</h1>
            <ArrowUpRightIcon/>
          </div>
        </Link>
      </CardFooter>
    </Card>


        


    </div>
  )
}

export default ProductPage