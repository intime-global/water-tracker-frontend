import { useEffect, useState } from 'react';
import Icons from '../../icons/sprite.svg';
import '../../index.css';
import { selectIsLoading, selectUser } from '../../redux/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { editUserWaterRate } from '../../redux/user/operations';
import { toast } from 'react-toastify';
import { toLiters, toMilliliters } from '../../services/helpers';
import css from './DailyNormaModal.module.css';

export default function DailyNormaModal({ onClose }) {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const [gender, setGender] = useState('female');
  const [weight, setWeight] = useState('');
  const [activityTime, setActivityTime] = useState('');
  const [waterAmount, setWaterAmount] = useState(user.waterRate || 0);
  const [waterAmountForCalculate, setWaterAmountForCalculate] = useState(0);

  const calculateWaterRate = (gender, weight, activityTime) => {
    const weightItem = parseFloat(weight);
    const activitiTimeItem = parseFloat(activityTime);
    if (isNaN(weightItem) || isNaN(activitiTimeItem)) return;

    const water =
      gender === 'female'
        ? weightItem * 0.03 + activitiTimeItem * 0.4
        : weightItem * 0.04 + activitiTimeItem * 0.6;

    const roundedWater = toMilliliters(parseFloat(water.toFixed(1)));
    setWaterAmount(roundedWater);
    setWaterAmountForCalculate(roundedWater);
  };

  useEffect(() => {
    calculateWaterRate(gender, weight, activityTime);
  }, [gender, weight, activityTime]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const water = parseFloat(waterAmount.toFixed(1));
    if (water < toMilliliters(0.5) || water > toMilliliters(15)) {
      toast.error('The water intake must be between 0.5 and 15 liters.');
      return;
    }
    try {
      dispatch(editUserWaterRate({ waterRate: waterAmount }));
      toast.success('Successfully daily intake saved!');
      onClose();
    } catch (error) {
      if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleWaterChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      setWaterAmount('');
    } else {
      setWaterAmount(parseFloat(value)); // No need for toMilliliters
    }
  };

  return (
    <>
      <div className={css.modal}>
        <div className={css.head}>
          <h1 className={css.title}>My daily norma</h1>
          <button type="button" className={css.closeButton} onClick={onClose}>
            <svg width={24} height={24} className={css.icon}>
              <use href={`${Icons}#icon-close`} />
            </svg>
          </button>
        </div>

        <ul className={css.normaList}>
          <li className={css.normaItem}>
            For woman:
            <span className={css.normaSpan}> V=(M*0.03) + (T*0.4)</span>
          </li>
          <li className={css.normaItem}>
            For man:
            <span className={css.normaSpan}> V=(M*0.04) + (T*0.6)</span>
          </li>
        </ul>

        <p className={css.explanation}>
          <span className={css.explanationSpan}>*</span>
          <strong> V</strong> is the volume of the water norm in liters per day,
          <strong> M</strong> is your body weight,
          <strong> T</strong> is the time of active sports, or another type of
          activity commensurate in terms of loads (in the absence of these, you
          must set 0).
        </p>

        <h2 className={css.subheading}>Calculate your rate:</h2>
        <form className={css.form} onSubmit={handleSubmit} disabled={isLoading}>
          <fieldset className={css.fieldset}>
            <label className={css.labelWom}>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={() => setGender('female')}
                defaultChecked
              />{' '}
              For woman
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={() => setGender('male')}
              />{' '}
              For man
            </label>
          </fieldset>

          <label className={css.label}>
            Your weight in kilograms:
            <input
              type="text"
              name="weight"
              min="1"
              step="0.1"
              placeholder="0"
              className={css.input}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>

          <label className={css.label}>
            The time of active participation in sports or other activities with
            a high physical. load in hours:
            <input
              type="text"
              name="activityTime"
              min="0"
              step="0.1"
              placeholder="0"
              className={css.input}
              value={activityTime}
              onChange={(e) => setActivityTime(e.target.value)}
            />
          </label>

          <div className={css.resultWrap}>
            <p className={css.result}>
              The required amount of water in liters per day:
            </p>
            <p className={css.waterAmount}>
              {toLiters(waterAmountForCalculate)} L
            </p>
          </div>

          <h2 className={css.subheading}>
            Write down how much water you will drink:
          </h2>
          <label className={css.label}>
            <input
              type="text"
              name="dailyIntake"
              min="0.5"
              step="0.1"
              max="15"
              value={toLiters(waterAmount) || ''}
              onChange={handleWaterChange}
              placeholder="0"
              className={css.input}
            />
          </label>
          <div className={css.btnWrap}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
