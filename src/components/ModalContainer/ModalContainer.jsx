import { useEffect } from 'react';
import clsx from 'clsx';
import css from './ModalContainer.module.css';

const ModalContainer = ({ onClose, isTransparent = false, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = 'visible';
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const classes = (transparent) =>
    clsx(css.overlay, transparent ? css.transparent : css.black);

  return (
    <div className={classes(isTransparent)} onClick={handleBackdropClick}>
      {children}
    </div>
  );
};

export default ModalContainer;
