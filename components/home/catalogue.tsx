"use client"
import { MenuItem } from '@prisma/client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trash } from 'lucide-react'
import { createOrder } from '@/actions/order'
import { createOrderItem } from '@/actions/orderItem'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'

type cartItem = {
  item: MenuItem,
  quantity: number
}

const Catalogue = (params: { items: MenuItem[] }) => {

  const router= useRouter()
  
  const items = params.items;
  const [cart, setCart] = useState<cartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.item.id === item.id);

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { item, quantity: 1 }];
      }
    });
  }

  const decreaseQuantity = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.item.id === item.id);

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.item.id !== item.id);
      }
    });
  }

  const removeFromCart = (item: MenuItem) => {
    setCart((prevCart) => prevCart.filter(cartItem => cartItem.item.id !== item.id));
  }

  const handleCreateOrder = async () => {
    if(cart.length != 0){

      try {
        const order = await createOrder("pending") // Replace with the actual user ID
        if (order) {
          await Promise.all(cart.map(async (itm) => {
             await createOrderItem(order.id, itm.item.id, itm.quantity)
          }))
          setCart([])

          router.push(`/thanks/${order.id}`)
        }
      } catch (error) {
        console.error('Error creating order:', error)
      }
    }
  }
  return (
    <div className='flex gap-4 w-full p-6'>
      <div className="w-2/3 grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div className='bg-secondary rounded-xl p-4 text-center flex flex-col justify-between duration-300 hover:bg-slate-200' key={item.id}>
            <h2 className='text-lg text-left'>{item.name}</h2>
            <p className='text-sm font-light text-left'>{item.description}</p>
            <h1 className='text-xl font-semibold text-right m-2'>Rs {item.price}</h1>
            <Button size={'sm'}
              onClick={() => addToCart(item)}
            >Add to Cart</Button>
          </div>
        ))}
      </div>
      <div className='w-1/3'>
        <Card>
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
            <CardDescription>Add or Remove Items to your Cart</CardDescription>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map(cartItem => (
                <div key={cartItem.item.id} className="flex justify-between items-center mb-2">
                  <div>
                    <span>{cartItem.item.name} x {cartItem.quantity}</span>
                    <br/>
                    <span className="ml-2">Rs {cartItem.item.price * cartItem.quantity}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant={'outline'} size="icon" onClick={() => addToCart(cartItem.item)}>+</Button>
                    <Button variant={'outline'} size="icon" onClick={() => decreaseQuantity(cartItem.item)}>-</Button>
                    <Button variant={'destructive'} size="icon" onClick={() => removeFromCart(cartItem.item)}><Trash/></Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter className='flex flex-col'>
          

            <div className="flex justify-between items-center px-2 w-full">
              <p className=" text-sm font-semibold flex-grow">Sub Total</p>
              <p className=" text-sm ">Rs {cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0)}</p>
            </div>
          
            <div className="flex justify-between items-center px-2 w-full">
              <p className=" text-sm font-semibold flex-grow">Shipping</p>
              <p className=" text-sm ">Rs 150</p>
            </div>

            <div className="flex justify-between items-center px-2 w-full">
              <p className=" text-sm font-semibold flex-grow">GST (15%) </p>
              <p className=" text-sm ">Rs {cart.reduce((total, item) => total + (item.item.price * item.quantity) , 0)*15/100 }</p>
            </div>

            <div className="flex justify-between items-center px-2 w-full">
              <p className="font-semibold flex-grow">Total </p>
              <p className="text-lg">Rs {cart.reduce((total, item) => total + (item.item.price * item.quantity) , 0)*15/100 + cart.reduce((total, item) => total + (item.item.price * item.quantity) , 0) + 150}</p>
            </div>
              
            <div>
              <Button variant={'default'} size="lg" onClick={() => handleCreateOrder()}>Create Order</Button>
            </div>                        
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Catalogue
