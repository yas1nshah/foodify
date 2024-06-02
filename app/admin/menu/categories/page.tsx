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
import { Button } from '@/components/ui/button'
import { MoveLeft, MoveUpLeftIcon } from 'lucide-react'
  

const CategoriesPage = async () => {
    const allCategories = await getAllCategory() 
   
  return (
    <div className='p-6'>
      <Link href={'/admin/menu'}>
        <h1 className='flex text-2xl gap-2 items-center m-2'> <MoveLeft/> Back </h1>
      </Link>
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Categories</CardTitle>
        <CardDescription>Recent categories your store.</CardDescription>
      </CardHeader>
      <CardContent>
      <Table>
        <TableCaption><Link href={"/admin/menu/categories/add"}><Button> Add New Category </Button></Link></TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Action</TableHead>
            
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                allCategories.map((cat)=> (
                    <CategoryItem key={cat.id} cat={cat}/>
                ))
            }
            
        </TableBody>
        </Table>
      </CardContent>
    </Card>


        


    </div>
  )
}

export default CategoriesPage