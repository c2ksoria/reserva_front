import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'

export default function Pagination_list( {records, recordsPerPage}) {

  const [currentPage, setCurrentPage]= useState(1)
  

  const lastIndex = recordsPerPage * currentPage
  const firstIndex = lastIndex - recordsPerPage
  const npage = records / recordsPerPage
  console.log(firstIndex,lastIndex, npage)

  // let array1 =[]
  // for(var i = firstIndex; i<=; i++) 
  //   {
  //     array1.push(i);
  //   }
  
  function getDecimalRangeAroundX(X) {
    const rangeStart = Math.max(1, Math.floor(X - 4.5));
    const rangeEnd = Math.min(101, Math.ceil(X + 5.5));
  
    const decimalRange = Array.from({ length: 10 }, (_, index) => rangeStart + index);
    return decimalRange;
  }
  
  const X = currentPage;
  const array1 = getDecimalRangeAroundX(X);
  console.log(array1);  // Salida: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  

// console.log(array1)
    // let numbers = array1;
    function changeNumber(id){
        console.log("holas")
        console.log(id)

        setCurrentPage(id)


    }
    function firstPage(){
        changeNumber(1)
    }

    function lastPage(){
        changeNumber(101)
    }

  return (
    <>
<Pagination>
    <Pagination.First onClick={()=> firstPage()}/>
    {/* <Pagination.Prev /> */}

    {array1.map((number) => (

      <Pagination.Item key={number} onClick={()=>changeNumber(number)}>{number}</Pagination.Item>
    ))}
      {/* <Pagination.Ellipsis /> */}

      {/* <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item> */}

      {/* <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item> */}
      {/* <Pagination.Next /> */}
      <Pagination.Last onClick={()=> lastPage()}/>
    </Pagination>
    </>
  )
}
