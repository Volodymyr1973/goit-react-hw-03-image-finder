// import { nanoid } from 'nanoid';
// import { Modal } from 'components/modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.gallery__item} onClick={this.props.modalOpen}>
        <img
          src={this.props.webformatURL}
          alt={this.props.tags}
          className={css.gallery__image}
          data-tag={this.props.tags}
          data-large={this.props.largeImageURL}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  modalOpen: PropTypes.func,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
