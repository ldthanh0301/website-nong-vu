export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://sleepy-inlet-56101.herokuapp.com/api";
export const chatServerURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/"
    : "https://sleepy-inlet-56101.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";

// products

export const PRODUCTS_LOADED_SUCCESS = "PRODUCTS_LOADED_SUCCESS";
export const PRODUCTS_LOADED_FAIL = "PRODUCTS_LOADED_FAIL";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FIND_PRODUCT = "FIND_PRODUCT";
export const FIND_PRODUCT_BY_MSLVT = "FIND_PRODUCT_BY_MSLVT";

export const CATEGORIES_LOADED_SUCCESS = "CATEGORIES_LOADED_SUCCESS";
export const CATEGORIES_LOADED_FAIL = "CATEGORIES_LOADED_FAIL";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const FIND_CATEGORY = "FIND_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
//muavu
export const GET_CART = "GET_CART";
export const GET_MUAVU = "GET_MUAVU";
export const ADD_MUAVU = "ADD_MUAVU";
export const DELETE_MUAVU = "DELETE_MUAVU";
//khuyen mai
export const GET_KHUYENMAI = "GET_KHUYENMAI";
export const SET_KHUYENMAI = "SET_KHUYENMAI";
export const GET_KHUYENMAI_DETAIL = "GET_KHUYENMAI_DETAIL";
export const ADD_KHUYENMAI = "ADD_KHUYENMAI";
export const DELETE_KHUYENMAI = "DELETE_KHUYENMAI";
//cart
export const Add_PRODUCT_TO_CART = "Add_PRODUCT_TO_CART";
export const DELETE_PRODUCT_IN_CART = "DELETE_PRODUCT_IN_CART";
export const RESET_CART = "RESET_CART";
export const Tang_So_Luong = "Tang_So_Luong";
export const TINH_GIA_KM = "TINH_GIA_KM";

// don hang
export const DAT_HANG = "DAT_HANG";
export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDERS_BY_USER = "GET_ORDERS_BY_USER";
export const GET_ORDER_INFO = "GET_ORDER_INFO";
