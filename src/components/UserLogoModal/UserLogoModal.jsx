import ModalContainer from '../ModalContainer/ModalContainer';
import css from './UserLogoModal.module.css';
import sprite from '../../icons/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/slice.js';
import { selectTheme } from '../../redux/theme/selectors.js';

const UserLogoModal = ({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenLogout,
  dropDownMenu,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  if (!isOpen) return null;

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ModalContainer onClose={onClose} isTransparent={true}>
      <div className={css.modal} style={dropDownMenu}>
        <div className={css.settings}>
          <svg width={'16px'} height={'16px'}>
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
          <svg width={'16px'} height={'16px'}>
            <use width={'16px'} height={'16px'} href={`${sprite}#switch`} />
          </svg>
          <button className={css.logoutBtn} onClick={handleToggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'} theme
          </button>
        </div>
        <div className={css.logout}>
          <svg width={'16px'} height={'16px'}>
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
