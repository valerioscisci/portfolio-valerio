import Image from 'next/image';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/fold-out-animation.css';

interface GalleryProps {
  images: string;
}
export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <AwesomeSlider animation="foldOutAnimation">
      {JSON.parse(images).images.map((image: { src: string; alt: string }) => (
        <div key={image.src}>
          <Image src={image.src} alt={image.alt} layout="fill" />
        </div>
      ))}
    </AwesomeSlider>
  );
};
