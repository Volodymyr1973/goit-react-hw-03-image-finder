import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Modal } from 'components/modal/Modal';
import { ImageGalleryItem } from 'components/imagegalleryitem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    const name = this.props.name;
    const page = this.props.page;
    if (
      prevProps.name !== this.props.name ||
      prevProps.page !== this.props.page
    ) {
      this.props.load();
      this.props.onFetch(name, page);
    }
  }

  render() {
    return (
      <>
        <ul className={css.image__gallery}>
          {this.props.gallery !== [] &&
            this.props.gallery.map(image => (
              <ImageGalleryItem
                key={nanoid()}
                modalOpen={this.props.open}
                webformatURL={image.webformatURL}
                tags={image.tags}
                largeImageURL={image.largeImageURL}
              />
            ))}
        </ul>
        {this.props.isModalOpen && (
          <Modal
            imgRef={this.props.url}
            tag={this.props.tag}
            onClick={this.props.close}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  name: PropTypes.string,
  page: PropTypes.number,
  gallery: PropTypes.array,
  onFetch: PropTypes.func,
  load: PropTypes.func,
  open: PropTypes.func,
  isModalOpen: PropTypes.bool,
  close: PropTypes.func,
  url: PropTypes.string,
  tag: PropTypes.string,
};
