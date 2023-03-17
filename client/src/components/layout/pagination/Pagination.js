import Pagination from 'react-bootstrap/Pagination';

function PaginationItem(props) {
    const {onPageChange,totalPage,currentPage} = props
    let items = [];
  
    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={()=>{onPageChange(number)}}>
          {number}
        </Pagination.Item>,
      );
    }


    return (
        <Pagination >{items}</Pagination>
    )
}


export default PaginationItem;