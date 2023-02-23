import axios from 'axios'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import { productReducer } from '../reducers/productReducer'
import { ADD_PRODUCT, apiUrl, DELETE_PRODUCT,FIND_PRODUCT, FIND_PRODUCT_BY_MSLVT, PRODUCTS_LOADED_FAIL, PRODUCTS_LOADED_SUCCESS, UPDATE_PRODUCT } from './constants'

export const ProductContext = createContext()

const ProductContextProvider = ({children}) => {

    const [productState, dispatch] = useReducer(productReducer,{
        product:null,
        products:[],
        productLoading:true,
        productsLoading:true,
    })

    const [showAddProductModal, setShowAddProductModal] = useState(false)
    const [showUpdateProductModal, setShowUpdateProductModal] = useState(false)
    // Post add new product
    const addProduct = async (newProduct) => {
        try {
            console.log("new vat tu : ", newProduct)
            const response = await axios.post(
                `${apiUrl}/vattu`,
                newProduct,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },                    
                }
            )
            if (response.data.success) {
                dispatch({type: ADD_PRODUCT, payload:response.data.products})
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }

    }
    const getProducts = async () =>{
        try {
          const response = await axios.get(`${apiUrl}/vattu`)
          if (response.data.success) {
             dispatch({type:PRODUCTS_LOADED_SUCCESS,payload:response.data.products})
          }
        } catch (error) {
          dispatch({type:PRODUCTS_LOADED_FAIL})
        }
      }
    useEffect( ()=>{ getProducts()},[])
    // xóa sản phẩm
    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`${apiUrl}/vattu/${productId}`)
            if (response.data.success) {
                dispatch({type: DELETE_PRODUCT,payload:productId})
                return productId
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    // Tìm sản phẩm
    const findProduct = async (_id) => {
        try {
            const res = await axios.get(`${apiUrl}/vattu/${_id}`)
            if (res.data.success) {
                dispatch({type: FIND_PRODUCT, payload: res.data.product})
                return res.data.product
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    // tim theo loai vat tu
    const findByMslvt = async (mslvt) => {
        try {
            const res = await axios.get(`${apiUrl}/vattu?mslvt=${mslvt}`)

            if (res.data.success) {
                dispatch({type: FIND_PRODUCT_BY_MSLVT, payload: res.data.products})
                return res.data.product
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    // update product 

    const updateProduct = async (updateProduct) => {
        try {
            const res = await axios.put(`${apiUrl}/vattu/${updateProduct._id}`,updateProduct)
            if (res.data.success) {
                dispatch({type: UPDATE_PRODUCT, payload: res.data.product})
                return res.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }

    }
    const productContextData = {
        productState,showAddProductModal,
        setShowAddProductModal,
        addProduct, 
        getProducts, 
        deleteProduct,
        setShowUpdateProductModal,
        showUpdateProductModal,
        findProduct,
        findByMslvt,
        updateProduct
    }
    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider