import ModalContainer from '../ModalContainer/ModalContainer';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import SpriteSvg from '../../icons/sprite.svg';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import css from './TodayListModal.module.css';
import { addWater, editWater } from '../../redux/water/waterThunk';
import { ListItem } from '../ListItem/ListItem';
import { transformTimeToISO } from '../../services/hooks.js';

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
  isEditing,
  selectedItemId,
  initialAmount,
  initialTime,
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      portionOfWater: initialAmount || minVolumeLimit,
      time: initialTime || format(new Date(), 'HH:mm'),
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        date: transformTimeToISO(values.time),
        waterVolume: values.portionOfWater,
        id: selectedItemId,
      };
      if (isEditing) {
        dispatch(editWater(payload));
      } else {
        dispatch(
          addWater({
            date: transformTimeToISO(values.time),
            waterVolume: values.portionOfWater,
          }),
        );
      }
      onClose();
    },
  });

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
    <ModalContainer isOpen={isOpen} onClose={onClose}>
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
            <ListItem
              data={{
                waterVolume: initialAmount,
                time: initialTime,
              }}
            />
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
