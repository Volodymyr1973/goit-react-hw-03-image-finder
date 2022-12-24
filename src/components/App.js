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
    eroor: '',
  };

  handleImageName = nameSearch => {
    this.setState({ name: nameSearch.toLowerCase(), page: 1, gallery: [] });
  };

  handleGallery = gallery => {
    console.log(gallery.hits);
    this.setState(prevState => ({
      gallery: [...prevState.gallery, ...gallery.hits],
    }));
    if (gallery.hits.length < 12) {
      this.setState({ isLoadMore: false });
    }
  };

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
        .finally(this.handleLoadEnd());
    }, 1000);
  };

  handleLoad = () => {
    this.setState({ isLoader: true });
  };

  handleLoadEnd = () => {
    this.setState({ isLoader: false, isLoadMore: true });
  };

  handleModalOpen = event => {
    this.setState(() => ({
      isModalOpen: true,
      url: event.target.dataset.large,
      tag: event.target.dataset.tag,
    }));
  };

  handleModalClose = event => {
    console.log(event);
    if (event.key === 'Escape' || event.target.localName === 'div') {
      this.setState({ isModalOpen: false });
    }
  };

  handleLoadMore = () => {
    // if (this.state.gallery.length < 12) {
    //   this.setState({ isModalOpen: false });
    // } else
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      this.handleLoad();
      this.handleFetch(this.state.name, this.state.page);
    }
  }

  render() {
    return (
      <div className={css.wrapper}>
        <SearchBar onSubmit={this.handleImageName} />

        {this.state.gallery.length !== 0 && (
          <ImageGallery
            gallery={this.state.gallery}
            open={this.handleModalOpen}
          ></ImageGallery>
        )}
        {this.state.isLoader && <Loader isLoader={this.state.isLoader} />}

        {this.state.isModalOpen && (
          <Modal
            url={this.state.url}
            tag={this.state.tag}
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
        {this.state.isLoadMore && <Button loadMore={this.handleLoadMore} />}
      </div>
    );
  }
}
