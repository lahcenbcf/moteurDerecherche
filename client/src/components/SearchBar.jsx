import { useState,useEffect, useContext } from 'react';
import searchOutline from '../assets/SearchOutline.svg';
import Spinner from './Spinner';
import {Link} from "react-router-dom"
import {bookContext} from "../context/resetPassContext"
const isRegularExpression = /[$^]/;

function SearchBar() {
  const {state,submitSearch,selectType,enterSearchKey,handleIsActive,setError}=useContext(bookContext)
  const submit = async () => {
    
    try {
       if(!state.selectedType) {
        console.log(state.selectedType)
        setError("sélectionnner le type de recherche !");
        return;
      }
      if (!state.searchKey.trim().length) {
        setError('saisir quelques chose !');
      }

      if (state.selectedType == 'simple' && isRegularExpression.test(state.searchKey)) {
        setError('terme entrée est une expression régulière !');
        return;
      }
      submitSearch()
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(()=>{
    if(!state.result.length) handleIsActive()
  },[state.result])


  return (
    <div className="w-full xl:w-3/4 mx-auto my-10">
      {state.loading && <Spinner />}
      <div className="w-full rounded-3xl border-2 border-primaryColor flex items-center bg-white my-5 relative">
        {/* search input */}
        <input
          value={state.searchKey}
          onChange={(e) => enterSearchKey(e)}
          type="text"
          className="w-full h-full bg-inherit placeholder:text-slate-400 py-4 px-10 rounded-full outline-none"
          placeholder="Ajoutez quelques choses ..."
        />
        {/*
             <img src={addSvg} alt="addSvg" className="absolute right-24 scale-75" onClick={addItemToList} />
            */}

        <div className="border-l-2 border-l-primaryColor h-full absolute right-5 flex items-center justify-center pl-5">
          <img
            src={searchOutline}
            className="object-cover w-10 h-10"
            alt="searchOutline"
            onClick={submit}
          />
        </div>
      </div>
      {/* 
        <div className="flex flex-wrap gap-2">
    {items.length ? items.map(item =>(
      <SearchItem keyword={item} removeItem={removeItem} />
    )) : ""}
    </div>
  */}
      <div className="flex justify-between">
        {/* select item */}
        <select
          onChange={(e) => selectType(e)}
          value={state.selectedType}
          className="select select-ghost w-full max-w-xs border border-primaryColor outline-none focus:outline-none focus:outline-primaryColor"
        >
          <option disabled selected>
            Sélectionner le type de recherche
          </option>
          <option value={'simple'}>Simple</option>
          <option value={'advanced'}>Advanced</option>
        </select>

        {
          (state.result.length && state.isActive) ? 
       
        <Link to={`/suggestions/${state.searchKey}`} state={{
          searchType:state.selectedType
        }} className="btn1 bg-primaryColor px-6 py-4 text-white">
          see suggestions
        </Link> :null

      }
      </div>
      {/* message */}
      <span className="text-red-500 block">{state.error}</span>
    </div>
  );
}

export default SearchBar;
