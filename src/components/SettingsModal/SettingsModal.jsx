import UserUploadPhoto from '../UserUploadPhoto/UserUploadPhoto.jsx';
import ModalContainer from '../ModalContainer/ModalContainer.jsx';
import SettingsForm from '../SettingsForm/SettingsForm.jsx';
import sprite from '../../icons/sprite.svg';
import css from './SettingsModal.module.css';

export default function SettingsModal({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <ModalContainer onClose={onClose}>
          <div className={css.modal}>
            <div className={css.wrap}>
              <h2 className={css.title}>Settings</h2>
              <button
                type="button"
                className={css.close}
                aria-label="Close"
                onClick={onClose}
              >
                <svg width={24} height={24} className={css.icon}>
                  <use href={`${sprite}#icon-close`} />
                </svg>
              </button>
            </div>
            <UserUploadPhoto />
            <SettingsForm onClose={onClose} />
          </div>
        </ModalContainer>
      )}
    </>
  );
}
