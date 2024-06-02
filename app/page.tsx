import { getAllMenuItems } from '@/actions/product'
import Catalogue from '@/components/home/catalogue'
import { cookies } from 'next/headers'
import React from 'react'
import { redirect } from 'next/navigation'

const HomePage = async () => {
 



  const products = await getAllMenuItems()
  return (
    <div className="w-full">
      {/* sfgg */}
      <Catalogue items = {products}/>
    </div>
     )
}

export default HomePage