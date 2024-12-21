import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteWater } from '../../redux/water/waterThunk.js';
//import { selectTodayWater } from '../../redux/water/waterSelector.js';
//import { getConvertedTime } from './hooksTodayWater.js';
import ModalContainer from '../ModalContainer/ModalContainer.jsx';

//import AddWaterModal  from '../AddWaterModal/AddWaterModal.jsx';
import { ListItem } from '../ListItem/ListItem.jsx';

import { Icon } from '../Icon/Icon.jsx';
import css from './TodayWaterList.module.css';

export const TodayList = () => {
  //const waterList = useSelector(selectTodayWater);
  const waterList = [
    {
      id: '675b93cab74997639d8e7476',
      userId: '675b8d979f14991c4126ba15',
      year: 2024,
      month: 12,
      day: 14,
      time: '11:15:05',
      waterRate: 2000,
      waterVolume: 250,
    },
    {
      id: '675b93cab74997639d8e7476',
      userId: '675b8d979f14991c4126ba15',
      year: 2024,
      month: 12,
      day: 14,
      time: '11:15:05',
      waterRate: 2000,
      waterVolume: 250,
    },
    {
      id: '675b93cab74997639d8e7476',
      userId: '675b8d979f14991c4126ba15',
      year: 2024,
      month: 12,
      day: 14,
      time: '11:15:05',
      waterRate: 2000,
      waterVolume: 250,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEditing, setisEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
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
    setIsDelete(false);
    //setisEditing(false);
  };
  const deleteHandleChange = (selectedItemId) => {
    dispatch(deleteWater(selectedItemId));
    setIsModalOpen(false);
  };
  return (
    <div className={css.todayContainer}>
      <h2 className={css.todayTitle}>Today</h2>
      {waterList?.length > 0 && (
        <ul className={css.listWaters}>
          {waterList
            .slice()
            .sort((a, b) => {
              return a.time - b.time;
            })
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
                    <Icon id={'#icon-edit'} width={24} height={24} />
                  </button>
                  <button
                    className={css.deleteButton}
                    type="button"
                    aria-label="Delete entry"
                    onClick={() => openModalToDelete(item)}
                  >
                    <Icon id={'#icon-delete'} width={24} height={24} />
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
                  <Icon id={'#icon-close'} width={24} height={24} />
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
    </div>
  );
};
