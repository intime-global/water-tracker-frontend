import { useState } from 'react';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';
import ModalContainer from '../ModalContainer/ModalContainer.jsx';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors.js';
import css from './DailyNorma.module.css';

export default function DailyNorma() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const user = useSelector(selectUser);

  const dailyNorma = user.waterRate / 1000;

  return (
    <div className={css.container}>
      <h2 className={css.title}>My daily norma</h2>
      <div className={css.norma}>
        <p>{dailyNorma} L</p>
        <button type="button" className={css.button} onClick={openModal}>
          Edit
        </button>
        </div>

        {modalIsOpen && (<ModalContainer isOpen={modalIsOpen} onClose={closeModal}>
            <DailyNormaModal onClose={closeModal} />
          </ModalContainer>)
        }
    </div>
  );
}
