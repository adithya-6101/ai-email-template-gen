"use client"
import { useUserDetail } from '@/app/Provider'
import { Button } from '@/components/ui/button'
import EmailTemplateList from '@/components/ui/custom/EmailTemplateList'
import Header from '@/components/ui/custom/Header'
import Link from 'next/link'
import React from 'react'

function dashboard() {
  const {userDetail, setUserDetail}=useUserDetail()
    return (
    <div>
      {/* <Header/> */}
      <div className='p-10 md:px-28 lg:px-40 xl:px-56 mt-16'>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-3xl'>Hello, {userDetail?.name}</h2>
            <Link href={'/dashboard/create'}>
            <Button>+ Create New Email Template</Button>
            </Link>
        </div>
        <EmailTemplateList/>
      </div>
    </div>
  )
}

export default dashboard
