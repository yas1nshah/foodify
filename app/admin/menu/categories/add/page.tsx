"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { createCategory } from '@/actions/categories'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link'

  


const AddCategoryPage = () => {
    const router = useRouter();
    const [name, setName] = useState("")
    const submit= async () => {
        createCategory(name);
        router.push("/admin/menu/categories")
    }
  return (
    <>
    <Card className='max-w-lg mx-auto'>
    <CardHeader>
        <CardTitle>Add a Category</CardTitle>
        <CardDescription>Provide details to add a new category</CardDescription>
    </CardHeader>
    <CardContent>
        <form action={submit} className='space-y-10'>
            <Input type='' defaultValue={name} onChange={(e)=>{setName(e.target.value)}}/>
            <Button>Add</Button>
        </form>
    </CardContent>
    <CardFooter>
        <Link href='/admin/menu/categories'>
            <p>Go Back</p>
        </Link>
    </CardFooter>
    </Card>

    
    </>
  )
}

export default AddCategoryPage