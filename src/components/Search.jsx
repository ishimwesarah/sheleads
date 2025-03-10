// SearchResults.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  // TODO:  Implement your search logic here.
  // Example:  Fetch data from an API based on the query, or filter existing data.
  // const searchResults = fetchDataFromApi(query);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {/* TODO: Display your search results here */}
      {/* Example: */}
      {/* {searchResults.length > 0 ? (
          <ul>
            {searchResults.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )} */}
    </div>
  );
}

export default SearchResults;