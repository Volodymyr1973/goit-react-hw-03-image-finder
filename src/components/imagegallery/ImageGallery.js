import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Modal } from 'components/modal/Modal';
import { ImageGalleryItem } from 'components/imagegalleryitem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.name !== this.props.name ||
      prevProps.page !== this.props.page
    ) {
      this.props.load();

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.props.name}&page=${this.props.page}&key=30855873-a6914290544a804f7a5292a28&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(new Error('Insert other name'));
          })
          .then(
            gallery => this.props.onGallery(gallery)
            // this.setState(prevState => ({
            //   gallery: [...prevState.gallery, ...gallery.hits],
            // }))
          )
          .catch(error => this.setState({ error }))
          .finally(this.props.loadEnd());
      }, 1000);
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
  onGallery: PropTypes.func,
  load: PropTypes.func,
  loadEnd: PropTypes.func,
  isLoadMore: PropTypes.bool,
  isLoader: PropTypes.bool,
  open: PropTypes.func,
  isModalOpen: PropTypes.bool,
  close: PropTypes.func,
  url: PropTypes.string,
  tag: PropTypes.string,
};
