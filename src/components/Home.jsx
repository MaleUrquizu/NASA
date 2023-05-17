import React, { useState, useEffect } from 'react';
import noResultsGif from '../img/earth.gif';
import '../index.css';

function Home() {
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState([]);
  const [popup, setPopup] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [hasResults, setHasResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(16);

  useEffect(() => {
  }, []);

  const searchPhotos = async () => {
    const results = await fetch(
      `https://images-api.nasa.gov/search?q=${search}&media_type=image`
    );
    const data = await results.json();

    if (data.collection.items.length === 0) {
      setHasResults(false);
    } else {
      setHasResults(true);
      setPhotos(data.collection.items);
      setCurrentPage(1);
    }
  };

  const openPopup = (photo, event) => {
    event.stopPropagation();
    setPopup(photo);

    const popupWidth = 800;
    const popupHeight = 600;

    const popupLeft = (window.innerWidth - popupWidth) / 2; 
    const popupTop = event.clientY - popupHeight / 2;
    

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const closePopup = () => {
    setPopup(null);
  };

  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    const results = await fetch(
      `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`
    );
    const data = await results.json();

    if (data.collection.items.length === 0) {
      setHasResults(false);
    } else {
      setHasResults(true);
      setPhotos(data.collection.items);
      setCurrentPage(1);
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;

  const indexOfFirstResult = indexOfLastResult - resultsPerPage;

  const currentResults = photos.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div className="Home">
      <div className="search">
        <input
          className="search-word"
          type="text"
          placeholder="Search for photos"
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={searchPhotos}>Search</button>
      </div>
      <div className="results-container">
        {search.trim() === '' ? (
          <div className="noResults">
            <img src={noResultsGif} alt="No results" />
          </div>
        ) : hasResults ? (
          <div className="results">
            {currentResults.map((photo) => (
              <div className="resultsCards" key={photo.data[0].nasa_id}>
                <img
                  src={photo.links[0].href}
                  alt={photo.data[0].title}
                  onClick={(event) => openPopup(photo, event)}
                />
                <h3>{photo.data[0].title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="noResults">
            <p>No results found.</p>
          <img src={noResultsGif} alt="No results" />
        </div>
            )}
      </div>
      {popup && (
      <div
        className="popup"
        style={{ top: popupPosition.top, left: popupPosition.left }}
        >
        <h1 onClick={closePopup}>x</h1>
        <img src={popup.links[0].href} alt={popup.data[0].title} />
        <h3>{popup.data[0].title}</h3>
        <p>{popup.data[0].description}</p>
      </div>
      )}
    </div>
  );
}

export default Home;




