import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { donHangReducer } from "../reducers/donHangReducer";
import { AuthContext } from "./AuthContext";
import {
  apiUrl,
  GET_ORDERS,
  GET_ORDERS_BY_USER,
  GET_ORDER_INFO,
} from "./constants";

export const DonHangContext = createContext();

const DonHangContextProvider = ({ children }) => {
  const [orderState, dispatch] = useReducer(donHangReducer, {
    ordersLoading: true,
    orders: [],
    orderInfo: {
      products: [],
      info: null,
    },
    orderInfoLoading: true,
  });
  const {
    authState: { user },
  } = useContext(AuthContext);
  const datHang = async () => {
    let data;

    try {
      let res = await axios.post(`${apiUrl}/donhang`, data);
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  const getOrders = async function (status) {
    try {
      let res;
      if (!status) {
        res = await axios.get(`${apiUrl}/donhang`);
      } else {
        res = await axios.get(`${apiUrl}/donhang/${status}`);
      }
      dispatch({ type: GET_ORDERS, payload: res.data.orders });
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  // get order by id user
  const getOrderByUser = async () => {
    try {
      let res = await axios.get(`${apiUrl}/donhang/user/${user.msnd}`);
      dispatch({ type: GET_ORDERS_BY_USER, payload: res.data.orders });
      console.log("dơn hàng: ", orderState.orders);
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };

  // filter order by status
  const filterOrderUserByStatus = async (status) => {
    try {
      let res = await axios.get(
        `${apiUrl}/donhang/user/${user.msnd}?status=${status}`
      );
      dispatch({ type: GET_ORDERS_BY_USER, payload: res.data.orders });
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  
  // filter order user by category
  const filterOrderUserByCategory = async (mslvt) => {
    try {
      let res = await axios.get(
        `${apiUrl}/donhang/user/${user.msnd}?mslvt=${mslvt}`
      );
      dispatch({ type: GET_ORDERS_BY_USER, payload: res.data.orders });
      console.log("order:", res.data.orders)

    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  const changeState = async (state, msdh) => {
    try {
      let res = await axios.patch(`${apiUrl}/donhang`, { msdh, state });
      getOrders();
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  // lấy chi tiết đơn hàng
  const chiTietDonHang = async (msdh) => {
    try {
      let res = await axios.get(`${apiUrl}/donhang/chitietdonhang/${msdh}`);
      if (res.data.success) {
        let order = orderState.orders.filter((e) => e.msdh == msdh)[0];
        let orderInfo = {
          products: res.data.chiTietDonHang,
          info: order,
        };
        dispatch({ type: GET_ORDER_INFO, payload: orderInfo });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  const donHangContextData = {
    datHang,
    orderState,
    getOrders,
    changeState,
    chiTietDonHang,
    getOrderByUser,
    filterOrderUserByStatus,
    filterOrderUserByCategory
  };
  return (
    <DonHangContext.Provider value={donHangContextData}>
      {children}
    </DonHangContext.Provider>
  );
};

export default DonHangContextProvider;
