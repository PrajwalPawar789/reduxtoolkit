import React, { useState } from 'react';

const MAX_PAGE_NUMBERS_TO_SHOW = 5;
const ITEMS_PER_PAGE = 20;

const ProspectTable = ({ prospects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(prospects.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = prospects.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    let startPage = Math.max(currentPage - MAX_PAGE_NUMBERS_TO_SHOW, 1);
    let endPage = Math.min(startPage + MAX_PAGE_NUMBERS_TO_SHOW, totalPages);
  
    if (currentPage - 1 >= MAX_PAGE_NUMBERS_TO_SHOW) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => paginate(1)}
          className="rounded-md px-4 py-2 mx-1 transition duration-300 ease-in-out text-blue-600 bg-white"
        >
          1
        </button>
      );
  
      if (currentPage - 2 >= MAX_PAGE_NUMBERS_TO_SHOW) {
        pageNumbers.push(
          <span key={'start-ellipsis'} className="px-4 py-2 mx-1">...</span>
        );
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`${
            currentPage === i ? 'bg-blue-500 text-white' : 'text-blue-600 bg-white'
          } rounded-md px-4 py-2 mx-1 transition duration-300 ease-in-out`}
        >
          {i}
        </button>
      );
    }
  
    if (totalPages - currentPage >= MAX_PAGE_NUMBERS_TO_SHOW) {
      if (totalPages - currentPage - 1 >= MAX_PAGE_NUMBERS_TO_SHOW) {
        pageNumbers.push(
          <span key={'end-ellipsis'} className="px-4 py-2 mx-1">...</span>
        );
      }
  
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className="rounded-md px-4 py-2 mx-1 transition duration-300 ease-in-out text-blue-600 bg-white"
        >
          {totalPages}
        </button>
      );
    }
  
    return pageNumbers;
  };

  return (
    <>
      <div className="bg-white shadow overflow-hidden rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Table headers */}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Industry
              </th>
              {/* ... other headers */}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Show details</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((prospect, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {/* Render table cells with content truncation and hover effect */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-0 overflow-hidden text-ellipsis hover:text-blue-600 cursor-pointer" title={prospect.firstname + ' ' + prospect.lastname}>
                  <div className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-4 truncate">{prospect.firstname + ' ' + prospect.lastname}</span>
                  </div>
                </td>
                {/* Other cells with truncation */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-0 overflow-hidden text-ellipsis hover:text-blue-600 cursor-pointer" title={prospect.jobtitle}>
                  {prospect.jobtitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-0 overflow-hidden text-ellipsis hover:text-blue-600 cursor-pointer" title={prospect.companyname}>
                  {prospect.companyname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-0 overflow-hidden text-ellipsis hover:text-blue-600 cursor-pointer" title={prospect.jobfunction}>
                  {prospect.jobfunction}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Show details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>          
          </table>
        </div>
        
        {/* Pagination section */}
        <div className="py-3 flex items-center justify-between">
  {/* Previous Button */}
  {currentPage !== 1 && (
    <button
      onClick={() => paginate(currentPage - 1)}
      className="relative inline-flex items-center px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
    >
      &lt;
    </button>
  )}

  {/* Page Numbers */}
  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
    {renderPageNumbers()}
  </nav>

  {/* Next Button */}
  {currentPage !== totalPages && (
    <button
      onClick={() => paginate(currentPage + 1)}
      className="relative inline-flex items-center px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
    >
      &gt;
    </button>
  )}
</div>
      </>
    );
  };
  
  export default ProspectTable;