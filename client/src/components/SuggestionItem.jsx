import React from 'react'
import SearchResultItem from './SearchResultItem'

function SuggestionItem({
    searchBook,
    suggestions
}) {
  return (
    <div className='my-5 max-w-lg rounded-md shadow-lg p-6 bg-seconadryColor'>
            <h4 className='px-3 py-2 bg-primaryColor rounded-sm w-fit text-white my-3' >{searchBook}</h4>
            <h5 className='font-semibold text-white'>Suggestions</h5>
            {suggestions.length && suggestions.map(suggestion =><SearchResultItem {...suggestion} />)}
    </div>
  )
}

export default SuggestionItem
