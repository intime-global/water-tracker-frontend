import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user/operations.js';
import ModalContainer from '../ModalContainer/ModalContainer.jsx';
import sprite from '../../icons/sprite.svg';
import css from './LogOutModal.module.css';

export default function LogOutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    //! потрібно очистити глобальний стейт в store зі всіма даними, що були у авторизованого користувача
    dispatch(logout());
    onClose();
  };
  return (
    <>
      {isOpen && (
        <ModalContainer onClose={onClose}>
          <div className={css.modal}>
            <div className={css.wrap}>
              <h2 className={css.title}>Log out</h2>
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
            <h3 className={css.subtitle}>Do you really want to leave?</h3>
            <div className={css.btnWrap}>
              <button
                className={`${css.btn} ${css.cancel}`}
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={`${css.btn} ${css.logOut}`}
                type="button"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </div>
          </div>
        </ModalContainer>
      )}
    </>
  );
}
