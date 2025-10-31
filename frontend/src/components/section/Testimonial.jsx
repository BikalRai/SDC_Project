import React from 'react'

const Testimonial = () => {
  return (
    <>
    <div className='py-8 bg-white'>
        <h2 className='text-3xl font-semibold text-center mb-6'>Testimonials</h2>
        <p className='text-center m-6'>What Our Users Say</p>

        {/* description */}
        <div className='max-w-4xl mx-auto text-center text-gray-600'>
            <p className='mb-4 w-4/10 mx-auto'>"Rented a scooter from Kiraya Bazar the process was super easy, affordable, and the ride was smooth all day!"</p>
            <div className='flex justify-center'>
              <img src="https://images.unsplash.com/photo-1627087820883-7a102b79179a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" alt="User" className='rounded-full w-12 h-12 mr-2 object-cover' />
              <p className='font-semibold'>- Alex Johnson</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Testimonial