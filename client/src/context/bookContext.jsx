import { createContext, useReducer, useState } from "react";
import {handleSearch,viewSuggestions} from "../api/search"
const reducer=(state,action)=>{
    switch (action.type) {
        case "OP_LOADING":
            return {
                ...state,loading:true
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                errorMessage:"",
                error:""
            }
        case "GET_SEARCH_RESULT":
            return {
                ...state,
                result:action.payload,
                loading:false,
                isActive:true,
            }
        case "GET_SUGGESTIONS":
            return {
                ...state,
                suggestions:action.payload,
                loading:false
            }
        case "OP_FAILED":
            return {
                ...state,
                errorFailed:action.payload,
                loading:false
            }
        case "IS_ACTIVE":
            return {
                ...state,
                isActive:!state.isActive
            }
        case "ENTER_SEARCH_KEY":
            return {
                ...state,
                searchKey:action.payload
            }
        case "SELECT_TYPE":
            return {
                ...state,
                selectedType:action.payload
            }
        case "SET_ERROR":
            return {
                ...state,
                error:action.payload
            }
        default:
            return state
    }
}

export const bookContext=createContext()

export const BookProvider=({children})=>{
    const initialState={
        loading:false,
        result:[],
        searchKey:"",
        selectedType:"simple",
        suggestions:[],
        isActive:false,
        error:"",
        errorFailed:""
    }
    const [state,dispatch]=useReducer(reducer,initialState)
    const enterSearchKey=(e)=>{
            dispatch({
                type:"ENTER_SEARCH_KEY",
                payload:e.target.value
            })
    }

    const selectType=(e)=>{
        dispatch(
            {
                type:"SELECT_TYPE",
                payload:e.target.value
            }
        )
    }

    const handleIsActive=(e)=>{
        dispatch({
            type:"IS_ACTIVE"
        })
    }

    const submitSearch=async()=>{
        dispatch({
            type:"OP_LOADING"
        })
            const result =await handleSearch(state.searchKey,state.selectedType)
            dispatch({
                type:"GET_SEARCH_RESULT",
                payload:result
            })
    }

    const viewSuggestionsFun=async ()=>{
        dispatch({
            type:"OP_LOADING"
        })
        const result=await viewSuggestions(state.selectedType)
        dispatch({
            type:"GET_SUGGESTIONS",
            payload:result
        })
    }

    const setError=(error)=>{
        dispatch({
            type:"SET_ERROR",
            payload:error
        })
    }


    const clearError=()=>{
        dispatch({
            type:"CLEAR_ERROR"
        })
    }

    

    return (
        <bookContext.Provider value={{
            state,
            selectType,
            viewSuggestionsFun,
            submitSearch,
            handleIsActive,
            enterSearchKey,
            clearError,
            setError
        }}>
                {children}
        </bookContext.Provider>
    )
}