import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { khuyenMaiReducer } from "../reducers/khuyenMaiReducer";
import { ADD_KHUYENMAI, apiUrl, GET_KHUYENMAI, GET_KHUYENMAI_DETAIL, SET_KHUYENMAI } from "./constants";

export const KhuyenMaiContext = createContext()

const KhuyenMaiContextProvider = ({ children }) => {
    
    const [khuyenMaiState, dispatch] = useReducer(khuyenMaiReducer, {
        khuyenMai: null,
        danhSachKhuyenMai:[],
        khuyenMaiLoading: true,
    })

    const [showAddKhuyenMaiModal, setShowAddKhuyenMaiModal] = useState(false);
    const [showUpdateKhuyenMaiModal, setShowUpdateKhuyenMaiModal] = useState(false);
    const setKhuyenMai = () =>{
        dispatch({type: SET_KHUYENMAI, payload: ""})
    }
    // lấy khuyen mai
    const getDSKhuyenMai = async () => {
        try {
            const response = await axios.get(`${apiUrl}/khuyenmai`)
            if (response.data.success) {
                dispatch({type: GET_KHUYENMAI, payload: response.data.discountList})
            } else {
                console.log("lỗi lấy danh sách khuyến mãi")
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    const deleteKhuyenMai = async (mskm) => {
        try {
            const response = await axios.delete(`${apiUrl}/khuyenmai/${mskm}`)
            if (response.data.success) {
                getDSKhuyenMai()
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    const getById = async (id)=> {
        try {
            const res = await axios.get(`${apiUrl}/khuyenMai/${id}`)
            if (res.data.success) {
                dispatch({type:GET_KHUYENMAI_DETAIL,payload:res.data.discount})
                return res.data
            }
        } catch (error) {
            return  {success:false, message: 'Lỗi khi lấy khuyến mãi!!!'}
        }
    }
    const addKhuyenMai = async (newKhuyenMai) => {
        try {
            const res = await axios.post(`${apiUrl}/khuyenmai`,newKhuyenMai);
            if (res.data.success) {
                getDSKhuyenMai()
            } else {
                return  {success:false, message: 'Lỗi khi thêm khuyến mãi!!!'}
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
            
        }
    } 
    const  updateKhuyenMai = async (updateData) => {
        try {
            const res = await axios.put(`${apiUrl}/khuyenmai`,updateData);
            if (res.data.success) {
                getDSKhuyenMai()
            } else {
                return  {success:false, message: 'Lỗi khi cập nhật khuyến mãi!!!'}
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
            
        }
    } 

    const openModalKhuyenMai = useState(false);
   

    const khuyenMaiContextData = {
        khuyenMaiState,
        setKhuyenMai,
        getDSKhuyenMai,
        addKhuyenMai,
        deleteKhuyenMai,
        getById,
        openModalKhuyenMai,
        updateKhuyenMai,
        setShowAddKhuyenMaiModal,
        showAddKhuyenMaiModal,
        showUpdateKhuyenMaiModal,
        setShowUpdateKhuyenMaiModal
    }

    return (
        <KhuyenMaiContext.Provider value={khuyenMaiContextData}>
            {children}
        </KhuyenMaiContext.Provider>
    )
}

export default KhuyenMaiContextProvider