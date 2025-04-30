'use client';

import { Building } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ImageWithFallback = ({ src, alt, width, height, className }: ImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);
  
  return imageError ? (
    <div className="w-[80px] h-[80px] flex justify-center items-center bg-gray-200">
      <Building className="w-12 h-12 text-gray-500" />
    </div>
  ) : (
    <Image 
      src={src} 
      alt={alt} 
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)} 
      unoptimized={true}
    />
  );
};