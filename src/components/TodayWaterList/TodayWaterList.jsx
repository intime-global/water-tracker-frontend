import { useState } from 'react';

import { useSelector } from 'react-redux';

import {
  deleteWaterTodayThunk,
  editWaterTodayThunk,
} from '../../redux/water/waterThunk.js';
import {
  selectTodayWater,
} from '../../redux/water/waterSelector.js';

import css from './TodayWaterList.module.css';
import ModalContainer from '../ModalContainer/ModalContainer.jsx';
import { AddWaterModal } from '../AddWaterModal/AddWaterModal.jsx';
import Icons from '../../icons/sprite.svg';
import { Svg } from '../Icons/icons.jsx';
//import { getWaterMonthThunk } from '../../redux/month/monthThunk.js';
import { getConvertedTime } from './hooksTodayWater.js'
import { popupDelete } from './popupDelete.js'
import { TodayListModal } from ''../TodayListModal/TodayListModaljsx'


const TodayList = () => {
  const { howManyWater } = useSelector(selectTodayWater);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModalToAdd = () => {
      setIsModalOpen(true);
      setisEditing(false);
      setIsDelete(false);
      setSelectedItem(null)
  };

  const openModalToEdit = (item) => {
      setIsModalOpen(true);
      setisEditing(true);
      setIsDelete(false);
      setSelectedItem(item)
  };

  const openModalToDelete = (item) => {
      setIsModalOpen(true);
      setIsDelete(true);
       setSelectedItem(item)
  };
  const closeModal = () => {
      setIsModalOpen(false);
  };

  return (

    <div className={css.todayContainer}>
        <h2 className={css.todayTitle}>Today</h2>
//howManyWater?.length > 0 &&//
      <ul className={css.listWaters}>
      {howManyWater.slice().sort((a,b)} => {return getConvertedTime(a.time).getTime() - getConvertedTime(b.time).getTime()}).map((item) => {
        return (
          <li className={css.listItem} key={id}>
            <div className={css.listItemTools}>
              <button
                    className={css.edit_button}
                    type="button"
                    onClick={()=>openModalToEdit(item)}
                  >
                <svg className={css.iconEdit} width="16" height="16">
                      <use href={Icons + '#icon-edit'}></use>
                    </svg>
                  </button>
              <button
                    className={css.deleteButton}
                    type="button"
                    onClick={()=>openModalToDelete(item)}
                  >
                <svg className={css.icon_delete} width="16" height="13">
                      <use href={Icons + '#icon-delete'}></use>
                    </svg>
                  </button>
            </div>
          </li>
        )
      </ul>
          <button className={css.button} type="button" onClick={openModalToAdd}>
          <div className={css.buttonblok}>
            <svg className={css.iconPlus} width="10" height="10">
              <use href={Icons + '#icon-plus'}></use>
            </svg>
            <p className={css.buttonText}>Add Water</p>
          </div>
        </button>
        {showModalDel && (
          <ModalContainer onClose={onClose}>
            <div className={css.containerDel}>
              <div className={css.firstblock}>
                <h2 className={css.title}>Delete entry</h2>
                <button className={css.exit} type="button" onClick={closeModal}>
                  <Svg id={'#icon-close'} width={24} height={24} />
                </button>
              </div>
              <p className={css.textDel}>
                Are you sure you want to delete the entry?
              </p>
              <div className={css.containerBtnDel}>
                <button
                  className={css.btnCancellDel}
                  type="button"
                  onClick={onClose}
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
        )}

        {isDelete ?
          <popupDelete isOpen={isModalOpen} onClose={closeModal} selectedItemId={selectedItem?.id}/>
          : <TodayListModal isOpen={isModalOpen} onClose={closeModal} isEditing={isEditing} selectedItemId={selectedItem?.id} amountWater={selectedItem?.amount} date={selectedItem?.time}/>}
        </div>
      )
