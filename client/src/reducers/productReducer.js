import { ADD_PRODUCT, DELETE_PRODUCT, FIND_PRODUCT, FIND_PRODUCT_BY_MSLVT, PRODUCTS_LOADED_FAIL, PRODUCTS_LOADED_SUCCESS,  UPDATE_PRODUCT } from '../contexts/constants'

export const productReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCTS_LOADED_SUCCESS:
            return {
                ...state,
                products: payload,
                productsLoading: false
            }
        case PRODUCTS_LOADED_FAIL:
            return {
                ...state,
                products: [],
                productsLoading: false
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: payload,
            }
 
        case FIND_PRODUCT:
            return {
                ...state,
                product: payload,
                productLoading: false
            }
        case FIND_PRODUCT_BY_MSLVT:
                return {
                    ...state,
                    products: payload,
                    productsLoading: false
                }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.msvt !== payload),
            }
        default:
            return state
    }
}