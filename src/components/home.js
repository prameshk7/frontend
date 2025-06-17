import React, { useEffect, useState } from 'react';

const Home = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 6;

  // Function to fetch images from the API
  const fetchImages = async () => {
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/panels-api/data/20240916/media-1a-i-p~s');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      
      // Log jsonData to understand its structure
      console.log('Fetched data:', jsonData);

      const data = jsonData.data;
      
      // Check if data is an object and extract image URLs accordingly
      if (data && typeof data === 'object') {
        const imageUrls = Object.values(data)
          .map(item => item.dhd) // Adjust this based on the actual structure
          .filter(url => url); // Filter out any undefined or invalid URLs
          
        setImages(imageUrls);
      } else {
        throw new Error('Data is not in the expected format');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching images:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle pagination
  const handleNext = () => {
    if ((currentPage + 1) * imagesPerPage < images.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the index of the first and last image on the current page
  const firstImageIndex = currentPage * imagesPerPage;
  const lastImageIndex = firstImageIndex + imagesPerPage;
  const currentImages = images.slice(firstImageIndex, lastImageIndex);

  return (
    <div>
      <h1>Image Gallery</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {currentImages.map((imageUrl, index) => (
          <img 
            key={index} 
            src={imageUrl} 
            alt={`Image ${firstImageIndex + index + 1}`} 
            style={{ margin: '10px', width: '30%', height: 'auto' }} 
          />
        ))}
      </div>
      <div style={{ marginTop: '20px',marginBottom:'30px' }}>
        <button style={{backgroundColor:"red",color:"black",textAlign:"center",height:"30px",borderRadius:"10px"}}onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <button style={{backgroundColor:"red",color:"black",textAlign:"center",height:"30px",borderRadius:"10px"}}onClick={handleNext} disabled={(currentPage + 1) * imagesPerPage >= images.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
