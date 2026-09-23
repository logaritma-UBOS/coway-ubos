import React from 'react';

export default function Logo({ className = "w-8 h-8", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cowayLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A3E0" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      
      {/* Coway Leaf/Water Drop shape base */}
      <path 
        d="M50 15 C 80 15, 85 45, 85 65 C 85 85, 70 85, 50 85 C 30 85, 15 85, 15 65 C 15 45, 20 15, 50 15 Z" 
        fill="url(#cowayLogoGradient)" 
        opacity="0.15" 
      />
      
      {/* Logaritma Infinity / Data Graph shape */}
      <path 
        d="M30 60 C 20 50, 20 40, 30 35 C 40 30, 45 40, 50 50 C 55 60, 60 70, 70 65 C 80 60, 80 50, 70 40" 
        stroke="url(#cowayLogoGradient)" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Data Nodes */}
      <circle cx="30" cy="35" r="5" fill="#2563EB" />
      <circle cx="50" cy="50" r="5" fill="#2563EB" />
      <circle cx="70" cy="65" r="5" fill="#00A3E0" />
    </svg>
  );
}
