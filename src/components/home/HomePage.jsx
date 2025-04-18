import React, { useState, useEffect } from "react";
// import beautiful from "../../assets/beautiful.jpg"; 
// import beautiful2 from "../../assets/beautiful2.jpg"; 
// import beautiful3 from "../../assets/beautiful3.jpg"; 
// import beautiful4 from "../../assets/beautiful4.jpg"; 
import beautiful5 from "../../assets/beautiful5.jpg"; 
import Gallery from "../gallery/Gallery";
import bgm2 from "../../assets/Audio/bgm2.mp3"; 

// Custom confetti component
const Confetti = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create initial burst of confetti
    createConfettiBurst();

    // Create falling hearts periodically
    const interval = setInterval(() => {
      createFallingHearts();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createConfettiBurst = () => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: `burst-${Date.now()}-${i}`,
        x: Math.random() * 100,
        y: 60,
        size: Math.random() * 8 + 15,
        color: ['#ff718d', '#fdffb6', '#caffbf', '#9bf6ff', '#ffc6ff'][Math.floor(Math.random() * 5)],
        shape: Math.random() > 0.5 ? 'circle' : 'square',
        xVel: (Math.random() - 0.5) * 10,
        yVel: Math.random() * -3 - 3,
        rotation: Math.random() * 360,
        rotVel: (Math.random() - 0.5) * 10,
        lifetime: 100
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const createFallingHearts = () => {
    const newParticles = [];
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: `heart-${Date.now()}-${i}`,
        // Start hearts at different heights so they don't all appear at once
        y: Math.random() * -15 - 5, // Some will start higher up than others
        x: Math.random() * 100,
        size: Math.random() * 10 + 25,
        color: '#ff718d',
        shape: 'heart',
        xVel: (Math.random() - 0.5) * 2,
        // Increase initial falling speed
        yVel: Math.random() * 2 + 5.5, // Faster initial speed
        rotation: Math.random() * 360,
        rotVel: (Math.random() - 0.5) * 5,
        lifetime: 120
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  useEffect(() => {
    if (particles.length === 0) return;

    const animFrame = requestAnimationFrame(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: p.x + p.xVel * 0.1,
          y: p.y + p.yVel * 0.1,
          rotation: p.rotation + p.rotVel * 0.1,
          lifetime: p.lifetime - 1
        })).filter(p => p.lifetime > 0)
      );
    });

    return () => cancelAnimationFrame(animFrame);
  }, [particles]);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      {particles.map(p => {
        // Different shapes
        let content;
        if (p.shape === 'heart') {
          content = '❤️';
        } else if (p.shape === 'circle') {
          content = '🎈';
        } else {
          content = '✨';
        }

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              transform: `rotate(${p.rotation}deg)`,
              opacity: p.lifetime / 100,
              transition: 'transform 0.1s linear'
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

// Birthday Countdown Component
const BirthdayCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false,
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Shimmer animation for the timer boxes
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div style={{
        marginTop: '32px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#db2777',
          marginBottom: '16px',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {timeLeft.isExpired 
            ? "🎂 Happy Birthday My Love! 🎂" 
            : "🎂  Countdown Starts🎂"}
        </h2>
        
        {!timeLeft.isExpired && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} style={{
                width: '80px',
                padding: '12px 8px',
                backgroundColor: 'rgba(219, 39, 119, 0.8)',
                borderRadius: '8px',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(90deg, rgba(219, 39, 119, 0.8), rgba(236, 72, 153, 0.8), rgba(219, 39, 119, 0.8))',
                backgroundSize: '400% 100%',
                animation: 'shimmer 3s infinite linear'
              }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                  {String(item.value).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());
  
  // Set the birthday date here - format: 'YYYY-MM-DD HH:MM:SS'
  const birthdayDate = '2025-04-19 00:00:00'; // May 18th at 12:00 PM
  
  // State to check if birthday has arrived
  const [isBirthdayArrived, setIsBirthdayArrived] = useState(false);
  
  // Check if birthday has arrived
  useEffect(() => {
    const checkBirthday = () => {
      const now = new Date();
      const birthday = new Date(birthdayDate);
      setIsBirthdayArrived(now >= birthday);
    };
    
    // Check immediately
    checkBirthday();
    
    // Then check every second
    const intervalId = setInterval(checkBirthday, 1000);
    
    return () => clearInterval(intervalId);
  }, [birthdayDate]);

  // Initialize audio source
  useEffect(() => {
    audio.src = bgm2;
    audio.onended = () => setIsPlaying(false);

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      audio.play().catch(e => {
        console.error("Audio play failed:", e);
        alert("Couldn't play music. Music autoplay might be blocked by your browser.");
      });
      setIsPlaying(true);
    }
  };

  // Keyframe animation for bounce effect
  const bounceKeyframes = `
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      {isBirthdayArrived && <Gallery/>}
      <style>{bounceKeyframes}</style>
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${beautiful5})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        textAlign: 'center',
        padding: '0 16px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {isBirthdayArrived && <Confetti />}

        {/* Before birthday - just show countdown */}
        {!isBirthdayArrived && (
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            maxWidth: '90%',
            width: '500px'
          }}>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
              fontWeight: 'bold',
              color: '#db2777',
              marginBottom: '16px'
            }}>
              Something Special is Coming...
            </h1>
            
            <BirthdayCountdown targetDate={birthdayDate} />
            
            <p style={{
              marginTop: '24px',
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              color: '#4b5563'
            }}>
              Please check back when the countdown reaches zero!
            </p>
          </div>
        )}

        {/* After birthday - show full celebration content */}
        {isBirthdayArrived && (
          <>
            <h1 style={{
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              fontWeight: 'bold',
              color: '#fbbf24',
              marginBottom: '32px',
              animation: 'bounce 2s infinite ease-in-out'
            }}>
             Happy Birthday My Love 🎉
            </h1>

            <p style={{
              marginTop: '24px',
              fontSize: 'clamp(1rem, 4vw, 1.5rem)',
              color: '#1f2937',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              animation: 'fadeIn 1s ease-out',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: '16px',
              borderRadius: '8px'
            }}>
              Every moment with you feels like a beautiful dream. Today, the world celebrates your light,
              your smile, your love. You are my everything—my past, present, and forever. 💖
            </p>

            <button
              onClick={toggleMusic}
              style={{
                marginTop: '48px',
                backgroundColor: '#db2777',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '9999px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontSize: '1.25rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                animation: 'fadeIn 1.5s ease-out'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#be185d'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#db2777'}
            >
              {isPlaying ? "Pause Music ⏸️" : "Play Romantic Music 🎵"}
            </button>

            <footer style={{
              position: 'absolute',
              bottom: '24px',
              fontSize: '0.875rem',
              color: '#6b7280',
              animation: 'fadeIn 2s ease-out'
            }}>
              Made with ❤️ by Kirankumar
            </footer>
          </>
        )}
      </div>
    </>
  );
}