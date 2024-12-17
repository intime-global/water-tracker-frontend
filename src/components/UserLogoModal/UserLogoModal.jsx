import ModalContainer from '../ModalContainer/ModalContainer';
import css from './UserLogoModal.module.css';
import sprite from '../../icons/sprite.svg';

const UserLogoModal = ({
    isOpen,
    onClose,
    onOpenSettings,
    onOpenLogout
}) => {
    if (!isOpen) return null;

      return (
        <ModalContainer onClose={onClose} isTransparent={true}>
          <div className={css.modal}>

              <div className={css.settings}>
                <svg
                  width={'16px'}
                  height={'16px'}
                >
                  <use
                    width={'16px'}
                    height={'16px'}
                    href={`${sprite}#icon-settings`}
                  />
                </svg>
                <button
                  className={css.settingsBtn}
                  onClick={() => {
                    onClose();
                    onOpenSettings();
                  }}
                >
                  Settings
                </button>
              </div>
              <div className={css.logout}>
                <svg
                  width={'16px'}
                  height={'16px'}
                >
                  <use
                    width={'16px'}
                    height={'16px'}
                    href={`${sprite}#icon-logout`}
                  />
                </svg>
                <button
                  className={css.logoutBtn}
                  onClick={() => {
                    onClose();
                    onOpenLogout();
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          
        </ModalContainer>
      );
};

export default UserLogoModal;
