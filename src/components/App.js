import React, { Component } from 'react';
import { SearchBar } from './searchbar/SearchBar';
import { ImageGallery } from './imagegallery/ImageGallery';
// import { ImageGalleryItem } from './imagegalleryitem/ImageGalleryItem';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    name: '',
    gallery: [],
    page: 1,
    isModalOpen: false,
    isLoader: false,
    isLoadMore: false,
    url: '',
    tag: '',
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.handleToggleLoader();
      this.handleFetch(name, page);
    }
  }

  handleImageName = nameSearch => {
    this.setState({ name: nameSearch.toLowerCase(), page: 1, gallery: [] });
  };

  // setTimeout встановив, виключно для того,
  // щоб можна було побачити Loader. Знаю, що
  // взагалі його не використовують

  handleFetch = (name, page) => {
    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=30855873-a6914290544a804f7a5292a28&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Insert other name'));
        })
        .then(gallery => this.handleGallery(gallery))
        .catch(error => this.setState({ error }))
        .finally(this.handleToggleLoader());
    }, 500);
  };

  handleGallery = gallery => {
    this.setState(prevState => ({
      gallery: [...prevState.gallery, ...gallery.hits],
    }));
    this.handleLoadMoreButton();
  };

  handleToggleLoader = () => {
    this.setState(({ isLoader }) => ({ isLoader: !isLoader }));
  };

  // залишив на відкриття та закриття Modal дві різні функції

  handleModalOpen = event => {
    this.setState(() => ({
      isModalOpen: true,
      url: event.target.dataset.large,
      tag: event.target.dataset.tag,
    }));
  };

  handleModalClose = event => {
    if (event.key === 'Escape' || event.target === event.currentTarget) {
      this.setState({ isModalOpen: false });
    }
  };

  // кнопка LoadMore не рендериться, якщо в галерею приходить
  // менше 12 зображень (умова в render()). Для перевірки
  // у вікні пошуку ввести, наприклад, слово "glock"

  handleLoadMoreButton = () => {
    this.setState({ isLoadMore: true });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { gallery, isModalOpen, isLoader, isLoadMore, url, tag } = this.state;
    return (
      <div className={css.wrapper}>
        <SearchBar onSubmit={this.handleImageName} />

        {gallery.length !== 0 && (
          <ImageGallery
            gallery={gallery}
            open={this.handleModalOpen}
          ></ImageGallery>
        )}
        {isLoader && <Loader isLoader={isLoader} />}

        {isModalOpen && (
          <Modal
            url={url}
            tag={tag}
            onClick={this.handleModalClose}
            close={this.handleModalClose}
          />
        )}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {isLoadMore && gallery.length >= 12 && (
          <Button loadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
