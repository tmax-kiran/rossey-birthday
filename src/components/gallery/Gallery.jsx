
import React, { useEffect, useState } from "react";
import pic1 from "../../assets/Gallery/pic1.jpg";
import pic2 from "../../assets/Gallery/pic2.jpg";
import pic3 from "../../assets/Gallery/pic3.jpg";
import pic4 from "../../assets/Gallery/pic4.jpeg";
import pic5 from "../../assets/Gallery/pic5.jpg";
import pic6 from "../../assets/Gallery/pic6.jpg";
import pic7 from "../../assets/Gallery/pic7.jpg";
import pic8 from "../../assets/Gallery/pic8.jpg";
// import pic9 from "../../assets/Gallery/pic9.JPG";
// import pic10 from "../../assets/Gallery/pic10.JPG";
// import pic11 from "../../assets/Gallery/pic11.JPG";
import pic12 from "../../assets/Gallery/pic12.jpg";







const photoSources = [pic1, pic2, pic3,pic4,pic5, pic6, pic7, pic8,pic12];

const Gallery = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticles = [];

      for (let i = 0; i < 2; i++) {
        const img = photoSources[Math.floor(Math.random() * photoSources.length)];
        
        newParticles.push({
          id: `${Date.now()}-${Math.random()}`,
          x: Math.random() * 100, // random X position
          y: -10, // start slightly above screen
          size: Math.random() * 50 + 40, // random size
          rotation: Math.random() * 90,
          rotVel: (Math.random() - 0.5) * 2,
          yVel: Math.random() * 0.5 + 0.1,
          xVel: (Math.random() - 0.5) * 0.3,
          lifetime: 700,
          src: img,
        });
      }

      setParticles(prev => [...prev, ...newParticles]);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    const frame = requestAnimationFrame(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.xVel,
            y: p.y + p.yVel,
            rotation: p.rotation + p.rotVel,
            lifetime: p.lifetime - 1,
          }))
          .filter(p => p.lifetime > 0)
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [particles]);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 1,
    }}>
      {particles.map(p => (
        <img
          key={p.id}
          src={p.src}
          alt="floating"
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '20px',
            transform: `rotate(${p.rotation}deg)`,
            transition: 'transform 0.1s linear',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.5)',
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};

export default Gallery;

