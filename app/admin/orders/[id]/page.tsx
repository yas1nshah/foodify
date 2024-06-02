import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    MoreVertical,
    MoveLeft,
    Truck,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Label } from "@/components/ui/label"

  import { Separator } from "@/components/ui/separator"

  import React from 'react'
import { getOrderById, updateOrder } from "@/actions/order"
import { getAllOrderItems, getCurrentOrderItems, getOrderItemById } from "@/actions/orderItem"
import { getUserById } from "@/actions/user2"
import UpdateStatus from "@/components/order/updateStatus"
import Link from "next/link"
  
  const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
    const order:any = await getOrderById(parseInt(params.id));
  
    const orderItems : any = await getCurrentOrderItems(parseInt(params.id));


    return (
      <div className="p-8">
         <Link href={'/admin/orders'}>
            <h1 className='flex text-2xl gap-2 items-center m-2'> <MoveLeft/> Back </h1>
          </Link>
   
        <Card className="overflow-hidden max-w-xl mx-auto">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Order {order[0].id}
                
              </CardTitle>
              <CardDescription>Date: {order[0].placedAt.toLocaleDateString()}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3">
                {
                  orderItems ?
                  orderItems.map((item:any)=>(
                    <li key={item.id} className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {item.name} x <span>{item.quantity}</span>
                      </span>
                      <span>Rs {item.price * item.quantity}</span>
                    </li>
                  ))
                  :
                  <p>No Items</p>
                }
          
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    Rs {orderItems.reduce((total:any, item:any) => total + (item.price * item.quantity), 0)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Rs 150.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Rs {orderItems.reduce((total:any, item:any) => total + (item.price * item.quantity) , 0)*15/100}</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>Rs {orderItems.reduce((total:any, item:any) => total + (item.price * item.quantity) , 0)*15/100 + orderItems.reduce((total:any, item:any) => total + (item.price * item.quantity) , 0) + 150} </span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>{order[0].address}</span>
                
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="text-muted-foreground">
                  Same as shipping address
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Customer Information</div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Customer</dt>
                  <dd>{order[0].username}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">{order[0].email}</a>
                  </dd>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Order Status</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Status
                  </dt>
                  <dd>
                    {
                      order[0].id !== undefined && order[0].status !== undefined ?
                      <UpdateStatus id={order[0].id} status={order[0].status}/>
                      : <p>Unable to fetch</p>
                    }
                  </dd>
                </div>
              </dl>
            </div>
          </CardContent>
        
        </Card>
      </div>
      )
  }
  
  export default OrderDetailsPage
  
