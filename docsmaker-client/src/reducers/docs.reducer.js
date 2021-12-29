import { GET_DOCS } from "../actions/docs.action";

const initialState = {};

export default function docsReducer(state = initialState, action) {
    switch (action.type){
        case GET_DOCS: 
            return action.payload;
        default:
            return state;
    }
}