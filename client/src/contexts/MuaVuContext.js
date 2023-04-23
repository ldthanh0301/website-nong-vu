import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { muaVuReducer } from "../reducers/muaVuReducer";
import { ADD_MUAVU, apiUrl, DELETE_MUAVU, GET_MUAVU } from "./constants";
import { toast } from "react-toastify";

export const MuaVuContext = createContext()

const MuaVuContextProvider = ({ children }) => {
    
    const [muaVuState, dispatch] = useReducer(muaVuReducer, {
        muaVu: [],
        muaVuLoading: true,
    })

    const [showAddMuaVuModal, setShowAddMuaVuModal] = useState(false)

    // lấy mua vụ 
    const getMuaVu = async () => {
        try {
            const response = await axios.get(`${apiUrl}/muavu`)
            if (response.data.success) {
                dispatch({type: GET_MUAVU, payload: response.data.muavu})
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    const deleteMuaVu = async (msmv) => {
        try {
            const response = await axios.delete(`${apiUrl}/muavu/${msmv}`)
            if (response.data.success) {
                dispatch({type: DELETE_MUAVU,payload:msmv})
                toast.success("Xóa thành công")
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
        }
    }
    const addMuaVu = async (vu) => {
        try {
            const res = await axios.post(`${apiUrl}/muavu`,vu);
            if (res.data.success) {
                const id = res.data.insertId;
                const muaVu = await axios.get(`${apiUrl}/muavu/${id}`)
                dispatch({type: ADD_MUAVU,payload: muaVu.data})
                toast.success("Thêm thành công")
                return res.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success:false, message: 'server error'}
            
        }
    } 
    const muaVuContextData = {
        muaVuState,
        getMuaVu,
        deleteMuaVu,
        addMuaVu,
        showAddMuaVuModal,
        setShowAddMuaVuModal
    }

    return (
        <MuaVuContext.Provider value={muaVuContextData}>
            {children}
        </MuaVuContext.Provider>
    )
}

export default MuaVuContextProvider