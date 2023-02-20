import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PaginationProduct(props) {
    const {onPageChange,totalPage,currentPage} = props
    let items = [];
    
    // const chosePage = (event) => {
    //     setActive(Number(event.target.id));
    // }
    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={()=>{onPageChange(number)}}>
          {number}
        </Pagination.Item>,
      );
    }


    return (
        <Pagination>{items}</Pagination>
    )
}


export default PaginationProduct;