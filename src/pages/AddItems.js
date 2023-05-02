import React, { useState } from 'react'

const AddItems = () => {
  const [formData, setFormData] = useState({
    dishName: '',
    price: '',
    image: '',
    rating: '',
    id: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
  }

  return (
    <div className='h-screen pt-24 bg-gray-100'>
      <div className='max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden'>
        <form onSubmit={handleSubmit} className='p-6'>
          <div className='mb-4'>
            <label htmlFor='dishName' className='block font-medium text-gray-700'>Dish Name:</label>
            <input
              type='text'
              id='dishName'
              name='dishName'
              value={formData.dishName}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='price' className='block font-medium text-gray-700'>Price:</label>
            <input
              type='text'
              id='price'
              name='price'
              value={formData.price}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='image' className='block font-medium text-gray-700'>Image:</label>
            <input
              type='text'
              id='image'
              name='image'
              value={formData.image}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='rating' className='block font-medium text-gray-700'>Rating:</label>
            <input
              type='text'
              id='rating'
              name='rating'
              value={formData.rating}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='id' className='block font-medium text-gray-700'>ID:</label>
            <input
              type='text'
              id='id'
              name='id'
              value={formData.id}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>
          <button type='submit' className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddItems
