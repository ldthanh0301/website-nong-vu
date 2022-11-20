
import axios from 'axios'
import React, { createContext, useReducer, useState } from 'react'
import { donHangReducer } from '../reducers/donHangReducer'
import {apiUrl, GET_ORDERS} from './constants'

export const DonHangContext = createContext()

const  DonHangContextProvider =  ({children})=> {
    const [orderState,dispatch] = useReducer(donHangReducer, {
        ordersLoading: true,
        orders:[]
    })
    const datHang = async () => {
        let data;
        
        try {
            let res = await  axios.post(`${apiUrl}/dathang`, data)
            
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    const getOrders = async function() {
        try {
            let res = await axios.get(`${apiUrl}/dathang`)
            dispatch({type: GET_ORDERS, payload: res.data.orders})
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    const donHangContextData = {datHang,orderState,getOrders}
    return (
        <DonHangContext.Provider value={donHangContextData}>
            {children}
        </DonHangContext.Provider>
    )
}

export default DonHangContextProvider
