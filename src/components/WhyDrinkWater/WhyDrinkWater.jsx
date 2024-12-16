import css from './WhyDrinkWater.module.css';
import sprite from '../../icons/sprite.svg';

const WhyDrinkWater = () => {
  return (
    <div className={css.reasons}>
      <h3 className={css.title3}>Why drink water</h3>
      <ul className={css.listReasons}>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite}#icon-Ellipse-7`}></use>
          </svg>
          <p className={css.listText}>Supply of nutrients to all organs</p>
        </li>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite}#icon-Ellipse-7`}></use>
          </svg>
          <p className={css.listText}>Providing oxygen to the lungs</p>
        </li>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite}#icon-Ellipse-7`}></use>
          </svg>
          <p className={css.listText}>Maintaining the work of the heart</p>
        </li>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite}#icon-Ellipse-7`}></use>
          </svg>
          <p className={css.listText}>Release of processed substances</p>
        </li>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite}#icon-Ellipse-7`}></use>
          </svg>
          <p className={css.listText}>
            Ensuring the stability of the internal environment
          </p>
        </li>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite}#icon-Ellipse-7`}></use>
          </svg>
          <p className={css.listText}>
            Maintaining within the normal temperature
          </p>
        </li>
        <li>
          <svg className={css.benefitsIcon}>
            <use href={`${sprite}#icon-Ellipse-7`}></use>
          </svg>
          <p className={css.listText}>
            Maintaining an immune system capable of resisting disease
          </p>
        </li>
      </ul>
    </div>
  );
};

export default WhyDrinkWater;
