'use client';
import { useEffect, useRef, useState } from 'react';

export default function InteractiveBackground() {
  const backgroundRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  
  // Predetermined positions for consistent hydration
  const floatingElements = [
    { top: 15, left: 25, delay: 0.5 },
    { top: 65, left: 82, delay: 1.2 },
    { top: 35, left: 5, delay: 2.1 },
    { top: 80, left: 45, delay: 0.8 },
    { top: 45, left: 75, delay: 1.7 },
    { top: 12, left: 60, delay: 2.3 },
    { top: 85, left: 15, delay: 0.3 },
    { top: 22, left: 88, delay: 1.9 },
    { top: 70, left: 35, delay: 1.1 },
    { top: 55, left: 8, delay: 2.7 },
    { top: 28, left: 92, delay: 0.6 },
    { top: 75, left: 58, delay: 1.4 }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth) * 100;
      const yPercent = (clientY / innerHeight) * 100;
      
      // Update CSS custom properties for mouse interaction
      backgroundRef.current.style.setProperty('--mouse-x', `${xPercent}%`);
      backgroundRef.current.style.setProperty('--mouse-y', `${yPercent}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={backgroundRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[0]"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%'
      }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
      
      {/* Animated Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-300/30 rounded-full animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/30 rounded-full animate-float-medium"></div>
      <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-blue-500/30 rounded-full animate-float-fast"></div>
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600/30 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-14 h-14 bg-blue-400/30 rounded-full animate-float-medium"></div>
      <div className="absolute top-60 left-1/2 w-10 h-10 bg-blue-300/25 rounded-full animate-float-fast"></div>
      <div className="absolute bottom-60 right-1/4 w-6 h-6 bg-blue-500/25 rounded-full animate-float-slow"></div>
      
      {/* Interactive Gradient Orbs */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-300/30 to-blue-500/30 rounded-full blur-3xl transition-all duration-1000 ease-out"
        style={{
          top: 'var(--mouse-y)',
          left: 'var(--mouse-x)',
          transform: 'translate(-50%, -50%)',
          animation: 'pulse 4s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/30 to-blue-600/30 rounded-full blur-3xl transition-all duration-1500 ease-out"
        style={{
          bottom: `calc(100% - var(--mouse-y))`,
          right: `calc(100% - var(--mouse-x))`,
          transform: 'translate(50%, 50%)',
          animation: 'pulse 6s ease-in-out infinite 2s'
        }}
      ></div>
      
      {/* Additional animated elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {isClient && floatingElements.map((element, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-blue-400/25 rounded-full animate-float-${i % 3 === 0 ? 'slow' : i % 3 === 1 ? 'medium' : 'fast'}`}
            style={{
              top: `${element.top}%`,
              left: `${element.left}%`,
              animationDelay: `${element.delay}s`
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(10px) rotate(90deg); }
          50% { transform: translateY(-30px) translateX(0px) rotate(180deg); }
          75% { transform: translateY(-15px) translateX(-10px) rotate(270deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-10px) scale(1.1); }
          66% { transform: translateY(-5px) scale(0.9); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
