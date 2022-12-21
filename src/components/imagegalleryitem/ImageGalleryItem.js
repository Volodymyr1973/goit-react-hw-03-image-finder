import { nanoid } from 'nanoid';
import { Modal } from 'components/modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
    url: '',
    tag: '',
  };

  handleModalOpen = event => {
    this.setState({ isModalOpen: true });
    this.setState(() => ({ url: event.target.dataset.large }));
    this.setState(() => ({ tag: event.target.dataset.tags }));
  };

  handleModalClose = event => {
    console.dir(event);
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <>
        {this.props.gallery.map(image => (
          <li
            className={css.gallery__item}
            onClick={this.handleModalOpen}
            key={nanoid()}
          >
            <img
              src={image.webformatURL}
              alt={image.tags}
              className={css.gallery__image}
              data-tag={image.tags}
              data-large={image.largeImageURL}
            />
          </li>
        ))}
        {this.state.isModalOpen && (
          <Modal
            imgRef={this.state.url}
            tag={this.state.tag}
            onClick={this.handleModalClose}
          />
        )}
      </>
    );
  }
}
