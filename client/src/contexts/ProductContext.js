import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { productReducer } from "../reducers/productReducer";
import {
  ADD_PRODUCT,
  apiUrl,
  DELETE_PRODUCT,
  FIND_PRODUCT,
  FIND_PRODUCT_BY_MSLVT,
  PRODUCTS_LOADED_FAIL,
  PRODUCTS_LOADED_SUCCESS,
  UPDATE_PRODUCT,
} from "./constants";
import { toast } from "react-toastify";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, {
    product: null,
    products: [],
    productLoading: true,
    productsLoading: true,
  });

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  // Post add new product
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(`${apiUrl}/vattu`, newProduct, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        dispatch({ type: ADD_PRODUCT, payload: response.data.products });
        toast.success("Thêm thành công")
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  const getProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/vattu`);
      if (response.data.success) {
        dispatch({
          type: PRODUCTS_LOADED_SUCCESS,
          payload: response.data.products,
        });
        return response.data.products
      }
      return [];
    } catch (error) {
      dispatch({ type: PRODUCTS_LOADED_FAIL });
      return [];
    }
  };
  const filterProduct = (word) => {
    console.log("word ",word)
    //create a new array by filtering the original array
    if (word == "") {
      return productState.products;
    } 
    const filteredData = productState.products.filter((product) => {
            return product.tenVatTu.toLowerCase().includes(word);
      })
    return filteredData;
  };
  // xóa sản phẩm
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${apiUrl}/vattu/${productId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_PRODUCT, payload: productId });
        toast.success("Xóa thành công")
        return productId;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  // Tìm sản phẩm
  const findProduct = async (_id) => {
    try {
      const res = await axios.get(`${apiUrl}/vattu/${_id}`);
      if (res.data.success) {
        dispatch({ type: FIND_PRODUCT, payload: res.data.product });
        return res.data.product;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  // tim theo loai vat tu
  const findByMslvt = async (mslvt) => {
    try {
      const res = await axios.get(`${apiUrl}/vattu?mslvt=${mslvt}`);

      if (res.data.success) {
        dispatch({ type: FIND_PRODUCT_BY_MSLVT, payload: res.data.products });
        return res.data.product;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  // update product

  const updateProduct = async (updateProduct) => {
    try {
      const res = await axios.put(
        `${apiUrl}/vattu/${updateProduct.msvt}`,
        updateProduct
      );
      if (res.data.success) {
        getProducts()
        toast.success("Cập nhật thành công")
        
        return res.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  const productContextData = {
    productState,
    showAddProductModal,
    setShowAddProductModal,
    addProduct,
    getProducts,
    deleteProduct,
    setShowUpdateProductModal,
    showUpdateProductModal,
    findProduct,
    findByMslvt,
    updateProduct,
    filterProduct
  };
  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
