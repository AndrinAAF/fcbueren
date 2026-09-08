"use client";

import React, { useState } from 'react';

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToImage = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 'right' : 'left');
    setCurrentIndex(idx);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {/* Animation Style */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slider-image-right {
          animation: slideInRight 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .slider-image-left {
          animation: slideInLeft 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}} />

      {/* Main Image Container */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          paddingTop: '66.66%', // 3:2 Aspect Ratio
          borderRadius: '12px', 
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          backgroundColor: 'var(--clr-bg-alt)'
        }}
      >
        <a href={images[currentIndex]} target="_blank" rel="noopener noreferrer">
          <img 
            key={currentIndex}
            src={images[currentIndex]} 
            alt={`Slideshow Bild ${currentIndex + 1}`} 
            className={direction === 'right' ? 'slider-image-right' : 'slider-image-left'}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              backgroundColor: '#000'
            }} 
          />
        </a>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.preventDefault(); handlePrev(); }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
              aria-label="Vorheriges Bild"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button 
              onClick={(e) => { e.preventDefault(); handleNext(); }}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
              aria-label="Nächstes Bild"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToImage(idx)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: currentIndex === idx ? 'var(--clr-primary)' : 'var(--clr-border)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              aria-label={`Gehe zu Bild ${idx + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Counter */}
      <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
        Bild {currentIndex + 1} von {images.length}
      </div>
    </div>
  );
}
