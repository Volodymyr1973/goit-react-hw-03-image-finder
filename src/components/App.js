import React, { Component } from 'react';
import { SearchBar } from './searchbar/SearchBar';
import { ImageGallery } from './imagegallery/ImageGallery';
import { ImageGalleryItem } from './imagegalleryitem/ImageGalleryItem';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';
import css from './App.module.css';
// import { Modal } from './modal/Modal';
// import { Dna } from 'react-loader-spinner';

export class App extends Component {
  state = {
    name: '',
    gallery: [],
    page: 1,
    isLoader: false,
    isLoadMore: false,
    error: '',
  };

  handleImageName = nameSearch => {
    this.setState({ name: nameSearch.toLowerCase() });
  };

  // handleImageName = event => {
  //   event.preventDefault();
  //   console.log(event);
  //   console.dir(event.target[1].value);
  //   this.setState({ name: event.target[1].value });

  //   this.handleSearchImage();
  // };

  handleSearchImage = () => {
    this.setState({ isLoader: true });
    this.setState({ isLoadMore: true });
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

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log(this.state.page);
  };

  render() {
    return (
      <div className={css.wrapper}>
        <SearchBar onSubmit={this.handleImageName} />
        {this.state.isLoader && <Loader />}

        <ImageGallery
          name={this.state.name}
          page={this.state.page}
          close={this.handleModalClose}
          open={this.handleModalOpen}
          isLoadMore={this.state.isLoadMore}
        >
          <ImageGalleryItem />
          <Modal close={this.handleModalClose} open={this.handleModalOpen} />
        </ImageGallery>

        {this.state.isLoadMore && (
          <Button
            loadMore={this.handleLoadMore}
            isLoadMore={this.state.isLoadMore}
          />
        )}

        {/* <Modal /> */}
      </div>
    );
  }
}
