import React from 'react'
import Image, { StaticImageData } from 'next/image'
type props = {
    src: StaticImageData;
    className?:string;
    alt: string;
}
export default function ImgHoverZoom({src, alt, className} : props) {
  return (
    <div className='w-full h-full overflow-hidden rounded-xl'>
        <Image src={src} width={100} alt={alt} loading='lazy' className={`w-full transition-transform duration-1000 hover:scale-110 -z-10 ${className}`}/>
    </div>
  )
}
