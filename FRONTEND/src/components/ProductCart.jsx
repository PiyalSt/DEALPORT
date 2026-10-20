import React from 'react'
import assets from '../assets/assets'

const ProductCart = () => {
  return (
    <div className='p-2 py-4 bg-neutral-100 rounded-md'>
      <div>
        <img src={assets.showcase} alt="" />
      </div>
      <div className='space-y-2'>
        <h2 className='text-lg font-semibold text-neutral-800'>Product Name</h2>
        <p className='text-base font-medium text-neutral-500'>Product description here read anytime.</p>
        <div className='flex gap-2 items-center'>
            <p className='text-2xl text-green-500'>$129.99</p>
            <p className='text-sm line-through text-neutral-400'>($253.78)</p>
        </div>
        <button className='w-full py-2 bg-green-500 rounded-md text-white active:scale-95 transition-all duration-200 cursor-pointer'>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductCart