import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
                width="400px" 
                src={apiUrl+"/"+product.diaChiHinh} 
                alt="ảnh sản phẩm"
                className='product-detail-img'
            />
            <div
                className='product-detail-info'
                
            >
                <h3>{product.tenVatTu}</h3>
                <h5>Giá:</h5>
                <span 
                style={{
                    color:'red',
                    fontSize:18
                }}>{VND.format(product.gia)}</span>
                <h5>Mô tả sản phẩm:</h5>
                <p
                style={{
                    fontSize:18
                }}
                >{product.moTa}</p>
                <Button variant="secondary" onClick={()=>{
                    if (isAuthenticated) {
                        addProductToCart(product)
                    } else {
                        window.location.replace('/dangnhap');
                    }
                }}>
                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" size="x" className='mx-2'/>
                    Thêm vào giỏ
                </Button>
                <Button>Mua ngay</Button>
            </div>
        </div>
    </>
  )
}

export default ProductDetail