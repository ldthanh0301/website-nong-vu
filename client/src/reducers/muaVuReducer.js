import { ADD_MUAVU, DELETE_MUAVU, GET_MUAVU } from "../contexts/constants"

export const muaVuReducer = (state, action) => {
    const { type, payload }= action

    switch (type) {
        case GET_MUAVU:
            return {
                ...state,
                muaVuLoading: false,
                muaVu: payload
            }
        case ADD_MUAVU:
            return {
                ...state,
                muaVu: [...state.muaVu,payload]
            }
        case DELETE_MUAVU:
            return {
                ...state,
                muaVu: state.muaVu.filter(vu => vu.msmv !== payload),
            }
        default:
            return state
    }
}