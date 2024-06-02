import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AdminPage = () => {
  return (
    <div className='w-full p-6 space-y-6'>
      <div className='my-6'>
        <h1 className="text-2xl">
          Admin Dashbord
        </h1>
      </div>
      
      <Link href={'/admin/menu/categories'}>
          <div className='rounded-xl bg-secondary p-6 flex justify-center items-end hover:bg-slate-300 ease-in-out transition-all duration-300 my-6'>
            <h1 className='text-xl pt-10 flex-grow'>Manage Categories</h1>
            <ArrowUpRightIcon/>
          </div>
        </Link>
      <Link href={'/admin/menu'}>
        <div className='rounded-xl bg-secondary p-6 flex justify-center items-end hover:bg-slate-300 ease-in-out transition-all duration-300 my-6'>
          <h1 className='text-xl pt-10 flex-grow'>Manage Menu</h1>
          <ArrowUpRightIcon/>
        </div>
      </Link>
      <Link href={'/admin/orders'}>
        <div className='rounded-xl bg-secondary p-6 flex justify-center items-end hover:bg-slate-300 ease-in-out transition-all duration-300 my-6'>
          <h1 className='text-xl pt-10 flex-grow'>Manage Orders</h1>
          <ArrowUpRightIcon/>
        </div>
      </Link>
     
    </div>
  )
}

export default AdminPage