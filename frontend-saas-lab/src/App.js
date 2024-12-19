import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, setCurrentPage } from '../src/features/projects/projectsSlice';
import './App.css'; // Custom CSS for styling

const App = () => {
  const dispatch = useDispatch();
  const { projects, status, currentPage, totalPages, error } = useSelector((state) => state.projects);
  console.log("🚀 ~ App ~ status:", status)
  console.log("🚀 ~ App ~ projects:", projects)

  // Fetch projects on initial render
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  // Handle page change
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const currentProjects = projects?.slice(startIndex, endIndex);

  return (
    <div className="app-container">
      <h1 className="title">Table Project</h1>

      {/* Handle loading state */}
      {status === 'loading' && <p>Loading...</p>}

      {/* Handle error state */}
      {status === 'failed' && <p>Error: {error}</p>}

      {/* Render data once fetching is succeeded */}
      {status === 'succeeded' && (
        <div className="table-container">
          <table className="project-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Percentage Funded</th>
                <th>Amount Pledged</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects?.map((project, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{project["percentage.funded"]}</td>
                  <td>{project["amt.pledged"]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            {totalPages &&
              [...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={currentPage === idx + 1 ? 'active' : ''}
                >
                  {idx + 1}
                </button>
              ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
