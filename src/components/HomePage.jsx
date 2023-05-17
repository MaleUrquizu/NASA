import React, { useState, useEffect } from 'react';

function HomePage() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=bOhzGbSl6U58sq9HGY02bnEfMljfDIH4K59jTFTW')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
    });
  }, []);
  
  return (
    <div className='infoOfTheDay' >
      {Object.keys(data).length > 0 ? (
        <>
          <h1>Astronomy Picture of the Day</h1>
          
          <div className='imgOfTheDayPicture' style={{ backgroundImage: `url(${data.url})` }}></div>
          <h2>{data.title}</h2>
          <p>{data.explanation}</p>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default HomePage;

