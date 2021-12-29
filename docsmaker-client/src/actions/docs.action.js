import axios from "axios";

export const GET_DOCS = "GET_DOCS";

export const getDocs = () => {

    return(dispatch) => {
        return axios({
            method: 'GET',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/docs/`
        }).then((res) => {
            dispatch({type: GET_DOCS, payload: res.data})
        }).catch((err) => {
            console.log(err);
        })
    }

}