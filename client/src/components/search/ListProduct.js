import { React, useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext'
import "./style.css"

function ListProduct(props) {
    const {productState:{products}}= useContext(ProductContext);

    //create a new array by filtering the original array
    const filteredData = products.filter((product) => {
        //if no input the return the original
        if (props.input === '') {
            return product;
        }
        //return the item which contains the user input
        else {
            return product.tenVatTu.toLowerCase().includes(props.input)
        }
    }).slice(0,5)
    let body=null;
    if (!filteredData.length) {
        body = <li>Không tìm thấy sản phẩm</li>
    }
    return (
        <div className='search-list-product'>
            <ul>
                {filteredData.map((product) => (
                    <li key={product.msvt}>
                        <NavLink to={"./vattu/"+product.msvt}>{product.tenVatTu}</NavLink>
                    </li>
                ))}
                {body}
            </ul>
        </div>
    )
}
export default ListProduct;