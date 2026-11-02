import React from 'react';
import { CVT_LOGO_IMAGE } from '../data/products';

interface CvtLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const CvtLogo: React.FC<CvtLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Dimension styles matching natural logo aspect ratio (~1.78:1)
  const sizeClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-13',
    lg: 'h-14 sm:h-16',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Official CVT STORE Logo (Johnny Bravo in Tuxedo + CVT STORE text, NO circular background) */}
      <div className="relative flex items-center shrink-0">
        <img
          src={CVT_LOGO_IMAGE}
          alt="CVT STORE - Logotipo Oficial"
          className={`${sizeClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
          loading="eager"
        />
      </div>

      {showSubtitle && (
        <div className="hidden sm:flex flex-col border-l border-zinc-800 pl-2.5 py-0.5">
          <span className="text-[9px] uppercase tracking-[0.25em] text-yellow-400 font-black font-athletic leading-tight">
            Oficial
          </span>
          <span className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold">
            Igarassu • PE
          </span>
        </div>
      )}
    </div>
  );
};
