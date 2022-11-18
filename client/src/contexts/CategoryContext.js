import axios from 'axios'
import React, { createContext, useReducer, useState } from 'react'
import { categoryReducer } from '../reducers/categoryReducer'
import { ADD_CATEGORY, apiUrl, CATEGORIES_LOADED_FAIL, CATEGORIES_LOADED_SUCCESS, DELETE_CATEGORY, FIND_CATEGORY, UPDATE_CATEGORY } from './constants'

export const CategoryContext = createContext()

const  CategoryContextProvider =  ({children})=> {
    const [categoryState, dispatch] = useReducer(categoryReducer,{
        category: null,
        categories: [],
        categoriesLoading: true
    })
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
    const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false)
    const [showToast, setShowToast] = useState({ show: false, message:'', type:null})  
    
    // them danh mục
    const addCategory = async (tenLoaiVatTu) => {
       try {
            const res = await axios.post(`${apiUrl}/categories`,{tenLoaiVatTu})
            if (res.data.success) {
                let category = await axios.get(`${apiUrl}/categories/${res.data.insertId}`)
                dispatch({type: ADD_CATEGORY, payload: category.data})
                return res.data
            }
       } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
       }
    }
    // lấy danh mục
    const getCategories = async () => {
        try {
            const res = await axios.get(`${apiUrl}/categories`)
            if (res.data.success) {
                dispatch({type: CATEGORIES_LOADED_SUCCESS, payload: res.data.categories})
            }
        } catch (error) {
            dispatch({type: CATEGORIES_LOADED_FAIL})
        }
    }

    // xóa danh mục
    const deleteCategory = async (id) => {
        console.log('Delete',id)
        const res = await axios.delete(`${apiUrl}/categories/${id}`)
        if (res.data.success) {
            dispatch({type: DELETE_CATEGORY, payload: id})
        }
    }
    // tìm danh mục
    const findCategory =  (_id) => {
        const category = categoryState.categories.find(e => e.mslvt === _id)

        if (category) {
            dispatch({type: FIND_CATEGORY, payload: category })
        }
    }

    // cập nhật danh mục
    const updateCategory = async (category) => {
        try {
            const res = await axios.put(`${apiUrl}/categories/${category.mslvt}`,category)
    
            if (res.data.success) {
                dispatch({type: UPDATE_CATEGORY, payload: res.data.category})
                return res.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}

        }
    }

    const categoryContextData = {
        categoryState, 
        getCategories,
        showAddCategoryModal,
        setShowAddCategoryModal,
        addCategory,
        deleteCategory,
        showUpdateCategoryModal,
        setShowUpdateCategoryModal,
        findCategory,
        updateCategory,
        showToast,
        setShowToast
    }
  return (
    <CategoryContext.Provider value={categoryContextData}>
        {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider