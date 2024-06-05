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
import { deleteMenuItem } from '@/actions/product'

const categoryItem = (params: any) => {
    const router = useRouter()

    const deleteCat = async (id: number)=> {
        await deleteCategory(id);
        router.refresh()
    }
  return (
  
      <TableRow>
      <TableCell className="font-medium">{params.cat.name}</TableCell>
   
      <TableCell className="text-right">
      <DropdownMenu>
          <DropdownMenuTrigger>...</DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                  <form action={()=>deleteCat(params.cat.id)}>
                      <Button variant={'destructive'} size={"sm"}>Delete</Button>
                  </form>
              </DropdownMenuItem>             
          </DropdownMenuContent>
          </DropdownMenu>
      </TableCell>
  </TableRow>
  )
}

export default categoryItem