import { Button, Label, Pagination, Table, TextInput } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'


import {  HiPencilSquare, HiPlus,  HiTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import SaleListRow from './SaleListRow'
import { debounce } from 'lodash'
import { HiX } from 'react-icons/hi'
import Pagin from './Pagin'


const VouncherList = () => {
  const [search,setSearch] = useState("");
  const [cross,setCross] = useState(false);
  const inputRef = useRef();
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const {data, error, isLoading} = useSWR(!search ? (import.meta.env.VITE_BASE_URL+"/vouchers"):(
    search
  ), fetcher);
  
  console.log(data);
 const handleSearch = debounce((value)=>{
  // setSearch(e.target.value)
  setSearch(import.meta.env.VITE_BASE_URL+"/vouchers?q="+value)
  console.log(inputRef.current.value)

 },1000)

 const onSearchChange = (e)=>{
  setCross(true);
    handleSearch(e.target.value)
 }
 const onClearSearch = ()=>{
  inputRef.current.value = ""
  setSearch("")
  setCross(false);
 }
 
 
 (!isLoading && console.log("start"))
  return (
    <div className='mt-5'>
    <div className=' flex justify-between items-center mb-3'>
    <div className="max-w-md relative">
 
  <TextInput ref={inputRef} onChange={onSearchChange} id="email4" type="text" icon={BiSearch}   placeholder="Search Vouncher" required />
   {cross&& (<HiX className='absolute top-4 end-3 cursor-pointer' fill='red' onClick={onClearSearch}/>)}
  
</div>
<div className=' bg-blue-600 rounded-lg px-5 text-white '>
    <Link to="/sale" className=' flex p-3 rounded-lg justify-center items-center'>
    Create Sale
    <HiPlus/>
    </Link>
</div>
    </div>
    <Table striped>
    <Table.Head>
    <Table.HeadCell>Voucher Id</Table.HeadCell>
      <Table.HeadCell>Customer name</Table.HeadCell>
      <Table.HeadCell className=' text-end'>Email</Table.HeadCell>
      <Table.HeadCell className=' text-end'>Created At</Table.HeadCell>
      <Table.HeadCell className=' text-end'>Action</Table.HeadCell>
     
    </Table.Head>
    <Table.Body className="divide-y">
    <Table.Row className="bg-white hidden dark:border-gray-700 dark:bg-gray-800 colspan-5 last:table-row">
        <Table.Cell colSpan={5} className=" text-center whitespace-nowrap  font-medium text-gray-900 dark:text-white col-span-5 w-full">
         There is not any Product
        </Table.Cell>
        
      </Table.Row>
    {
      isLoading ? (
        
<Table.Row  className="bg-white dark:border-gray-700 dark:bg-gray-800 animate-pulse">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-400 dark:text-gray-600">
        <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </Table.Cell>
      <Table.Cell className="text-end">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </Table.Cell>
      <Table.Cell className="text-end">
        <div className="space-y-1">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </Table.Cell>
      <Table.Cell className="text-end">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </Table.Cell>
    </Table.Row>
    
 ):(
      data.data?.map((list)=> (<SaleListRow key={list.voucher_id} list={list}/>))
      )
    }
    
    </Table.Body>
  </Table>
{!isLoading &&( <Pagin links={data.links} meta={data.meta} setUrl={setSearch}/>)}
</div>
  )
}

export default VouncherList
