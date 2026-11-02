import React from 'react';
import { CVT_LOGO_IMAGE } from '../data/products';

interface CvtWatermarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const CvtWatermark: React.FC<CvtWatermarkProps> = ({ className = '', size = 'lg' }) => {
  const sizeClasses = {
    sm: 'w-64 h-36',
    md: 'w-80 h-44 sm:w-96 sm:h-52',
    lg: 'w-96 h-52 sm:w-[520px] sm:h-[280px]',
    hero: 'w-[320px] h-48 sm:w-[580px] sm:h-[320px] lg:w-[720px] lg:h-[380px]',
  }[size];

  return (
    <div 
      aria-hidden="true" 
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden ${className}`}
    >
      <div className={`relative ${sizeClasses} opacity-10 sm:opacity-[0.13] flex items-center justify-center overflow-hidden mix-blend-screen`}>
        {/* Official CVT STORE Logo Image (Johnny Bravo in Tuxedo + CVT STORE text) */}
        <img
          src={CVT_LOGO_IMAGE}
          alt="CVT STORE Marca D'água"
          className="w-full h-full object-cover object-center scale-[2.3] filter grayscale contrast-125"
        />
      </div>
    </div>
  );
};
