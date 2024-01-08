import React, { useContext, useEffect, useState } from 'react';
import { viewSuggestions } from '../api/search';
import { Link, useLocation, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import SuggestionItem from '../components/SuggestionItem';
import { bookContext } from '../context/bookContext';
function SuggestionPage() {
  const { state, viewSuggestionsFun } = useContext(bookContext);
  const { suggestion } = useParams();
  useEffect(() => {
    viewSuggestionsFun();
  }, []);
  return (
    <div className="container mx-auto w-full px-10 py-10">
      {state.loading && <Spinner />}
      <Link
        to={'/home'}
        className="bg-primaryColor text-white px-5 py-3 rounded-md shadow-lg my-10 "
      >
        Back to home
      </Link>
      <h3 className=" font-Poppins font-bold mt-10">
        Livres recommendés #{suggestion}
      </h3>
      <div className="grid grid-cols-fluid gap-6">
        {state.suggestions?.length
          ? state.suggestions.map((sugg) => <SuggestionItem {...sugg} />)
          : null}
      </div>
    </div>
  );
}

export default SuggestionPage;
