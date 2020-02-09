export const SET_LOADING = "SET_LOADING";
export const UNSET_LOADING = "UNSET_LOADING";


export function setLoading(){
    return {
        type: SET_LOADING,
    }
}

export function unsetLoading(){
    return {
        type: UNSET_LOADING,
    }
}