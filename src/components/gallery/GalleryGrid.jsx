import React from 'react';
import pic1 from "../../assets/Gallery/pic1.jpg";
import pic2 from "../../assets/Gallery/pic2.jpg";
import pic3 from "../../assets/Gallery/pic3.jpg";
// import pic4 from "../../assets/Gallery/pic4.jpeg";
// import pic5 from "../../assets/Gallery/pic5.jpg";
// import pic6 from "../../assets/Gallery/pic6.jpg";
// import pic7 from "../../assets/Gallery/pic7.jpg";
// import pic8 from "../../assets/Gallery/pic8.jpg";

// Sample data for memories
const memories = [
  {
    id: 1,
    image: pic1,
    title: "Our First Date",
    description: "We met at that cozy café, and it was love at first sight. ❤️",
    date: "2022-06-15",
  },
  {
    id: 2,
    image: pic2,
    title: "Our Trip to Paris",
    description: "The Eiffel Tower, a moment I’ll cherish forever with you! 🥰",
    date: "2023-03-22",
  },
  {
    id: 3,
    image: pic3,
    title: "Our Anniversary",
    description: "A celebration of our love, one year together! 💖",
    date: "2024-08-10",
  },
  // More memories can be added here...
];

const GalleryGrid = () => {
  return (
    <div style={galleryContainerStyles}>
      {memories.map((memory) => (
        <div key={memory.id} style={memoryCardStyles}>
          <img
            src={memory.image}
            alt={memory.title}
            style={imageStyles}
            onClick={() => alert(`${memory.title}: ${memory.description}`)} // This could be a modal instead
          />
          <div style={memoryTitleStyles}>
            <strong>{memory.title}</strong>
            <p style={dateStyles}>{memory.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Styles for the gallery and memory cards
const galleryContainerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
  padding: '20px',
};

const memoryCardStyles = {
  width: 'calc(33% - 20px)',
  borderRadius: '12px',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease',
};

const imageStyles = {
  width: '100%',
  height: 'auto',
  transition: 'transform 0.3s ease',
};

const memoryTitleStyles = {
  position: 'absolute',
  bottom: '10px',
  left: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  width: '90%',
};

const dateStyles = {
  fontSize: '0.8rem',
  fontStyle: 'italic',
};

// Hover effect for images
// const handleMouseOver = (event) => {
//   event.target.style.transform = 'scale(1.05)';
// };

// const handleMouseOut = (event) => {
//   event.target.style.transform = 'scale(1)';
// };

export default GalleryGrid;
