import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { CartContext } from '../../contexts/CartContext'
import { VND } from '../../utils/format'

function CartRow({product, index, deleteProductInCart}) {
  const {tangSoLuong} = useContext(CartContext)
  let [state, setState] = useState(product.soLuong)
  const handleChange = (e) => {
    if (e.target.value>0){
      setState(e.target.value)
      tangSoLuong(e.target.value, index)
    } else {
      setState(1)
    }
  }

  return (
    <>
        <tr >
            <td>{index + 1 }</td>
            <td>{product.tenVatTu}</td>
            <td>{VND.format(product.gia)}</td>
            <td>
              <input type="number" value={state} onChange={handleChange}/>
            </td>
            <td>{VND.format(product.tongGia)}</td>
            <td>
              <Button onClick={()=> {deleteProductInCart(product)}}>Xóa</Button>  
            </td>
          </tr>
    </>
  )
}

export default CartRow