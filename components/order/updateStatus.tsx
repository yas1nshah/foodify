"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Label } from "@/components/ui/label"
import { updateOrder } from '@/actions/order'
import { Button } from '../ui/button'

const UpdateStatus = (params: {id:number, status : string}) => {
    const [value, setValue] = useState(params.status)
    const updateStatus= async ()=> {
        await updateOrder(params.id, value)
       }
         
  return (
    <form action={()=>updateStatus()}>
                      <Label htmlFor="price">Category</Label>
                      <Select onValueChange={(e)=> setValue(e)} value={value} >
                          <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem  value={"pending"}>pending</SelectItem>
                            <SelectItem  value={"completed"}>completed</SelectItem>
                            <SelectItem  value={"failed"}>failed</SelectItem>
                          </SelectContent>
                      </Select> 
                      <Button className='my-4'>Update</Button>
                    </form>
  )
}

export default UpdateStatus