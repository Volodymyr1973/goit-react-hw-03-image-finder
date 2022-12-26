// import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
// import { Modal } from 'components/modal/Modal';
import { ImageGalleryItem } from 'components/imagegalleryitem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ gallery, open }) => {
  return (
    <>
      <ul className={css.image__gallery}>
        {gallery.length > 0 &&
          gallery.map(image => (
            <ImageGalleryItem
              key={nanoid()}
              open={open}
              webformatURL={image.webformatURL}
              tags={image.tags}
              largeImageURL={image.largeImageURL}
            />
          ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array,
  open: PropTypes.func,
};
