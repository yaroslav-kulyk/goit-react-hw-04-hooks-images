import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ url, showModal }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        showModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      showModal(false);
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={url} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
