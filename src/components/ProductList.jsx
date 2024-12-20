import { Button, Label, Table, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'


import {  HiPencilSquare, HiPlus,  HiTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import ProductRow from './ProductRow'
import ProductEmptySpace from './ProductEmptySpace'
import { debounce } from 'lodash'
import Pagin from './Pagin'


const ProductList = () => {
 
  const [search,setSearch] = useState("");
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(search?(search):(import.meta.env.VITE_BASE_URL+"/products"), fetcher);
  const handleSearch = debounce((value)=>{
   setSearch(import.meta.env.VITE_BASE_URL+"/products?q="+value.target.value)
  },500)
console.log(data)
  return (
    <div className='mt-5'>
        <div className=' flex justify-between items-center mb-3'>
        <div className="max-w-md">
     
      <TextInput onChange={handleSearch} id="email4" type="email" icon={BiSearch}   placeholder="Search Product" required />
       
      
    </div>
    <div className=' bg-blue-600 rounded-lg px-5 text-white '>
        <Link to={"/product/productCreate"} className=' flex p-3 rounded-lg justify-center items-center'>
        Add Product
        <HiPlus/>
        </Link>
    </div>
        </div>
        <Table striped>
        <Table.Head>
        <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell className=' text-end'>Price</Table.HeadCell>
          <Table.HeadCell className=' text-end'>Created At</Table.HeadCell>
          <Table.HeadCell className=' text-end'>Updated Ar</Table.HeadCell>
          <Table.HeadCell className=' text-end'>Action</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
          {isLoading ?( <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 animate-pulse">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <div className='bg-gray-300 rounded-lg py-3 w-16 flex justify-end'>

</div>
            </Table.Cell>
            <Table.Cell> <div className='bg-gray-300 rounded-lg py-3 w-16'>

</div></Table.Cell>
            <Table.Cell className='   '>
               <div className='bg-gray-300 rounded-lg py-3 w-16 ms-auto'>

               </div>
            </Table.Cell>
            <Table.Cell className='  '>
               <div className='bg-gray-300 rounded-lg py-3 w-16 ms-auto'>

               </div>
            </Table.Cell>
            <Table.Cell className=' text-end'>
            <div>
      <button className="border border- border-gray-300 bg-gray-300 rounded-lg py-3 w-16 ms-auto"></button>
      <button className="bg-gray-300 rounded-lg py-3 w-16 ms-auto"> </button>
      
    </div>
              
            </Table.Cell>
          </Table.Row>):(
          data.length===0?(<ProductEmptySpace/>):
            (data.data.map(product=>
              (<ProductRow  key={product.id} product={product} />)
            
          ))
          
          )
          }
       
         

         
        </Table.Body>
      </Table>
      {!isLoading ? (<Pagin links={data.links} meta={data.meta} setUrl={setSearch}/>):(<div></div>)}
    </div>
  )
}

export default ProductList
