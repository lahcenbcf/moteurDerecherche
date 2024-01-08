import axios from "axios"

const baseUrl=axios.create({
    baseURL:"http://127.0.0.1:8081"
})
export const handleSearch=async(word,searchType)=>{
    try {
        const res=await baseUrl.get(`/${searchType}Research/${word}`);
        if(res.status == 200) {
            return res.data
        }
        else return []
    } catch (error) {
        console.log(error)
    }
}


export const viewSuggestions=async(searchType)=>{
    try {
        const res=await baseUrl.get(`/suggestion/${searchType}`)
        if(res.status == 200) return res.data
        return []
    } catch (error) {
        console.log(error)
    }
}