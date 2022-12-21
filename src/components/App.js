import React, { Component } from 'react';
import { SearchBar } from './searchbar/SearchBar';
import { ImageGallery } from './imagegallery/ImageGallery';
import { ImageGalleryItem } from './imagegalleryitem/ImageGalleryItem';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
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
  };

  handleImageName = nameSearch => {
    console.log(nameSearch);
    this.setState(() => ({ name: nameSearch }));

    this.handleSearchImage();
  };

  handleSearchImage() {
    this.setState({ isLoader: true });
    this.setState({ isLoadMore: true });

    console.log(this.state.name);
    if (this.state.name.trim() !== '') {
      fetch(
        `https://pixabay.com/api/?q=${this.state.name}&page=${this.state.page}&key=30855873-a6914290544a804f7a5292a28&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(gallery =>
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...gallery.hits],
          }))
        )
        .catch(error => error.message)
        .finally(this.setState({ isLoader: false }));

      console.log(this.state.gallery);
    }
  }

  handleLoadMore = () => {
    console.log(this.state.page);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.handleSearchImage();
  };

  render() {
    return (
      <div className={css.wrapper}>
        <SearchBar onSubmit={this.handleImageName} />
        {this.state.isLoader && <Loader />}
        {this.state.gallery.length > 0 && (
          <ImageGallery gallery={this.state.gallery}>
            <ImageGalleryItem />
          </ImageGallery>
        )}
        {this.state.isLoadMore && <Button loadMore={this.handleLoadMore} />}

        {/* <Modal /> */}
      </div>
    );
  }
}
