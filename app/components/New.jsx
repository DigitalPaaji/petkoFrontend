import Image from 'next/image'
import React from 'react'

function Terms() {
  return (
    <div className=' hidden  lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-4 md:mx-12 xl:mx-24 2xl:mx-40 px-6  py-12 lg:py-6 my-6 bg-white'>
<div className='flex items-center gap-4 w-full p-3  xl:px-6 border-b md:border-b-0 md:border-r border-[#66666644] '>
  <div><Image alt='' width={44} height={44} className='w-12 h-12 object-cover' src={'/Images/frontend/cat.png'}/></div>
  <div >
<h3 className='head'>
Free Delivery</h3>
<p className='font-medium text-sm text-[#666]'>For all oders over $99</p>
  </div>
</div>

<div className='flex items-center gap-4 w-full p-3  xl:px-6 border-b md:border-b-0 lg:border-r border-[#66666644] '>
  <div><Image alt='' width={44} height={44} className='w-12 h-12 object-cover' src={'/Images/frontend/cat.png'}/></div>
  <div >
<h3 className='head'>
Free Delivery</h3>
<p className='font-medium text-sm text-[#666]'>For all oders over $99</p>
  </div>
</div>

<div className='flex items-center gap-4 w-full p-3  xl:px-6 border-b md:border-b-0 md:border-r border-[#66666644] '>
  <div><Image alt='' width={44} height={44} className='w-12 h-12 object-cover' src={'/Images/frontend/cat.png'}/></div>
  <div >
<h3 className='head'>
Free Delivery</h3>
<p className='font-medium text-sm text-[#666]'>For all oders over $99</p>
  </div>
</div>

<div className='flex items-center gap-4 w-full p-3  xl:px-6 '>
  <div><Image alt='' width={44} height={44} className='w-12 h-12 object-cover' src={'/Images/frontend/cat.png'}/></div>
  <div >
<h3 className='head'>
Free Delivery</h3>
<p className='font-medium text-sm text-[#666]'>For all oders over $99</p>
  </div>
</div>
    </div>
  )
}

export default Terms