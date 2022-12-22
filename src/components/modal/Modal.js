import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ imgRef, tag, onClick }) => {
  return (
    <div className={css.overlay} onClick={onClick}>
      <div className={css.modal}>
        <img src={imgRef} alt={tag} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgRef: PropTypes.string,
  tag: PropTypes.string,
  onClick: PropTypes.func,
};
