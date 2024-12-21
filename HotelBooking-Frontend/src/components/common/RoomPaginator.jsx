import React from 'react'

function RoomPaginator({currentPage, totalPages, onPageChange}) {//props current page, total page, page change.
    const pageNumbers = Array.from({length : totalPages}, (_, i) => i+1)//length is an object of total Pages.
  return (
    <nav>
      <ul className='pagination, justify-content-center'>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>{/*if current page equal to page number,set that page active */}
                   <button className='page-link' onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default RoomPaginator