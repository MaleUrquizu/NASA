import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomNextArrow = (props) => (
  <div
    className={`customNextArrow ${props.className}`}
    style={{ ...props.style, display: 'block', width: '30px', height: '30px' }}
    onClick={props.onClick}
  />
);

const CustomPrevArrow = (props) => (
  <div
    className={`customPrevArrow ${props.className}`}
    style={{ ...props.style, display: 'block', width: '30px', height: '30px' }}
    onClick={props.onClick}
  />
);


function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        'https://images-api.nasa.gov/search?q=video&media_type=video'
      );
      const data = await response.json();
      const items = data.collection.items;
      const videoItems = items.filter((item) => item.data[0].media_type === 'video');
      setVideos(videoItems);
    } catch (error) {
      console.log(error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };

  return (
    <div className="videos">
      <h1>NASA Videos</h1>
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.data[0].nasa_id} className="video-card">
            <a
              href={`https://images.nasa.gov/details-${video.data[0].nasa_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.links[0].href}
                alt={video.data[0].title}
                width="300"
                height="200"
              />
            </a>
            <h3>{video.data[0].title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Videos;





