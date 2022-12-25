import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.close);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.close);
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.props.onClick}>
        <div className={css.modal}>
          <img src={this.props.url} alt={this.props.tag} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string,
  tag: PropTypes.string,
  onClick: PropTypes.func,
  close: PropTypes.func,
};
