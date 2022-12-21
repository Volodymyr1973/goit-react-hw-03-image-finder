import { ImageGalleryItem } from 'components/imagegalleryitem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ gallery }, { children }) => {
  return (
    <ul className={css.image__gallery}>
      <ImageGalleryItem gallery={gallery} />
    </ul>
  );
};
