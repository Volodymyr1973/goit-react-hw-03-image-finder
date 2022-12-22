import React, { Component } from 'react';
import { SearchBar } from './searchbar/SearchBar';
import { ImageGallery } from './imagegallery/ImageGallery';
import { ImageGalleryItem } from './imagegalleryitem/ImageGalleryItem';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import css from './App.module.css';

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
  };

  handleImageName = nameSearch => {
    this.setState({ name: nameSearch.toLowerCase() });
  };

  handleLoad = () => {
    this.setState({ isLoader: true });
    setTimeout(() => {
      this.setState({ isLoadMore: true });
    }, 2000);
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
  };

  handleModalClose = event => {
    this.setState({ isModalOpen: false });
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
        {this.state.isLoader && <Loader isLoader={this.state.isLoader} />}

        <ImageGallery
          name={this.state.name}
          page={this.state.page}
          load={this.handleLoad}
          loadEnd={this.handleLoadEnd}
          isLoadMore={this.state.isLoadMore}
          isLoader={this.state.isLoader}
          open={this.handleModalOpen}
          isModalOpen={this.state.isModalOpen}
          close={this.handleModalClose}
          closeKey={this.handleKeyModalClose}
          url={this.state.url}
          tag={this.state.tag}
        >
          <ImageGalleryItem open={this.handleModalOpen} />
        </ImageGallery>

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
