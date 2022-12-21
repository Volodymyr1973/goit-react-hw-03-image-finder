import { nanoid } from 'nanoid';
// import { Modal } from 'components/modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li
        className={css.gallery__item}
        onClick={this.props.open}
        key={nanoid()}
      >
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
