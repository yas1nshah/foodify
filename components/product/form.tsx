"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import { createMenuItem } from '@/actions/product'
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"


const AddProductForm = (params: any) => {
    const router = useRouter();
    const categories = params.cats
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState(0)
    const [catID, setCatId] = useState<number>()
    
    const submit= async () => {
        if(catID){
            createMenuItem(name, desc, price, catID);
            router.push("/admin/menu")
        }
    }
  return (
    <form action={submit} className='space-y-10'>
            <div>
                <Label htmlFor="name">Your Product Name</Label>
                <Input required id='name' type='' placeholder='Name' defaultValue={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div>
                <Label htmlFor="desc">Your Product Description</Label>
                <Input  required id='desc' type='' placeholder='Description' defaultValue={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
            </div>
            <div>
                <Label htmlFor="price">Price</Label>
                <Input  required id='price' type='number' placeholder='Price' min={0} defaultValue={price} onChange={(e)=>{setPrice(parseInt(e.target.value))}}/>
            </div>

            <div>
                <Label htmlFor="price">Category</Label>
                <Select  onValueChange={(e) => setCatId(parseInt(e))} value={catID !== undefined ? catID.toString() : "Select"}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((item: any) => (
                            <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>            
            </div>

           

            <Button>Add</Button>
        </form>
  )
}

export default AddProductForm