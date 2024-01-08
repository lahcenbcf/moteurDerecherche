import { useContext, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResultItem from '../components/SearchResultItem';
import { bookContext } from '../context/bookContext';

export default function LandingPage() {
  const { state } = useContext(bookContext);

  return (
    <div className="bg-thirdColor py-4 absolute -z-10 w-full top-0 bottom-0 lg:h-screen">
      {/* <AiOutlineMenu onClick={()=>setVisible(true)} size={20} className="absolute top-4 right-3 lg:hidden" /> */}

      {/* filter bar */}
      {/* filterMode && <FilterBar visible={visible} setVisible={setVisible} /> */}

      <div className="container w-full mx-auto mt-28">
        {/* our seaach page */}
        <SearchBar />
        {state.result?.length ? <p>{state.result.length} resultats</p> : null}
        {/* our list articles */}
        <div className="flex flex-col gap-4 lg:max-h-[60vh] lg:overflow-x-hidden lg:overflow-y-scroll scrollbar1 px-3">
          {state.result.length ? (
            state.result.map((r) => <SearchResultItem {...r} />)
          ) : (
            <h4>no item found</h4>
          )}
        </div>
        {/* see more button */}
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
}
