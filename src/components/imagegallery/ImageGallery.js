import { ImageGalleryItem } from 'components/imagegalleryitem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Component } from 'react';
import { Modal } from 'components/modal/Modal';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    // isModalOpen: false,
    // url: '',
    // tag: '',
  };

  // handleModalOpen = event => {
  //   this.setState({ isModalOpen: true });
  //   this.setState(() => ({ url: event.target.dataset.large }));
  //   this.setState(() => ({ tag: event.target.dataset.tags }));
  // };

  // handleModalClose = event => {
  //   console.dir(event);
  //   this.setState({ isModalOpen: false });
  // };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.name !== this.props.name ||
      prevProps.page !== this.props.page
    ) {
      fetch(
        `https://pixabay.com/api/?q=${this.props.name}&page=${this.props.page}&key=30855873-a6914290544a804f7a5292a28&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Insert other name'));
        })
        .then(gallery =>
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...gallery.hits],
          }))
        )
        .catch(error => this.setState({ error }))
        .finally(this.setState({ isLoader: false }));
    }
  }

  render() {
    return (
      <ul className={css.image__gallery}>
        {this.state.gallery !== [] &&
          this.state.gallery.map(image => (
            <ImageGalleryItem
              modalOpen={this.handleModalOpen}
              webformatURL={image.webformatURL}
              tags={image.tags}
              largeImageURL={image.largeImageURL}
            />
          ))}
        {this.state.isModalOpen && (
          <Modal
            imgRef={this.state.url}
            tag={this.state.tag}
            onClick={this.props.close}
          />
        )}
      </ul>
    );
  }
}
