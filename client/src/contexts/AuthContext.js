import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducers/authReducer'
import { apiUrl,LOCAL_STORAGE_TOKEN_NAME } from './constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
            authLoading: true,
            isAuthenticated: false,
            user: null,
        })
    
    //Authenticate user
    const loadUser = async (quanLy=0) => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            let response;
            if (!quanLy) {
                response = await axios.get(`${apiUrl}/taikhoan`)
            } else {
                response = await axios.get(`${apiUrl}/taikhoan/admin`)
            }
            if (response.data.success) {
                dispatch({
                    type:'SET_AUTH',
                    payload: {isAuthenticated: true, user: response.data.taiKhoan}
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null}
            })
        }
    }

    useEffect(  () =>{loadUser()},[])

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/taikhoan/dangnhap`, userForm)
            if (response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            let quanLy = response.data.account.quanLy;
            await loadUser(quanLy)
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data 
            else return {success: false, message: error.message}
        }
    }
    // Register
	const registerUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/taikhoan/dangky`, userForm)
			if (response.data.success){
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                )
            }
            
            await loadUser()

			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}
    // Logout
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null}
		})
	}

    //Context  data
    const authContextData = {loginUser, registerUser, logoutUser, authState}
    //return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
