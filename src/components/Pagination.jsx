import React from "react";

/**
 * Props:
 * - page: current page (1-based)
 * - setPage: function
 * - totalResults: number
 */
export default function Pagination({ page, setPage, totalResults }) {
  const perPage = 10;
  const totalPages = Math.ceil(totalResults / perPage) || 1;
  const maxButtons = 7;
  let start = Math.max(1, page - Math.floor(maxButtons/2));
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start < maxButtons -1) start = Math.max(1, end - maxButtons + 1);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="pagination">
      <button disabled={page<=1} onClick={()=> setPage(1)}>« First</button>
      <button disabled={page<=1} onClick={()=> setPage(page-1)}>‹ Prev</button>
      {start>1 && <span>...</span>}
      {pages.map(p => (
        <button key={p} onClick={()=> setPage(p)} className={p===page?'active-page':''}>{p}</button>
      ))}
      {end<totalPages && <span>...</span>}
      <button disabled={page>=totalPages} onClick={()=> setPage(page+1)}>Next ›</button>
      <button disabled={page>=totalPages} onClick={()=> setPage(totalPages)}>Last »</button>
    </div>
  );
}
