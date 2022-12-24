import React, { Component } from 'react';
import { SearchBar } from './searchbar/SearchBar';
import { ImageGallery } from './imagegallery/ImageGallery';
// import { ImageGalleryItem } from './imagegalleryitem/ImageGalleryItem';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
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
    this.setState(prevState => ({
      gallery: [...prevState.gallery, ...gallery.hits],
    }));
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
    }, 300);
  };

  handleLoad = () => {
    this.setState({ isLoader: true });
    setTimeout(() => {
      this.setState({ isLoadMore: true });
    }, 1000);
  };

  handleLoadEnd = () => {
    this.setState({ isLoader: false });
  };

  handleModalOpen = event => {
    this.setState(() => ({
      isModalOpen: true,
      url: event.target.dataset.large,
      tag: event.target.dataset.tag,
    }));
    document.addEventListener('keydown', this.handleModalClose);
  };

  handleModalClose = event => {
    if (event.key === 'Escape' || event.type === 'click') {
      this.setState({ isModalOpen: false });
      document.removeEventListener('keydown', this.handleModalClose);
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div className={css.wrapper}>
        <SearchBar onSubmit={this.handleImageName} />

        <ImageGallery
          name={this.state.name}
          page={this.state.page}
          gallery={this.state.gallery}
          onFetch={this.handleFetch}
          load={this.handleLoad}
          isModalOpen={this.state.isModalOpen}
          open={this.handleModalOpen}
          close={this.handleModalClose}
          url={this.state.url}
          tag={this.state.tag}
        ></ImageGallery>
        {this.state.isLoader && <Loader isLoader={this.state.isLoader} />}
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
        {this.state.isLoadMore && (
          <Button
            loadMore={this.handleLoadMore}
            isLoadMore={this.state.isLoadMore}
          />
        )}
      </div>
    );
  }
}
