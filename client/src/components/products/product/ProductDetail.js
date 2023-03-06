import React, { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { AuthContext } from '../../../contexts/AuthContext'
import { CartContext } from '../../../contexts/CartContext'
import { apiUrl } from '../../../contexts/constants'
import { VND } from '../../../utils/format'
import './style.css'

function ProductDetail(props) {
    const {product}  = props

    const {addProductToCart,setShowToast} = useContext(CartContext)
    const {authState: {isAuthenticated}} = useContext(AuthContext)
  return (
    <>
        <div className='product-detail' >
            <img 
                width="520px" 
                src={apiUrl+"/"+product.diaChiHinh} 
                alt="ảnh sản phẩm"
                className='product-detail-img'
            />
            <div
                className='product-detail-info'
                
            >
                <h3>{product.tenVatTu}</h3>
                <span 
                style={{
                    color:'red',
                    fontSize:18
                }}>{VND.format(product.gia)}</span>
                <pre
                style={{
                    fontSize:18
                }}
                >{product.moTa}</pre>
                <Button variant="primary" onClick={()=>{
                    if (isAuthenticated) {
                        addProductToCart(product)
                    } else {
                        window.location.replace('/dangnhap');
                    }
                }}>Thêm vào giỏ</Button>
                <Button>Mua ngay</Button>
            </div>
        </div>
    </>
  )
}

export default ProductDetail