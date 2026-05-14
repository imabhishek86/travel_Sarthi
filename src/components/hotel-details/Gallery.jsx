import React, { useState } from 'react';

const Gallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg relative group">
        <img 
          src={mainImage} 
          alt="Hotel featured" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.slice(0, 4).map((img, index) => (
          <div 
            key={index} 
            onClick={() => setMainImage(img)}
            className={`h-24 sm:h-32 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${mainImage === img ? 'border-primary scale-95 shadow-md' : 'border-transparent hover:border-primary/50'}`}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
