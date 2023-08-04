import React, { useEffect, useRef } from 'react';
import Particles from 'particles.js';

const ParticlesBackground = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const particlesConfig = {
      // Add your particles configuration here
      // Example configuration:
      particles: {
        number: {
          value: 100,
        },
        size: {
          value: 3,
        },
      },
    };

    if (particlesRef.current) {
      Particles.init({ ...particlesConfig, selector: particlesRef.current });
    }

    return () => {
      if (particlesRef.current) {
        Particles.destroy();
      }
    };
  }, []);

  return <div ref={particlesRef} className="particles-background" />;
};

export default ParticlesBackground;
