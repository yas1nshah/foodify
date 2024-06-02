
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { createCategory, getAllCategory } from '@/actions/categories'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import AddProductForm from '@/components/product/form'
  

  


const AddProductPage = async () => {
  const cats = await getAllCategory()
  return (
    <>
    <Card className='max-w-lg mx-auto'>
    <CardHeader>
        <CardTitle>Add a Product</CardTitle>
        <CardDescription>Provide details to add a new category</CardDescription>
    </CardHeader>
    <CardContent>
        <AddProductForm cats={cats}/>
    </CardContent>
    <CardFooter>
        <Link href='/admin/menu'>
            <p>Go Back</p>
        </Link>
    </CardFooter>
    </Card>

    
    </>
  )
}

export default AddProductPage