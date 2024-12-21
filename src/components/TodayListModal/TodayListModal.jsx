import React, { useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import SpriteSvg from '../../icons/sprite.svg';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import css from './TodayListModal.module.css';
import { addWater, editWater } from '../../redux/water/waterThunk';

const maxVolumeLimit = 5000;
const minVolumeLimit = 50;
const step = 50;

const validationSchema = Yup.object({
  portionOfWater: Yup.number()
    .min(minVolumeLimit, `Minimum is ${minVolumeLimit}`)
    .max(maxVolumeLimit, `Maximum is ${maxVolumeLimit}`)
    .required('Amount is required'),
  time: Yup.string().required('Time is required'),
});

const TodayListModal = ({
  isOpen,
  onClose,
  initialAmount = 0,
  initialTime,
  isEditing,
  selectedItemId = null,
}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(initialAmount || minVolumeLimit);
  const [time, setTime] = useState(initialTime || format(new Date(), 'HH:mm'));

  const formik = useFormik({
    initialValues: {
      portionOfWater: amount,
      time: time,
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        time: values.time,
        waterAmount: values.portionOfWater,
        id: selectedItemId || null,
      };

      try {
        if (isEditing) {
          await dispatch(editWater(payload));
        } else {
          await dispatch(
            addWater({
              ...payload,
              date: format(new Date(), 'dd/MM/yyyy'),
            }),
          );
        }
        onClose();
      } catch (error) {
        console.error('Error during add/edit', error);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      portionOfWater: initialAmount || minVolumeLimit,
      time: initialTime || format(new Date(), 'HH:mm'),
    });
  }, [initialAmount, initialTime]);

  const increaseAmount = () => {
    formik.setFieldValue(
      'portionOfWater',
      Math.min(formik.values.portionOfWater + step, maxVolumeLimit),
    );
  };

  const decreaseAmount = () => {
    formik.setFieldValue(
      'portionOfWater',
      Math.max(formik.values.portionOfWater - step, minVolumeLimit),
    );
  };

  return (
    <ModalContainer onClose={onClose}>
      <div className={css.modalContainer}>
        <div className={css.header}>
          {isEditing ? (
            <h2 className={css.title}>Edit the entered amount of water</h2>
          ) : (
            <h2 className={css.title}>Add water</h2>
          )}

          <button type="button" className={css.closeButton} onClick={onClose}>
            <svg className={css.iconClose} width="14" height="14">
              <use href={SpriteSvg + '#icon-close'} />
            </svg>
          </button>
        </div>

        {isEditing && (
          <div className={css.amountDisplay}>
            <svg className={css.iconGlass}>
              <use href={SpriteSvg + '#icon-water-glass'} />
            </svg>
            <span className={css.amount}>
              {formik.values.portionOfWater} ml
            </span>
            <span className={css.time}>{formik.values.time}</span>
          </div>
        )}

        {isEditing ? (
          <h3 className={css.subtitle}>Correct entered data:</h3>
        ) : (
          <h3 className={css.subtitle}>Choose a value:</h3>
        )}

        <div className={css.amountControls}>
          <p className={css.subtitleText}>Amount of water:</p>
          <div className={css.controlsWrapper}>
            <button
              type="button"
              className={css.controlButton}
              onClick={decreaseAmount}
            >
              <svg className={css.iconStepM} width="24" height="24">
                <use href={SpriteSvg + '#icon-minus'} />
              </svg>
            </button>
            <span className={css.amountText}>
              {formik.values.portionOfWater}
            </span>
            <button
              type="button"
              className={css.controlButton}
              onClick={increaseAmount}
            >
              <svg className={css.iconStepP} width="24" height="24">
                <use href={SpriteSvg + '#icon-plus'} />
              </svg>
            </button>
          </div>
        </div>

        <label className={css.label}>
          <p className={css.subtitleText}>Recording time:</p>
          <input
            type="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            required
            className={css.input}
          />
        </label>

        <label className={css.label}>
          <h3 className={css.subtitle}>Enter the value of the water used:</h3>
          <input
            type="number"
            name="portionOfWater"
            value={formik.values.portionOfWater}
            onChange={formik.handleChange}
            required
            className={css.input}
          />
        </label>

        <div className={css.btnContainer}>
          <span className={css.amountSave}>
            {formik.values.portionOfWater} ml
          </span>
          <button
            className={css.saveButton}
            type="button"
            onClick={formik.handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default TodayListModal;
