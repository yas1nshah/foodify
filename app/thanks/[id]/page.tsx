import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { getCurrentOrderItems } from '@/actions/orderItem';
import { Separator } from '@/components/ui/separator';

  
const ThankYouPage =async ({params}: { params: { id: string } }) => {
  const orderItems:any = await getCurrentOrderItems(parseInt(params.id));

  return (
    <div className='p-12 w-full'>
        <Card className='max-w-xl mx-auto'>
            <CardHeader>
                <CardTitle>Order Placed # {params.id}</CardTitle>
                <CardDescription>ThankYou For Placing Your Order</CardDescription>
            </CardHeader>
            <CardContent>
              <h2>Details</h2>
            <ul className="grid gap-3 p-6">
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
         
            </CardContent>
            <CardFooter>
                <p>Order is processing and will be out for delivery</p>
            </CardFooter>
        </Card>

    </div>
  )
}

export default ThankYouPage