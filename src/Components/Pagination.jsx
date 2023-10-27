// Pagination.js
import React from 'react';

function Pagination({ page, totalPages, setPage, gotoFirstPage, gotoLastPage,deleteItem }) {
  return (
    <div className="pagination flex justify-between mt-8">
      <button onClick={deleteItem} className='bg-red-500 text-white text-xl rounded-lg px-6 py-3'>Delete</button>
      <div>
      <button
        style={style}
        onClick={gotoFirstPage}
        disabled={page === 1}
        className={page === 1 ? "bg-black text-white" : "bg-white border-2 border-black text-black"}
      >
        &lt;&lt;
      </button>
      <button
      style={style}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="bg-white border-2 border-black text-black"
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          style={style}
          onClick={() => setPage(index + 1)}
          className={page === index + 1 ? "bg-black text-white" : "bg-white border-2 border-black text-black"}
        >
          {index + 1}
        </button>
      ))}
      <button
      style={style}
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="bg-white border-2 border-black text-black"
      >
        &gt;
      </button>
      <button
      style={style}
        onClick={gotoLastPage}
        disabled={page === totalPages}
        className={page === totalPages ? "bg-black text-white" : "bg-white border-2 border-black text-black"}
      >
        &gt;&gt;
      </button>
      </div>
    </div>
  );
}

export default Pagination;


const style = {
  borderRadius:"1rem",
  padding:"0.4rem 0.8rem",
  margin:"0 .4rem 0 .4rem",
  fontSize:"1.2rem"
}
