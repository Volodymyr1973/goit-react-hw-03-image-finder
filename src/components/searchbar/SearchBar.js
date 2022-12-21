import { Component } from 'react';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    name: '',
  };

  handleChangeName = event => {
    this.setState({ name: event.currentTarget.value });
  };

  handleSubmitName = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.name);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handleSubmitName}>
          <button type="submit" className={css.searchform__button}>
            <span className={css.searchform__label}>Search</span>
          </button>

          <input
            className={css.searchform__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeName}
          />
        </form>
      </header>
    );
  }
}
