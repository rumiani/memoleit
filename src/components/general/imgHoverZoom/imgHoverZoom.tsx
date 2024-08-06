import Image, { StaticImageData } from "next/image";
type props = {
  src: StaticImageData;
  className?: string;
  alt: string;
};
export default function ImgHoverZoom({ src, alt, className }: props) {
  return (
    <div className="w-full h-full overflow-hidden rounded-xl">
      <Image
        unoptimized
        src={src}
        width={100}
        height={100}
        alt={alt}
        className={`w-full  h-full transition-transform duration-1000 hover:scale-105 -z-10 ${className}`}
      />
    </div>
  );
}
