import { useState } from 'react';
import DailyNormaModal from '../DeilyNormaModal/DeilyNormaModal.jsx';
import ModalContainer from '../ModalContainer/ModalContainer.jsx';
import css from './DailyNorma.module.css';

export default function DailyNorma() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <div className={css.container}>
      <h2 className={css.title}>My daily norma</h2>
      <div className={css.norma}>
        <p>2L</p> /с бека будет норма воды/
        <button type="button" onClick={openModal} className={css.button}>
          Edit
        </button>

        {modalIsOpen && (
          <ModalContainer modalIsOpen={modalIsOpen} handleClose={closeModal}>
            <DailyNormaModal onCloseModal={closeModal} />
          </ModalContainer>
        )}
        {/* {modalIsOpen && (
          <DailyNormaModal
            onCloseModal={closeModal}
            modalIsOpen={modalIsOpen}
          />
        )} */}
      </div>
    </div>
  );
}
