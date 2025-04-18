import { useEffect } from 'react';

const ColorfulLights = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const particle = document.createElement('div');
      const size = Math.random() * 10 + 5;
      const direction = ['top', 'bottom', 'left', 'right'][Math.floor(Math.random() * 4)];
      const position = Math.random() * 100;
      const hue = Math.floor(Math.random() * 360);

      Object.assign(particle.style, {
        position: 'fixed',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: `hsl(${hue}, 100%, 70%)`,
        borderRadius: '50%',
        zIndex: 9999,
        opacity: 1,
        pointerEvents: 'none',
        transition: 'transform 8s linear, opacity 8s ease-out',
      });

      if (direction === 'top') {
        particle.style.top = '0';
        particle.style.left = `${position}vw`;
        setTimeout(() => {
          particle.style.transform = `translateY(100vh)`;
          particle.style.opacity = 0;
        }, 50);
      } else if (direction === 'bottom') {
        particle.style.bottom = '0';
        particle.style.left = `${position}vw`;
        setTimeout(() => {
          particle.style.transform = `translateY(-100vh)`;
          particle.style.opacity = 0;
        }, 50);
      } else if (direction === 'left') {
        particle.style.left = '0';
        particle.style.top = `${position}vh`;
        setTimeout(() => {
          particle.style.transform = `translateX(100vw)`;
          particle.style.opacity = 0;
        }, 50);
      } else if (direction === 'right') {
        particle.style.right = '0';
        particle.style.top = `${position}vh`;
        setTimeout(() => {
          particle.style.transform = `translateX(-100vw)`;
          particle.style.opacity = 0;
        }, 50);
      }

      document.body.appendChild(particle);
      setTimeout(() => {
        particle.remove();
      }, 9000);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default ColorfulLights;
