import React from 'react'
import {Link} from "react-router-dom"
import { IoLinkSharp } from "react-icons/io5";
function SearchResultItem({
    link,
    count,
    title
}) {
  return (
    <div className='max-w-lg rounded-lg shadow-lg bg-white py-3 px-6 flex justify-between my-5'>
            <div className=''>
                    <h4 className='font-bold'>{title}</h4>
                   {count ? <span className='text-slate-500'>occurences : {count}</span> :null}
            </div>
            <Link target='_blank' to={link}><IoLinkSharp /></Link>
    </div>
  )
}

export default SearchResultItem
