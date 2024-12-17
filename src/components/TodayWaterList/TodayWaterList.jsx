import { useState, useDispatch } from 'react';
import { useSelector } from 'react-redux';

import { deleteWaterTodayThunk } from '../../redux/water/waterThunk.js';
import { selectTodayWater } from '../../redux/water/waterSelector.js';
import { getConvertedTime } from './hooksTodayWater.js';
import { waterIsLoadingSelector } from '../../redux/water/waterSelector.js';
import ModalContainer from '../ModalContainer/ModalContainer.jsx';

//import AddWaterModal  from '../AddWaterModal/AddWaterModal.jsx';
import ListItem from '../ListItem/ListItem.jsx';
import { notifySuccess } from '../../services/notifications.js';
import Loader from '../Loader/Loader.jsx';

import sprite from '../../icons/sprite.svg';
import css from './TodayWaterList.module.css';

export const TodayList = () => {
  const { waterPortions } = useSelector(selectTodayWater);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEditing, setisEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(waterIsLoadingSelector);
  const openModalToAdd = () => {
    setIsModalOpen(true);
    //setisEditing(false);
    setIsDelete(false);
    setSelectedItem(null);
  };
  const openModalToEdit = (item) => {
    setIsModalOpen(true);
    //setisEditing(true);
    setIsDelete(false);
    setSelectedItem(item);
  };
  const openModalToDelete = (item) => {
    setIsModalOpen(true);
    setIsDelete(true);
    setSelectedItem(item);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const deleteHandleChange = async (selectedItemId) => {
    await dispatch(deleteWaterTodayThunk({ id: selectedItemId }));
    notifySuccess('This item deleted');
    closeModal();
  };
  return (
    <div className={css.todayContainer}>
      <h2 className={css.todayTitle}>Today</h2>
      {waterPortions?.length > 0 && (
        <ul className={css.listWaters}>
          {waterPortions
            .slice()
            .sort(
              (a, b) =>
                getConvertedTime(a.time).getTime() -
                getConvertedTime(b.time).getTime(),
            )
            .map((item) => (
              <li className={css.listItem} key={item.id}>
                <ListItem data={item} />
                <div className={css.listItemTools}>
                  <button
                    className={css.edit_button}
                    type="button"
                    aria-label="Edit entry"
                    onClick={() => openModalToEdit(item)}
                  >
                    <svg className={css.iconEdit}>
                      <use href={`${sprite}#icon-edit`}></use>
                    </svg>
                  </button>
                  <button
                    className={css.deleteButton}
                    type="button"
                    aria-label="Delete entry"
                    onClick={() => openModalToDelete(item)}
                  >
                    <svg className={css.icon_delete}>
                      <use href={`${sprite}#icon-delete`}></use>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
      <button className={css.button} type="button" onClick={openModalToAdd}>
        <div className={css.button_blok}>
          <span>+</span>
          <p className={css.buttonText}>Add Water</p>
        </div>
      </button>
      {
        isDelete ? (
          <ModalContainer
            isOpen={isModalOpen}
            onClose={closeModal}
            selectedItemId={selectedItem?.id}
          >
            <div className={css.containerDel}>
              <div className={css.firstblock}>
                <h2 className={css.title}>Delete entry</h2>
                <button
                  className={css.exit}
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg className={css.iconClose}>
                    <use href={`${sprite}#icon-close`}></use>
                  </svg>
                </button>
              </div>
              <p className={css.textDel}>
                Are you sure you want to delete the entry?
              </p>
              <div className={css.containerBtnDel}>
                <button
                  className={css.btnCancellDel}
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className={css.btnDeletelDel}
                  type="button"
                  onClick={deleteHandleChange}
                >
                  Delete
                </button>
              </div>
            </div>
          </ModalContainer>
        ) : null
        //<AddWaterModal isOpen={isModalOpen} onClose={closeModal} isEditing={isEditing} />
      }
      {isLoading && <Loader />}
    </div>
  );
};
