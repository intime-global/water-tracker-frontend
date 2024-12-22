import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWater } from '../../redux/water/waterThunk.js';
import { selectTodayWater } from '../../redux/water/waterSelector.js';
import ModalContainer from '../ModalContainer/ModalContainer.jsx';
import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import { ListItem } from '../ListItem/ListItem.jsx';
import { Icon } from '../Icon/Icon.jsx';
import css from './TodayWaterList.module.css';

export const TodayList = () => {
  const waterList = useSelector(selectTodayWater);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const openModalToAdd = () => {
    setIsModalOpen(true);
    setisEditing(false);
    setIsDelete(false);
    setSelectedItem(null);
  };
  const openModalToEdit = (item) => {
    setIsModalOpen(true);
    setisEditing(true);
    setIsDelete(false);
    setSelectedItem(item);
  };
  const openModalToDelete = (item) => {
    setIsModalOpen(true);
    setisEditing(false);
    setIsDelete(true);
    setSelectedItem(item);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsDelete(false);
    setisEditing(false);
  };

  console.log(selectedItem);
  const deleteHandleChange = async (selectedItem) => {
    await dispatch(deleteWater(selectedItem._id));
    setIsModalOpen(false);
  };
  return (
    <div className={css.todayContainer}>
      <h2 className={css.todayTitle}>Today</h2>
      {waterList?.length > 0 && (
        <ul className={css.listWaters}>
          {waterList
            .slice()
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((item) => (
              <li className={css.listItem} key={item._id}>
                <ListItem data={item} />
                <div className={css.listItemTools}>
                  <button
                    className={css.editButton}
                    type="button"
                    aria-label="Edit entry"
                    onClick={() => openModalToEdit(item)}
                  >
                    <Icon
                      className={css.editIcon}
                      id={'#icon-edit'}
                      width={24}
                      height={24}
                    />
                  </button>
                  <button
                    className={css.deleteButton}
                    type="button"
                    aria-label="Delete entry"
                    onClick={() => openModalToDelete(item)}
                  >
                    <Icon
                      className={css.deleteIcon}
                      id={'#icon-delete'}
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
      <button className={css.button} type="button" onClick={openModalToAdd}>
        <span className={css.span}>+</span>
        <p className={css.buttonText}>Add Water</p>
      </button>

      {isModalOpen &&
        (isDelete ? (
          <ModalContainer onClose={closeModal}>
            <div className={css.containerDel}>
              <div className={css.firstblock}>
                <h2 className={css.title}>Delete entry</h2>
                <button
                  className={css.exit}
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <Icon
                    className={css.iconClose}
                    id={'#icon-close'}
                    width={24}
                    height={24}
                  />
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
                  onClick={deleteHandleChange(selectedItem)}
                >
                  Delete
                </button>
              </div>
            </div>
          </ModalContainer>
        ) : (
          <TodayListModal
            isOpen={isModalOpen}
            onClose={closeModal}
            isEditing={isEditing}
            selectedItemId={selectedItem?._id}
            initialAmount={selectedItem?.waterAmount}
            initialTime={selectedItem?.time}
          />
        ))}
    </div>
  );
};
