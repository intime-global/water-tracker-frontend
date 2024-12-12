import { useNavigate } from 'react-router-dom';

import css from './WaterConsumptionTracker.css';
import sprite from '../../icons/sprite.svg';

const WaterConsumptionTracker = () => {
  const navigate = useNavigate();

  const handleTryTrackerClick = () => {
    navigate('/signup');
  };

  return (
    <div className={css.trackerBenefits}>
      <h1 className={css.title1}>Water consumption tracker</h1>
      <h2 className={css.title2}>Record daily water intake and track</h2>
      <h3 className={css.title3}>Tracker Benefits</h3>
      <ul className={css.benefitsList}>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite}#icon-calendar`}></use>
          </svg>
          <p className={css.benefitsText}>Habit drive</p>
        </li>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite} + #icon-presentation-chart`}></use>
          </svg>
          <p className={css.benefitsText}>View statistics</p>
        </li>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite} + '#icon-mainpage-settings`}></use>
          </svg>
          <p className={css.benefitsText}>Personal rate setting</p>
        </li>
      </ul>

      <button
        className={css.btnTryTracker}
        type="button"
        onClick={handleTryTrackerClick}
      >
        Try tracker
      </button>
    </div>
  );
};

export default WaterConsumptionTracker;
