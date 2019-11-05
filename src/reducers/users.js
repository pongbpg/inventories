import { Types } from '../actions/users'
const INIT_STATE = {
    items: [],
    error: '',
};

export default function users(state = INIT_STATE, action) {
    switch (action.type) {
        case Types.GET_USERS_SUCCESS: {
            return {
                ...state,
                items: action.payload.items
            }
        }
        case Types.USERS_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: {
            return state
        }
    }
}